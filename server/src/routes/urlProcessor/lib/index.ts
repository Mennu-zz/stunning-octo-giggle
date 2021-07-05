import {get} from 'https';
import {IncomingMessage} from 'http';
import createHttpError from 'http-errors';
import htmlTextExtractor from './htmlTextExtractor';

interface urlResponse {
    data: string;
    type: string;
}

export const fetchURLResponse = (url: string): Promise<urlResponse> => {
  return new Promise((resolve, reject) => get(url, (res: IncomingMessage)=> {
    let response = '';
    res.on('data', (chunk: string): void => {
      response += chunk.toString();
    });

    res.on('end', (): void => {
      resolve({
        data: response,
        type: res.headers['content-type'] as string,
      });
    });
  }).on('error', (error) => {
    reject(new createHttpError.UnprocessableEntity(error.message));
  }));
};

export const fetchText = (urlResponse: urlResponse): string => {
  if (urlResponse.type.includes('text/plain')) {
    return urlResponse.data;
  }
  if (urlResponse.type.includes('text/html')) {
    return htmlTextExtractor(urlResponse.data);
  }

  throw new createHttpError.UnprocessableEntity(`Implementation not available for the type ${urlResponse.type}`);
};

export const processTextToWords = (pageText: string): string[] => {
  const wordList = pageText.replace(/[*.,?!;()"_=]/g, '')
      .replace(/\s+/g, ' ')
      .toLowerCase()
      .split(' ');
  return wordList;
};

export const wordCounter = (words: string[]): Record<string, number> => {
  const wordCount = words.reduce((prev: Record<string, number>, curr: string): Record<string, number> => {
    if (curr) {
            prev[curr] ? prev[curr] += 1 : prev[curr] = 1;
    }
    return prev;
  }, {});
  return wordCount;
};

const processUrlAndCountWords = async (url: string): Promise<Record<string, number>> => {
  const urlResponse = await fetchURLResponse(url);
  const innerText = fetchText(urlResponse);
  const words = processTextToWords(innerText);
  return wordCounter(words);
};

export default processUrlAndCountWords;
