<script setup lang="ts">
import { supabase } from '../supabase'
import { onMounted, ref, toRefs } from 'vue'
import { Button } from '../lib/registry/new-york/ui/button'
import { Input } from '../lib/registry/new-york/ui/input'
import { Label } from '../lib/registry/new-york/ui/label'

const props = defineProps(['session'])
const { session } = toRefs(props)

const loading = ref(true)
const username = ref('')
const website = ref('')
const avatar_url = ref('')

onMounted(() => {
  getProfile()
})

async function getProfile() {
  try {
    loading.value = true
    const { user } = session.value

    const { data, error, status } = await supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()

    if (error && status !== 406) throw error

    if (data) {
      username.value = data.username
      website.value = data.website
      avatar_url.value = data.avatar_url
    }
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function updateProfile() {
  try {
    loading.value = true
    const { user } = session.value

    const updates = {
      id: user.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_url.value,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function signOut() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container-style"> <!-- Add container styling -->
    <form @submit.prevent="updateProfile" class="form-style"> <!-- Add form styling -->
      <div class="grid gap-2">
        <Label for="email">Email</Label> <!-- Use custom Label component -->
        <Input id="email" type="text" :value="session.user.email" disabled class="input-style"/> <!-- Use custom Input component -->
      </div>
      <div class="grid gap-2">
        <Label for="username">Name</Label>
        <Input id="username" type="text" v-model="username" class="input-style"/>
      </div>
      <div class="grid gap-2">
        <Label for="website">Website</Label>
        <Input id="website" type="url" v-model="website" class="input-style"/>
      </div>

      <Button :disabled="loading" class="button-style"> <!-- Use custom Button component -->
        <span v-if="loading">Loading ...</span>
        <span v-else>Update</span>
      </Button>

      <Button @click="signOut" :disabled="loading" class="button-style">Sign Out</Button>
    </form>
  </div>
</template>
