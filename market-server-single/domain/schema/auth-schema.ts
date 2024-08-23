import { Static, Type } from '@sinclair/typebox';

export const authSchema = Type.Object({
  username: Type.String(),
  password: Type.String(),
});

export type authDTO = Static<typeof authSchema>;
