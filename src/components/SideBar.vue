<script setup lang="ts">
// #region Imports
import { useCounterStore } from '../stores/store'
import { storeToRefs } from 'pinia'
import AddContact from './AddContact.vue'
import SearchBox from './SearchBox.vue'
import { ref, watch, computed } from 'vue'
// #endregion

// #region PiniaExport
const store = useCounterStore()
const { contacts, selectedContact, lastMessages, chats } = storeToRefs(store)
const { getContacts, spilitStr, dirr } = store
// #endregion

// #region Refs & Emits & Props
const serachInput = ref<string>('')
const isShowAdd = ref<boolean>(false)
const scroll = ref<HTMLDivElement>()
const props = defineProps(['isShowSearch', 'checkMobile'])
const em = defineEmits(['respons'])
const makeLastMessages = computed(() => {
  let map = new Map()
  for (let i = 0; i < contacts.value.length; i++) {
    if (
      chats.value.filter(
        (chats) =>
          chats.receiver == contacts.value[i].username || chats.sender == contacts.value[i].username
      )[
        chats.value.filter(
          (chats) =>
            chats.receiver == contacts.value[i].username ||
            chats.sender == contacts.value[i].username
        ).length - 1
      ]
    )
      map.set(
        contacts.value[i],
        chats.value.filter(
          (chats) =>
            chats.receiver == contacts.value[i].username ||
            chats.sender == contacts.value[i].username
        )[
          chats.value.filter(
            (chats) =>
              chats.receiver == contacts.value[i].username ||
              chats.sender == contacts.value[i].username
          ).length - 1
        ]
      )
    else
      map.set(contacts.value[i], {
        id: -1,
        receiver: 'any',
        sender: 'any',
        text: 'پیامی وجود ندارد!',
        date: 'any'
      })
  }
  return map
})
// #endregion

// #region Functions
function logOut() {
  localStorage.clear()
  location.reload()
}
// #endregion
</script>

<template>
  <AddContact v-if="isShowAdd" @isShowAdd="(msg) => (isShowAdd = msg)" />
  <div
    :class="{ 'w-full': props.checkMobile() }"
    ref="scroll"
    class="p-5 flex flex-col h-full text-[#FAFBFD] gap-4"
  >
    <div
      @click="
        (e) => {
          e.stopPropagation()
        }
      "
      class="bg-[#30323E] flex flex-col gap-6 rounded-xl p-3 relative"
      :class="{ ' bg-opacity-100 rounded-b-none': props.isShowSearch }"
    >
      <div class="flex gap-2 w-full">
        <!-- #region RefreshIcon -->
        <svg
          @click="getContacts()"
          class="cursor-pointer fill-[#848F91] transition-[all,2s] hover:fill-[#FAFBFD] self-center w-[25px]"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.5 1C3.91015 1 1 3.91015 1 7.5H0C0 3.35786 3.35786 0 7.5 0C9.6733 0 11.6308 0.924852 13 2.40095V0H14V4L10 4V3L12.1905 3C11.007 1.76671 9.34315 1 7.5 1ZM7.5 14C11.0899 14 14 11.0899 14 7.5H15C15 11.6421 11.6421 15 7.5 15C5.3267 15 3.36918 14.0751 2 12.599V15H1V11H5V12H2.80955C3.993 13.2333 5.65685 14 7.5 14Z"
          />
        </svg>
        <!-- #endregion -->
        <!-- #region addContactIcon -->
        <svg
          @click="isShowAdd = true"
          class="w-[25px] h-[25px] text-[#848F91] transition-[all,2s] self-center cursor-pointer hover:text-[#FAFBFD]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M4 4H1m3 4H1m3 4H1m3 4H1m6.071.286a3.429 3.429 0 1 1 6.858 0M4 1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm9 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
          />
        </svg>
        <!-- #endregion -->
        <!-- #region searchIcon and Input -->
        <div
          @click="
            (e) => {
              em('respons', true)
              e.stopPropagation()
            }
          "
          class="flex gap-1 grow"
        >
          <svg
            class="stroke-[#848F91] cursor-pointer transition-[all,2s] hover:stroke-white"
            width="26"
            height="26"
            viewBox="0 0 41 41"
            fill="none"
          >
            <circle
              cx="22.8345"
              cy="22.8345"
              r="17"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="M35 35L41 41" stroke-width="2" stroke-linecap="round" />
          </svg>
          <input
            v-model="serachInput"
            class="grow min-w-0 bg-[#30323E] bg-opacity-0 placeholder:text-[#848F9140] focus:outline-none text-[#848F91]"
            placeholder="جستجو"
          />
        </div>
        <!-- #endregion -->
        <!-- #region logoutIcon -->
        <svg
          @click="logOut()"
          width="21"
          height="21"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-full shrink-0 text-[#9CA0A6] transition-[all,2s] self-center cursor-pointer hover:text-[#FAFBFD]"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        <!-- #endregion -->
      </div>
      <SearchBox v-if="props.isShowSearch" :serachInput="serachInput" />
    </div>
    <!-- #region ContactsContainer -->
    <div v-if="contacts" class="flex flex-col gap-1 overflow-y-auto">
      <div
        v-for="item in makeLastMessages"
        :key="item[0].ref + item[0].username"
        class="p-3 relative rounded-xl flex gap-3 transition-[all,2s] hover:bg-slate-600 hover:bg-opacity-60 cursor-pointer"
        :class="{ 'bg-[#4755694d]': selectedContact?.username == item[0].username }"
        @click="selectedContact = item[0]"
      >
        <div
          class="h-12 w-12 rounded-full border self-center text-[16px] text-black bg-[#A9D2FE] flex justify-center items-center"
        >
          {{ spilitStr(item[0].name) }}
        </div>
        <div class="my-auto gap-2 flex flex-col h-fit text-[18px]">
          <div :dir="dirr(item[0].name)">{{ item[0].name }}</div>
          <div
            class="text-xs flex max-w-[320px] w-fit min-w-0 font-light opacity-40"
            v-if="item[1] != undefined"
          >
            <div :dir="dirr(item[1]?.text)">
              {{ item[1].text.length > 25 ? `...${item[1].text.substring(0, 25)}` : item[1].text }}
            </div>
            <div class="absolute bottom-3 left-3">
              {{
                (+new Date() - +new Date(item[1].date)) / 1000 >= 1
                  ? (+new Date() - +new Date(item[1].date)) / 1000 < 60
                    ? `${Math.trunc((+new Date() - +new Date(item[1].date)) / 1000)} Second`
                    : Math.trunc((+new Date() - +new Date(item[1].date)) / (1000 * 60)) < 60
                    ? `${Math.trunc((+new Date() - +new Date(item[1].date)) / (1000 * 60))} Minutes`
                    : Math.trunc((+new Date() - +new Date(item[1].date)) / (1000 * 60 * 60)) < 24
                    ? `${Math.trunc(
                        (+new Date() - +new Date(item[1].date)) / (1000 * 60 * 60)
                      )} Hours`
                    : Math.trunc((+new Date() - +new Date(item[1].date)) / (1000 * 60 * 60 * 24)) ==
                      1
                    ? `Yesterday`
                    : `${new Date(item[1].date).toLocaleString('fa-ir', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      })}`
                  : item[1].date != 'any'
                  ? `Just Now`
                  : ''
              }}
            </div>
          </div>
          <div class="text-xs font-light opacity-40" v-else>پیامی وجود ندارد!</div>
        </div>
      </div>
    </div>
    <div v-else class="m-auto text-xl font-medium">مخاطبی وجود ندارد!</div>
    <!-- #endregion -->
  </div>
</template>

<style></style>
