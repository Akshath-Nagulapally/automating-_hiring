<!-- MySidebar.vue -->
<template>
    <div class="my-sidebar">
      <!-- AccountEditPopup Component -->
      <!-- ScrollableSidebar Component -->
      <ScrollableSidebar :session="session" />
      <AccountEditPopup :session="session" />

    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  import AccountEditPopup from './AccountEditPopup.vue';
  import ScrollableSidebar from './ScrollableSidebar.vue';
  
  // Define the props if you need to pass any data into MySidebar
  const props = defineProps({
    session: Object,
  });
  
  </script>
  
  <style scoped>
  .my-sidebar {
    /* Sidebar styles */
    height: 100%; /* Full height */
    position: fixed; /* Fixed Sidebar (stay in place on scroll) */
    left: 0;
    top: 0;
    overflow-x: hidden; /* Disable horizontal scroll */
    overflow-y: auto; /* Enable vertical scroll */
    background-color: #f1f1f1; /* Sidebar background color */
  }
  </style>
  