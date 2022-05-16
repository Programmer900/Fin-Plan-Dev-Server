import { DynamicObject } from '@/interfaces';

class MeUtils {
  private readonly increaseBad = 'stock__increase--bad';

  private readonly increaseGood = 'stock__increase--good';

  private readonly increaseEmpty = 'stock__increase--no-data';

  private readonly emptyText = '0.00';

  public checkIncreaseClass(value: string | number | null): string {
    if (value) {
      const num = Number(value);
      if (num >= 0) {
        return this.increaseGood;
      }
      return this.increaseBad;
    }
    return this.increaseEmpty;
  }

  public checkExist(value: string | number | null): string | number {
    if (!value) {
      return this.emptyText;
    }
    return value;
  }

  public toFixed(value: string | number | null, to = 2): string {
    const _value = this.checkExist(value);
    if (_value !== this.emptyText) {
      return Number(_value).toFixed(to);
    }
    return _value;
  }

  public isExistItem(item: DynamicObject | null): DynamicObject | null {
    if (item) {
      const itemKeysLength = Object.keys(item).length;
      if (itemKeysLength !== 0) {
        return item;
      }
      return null;
    }

    return null;
  }

  public convertDate(date: string | null): string {
    if (date) {
      return date.toString().split('-').reverse().join('.');
    }
    return '';
  }
}

export const meUtils = new MeUtils();
