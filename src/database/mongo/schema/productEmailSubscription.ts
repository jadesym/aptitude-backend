import { Document, model, Schema } from 'mongoose';
import validator from 'validator';

export enum ProductType {
  PRODUCT_LAUNCH = 'PRODUCT_LAUNCH',
}

export interface IProductEmailSubscription extends Document {
  email: string;
  productType: ProductType;
}

const productEmailSubscriptionSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email: string) => {
        return validator.isEmail(email);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  productType: {
    type: String,
    enum: Object.keys(ProductType),
    required: true,
  },
});

productEmailSubscriptionSchema.index(
  { email: 1, productType: 1 },
  { unique: true },
);

export default model<IProductEmailSubscription>(
  'ProductEmailSubscription',
  productEmailSubscriptionSchema,
);
