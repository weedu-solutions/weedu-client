import LayoutLogged from "../../components/LayoutLogged"
import { ButtonWrapper, Content, Wrapper, Button } from "./styled"
import DataTable from "react-data-table-component"
import { useCallback, useEffect, useState } from "react"
import { CustomerServices } from "../../services/customer"
import { useAuth } from '../../hooks/auth'
import { AddButton } from '../../components/AddButton'
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'
import { colors } from "../../theme"
import { DataTableUserCustomer } from "./components/DataTableUserCustomer"

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
    selector: (row: any) => <Button onClick={() => {}}>Ver detalhes</Button>,
    reorder: true
  },
]

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

export function AdminPage() {

  const [customers, setCustomers] = useState<any>([]);
  const [pending, setPending] = useState<boolean>(false);
  const { user } = useAuth();

  const getData = async () => {
    setPending(pending => !pending)
    const { data } = await CustomerServices.getAllCustomers()
    setPending(pending => !pending)
    setCustomers(data.data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <LayoutLogged>
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
            <ButtonWrapper>
              <AddButton />
            </ButtonWrapper>
          </Content>
        </div>
      </Wrapper>
    </LayoutLogged>
  )
}
