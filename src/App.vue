<script setup>
import { onMounted, ref } from 'vue'
import Account from './components/Account.vue'
import Auth from './components/Auth.vue'
import { supabase } from './supabase'
import table_index from './components/table_index.vue'
import FileUpload from './components/FileUpload.vue'
const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
</script>

<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <div v-if="session">
    <Account :session="session" />
    <FileUpload :session="session" />
    <table_index />
  </div>
  <Auth v-else />

  </div>
</template>