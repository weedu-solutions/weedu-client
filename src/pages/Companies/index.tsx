import DataTable from "react-data-table-component"
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'

import LayoutLogged from "../../components/LayoutLogged"
import { Content, Wrapper, MyButton, ModalContent, WrapperInputs, AddButtonWrapper, ButtonsWrapper, ModalBlockContent } from "./styled"
import { useEffect, useState } from "react"
import { CustomerServices } from "../../services/customer"
import { AddButton } from '../../components/AddButton'
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'
import { colors } from "../../theme"
import { EmployersCompany } from "./components/EmployersCompany"
import { ROUTES } from "../../constants/routes"
import { InputSelected } from "../../components/InputSelected"
import { MdClose } from "react-icons/md"
import { Button } from '../../components/Button'
import { IUserData } from "../../contexts/user"
import { useUser } from '../../hooks/user'
import { Notify, NotifyTypes } from "../../components/Notify"

const conditionalRowStyles = [
  {
    when: (row: any) => row.id % 2 === 0,
    style: {
      backgroundColor: '#F8F7FA'
    },
  },
]

const styles = {
  rows: {
    style: {
      color: colors.primary.darker,
      fontWeight: '500',
    },
  },
  headCells: {
    style: {
      color: colors.primary.darker,
      fontWeight: '800',
    },
  },
}

const customStyleModal = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.50)'
  },
  content: {
    maxWidth: '650px',
    height: '550px',
    margin: 'auto',
  }
}

const customStyleModalBlock = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.50)'
  },
  content: {
    maxWidth: '400px',
    height: '300px',
    margin: 'auto',
  }
}

