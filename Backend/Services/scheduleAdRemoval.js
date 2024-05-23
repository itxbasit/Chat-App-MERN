import schedule from 'node-schedule';
import Ads from '../Schema/adsSchema.js';

// Function to schedule ad removal
export const scheduleAdRemoval = (adId, removalTime) => {
    // Schedule the task to remove the ad after 24 hours
    schedule.scheduleJob(removalTime, async () => {
        try {
            // Remove the ad request from the database
            await Ads.findByIdAndDelete(adId);
        } catch (error) {
            console.error('Error removing ad:', error);
        }
    });
};
