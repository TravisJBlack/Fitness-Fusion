import {
  Input as CharkraInput,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const Input = ({ label, ...props }) => {
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <CharkraInput {...props} />
    </FormControl>
  );
};

export default Input;
