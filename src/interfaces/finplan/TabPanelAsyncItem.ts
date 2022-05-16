import { Component } from 'vue';

export interface ITabPanelAsyncItem {
  label: string;
  component: Component;
  value: string | number;
  type: string;
}
