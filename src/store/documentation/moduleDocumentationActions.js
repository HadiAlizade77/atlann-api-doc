import firebase from 'firebase/app'
import router from '@/router'

export default {

  appInfo ({dispatch}, payload) {
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
      payload.notify({
        title: 'Successful',
        text: 'Application information saved successfully!',
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
  createCategory ({dispatch}, payload) {
    const db = firebase.firestore()

    const newPayload = {
      title: payload.items.title,
      slug:  payload.items.title.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()
    }

    db.collection('categories').add(newPayload).then(function () {
      payload.notify({
        title: 'Successful',
        text: 'New Category created successfully!',
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
  saveNewApi ({dispatch}, payload) {
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
  localSave({dispatch}, payload) {
    localStorage.setItem('localSave', JSON.stringify(payload))
  },
  cleanLocalSave() {
    localStorage.removeItem('localSave')
  }

}
