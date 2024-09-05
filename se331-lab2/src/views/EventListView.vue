<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import type { Event } from '@/types'
import { RouterLink, useRoute } from 'vue-router'
import { computed, ref, watchEffect, onMounted } from 'vue'
import EventService from '@/services/EventService'

const pageSize = computed(() => parseInt(route.query.size as string) || 2)
const events = ref<Event[] | null>(null)
const totalEvent = ref<number>(0)
const route = useRoute()

const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
const page = computed(() => props.page)
onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(3, page.value)
      .then((response) => {
        events.value = response.data
        totalEvent.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.error('There was an error', error)
      })
  })
})

const hasNextPage = computed(() => {
  // first calculate the total page
  const totalPages = Math.ceil(totalEvent.value / 3)
  return page.value < totalPages
})
</script>

<template>
  <h1>Events For Good</h1>

  <div class="flex flex-col items-center">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <RouterLink
        :to="{ name: 'event-list-view', query: { page: page - 1, size: pageSize } }"
        rel="prev"
        v-if="page != 1"
        id="page-prev"
      >
        &#60; Prev Page
      </RouterLink>
      <RouterLink
        :to="{ name: 'event-list-view', query: { page: page + 1, size: pageSize } }"
        rel="next"
        v-if="hasNextPage"
        id="page-next"
      >
        Next Page &#62;
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
/* .events,
.events2 {
  display: flex;
  flex-direction: column;
  align-items: center;
} */

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
