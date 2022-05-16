export const mutations = {
  showModal(state) {
    state.modal = true
  },
  showModalDetail(state, payload) {
    state.active = payload
    state.modalDetail = true
  },
  closeModal(state, payload) {
    state.modal = false
  },
  closeModalDetail(state) {
    state.modalDetail = false
  }
}
