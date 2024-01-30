<script setup lang="ts">
import AvatarDynamic from './AvatarDynamic.vue'
import Account from './Account.vue'
import FileUpload from './FileUpload.vue'
import table_index from './table_index.vue'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import AccountUpdated from './AccountUpdated.vue'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'



const props = defineProps({
  session: Object
})

</script>

<template>
        <!--<Account :session="session" />
    <AvatarDynamic />

    <FileUpload :session="session" />
    <table_index :session="session" />-->

  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline">
        Account Details
      </Button>
    </SheetTrigger>
    <SheetContent>
     <!-- <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when you're done.
        </SheetDescription>
      </SheetHeader>
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
      <SheetFooter>
        <SheetClose as-child>
          <Button type="submit">
            Save changes
          </Button>
        </SheetClose>
      </SheetFooter>-->

      <AccountUpdated :session="session" />
      <SheetFooter>
        <SheetClose as-child>
          <Button type="submit">
            Close
          </Button>
        </SheetClose>
      </SheetFooter>

    </SheetContent>
  </Sheet>
  <FileUpload :session="session" />
  <table_index :session="session" />


</template>
