import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ActionsServices } from "../../../services/actions";
import { colors } from "../../../theme";
import { TagTable } from "../../../components/TagTable";
import Modal from 'react-modal'
import { ModalBlockContent, MyButton } from "../styles";
import moreIcon from "../../../assets/more.svg";
import { Button } from "@chakra-ui/react"
import { ModalDisableAction } from "../Modals/ModalDisableAction";
import { ModalSeeDetails } from "../Modals/ModalSeeDetails";
import { ModalStartAction } from "../Modals/ModalStartAction";
import { act } from "react-dom/test-utils";
import { AnyAaaaRecord } from "dns";
import IActions from "../../../interfaces/actions";
import { ModalOptions } from "../Modals/ModalOptions";

const conditionalRowStyles = [
    {
        when: (row: any) => row.id % 2 === 0,
        style: {
            backgroundColor: '#F8F7FA'
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
        height: '700px',
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
    const [actionInfo, setActionInfo] = useState<IActions | undefined>();


    const handleModal = async (row: any) => {
        setIsModalOpen(value => !value);
        let detaislAction = await row;
        return (setActionInfo(detaislAction));
    }

    function handleOpenModalStartAction() {
        setIsModalStartAction((oldValue) => !oldValue)
    }

    function handleOpenModalSeeDetails() {
        setIsSeDetails((oldValue) => !oldValue)
    }

    function handleOpenModalDisableAction() {
        setIsModalDisableAction((oldValue) => !oldValue)
    }

    const headers = [
        {
            id: 1,
            name: 'Status',
            selector: (row: any) =>
                <TagTable prop={row.status} />,
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
            selector: (row: any) => <TagTable prop={row.preview_init_date} />,
            sortable: true,
            reorder: true
        },
        {
            id: 4,
            name: 'Fim Previsto',
            selector: (row: any) => <TagTable prop={row.preview_end_date} />,
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
            selector: (row: any) => <MyButton onClick={() => handleModal(row)}><img src={moreIcon} alt="Mais detalhes" /></MyButton>,
            reorder: true
        }
    ]

    function compare(a: any, b: any) {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    }

    useEffect(() => {

        const getData = async () => {
            const { data } = await ActionsServices.getAllActions()
            return setAction(data.data.sort(compare));
        }

        getData()
    }, []);

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
                        handleModal={handleModal}
                        handleOpenModalDisableAction={handleOpenModalDisableAction}
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
                        click={handleOpenModalSeeDetails}
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
                <DataTable
                    columns={headers}
                    data={action}
                    conditionalRowStyles={conditionalRowStyles}
                    defaultSortFieldId={1}
                    customStyles={stylesTable}
                />
            }
        </>
    )
}
