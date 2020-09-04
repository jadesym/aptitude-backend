import ProductEmailSubscription, {
  ProductType,
} from '../schema/productEmailSubscription';

export async function create(
  email: string,
  productType: ProductType,
): Promise<void> {
  await ProductEmailSubscription.create({ email, productType });
}

export {
  IProductEmailSubscription,
  ProductType,
} from '../schema/productEmailSubscription';
