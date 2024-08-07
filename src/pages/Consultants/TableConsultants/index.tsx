import { Link } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import TableLoader from "../../../components/Loaders/TableLoader";
import { ROUTES } from "../../../constants/routes";
import { Api } from "../../../services/api";
import { colors } from "../../../theme";
import { MyButton } from "../styled";
import { TableCompanies } from "./TableCompanies";

const conditionalRowStyles = [
  {
    when: (row: any) => row.id % 2 === 0,
    style: {
      backgroundColor: "#F8F7FA",
    },
  },
];

const styleTable = {
  rows: {
    style: {
      color: colors.primary.darker,
      fontWeight: "500",
    },
  },
  headCells: {
    style: {
      color: colors.primary.darker,
      fontWeight: "800",
    },
  },
};

export function TableConsultants() {
  const userStorage = localStorage.getItem("user");
  const userInfoStorage = JSON.parse(String(userStorage));
  const navigate = useNavigate();
  const [consultants, setConsultants] = useState<any>([]);

  const handleOpenEditConsultants = (row: any) => {
    localStorage.setItem("idConsultant", JSON.stringify(row.id));
    localStorage.setItem("consultantSelected", JSON.stringify(row));

    navigate(ROUTES.UPDATE_CONSULTANT);
  };

  const headers = [
    {
      id: 1,
      name: "STATUS",
      selector: (row: any) =>
        row.is_active === 1 ? "Desbloqueado" : "Bloqueado",
      sortable: true,
      reorder: true,
    },
    {
      id: 2,
      name: "NOME",
      selector: (row: any) => row.name,
      sortable: true,
      reorder: true,
    },
    {
      id: 3,
      name: "SOBRENOME",
      selector: (row: any) => row.suname,
      sortable: true,
      reorder: true,
    },
    {
      id: 4,
      name: "E-MAIL",
      selector: (row: any) => row.email,
      sortable: true,
      reorder: true,
    },
    {
      id: 5,
      name: "TIPO DE PERFIL",
      selector: (row: any) => (row.user_type_id === 3 ? "Consultor" : "Gestor"),
      sortable: true,
      reorder: true,
    },
    {
      id: 6,
      name: "",
      selector: (row: any) => (
        <MyButton onClick={() => handleOpenEditConsultants(row)}>
          Ver detalhes
        </MyButton>
      ),
      sortable: true,
      reorder: true,
    },
  ];

  const getConsultants = async () => {
    await Api.get(`/auth/consultant-customer/${userInfoStorage.customer[0].id}`)
      .then((res: AxiosResponse) => {
        setConsultants(res.data.data);
      })
      .catch((err: AxiosResponse) => {});
  };

  useEffect(() => {
    getConsultants();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (consultants) {
    return (
      <>
        {consultants.length === 0 ? (
          <>
            <p>Você não possui consultores cadastrados.</p>
            <Link color="#7956F7" href="/register-consultant" fontSize="20px">
              Clique aqui para cadastrar consultores a sua empresa.
            </Link>
          </>
        ) : (
          <DataTable
            columns={headers}
            data={consultants[0].user}
            conditionalRowStyles={conditionalRowStyles}
            defaultSortFieldId={1}
            customStyles={styleTable}
            noDataComponent="Desculpe não encontramos :/"
            expandableRows
            pagination={true}
            paginationPerPage={10}
            expandableRowsComponent={({ data }) => (
              <TableCompanies userRow={data} />
            )}
          />
        )}
      </>
    );
  } else {
    return <TableLoader />;
  }
}
