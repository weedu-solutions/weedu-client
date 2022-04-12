import LayoutLogged from "../../components/LayoutLogged";
import { Content, Wrapper } from "./styled";
import DataTable from "react-data-table-component";
import { useCallback, useEffect, useState } from "react";
import { CustomerServices } from "../../services/customer";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

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
    id: 3,
    name: 'N de usuários',
    selector: (row: any) => row.maneger_name,
    sortable: true,
    reorder: true
  },
]

export function AdminPage() {

  const [customers, setCustomers] = useState<any>([]);
  const navigate = useNavigate();

  const user = localStorage.getItem('user') as string
  const userParsed = JSON.parse(user);

  const getData = useCallback(async () => {
    const { data } = await CustomerServices.getAllCustomers(userParsed.id);
    setCustomers(data.data.data)
    if(data.status === "Token has Expired") {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return navigate(ROUTES.LOGIN);
    }
  }, [])

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
              defaultSortFieldId={1}
              // sortIcon={<SortIcon />}
            />
          </Content>
        </div>
      </Wrapper>
    </LayoutLogged>
  )
}
