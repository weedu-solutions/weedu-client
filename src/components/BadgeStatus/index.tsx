import { Box, Text } from "native-base";
import { useMemo } from "react";

export type BageTypes =
  | "To_Start"
  | "Late_To_Start"
  | "Late_To_Finish"
  | "To_Running"
  | "Executed";

interface IBadgeProps {
  type: BageTypes;
}

export function BadgeStatus({ type }: IBadgeProps) {
  const handleStatus = useMemo(() => {
    switch (type) {
      case "To_Start":
        return {
          text: "A iniciar",
          bgColor: "rgba(46, 196, 182, 0.24)",
          txtColor: "success.medium",
        };
      case "Late_To_Start":
        return {
          text: "Atrasado - A iniciar",
          bgColor: "rgba(251, 119, 86, 0.24)",
          txtColor: "warning.medium",
        };
      case "Late_To_Finish":
        return {
          text: "Atrasado - A terminar",
          bgColor: "rgba(231, 29, 54, 0.24)",
          txtColor: "error.medium",
        };
      case "To_Running":
        return {
          text: "Em execução",
          bgColor: "rgba(28, 132, 255, 0.24)",
          txtColor: "info.medium",
        };
      case "Executed":
        return {
          text: "Executadas",
          bgColor: "rgba(1, 22, 39, 0.24)",
          txtColor: "#011627",
        };
    }
  }, [type]);

  return (
    <Box
      height="32px"
      borderRadius="16px"
      bgColor={handleStatus.bgColor}
      alignItems="center"
      justifyContent="center"
      paddingX={6}
    >
      <Text
        fontFamily="Inter"
        fontWeight="700"
        fontSize="12px"
        color={handleStatus.txtColor}
        noOfLines={1}
      >
        {handleStatus.text}
      </Text>
    </Box>
  );
}
