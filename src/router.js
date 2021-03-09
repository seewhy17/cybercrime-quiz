import { createWebHistory, createRouter } from 'vue-router'

const NotFound = () =>
  import(
    /* webpackChunkName: "home" */
    /* webpackPrefetch: true */
    './views/NotFound.vue'
  )

const HomePage = () =>
  import(
    /* webpackChunkName: "home" */
    /* webpackPrefetch: true */
    './views/HomePage.vue'
  )

const AssessmentQuiz = () =>
  import(
    /* webpackChunkName: "accounts" */
    /* webpackPrefetch: true */
    './views/AssessmentQuiz.vue'
  );

const LearnMore = () =>
  import(
    /* webpackChunkName: "savings" */
    /* webpackPrefetch: true */
    './views/LearnMore.vue'
  )




const routes = [
  {
    // path: '/:catchAll(.*)',
    path: '/:pathMatch(.*)*',
    component: NotFound
  },
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/quiz',
    name: 'qquiz',
    component: AssessmentQuiz
  },
  {
    path: '/learn',
    name: 'learn',
    component: LearnMore
  }
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({
    y: 0
  }),
  linkActiveClass: '',
  routes,
})


export default router;
