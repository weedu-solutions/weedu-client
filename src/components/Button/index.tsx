import { MyButton } from './styled'

interface IProps {
  title?: string;
  disabled?: boolean;
  onClick?: () => void;
  outlined?: boolean;
  customSize?: string;
  customColor?: string;
  customStyles?: string;
}

export function Button({ title, disabled, onClick, outlined, customSize, customColor, customStyles }: IProps) {
  return (
    <>
      {
        disabled ?
        <MyButton disabled>
          {title}
        </MyButton>
        :
        <MyButton customStyles={customStyles} customColor={customColor} customSize={customSize} outlined={outlined} onClick={onClick}>
          {title}
        </MyButton>
      }
    </>
  )
}

