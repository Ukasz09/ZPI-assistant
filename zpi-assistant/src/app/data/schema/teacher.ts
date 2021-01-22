import { UserSchema } from './user';

export class TeacherSchema extends UserSchema {
  /**
   * @param name Teacher's name
   * @param surname Teacher's surname
   * @param email Teacher's email address
   * @param title Teacher's academic title
   */
  constructor(name: string, surname: string, email: string, public title: string) {
    super(name, surname, email);
  }
}
