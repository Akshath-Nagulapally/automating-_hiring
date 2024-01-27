<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Account from './components/Account.vue'
import Auth from './components/Auth.vue'
import { supabase } from './supabase'
import table_index from './components/table_index.vue'
import FileUpload from './components/FileUpload.vue'
import Example from './components/Example.vue'
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
<div v-if="session" class="container" style="padding: 50px 0 100px 0">
    <div>
    <Account :session="session" />
    <FileUpload :session="session" />
    <table_index :session="session" />
    </div>
</div>

  <Example v-else/>

</template>