<script setup lang="ts">
// #region Imports
import { useCounterStore } from '@/stores/store'
import { storeToRefs } from 'pinia'
import EditContact from './EditContact.vue'
import { ref, computed, watch, nextTick } from 'vue'
import DeleteContact from './DeleteContact.vue'
// #endregion

// #region piniaExport
const store = useCounterStore()
const { selectedContact, chats, searchedChat } = storeToRefs(store)
const { spilitStr, dirr, getMessage } = store
// #endregion

// #region Refs & Props & Emits
const isShowEdit = ref<boolean>(false)
const isShowDelete = ref<boolean>(false)
const msg = ref<string>('')
const scroll = ref<HTMLDivElement>()
const myNumber = ref<string>(localStorage.username)
const selectedChats = computed(() => {
  return chats.value
    ? chats.value.filter(
        (chat) =>
          chat.receiver == selectedContact.value?.username ||
          chat.sender == selectedContact.value?.username
      )
    : []
})
// #endregion

watch([selectedChats, selectedContact], async () => {
  await nextTick()
  let scrollChat = document.getElementById(`${searchedChat.value?.id}`)
  if (scrollChat) {
    scrollChat.scrollIntoView()
    scrollChat!.style.backgroundColor = '#4755694d'
    setTimeout(() => {
      scrollChat!.style.backgroundColor = ''
    }, 1000)
  } else if (scroll.value)
    scroll.value.scrollTo({
      top: scroll.value.scrollHeight - scroll.value.clientHeight,
      behavior: 'smooth'
    })
})



// #region Functions
function sendMessage() {
  fetch('https://farawin.iran.liara.run/api/chat', {
    headers: {
      authorization: `${localStorage.token}`
    },
    body: JSON.stringify({
      contactUsername: selectedContact.value?.username,
      textHtml: msg.value
    }),
    method: 'POST',
    mode: 'cors'
  }).then((r) =>
    r.json().then((res) => {
      if (res.code == '200') {
        msg.value = ''
        getMessage()
      }
    })
  )
}
function sendEnterMessage(e: KeyboardEvent) {
  if (e.code == 'Enter')
    fetch('https://farawin.iran.liara.run/api/chat', {
      headers: {
        authorization: `${localStorage.token}`
      },
      body: JSON.stringify({
        contactUsername: selectedContact.value?.username,
        textHtml: msg.value
      }),
      method: 'POST',
      mode: 'cors'
    }).then((r) =>
      r.json().then((res) => {
        if (res.code == '200') {
          msg.value = ''
          getMessage()
        }
      })
    )
}
// #endregion
</script>

