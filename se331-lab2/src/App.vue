<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from './stores/message'
import { storeToRefs } from 'pinia'
import { injectSpeedInsights } from '@vercel/speed-insights';

injectSpeedInsights();
const store = useMessageStore()
const { message } = storeToRefs(store)
</script>
<template>
<div class="text-center font-sans text-gray-700 antialias">
<header>
<div id="flashMessage" class="animate-fade" v-if="message">
<h4>{{ message }}</h4>
</div>
<h1>Deploy with vercel</h1>
<div class="wrapper">
<nav class="py-6">
<RouterLink
           class="font-bold text-gray-700"
           exact-active-class="text-green-500"
           :to="{ name: 'event-list-view' }"
>Event</RouterLink
>
         |
<RouterLink
           class="font-bold text-gray-700"
           exact-active-class="text-green-500"
           :to="{ name: 'about' }"
>About</RouterLink
>
         |
<RouterLink
           class="font-bold text-gray-700"
           exact-active-class="text-green-500"
           :to="{ name: 'student' }"
>Student</RouterLink
>
|
<RouterLink
           class="font-bold text-gray-700"
           exact-active-class="text-green-500"
           :to="{ name: 'add-event' }"
>New Event</RouterLink
>

</nav>
</div>
</header>
<RouterView />
</div>
</template>
<style>
nav a {
 font-weight: bold;
 color: #2c3e50;
}
nav a.router-link-exact-active {
 color: #42b983;
}
h2 {
 font-size: 20px;
}
</style>