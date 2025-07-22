import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Suppliers from "./components/Suppliers";
import CustomButton from "./components/CustomButton";
import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import useProductContext from "./hooks/useProductContext";
import { ToastContainer, toast } from "react-toastify";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import SelectedChildProducts from "./components/SelectedChildProducts";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "90vh",
  bgcolor: "background.paper",
  borderRadius: "10px",
  padding: "20px 10px",
  overFlowY: "scroll",
};

const headingStyle = {
  height: "60px",
  display: "flex",
  justifyContent: "space-between",
};

const ctaContainer = {
  display: "flex",
  alignItems: "center",
  padding: "10px",
};

const productActions = {
  display: "flex",
  gap: "10px",
  justifyContent: "flex-end",
  flex: 1,
};

const App = () => {
  const [open, setOpen] = useState(false);
  const [selectSupplier, setSelectSupplier] = useState("");
  const [selectProduct, setSelectProduct] = useState("");
  const [searchText, setSearchText] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const { disableCta, selectedChildProduct, currentStep, setCurrentStep } =
    useProductContext();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const showSelectedProductsHandler = () => {
    setCurrentStep("selectedProducts");
  };

  const backHandler = () => {
    switch (currentStep) {
      case "selectedProducts":
        setCurrentStep("products");
        setLabel("Selection");
        break;
      case "products":
        setCurrentStep("");
    }
  };

  useEffect(() => {
    switch (currentStep) {
      case "selectedProducts":
        setLabel("Selection");
        break;
      case "products":
        setLabel("Creative Global Services");
        break;
      default:
        setLabel("Browse");
    }
  }, [currentStep]);

  const numberOfSelectedChildProduct = selectedChildProduct.length;

  const selectedSkus = selectedChildProduct.map((item) => item.sku);

  const toastAddedMessage = (
    <Box>
      Add
      <Typography sx={{ fontWeight: 700, color: "#333" }}>
        {selectedSkus.toString().toUpperCase()}
      </Typography>
      successfully.
    </Box>
  );

  return (
    <div>
      <ToastContainer autoClose={1000} />

      <CustomButton
        clickHandler={handleOpen}
        sx={{
          border: "1px solid #242424",
          color: "#242424",
          textTransform: "uppercase",
        }}
      >
        Open modal
      </CustomButton>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box sx={headingStyle}>
            {currentStep && (
              <KeyboardArrowLeftOutlinedIcon onClick={backHandler} />
            )}
            <Typography variant="h6" sx={{ margin: "0 auto" }}>
              {label}
            </Typography>
            <Typography variant="button" onClick={handleClose}>
              <CloseIcon onClick={handleClose} />
            </Typography>
          </Box>
          <Divider />
          <TextField
            variant="outlined"
            placeholder="Search supplier"
            fullWidth
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: {
                borderRadius: 6,
              },
            }}
          />
          <Divider sx={{ height: "2px", marginTop: "15px" }} />

          {/* BACKUP */}
          {/* {isOnProductSelected ? (
            <ChildProductSelected
              setIsOnProductSelected={setIsOnProductSelected}
            />
          ) : !selectSupplier ? (
            <Suppliers setSelectSupplier={setSelectSupplier} />
          ) : (
            <ProductList
              setSelectProduct={setSelectProduct}
              selectedProduct={selectProduct}
              searchText={searchText}
              selectedSupplier={selectSupplier}
            />
          )} */}

          {/* {isOnProductSelected ? (
            <ChildProductSelected
              setIsOnProductSelected={setIsOnProductSelected}
            />
          ) : !selectSupplier ? (
            <Suppliers setSelectSupplier={setSelectSupplier} />
          ) : (
            <ProductList
              setSelectProduct={setSelectProduct}
              selectedProduct={selectProduct}
              searchText={searchText}
              selectedSupplier={selectSupplier}
            />
          )} */}

          {currentStep === "selectedProducts" ? (
            <SelectedChildProducts />
          ) : currentStep === "products" ? (
            <ProductList
              setSelectProduct={setSelectProduct}
              selectedProduct={selectProduct}
              searchText={searchText}
              selectedSupplier={selectSupplier}
            />
          ) : (
            <Suppliers setSelectSupplier={setSelectSupplier} />
          )}

          <Box sx={ctaContainer}>
            <CustomButton
              sx={{
                border: "1px solid #242424",
                textTransform: "unset",
                color: "#242424",
                opacity: ".8",
              }}
              clickHandler={showSelectedProductsHandler}
              isDisabled={disableCta}
            >
              {numberOfSelectedChildProduct} Product Selected
            </CustomButton>
            <Box sx={productActions}>
              <CustomButton
                sx={{
                  border: "1px solid #242424",
                  textTransform: "unset",
                  color: "#242424",
                  opacity: ".8",
                }}
                clickHandler={handleOpen}
                isDisabled={disableCta}
              >
                Cancel
              </CustomButton>
              <CustomButton
                sx={{
                  border: "1px solid #242424",
                  textTransform: "unset",
                  color: "#fff",
                  background: "#242424",
                  opacity: ".9",
                  "&.Mui-disabled": {
                    border: "1px solid #242424",
                    textTransform: "unset",
                    color: "#242424",
                    background: "grey",
                    opacity: ".3",
                  },
                }}
                clickHandler={() => {
                  toast.success(toastAddedMessage);
                  setOpen(false);
                }}
                isDisabled={disableCta}
              >
                Add
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default App;
