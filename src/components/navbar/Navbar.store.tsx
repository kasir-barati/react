import { action, atom, ReadableAtom } from "nanostores";

type NavbarStateStore = {
  state: {
    productAnchor: ReadableAtom<HTMLElement | null>;
  };
  action: {
    setProductAnchor: (element: HTMLElement | null) => void;
  };
};

export function setProductAnchorStore(): NavbarStateStore {
  const productAnchor = atom<HTMLElement | null>(null);
  const setProductAnchor = action(
    productAnchor,
    "setProductAnchorClicked",
    (state, element: HTMLElement | null) => {
      productAnchor.set(element);
    }
  );

  return {
    state: {
      productAnchor,
    },
    action: {
      setProductAnchor,
    },
  };
}
