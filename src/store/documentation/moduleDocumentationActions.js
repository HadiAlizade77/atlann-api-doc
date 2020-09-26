import firebase from 'firebase/app'

export default {

  appInfo ({commit}, payload) {
    const newPayload = {
      appTitle: payload.items.title,
      contact: {
        developerName: payload.items.contact.devName,
        developerMail: payload.items.contact.devMail,
        developerPhone: payload.items.contact.devPhone
      }
    }
    const db = firebase.firestore()
    db.collection('app').doc('info').set(newPayload).then(function () {
      commit('SET_APP_INFO',payload.items)
      payload.notify({
        title: 'Successful',
        text: 'Application information saved successfully!',
        iconPack: 'feather',
        icon: 'icon-check',
        color: 'success'
      })
    }).catch(function (err) {
      payload.notify({
        time: 2500,
        title: 'Error',
        text: err.message,
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
      })
    })

  },
  fetchAppInfo({commit}) {
    const db = firebase.firestore()
    db.collection("app").doc('info').get().then(function(doc) {
      commit('SET_APP_INFO',{
        title : doc.data().appTitle,
        contact: {
          devName : doc.data().contact.developerName,
          devMail : doc.data().contact.developerMail,
          devPhone : doc.data().contact.developerPhone
        }
      })
    })
    },
  createCategory ({commit}, payload) {
    const db = firebase.firestore()

    const newPayload = {
      title: payload.items.title,
      slug:  payload.items.title.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()
    }

    db.collection('categories').add(newPayload).then(function (docRef) {

      payload.notify({
        title: 'Successful',
        text: 'New Category created successfully!',
        iconPack: 'feather',
        icon: 'icon-check',
        color: 'success'
      })
      commit('UPDATE_CATEGORIES', {id : docRef.id,data:newPayload})
    })
      .catch(function (err) {
        payload.notify({
          time: 2500,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      })
  },
  saveNewApi ({commit}, payload) {
    const db = firebase.firestore()
    const self = this
    db.collection('documents').add(payload.items).then(function () {

      self.cleanLocalSave() // delete unsaved changes

      payload.notify({
        title: 'Successful',
        text: 'New API\'s document saved successfully!',
        iconPack: 'feather',
        icon: 'icon-check',
        color: 'success'
      })
    })
      .catch(function (err) {
        payload.notify({
          time: 2500,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      })
  },


  localSave ({commit}, payload) {
    localStorage.setItem('localSave', JSON.stringify(payload))
  },
  cleanLocalSave () {
    localStorage.removeItem('localSave')
  },
  fetchCategories({commit}){
    let categories = []
    const db = firebase.firestore()
    db.collection("categories").get().then((querySnapshot) => {
      querySnapshot.forEach((category) => {
        let data = category.data()
       categories.push({id : category.id,data})
      });
      commit('SET_CATEGORIES',categories)
    });
  }
}
