/**
 * @question массив вопросов
 * @time время на решение теста в секундах
 */
export interface IQuestions {
  questions: IQuestion[];
  time: number;
}

/**
 * Интерфейс item теста приходящий с бекенда
 *
 * @id id теста в системе на беке
 * @typeQuestion тип теста, расширяется через enum
 * @question вопрос теста
 * @answersToQuestion необязательный параметр, прелагаемые варианты ответа
 */
export interface IQuestion {
  id: string;
  typeQuestion: EQuestionType;
  question: string;
  answersToQuestion?: string[];
}

export interface IAnswers {
  usersId: string;
  answers: IAnswer[]
}

/**
 * @id id вопроса(приходит с backend`a)
 * @answer ответ
 */
export interface IAnswer {
  id: string;
  answer: number[] | string
}

export enum EQuestionType {
  single = 'single',
  multiple = 'multiple',
  short = 'short',
  detailed = 'detailed'
}

/**
 * @countQuestion Всего вопросов в тесте
 * @correctAnswers Правильных ответов
 * @passed Статус пройден тест успешно или нет
 */
export interface IResultTest {
  countQuestion: number;
  correctAnswers: number;
  passed: boolean;
  /** Возможно нужно еще добавить затраченное время прохождения теста */
  /** timeSpent */
}