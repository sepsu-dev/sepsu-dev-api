import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env';
import { logger } from './utils/logger';
import routes from './routes';
import { errorMiddleware } from './middlewares/error.middleware';

const { port } = config;
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'running!' })
});

app.use('/api', routes);
app.use(errorMiddleware);

const startServer = () => {
  try {
    app.listen(port, () => {
      logger.info(`🚀 Server ready at http://localhost:${port}`);
    });
  } catch (error: any) {
    logger.error(`❌ Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();