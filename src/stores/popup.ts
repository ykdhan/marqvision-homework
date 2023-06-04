import { StoreApi, UseBoundStore, create } from "zustand";

export interface usePopupStoreType {
  referenceSetting: string | null;
  setReferenceSetting: (id: string | null) => void;
}

export const usePopupStore: UseBoundStore<StoreApi<usePopupStoreType>> = create(
  (set) => ({
    referenceSetting: null,
    setReferenceSetting: (id) => {
      set(() => ({ referenceSetting: id }));
    },
  })
);
