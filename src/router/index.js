import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Doc from '../views/Document.vue'

VueRouter.duplicationErroringPush = VueRouter.push
VueRouter.push = async function (location) {
  return router.duplicationErroringPush(location).catch((error) => {
    if (error.name === 'NavigationDuplicated') {
      return this.currentRoute
    }
    throw error
  })
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/doc',
    name: 'document',
    component: Doc
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes,
  // mode: 'history',
  duplicateNavigationPolicy: 'reload'
})

export default router
