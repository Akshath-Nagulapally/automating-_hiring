<template>
  <Input type="file" @change="onFileChange" />
  <Button @click="processAndLogFile">Submit Application</Button>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '../supabase';
import { ref, toRefs } from 'vue';

//=========== Retrieve User session==========================================

const selectedFile = ref<File | null>(null);

const props = defineProps(['session'])
const { session } = toRefs(props)


//========================================================================




function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement;
  selectedFile.value = target.files?.[0] || null;
}



//convert the array output of the uploadFile api to json
async function convertToFormat(jsonArray, userId) {
    // Initialize the structure of the updates object
  
    const updates = {
      id: userId,
      updated_at: new Date(),
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
  
    let totalScore = 0;
  
    // Iterate through the jsonArray and fill in the updates object
    jsonArray.forEach(item => {
      if (item.Evidence.includes('skills:')) {
        updates.SkillRating = item.Score;
        updates.SkillEvidence = item.Evidence;
      } else if (item.Evidence.includes('experience:')) {
        updates.WorkExperienceRating = item.Score;
        updates.WorkExperienceEvidence = item.Evidence;
      } else if (item.Evidence.includes('education:')) {
        updates.EducationRating = item.Score;
        updates.EducationEvidence = item.Evidence;
      } else if (item.Evidence.includes('criteria:')) {
        updates.CustomRating = item.Score;
        updates.CustomRatingEvidence = item.Evidence;
      }
  
      totalScore += item.Score;
    });
  
    // Calculate the average score
    updates.TotalScore = totalScore / jsonArray.length;
    console.log(updates)
    return updates;
    
  }
  

async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    console.log('Upload successful:', result);
    return result;
  } catch (error) {
    console.error('Upload failed:', error);
  }
}


async function update_database(jsonArray){
  const { user } = session.value;


// Process file if needed, then upload
  console.log("the json array", jsonArray)
  const updates = await convertToFormat(jsonArray, user.id);
  const { error } = await supabase.from('ApplicantRatings').upsert(updates);
  if (error) throw error;

}




async function processAndLogFile() {
  if (selectedFile.value) {
    try {
      const RatingsAndEvidences=await uploadFile(selectedFile.value);

      console.log("File processed successfully:", selectedFile.value.name);
      await update_database(RatingsAndEvidences);
    } catch (error) {
      console.error("Error processing file:", error);
    }
  } else {
    console.log("No file selected");
  }
}

</script>

