import { Prompt } from './Prompt';

export class AnswerQuestionPrompt extends Prompt {
  public toString(): string {
    return `あなたは英語の先生です。
生徒からの添削結果や英語に関する質問に対して、回答をしてください。
`;
  }
}
