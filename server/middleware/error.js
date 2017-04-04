import RequestError from '../utils/RequestError';

export default function ErrorMiddleware(err, req, res, next) {
  if (err instanceof RequestError) {
    res
      .status(err.statusCode)
      .json({ error: err.message });
  } else {
    res.status(500).send(err);
  }
  next(err);
}
