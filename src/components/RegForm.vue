<template>
  <h1 class="font-bold text-3xl mb-16">ثبت نام</h1>
  <!-- #region userNameInput -->
  <div className="flex self-start w-full">
    <label for="Username" className="grow w-max opacity-70 self-start"> نام کاربری: </label>
    <span :class="{ hidden: userNameValid() }" class="text-[12px] text-red-500 self-end italic">
      اشتباه
    </span>
  </div>
  <input
    id="Username"
    dir="ltr"
    v-model="userName"
    maxlength="11"
    placeholder="09000000000"
    type="text"
    class="focus:outline-none p-2 border-black border-b-[1px] w-full border-opacity-30"
  />
  <!-- #endregion -->
  <!-- #region name -->
  <div className="flex self-start w-full mt-9">
    <label for="name" className="grow w-max opacity-70 self-start"> نام کاربری: </label>
    <span
      :class="{ hidden: name.length >= 3 || name.length == 0 }"
      class="text-[12px] text-red-500 self-end italic"
    >
      اشتباه
    </span>
  </div>
  <input
    id="name"
    v-model="name"
    maxlength="11"
    placeholder="سعید"
    type="text"
    class="focus:outline-none p-2 border-black border-b-[1px] w-full border-opacity-30"
  />
  <!-- #endregion -->
  <!-- #region passwordInput -->
  <div className="flex self-start w-full mt-9">
    <label for="pass" className="grow w-max opacity-70 self-start"> رمز عبور: </label>
    <span
      :class="{ hidden: password.length >= 8 || password.length == 0 }"
      class="text-[12px] text-red-500 self-end italic"
    >
      اشتباه
    </span>
  </div>
  <input
    id="pass"
    dir="ltr"
    v-model="password"
    maxlength="11"
    placeholder="شامل 8 کاراکتر باشد"
    type="password"
    class="focus:outline-none p-2 placeholder:text-right border-black border-b-[1px] w-full border-opacity-30"
  />
  <!-- #endregion -->
  <!-- #region repeatPasswordInput -->
  <div className="flex self-start w-full mt-7">
    <label for="repeatPass" className="grow w-max opacity-70 self-start"> تکرار رمز عبور:</label>
    <span
      :class="{ hidden: password == repeatPassword || repeatPassword.length == 0 }"
      class="text-[12px] text-red-500 self-end italic"
    >
      اشتباه
    </span>
  </div>
  <input
    id="repeatPass"
    dir="ltr"
    v-model="repeatPassword"
    maxlength="11"
    placeholder="شامل 8 کاراکتر باشد"
    type="password"
    class="focus:outline-none p-2 placeholder:text-right border-black border-b-[1px] w-full border-opacity-30"
  />
  <!-- #endregion -->
  <button
    @click="submitSingUp"
    :class="[
      valid()
        ? 'cursor-pointer opacity-70 bg-gradient-to-r from-[#00dbde] to-[#fc00ff] hover:from-[#fc00ff] hover:to-[#00dbde] hover:opacity-90'
        : 'cursor-not-allowed opacity-[0.42] bg-gradient-to-r from-[#00dbde] to-[#fc00ff]'
    ]"
    class="mt-24 opacity-[0.42] cursor-not-allowed bg-gradient-to-r from-[#00dbde] to-[#fc00ff] text-white py-3 rounded-3xl w-full"
  >
    ثبت نام
  </button>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const userName = ref<string>('')
const password = ref<string>('')
const repeatPassword = ref<string>('')
const name = ref<string>('')
const em = defineEmits(['RegPage'])

function userNameValid(): boolean {
  return /^09([0-9]{9})$/.test(userName.value) || userName.value.length == 0 ? true : false
}

function valid(): boolean {
  return userNameValid() &&
    password.value.length >= 8 &&
    password.value == repeatPassword.value &&
    name.value.length >= 3 &&
    repeatPassword.value.length != 0 &&
    password.value.length != 0 &&
    name.value.length != 0 &&
    userName.value.length != 0
    ? true
    : false
}
function submitSingUp() {
  if (valid())
    fetch('https://farawin.iran.liara.run/api/user', {
      body: JSON.stringify({
        username: userName.value,
        password: password.value,
        name: name.value
      }),
      method: 'POST'
    }).then((r) =>
      r.json().then((res) => {
        alert(res.message)
        if (res.code == '200') {
          em('RegPage', false)
        }
      })
    )
}
</script>
