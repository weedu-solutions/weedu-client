import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ActionsServices } from "../../../services/actions";
import { colors } from "../../../theme";
import { ModalDetails } from "../ModalDetails";
import { TagTable } from "../../../components/TagTable";


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


export function TableActions() {

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
            selector: (row: any) => <ModalDetails />,
            reorder: true
        }
    ]

    const [action, setAction] = useState<any>([]);

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
            {

                <DataTable
                    columns={headers}
                    data={action}
                    conditionalRowStyles={conditionalRowStyles}
                    defaultSortFieldId={1}

                    customStyles={styles}
                />

            }
        </>
    )
}
