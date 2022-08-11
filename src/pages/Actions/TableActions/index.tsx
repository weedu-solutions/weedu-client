import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ActionsServices } from "../../../services/actions";
import { colors } from "../../../theme";
import { TagTable } from "../../../components/TagTable";
import Modal from 'react-modal'
import { ModalBlockContent, MyButton } from "../styles";
import moreIcon from "../../../assets/more.svg";
import { ModalDisableAction } from "../Modals/ModalDisableAction";
import { ModalSeeDetails } from "../Modals/ModalSeeDetails";
import { ModalStartAction } from "../Modals/ModalStartAction";
import IActions from "../../../interfaces/actions";
import { ModalOptions } from "../Modals/ModalOptions";
import TableLoader from "../../../components/Loaders/TableLoader";
import { Link, Tooltip } from "@chakra-ui/react";
import { Message } from "./styles";
import { TagTableData } from "../../../components/TagTableData";
import { useAuth } from "../../../hooks/auth";




const conditionalRowStyles = [
    {
        when: (row: any) => row.id % 2 === 0,
        style: {
            backgroundColor: '#F8F7FA',
        },
    },
]

const stylesTable = {
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

const styleModalOptions = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.50)'
    },
    content: {
        maxWidth: '400px',
        height: '280px',
        margin: 'auto',
    }
}

const styleModalStartAction = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.50)'
    },
    content: {
        maxWidth: '800px',
        height: '650px',
        margin: 'auto',
    }
}

const styleModalSeeAction = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.50)'
    },
    content: {
        maxWidth: '800px',
        height: '700px',
        margin: 'auto',
    }
}

const styleModalDisableAction = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.50)'
    },
    content: {
        maxWidth: '400px',
        height: '280px',
        margin: 'auto',
    }
}


export function TableActions() {
    const [isModalStartAction, setIsModalStartAction] = useState(false);
    const [isModalSeeDetails, setIsSeDetails] = useState(false);
    const [isModalDisableAction, setIsModalDisableAction] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [action, setAction] = useState<any>([]);
    const [actions, setActions] = useState<any>([]);
    const [actionInfo, setActionInfo] = useState<IActions | undefined>();
    const [pending, setPending] = useState<boolean>(false);
    const infoCompanyConsultant: any = JSON.parse(localStorage.getItem('company_consultant') || '{}');


    const { user } = useAuth();


    const handleModal = async (row: any) => {
        setIsModalOpen(value => !value);
        let detaislAction = await row;
        return (setActionInfo(detaislAction));
    }

    function handleOpenModalStartAction() {
        setIsModalStartAction((oldValue) => !oldValue);
        setIsModalOpen(false);
    }

    function handleOpenModalSeeDetails() {
        setIsSeDetails((oldValue) => !oldValue);
        setIsModalOpen(false);
    }

    function handleOpenModalDisableAction() {
        setIsModalDisableAction((oldValue) => !oldValue);
        setIsModalOpen(false);
    }

    const userStorage = localStorage.getItem('user')
    const userInfoStorage = JSON.parse(String(userStorage))

    const headers = [
        {
            id: 1,
            name: 'Status',
            selector: (row: any) =>
                <TagTable status={row.status} rowInfo={row} />,
            sortable: true,
            reorder: true
        },
        {
            id: 2,
            name: 'O que será feito',
            selector: (row: any) => row.what,
            sortable: true,
            reorder: true
        },
        {
            id: 3,
            name: 'Início Previsto',
            selector: (row: any) => <TagTableData date={row.preview_init_date} />,
            sortable: true,
            reorder: true
        },
        {
            id: 4,
            name: 'Fim Previsto',
            selector: (row: any) => <TagTableData date={row.preview_end_date} />,
            sortable: true,
            reorder: true
        },
        {
            id: 5,
            name: 'Responsável',
            sortable: true,
            selector: (row: any) => row.who,
            reorder: true
        },
        {
            id: 6,
            name: '',
            sortable: true,
            selector: (row: any) => <Tooltip label='Ver mais sobre o plano de ação' placement='right-end' hasArrow>
                <MyButton onClick={() => handleModal(row)}><img src={moreIcon} alt="Mais detalhes" /></MyButton></Tooltip>,
            reorder: true
        }
    ]

    function compare(a: any, b: any) {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    }

    useEffect(() => {
        setPending(pending => !pending);
        const getData = async () => {
            const { data } = await ActionsServices.getAllActions(
                user.user_type_id === 3 ?
                    infoCompanyConsultant.id
                    :
                    userInfoStorage.customer[0].id
            )
            setPending(pending => !pending);
            setActions(data);
            console.log(infoCompanyConsultant)
            return setAction(data.sort(compare));
        }

        getData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setAction]);


    return (
        <>
            <Modal
                style={styleModalOptions}
                isOpen={isModalOpen}
                ariaHideApp={false}
            >
                <ModalBlockContent>
                    <ModalOptions
                        handleOpenModalStartAction={handleOpenModalStartAction}
                        handleOpenModalSeeDetails={handleOpenModalSeeDetails}
                        handleOpenModalDisableAction={handleOpenModalDisableAction}
                        handleModal={handleModal}
                        action={actionInfo}
                    />
                </ModalBlockContent>
            </Modal>

            <Modal
                isOpen={isModalStartAction}
                style={styleModalStartAction}
            >
                <ModalBlockContent>
                    <ModalStartAction
                        action={actionInfo}
                        closeModal={handleOpenModalStartAction}
                    />
                </ModalBlockContent>
            </Modal>

            <Modal
                isOpen={isModalSeeDetails}
                style={styleModalSeeAction}
            >
                <>
                    <ModalSeeDetails
                        action={actionInfo}
                        closeModal={handleOpenModalSeeDetails}
                    />
                </>
            </Modal>

            <Modal
                isOpen={isModalDisableAction}
                style={styleModalDisableAction}
            >
                <ModalBlockContent>
                    <ModalDisableAction
                        action={actionInfo}
                        closeModal={handleOpenModalDisableAction}
                    />
                </ModalBlockContent>
            </Modal>

            {

                !pending ?

                    actions.length === 0 ?
                        <Message>
                            <h1>
                                Seja bem-vindo(a) ao Weedu !
                            </h1>
                            <Link color='#7956F7' href='/create-action' fontSize="20px">
                                Clique aqui para criar um plano de ação
                            </Link>
                        </Message>
                        :
                        <DataTable
                            columns={headers}
                            data={action}
                            conditionalRowStyles={conditionalRowStyles}
                            defaultSortFieldId={1}
                            customStyles={stylesTable}
                        />

                    : <TableLoader />
            }
        </>
    )
}
