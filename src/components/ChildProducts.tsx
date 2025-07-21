import { Box, Checkbox, TextField, Typography, minor } from "@mui/material";
import { type FC } from "react";
import useProductContext from "../hooks/useProductContext";

type ChildProductsProps = {
  nestedProducts?: any[];
};

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  cursor: "pointer",
  width: "100%",
};

const ChildProducts: FC<ChildProductsProps> = ({ nestedProducts }) => {
  if (!nestedProducts) return null;

  const { setSelectedChildProduct, selectedChildProduct } = useProductContext();

  const changeHandler = (product: any, checked: boolean) => {
    setSelectedChildProduct((prev) => {
      if (checked) {
        return [
          ...prev,
          { ...product, quantity: product.quantity ? product.quantity : 1 },
        ];
      } else {
        return prev.filter((item) => item.id !== product.id);
      }
    });
  };

  const quantityHandler = (value: number, productId: string) => {
    setSelectedChildProduct((prev) => {
      return prev.map((product) =>
        product.id === productId ? { ...product, quantity: value } : product
      );
    });
  };

  console.log("selectedChildProduct: ", selectedChildProduct);

  return (
    <>
      {nestedProducts.map((product) => {
        const selectedItem = selectedChildProduct.find(
          (item) => item.id === product.id
        );
        const isSelected = Boolean(selectedItem);
        const quantityValue = selectedItem?.quantity;

        return (
          <Box
            sx={containerStyle}
            key={product.id}
            bgcolor={"#F3F4F6"}
            onClick={() => changeHandler(product, !isSelected)}
          >
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <Checkbox
                sx={{ mt: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  e.stopPropagation();
                  changeHandler(product, e.target.checked);
                }}
                checked={isSelected}
              />
              <Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: "#333" }}
                >
                  {product.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  SKU: {product.sku}
                </Typography>
              </Box>
            </Box>

            <TextField
              size="small"
              type="number"
              value={quantityValue ?? 1}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                e.stopPropagation();
                quantityHandler(Number(e.target.value), product.id);
              }}
              disabled={!isSelected}
              sx={{
                width: "80px",
                mt: "10px",
                "& .MuiInputBase-input": {
                  p: "4px",
                  textAlign: "right",
                },
              }}
              slotProps={{
                input: {
                  inputProps: {
                    min: 1,
                  },
                },
              }}
            />
          </Box>
        );
      })}
    </>
  );
};

export default ChildProducts;
