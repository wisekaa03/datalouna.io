import { Static, Type } from '@sinclair/typebox';

export const UserDTO = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  email: Type.String(),
  balance: Type.Number(),
});

export type UserDTOType = Static<typeof UserDTO> | { message: string };
