import DataTable from "react-data-table-component"
import { ConsultantsServices } from "../../../services/consultants"
import { colors } from "../../../theme"
import { useEffect, useState } from "react"
import { TableCompanies } from "./TableCompanies"
import { MyButton } from "../styled"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../../constants/routes"
import TableLoader from "../../../components/Loaders/TableLoader"




const conditionalRowStyles = [
    {
        when: (row: any) => row.id % 2 === 0,
        style: {
            backgroundColor: '#F8F7FA'
        },
    },
]

const styleTable = {
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

export function TableConsultants() {

    const [consultants, setConsultants] = useState<any>();
    const [pending, setPending] = useState<boolean>(false);

    const userStorage = localStorage.getItem('user');
    const userInfoStorage = JSON.parse(String(userStorage));
    const navigate = useNavigate()

    const handleOpenEditconsultans = (row: any) => {
        localStorage.setItem('idConsultant', JSON.stringify(row.id));
        localStorage.setItem('consultantSelected', JSON.stringify(row));

        navigate(ROUTES.UPDATE_CONSULTANT)
    }

    const headers = [
        {
            id: 1,
            name: 'STATUS',
            selector: (row: any) => row.is_active === '0' ? "Bloqueado" : "Desbloqueado",
            sortable: true,
            reorder: true
        },
        {
            id: 2,
            name: 'NOME',
            selector: (row: any) => row.name,
            sortable: true,
            reorder: true
        },
        {
            id: 3,
            name: 'SOBRENOME',
            selector: (row: any) => row.suname,
            sortable: true,
            reorder: true
        },
        {
            id: 4,
            name: 'E-MAIL',
            selector: (row: any) => row.email,
            sortable: true,
            reorder: true
        },
        {
            id: 5,
            name: 'TIPO DE PERFIL',
            selector: (row: any) => row.user_type_id === 3 ? "Consultor" : "Gestor",
            sortable: true,
            reorder: true
        },
        {
            id: 6,
            name: '',
            selector: (row: any) =>
                <MyButton
                    onClick={
                        () => handleOpenEditconsultans(row)
                    }
                >
                    Ver detalhes
                </MyButton>
            ,
            sortable: true,
            reorder: true
        },
    ]

    useEffect(() => {

        const getData = async () => {
            setPending(pending => !pending);
            const { data } = await ConsultantsServices.getAllConsultants(userInfoStorage.id);
            setPending(pending => !pending);

            return setConsultants(data[0].user)
        }

        getData()

    }, [setConsultants, userInfoStorage.id]);

    console.log(consultants.length)

    return (
        <>
            {
                !pending ?
                    <DataTable
                        columns={headers}
                        data={consultants}
                        conditionalRowStyles={conditionalRowStyles}
                        defaultSortFieldId={1}
                        customStyles={styleTable}
                        expandableRows
                        expandableRowsComponent={({ data }) => <TableCompanies userRow={data} />}
                    />
                    : <TableLoader />
            }
        </>
    )
}
