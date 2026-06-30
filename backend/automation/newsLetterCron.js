import cron from "node-cron";
import { Job } from "../models/jobSchema.js";
import { User } from "../models/userSchema.js";
import { sendEmail } from "../utils/sendEmail.js";

export const newsLetterCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running News Letter Cron Automation.");
    const jobs = await Job.find({ newsLettersSent: false });

    for (const job of jobs) {
      try {
        const filteredUsers = await User.find({
          $or: [
            { "niches.firstNiche": job.jobNiche },
            { "niches.secondNiche": job.jobNiche },
            { "niches.thirdNiche": job.jobNiche },
          ],
        });

        for (const user of filteredUsers) {
          const subject = `Hot Job Alert: ${job.title} in ${job.jobNiche} Available Now`;
          const message = `Hi ${user.name},\n\nA new job fitting your niche was posted: ${job.title} at ${job.companyName}.\n\nLocation: ${job.location}\nSalary: ${job.salary}\n\nBest Regards,\nNicheNest Team`;

          await sendEmail({ email: user.email, subject, message });
        }

        job.newsLettersSent = true;
        await job.save();
      } catch (error) {
        console.error("Error in cron for job:", job._id, error);
        continue;
      }
    }
  });
};
