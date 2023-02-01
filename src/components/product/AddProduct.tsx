import { useMemo, useState } from "react";
import { addProductStore } from "./AddProduct.store";

export function AddProduct() {
  const { state, action } = useMemo(() => addProductStore(), []);
  const [name, setNameState] = useState("");
  const [price, setPriceState] = useState("");

  return (
    <div>
      <div>
        name:{" "}
        <input
          type="text"
          onChange={(e) => setNameState(e.currentTarget.value)}
        ></input>
      </div>
      <div>
        price:
        <input
          type="text"
          onChange={(e) => setPriceState(e.currentTarget.value)}
        ></input>
      </div>
      <div>
        <button onClick={(e) => action.addProduct({ name, price })}>Add</button>
        <button
          onClick={(e) =>
            alert(
              `Id: ${state.product.get()?.id}, name: ${
                state.product.get()?.name
              }, price: ${state.product.get()?.price}`
            )
          }
        >
          Show added product
        </button>
      </div>
    </div>
  );
}
