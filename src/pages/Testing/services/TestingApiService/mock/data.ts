import { IQuestions } from "../../types";
import { EQuestionType } from 'pages/Testing/services';

export const data: IQuestions = {
  time: 1000,
  questions: [
    {
      id: "5feb4444-cfda-40d1-a0aa-dc28e5b9eed4",
      typeQuestion: EQuestionType.single,
      question: "Подуймате и выберите варианты ответа - вопрос 1:",
      answersToQuestion: [
        "Ответ 1",
        "Ответ 2",
        "Ответ 3",
        "Ответ 4",
      ],
    },
    {
      id: "861f200d-9e5f-43c1-b498-688b8af2dfd2",
      typeQuestion: EQuestionType.multiple,
      question: "Подуймате и выберите варианты ответа - вопрос 2:",
      answersToQuestion: [
        "Ответ 1",
        "Ответ 2",
        "Ответ 3",
        "Ответ 4",
      ],
    },
    {
      id: "c556e85b-693b-4168-9e09-d1544519eb53",
      typeQuestion: EQuestionType.detailed,
      question: "Подуймате и выберите варианты ответа - вопрос 3:",
    },
    {
      id: "59f198f5-fda0-4d4b-8b5c-6d63011edbc3",
      typeQuestion: EQuestionType.short,
      question: "Подуймате и выберите варианты ответа - вопрос 4:",
    },
  ]
};