import { Wrapper, ImageContainer, FormContainer, ReactSelect, ButtonWrapper, Label, CustomInput } from './styled'
import BG from '../../assets/register-bg.jpg'
import { InputText } from '../../components/InputText'
import { Button } from '../../components/Button'

export function Register() {

  return (
    <Wrapper>
      <ImageContainer>
        <div className="image_bg_wrapper">
          <img className="image_bg" src={BG} alt="Imagem de fundo" />
        </div>
      </ImageContainer>
      <FormContainer>
        <strong>Cadastrar usuário da empresa</strong>
        <div className="formcontainer_inputs">
          <InputText 
            title="Nome" 
            // isInvalid={error ? true : false}
            // value={values.email ?? ''}
            // onChange={(event: any) => setValues({ ...values, email: String(event.target.value) })}
            placeholder="Digite seu nome"
            type="text"
          />
          <InputText 
            title="Sobrenome" 
            // isInvalid={error ? true : false}
            // value={values.email ?? ''}
            // onChange={(event: any) => setValues({ ...values, email: String(event.target.value) })}
            placeholder="Agora seu sobrenome"
            type="text"
          />
          <InputText 
            title="Telefone" 
            // isInvalid={error ? true : false}
            // value={values.email ?? ''}
            // onChange={(event: any) => setValues({ ...values, email: String(event.target.value) })}
            placeholder="Digite seu telefone"
            type="tel"
          />
          <InputText 
            title="E-mail" 
            // isInvalid={error ? true : false}
            // value={values.email ?? ''}
            // onChange={(event: any) => setValues({ ...values, email: String(event.target.value) })}
            placeholder="Agora digite seu e-mail"
            type="email"
          />
          <Label htmlFor="">Tipo de perfil</Label>
          <CustomInput>
            <ReactSelect
              options={[
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' }
              ]}
            />
          </CustomInput>
          <InputText 
            title="Senha" 
            // isInvalid={error ? true : false}
            // value={values.email ?? ''}
            // onChange={(event: any) => setValues({ ...values, email: String(event.target.value) })}
            placeholder="Escolha uma senha"
            type="email"
          />
          <InputText 
            title="ID da empresa" 
            // isInvalid={error ? true : false}
            // value={values.email ?? ''}
            // onChange={(event: any) => setValues({ ...values, email: String(event.target.value) })}
            placeholder="Escolha uma senha"
            type="email"
          />
        </div>
          {/* {error && error !== "Usuário não foi encontrado" && <span>{error}</span>} */}
        <ButtonWrapper>
          <Button customColor="#646170" customSize="40%" title={"Cancelar"} />
          <Button customStyles="margin-left:30px;" customSize="40%" title={"Cadastrar"} />
        </ButtonWrapper>
      </FormContainer>
    </Wrapper>
  )
}
