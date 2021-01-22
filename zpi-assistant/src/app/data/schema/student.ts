import { UserSchema } from './user';

export class StudentSchema extends UserSchema {
  /**
   *
   * @param name Student's name
   * @param surname Student's surname
   * @param email Student's email
   * @param index Student's index no
   * @param teamId Id of team to which belongs student
   * @param isTeamAdmin Is student has admin privileges
   */
  constructor(name: string, surname: string, email: string, public index: string, public teamId: string, public isTeamAdmin: boolean) {
    super(name, surname, email);
  }
}
