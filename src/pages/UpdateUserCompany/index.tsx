import { Label, CustomInput, Wrapper, ButtonWrapper } from './styled'
import { InputText } from '../../components/InputText'
import { LayoutRegister } from '../../components/LayoutRegister'
import { Button } from '../../components/Button'
import Select from 'react-select'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { UserServices } from '../../services/user'
import { ROUTES } from '../../constants/routes'
import { useUser } from '../../hooks/user'
import { Notify, NotifyTypes } from '../../components/Notify'

export function UpdateUserCompany() {
  interface IDataForm {
    name: string;
    suname: string;
    email: string;
    user_type_id: string;
    password: string;
    is_active: string;
    customer_id: Array<number>;
    maneger_id: string;
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
  const { userDataForm, userDataList } = useUser()

  const initialForm = {
    name: "",
    suname: "",
    email: "",
    user_type_id: "",
    password: "",
    is_active: "1",
    customer_id: [],
    maneger_id: ""
  }

  const options = [
    { label: 'Colaborador', value: '1' },
    { label: 'Gestor', value: '2' }
  ] as any

  const manegerOptions = userDataList.map((user) => {
    return { label: user.name, value: String(user.user_type_id), id: user.id }
  }) as any

  const [dataForm, setDataForm] = useState<IDataForm>(initialForm)

  useEffect(() => {
    setDataForm({ ...userDataForm, customer_id: [Number(id)] })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  async function handleUpdateUserCompany() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data } = await UserServices.updateUserCustomer(id, dataForm);

    Notify(NotifyTypes.SUCCESS, 'Dados alterados com sucesso!')
    navigate(ROUTES.CUSTOMERS)

  }

  return (
    <LayoutRegister>
      <strong>Editar usuário da empresa</strong>
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
          isDisabled
          onChange={(event: any) => setDataForm({ ...dataForm, email: String(event.target.value) })}
          placeholder="Agora digite seu e-mail"
          type="email"
        />

        <Label htmlFor="">Tipo de perfil</Label>
        <CustomInput>
          <Select
            styles={selectCustomStyles}
            options={options}
            defaultValue={() => Number(userDataForm.user_type_id) === 1 ? { label: 'Colaborador', value: '1' } : { label: 'Gestor', value: '2' }}
            onChange={(value: any) => setDataForm({ ...dataForm, user_type_id: value.value })}
            placeholder="Selecione um tipo de usuário"
          />
        </CustomInput>

        {(Number(userDataForm.user_type_id) === 1 || dataForm.user_type_id === '1') && <>
          <Label htmlFor="">Gestor</Label>
          <CustomInput>
            <Select
              styles={selectCustomStyles}
              options={manegerOptions}
              defaultValue={dataForm.user_type_id}
              onChange={(value: any) => setDataForm({ ...dataForm, maneger_id: value.id })}
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
          <Button customColor="#646170" onClick={() => navigate(-1)} customSize="40%" title={'Cancelar'} />
          <Button onClick={handleUpdateUserCompany} customStyles="margin-left:30px;" customSize="40%" title={'Editar'} />
        </ButtonWrapper>
      </Wrapper>
    </LayoutRegister>
  )
}