export function Companies() {
  const [companies, setCompanies] = useState<any>([])
  const [currentCompany, setCurrentCompany] = useState<any>({})
  const [pending, setPending] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAbleToEdit, setIsAbleToEdit] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalBlockOpen, setIsModalBlockOpen] = useState(false)

  const { setUserDataList } = useUser()
  const navigate = useNavigate()

  const headers = [
    {
      id: 1,
      name: 'STATUS',
      selector: (row: any) => row.status === 1 ? "Desbloqueado" : "Bloqueado",
      sortable: true,
      reorder: true
    },
    {
      id: 2,
      name: 'NOME FANTASIA',
      selector: (row: any) => row.fantasy_name,
      sortable: true,
      reorder: true
    },
    {
      id: 3,
      name: 'E-MAIL DO FINANCEIRO',
      selector: (row: any) => row.financial_email,
      sortable: true,
      reorder: true
    },
    {
      id: 4,
      name: 'N.º DE USUÁRIOS',
      selector: (row: any) => `${row.number_of_users}/10`,
      sortable: true,
      reorder: true
    },
    {
      id: 5,
      name: '',
      sortable: true,
      selector: (row: any) => <MyButton onClick={() => handleModal(row)}>Ver detalhes</MyButton>,
      reorder: true
    },
  ]

  function compare(a: any, b: any) {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  }

  const getData = async () => {
    setPending(pending => !pending)
    const { data } = await CustomerServices.getAllCustomers()
    setPending(pending => !pending)
    setCompanies(data.data.sort(compare))
  }

  const getUserList = async (currentCompanyRow: any) => {
    const { data } = await CustomerServices.getAllUserCustomer(currentCompanyRow.id)
    const filteredData = data.data[0].user.filter((user: IUserData) => user.user_type_id === 2)
    setUserDataList(filteredData)
  }

  async function handleModal(currentCompanyRow: any) {
    getUserList(currentCompanyRow)
    setCurrentCompany(currentCompanyRow)
    setIsModalOpen(value => !value)
  }



  async function handleUpdateCompany() {
    const data = await CustomerServices.updateCustomer(currentCompany.id, { ...currentCompany, status: '1' })
    if (data) {
      navigate(0)
      Notify(NotifyTypes.SUCCESS, 'Empresa alterada com sucesso!')
    }
  }

  function handleChange(event: any) {
    event.preventDefault()
    setCurrentCompany({ ...currentCompany, [event.target.name]: String(event.target.value) })
  }

  function handleOpenModalBlock() {
    setIsModalBlockOpen((oldValue) => !oldValue)
  }

  async function handleBlockCompany() {
    if (currentCompany.status === 1) {
      try {
        await CustomerServices.blockCustomer(currentCompany.id, { active: 0 })
        setIsModalBlockOpen(oldValue => !oldValue)
        Notify(NotifyTypes.SUCCESS, 'Usuário Bloqueado com sucesso!')
      } catch (error) {
        setIsModalBlockOpen(oldValue => !oldValue)
        Notify(NotifyTypes.ERROR, 'Algo deu errado, por favor tente novamente.')
      }
    } else {
      try {
        await CustomerServices.blockCustomer(currentCompany.id, { active: 1 })
        setIsModalBlockOpen(oldValue => !oldValue)
        Notify(NotifyTypes.SUCCESS, 'Usuário Desbloqueado com sucesso!')
      } catch (error) {
        setIsModalBlockOpen(oldValue => !oldValue)
        Notify(NotifyTypes.ERROR, 'Algo deu errado, por favor tente novamente.')
      }
    }

  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <LayoutLogged>
      <Modal
        style={customStyleModal}
        isOpen={isModalOpen}
        ariaHideApp={false}
      >
        <ModalContent>
          <h2>Editar empresa</h2>
          <button className="closeButton" onClick={() => setIsModalOpen(value => !value)}><MdClose size="18" /></button>
          <div className="hr"></div>
          <form>
            <WrapperInputs style={{ marginTop: '30px' }}>
              <InputSelected
                disabled={!!isAbleToEdit}
                style={{ marginRight: '10px' }}
                label="Razão social"
                name="company_name"
                onChange={(event: any) => handleChange(event)}
                value={currentCompany.company_name ?? ''}
              />
              <InputSelected
                disabled={!!isAbleToEdit}
                style={{ marginLeft: '10px' }}
                label="Nome fantasia"
                name="fantasy_name"
                onChange={(event: any) => handleChange(event)}
                value={currentCompany.fantasy_name ?? ''}
              />
            </WrapperInputs>
            <InputSelected
              disabled={!!isAbleToEdit}
              style={{ marginTop: '10px' }}
              label="CNPJ"
              name="cpf_cnpj"
              onChange={(event: any) => handleChange(event)}
              value={currentCompany.cpf_cnpj ?? ''}
            />
            <WrapperInputs style={{ marginTop: '10px' }}>
              <InputSelected
                disabled={!!isAbleToEdit}
                style={{ marginRight: '10px' }}
                label="Nome do Gestor"
                name="maneger_name"
                onChange={(event: any) => handleChange(event)}
                value={currentCompany.maneger_name ?? ''}
              />
              <InputSelected
                disabled={!!isAbleToEdit}
                style={{ marginLeft: '10px' }}
                label="E-mail financeiro"
                name="financial_email"
                onChange={(event: any) => handleChange(event)}
                value={currentCompany.financial_email ?? ''}
              />
            </WrapperInputs>
            <WrapperInputs style={{ marginTop: '10px' }}>
              <InputSelected
                disabled={!!isAbleToEdit}
                style={{ marginRight: '10px' }}
                label="Telefone do Gestor"
                name="maneger_telephone"
                onChange={(event: any) => handleChange(event)}
                value={currentCompany.maneger_telephone ?? ''}
              />
              <InputSelected
                disabled={!!isAbleToEdit}
                style={{ marginLeft: '10px' }}
                label="Número máximo de usuários"
                name="number_of_users"
                onChange={(event: any) => handleChange(event)}
                value={currentCompany.number_of_users ?? ''}
              />
            </WrapperInputs>

            <ButtonsWrapper>
              <Button
                small
                type="button"
                customColor="red"
                onClick={handleOpenModalBlock}
                customSize="30%"
                title={
                  currentCompany.status === 1 ?
                    'Bloquear'
                    : 'Desbloquear'
                }
              />
              <Button
                small
                type="button"
                onClick={() => navigate(`${ROUTES.REGISTER_USER_COMPANY}/${currentCompany.id}`)}
                customSize="60%"
                customStyles="margin-left:40px;margin-right:10px;"
                outlined title={'Adicionar novo funcionário'}
              />
              <Button
                small
                type="button"
                customSize="40%"
                onClick={handleUpdateCompany}
                title={'Atualizar'}
              />
            </ButtonsWrapper>
          </form>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isModalBlockOpen}
        style={customStyleModalBlock}
      >
        <ModalBlockContent>
          {
            currentCompany.status === 1 ?
              <>
                <h2>Confirmação de bloqueio</h2>
                <p>Tem certeza que deseja bloquear a empresa <b>{currentCompany.fantasy_name}</b> ?
                </p>
              </>
              :
              <>
                <h2>Confirmação de desbloqueio</h2>
                <p>Tem certeza que deseja desbloqueio a empresa <b>{currentCompany.fantasy_name}</b> ?
                </p>
              </>
          }

          <Button
            small
            type="button"
            onClick={handleBlockCompany}
            customColor="red"
            title={
              currentCompany.status === 1 ?
                'Bloquear'
                : 'Desbloquear'
            }
          />
          <Button small type="button" onClick={handleOpenModalBlock} customStyles="margin-top:20px;" customColor="#646170" title={'Cancelar'} />
        </ModalBlockContent>
      </Modal>
      <Wrapper>
        <div className="container">
          <Content>
            <h1>Empresas</h1>
            <DataTable
              columns={headers}
              data={companies}
              conditionalRowStyles={conditionalRowStyles}
              defaultSortFieldId={1}
              expandableRows
              customStyles={styles}
              expandableRowsComponent={({ data }) => <EmployersCompany userRow={data} />}
              progressPending={pending}
              expandableIcon={{ collapsed: <TiArrowSortedDown fill={colors.primary.darker} size="20" />, expanded: <TiArrowSortedUp fill={colors.primary.darker} size="20" /> }}
            />
          </Content>
        </div>
        <AddButtonWrapper>
          <AddButton onClick={() => navigate(ROUTES.REGISTER_COMPANY)} />
        </AddButtonWrapper>
      </Wrapper>
    </LayoutLogged>
  )
}
