// class SavedJob {
//   static getAll() {
//     return savedJobs;
//   }

//   static getById(jobId) {
//     return savedJobs.find(job => job.job_id === jobId);
//   }

//   static create(newJob) {
//     // generate id if not have
//     if (!newJob.job_id) {
//       newJob.job_id = `job_${Date.now()}`;
//     }
    
//     savedJobs.push(newJob);
//     return newJob;
//   }

//   static update(jobId, updatedJob) {
//     const index = savedJobs.findIndex(job => job.job_id === jobId);
//     if (index === -1) return null;
    
//     // Preserve original ID
//     updatedJob.job_id = jobId;
//     savedJobs[index] = updatedJob;
//     return savedJobs[index];
//   }

//   static delete(jobId) {
//     const index = savedJobs.findIndex(job => job.job_id === jobId);
//     if (index === -1) return false;
    
//     savedJobs.splice(index, 1);
//     return true;
//   }
// }

// module.exports = SavedJob;