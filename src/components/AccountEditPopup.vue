<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '../supabase'
import { onMounted, ref, toRefs } from 'vue'

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
    console.log("successfully signed out")
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}




</script>

<template>
  <Dialog>

<DialogTrigger>
      <div class="flex justify-end">
    <Avatar>
      <AvatarRoot>
        <AvatarFallback class="text-grass11 leading-1 flex h-[100px] w-[100px] items-center justify-center bg-white text-[20px] font-bold shadow-outline dark">
          A
        </AvatarFallback>
    </AvatarRoot>
    </Avatar>
</div>

</DialogTrigger>

   <DialogContent class="sm:max-w-[425px]">

    <Form class="form-widget" @submit.prevent="updateProfile">
    <div>
      <Label for="email">Email</label>
      <input id="email" type="text" :value="session.user.email" disabled />
    </div>
    <div>
      <Label for="username">Name</label>
      <Input id="username" type="text" v-model="username" />
    </div>
    <div>
      <Label for="website">Website</label>
      <Input id="website" type="url" v-model="website" />
    </div>

    <div class="flex gap-x-2 justify-end">
      <Button
        type="submit"
        class="button block py-2"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      > Update </Button>
      
      <Button class="button block" @click="signOut" :disabled="loading">Sign Out</Button>

    </div>
  </Form>



      <!--   <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right">
            Name
          </Label>
          <Input id="name" value="Pedro Duarte" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="username" class="text-right">
            Username
          </Label>
          <Input id="username" value="@peduarte" class="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">
          Save changes
        </Button>
      </DialogFooter>--> 
    
    </DialogContent>
  </Dialog>
</template>
