import { Tooltip } from "@chakra-ui/react";

import * as S from "./styles";

type IBoxColor = {
  status: number;
  rowInfo?: any;
};

export function BoxColor({ status, rowInfo }: IBoxColor) {
  return (
    <>
      <Tooltip
        label={
          rowInfo.is_active === 0
            ? "Desativado"
            : status === 1
            ? "A iniciar"
            : status === 2
            ? "Em execução"
            : status === 3
            ? "Executado"
            : status === 4
            ? "Atrasado - A iniciar"
            : status === 5
            ? "Atrasado - A terminar"
            : status === 6
            ? "Desativado"
            : status
        }
        placement="right"
        hasArrow
      >
        <S.Tag
          bgColor={
            rowInfo.is_active === 0
              ? "#9AA8B3"
              : status === 1
              ? "#378479"
              : status === 2
              ? "#2185F6"
              : status === 3
              ? "#9AA8B3"
              : status === 6
              ? "#485763"
              : status === 4
              ? "#F07655"
              : status === 5
              ? "#E83737"
              : "#1E163E"
          }
        />
      </Tooltip>
    </>
  );
}
