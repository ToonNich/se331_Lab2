<script setup lang="ts">
import { RouterView } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useEventStore } from '@/stores/event';

const store = useEventStore()
const { event }  = storeToRefs(store)


// onMounted(() => {
//   EventService.getEvent(parseInt(props.id))
//     .then((response) => {
//       event.value = response.data
//     })
//     .catch((error) => {
//       if (error.response && error.response.status === 404) {
//         router.push({
//           name: '404-resource-view',
//           params: { resource: 'event' }
//         })
//       } else {
//         router.push({ name: 'network-error-view' })
//       }
//     })
// })
</script>
<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <nav>
      <router-link :to="{ name: 'event-detail-view' }"> Details </router-link> |
      <router-link :to="{ name: 'event-register-view' }"> Register </router-link> |
      <router-link :to="{ name: 'event-edit-view' }"> Edit </router-link>
    </nav>
    <RouterView :event="event" />
  </div>
</template>
