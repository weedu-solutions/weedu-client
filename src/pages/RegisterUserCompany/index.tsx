import { Label, CustomInput, Wrapper, ButtonWrapper } from './styled'
import { InputText } from '../../components/InputText'
import { LayoutRegister } from '../../components/LayoutRegister'
import { Button } from '../../components/Button'
import Select from 'react-select'

export function RegisterUserCompany() {

  const selectCustomStyles = {
    container: (provided: any) => ({
      ...provided,
    }),
    control: (provided: any) => ({
      ...provided,
      padding: '10px 0'
    }),
  }

  return (
    <LayoutRegister>
      <strong>Cadastrar usuário da empresa</strong>
      <Wrapper>
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
          <Select
            styles={selectCustomStyles}
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
        <ButtonWrapper>
          <Button customColor="#646170" customSize="40%" title={'Cancelar'} />
          <Button customStyles="margin-left:30px;" customSize="40%" title={'Cadastrar'} />
        </ButtonWrapper>
      </Wrapper>
    </LayoutRegister>
  )
}
