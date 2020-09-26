export default {
  getLocalSave () {
    const storage = localStorage.getItem('localSave')
    return storage !== null ? JSON.parse(storage) : null
  },

  getCategories (state) {
    return state.categories
  },
  getAppInfo (state) {
    return state.appInfo
  }
}
