import {Request, Response, NextFunction, Router} from 'express';
import createHttpError from 'http-errors';
import processUrlAndCountWords from './lib';
import {isUri} from 'valid-url';

const urlProcessor = async (rq: Request, res: Response, next: NextFunction) => {
  const url = rq.query.url as string;
  if (!url || !isUri(url)) {
    return next(new createHttpError.BadRequest('url is mandatory'));
  }

  try {
    const wordCount = await processUrlAndCountWords(url);
    res.set('Cache-Control', 'public, max-age=3600');
    res.json({
      data: wordCount,
    });
  } catch (e) {
    next(e);
  }
};

const router = Router();

router.get('/', urlProcessor);

export default router;
