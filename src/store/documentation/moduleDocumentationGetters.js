export default {
  getLocalSave() {
    return JSON.parse(localStorage.getItem('localSave'))
  }
}
