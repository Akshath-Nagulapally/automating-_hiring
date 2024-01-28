<template>
  <div class="file-input-container">
    <Input type="file" multiple @change="onFileChange" class="file-input" />
    <Button @click="processFiles" class="submit-button">Submit Files</Button>
  </div>
</template>

<style scoped>
.file-input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to the start of the flex container */
  max-width: 600px; /* Set a max-width for the container */
  margin: 0 auto; /* Center the container */
  width: 100%; /* Make the container full width */
}

.file-input {
  width: 100%; /* Make the file input full width of its parent */
  margin-bottom: 20px; /* Add some space below the file input */
}

.submit-button {
  position: relative; /* Position absolutely within .container */
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  left: 40%; /* Align the left edge of the button to the center of the container */
  /* additional styles for button */

}

</style>

<script setup lang="ts">
import { ref } from 'vue';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '../supabase';
import { toRefs } from 'vue';

const selectedFiles = ref<File[]>([]);

//=========== Retrieve User session==========================================


const props = defineProps(['session'])
const { session } = toRefs(props)

//========================================================================




function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files) {
    selectedFiles.value = Array.from(target.files);
  }
}



async function upsert_object_to_supabase(updateObjects) {
  const results = [];

  for (const updateObject of updateObjects) {
    try {
      const { data, error } = await supabase
        .from('ApplicantRatings')
        .upsert(updateObject)
        .select();

      if (error) {
        console.error('Upsert error:', error);
        throw error;
      } else {
        results.push(data);
      }
    } catch (error) {
      console.error('Error during upsert:', error);
    }
  }

  return results;
}



function processApiOutput(apiOutput, fileNames, userId) {
  const results = [];

  apiOutput.forEach((candidate, candidateIndex) => {
    const update = {
      id: userId, // Assuming each candidate has a userId      
      updated_at: new Date(),
      FileName: fileNames[candidateIndex], // Assigning file name
      SkillRating: 0,
      SkillEvidence: "",
      WorkExperienceRating: 0,
      WorkExperienceEvidence: "",
      EducationRating: 0,
      EducationEvidence: "", 
      CustomRating: 0,
      CustomRatingEvidence: "",
      TotalScore: 0,
    };

    candidate.forEach((score, index) => {
      switch (index) {
        case 0:
          update.SkillRating = score[0];
          update.SkillEvidence = score[1];
          break;
        case 1:
          update.WorkExperienceRating = score[0];
          update.WorkExperienceEvidence = score[1];
          break;
        case 2:
          update.EducationRating = score[0];
          update.EducationEvidence = score[1];
          break;
        case 3:
          update.CustomRating = score[0];
          update.CustomRatingEvidence = score[1];
          break;
      }
      
      update.TotalScore += score[0];
    });
    update.TotalScore = update.TotalScore / 4;

    results.push(update);

  });

  return results;
}

async function processFiles() {
  if (selectedFiles.value.length > 0) {
    const formData = new FormData();
    const fileNames = selectedFiles.value.map(file => file.name);
    const { user } = session.value;


    selectedFiles.value.forEach((file) => {
      formData.append('file', file);
    });

    try {
      const response = await fetch('http://127.0.0.1:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const update_to_database_object = processApiOutput(result, fileNames, user.id);

      const upsertResults = await upsert_object_to_supabase(update_to_database_object);

      console.log(update_to_database_object, "below is the upsert results", upsertResults);
      
      return update_to_database_object;
    } catch (error) {
      console.error('Upload failed:', error);
    }
  } else {
    console.log('No files selected');
  }
}
</script>
