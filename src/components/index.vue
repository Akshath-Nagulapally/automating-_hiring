<script setup lang="ts">
import FileUpload from './FileUpload.vue';
import ScrollableSidebar from './ScrollableSidebar.vue';
import table_index from './table_index.vue';
import ResumeInsights from './ResumeInsights.vue';
import { useCompartmentStore } from './stores/CompartmentStore';

const props = defineProps({
  session: Object
})


const compartmentStore = useCompartmentStore();

// To access CompartmentPropID
const CompartmentPropID = compartmentStore.CompartmentPropID;

console.log("this is from the index", CompartmentPropID)

</script>


<template>
  <div class="table-row">
    <div class="table-cell">
      <ScrollableSidebar :session="session"/>
    </div>
    <div class="table-cell">
      <FileUpload :session="session"/>
      <table_index :session="session"/>
    </div>
    <div class="table-cell">
      <ResumeInsights :session="session"/>
    </div>

  </div>
</template>

<style scoped>
.table-row {
  display: flex;
  width: 100%; /* Take full width of the container */
}

.table-cell {
  /* Style your cells for padding, alignment, etc., as needed */
  box-sizing: border-box; /* Include padding in the element's total width and height */
}

</style>
