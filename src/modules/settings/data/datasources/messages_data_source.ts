import { apiRequest } from '../../../../shared/api/apiRequest';
import { MessageModel } from '../../models/message_model';

export function getMessages(userId: number): Promise<MessageModel[]> {
  const params = new URLSearchParams({ userId: String(userId), sortBy: '-createdAt' });
  return apiRequest<MessageModel[]>(`/messages?${params.toString()}`);
}

export function sendMessage(message: MessageModel): Promise<MessageModel> {
  return apiRequest<MessageModel>('/messages', {
    method: 'POST',
    body: JSON.stringify(message),
  });
}
