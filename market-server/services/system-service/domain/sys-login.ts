import * as sysLoginRepository from '../data-access/sys-login-repository';
import { assertSysLoginIsValid } from './validators/sys-login-validators';
import { sysLoginDTO } from './schema/sys-login-schema';

// ️️️✅ Best Practice: Start a flow with a 'use case' function that summarizes the flow in high-level
// It should merely tell the feature story without too much information. Kind of a 'yellow pages' of the module
// ✅ Best Practice: 使用“用例”函数启动流程，该函数在高层总结流程
// 它应该只讲故事，没有太多信息。有点像模块的“黄页”
export async function login(sysLogin: sysLoginDTO) {
  assertSysLoginIsValid(sysLogin);

  const response = await sysLoginRepository.login(sysLogin);

  return response;
}

