import {
  useEffect,
  useState,
  type FunctionComponent,
  type JSX,
  type ReactElement,
} from "react";
import SearchContext from "../context/ProductContext";

type ProductContextProviderProps = {
  children: ReactElement | ReactElement[] | JSX.Element;
};

const ProductContextProvider: FunctionComponent<
  ProductContextProviderProps
> = ({ children }) => {
  const [selectedChildProduct, setSelectedChildProduct] = useState<any[]>([]);
  const [disableCta, setDisableCta] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<string>("");

  // useEffect(() => {
  //   if (selectedChildProduct) {
  //     setDisableCta(!selectedChildProduct.length);
  //     return;
  //   }
  // }, [selectedChildProduct]);

  // useEffect(() => {
  //   if (!selectedChildProduct.length && currentStep === "selectedProducts") {
  //     setCurrentStep("products");
  //   }
  // }, [selectedChildProduct, currentStep]);

  useEffect(() => {
    const hasSelection =
      selectedChildProduct && selectedChildProduct.length > 0;
    setDisableCta(!selectedChildProduct.length);

    if (!hasSelection && currentStep === "selectedProducts") {
      setCurrentStep("products");
    }
  }, [selectedChildProduct, currentStep]);
  return (
    <SearchContext.Provider
      value={{
        selectedChildProduct,
        setSelectedChildProduct,
        disableCta,
        setDisableCta,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default ProductContextProvider;
