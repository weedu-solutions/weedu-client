import { Link, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Modal from "react-modal";

import arrowDown from "../../../assets/arrow-down.svg";
import arrowUp from "../../../assets/arrow-up.svg";
import filter from "../../../assets/filter.svg";
import clearFilter from "../../../assets/clearFilter.svg";

import moreIcon from "../../../assets/more.svg";
import TableLoader from "../../../components/Loaders/TableLoader";
import { TagTable } from "../../../components/TagTable";
import { TagTableData } from "../../../components/TagTableData";
import { useAuth } from "../../../hooks/auth";
import IActions from "../../../interfaces/actions";
import { ActionsServices } from "../../../services/actions";
import { colors } from "../../../theme";
import { ModalDisableAction } from "../Modals/ModalDisableAction";
import { ModalOptions } from "../Modals/ModalOptions";
import { ModalSeeDetails } from "../Modals/ModalSeeDetails";
import { ModalStartAction } from "../Modals/ModalStartAction";
import { ModalBlockContent, MyButton } from "../styles";
import { Message } from "./styles";
import * as S from "./styles";

export interface Option {
  value: string;
  label: string;
}

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const conditionalRowStyles = [
  {
    when: (row: any) => row.id % 2 === 0,
    style: {
      backgroundColor: "#F8F7FA",
    },
  },
];

const stylesTable = {
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

const styleModalOptions = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.50)",
  },
  content: {
    maxWidth: "400px",
    height: "280px",
    margin: "auto",
  },
};

const styleModalStartAction = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.50)",
  },
  content: {
    maxWidth: "800px",
    height: "650px",
    margin: "auto",
  },
};

const styleModalSeeAction = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.50)",
  },
  content: {
    maxWidth: "800px",
    height: "700px",
    margin: "auto",
  },
};

const styleModalDisableAction = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.50)",
  },
  content: {
    maxWidth: "400px",
    height: "280px",
    margin: "auto",
  },
};

