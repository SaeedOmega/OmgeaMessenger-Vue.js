<script setup lang="ts">
import { ref } from 'vue'
import RegForm from '@/components/RegForm.vue'
import LogForm from '@/components/LogForm.vue'
const isRegPage = ref<boolean>(false)
</script>
<template>
  <div dir="rtl" class="h-screen w-screen overflow-y-auto back flex justify-center items-center">
    <div
      class="md:py-20 md:w-[546px] min-h-max md:px-[100px] w-fit py-10 px-[40px] bg-white rounded-lg"
    >
      <div class="w-full flex flex-col items-center">
        <RegForm v-if="isRegPage" @RegPage="(msg: any) => (isRegPage = msg)"></RegForm>
        <LogForm v-else></LogForm>
        <span class="mt-10 text-[12px] opacity-60">
          {{ isRegPage ? 'آیا شما دارای حساب هستید؟' : 'می‌خواهید حساب جدید بسازید؟' }}
        </span>
        <span class="mt-1 cursor-pointer" @click="isRegPage = !isRegPage">
          {{ isRegPage ? 'ورود' : 'ثبت نام' }}
        </span>
      </div>
    </div>
  </div>
</template>

<style>
.back {
  background: url(https://colorlib.com/etc/lf/Login_v4/images/bg-01.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
