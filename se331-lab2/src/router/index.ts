import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import AboutView from '@/views/AboutView.vue'
import StudentView from '@/views/StudentView.vue'
import DetailView from '../views/event/DetailView.vue'
import EditView from '@/views/event/EditView.vue'
import RegisterView from '@/views/event/RegisterView.vue'
import LayoutView from '@/views/event/LayoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import nProgress from 'nprogress'
import EventService from '@/services/EventService'
import { useEventStore } from '@/stores/event'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({page: parseInt(route.query?.page as string || '1'), size: parseInt(route.query?.page as string || '2')  })
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/student',
      name: 'student',
      component: StudentView
    },
    {
      path: '/event/:id',
      name: 'event-detail-view',
      component: DetailView

    },
    {
      path: '/event/:id/register',
      name: 'event-register-view',
      component: RegisterView

    },
    {
      path: '/event/:id/edit',
      name: 'event-edit-view',
      component: EditView

    },
    {
      path: '/event/:id',
      name: 'event-layout-view',
      component: LayoutView,
      props: true,
      beforeEnter: (to) => {
        const id = parseInt(to.params.id as string)
        const eventStore = useEventStore()
        return EventService.getEvent(id)
        .then((response) => {
          //need to setup the data for the event
          eventStore.setEvent(response.data)
        })
        .catch((error) => {
          if(error.response && error.response.status === 404){
            return {
              name: '404-resource-view',
              params: { resource: 'event'}
            }
          } else{
            return { name: 'network-error-view'}
          }
        })
      },
      children: [
        {
          path: '',
          name: 'event-detail-view',
          component: DetailView,
          props: true,
        },
        {
          path: 'edit',
          name: 'event-edit-view',
          component:EditView,
          props: true
        },
        {
          path: 'register',
          name: 'event-register-view',
          component: RegisterView,
          props: true
        }

      ]
      
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if(savedPosition){
      return savedPosition
    } else{
      return { top: 0 }
    }
  }
})
router.beforeEach(() => {
  nProgress.start()
})
router.afterEach(() => {
  nProgress.done()
})

export default router
