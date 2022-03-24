import { MyButton } from './styled'

interface IProps {
  title?: string;
  disabled?: boolean;
}

export function Button({ title, disabled }: IProps) {
  return (
    <MyButton disabled={disabled}>
      {title}
    </MyButton>
  )
}

