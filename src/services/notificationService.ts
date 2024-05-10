import { INotificationService } from "../interfaces/serviceInterfaces/INotificationService";
import NotificationRepository from "../repositories/notificationRepository";
import Notification from "../interfaces/entityInterfaces/INotification";
import { notificationRes } from "../interfaces/common/ICommon";
import JobRepository from "../repositories/jobRepository";


class NotificationService implements INotificationService {

    constructor(private notificationRepository: NotificationRepository,
        private jobRepository: JobRepository) { }

    async generateNotification(jobId: string): Promise<notificationRes> {
        try {
            const job = await this.jobRepository.findJob(jobId)
            const notificationPayload = {
                title: 'New Job Application Received !',
                body: `Congratulations! A new application has been submitted for your ${job?.jobTitle} position.`
            }
            if (job?.postedBy)
                await this.notificationRepository.saveNotification(job?.postedBy, notificationPayload)
            return {
                success: true,
                message: 'Notification generated',
                employerId: job?.postedBy?.toString()
            }
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }

    async getNotifications(userId: string): Promise<Notification | undefined> {
        try {
            const notifications = await this.notificationRepository.getNotifications(userId)
            if (notifications) {
                return notifications
            }
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }






}
export default NotificationService