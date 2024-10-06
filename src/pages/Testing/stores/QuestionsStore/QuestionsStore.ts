import { makeAutoObservable } from "mobx"
import { TestingApiService } from '../../services/TestingApiService';

import { EQuestionType, IAnswer, IAnswers, IQuestion, IQuestions, IResultTest } from 'pages/Testing/services';
import { sleep } from "utils/sleep";

class CQuestionsStore {
  //тут храним вопросы и ответы
  questions: IQuestion[] = [];
  answers: IAnswers[] = []

  /**флаг состояния загрузки*/
  isPending: boolean = false;
  /**флаг завершения теста*/
  isFinished: boolean = false;

  /**выбранный в данный момент вопрос*/
  selected: number | undefined = undefined;

  userId: string | undefined = undefined;

  /**время с бекенда выделенное на прохождение теста*/
  totalTime: number | undefined = undefined;

  /**оставшееся время*/
  timeLeft: number | undefined = undefined;

  /**результат теста*/
  result: IResultTest | undefined = undefined;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async init(userId: string): void {
    this.reset();
    this.setUserId(userId);
    const result = await this.getQuestions(userId);
    this.setQuestions(result.questions);
    // localStorage.clear(`${this.userId}`);
    //Инициализация времени
    this.setTotalTime(result.time);
    const savedTime = localStorage.getItem('timer');
    this.setTimeLeft(savedTime ? Number(savedTime) : result.time);

    //Ищем сохранненые ответы в ls
    const loadAnswers = localStorage.getItem(`${this.userId}`);
    if (loadAnswers) {
      const answers = JSON.parse(loadAnswers)
      this.setAnswers(answers)
      this.setSelected(answers.length)
    }
  }

  reset() {
    this.setSelected(0);
    this.setResultTest(undefined);
  }

  /**сохранение ответа и переход к следущему вопросу*/
  onAnswer(answer: number[] | number | string): void {
    this.setAnswers([...this.answers, { answer, id: this.selectedQuestion?.id }])
    //если вопросов больше нет, завершаем тест
    if (this.selected < this.count - 1) {
      this.setSelected(this.selected + 1);
    } else {
      this.endTesting();
    }
  }

  async getQuestions(id: string): Promise<IQuestions> {
    this.setIsPending(true);
    const result = await TestingApiService.getQuestions(id);
    this.setIsPending(false);

    return result;
  }

  /** Отправка ответов на бек */
  async sendAnswers(): Promise<void> {
    this.setIsPending(true);
    /**закомментируем пока нет бека.
     * получим мок данные с задержкой для отображения загрузки
    */
    // const data: IAnswers = {
    //   id: this.userId,
    //   answers: this.answers
    // };
    // const result = await TestingApiService.sendAnswers(data);

    await sleep(2000)

    const result: IResultTest = {
      countQuestion: 4,
      correctAnswers: 2,
      passed: true
    }
    this.setIsPending(false);
    this.setResultTest(result);
  }

  /** сохраняет оставшееся время и уже отвеченные вопросы в ls*/
  saveLocalStorage(): void {
    localStorage.setItem('timer', this.timeLeft.toString());
    //если массив ответов не пустой сохраним его в ls
    if (this.answers.length > 0) {
      // ключем будет id пользователя который проходит тест
      localStorage.setItem(`${this.userId}`, JSON.stringify(this.answers));
    }
  }

  protected setIsPending(value: boolean): void {
    this.isPending = value;
  }

  protected setQuestions(questions: IQuestion[]): void {
    this.questions = questions;
  }

  protected setSelected(value: number | undefined): void {
    this.selected = value;
  }

  protected setAnswers(answers: IAnswer[]): void {
    this.answers = answers;
  }

  protected setUserId(userId: string): void {
    this.userId = userId;
  }

  protected setTotalTime(time: number): void {
    this.totalTime = time;
  }

  protected setResultTest(result: IResultTest | undeifned): void {
    this.result = result;
  }

  setIsFinished(value: boolean): void {
    this.isFinished = value;
  }

  setTimeLeft(time: number): void {
    this.timeLeft = time;
  }

  /** Завершение теста вызывает:
   * - взведение флага окончания,
   * - удаление таймера из хранилища,
   * - и отправку результатов на бек
   */
  endTesting(): void {
    this.setIsFinished(true)
    this.sendAnswers();
    localStorage.removeItem('timer');
    localStorage.removeItem(`${this.userId}`)
  }


  /** таймер, который по окончанию вызывает завершение теста */
  decreaseTimer(): void {
    if (this.timeLeft - 1 === 0) {
      this.endTesting()
    }
    this.setTimeLeft(this.timeLeft - 1)
  }


  /** количество вопросов в тесте */
  get count(): number {
    return this.questions.length
  }

  /**предоставляет вопрос вместе со всеми его параметрами */
  get selectedQuestion(): IQuestion | undefined {
    return this.questions ? this.questions[this.selected] : undefined;
  }

  /**возвращает тип выбранного вопроса */
  get typeSelectedQuestion(): EQuestionType | undefined {
    return this.selectedQuestion?.typeQuestion;
  }
}

export const QuestionsStore = new CQuestionsStore();
