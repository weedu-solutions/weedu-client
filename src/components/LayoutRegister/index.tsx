import { FormContainer, ImageContainer, Wrapper } from './styled'
import BG from '../../assets/bg-weedu.jpeg'

interface Props {
  children: React.ReactNode;
}

export function LayoutRegister({ children }: Props) {
  return (
    <Wrapper>
    <ImageContainer>
      <div className="image_bg_wrapper">
        <img className="image_bg" src={BG} alt="Imagem de fundo" />
      </div>
    </ImageContainer>
    <FormContainer>
      {children}
    </FormContainer>
  </Wrapper>
  )
}
