import { action, atom, ReadableAtom } from "nanostores";

export type Product = {
  id: string;
  name: string;
  price: string;
};

type AddProductStore = {
  state: {
    product: ReadableAtom<Product | undefined>;
  };
  action: {
    addProduct: (productData: Omit<Product, "id">) => void;
  };
};

export function addProductStore(): AddProductStore {
  const product = atom<Product | undefined>();
  let addProduct;
  addProduct = action(
    product,
    Object.keys({ addProduct }).pop() as string,
    (state, productData: Omit<Product, "id">) => {
      const tempProductContainer = {
        id: Math.random().toString(36).slice(2, 7),
        ...productData,
      };

      state.set(tempProductContainer);
      product.set(tempProductContainer);
    }
  );

  return {
    state: {
      product,
    },
    action: {
      addProduct,
    },
  };
}
