export const mutations = {
  showModal(state: any) {
    state.modal = true
  },
  showModalDetail(state: any, payload: Boolean) {
    state.active = payload
    state.modalDetail = true
  },
  closeModal(state: any) {
    state.modal = false
  },
  closeModalDetail(state: any) {
    state.modalDetail = false
  }
}
