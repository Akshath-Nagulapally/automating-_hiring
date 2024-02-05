<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { supabase } from '../supabase'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const props=defineProps({
    compartmentname:String,
    compartmentid:String,
    userid:String
})

async function DeleteCompartment(UserID: String, CompartmentID: String) {
    console.log(UserID, CompartmentID);

    // Perform the delete operation
    const { data, error } = await supabase
        .from('Compartments')
        .delete()
        .match({ id: UserID, CompartmentID: CompartmentID });

    // Attempt to log the result
    if (data) {
        console.log("Deleted data", data); // This will log the count of deleted rows or similar result, not the actual data of the rows.
    }

    if (error) {
        console.error('Error deleting rows:', error);
        return;
    } else {
        console.log('Deletion successful');
    }
}
</script>

<template>
  <Dialog>
    <DialogTrigger>
    <Avatar class="w-3 h-3">
      <AvatarImage src="https://png.pngtree.com/png-vector/20190326/ourmid/pngtree-vector-trash-icon-png-image_865253.jpg" alt="@radix-vue"/>
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Are you sure for: project {{compartmentname}}?</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this? You will not be able to recover it's contents again.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose>
        <Button type="submit" @click="DeleteCompartment(userid, compartmentid)">
          Delete
        </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
