export const getters = {
  getObligationsAll: (state) => () => {
    return state.obligations
  },
  getObligationsById: (state) => (id) => {
    return state.obligations.filter(o => o.id === id)
  },
  getObligationsSearched: (state) => (query) => {
    if(query) {
      return state.obligations.filter(o => o.value.toLowerCase().indexOf(query.toLowerCase()) != '-1')
    } else {
      return []
    }
  },
  getCurrentObligations: (state) => {
    return state.activeObligation
  },
  getIisData: state => state.dataIis,
  getIisDeposits: state => state.deposits
}
