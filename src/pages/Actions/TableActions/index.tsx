import { Link, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { HiPlus } from "react-icons/hi";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

import arrowDown from "../../../assets/arrow-down.svg";
import arrowUp from "../../../assets/arrow-up.svg";
import clearFilter from "../../../assets/clearFilter.svg";
import filter from "../../../assets/filter.svg";
import { BoxColor } from "../../../components/BoxColor";
import TableLoader from "../../../components/Loaders/TableLoader";
import { ROUTES } from "../../../constants/routes";
import { useAuth } from "../../../hooks/auth";
import IActions from "../../../interfaces/actions";
import { ActionsServices } from "../../../services/actions";
import { colors } from "../../../theme";
import { ModalDisableAction } from "../Modals/ModalDisableAction";
import { ModalOptions } from "../Modals/ModalOptions";
import { ModalSeeDetails } from "../Modals/ModalSeeDetails";
import { ModalStartAction } from "../Modals/ModalStartAction";
import { ModalBlockContent } from "../styles";
import { ButtonActions, Message } from "./styles";
import * as S from "./styles";
import { STATUS_COLORS } from "../../../utils/statusColors";

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

  const navigate = useNavigate();

  const handleModal = async (row: any) => {
    setIsModalOpen((value) => !value);
    let detaislAction = await row;
    return setActionInfo(detaislAction);
  };

  function handleOpenModalStartAction(row: any) {
    setIsModalStartAction((oldValue) => !oldValue);
    setIsModalOpen(false);
    setActionInfo(row);
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
      selector: (row: any) => <BoxColor status={row.status} rowInfo={row} />,
      sortable: true,
      reorder: true,
      width: "90px",
    },
    {
      id: 2,
      name: "O que será feito",
      selector: (row: any) => (
        <div style={{ whiteSpace: "normal" }}>{row.what}</div>
      ),
      sortable: true,
      reorder: true,
      width: "300px",
    },
    {
      id: 3,
      name: "Responsável",
      sortable: true,
      selector: (row: any) => row.who,
      reorder: true,
    },
    {
      id: 4,
      name: "Início Previsto",
      selector: (row: any) => row.preview_init_date,
      sortable: true,
      reorder: true,
    },
    {
      id: 5,
      name: "Fim Previsto",
      selector: (row: any) => row.preview_end_date,
      sortable: true,
      reorder: true,
    },
    {
      id: 6,
      name: "Início Real",
      selector: (row: any) => row.init_date,
      sortable: true,
      reorder: true,
    },
    {
      id: 7,
      name: "Fim Real",
      selector: (row: any) => row.end_date,
      sortable: true,
      reorder: true,
    },
    {
      id: 8,
      name: "Executada/Desativada",
      selector: (row: any) =>
        row.end_date && row.init_date ? (
          <p style={{ color: STATUS_COLORS.EXECUTADO, fontWeight: 'bold' }}>Finalizada</p>
        ) : row.is_active === 0 ? (
          <p style={{ color: STATUS_COLORS.DESATIVADO, fontWeight: 'bold' }}>Desativada</p>
        ) : (
          <ButtonActions
            isInit={row.init_date ? true : false}
            onClick={() => handleOpenModalStartAction(row)}
            disabled={row.end_date ? true : false}
          >
            {row.init_date ? "Finalizar" : "Iniciar"}
          </ButtonActions>
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
              Filtrar <img src={isOpen ? arrowDown : arrowUp} alt="" />
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

  const handleRowClick = (row: IActions) => {
    handleOpenModalSeeDetails();
    return setActionInfo(row);
  };

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
        <ModalSeeDetails
          action={actionInfo}
          closeModal={handleOpenModalSeeDetails}
        />
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
        <div>
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
        </div>

        <S.ButtonNewAction onClick={() => navigate(ROUTES.CREATE_ACTION)}>
          <HiPlus fill="#fff" size="20" />
          Plano de Ação
        </S.ButtonNewAction>
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
            highlightOnHover
            pointerOnHover
            noDataComponent="Desculpe não encontramos :/"
            onRowClicked={handleRowClick}
            pagination={true}
            paginationPerPage={10}
          />
        )
      ) : (
        <TableLoader />
      )}
    </>
  );
}
