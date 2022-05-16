import { DynamicObject } from '@/interfaces';

class MeUtils {
  private seriesData: DynamicObject[] = [];

  private getSettings(): DynamicObject {
    return {
      chart: {
        type: 'line',
        backgroundColor: '',
      },
      title: {
        text: '',
      },
      legend: {
        enabled: false,
        verticalAlign: 'top',
        itemStyle: {
          fontSize: '16px',
          fontFamily: 'Montserrat',
        },
      },
      credits: {
        enabled: false,
      },
      yAxis: [
        {
          gridLineColor: '#c2c2c2',
          title: {
            text: '',
          },
          labels: {
            style: {
              fontSize: '16px',
              color: '#838383',
              fontFamily: 'Montserrat',
            },
          },
        },
        {
          opposite: true,
          gridLineColor: '#c2c2c2',
          title: {
            text: '',
          },
          labels: {
            style: {
              fontSize: '16px',
              color: '#838383',
              fontFamily: 'Montserrat',
            },
          },
        },
      ],
    };
  }

  private initSeriesData() {
    this.seriesData = [];
  }

  public init(data: DynamicObject): DynamicObject {
    return this.getSettings();
  }
}

export const meUtils = new MeUtils();
