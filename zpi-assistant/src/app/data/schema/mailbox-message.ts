import { MessageTypes } from 'src/app/shared/logic/message-types';

export class Message {
  /**
   *
   * @param id Id of message
   * @param from Email sender
   * @param to Email recipient
   * @param subject Email subject
   * @param msgLines Lines of email content text
   * @param type Message type
   * @param isRead Is message has been readed
   */
  constructor(
    public id: string,
    public from: string,
    public to: string,
    public subject: string,
    public msgLines: string[],
    public type: MessageTypes,
    public isRead: boolean
  ) {}
}
