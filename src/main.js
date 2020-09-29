import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import Subscriptions from './components/Subscriptions.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      layout: 'Layout'
    },
  },
  {
    path: '/subscriptions',
    component: Subscriptions,
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

Vue.directive('enabled', {
  inserted: (element, binding) => {
    element.disabled = ! binding.value
  },
  update: (element, binding) => {
    element.disabled = ! binding.value
  }
})

new Vue({
  router,
  render: h => h(App),
  computed: {
    layout: function () {
      return this.$route.meta.layout || 'Layout';
    }
  },
}).$mount('#app')
