import { data } from './mock/data'
import { IAnswers, IQuestions, IResultTest } from '../types';
import { MOCK_URL } from './mock/constants';
import { post } from 'services/api';
import { sleep } from 'utils/sleep';


class CTestingApiService {

  /** Получение теста по id пользователя
   * @id id пользователя
   */
  async getQuestions(id: string): Promise<IQuestions> {
    //параметр необходимо будет использовать, поэтому вывел как mock в консоль
    console.log(`getQuestions for userId: ${id}`)
    //Эмуляция получения данных
    await sleep(500)

    return Promise.resolve(data)
  }

  /** Отправка ответа на сервер и получение результатов теста */
  async sendAnswers(data: IAnswers): Promise<IResultTest> {
    const result = await post<IResultTest, IAnswers>(MOCK_URL, data);

    return result;
  }
}
export const TestingApiService = new CTestingApiService();
