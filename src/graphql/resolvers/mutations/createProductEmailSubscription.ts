import {
  create,
  ProductType,
} from '../../../database/mongo/dataApi/productEmailSubscription';

const CreateProductEmailSubscriptionMutationResolver = async (
  _: unknown,
  {
    input: { email, productType },
  }: {
    input: {
      email: string;
      productType: ProductType;
    };
  },
): Promise<string> => {
  await create(email, productType);
  return email;
};

export default CreateProductEmailSubscriptionMutationResolver;
