import { Button, Input, Wrapper } from "./styled";
import { MdEditNote } from 'react-icons/md'
import { colors } from "../../theme";

interface Props {
  label?: string;
  style?: React.CSSProperties;
}

export function InputSelected({ label, style }: Props) {
  return (
    <>
      <Wrapper style={style} >
        <label htmlFor="">{label}</label>
        <Input />
        <Button>
          <MdEditNote size="22" fill={colors.neutral.dark} />
        </Button>
      </Wrapper>
    </>
  )
}
