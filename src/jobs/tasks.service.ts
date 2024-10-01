import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { JobService } from './jobs.service';
import { CronJob } from 'cron';

@Injectable()
export class TasksService {
    constructor(
        private jobService: JobService,
        private schedulerRegistry: SchedulerRegistry
    ) {}
    private readonly logger = new Logger(TasksService.name);

    scheduleGetAvailabilityOfPlacesJobRandom(cronExpression: string, date: Date) {
        const job = new CronJob(cronExpression, async () => {
            this.logger.debug(`Executing job at ${new Date().toISOString()}`);
            await this.jobService.getAvailabilityOfPlacesByView(date);
        });

        this.schedulerRegistry.addCronJob('availabilityOfPlaces', job);
        job.start();

        this.logger.debug(`Job scheduled with cron expression: ${cronExpression}`);
    }

    scheduleCheckAvailabilityOfUnavailablePlaces(cronExpression: string, date: Date) {
        const job = new CronJob(cronExpression, async () => {
            this.logger.debug(`Executing job: (check availability of unavailable places) at ${new Date().toISOString()}`)
        });
    }

    @Cron('0 03 22 * * *')
    async handleInactivePlaces() {
        await this.jobService.getAvailabilityOfUnavailablePlaces();
    }

    @Cron('0 22 22 * * *', {
       name: 'scheduleRandomJob' 
    })
    async handleCron() {
        const now = new Date();
        const randomHour = Math.floor(Math.random() * 4) + 1; // Genera una hora aleatoria entre 1 y 4
        const randomMinute = Math.floor(Math.random() * 60); // Genera un minuto aleatorio entre 0 y 59
        const cronExpression = `0 ${randomMinute} ${randomHour + 1} * * *`; // Ajusta la hora aleatoria para que esté entre 1am y 5am
        const randomDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 21)//new Date(now.getFullYear(), now.getMonth(), now.getDate(), randomHour + 1, randomMinute);
        //this.logger.debug(`Scheduling LocationAvailabilityDtos job at ${randomHour + 1}:${randomMinute}`);
        this.scheduleGetAvailabilityOfPlacesJobRandom(cronExpression, randomDate);
    }
}