import supertest from 'supertest';
import app from '../src/app';
import nock from 'nock';

nock('https://www.test-words.com')
  .get('/')
  .reply(
    200, 
    "Tell the audience what you're going to say. Say it. Then tell them what you've said.",
    { 
      'content-type': 'text/plain'
    })

nock('https://www.test-words-html.com')
  .get('/')
  .reply(
    200, 
    "<html><body>Tell the audience what you're going to say. Say it. Then tell them what you've said.</body></html>",
    { 
      'content-type': 'text/html; charset=UTF-8'
    })

const wordCount = {
  tell: 2,
  the: 1,
  audience: 1,
  what: 2,
  "you're": 1,
  going: 1,
  to: 1,
  say: 2,
  it: 1,
  then: 1,
  them: 1,
  "you've": 1,
  said: 1
}

describe('Word-Count Endpoint', () => {
  it('should return word count for the given url', async () => {
    const res = await supertest(app)
      .get('/api/word-count')
      .query({url: "https://www.test-words.com"});

    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      data: wordCount
    })
  })

  it('should return word count for the given url when the content is HTML', async () => {
    const res = await supertest(app)
      .get('/api/word-count')
      .query({url: "https://www.test-words-html.com"});

    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      data: wordCount
    })
  })

  it('should return 400 when url is not provided', async () => {
    const res = await supertest(app)
      .get('/api/word-count');

    expect(res.statusCode).toEqual(400);
  })

  it('should return 400 when url is not invalid', async () => {
    const res = await supertest(app)
      .get('/api/word-count')
      .query({url: "testing"});

    expect(res.statusCode).toEqual(400);
  })
})