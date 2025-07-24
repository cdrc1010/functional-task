import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import products from "../data/products.json";
import { useEffect, useState, type FC } from "react";
import ChildProducts from "./ChildProducts";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type ProductListProps = {
  searchText?: string;
  selectedSupplier: string;
};
const listStyle = {
  overflowY: "auto",
  maxHeight: "380px",
};

const listItem = {
  flexDirection: "column",
  padding: 0,
};

const ProductList: FC<ProductListProps> = ({
  searchText,
  selectedSupplier,
}) => {
  const { data } = products;
  const dataBasedOnSelectedSupplier = data.filter(
    (products) => products.supplierId === selectedSupplier
  );
  const [filteredData, setFilteredData] = useState<any[]>(
    dataBasedOnSelectedSupplier
  );

  const [selectedProductId, setSelectProduct] = useState("");

  const selectProductHandler = (id: string) => {
    setSelectProduct(id);
  };

  useEffect(() => {
    if (searchText) {
      const filterData = dataBasedOnSelectedSupplier.filter((data) =>
        data.name.includes(searchText)
      );
      setFilteredData(filterData);
    }
    if (!searchText) {
      setFilteredData(dataBasedOnSelectedSupplier);
    }
  }, [searchText]);

  return (
    <List sx={listStyle}>
      {filteredData.map((product, index) => {
        const expandSelectedProduct = selectedProductId === product.id;
        return (
          <ListItem
            key={index}
            onClick={() => selectProductHandler(product.id)}
            sx={{
              ...listItem,
              bgcolor: (selectedProductId === product.id && "#F3F4F6") || "",
            }}
          >
            <ListItemButton sx={{ width: "100%" }}>
              <ListItemText primary={product.name} />
              <Typography>
                {selectedProductId === product.id ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowRightIcon />
                )}
              </Typography>
            </ListItemButton>
            {expandSelectedProduct && (
              <ChildProducts nestedProducts={product.childProducts} />
            )}
          </ListItem>
        );
      })}
    </List>
  );
};

export default ProductList;
