<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from "./table/columns"
import type { Applicants } from './table/columns';
import DataTable from "./table/data-table.vue"
import { supabase } from '../supabase';
import { toRefs } from 'vue';
import { watch } from 'vue';
import { storeToRefs } from 'pinia'


//Get the prop from pinia store


import { useCompartmentStore } from './stores/CompartmentStore';

const compartmentStore = useCompartmentStore();

// To access CompartmentPropID


const { CompartmentPropID } = storeToRefs(compartmentStore)
console.log("loaded shit,", CompartmentPropID)


//End of pinia store prop stuff



const data = ref<Applicants[]>([])

const props = defineProps({
  session: Object,
})


const { session } = toRefs(props);


watch(CompartmentPropID, async (newValue, oldValue) => {
  console.log(`CompartmentPropID changed from ${oldValue} to ${newValue}`);
  // Fetch new data based on the updated CompartmentPropID
  const newData = await getData();
  // Update the data ref with the new data to re-render the DataTable
  data.value = newData;
});

const { user } = session.value;
const UserID = user.id;


async function getData(): Promise<Applicants[]> {

  let { data: ApplicantRatings, error } = await supabase
    .from('ApplicantRatings')
    .select("ApplicantID, FileName, SkillRating, SkillEvidence, WorkExperienceRating, WorkExperienceEvidence, EducationRating, EducationEvidence, CustomRating, CustomRatingEvidence, TotalScore, CompartmentID")
    .match({'id': UserID, 'CompartmentID': CompartmentPropID.value})
    .order('TotalScore', { ascending: false });

    console.log("change detected:", ApplicantRatings, "prop id:", CompartmentPropID.value)

  return ApplicantRatings || [];
}

function handleInsert(newData: Applicants) {
  data.value.push(newData);
}

function handleUpdate(updatedData: Applicants) {
  const index = data.value.findIndex(item => item.ApplicantID === updatedData.ApplicantID);
  if (index !== -1) {
    data.value[index] = updatedData;
  }
}

function handleDelete(deletedData: Applicants) {
  data.value = data.value.filter(item => item.ApplicantID !== deletedData.ApplicantID);
}

onMounted(async () => {
  data.value = await getData();

  // Set up real-time subscription
  const ApplicantRatings_realtime = supabase.channel('custom-insert-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'ApplicantRatings' },
      payload => {
        console.log('Insert received!', payload);
        handleInsert(payload.new);
      }
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'ApplicantRatings' },
      payload => {
        console.log('Update received!', payload);
        handleUpdate(payload.new);
      }
    )
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'ApplicantRatings' },
      payload => {
        console.log('Delete received!', payload);
        handleDelete(payload.old);
      }
    )
    .subscribe();
});
</script>

<template>
  <div class="container py-10 mx-auto">
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
