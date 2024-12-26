import { MessageType } from "../enums/message-type.enum";

export interface Message {
    type: MessageType;
    payload: string;
}
