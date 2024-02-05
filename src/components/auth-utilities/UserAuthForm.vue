<script setup lang="ts">
import { ref } from 'vue'
//import LucideSpinner from '~icons/lucide/loader-2'
//import GitHubLogo from '~icons/radix-icons/github-logo'

import { cn } from '../../lib/utils'
import { Button } from '../../lib/registry/new-york/ui/button'
import { Input } from '../../lib/registry/new-york/ui/input'
import { Label } from '../../lib/registry/new-york/ui/label'
import { supabase } from '../../supabase'

const isLoading = ref(false)
// async function onSubmit(event: Event) {
//   event.preventDefault()
//   isLoading.value = true

//   setTimeout(() => {
//     isLoading.value = false
//   }, 3000)
// }


const loading = ref(false)
const email = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
    })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}

// async function handleSignInWithGoogle(response) {
//   const { data, error } = await supabase.auth.signInWithIdToken({
//     provider: 'google',
//     token: response.credential
//   })
// }

</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit.prevent="handleLogin">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            required type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            :disabled="isLoading"
            v-model="email"
            class="inputField"
          />
        </div>
        <Button :disabled="isLoading">
          <LucideSpinner v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          Continue with magic link
        </Button>
      </div>
    </form>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
    <Button variant="outline" type="button" :disabled="isLoading">
      <LucideSpinner v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
      <GitHubLogo v-else class="mr-2 h-4 w-4" />
      Google
    </Button>
  </div>
</template>