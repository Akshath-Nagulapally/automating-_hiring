<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from "./table/columns"
import type { Applicants } from './table/columns';
import DataTable from "./table/data-table.vue"
import { supabase } from '../supabase';
import { toRefs } from 'vue';

const data = ref<Applicants[]>([])

const props = defineProps(['session'])
const { session } = toRefs(props)
const { user } = session.value;
const UserID = user.id;

async function getData(): Promise<Applicants[]> {
  let { data: ApplicantRatings, error } = await supabase
    .from('ApplicantRatings')
    .select("ApplicantID, FileName, SkillRating, SkillEvidence, WorkExperienceRating, WorkExperienceEvidence, EducationRating, EducationEvidence, CustomRating, CustomRatingEvidence, TotalScore")
    .eq('id', UserID)
    .order('TotalScore', { ascending: false });

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
