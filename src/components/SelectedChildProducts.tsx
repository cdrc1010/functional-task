import { Box, TextField, Typography } from "@mui/material";
import { type Dispatch, type FC, type SetStateAction } from "react";
import useProductContext from "../hooks/useProductContext";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { toast } from "react-toastify";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

type SelectedChildProductsProps = {
  setIsOnProductSelected?: Dispatch<SetStateAction<boolean>>;
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  padding: "10px",

  "&:hover": {
    background: "#F3F4F6",
    ".delete-icon": {
      display: "block",
    },
  },
};

const SelectedChildProducts: FC<SelectedChildProductsProps> = ({}) => {
  const { selectedChildProduct, setSelectedChildProduct } = useProductContext();

  const deleteHandler = (id: string, sku: string) => {
    setSelectedChildProduct((prev) => {
      return prev.filter((product) => product.id !== id);
    });
    toast.success(() => (
      <Box component="span">
        Delete{" "}
        <Typography component="span" sx={{ fontWeight: 700, color: "#333" }}>
          {sku.toString().toUpperCase()}
        </Typography>{" "}
        successfully.
      </Box>
    ));
  };

  return (
    <>
      {selectedChildProduct.map((product, idx) => {
        return (
          <Box sx={containerStyle} key={product.id}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              <Typography variant="body2">{idx + 1}</Typography>
              <ImageOutlinedIcon sx={{ height: "50px", width: "50px" }} />
            </Box>

            <Box
              sx={{
                flex: 1,
                padding: "10px 15px",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: "#333", mb: 0.5 }}
              >
                {product.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {product.sku}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <TextField
                size="small"
                type="number"
                defaultValue={product.quantity}
                sx={{
                  width: "80px",
                  "& .MuiInputBase-input": {
                    p: "4px",
                    textAlign: "right",
                  },
                }}
              />
              <Box
                className="delete-icon"
                sx={{ display: "none", cursor: "pointer" }}
                onClick={() => deleteHandler(product.id, product.sku)}
              >
                <DeleteOutlineOutlinedIcon />
              </Box>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default SelectedChildProducts;
