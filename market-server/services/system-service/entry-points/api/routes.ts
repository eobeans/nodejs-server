import util from 'util';
import express from 'express';
import { logger } from '@practica/logger';
import * as sysLogin from '../../domain/sys-login';

export default function defineRoutes(expressApp: express.Application) {
  const router = express.Router();

  router.post('/', async (req, res, next) => {
    try {
      logger.info(
        `Sys-Login API was called to login ${util.inspect(req.body)}`
      );
      // ✅ Best Practice: 使用3层架构，路由/控制器保持精简，逻辑封装在专用域文件夹中
      const response = await sysLogin.login(req.body);
      return res.json(response);
    } catch (error) {
      next(error);
      return undefined;
    }
  });


  expressApp.use('/system', router);
}
