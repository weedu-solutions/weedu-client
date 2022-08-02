import { Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ConsultantsServices } from "../../../../services/consultants";
import { colors } from "../../../../theme";
import { MyButton } from "../styles";
import { Box, TitleTable } from "./styles";
import moreIcon from "../../../../assets/more.svg";



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

interface ITableCompanies {
    userRow: any;
}

export function TableCompanies({ userRow }: ITableCompanies) {

    const [consultants, setConsultants] = useState<any>();
    const [pending, setPending] = useState<boolean>(false)

    const userStorage = localStorage.getItem('user')
    const userInfoStorage = JSON.parse(String(userStorage))

    const headers = [
        {
            id: 1,
            name: 'Nome Fantasia',
            selector: (row: any) => row.fantasy_name,
            sortable: true,
            reorder: true
        },
        {
            id: 2,
            name: 'Gestor',
            selector: (row: any) => row.maneger_name,
            sortable: true,
            reorder: true
        },
        {
            id: 3,
            name: 'Email do gestor',
            selector: (row: any) => row.maneger_email,
            sortable: true,
            reorder: true
        },
        {
            id: 4,
            name: 'Email do financeiro',
            selector: (row: any) => row.financial_email,
            sortable: true,
            reorder: true
        },
        {
            id: 5,
            name: 'CNPJ',
            selector: (row: any) => row.cpf_cnpj,
            sortable: true,
            reorder: true
        },
        {
            id: 6,
            name: '',
            selector: (row: any) =>
                <Box>
                    <MyButton><img src={moreIcon} alt="Mais detalhes" /></MyButton>
                    <div className="dropdown">
                        <button>Retirar empresa</button>
                    </div>
                </Box>
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

            return setConsultants(data)
        }

        getData()

    }, [setConsultants, userInfoStorage.id]);



    return (
        <>
            <TitleTable>
                <p>Empresas</p>
                <Link color='#7956F7' href='/create-action' fontSize="16px" marginRight="4px">
                    Vincular nova empresa
                </Link>
            </TitleTable>
            <DataTable
                columns={headers}
                data={consultants}
                conditionalRowStyles={conditionalRowStyles}
                defaultSortFieldId={1}
                customStyles={styleTable}
            />
        </>
    )
}
