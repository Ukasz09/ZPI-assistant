import { UserSchema } from './user';

export class StudentSchema extends UserSchema {
  constructor(name: string, surname: string, email: string, public index: string, public teamId: string, public isTeamAdmin: boolean) {
    super(name, surname, email);
  }
}
