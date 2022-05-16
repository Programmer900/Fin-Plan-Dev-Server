import { DynamicObject } from '@/interfaces';

class MeUtils {
  private values: any[][] = [];

  private categories: string[] = [];

  private setValues(data) {
    data.forEach((subArr: any[], subArrIndex) => {
      const open = subArr[1];
      const high = subArr[2];
      const low = subArr[3];
      const close = subArr[4];

      this.values.push([this.categories[subArrIndex], open, high, low, close]);
    });
  }

  private setCategories(data) {
    data.forEach((subArr: any[]) => {
      const date = new Date(subArr[0]);
      const formattedDate = date
        .toLocaleString('ru-RU', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
        .slice(0, -3);
      this.categories.push(formattedDate);
    });
  }

  public getValues(): DynamicObject[] {
    return this.values;
  }

  public getCategories(): string[] {
    return this.categories;
  }

  public init(data): boolean {
    this.setCategories(data);
    this.setValues(data);
    return true;
  }
}

export const meUtils = new MeUtils();
