import { defineStore } from 'pinia';
import { ApiStatusCode, useApiFinplan } from '@/use/api/useApiFinplan';
import { DynamicObject } from '@/interfaces';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userInfo: {} as DynamicObject,
  }),
  getters: {
    getId(state): number {
      return Number(state.userInfo.USER_ID);
    },
  },
  actions: {
    async setCurrentUser(debug = false) {
      const api = useApiFinplan();
      const response = await api.getUser(debug);
      if (response.status === ApiStatusCode.success) {
        try {
          Object.assign(this.userInfo, response.data);
          if (debug) {
            this.userInfo.USER_ID = 7307;
          }
        } catch (e) {
          console.error('setCurrentUser error');
          console.error(e);
        }
      }
    },
  },
});
