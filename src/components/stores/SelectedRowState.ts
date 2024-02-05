// stores/compartmentStore.ts
import { defineStore } from 'pinia';

interface RowData {
    [key: string]: any; // This allows any shape of object with string keys and any type of values
  }
  

export const useSelectedRowState = defineStore('SelectedRowState', {
  state: () => ({
    RowState: {} as RowData, // Define RowState as RowData
  }),
  actions: {
    updateRowState(newData: RowData) {
        this.RowState = newData;
        console.log("Successfully updated row state:", this.RowState);
      
    },
  },
});




