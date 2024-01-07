import type { CorrectEnglishResult } from '$lib/gpt/type';

type MessageOwner = 'ai' | 'user';

export type Message = ChatMessage | CorrectionMessage;

export type ChatMessage = {
  text: string;
  owner: MessageOwner;
  type: 'chat';
};

export type CorrectionMessage = {
  text: string;
  correctedResult: CorrectEnglishResult;
  owner: 'ai';
  type: 'correction';
};

export const isChatMessage = (message: Message): message is ChatMessage => {
  return message.type === 'chat';
};

export const isCorrectionMessage = (
  message: Message
): message is CorrectionMessage => {
  return message.type === 'correction';
};
