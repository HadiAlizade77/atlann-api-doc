
export default {
  SET_CATEGORIES (state, categories) {
    state.categories = categories
  },
  UPDATE_CATEGORIES (state, category) {
    state.categories.push(category)
  },
  SET_APP_INFO (state,payload){
    state.appInfo = payload
  }
}