export function TableActions() {
  const [isModalStartAction, setIsModalStartAction] = useState(false);
  const [isModalSeeDetails, setIsSeDetails] = useState(false);
  const [isModalDisableAction, setIsModalDisableAction] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<any>([]);
  const [actions, setActions] = useState<any>([]);
  const [actionInfo, setActionInfo] = useState<IActions | undefined>();
  const [pending, setPending] = useState<boolean>(false);
  const infoCompany: any = JSON.parse(
    localStorage.getItem("company_consultant") || "{}"
  );

  const { user } = useAuth();

  const handleModal = async (row: any) => {
    setIsModalOpen((value) => !value);
    let detaislAction = await row;
    return setActionInfo(detaislAction);
  };

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

  const headers = [
    {
      id: 1,
      name: "Status",
      selector: (row: any) => <TagTable status={row.status} rowInfo={row} />,
      sortable: true,
      reorder: true,
    },
    {
      id: 2,
      name: "O que será feito",
      selector: (row: any) => row.what,
      sortable: true,
      reorder: true,
    },
    {
      id: 3,
      name: "Início Previsto",
      selector: (row: any) => <TagTableData date={row.preview_init_date} />,
      sortable: false,
      reorder: false,
    },
    {
      id: 4,
      name: "Fim Previsto",
      selector: (row: any) => <TagTableData date={row.preview_end_date} />,
      sortable: false,
      reorder: false,
    },
    {
      id: 5,
      name: "Responsável",
      sortable: true,
      selector: (row: any) => row.who,
      reorder: true,
    },
    {
      id: 6,
      name: "",
      selector: (row: any) => (
        <Tooltip
          label="Ver mais sobre o plano de ação"
          placement="right-end"
          hasArrow
        >
          <MyButton onClick={() => handleModal(row)}>
            <img src={moreIcon} alt="Mais detalhes" />
          </MyButton>
        </Tooltip>
      ),
      sortable: true,
      reorder: true,
    },
  ];

  function compare(a: any, b: any) {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  }

  useEffect(() => {
    setPending(true);

    const getTableActionsCustomer = async () => {
      const { data } = await ActionsServices.getAllActionsCustomer(
        infoCompany.id
      );
      setPending(false);

      setActions(data);
      return setAction(data.sort(compare));
    };

    const getTableActions = async () => {
      const { data } = await ActionsServices.getAllActions();
      setPending(false);
      setActions(data);
      return setAction(data.sort(compare));
    };

    if (user.user_type_id === 1 || 2) {
      getTableActions();
    }

    if (user.user_type_id === 3) {
      getTableActionsCustomer();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setAction]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [filterActive, setFilterActive] = useState(false);
  const [filterAction, setFilterAction] = useState([]);

  const SelectCheckbox: React.FC = () => {
    const options: Option[] = [
      { value: "1", label: "A iniciar" },
      { value: "2", label: "Em execução" },
      { value: "3", label: "Executado" },
      { value: "4", label: "Atrasado - A iniciar" },
      { value: "5", label: "Atrasado - A terminar" },
    ];

    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };

    const handleOptionChange = (value: string) => {
      if (selectedOptions.includes(value)) {
        setSelectedOptions(
          selectedOptions.filter((option) => option !== value)
        );
      } else {
        setSelectedOptions([...selectedOptions, value]);
      }
    };

    const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
      return (
        <S.CheckboxInput
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
      );
    };

    return (
      <S.SelectWrapper>
        <S.SelectButton onClick={toggleOpen}>
          {selectedOptions.length === 0 ? (
            <>
              Filtrar <img src={isOpen ? arrowDown : arrowUp} />
            </>
          ) : (
            `${selectedOptions.length} opções selecionadas`
          )}
        </S.SelectButton>
        {isOpen && (
          <S.CheckboxList>
            <p>STATUS</p>
            {options.map((option) => (
              <S.CheckboxLabel key={option.value}>
                <Checkbox
                  checked={selectedOptions.includes(option.value)}
                  onChange={() => handleOptionChange(option.value)}
                />
                <span>{option.label}</span>
              </S.CheckboxLabel>
            ))}
          </S.CheckboxList>
        )}
      </S.SelectWrapper>
    );
  };

  function filterStatus() {
    setFilterActive(true);
    setIsOpen(false);

    const filterCollaborators = action.filter((users: any) =>
      selectedOptions.includes(users.status.toString())
    );

    return setFilterAction(filterCollaborators);
  }

  function clearFilterStatus() {
    setFilterActive(false);
    setSelectedOptions([]);
    setIsOpen(false);
  }

  return (
    <>
      <Modal style={styleModalOptions} isOpen={isModalOpen} ariaHideApp={false}>
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

      <Modal isOpen={isModalStartAction} style={styleModalStartAction}>
        <ModalBlockContent>
          <ModalStartAction
            action={actionInfo}
            closeModal={handleOpenModalStartAction}
          />
        </ModalBlockContent>
      </Modal>

      <Modal isOpen={isModalSeeDetails} style={styleModalSeeAction}>
        <>
          <ModalSeeDetails
            action={actionInfo}
            closeModal={handleOpenModalSeeDetails}
          />
        </>
      </Modal>

      <Modal isOpen={isModalDisableAction} style={styleModalDisableAction}>
        <ModalBlockContent>
          <ModalDisableAction
            action={actionInfo}
            closeModal={handleOpenModalDisableAction}
          />
        </ModalBlockContent>
      </Modal>

      <S.RowFilter>
        <SelectCheckbox />

        <Tooltip label="Filtrar por status" placement="right-end" hasArrow>
          <S.ButtonFilter onClick={() => filterStatus()}>
            <img src={filter} alt="Filtrar" />
          </S.ButtonFilter>
        </Tooltip>

        <Tooltip label="Limpar filtro status" placement="right-end" hasArrow>
          <S.ButtonFilter onClick={() => clearFilterStatus()}>
            <img src={clearFilter} alt="Limpar filtro" />
          </S.ButtonFilter>
        </Tooltip>
      </S.RowFilter>

      {!pending ? (
        actions.length === 0 ? (
          <Message>
            <h1>Seja bem-vindo(a) ao Weedu !</h1>
            <Link color="#7956F7" href="/create-action" fontSize="20px">
              Clique aqui para criar um plano de ação
            </Link>
          </Message>
        ) : (
          <DataTable
            columns={headers}
            data={!filterActive ? action : filterAction}
            conditionalRowStyles={conditionalRowStyles}
            defaultSortFieldId={1}
            customStyles={stylesTable}
            noDataComponent="Desculpe não encontramos :/"
          />
        )
      ) : (
        <TableLoader />
      )}
    </>
  );
}
