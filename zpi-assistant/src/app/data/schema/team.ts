import { StudentSchema } from './student';
import { TeacherSchema } from './teacher';

export class TeamSchema {
  /**
   *
   * @param id Id of the team
   * @param topic Team project's topic
   * @param subject Team project's subject
   * @param members Team members
   * @param adminEmail Email of student who has admin privileages
   * @param lecturer Assigned team's lecturer
   */
  constructor(
    public id: string,
    public topic: string,
    public subject: string,
    public members: StudentSchema[],
    public adminEmail: string,
    public lecturer: TeacherSchema
  ) {}
}
