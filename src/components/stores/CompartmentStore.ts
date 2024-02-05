// stores/compartmentStore.ts
import { defineStore } from 'pinia';

export const useCompartmentStore = defineStore('compartment', {
  state: () => ({
    CompartmentPropID: '',
  }),
  actions: {
    updateCompartmentPropID(newID: string) {
      this.CompartmentPropID = newID;
      console.log(this.CompartmentPropID,"pinia store update")
    
    },
  },
});
