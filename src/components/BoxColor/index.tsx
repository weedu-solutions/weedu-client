import * as S from "./styles";

type IBoxColor = {
  status: number;
  rowInfo?: any;
};

export function BoxColor({ status, rowInfo }: IBoxColor) {
  return (
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
  );
}
