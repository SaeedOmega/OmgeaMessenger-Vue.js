<template>
  <div
    @click="
      (e) => {
        e.stopPropagation()
      }
    "
    class="absolute top-[50px] z-10 bg-[#30323E] left-0 right-0 p-3 rounded-b-xl shadow-[0_20px_15px_#00000050]"
  >
    <div class="border-b border-slate-500 border-opacity-50 pb-2 overflow-x-auto">
      <div
        class="flex overflow-x-auto"
        v-if="serachInput.length != 0 && filteredContact.length != 0"
      >
        <div
          v-for="contact in filteredContact"
          :key="contact.ref + contact.username"
          class="flex flex-col gap-1 shrink-0 items-center transition-[all,2s] justify-center cursor-pointer hover:bg-slate-600 hover:bg-opacity-60 p-2 rounded-xl"
          :class="{ 'bg-[#4755694d]': selectedContact?.username == contact.username }"
          @click="selectedContact = contact"
        >
          <div
            class="h-12 w-12 rounded-full border self-center text-[16px] text-black bg-[#A9D2FE] flex justify-center items-center"
          >
            {{ spilitStr(contact.name) }}
          </div>
          <div class="text-sm">
            {{ contact.name }}
          </div>
        </div>
      </div>
      <div v-else class="text-[#848F91] mb-2">"مخاطبی ای یافت نشد!"</div>
    </div>
    <!--  -->
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useCounterStore } from '../stores/store'
import { storeToRefs } from 'pinia'

const store = useCounterStore()
const { contacts, selectedContact } = storeToRefs(store)
const { spilitStr } = store

const props = defineProps(['serachInput'])
const filteredContact = computed(() => {
  return props.serachInput && contacts.value
    ? contacts.value.filter(
        (contact) =>
          contact.name.match(props.serachInput) || contact.username.match(props.serachInput)
      )
    : []
})
</script>
