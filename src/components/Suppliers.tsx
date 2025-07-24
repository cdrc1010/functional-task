import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import suppliers from "../data/suppliers.json";
import { useEffect, useState, type Dispatch, type FC } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import useProductContext from "../hooks/useProductContext";

type CustomButtonProps = {
  setSelectSupplier: Dispatch<React.SetStateAction<string>>;
  searchText?: string;
};

const Suppliers: FC<CustomButtonProps> = ({
  setSelectSupplier,
  searchText,
}) => {
  const { setCurrentStep } = useProductContext();
  const [filteredSupplier, setFilteredSupplier] = useState<any[]>(suppliers);

  const selectSupplierHandler = (companyId: string) => {
    setSelectSupplier(companyId);
    setCurrentStep("products");
  };

  useEffect(() => {
    if (searchText) {
      const filterData = suppliers.filter((data) =>
        data.name.toLowerCase().includes(searchText)
      );
      setFilteredSupplier(filterData);
    }
    if (!searchText) {
      setFilteredSupplier(suppliers);
    }
  }, [searchText]);

  return (
    <List>
      {filteredSupplier.map((company: any, index: number) => {
        return (
          <ListItem
            key={index}
            onClick={() => selectSupplierHandler(company.id)}
          >
            <ListItemButton>
              <ListItemText primary={company.name} />
              <Typography>
                <KeyboardArrowRightIcon />
              </Typography>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Suppliers;
