import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import {
  Database,
  InjectDatabase,
  QueryOptions,
  withColumns,
  withQueryColumns,
} from 'src/database/utils';
import { DBSchema } from 'src/database/schemas';
import {
  count,
  desc,
  eq,
  InferInsertModel,
  InferSelectModel,
} from 'drizzle-orm';
import { CreateUserDto } from './dto/user.dto';
import { MinioService } from 'libs/minio/minio.service';
import { getGravatarUrl } from 'libs/gravatar/main';

@Injectable()
export class UsersService {
  logger = new Logger(UsersService.name);
  defaultUserSelect: NonNullable<QueryOptions<typeof DBSchema.user>['select']>;
  defaultRoleSelect: NonNullable<QueryOptions<typeof DBSchema.role>['select']>;
  constructor(
    @InjectDatabase private readonly db: Database,
    private readonly minioService: MinioService,
  ) {
    this.defaultUserSelect = [
      'id',
      'createdAt',
      'updatedAt',
      'firstname',
      'lastname',
      'email',
      'imageUrl',
    ];
    this.defaultRoleSelect = [
      'id',
      'role',
      'isActive',
      'userId',
      'createdAt',
      'updatedAt',
    ];
  }
  async create(
    {
      email,
      userType,
      imageUrl,
      ...data
    }: InferInsertModel<typeof DBSchema.user> & Pick<CreateUserDto, 'userType'>,
    options?: Pick<QueryOptions<typeof DBSchema.user>, 'select'>,
  ) {
    try {
      const [user] = await this.db
        .insert(DBSchema.user)
        .values({
          email: email.toLowerCase(),
          imageUrl: imageUrl || getGravatarUrl(email),
          ...data,
        })
        .returning(
          withColumns(DBSchema.user, options?.select || this.defaultUserSelect),
        );
      await this.db.insert(DBSchema.role).values([
        {
          userId: user.id,
          role: 'user',
        },
        {
          userId: user.id,
          role: userType,
        },
      ]);

      return user;
    } catch ({ cause }) {
      throw new BadRequestException(cause);
    }
  }
  async findById(id: string) {
    const user = await this.db.query.user.findFirst({
      where: eq(DBSchema.user.id, id),
      columns: withQueryColumns(DBSchema.user, this.defaultUserSelect),
    });
    return user;
  }
  async findAll(
    options: Pick<
      QueryOptions<typeof DBSchema.user>,
      'select' | 'where' | 'orderBy'
    >,
  ) {
    return await this.db
      .select(
        withColumns(DBSchema.user, options.select || this.defaultUserSelect),
      )
      .from(DBSchema.user)
      .where(options.where)
      .orderBy(options.orderBy || desc(DBSchema.user.createdAt));
  }
  async findAllPaginated({
    select = ['id', 'createdAt', 'firstname', 'lastname', 'email', 'imageUrl'],
    ...options
  }: QueryOptions<typeof DBSchema.user>) {
    const items = await this.db
      .select(withColumns(DBSchema.user, select))
      .from(DBSchema.user)
      .where(options.where)
      .limit(options.limit)
      .offset(options.offset)
      .orderBy(options.orderBy || desc(DBSchema.user.createdAt));

    const [result] = await this.db
      .select({ totalItems: count() })
      .from(DBSchema.user)
      .where(options.where);
    return { items, totalItems: result.totalItems };
  }
  async update(
    id: string,
    data: Partial<InferSelectModel<typeof DBSchema.user>>,
  ) {
    const [user] = await this.db
      .update(DBSchema.user)
      .set(data)
      .where(eq(DBSchema.user.id, id))
      .returning(withColumns(DBSchema.user, this.defaultUserSelect));
    return user;
  }
  async delete(id: string) {
    await this.db.delete(DBSchema.user).where(eq(DBSchema.user.id, id));
    return null;
  }
  async getRolesByUserId(userId: string) {
    return this.db
      .select(withColumns(DBSchema.role, this.defaultRoleSelect))
      .from(DBSchema.role)
      .where(eq(DBSchema.role.userId, userId));
  }
  async updateProfileImageByUserId(userId: string, dataUri: string) {
    const user = await this.findById(userId);
    if (!user)
      throw new ForbiddenException(
        `User with the matching id not found: ${userId}`,
      );
    const blob = await this.minioService.putDataUri(dataUri);
    return await this.update(userId, { imageUrl: blob.baseUrl });
  }
}
