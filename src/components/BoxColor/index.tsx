import { Tooltip } from "@chakra-ui/react";

import * as S from "./styles";
import { STATUS_COLORS } from "../../utils/statusColors";

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
              ? STATUS_COLORS.DESATIVADO
              : status === 1
              ? STATUS_COLORS.A_INICIAR
              : status === 2
              ? STATUS_COLORS.EM_EXECUCAO
              : status === 3
              ? STATUS_COLORS.EXECUTADO
              : status === 6
              ? STATUS_COLORS.DESATIVADO
              : status === 4
              ? STATUS_COLORS.ATRASADO_A_INICIAR
              : status === 5
              ? STATUS_COLORS.ATRASADO_A_TERMINAR
              : "#1E163E"
          }
        />
      </Tooltip>
    </>
  );
}
