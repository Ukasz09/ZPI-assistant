import { UserSchema } from './user';

export class TeacherSchema extends UserSchema {
  constructor(name: string, surname: string, email: string, public title: string) {
    super(name, surname, email);
  }
}
