import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { CustomerServices } from "../../../../services/customer"
import { colors } from "../../../../theme"
import { Title } from "./styled"

const headers = [
  {
    id: 1,
    name: 'Nome',
    selector: (row: any) => row.name,
    sortable: true,
    reorder: true
  },
  {
    id: 2,
    name: 'Sobrenome',
    selector: (row: any) => row.suname,
    sortable: true,
    reorder: true
  },
  {
    id: 3,
    name: 'E-mail',
    selector: (row: any) => row.email,
    sortable: true,
    reorder: true
  },
  {
    id: 4,
    name: 'Status de bloqueio',
    selector: (row: any) => row.is_active,
    sortable: true,
    reorder: true
  }
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
  }
}

export function DataTableUserCustomer({ id }: any) {

  const [ userData, setUserData ] = useState([])
  const [pending, setPending] = useState<boolean>(false);

  const getUserCustomer = async () => {
    setPending(pending => !pending)
    const { data } = await CustomerServices.getAllUserCustomer(id)
    setUserData(data.data[0].user)
    setPending(pending => !pending)
  }

  useEffect(() => {
    getUserCustomer()
  }, [])
  

  return (
    <div>
      <Title>Funcionários</Title>
      <DataTable 
        data={userData}
        columns={headers}
        progressPending={pending}
        customStyles={styles}
      />
    </div>
  )
}
