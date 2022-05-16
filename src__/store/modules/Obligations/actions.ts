import { LS_LOCALE } from '../../../../env.common';

export const actions = {
  searchBy({ getters }, search) {
    return new Promise(resolve => {
      setTimeout(() => resolve(getters.getObligationsSearched(search)), 100)
    })
  },
  obligationsAll: async ({ getters }) => {
    return await getters.getObligationsAll()
  },
  setCurrentObligation: ({ getters, commit }, payload) => {
    commit('activeObligation', payload)
  },
  clearActiveObligation({ commit }) {
    commit('clearActiveObligation')
  },
  saveCalculateIisData({ commit }, payload) {
    commit('saveCalculateIisData', payload)
  },
  saveCalculateIisDetailData({ commit }, payload) {
    commit('saveCalculateIisDetailData', payload)
  }
}
