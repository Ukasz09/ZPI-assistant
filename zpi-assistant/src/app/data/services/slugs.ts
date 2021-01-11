export class Slugs {
  static readonly ALL_TEAMS = '/teams';
  static readonly TEAM = '/teams/{id}';
  static readonly TEACHERS = '/teachers';
  static readonly STUDENTS = '/students';
  static readonly STUDENT = '/students/{id}';
  static readonly LEAVE_TEAM = '/students/leaveTeam?id={id}';
  static readonly MAILBOX = '/mailbox?id={id}';
  static readonly UPDATE_MESSAGE = '/mailbox?userId={useId}&msgId={msgId}';
}
