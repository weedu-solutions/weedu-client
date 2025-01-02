import {
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";

interface Option {
  value: string | number;
  label: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  options: Option[];
  error?: string;
  placeholder?: string;
  isDisabled?: boolean;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function FormSelect({
  label,
  name,
  register,
  options,
  error,
  placeholder,
  isDisabled = false,
  defaultValue,
  onChange,
}: FormSelectProps) {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Select
        id={name}
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
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}
