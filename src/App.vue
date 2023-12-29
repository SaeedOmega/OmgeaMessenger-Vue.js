<script lang="ts" setup>
import HomePage from './components/HomePage.vue'
import AuthForm from './components/AuthForm.vue'

function isLogged() {
  return localStorage.token ? true : false
}
</script>

<template>
  <HomePage v-if="isLogged()" />
  <AuthForm v-else />
</template>
