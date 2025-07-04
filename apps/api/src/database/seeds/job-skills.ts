import db from '..';
import { DBSchema } from '../schemas';
import * as jobSkills from './data/job-skills.json';

export default async function seed(db: db) {
  await db.insert(DBSchema.jobSkill).values(jobSkills);
}
