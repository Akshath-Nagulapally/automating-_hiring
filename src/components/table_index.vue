<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from "./table/columns"
import type { Applicants } from './table/columns';
import DataTable from "./table/data-table.vue"

const data = ref<Applicants[]>([])

async function getData(): Promise<Applicants[]> {
  // Fetch data from your API here.
  //Make sure the ID is the row ID and not the client ID, that would be very very bad.
  return [
    {
        id: "123-123b1-12",
        name: "Naglulapally",
        skills: 10,
        experience: 10,
        education: 10,
        custom:10,
        total:10
    },
    {
        id: "123-123b1-12",
        name: "Akshath",
        skills: 2,
        experience: 10,
        education: 10,
        custom:10,
        total:10
    }
  ]
}

onMounted(async () => {
  data.value = await getData();
});
</script>

<template>
  <div class="container py-10 mx-auto">
    <DataTable :columns="columns" :data="data" />
  </div>
</template>