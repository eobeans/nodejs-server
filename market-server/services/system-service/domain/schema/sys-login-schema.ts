import { Static, Type } from '@sinclair/typebox';

export const sysLoginSchema = Type.Object({
  username: Type.String(),
  password: Type.String(),
});

export type sysLoginDTO = Static<typeof sysLoginSchema>;
