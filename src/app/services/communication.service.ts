import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';
import { Message } from '../models/message';
import { MessageType } from '../enums/message-type.enum';

@Injectable({ providedIn: 'root' }) 
export class CommunicationService {
  private messageSource = new BehaviorSubject<Message>({ type: MessageType.Added, payload: '' });
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: Message) {
    this.messageSource.next(message);
  }

}