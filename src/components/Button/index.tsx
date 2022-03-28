import { MyButton } from './styled'

interface IProps {
  title?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({ title, disabled, onClick }: IProps) {
  return (
    <>
      {
        disabled ?
        <MyButton disabled>
          {title}
        </MyButton>
        :
        <MyButton onClick={onClick}>
          {title}
        </MyButton>
      }
    </>
  )
}

