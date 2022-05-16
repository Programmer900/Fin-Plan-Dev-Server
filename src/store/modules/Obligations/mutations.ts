export const mutations = {
  activeObligation(state: any, payload): void {
    state.activeObligation = payload
  },
  clearActiveObligation(state: any): void {
    state.activeObligation = null
  },
  saveCalculateIisData(state: any, payload): void {
    state.dataIis = {...state.dataIis, ...payload }
  },
  saveCalculateIisDetailData(state: any, payload): void {
    state.deposits = payload
  },
}
