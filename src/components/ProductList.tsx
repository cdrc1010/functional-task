import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import products from "../data/products.json";
import { useEffect, useState, type Dispatch, type FC } from "react";
import ChildProducts from "./ChildProducts";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type ProductListProps = {
  setSelectProduct: Dispatch<React.SetStateAction<string>>;
  selectedProduct: string;
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
  setSelectProduct,
  selectedProduct,
  searchText,
  selectedSupplier,
}) => {
  const { data } = products;
  const dataBasedOnSelectedSupplier = data.filter(
    (products) => products.supplierId === selectedSupplier
  );
  const [childProducts, setChildProducts] = useState<any[]>();
  const [filteredData, setFilteredData] = useState<any[]>(
    dataBasedOnSelectedSupplier
  );

  const selectProductHandler = (id: string, nestedProducts: any[]) => {
    setSelectProduct(id);
    setChildProducts(nestedProducts);
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

  console.log("selectedProduct: ", selectedProduct);

  return (
    <List sx={listStyle}>
      {filteredData.map((product, index) => {
        const expandSelectedProduct = selectedProduct === product.id;
        return (
          <ListItem
            key={index}
            onClick={() =>
              selectProductHandler(product.id, product.childProducts)
            }
            sx={{
              ...listItem,
              bgcolor: (selectedProduct === product.id && "#F3F4F6") || "",
            }}
          >
            <ListItemButton sx={{ width: "100%" }}>
              <ListItemText primary={product.name} />
              <Typography>
                {selectedProduct === product.id ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowRightIcon />
                )}
              </Typography>
            </ListItemButton>
            {expandSelectedProduct && (
              <ChildProducts nestedProducts={childProducts} />
            )}
          </ListItem>
        );
      })}
    </List>
  );
};

export default ProductList;
