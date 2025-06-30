import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  Database,
  InjectDatabase,
  QueryOptions,
  withColumns,
  withQueryColumns,
} from 'src/database/utils';
import { DBSchema } from 'src/database/database.module';
import {
  count,
  desc,
  eq,
  InferInsertModel,
  InferSelectModel,
} from 'drizzle-orm';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  logger = new Logger(UsersService.name);
  constructor(@InjectDatabase private readonly db: Database) {}
  async create({
    email,
    userType,
    ...data
  }: InferInsertModel<typeof DBSchema.user> & Pick<CreateUserDto, 'userType'>) {
    try {
      const [user] = await this.db
        .insert(DBSchema.user)
        .values({
          email: email.toLowerCase(),
          ...data,
        })
        .returning(
          withColumns(DBSchema.user, [
            'id',
            'createdAt',
            'firstname',
            'lastname',
            'email',
            'imageUrl',
          ]),
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
      columns: withQueryColumns(DBSchema.user, [
        'id',
        'createdAt',
        'firstname',
        'lastname',
        'email',
        'imageUrl',
      ]),
    });
    return user;
  }
  async findAll() {
    return await this.db
      .select(
        withColumns(DBSchema.user, [
          'id',
          'createdAt',
          'firstname',
          'lastname',
          'email',
          'imageUrl',
        ]),
      )
      .from(DBSchema.user)
      .where(undefined)
      .orderBy(desc(DBSchema.user.createdAt));
  }
  async findAllPaginated(options: QueryOptions) {
    const items = await this.db
      .select(
        withColumns(DBSchema.user, [
          'id',
          'createdAt',
          'firstname',
          'lastname',
          'email',
          'imageUrl',
        ]),
      )
      .from(DBSchema.user)
      .where(options.where)
      .limit(options.limit)
      .offset(options.offset)
      .orderBy(desc(DBSchema.user.createdAt));

    const [result] = await this.db
      .select({ totalItems: count() })
      .from(DBSchema.user)
      .where(options.where);
    this.logger.log(result);
    return { items, totalItems: result.totalItems };
  }
  async update(id: string, data: InferSelectModel<typeof DBSchema.user>) {
    const [user] = await this.db
      .update(DBSchema.user)
      .set(data)
      .where(eq(DBSchema.user.id, id))
      .returning(
        withColumns(DBSchema.user, [
          'id',
          'createdAt',
          'firstname',
          'lastname',
          'email',
          'imageUrl',
        ]),
      );
    return user;
  }
  async delete(id: string) {
    await this.db.delete(DBSchema.user).where(eq(DBSchema.user.id, id));
    return null;
  }
  async getRolesByUserId(userId: string) {
    return this.db
      .select(
        withColumns(DBSchema.role, [
          'id',
          'role',
          'isActive',
          'userId',
          'createdAt',
        ]),
      )
      .from(DBSchema.role)
      .where(eq(DBSchema.role.userId, userId));
  }
}
