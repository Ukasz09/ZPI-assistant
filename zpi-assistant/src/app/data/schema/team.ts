import { StudentSchema } from './student';
import { TeacherSchema } from './teacher';

export class TeamSchema {
  constructor(
    public id: string,
    public topic: string,
    public subject: string,
    public members: StudentSchema[],
    public adminIndex: string,
    public lecturer: TeacherSchema
  ) {}
}
