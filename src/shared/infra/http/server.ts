import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import 'dotenv/config'
import '../typeorm'
import '../firebase'
import cors from 'cors';
import routes from './routes'
import AppError from '../../errors/AppError';

import '../../container';

const app = express();
app.use(cors())
app.use(express.json());
app.use(routes)


app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.log(err.message)
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', error: err.message });
  }

  return response
    .status(500)
    .json({ status: 'error', message: err.message });
});

app.listen(process.env.PORT || 3333, () => {
  console.log(`database started on port ${process.env.PORT || 3333}`)
})

//Sempre antes de dar push no heroku, por precaução executar yarn tsc e yarn start.
//Se o yarn start não executar após o passo acima, certamente a build do heroku dará erro