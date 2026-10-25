import { API_BASE_URL } from '../../../../core/api/URL';
import { MessageModel } from '../../models/message_model';

export function getMessages(userId: number): Promise<MessageModel[]> {
  let str = `${API_BASE_URL}/messages?userId=${userId}&sortBy=-createdAt`;
  return fetch(str).then((res) => res.json());
}

export function sendMessage(message: MessageModel): Promise<MessageModel> {
  return fetch(`${API_BASE_URL}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  }).then((res) => res.json());
}
