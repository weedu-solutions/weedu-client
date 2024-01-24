import { useState } from "react";
import DataTable from "react-data-table-component";
import { HiPlus } from "react-icons/hi";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { BoxColor } from "../../../components/BoxColor";
import { ROUTES } from "../../../constants/routes";
import IActions from "../../../interfaces/actions";
import { colors } from "../../../theme";
import { ModalDisableAction } from "../Modals/ModalDisableAction";
import { ModalOptions } from "../Modals/ModalOptions";
import { ModalSeeDetails } from "../Modals/ModalSeeDetails";
import { ModalStartAction } from "../Modals/ModalStartAction";
import { ModalBlockContent } from "../styles";
import { ButtonActions } from "./styles";
import * as S from "./styles";
import { STATUS_COLORS } from "../../../utils/statusColors";
import { useListActions } from "../../../hooks/useActions/useListActions";
import TableLoader from "../../../components/Loaders/TableLoader";
import { FilterStatusActions } from "./components/FilterActions";
import { WelcomeToWeeduAction } from "./components/WelcomeToWeedu";

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
  const {
    loadingActions,
    loadingActionsCustomer,
    tableData,
    selectedOptions,
    setSelectedOptions,
    filterStatusIsActive,
  } = useListActions();

  const [isModalStartAction, setIsModalStartAction] = useState(false);
  const [isModalSeeDetails, setIsSeDetails] = useState(false);
  const [isModalDisableAction, setIsModalDisableAction] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionInfo, setActionInfo] = useState<IActions | undefined>();

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

  const headers: any = [
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
          <p style={{ color: STATUS_COLORS.EXECUTADO, fontWeight: "bold" }}>
            Finalizada
          </p>
        ) : row.is_active === 0 ? (
          <p style={{ color: STATUS_COLORS.DESATIVADO, fontWeight: "bold" }}>
            Desativada
          </p>
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
          <FilterStatusActions
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        </div>

        <S.ButtonNewAction onClick={() => navigate(ROUTES.CREATE_ACTION)}>
          <HiPlus fill="#fff" size="20" />
          Plano de Ação
        </S.ButtonNewAction>
      </S.RowFilter>

      {loadingActions || loadingActionsCustomer ? (
        <TableLoader />
      ) : (
        <DataTable
          columns={headers}
          data={tableData}
          conditionalRowStyles={conditionalRowStyles}
          defaultSortFieldId={1}
          customStyles={stylesTable}
          highlightOnHover
          pointerOnHover
          noDataComponent={
            !filterStatusIsActive ? (
              <WelcomeToWeeduAction />
            ) : (
              <p>Não encontramos dados :/</p>
            )
          }
          onRowClicked={handleRowClick}
          pagination={true}
          paginationPerPage={10}
        />
      )}
    </>
  );
}
