// src/main.js

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/main.css'

// Register icon components
import './components/icons'

// Register section components
import TestimonialSection from './components/sections/TestimonialSection.vue'
import HeroSection from './components/sections/HeroSection.vue'
import FeaturesSection from './components/sections/FeaturesSection.vue'
import AttentionBarSection from './components/sections/AttentionBarSection.vue'
import CallToActionSection from './components/sections/CallToActionSection.vue'

// Register global components
Vue.component('TestimonialSection', TestimonialSection)
Vue.component('HeroSection', HeroSection)
Vue.component('FeaturesSection', FeaturesSection)
Vue.component('AttentionBarSection', AttentionBarSection)
Vue.component('CallToActionSection', CallToActionSection)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')