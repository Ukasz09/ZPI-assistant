export class UserSchema {
  /**
   * @param name User's name
   * @param surname User's surname
   * @param email User's email
   */
  constructor(public name: string, public surname: string, public email: string) {}
}
