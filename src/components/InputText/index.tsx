import { Box, IInputProps, Input, Text } from "native-base";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

import * as S from "./styles";

interface IProps extends IInputProps {
  title?: string;
  customWidth?: string;
  password?: boolean;
}

export function InputText(props: IProps) {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Box
      w={props.customWidth ?? "100%"}
      alignItems="flex-start"
      marginBottom={4}
    >
      <Text
        color="neutral.darker"
        fontFamily="Inter"
        fontSize="16px"
        fontWeight="700"
        marginBottom={2}
      >
        {props.title}
      </Text>
      {props.password ? (
        <Input
          borderColor="#EFF0F1"
          minH="56px"
          width="100%"
          _focus={{ borderColor: "#9B80F9" }}
          fontSize="16px"
          {...props}
          type={showPassword ? "text" : "password"}
          InputRightElement={
            showPassword ? (
              <S.I onClick={() => handleShowPassword()}>
                <HiOutlineEye size="20" />
              </S.I>
            ) : (
              <S.I onClick={() => handleShowPassword()}>
                <HiOutlineEyeOff size="20" />
              </S.I>
            )
          }
        />
      ) : (
        <Input
          borderColor="#EFF0F1"
          minH="56px"
          width="100%"
          _focus={{ borderColor: "#9B80F9" }}
          fontSize="16px"
          {...props}
        />
      )}
    </Box>
  );
}
