<script setup lang="ts">
import AvatarDynamic from './AvatarDynamic.vue'
import Account from './Account.vue'
import FileUpload from './FileUpload.vue'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import AccountEditPopup from './AccountEditPopup.vue'
import ScrollableSidebar from './ScrollableSidebar.vue'


const props = defineProps({
  session: Object
})

</script>

<template>
<div>
  <AccountEditPopup :session="session"/>
  <ScrollableSidebar :session="session"/>

</div>

</template>
