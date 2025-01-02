import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface FormInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string | FieldError | undefined;
  type?: string;
  placeholder?: string;
  isDisabled?: boolean;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormInput({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder,
  isDisabled = false,
  defaultValue,
  onChange,
}: FormInputProps) {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        backgroundColor="#F4F2FC"
        borderColor="#F4F2FC"
        h="56px"
        fontSize="16px"
        focusBorderColor={error ? "#E71D36" : "#7956F7"}
        isDisabled={isDisabled}
        defaultValue={defaultValue}
        {...register(name, {
          onChange: onChange,
        })}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}
