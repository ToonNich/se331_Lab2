import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue' 
import AboutView from '@/views/AboutView.vue'
import EventDetailView from '@/views/EventDetailView.vue'
import StudentView from '@/views/StudentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView
    },
    {
      path: '/event/:id',
      name: 'event-detail-view',
      component: EventDetailView,
      props: (route) => ({ page: parseInt(route.query.page?.toString() || '1')})
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
      component : AboutView
    },
    {
      path: '/student',
      name: 'student',
      component: StudentView
    }
  ]
})

export default router
