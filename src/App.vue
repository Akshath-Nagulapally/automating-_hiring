<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Account from './components/Account.vue'
import { supabase } from './supabase'
import table_index from './components/table_index.vue'
import FileUpload from './components/FileUpload.vue'
import Auth_page from './components/Auth_page.vue'
//import AdvancedTable from './AdvancedTable/AdvancedTableComponent.vue'
import AvatarDynamic from './components/AvatarDynamic.vue'
import index from './components/index.vue'
const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
    console.log(session)

  })

  supabase.auth.onAuthStateChange((_, _session) => {
    console.log(session)

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