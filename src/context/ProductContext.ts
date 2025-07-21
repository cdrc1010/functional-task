import { createContext, type Dispatch, type SetStateAction } from "react";

type ProductContextProps = {
  selectedChildProduct: any[];
  setSelectedChildProduct: Dispatch<SetStateAction<any[]>>;
  disableCta: boolean;
  setDisableCta: Dispatch<SetStateAction<boolean>>;
  currentStep: string;
  setCurrentStep: Dispatch<SetStateAction<string>>;
};

const ProductContext = createContext<ProductContextProps>({
  selectedChildProduct: [],
  setSelectedChildProduct: () => {},
  disableCta: true,
  setDisableCta: () => {},
  currentStep: "",
  setCurrentStep: () => {},
});

export default ProductContext;
