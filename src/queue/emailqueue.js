import { Queue, Worker } from 'bullmq';
import { EmailProcessor } from '../email/emailprocessor';
import { config } from '../config/comfig';

const emailQueue = new Queue('email-processing', {
  connection: {
    host: config.redis.host,
    port: config.redis.port,
  },
});

const emailProcessor = new EmailProcessor();

const worker = new Worker('email-processing', async (job) => {
  const emailData = job.data;
  
  // Step 1: Categorize the email
  const category = await emailProcessor.categorizeEmail(emailData);
  
  // Step 2: Generate appropriate response
  const response = await emailProcessor.generateResponse(emailData, category);
  
  // Return result for further processing
  return {
    category,
    response,
    originalEmail: emailData,
  };
}, {
  connection: {
    host: config.redis.host,
    port: config.redis.port,
  },
});

export { emailQueue };
