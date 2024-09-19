
 <script setup lang="ts">
 import type { Organizer } from '@/types'
 import { ref } from 'vue'
 import OrganizersService from '@/services/OrganizersService'
 import { useRouter } from 'vue-router'
 import { useMessageStore } from '@/stores/message'
  
 const organizer = ref<Organizer>({
   id: 0,
   address: '',
   organizationName: ''
 })

 const router = useRouter()
 const store = useMessageStore()
  
 function saveOrganizer() {
     console.log('Saving organizer:', organizer.value); // Ensure this includes the correct name
     OrganizersService.saveOrganizer(organizer.value)
         .then((response) => {
             console.log('Organizer saved successfully:', response.data); // Check response
             store.updatedMessage('You have successfully added a new organizer');
             setTimeout(() => {
                 store.resetMessage();
             }, 3000);
         })
         .catch((error) => {
             console.error('Error saving organizer:', error);
             router.push({ name: 'network-error-view' });
         });
 }
  
 </script>
  
 <template>
   <div class="max-w-2xl mx-auto p-6">
     <h1 class="text-3xl font-bold mb-6">What is your organizer name</h1>
     <form @submit.prevent="saveOrganizer" class="space-y-6">
       <div>
         <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
         <input
           id="name"
           v-model="organizer.organizationName"
           type="text"
           placeholder="Name"
           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
         />
       </div>
       <div>
         <h3 class="text-xl font-semibold mb-2">Where is your organization?</h3>
         <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
         <input
           id="address"
           v-model="organizer.address"
           type="text"
           placeholder="Address"
           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
         />
       </div>
       <button
         type="submit"
         class="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
       >
         Submit
       </button>
     </form>
     <pre class="mt-6 bg-gray-100 p-4 rounded-md border border-gray-300">{{ organizer }}</pre>
   </div>
 </template>