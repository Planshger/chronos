import { MessageModel, NewMessageModel } from '../../models/message_model';
import { apiRequest } from '../../../../shared/api/apiRequest';

export function getMessages(userId: number): Promise<MessageModel[]> {
  const params = new URLSearchParams({ userId: String(userId), sortBy: '-createdAt' });
  return apiRequest<MessageModel[]>(`/messages?${params.toString()}`);
}

export function sendMessage(message: NewMessageModel): Promise<MessageModel> {
  return apiRequest<MessageModel>('/messages', {
    method: 'POST',
    body: JSON.stringify(message),
  });
}
