<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useSelectedRowState } from './stores/SelectedRowState';
import { watch } from 'vue';
import { ref } from 'vue'



const UserSelectedRow = useSelectedRowState();

// Declare SelectedRowVar as a ref so it can be used in the template
const SelectedRowVar = ref(UserSelectedRow.RowState);


// Watch for changes in the RowState and update SelectedRowVar accordingly
watch(() => UserSelectedRow.RowState, (newRowState) => {
    console.log('RowState changed to:', newRowState);
    SelectedRowVar.value = newRowState;
});



</script>

<template>
  <ScrollArea class="w-[400px] h-[50%] rounded overflow-hidden shadow-[0_2px_10px] shadow-blackA7 bg-white">
    <div class="p-4">
      <h4 class="mb-4 text-sm font-medium leading-none">
        Resume Insights
      </h4>

      <div>


    <div v-for="(value, key) in { ...UserSelectedRow.RowState, ApplicantID: undefined }" :key="key" style="white-space: pre-wrap;">
        <template v-if="key !== 'ApplicantID'">
            <span style="display: block;"><strong>{{ key }}:</strong></span> 
              {{ value }}
            <Separator class="my-2" />
        </template>
      </div>


      </div>
      </div>

  </ScrollArea>
</template>