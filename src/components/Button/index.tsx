import { MyButton } from './styled'

interface IProps {
  title?: string;
  disabled?: boolean;
  onClick?: () => void;
  outlined?: boolean;
  customSize?: string;
  customColor?: string;
  customStyles?: string;
  small?: boolean;
}

export function Button({ title, disabled, onClick, outlined, small, customSize, customColor, customStyles }: IProps) {
  return (
    <>
      {
        disabled ?
        <MyButton disabled>
          {title}
        </MyButton>
        :
        <MyButton small={small} customStyles={customStyles} customColor={customColor} customSize={customSize} outlined={outlined} onClick={onClick}>
          {title}
        </MyButton>
      }
    </>
  )
}

