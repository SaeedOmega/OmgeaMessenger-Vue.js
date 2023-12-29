<script setup lang="ts">
// #region Imports
import { ref } from 'vue'
import { useCounterStore } from '../stores/store'
import { storeToRefs } from 'pinia'
// #endregion

// #region PiniaExport
const store = useCounterStore()
const { getContacts } = store
// #endregion

// #region Refs & Emits
const userName = ref<string>('')
const name = ref<string>('')
const msg = ref<string>('')
const successfull = ref<boolean>(false)
const em = defineEmits(['isShowAdd'])

// #endregion

// #region Functions
function userNameValid(): boolean {
  return /^09([0-9]{9})$/.test(userName.value) || userName.value.length == 0 ? true : false
}

function nameValid() {
  if (name.value.length < 3 && name.value.length != 0) {
    return false
  }
  return true
}

function valid(): boolean {
  return userNameValid() && nameValid() && name.value.length != 0 && userName.value.length != 0
    ? true
    : false
}

function addSubmit() {
  if (valid())
    fetch('https://farawin.iran.liara.run/api/contact', {
      headers: {
        authorization: `${localStorage.token}`
      },
      body: JSON.stringify({
        username: userName.value,
        name: name.value
      }),
      method: 'POST',
      mode: 'cors'
    }).then((r) =>
      r.json().then((res) => {
        msg.value = res.message
        if (res.code == '200') {
          successfull.value = true
          getContacts()
          em('isShowAdd', false)
        } else {
          successfull.value = false
        }
      })
    )
}
// #endregion
</script>

<template>
  <div
    @click="em('isShowAdd', false)"
    class="absolute z-10 inset-0 backdrop-blur-sm flex justify-center items-center"
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
        @click="em('isShowAdd', false)"
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
      <h1 class="self-center text-xl font-medium mb-6">اضافه کردن مخاطب</h1>
      <!-- #region userNameInput -->
      <div class="relative w-full">
        <input
          v-model="userName"
          type="tel"
          maxLength="11"
          id="floating_outlined"
          class="focus:placeholder-[#FAFBFD50] block px-2.5 pb-2.5 text-[#FAFBFD] pt-4 w-full text-sm bg-transparent placeholder-transparent rounded-lg border-[#21242B] border-[1px] focus:outline-none peer"
          placeholder="0911111111"
        />
        <label
          for="floating_outlined"
          class="absolute text-[#FAFBFD] text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#888890] peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 px-2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 right-1 peer-focus:-translate-x-[-20px]"
        >
          شماره موبایل
        </label>
        <label
          for="floating_outlined"
          class="absolute text-red-500 text-sm z-10 origin-[0] bg-[#888890] px-2 scale-100 top-2 left-1 -translate-y-4"
          :class="{ hidden: userNameValid() }"
        >
          اشتباه است!
        </label>
      </div>
      <!-- #endregion -->
      <!-- #region NameInput -->
      <div class="relative w-full">
        <input
          v-model="name"
          type="tel"
          id="name"
          class="focus:placeholder-[#FAFBFD50] block text-right px-2.5 pb-2.5 text-[#FAFBFD] pt-4 w-full text-sm bg-transparent placeholder-transparent rounded-lg border-[#21242B] border-[1px] focus:outline-none peer"
          placeholder="سعید"
        />
        <label
          for="name"
          class="absolute text-[#FAFBFD] text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#888890] peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 px-2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 right-1 peer-focus:-translate-x-[-20px]"
        >
          نام
        </label>
        <label
          for="name"
          class="absolute text-red-500 text-sm z-10 origin-[0] bg-[#888890] px-2 scale-100 top-2 left-1 -translate-y-4"
          :class="{ hidden: nameValid() }"
        >
          کوچکتر از 3 حرف!
        </label>
      </div>
      <!-- #endregion -->
      <p :class="[successfull ? 'text-green-500' : 'text-red-500']" class="mt-5">{{ msg }}</p>
      <button
        @click="addSubmit"
        :class="[valid() ? 'hover:bg-[#21242b]' : 'opacity-30 cursor-not-allowed']"
        class="py-4 px-12 border-[1px] mt-2 border-[#21242B] rounded-lg transition-[all,2s]"
      >
        افزودن
      </button>
    </div>
  </div>
</template>
