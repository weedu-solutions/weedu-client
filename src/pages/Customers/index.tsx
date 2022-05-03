import DataTable from "react-data-table-component"
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'

import LayoutLogged from "../../components/LayoutLogged"
import { Content, Wrapper, MyButton, ModalContent, WrapperInputs, AddButtonWrapper, ButtonsWrapper } from "./styled"
import { useEffect, useState } from "react"
import { CustomerServices } from "../../services/customer"
import { useAuth } from '../../hooks/auth'
import { AddButton } from '../../components/AddButton'
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'
import { colors } from "../../theme"
import { DataTableUserCustomer } from "./components/DataTableUserCustomer"
import { ROUTES } from "../../constants/routes"
import { InputSelected } from "../../components/InputSelected"
import { MdClose } from "react-icons/md"
import { Button } from '../../components/Button'

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
    backgroundColor:'rgba(0,0,0,0.50)'
  },
  content: {
    maxWidth: '650px',
    height: '550px', 
    margin: 'auto',
  }
}

export function Customers() {
  const [customers, setCustomers] = useState<any>([]);
  const [currentCompany, setCurrentCompany] = useState<any>({});
  const [pending, setPending] = useState<boolean>(false);
  const [isAbleToEdit, setIsAbleToEdit] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate()

  const headers = [
    {
      id: 1,
      name: 'Status',
      selector: (row: any) => row.status,
      sortable: true,
      reorder: true
    },
    {
      id: 2,
      name: 'Nome fantasia',
      selector: (row: any) => row.fantasy_name,
      sortable: true,
      reorder: true
    },
    {
      id: 3,
      name: 'Email do financeiro',
      selector: (row: any) => row.financial_email,
      sortable: true,
      reorder: true
    },
    {
      id: 4,
      name: 'N de usuários',
      selector: (row: any) => row.maneger_name,
      sortable: true,
      reorder: true
    },
    {
      id: 5,
      name: 'Ações',
      sortable: true,
      selector: (row: any) => <MyButton onClick={() => handleModal(row)}>Ver detalhes</MyButton>,
      reorder: true
    },
  ]

  const getData = async () => {
    setPending(pending => !pending)
    const { data } = await CustomerServices.getAllCustomers()
    setPending(pending => !pending)
    setCustomers(data.data)
  }

  function handleModal(currentCompanyRow: any) {
    setCurrentCompany(currentCompanyRow)
    setIsOpen(value => !value)
  }

  function handleEdit() {
    console.log(isAbleToEdit)
    setIsAbleToEdit(oldValue => !oldValue)
  }

  function handleChange(event: any) {
    setCurrentCompany({ ...currentCompany, [event.target.name]: String(event.target.value) })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <LayoutLogged>
          <Modal
            style={customStyleModal}
            isOpen={!!modalIsOpen}
            ariaHideApp={false}
          >
            <ModalContent>
              <h2>Editar empresa</h2>
              <button className="closeButton" onClick={handleModal}><MdClose size="18" /></button>
              <div className="hr"></div>
              <form>
                <WrapperInputs style={{ marginTop: '30px' }}>
                  <InputSelected disabled={isAbleToEdit} style={{ marginRight: '10px' }} label="Razão social" name="company_name" onChange={(event: any) => handleChange(event)} value={currentCompany.company_name ?? ''} />
                  <InputSelected disabled={isAbleToEdit} style={{ marginLeft: '10px' }} label="Nome fantasia" name="fantasy_name" onChange={(event: any) => handleChange(event)} value={currentCompany.fantasy_name ?? ''} />
                </WrapperInputs>
                <InputSelected disabled={isAbleToEdit} style={{ marginTop: '10px' }} label="CNPJ" name="cpf_cnpj" onChange={(event: any) => handleChange(event)} value={currentCompany.cpf_cnpj ?? ''}/>
                <WrapperInputs style={{ marginTop: '10px' }}>
                  <InputSelected disabled={isAbleToEdit} style={{ marginRight: '10px' }} label="Nome do Gestor" name="maneger_name" onChange={(event: any) => handleChange(event)} value={currentCompany.maneger_name ?? ''} />
                  <InputSelected disabled={isAbleToEdit} style={{ marginLeft: '10px' }} label="E-mail financeiro" name="financial_email" onChange={(event: any) => handleChange(event)} value={currentCompany.financial_email ?? ''} />
                </WrapperInputs>
                <WrapperInputs style={{ marginTop: '10px' }}>
                  <InputSelected disabled={isAbleToEdit} style={{ marginRight: '10px' }} label="Telefone do Gestor" name="maneger_telephone" onChange={(event: any) => handleChange(event)} value={currentCompany.maneger_telephone ?? ''} />
                  <InputSelected disabled={isAbleToEdit} style={{ marginLeft: '10px' }} label="Número máximo de usuários" name="number_of_users" onChange={(event: any) => handleChange(event)} value={currentCompany.number_of_users ?? ''} />
                </WrapperInputs>
                <ButtonsWrapper>
                  <Button small customColor="red" customSize="30%" title={'Bloquear'} />
                  <Button small customSize="60%" customStyles="margin-left:40px;margin-right:10px;" outlined  title={'Adicionar novo funcionário'} />
                  <Button small customSize="40%" title={'Atualizar'} />
                </ButtonsWrapper>
              </form>
            </ModalContent>
          </Modal>
      <Wrapper>
        <div className="container">
          <Content>
            <h1>Empresas</h1>
            <DataTable
              columns={headers}
              data={customers}
              conditionalRowStyles={conditionalRowStyles}
              defaultSortFieldId={1}
              expandableRows
              customStyles={styles}
			        expandableRowsComponent={({ data }) =><DataTableUserCustomer id={data.id} />}
              progressPending={pending}
              expandableIcon={{collapsed: <TiArrowSortedDown fill={colors.primary.darker} size="20" />, expanded: <TiArrowSortedUp fill={colors.primary.darker} size="20" />}}
            />
            <AddButtonWrapper>
              <AddButton onClick={() => navigate(ROUTES.REGISTER)} />
            </AddButtonWrapper>
          </Content>
        </div>
      </Wrapper>
    </LayoutLogged>
  )
}