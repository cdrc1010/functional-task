import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import suppliers from "../data/suppliers.json";
import type { Dispatch, FC } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import useProductContext from "../hooks/useProductContext";

type CustomButtonProps = {
  setSelectSupplier: Dispatch<React.SetStateAction<string>>;
};

const Suppliers: FC<CustomButtonProps> = ({ setSelectSupplier }) => {
  const { setCurrentStep } = useProductContext();

  const selectSupplierHandler = (companyId: string) => {
    setSelectSupplier(companyId);
    setCurrentStep("products");
  };

  return (
    <List>
      {suppliers.map((company, index) => {
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
