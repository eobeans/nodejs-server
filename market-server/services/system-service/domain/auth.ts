import * as authRepository from '../data-access/auth-repository';
import { assertIsValid } from './validators/auth-validators';
import { authDTO } from './schema/auth-schema';
import md5 from "md5";
import { AppError } from '@practica/error-handling';
import { utilJwt } from '../utils';

// ️️️✅ Best Practice: Start a flow with a 'use case' function that summarizes the flow in high-level
// It should merely tell the feature story without too much information. Kind of a 'yellow pages' of the module
// ✅ Best Practice: 使用“用例”函数启动流程，该函数在高层总结流程
// 它应该只讲故事，没有太多信息。有点像模块的“黄页”
export async function auth(auth: authDTO) {
  assertIsValid(auth);

  const result = await authRepository.auth(auth);

  if (result) {
    const incomePw = md5(auth.username+auth.password+result.salt)
    if (incomePw === result.password) {
      const result2 = await authRepository.authRole(Number(result.user_id));
      const roleKeys = result2.map((item:any) => {
        return item.role.role_key
      })
      const token:string = utilJwt.signValidToken(result.login_name, roleKeys)
      return token
    } else {
      throw new AppError('invalid-auth', `账户密码错误！`, 400, true);
    }
  }

  throw new AppError('invalid-auth', `账户未注册！`, 400, true);
}

