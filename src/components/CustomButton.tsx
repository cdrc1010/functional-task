import { type ReactNode } from "react";
import Button, {
  type ButtonProps as MuiButtonProps,
} from "@mui/material/Button";
import { styled, type SxProps } from "@mui/material";

const StyledButton = styled(Button)<MuiButtonProps>({
  outline: "unset",
  border: "unset",
  margin: "0 auto",
  display: "block",
});

type CustomButtonProps = {
  children: ReactNode;
  clickHandler: () => void;
  sx?: SxProps;
  isDisabled?: boolean;
};

const CustomButton = ({
  children,
  clickHandler,
  sx,
  isDisabled = false,
}: CustomButtonProps) => {
  return (
    <div>
      <StyledButton
        variant="outlined"
        onClick={clickHandler}
        sx={sx}
        disabled={isDisabled}
      >
        {children}
      </StyledButton>
    </div>
  );
};

export default CustomButton;
