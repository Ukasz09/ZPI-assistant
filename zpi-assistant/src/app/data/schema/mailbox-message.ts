import { MessageTypes } from 'src/app/shared/logic/message-types';

export class Message {
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
