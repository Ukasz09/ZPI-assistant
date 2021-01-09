import { StudentSchema } from './student';

export class TeamSchema {
  constructor(public id: string, public subject: string, public members: StudentSchema[], public adminIndex: string) {}
}
