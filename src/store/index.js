import Vue from 'vue'
import Vuex from 'vuex'
const Store = require('../utils/store.js')

Vue.use(Vuex)

export const defaults = {
  state: {
    last_file: '',
    // draft file to use and store in the state
    draft: { title: '' },
    files: {
      '': {
        type: 'draft',
        name: '▶︎ Draft',
        path: ''
      }
    }
  },
  // 800x600 is the default size of our window
  windowBounds: { width: 800, height: 600 }
}

const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: 'user-preferences',
  defaults: defaults
})

export default new Vuex.Store({
  state: store.data.state,
  mutations: {
    update_draft (state, draft) {
      state.draft = draft
    },
    update_last_file (state, lastFile) {
      console.log(['update lat file', lastFile])
      state.last_file = lastFile
    },
    add_file (state, file) {
      state.files[file.path] = file
    }
  },
  actions: {
    updateDraft ({ commit }, draft) {
      commit('update_last_file', '')
      commit('update_draft', draft)
      store.save()
    },
    updateLastFile ({ commit }, lastFile) {
      commit('update_last_file', lastFile)
      store.save()
    },
    addFile ({ commit }, file) {
      commit('add_file', file)
      store.save()
    }

  },
  modules: {
  }
})
