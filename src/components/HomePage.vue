<script setup lang="ts">
// #region Imports
import { useCounterStore } from '../stores/store.js'
import { storeToRefs } from 'pinia'
import ChatPage from './ChatPage.vue'
import SideBar from './SideBar.vue'
import { ref, watch } from 'vue'
// #endregion

// #region PiniaExport
const store = useCounterStore()
const { selectedContact } = storeToRefs(store)
// #endregion

const isShowSearch = ref<boolean>(false)

function checkMobile() {
  if (window.innerWidth < 640) return true
  else false
}
</script>

<template>
  <div @click="isShowSearch = false" dir="rtl" class="flex bg-myImage justify-center items-center">
    <div class="bg-[#21242B] bg-opacity-75 text-[#FAFBFD] flex h-screen max-w-[962px] w-screen">
      <SideBar
        v-if="(checkMobile() && !selectedContact) || !checkMobile()"
        @respons="(msg) => (isShowSearch = msg)"
        :isShowSearch="isShowSearch"
        :checkMobile="checkMobile"
      />
      <ChatPage v-if="selectedContact" />
    </div>
  </div>
</template>
