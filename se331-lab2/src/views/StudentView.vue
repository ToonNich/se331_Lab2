<script setup lang="ts">
import StudentCard from '@/components/StudentCard.vue'
import type {Student} from '@/types'
import{ ref, onMounted } from 'vue'
import StudentService from '@/services/StudentService'

const students = ref<Student[] | null>(null)

onMounted(() => {
  StudentService.getEvents()
  .then((response) => {
    students.value = response.data
  })
  .catch((error) => {
    console.error('There was an error!', error)
  })
})
</script>

<template>
  <h1>Student</h1>
  <!-- new element -->
  <div class="events flex flex-col items-center">
    <StudentCard v-for="student in students" :key="student.id" :student="student" />
  </div>
</template>

<style scoped> 
/* .events{
  display: flex;
  flex-direction: column;
  align-items: center;
} */
</style>
