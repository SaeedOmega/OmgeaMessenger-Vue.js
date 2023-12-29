<template>
  <h1 class="font-bold text-3xl mb-16">ورود</h1>
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
  <button
    @click="submitSignIn"
    :class="[
      valid()
        ? 'cursor-pointer opacity-70 bg-gradient-to-r from-[#00dbde] to-[#fc00ff] hover:from-[#fc00ff] hover:to-[#00dbde] hover:opacity-90'
        : 'cursor-not-allowed opacity-[0.42] bg-gradient-to-r from-[#00dbde] to-[#fc00ff]'
    ]"
    class="mt-24 text-white py-3 rounded-3xl w-full"
  >
    ورود
  </button>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const userName = ref<string>('')
const password = ref<string>('')

function userNameValid(): boolean {
  return /^09([0-9]{9})$/.test(userName.value) || userName.value.length == 0 ? true : false
}

function valid(): boolean {
  return userNameValid() &&
    password.value.length >= 8 &&
    password.value.length != 0 &&
    userName.value.length != 0
    ? true
    : false
}
function submitSignIn() {
  if (valid())
    fetch('https://farawin.iran.liara.run/api/user/login', {
      body: JSON.stringify({
        username: userName.value,
        password: password.value
      }),
      method: 'POST'
    }).then((r) =>
      r.json().then((res) => {
        alert(res.message)
        if (res.code == '200') {
          localStorage.token = res.token
          localStorage.username = res.user.username
          location.reload()
        }
      })
    )
}
</script>
