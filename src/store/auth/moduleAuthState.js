/*=========================================================================================
  File Name: moduleAuthState.js
  Description: Auth Module State
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  isUserLoggedIn: () => {
    let isAuthenticated = false

    // get firebase current user
    const firebaseCurrentUser = firebase.auth().currentUser

    if (firebaseCurrentUser) isAuthenticated = true
    else isAuthenticated = false

    return localStorage.getItem('userInfo') && isAuthenticated
  }
}
