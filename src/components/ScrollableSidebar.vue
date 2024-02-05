<script setup lang="ts">
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'radix-vue'
import { Button } from '@/components/ui/button'
import { supabase } from '../supabase'
import { onMounted, ref, toRefs } from 'vue'
import AccountEditPopup from './AccountEditPopup.vue'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AreYouSureDelete from './AreYouSureDelete.vue'

const props = defineProps(['session'])
const { session } = toRefs(props)
const CompartmentPropID = ref('')


let HiringAutomation = ref([]);
const { user } = session.value;


onMounted(async () => {
  await fetchFolders();
});


console.log(HiringAutomation);


const FolderName = ref('')

//fetching the copartmentPropID from pinia store:

import { useCompartmentStore } from './stores/CompartmentStore';

const compartmentStore = useCompartmentStore();

// To access CompartmentPropID
const CompartmentPropIDPinia = compartmentStore.CompartmentPropID;

// To update CompartmentPropID
function FunctionToUpdateIDInPiniaStore(newID: string) {
  compartmentStore.updateCompartmentPropID(newID);
}
// Done with fetching

async function UpdateCompartmentPropID(propid){
  CompartmentPropID.value=propid
  console.log(CompartmentPropID,"Scrollable sidebar")
  console.log(CompartmentPropID.value)

}



async function updateProfile() {
  try {
    const updates = {
      id: user.id, // Assuming there's a 'user_id' field to link the compartment to the user
      CompartmentName: FolderName.value
    };

    let { error } = await supabase.from('Compartments').insert([updates]);

    if (error) throw error;

    // Fetch updated list from the database to ensure local state is in sync
    await fetchFolders();

    FolderName.value = ''; // Reset input field after successful insertion
  } catch (error) {
    alert(error.message);
  }
}

async function fetchFolders() {
  try {
  
    let { data, error, status } = await supabase
      .from('Compartments')
      .select('CompartmentName,CompartmentID,id')
      .eq('id', user.id)



    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      HiringAutomation.value = data;
      console.log(data)
    }
  } catch (error) {
    console.error('Error fetching folders:', error.message);
  }
}



</script>

<template>

  <ScrollAreaRoot
    class="w-[200px] h-[100%] rounded overflow-hidden shadow-[0_2px_10px] shadow-blackA7 bg-white"
    style="--scrollbar-size: 10px"
  >
    <ScrollAreaViewport class="w-full h-full rounded">
      <div class="py-[15px] px-5">
        <div class="text-grass11 text-[15px] leading-[18px] font-semibold">

    <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
        Create Job Role
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Job Name</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right">
            Name
          </Label>
          <Input id="FolderName" v-model="FolderName" type="text" class="col-span-3" />
        </div>
      </div>
      <DialogFooter>

        <DialogClose as-child>
            <Button type="submit" @click="updateProfile">
          Create
        </Button>
        </DialogClose>        
      </DialogFooter>
    </DialogContent>
  </Dialog>
        </div>
        <div
          v-for="AutomationName in HiringAutomation"
          :key="AutomationName"
          class="text-mauve12 text-[13px] leading-[18px] mt-2.5 pt-2.5 border-t border-t-mauve6"
        >

        <Button variant="link" @click="FunctionToUpdateIDInPiniaStore(AutomationName.CompartmentID)">
          {{ AutomationName.CompartmentName }}

        </Button>

        <AreYouSureDelete :compartmentname="AutomationName.CompartmentName" :compartmentid="AutomationName.CompartmentID" :userid="user.id"  />

        
        </div>
        <div>

          <AccountEditPopup :session="session" />

        </div>
      </div>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar
      class="flex select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
      orientation="vertical"
    >
      <ScrollAreaThumb
        class="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
      />
    </ScrollAreaScrollbar>
    <ScrollAreaScrollbar
      class="flex select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
      orientation="horizontal"
    >
      <ScrollAreaThumb
        class="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
      />
    </ScrollAreaScrollbar>
  </ScrollAreaRoot>

  <!--<table_index :session="session" />-->

</template>