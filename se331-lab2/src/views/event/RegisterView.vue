<script setup lang="ts">
import { toRefs , defineProps } from 'vue';
import { type Event } from '@/types'

const props = defineProps<{
    event: Event
    id: String
}>()

const { event } = toRefs(props)

const register = () => {
    // If...
    // Push...
}

</script>
<template>
    <p>Register event here</p>
    <button @click="register">Register</button>
</template>