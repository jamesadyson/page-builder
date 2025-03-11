import Vue from 'vue'
import Vuex from 'vuex'
import pageBuilder from './modules/page-builder'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    pageBuilder
  }
})