<script setup lang="ts">
import EventCard from '@/components/EventCard.vue';
import { type Event } from '@/types';
import { ref,onMounted , computed , watchEffect} from 'vue';
import EventService from '@/services/EventService';

const events = ref<Event[] | null>(null)

const totalEvents = ref(0)

const hasNextPage = computed(() => {
  const totalpages = Math.ceil(totalEvents.value / 2)
  return page.value < totalpages
})

const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
const page = computed(() => props.page)
// onMounted(() => {
//   EventService.getEvents(2, page.value)
//     .then((response) => {
//       events.value = response.data
//     })
//     .catch((error) => {
//       console.error('There was an error!' , error)
//     })
// })
watchEffect(() => {
  events.value = null
  EventService.getEvents(2, page.value)
    .then((response) => {
      events.value = response.data
      totalEvents.value = response.headers['x-total-count']
    })
    .catch((error) => {
      console.error('There was an error!' , error)
    })
})
// const events = ref<Event[]> ([
//   {
//     id: 5928101,
//     category: 'animal welfare',
//     title: 'Cat Adoption Day',
//     description: 'Find your new feline friend at this event.',
//     location: 'Meow Town',
//     date: 'January 28, 2022',
//     time: '12:00',
//     petsAllowed: true,
//     organizer: 'Kat Laydee'
//   },
//   {
//     id: 4582797,
//     category: 'food',
//     title: 'Community Gardening',
//     description: 'Join us as we tend to the community edible plants.',
//     location: 'Flora City',
//     date: 'March 14, 2022',
//     time: '10:00',
//     petsAllowed: true,
//     organizer: 'Fern Pollin'
//   },
//   {
//     id: 8419988,
//     category: 'sustainability',
//     title: 'Beach Cleanup',
//     description: 'Help pick up trash along the shore.',
//     location: 'Playa Del Carmen',
//     date: 'July 22, 2022',
//     time: '11:00',
//     petsAllowed: false,
//     organizer: 'Carey Wales'
//   }
// ])
</script>

<template>
    <h1>Events For Good</h1>
    <!-- new element-->
    <div class="events">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
      <div class="pagination">
        <RouterLink 
        id="page-prev"
        :to="{ name: 'event-list-view', query: { page:page -1 } }"
        rel="prev"
        v-if="page != 1">
        &#60;
        Prev Page
        </RouterLink>

        <RouterLink 
        id="page-next"
        :to="{ name: 'event-list-view', query: { page:page +1 } }"
        rel="next"
        v-if="hasNextPage">
        Next Page
        &#62;
      </RouterLink>
      </div>
    </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>