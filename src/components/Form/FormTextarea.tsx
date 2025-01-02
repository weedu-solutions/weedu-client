import {
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";

interface FormTextareaProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  placeholder?: string;
  isDisabled?: boolean;
  defaultValue?: string;
}

export function FormTextarea({
  label,
  name,
  register,
  error,
  placeholder,
  isDisabled = false,
  defaultValue,
}: FormTextareaProps) {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Textarea
        id={name}
        placeholder={placeholder}
        backgroundColor="#F4F2FC"
        borderColor="#F4F2FC"
        h="56px"
        fontSize="16px"
        focusBorderColor={error ? "#E71D36" : "#7956F7"}
        isDisabled={isDisabled}
        defaultValue={defaultValue}
        {...register(name)}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}
