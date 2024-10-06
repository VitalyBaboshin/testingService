import { idUser1 } from './mockUserId';

class CUserStore {
  /**id пользователя, который сейчас авторизован */
  public userId = idUser1;
}

export const UserStore = new CUserStore();