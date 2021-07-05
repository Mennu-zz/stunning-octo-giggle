import Queue from 'bee-queue';
import processUrlAndCountWords from './lib';

const urlWordCounterQueue = new Queue('addition', {
  redis: {
    host: '127.0.0.1',
    port: 55000,
  },
});

urlWordCounterQueue.process(10, async (job) => {
  const wordCount = await processUrlAndCountWords(job.data.url);
  return wordCount;
});

const addUrlToQueue = (url: string) => {
  urlWordCounterQueue.createJob(url)
      .save();
  // .on('succeeded', (job: any, result) => {
  //     //Job Done
  // })
};

export default addUrlToQueue;
