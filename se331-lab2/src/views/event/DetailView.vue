<script setup lang="ts">
import{toRefs, defineProps} from 'vue'
import { type Event } from '@/types'


const props = defineProps<{
    event: Event
    id: String
}>()

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const {event} = toRefs(props)
</script>

<template>
  <p class="flex flex-col items-center">{{ event.title }} on @ {{ event.location }}</p>
  <p class="flex flex-col items-center">{{ event.description }}</p>
</template>
