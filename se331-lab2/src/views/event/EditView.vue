<script setup lang="ts">
import{toRefs, defineProps} from 'vue'
import { type Event } from '@/types'
import { useMessageStore } from '@/stores/message'
import { useRouter } from 'vue-router'

const store = useMessageStore()
const router = useRouter()
const props = defineProps<{
    event: Event
}>()

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const {event} = toRefs(props)

const edit = () => {
  store.updatedMessage('The data has been updated')
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({ name: 'event-edit-view', params: { id: props.event.id} })
}
</script>

<template>
  <div class="text-center"> 
    <p>Edit event here</p>
  <button @click="edit">Edit Me!</button>
  </div>
    
  
  
</template>