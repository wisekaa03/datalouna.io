import { Static, Type } from '@sinclair/typebox';

export const PurchaseDTO = Type.Object({
  userId: Type.Number(),
  productId: Type.Number(),
  price: Type.Number(),
});

export type PurchaseDTOType = Static<typeof PurchaseDTO>;
