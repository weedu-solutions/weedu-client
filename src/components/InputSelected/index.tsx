import { Button, Input, Wrapper } from "./styled";
import { BiEdit } from 'react-icons/bi'
import { colors } from "../../theme";

interface Props {
  label?: string;
  style?: React.CSSProperties;
  value?: string;
  onChange?: any;
  name?: string;
  edit?(): void;
  disabled?: boolean;
}

export function InputSelected({ label, onChange, style, disabled, name, edit, value }: Props) {
  return (
    <>
      <Wrapper style={style}>
        <label htmlFor="">{label}</label>
        <Input disabled={disabled} name={name} onChange={onChange} value={value} />
        <Button onClick={edit}>
          <BiEdit size="22" fill={colors.neutral.dark} />
        </Button>
      </Wrapper>
    </>
  )
}
