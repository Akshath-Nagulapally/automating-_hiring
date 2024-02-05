<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { supabase } from './supabase'
import Auth_page from './components/Auth_page.vue'
//import AdvancedTable from './AdvancedTable/AdvancedTableComponent.vue'
import index from './components/index.vue'
const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
    //console.log(session)

  })

  supabase.auth.onAuthStateChange((_, _session) => {
    //console.log(session)

    //console.log(_session)
  })
})
</script>

<template>
<div v-if="session" style="padding: 50px 0 100px 0">
    <div>
            <index :session="session" />
    </div>
</div>

  <Auth_page v-else/>

</template>