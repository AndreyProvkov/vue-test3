import { createRouter, createWebHistory } from 'vue-router'
import UserView from '../views/UserView.vue'

const routes = [
  {
    path: '/:id',
    name: 'user',
    component: UserView,
    meta: { requireAuth: true },
    props: (route) => ({ query: route.query }),
  },
  {
    path: '/login',
    name: 'login',
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

export default router
