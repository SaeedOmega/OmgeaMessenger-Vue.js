<script setup lang="ts">
// #region Imports
import { ref } from 'vue'
import { useCounterStore } from '../stores/store'
import { storeToRefs } from 'pinia'
// #endregion

// #region PiniaExport
const store = useCounterStore()
const { selectedContact } = storeToRefs(store)
const { getContacts } = store
// #endregion

// #region Refs & Emits
const msg = ref<string>('')
const em = defineEmits(['isShowDelete'])

// #endregion

// #region Functions

function deleteSubmit() {
  fetch('https://farawin.iran.liara.run/api/contact', {
    headers: {
      authorization: `${localStorage.token}`
    },
    body: JSON.stringify({
      username: selectedContact.value?.username
    }),
    method: 'DELETE',
    mode: 'cors'
  }).then((r) =>
    r.json().then((res) => {
      msg.value = res.message
      if (res.code == '200') {
        getContacts()
        selectedContact.value = null
        em('isShowDelete', false)
      }
    })
  )
}
// #endregion
</script>

<template>
  <div
    @click="em('isShowDelete', false)"
    class="absolute inset-0 backdrop-blur-sm z-10 flex justify-center items-center"
  >
    <div
      @click="
        (e: Event) => {
          e.stopPropagation()
        }
      "
      class="flex flex-col shadow-2xl shadow-[#00000060] relative bg-[#888890] w-96 px-16 gap-5 py-10 rounded-2xl"
    >
      <!-- #region CloseIcon -->
      <svg
        @click="em('isShowDelete', false)"
        class="w-6 h-6 transition-[all,2s] text-[#21242B] absolute cursor-pointer hover:text-[#FAFBFD] left-4 top-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 18 18"
      >
        <path
          d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z"
        ></path>
        <path
          d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z"
        ></path>
      </svg>
      <!-- #endregion -->
      <h1 class="self-center text-xl font-medium mb-6">
        آیا می‌خواهید مخاطب "{{ selectedContact?.name }}" پاک شود؟
      </h1>
      <p class="mt-5 text-green-500">{{ msg }}</p>
      <button
        @click="deleteSubmit"
        class="py-4 hover:bg-[#21242B] px-12 border-[1px] mt-2 border-[#21242B] rounded-lg transition-[all,2s]"
      >
        پاک شود
      </button>
    </div>
  </div>
</template>
