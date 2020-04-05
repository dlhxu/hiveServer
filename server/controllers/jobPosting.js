const JobPosting = require('../models').JobPosting;
const Tag = require('../models').Tag;
const JobTag = require('../models').JobTag;

module.exports = {


    // TODO create job search functionality
    // Job search will be done by first consuming a list of tags
    // tag left join jobTags gives you a table of all the jobs that have been tagged by smth inside tags array
    // then, select unique job Ids, and left join jobPostings onto the tags/jobTags join to get a list of all the jobs
    // that contain one or more of the tags selected
   async getJobsByTagIds(tagIds){

        // first eager load tags left join jobTags
        // resulting shape will be [{[]}] (array of tag objects with array of matching jobTag objects)
        const tagJoinJobTags = await Tag.findAll({
            include:{
                model: JobTag,
                as: 'jobTags',
                where: {
                    tagId: tagIds
                }
            }
        });
       console.log("tagJoinJobTags");
       console.log(tagJoinJobTags);


        // next, parse the array of tags, and then parse the inner array of jobTag objects and save jobId into a separate array
       // flatten the 2d structure of the array of jobtag arrays (now in the same function call due to flatmap)
       let jobTags = tagJoinJobTags.flatMap(tag => tag.jobTags);
       console.log("jobTags");
       console.log(jobTags);

       // only need the jobIds
       let jobIds = jobTags.map(jobTag => jobTag.jobId);
       console.log("jobIds");
       console.log(jobIds);

       // next, turn jobId array into a set to maintain uniqueness, and turn back into an array to make it parseable
       const distinctJobIds = [...new Set(jobIds)];
       console.log("distinctJobIds");
       console.log(distinctJobIds);

        // finally, return a JobPosting query where jobId matches one of the items in jobId array
       return JobPosting.findAll({
           where:{
               jobId: distinctJobIds
           }
       })
    }
};
