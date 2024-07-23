import util from 'util';
import express from 'express';
import { logger } from '@practica/logger';
import * as auth from '../../domain/auth';
import { utilResFormat } from '../../utils';

export default function defineWhiteRoutes(expressApp: express.Application) {
  const router = express.Router();

  router.post('/', async (req, res, next) => {
    try {
      logger.info(
        `AUTH API was called to auth ${util.inspect(req.body)}`
      );
      // ✅ Best Practice: 使用3层架构，路由/控制器保持精简，逻辑封装在专用域文件夹中
      const response = await auth.auth(req.body);
      return res.json(utilResFormat.successRes(response));
    } catch (error) {
      next(error);
      return undefined;
    }
  });


  expressApp.use('/auth', router);
}
