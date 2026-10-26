export interface MessageModel {
  id: number;
  text: string;
  source: string;
  userId: string;
  telegramId: string | null;
  createdAt: string;
  processed: boolean;
}
