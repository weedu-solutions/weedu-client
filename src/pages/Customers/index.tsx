import DataTable from "react-data-table-component"
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'

import LayoutLogged from "../../components/LayoutLogged"
import { ButtonWrapper, Content, Wrapper, Button, ModalContent, WrapperInputs } from "./styled"
import { useEffect, useState } from "react"
import { CustomerServices } from "../../services/customer"
import { useAuth } from '../../hooks/auth'
import { AddButton } from '../../components/AddButton'
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'
import { colors } from "../../theme"
import { DataTableUserCustomer } from "./components/DataTableUserCustomer"
import { ROUTES } from "../../constants/routes"
import { InputSelected } from "../../components/InputSelected"
import { displayPartsToString } from "typescript"
import { MdClose } from "react-icons/md"

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
    maxWidth: '800px',
    margin: '0 auto',
  }
}

export function Customers() {
  const [customers, setCustomers] = useState<any>([]);
  const [pending, setPending] = useState<boolean>(false);
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
      selector: (row: any) => <Button onClick={handleModal}>Ver detalhes</Button>,
      reorder: true
    },
  ]

  const getData = async () => {
    setPending(pending => !pending)
    const { data } = await CustomerServices.getAllCustomers()
    setPending(pending => !pending)
    setCustomers(data.data)
  }

  function handleModal() {
    setIsOpen(value => !value);
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <LayoutLogged>
      <Wrapper>
        <div className="container">
          <Modal
            style={customStyleModal}
            isOpen={modalIsOpen}
            contentLabel="Example Modal"
          >
            <ModalContent>
              <h2>Editar empresa</h2>
              <button className="closeButton" onClick={handleModal}><MdClose size="22" /></button>
              <div className="hr"></div>
              <form>
                <WrapperInputs>
                  <InputSelected style={{ marginRight: '10px' }} label="Razão social" />
                  <InputSelected style={{ marginLeft: '10px' }} label="Nome fantasia" />
                </WrapperInputs>
              </form>
            </ModalContent>
          </Modal>
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
            <ButtonWrapper>
              <AddButton onClick={() => navigate(ROUTES.REGISTER)} />
            </ButtonWrapper>
          </Content>
        </div>
      </Wrapper>
    </LayoutLogged>
  )
}
