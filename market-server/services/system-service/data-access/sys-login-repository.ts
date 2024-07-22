import { getPrismaClient } from './prisma-client-factory';

// ️️️✅ Best Practice: The repository pattern - This is a plain JS object (POJO) that is returned to the domain layer
// This way, the domain/business-logic can focus on its business and avoid delving into DB/ORM narratives
// ️️️✅ 最佳实践：存储库模式-这是一个返回到域层的普通JS对象（POJO）
// 这样，域/业务逻辑就可以专注于其业务，避免深入研究DB/ORM叙事
type SysLoginRecord = {
  username: string
  password: string
};

// ️️️✅ Best Practice: The repository pattern - Wrap the entire DB layer with a simple interface that returns plain JS objects
// ️️️✅ 最佳实践：存储库模式——用一个返回普通JS对象的简单接口包裹整个DB层
export async function login(sysLoginRequest: SysLoginRecord) {
  const result = await getPrismaClient().sys_user.findFirst({
    where: {
      user_name:sysLoginRequest.username,
      password: sysLoginRequest.password
    }
  });

  return result;
}
