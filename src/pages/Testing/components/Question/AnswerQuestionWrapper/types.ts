import { IHaveQuestion } from "../types";

export interface IAnswerQuestionWrapperProps {
  submit: () => void;
  question: string | undefined;
}