import { Link } from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { colors } from "../../../../theme";
import { MyButton } from "../styles";
import { Box, TitleTable } from "./styles";
import moreIcon from "../../../../assets/more.svg";
import { useFetch } from "../../../../hooks/useFetch";
import TableChildLoader from "../../../../components/Loaders/TableChildLoader";
import Modal from 'react-modal'
import { useState } from "react";
import { ModalLinkCompanies } from "../ModalLinkCompanies";
import { useNavigate } from "react-router-dom";
import { ModalWithdraw } from "../ModalWithdrawCompanie";
import { useAuth } from "../../../../hooks/auth";



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

const styleModalLinkCompanies = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.50)'
    },
    content: {
        maxWidth: '400px',
        height: '400px',
        margin: 'auto',
    }
}

const styleModalWithdrawCompanie = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.50)'
    },
    content: {
        maxWidth: '400px',
        height: '280px',
        margin: 'auto',
    }
}
interface ITableCompanies {
    userRow: any;
}

export function TableCompanies({ userRow }: ITableCompanies) {

    const [isModalLinkCompanies, setIsModalLinkCompanies] = useState<boolean>(false);
    const [isModalWithdrawCompanies, setIsModalWithdrawCompanies] = useState<boolean>(false);
    const [idCompanie, setIdCompanie] = useState<number>();

    const { data } = useFetch<any>(`/auth/consultant-with-customer/${userRow.id}`);

    function handleWithdrawCompanie(id: number) {
        setIsModalWithdrawCompanies(true)
        setIdCompanie(id)
    }


    const { user } = useAuth();

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
                user.id === row.id ?
                    <></>
                    :
                    <Box>
                        <MyButton><img src={moreIcon} alt="Mais detalhes" /></MyButton>
                        <div className="dropdown">
                            <button
                                onClick={() => { handleWithdrawCompanie(row.id) }}
                            >
                                Retirar empresa
                            </button>
                        </div>
                    </Box>
            ,
            sortable: true,
            reorder: true
        },

    ]

    function handleModalLinkCompanies() {
        setIsModalLinkCompanies((oldValue) => !oldValue);
    }

    function handleModalWithdrawCompanie() {
        setIsModalWithdrawCompanies((oldValue) => !oldValue);
    }

    if (data) {
        return (
            <>
                <Modal
                    isOpen={isModalLinkCompanies}
                    style={styleModalLinkCompanies}
                >
                    <>
                        <ModalLinkCompanies
                            isActive={handleModalLinkCompanies}
                            consultantInfo={userRow}
                            linkedBusinesses={data.data.customer}
                        />
                    </>
                </Modal>

                <Modal
                    isOpen={isModalWithdrawCompanies}
                    style={styleModalWithdrawCompanie}
                >
                    <>
                        <ModalWithdraw
                            isActive={handleModalWithdrawCompanie}
                            consultantInfo={userRow}
                            linkedBusinesses={data.data.customer}
                            idCompanie={idCompanie}
                        />
                    </>
                </Modal>


                {
                    data.data.length === 0 ?
                        <>
                            <p>Você não tem vínculo com nenhuma empresa.</p>
                            <Link color='#7956F7' href='/register-consultant' fontSize="20px">
                                Clique aqui para cadastrar consultores a sua empresa.
                            </Link>
                        </>
                        :
                        <>
                            <TitleTable>
                                <p>Empresas</p>
                                <Link
                                    onClick={() => { setIsModalLinkCompanies(true) }}
                                    color='#7956F7'
                                    fontSize="16px"
                                    marginRight="4px"
                                >
                                    Vincular nova empresa
                                </Link>
                            </TitleTable>

                            <DataTable
                                columns={headers}
                                data={data.data.customer}
                                noDataComponent="Desculpe não encontramos :/"
                                conditionalRowStyles={conditionalRowStyles}
                                defaultSortFieldId={1}
                                customStyles={styleTable}
                            />
                        </>
                }
            </>
        )
    } else {
        return (
            <TableChildLoader />
        )
    }


}
