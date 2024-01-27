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
  
    return updates;
  }
  