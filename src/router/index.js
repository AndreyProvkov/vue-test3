import { createRouter, createWebHistory } from 'vue-router'
import UserView from '../views/UserView.vue'

const routes = [
  {
    path: '/user/:id',
    name: 'user',
    component: UserView,
    meta: { requireAuth: true },
    beforeEnter: (to) => {
      const dataAuth = JSON.parse(localStorage.getItem('authData'))
      if (to.params.id !== String(dataAuth.id_login)) {
        return {
          path: `/user/${dataAuth.id_login}`
        }
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'AuthLayout' },
    beforeEnter: () => {
      const dataAuth = JSON.parse(localStorage.getItem('authData'))
      if (dataAuth) {
        return {
          path: `/user/${dataAuth.id_login}`
        }
      }
      return true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/page-not-found',
    name: 'page-not-found',
    component: () => import('../views/PageNotFound.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'page-not-found' }
  }
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  if (to.meta.requireAuth &&
    to.name !== 'login' &&
    !localStorage.getItem('authData')) {
    return {
      name: 'login',
      query: { redirect: to.fullPath }
    }
  }
  return true
})

export default router
