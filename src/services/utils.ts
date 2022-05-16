class Utils {
  /**
   * Возвращает номер квартала по месяцу
   * @param month Номер месяца
   */
  public getQuarterByMonth(month: string | number): number {
    switch (month) {
      case 1: {
        return 1;
        break;
      }
      case 2: {
        return 1;
        break;
      }
      case 3: {
        return 1;
        break;
      }
      case 4: {
        return 2;
        break;
      }
      case 5: {
        return 2;
        break;
      }
      case 6: {
        return 2;
        break;
      }
      case 7: {
        return 3;
        break;
      }
      case 8: {
        return 3;
        break;
      }
      case 9: {
        return 3;
        break;
      }
      case 10: {
        return 4;
        break;
      }
      case 11: {
        return 4;
        break;
      }
      case 12: {
        return 4;
        break;
      }
      default: {
        console.error(`Нет квартала с таким месяцем - ${month}`);
        return 0;
      }
    }
  }

  /**
   * Получить случайное число
   * @param min От
   * @param max До
   */
  public getRandomNum(min = 0, max = 1000000): number {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  /**
   * Получить случайное булевое значение
   */
  public getRandomBool(): boolean {
    return Boolean(this.getRandomNum(0, 1));
  }

  /**
   * Получить случайный цвет
   */
  public getRandomColor(): string {
    return `#${`${Math.random().toString(16)}000000`.substring(2, 8).toUpperCase()}`;
  }

  /**
   * Получить случайную строку
   */
  public getRandomString(): string {
    return (
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    );
  }
}

export const utils = new Utils();