<template>
  <EditContact v-if="isShowEdit" @is-show-edit="(msg) => (isShowEdit = msg)" />
  <DeleteContact v-if="isShowDelete" @is-show-delete="(msg) => (isShowDelete = msg)" />
  <div class="grow flex p-5 flex-col gap-1">
    <!-- #region Header -->
    <div class="flex p-4 bg-[#30323E95] rounded-2xl">
      <!-- #region Information -->
      <div class="flex cursor-default grow gap-2">
        <div
          class="h-12 w-12 rounded-full border self-center text-[16px] text-black bg-[#A9D2FE] flex justify-center items-center"
        >
          {{ spilitStr(selectedContact?.name) }}
        </div>
        <div class="flex flex-col gap-1">
          <div :dir="dirr(selectedContact?.name)" class="text-xl font-medium">
            {{ selectedContact?.name }}
          </div>
          <div class="text-xs font-extralight">{{ selectedContact?.username }}</div>
        </div>
      </div>
      <!-- #endregion -->
      <!-- #region optionIcons -->
      <div class="flex gap-2">
        <!-- #region deleteIcon -->
        <svg
          @click="isShowDelete = true"
          class="self-center fill-[#848F91] cursor-pointer transition-[all,2s] hover:fill-[#FAFBFD] w-[26px]"
          viewBox="5 4 27 24"
        >
          <path
            d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z"
          ></path>
        </svg>
        <!-- #endregion -->
        <!-- #region editIcon -->
        <svg
          @click="isShowEdit = true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-7 text-[#848F91] transition-[all,2s] hover:text-[#FAFBFD] cursor-pointer"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          ></path>
        </svg>
        <!-- #endregion -->
        <!-- #region CloseIcon -->
        <svg
          @click="selectedContact = null"
          class="w-6 h-6 transition-[all,2s] text-[#848F91] cursor-pointer hover:text-[#FAFBFD] self-center"
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
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->
    <!-- #region Body -->
    <div ref="scroll" class="grow overflow-y-auto">
      <div v-if="selectedChats.length != 0" class="flex h-full p-4 flex-col">
        <div class="grow"></div>
        <div class="shrink-0 flex flex-col">
          <!-- #region Message -->
          <div v-for="(chat, i) in selectedChats" :key="chat.id" class="flex flex-col gap-2">
            <div
              v-if="
                i == 0 ||
                new Date(selectedChats[i].date).getMonth() !=
                  new Date(selectedChats[i - 1].date).getMonth() ||
                new Date(selectedChats[i].date).getFullYear() !=
                  new Date(selectedChats[i - 1].date).getFullYear() ||
                new Date(selectedChats[i].date).getDate() !=
                  new Date(selectedChats[i - 1].date).getDate()
              "
              class="self-center bg-[#2F313D] px-[40px] rounded-[15px]"
            >
              {{
                new Date(chat.date).toLocaleString('fa-ir', {
                  day: 'numeric',
                  month: 'long'
                })
              }}
            </div>
            <div class="flex flex-col p-3 rounded-3xl transition" :id="`${chat.id}`">
              <!-- #region SendMessage -->
              <div v-if="chat.sender == myNumber" class="max-w-[280px] w-fit min-w-[60px]">
                <div
                  class="flex flex-col gap-2 justify-start bg-[#6B8AFE] p-2.5 rounded-[20px] relative"
                >
                  <div
                    :dir="dirr(chat.text)"
                    class="before:absolute w-full break-words before:border-[#6B8AFE] before:border-[25px] before:right-[-16px] before:bottom-[0px] before:border-r-transparent before:border-l-transparent before:border-t-transparent before:rounded-[40%] grow text-[14px]"
                  >
                    {{ chat.text }}
                  </div>
                  <div class="self-end text-xs font-extralight">
                    {{
                      `${
                        new Date(chat.date).getHours() < 10
                          ? `0${new Date(chat.date).getHours()}`
                          : new Date(chat.date).getHours()
                      }:${
                        new Date(chat.date).getMinutes() < 10
                          ? `0${new Date(chat.date).getMinutes()}`
                          : new Date(chat.date).getMinutes()
                      }`
                    }}
                  </div>
                </div>
              </div>
              <!-- #endregion -->
              <!-- #region receiveMessage -->
              <div v-else class="max-w-[280px] w-fit min-w-[60px] self-end">
                <div
                  class="flex flex-col gap-2 justify-start bg-[#30323E] p-2.5 rounded-[20px] relative"
                >
                  <div
                    :dir="dirr(chat.text)"
                    class="before:absolute w-full break-words before:border-[#30323E] before:border-[25px] before:left-[-16px] before:bottom-[0px] before:border-r-transparent before:border-l-transparent before:border-t-transparent before:rounded-[40%] grow text-[14px]"
                  >
                    {{ chat.text }}
                  </div>
                  <div class="text-xs font-extralight">
                    {{
                      `${
                        new Date(chat.date).getHours() < 10
                          ? `0${new Date(chat.date).getHours()}`
                          : new Date(chat.date).getHours()
                      }:${
                        new Date(chat.date).getMinutes() < 10
                          ? `0${new Date(chat.date).getMinutes()}`
                          : new Date(chat.date).getMinutes()
                      }`
                    }}
                  </div>
                </div>
              </div>
              <!-- #endregion -->
            </div>
          </div>
          <!-- #endregion -->
        </div>
      </div>
      <div class="flex justify-center items-center h-full" v-else>
        <p class="m-auto">پیامی وجود ندارد!</p>
      </div>
    </div>
    <!-- #endregion -->
    <!-- #region Footer -->
    <div class="w-full gap-1 flex bg-[#30323E95] p-3 rounded-2xl">
      <svg
        @click="sendMessage"
        v-if="msg.length > 0"
        class="w-8 rotate-45 cursor-pointer hover:fill-[#FAFBFD] transition fill-[#848F91]"
        viewBox="0 0 512 512"
      >
        <path
          d="M474.444,19.857a20.336,20.336,0,0,0-21.592-2.781L33.737,213.8v38.066l176.037,70.414L322.69,496h38.074l120.3-455.4A20.342,20.342,0,0,0,474.444,19.857ZM337.257,459.693,240.2,310.37,389.553,146.788l-23.631-21.576L215.4,290.069,70.257,232.012,443.7,56.72Z"
        />
      </svg>
      <input
        :dir="dirr(msg)"
        @keydown="sendEnterMessage"
        v-model="msg"
        class="grow bg-[#30323E00] p-1 focus:outline-none placeholder:opacity-40"
        placeholder="پیام خود را بنویسید"
      />
    </div>
    <!-- #endregion -->
  </div>
</template>
