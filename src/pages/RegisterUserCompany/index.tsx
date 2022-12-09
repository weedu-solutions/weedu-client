import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'
import { ButtonDefault } from '../../components/FormChakra/Button'
import { InputText } from '../../components/InputText'
import { LayoutRegister } from '../../components/LayoutRegister'
import { ROUTES } from '../../constants/routes'
import { useUser } from '../../hooks/user'
import { UserServices } from '../../services/user'
import { ButtonWrapper, CustomInput, Label, Wrapper } from './styled'

export function RegisterUserCompany() {
  interface IDataForm {
    name: string;
    suname: string;
    email: string;
    user_type_id: string;
    password: string;
    is_active: string;
    customer_id: Array<number>;
    manager_id: string;
  }

  const selectCustomStyles = {
    container: (provided: any) => ({
      ...provided,
    }),
    control: (provided: any) => ({
      ...provided,
      padding: '10px 0'
    }),
  }

  const navigate = useNavigate()
  const { id } = useParams()
  const { userDataList } = useUser()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialForm = {
    name: "",
    suname: "",
    email: "",
    user_type_id: "",
    password: "",
    is_active: "1",
    customer_id: [],
    manager_id: ""
  }

  const options = [
    { label: 'Colaborador', value: '1', },
    { label: 'Gestor', value: '2' }
  ] as any

  const [dataForm, setDataForm] = useState<IDataForm>(initialForm)


  const manegerOptions = userDataList.map((user) => {
    return { label: user.name, value: String(user.user_type_id), id: user.id }
  }) as any

  useEffect(() => {
    setDataForm({ ...dataForm, customer_id: [Number(id)] })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleCreateUserCompany() {
    await UserServices.createUserCustomer(dataForm)
    navigate(ROUTES.CUSTOMERS)
  }

  return (
    <LayoutRegister>
      <strong>Cadastrar usuário da empresa</strong>
      <Wrapper>
        <InputText
          title="Nome"
          value={dataForm.name ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, name: String(event.target.value) })}
          placeholder="Digite seu nome"
          type="text"
        />
        <InputText
          title="Sobrenome"
          value={dataForm.suname ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, suname: String(event.target.value) })}
          placeholder="Agora seu sobrenome"
          type="text"
        />
        <InputText
          title="E-mail"
          value={dataForm.email ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, email: String(event.target.value) })}
          placeholder="Agora digite seu e-mail"
          type="email"
        />
        <Label htmlFor="">Tipo de perfil</Label>
        <CustomInput>
          <Select
            styles={selectCustomStyles}
            options={options}
            defaultValue={dataForm.user_type_id}
            onChange={(value: any) => setDataForm({ ...dataForm, user_type_id: value.value })}
            placeholder="Selecione um tipo de usuário"
            isSearchable={false}
          />
        </CustomInput>
        {dataForm.user_type_id === "1" && <>
          <Label htmlFor="">Gestor</Label>
          <CustomInput>
            <Select
              styles={selectCustomStyles}
              options={manegerOptions}
              defaultValue={dataForm.user_type_id}
              onChange={(value: any) => setDataForm({ ...dataForm, manager_id: value.id })}
              placeholder="Selecione um Gestor"
            />
          </CustomInput>
        </>}
        <InputText
          title="Senha"
          value={dataForm.password ?? ''}
          onChange={(event: any) => setDataForm({ ...dataForm, password: String(event.target.value) })}
          placeholder="Escolha uma senha"
          type="password"
        />
        <InputText
          isDisabled
          title="ID da empresa"
          value={id}
          type="text"
        />

        <ButtonWrapper>
          <ButtonDefault
            onClick={() => navigate(-1)}
            backgroundColor={'#646170'}
            width={'40%'}
            height={'50px'}
            title={'Cancelar'}
          />
          <ButtonDefault
            onClick={handleCreateUserCompany}
            backgroundColor={'#7956F7'}
            width={'40%'}
            height={'50px'}
            loading={isLoading}
            loadingText={'Cadastrar'}
            title={'Cadastrar'}
          />
        </ButtonWrapper>
      </Wrapper>
    </LayoutRegister>
  )
}
