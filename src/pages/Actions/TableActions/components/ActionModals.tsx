import Modal from "react-modal";
import { ModalSeeDetails } from "../../Modals/ModalSeeDetails";
import { ModalDisableAction } from "../../Modals/ModalDisableAction";
import { IAction } from "../../../../interfaces/actions";
import { ModalCreateAction } from "../../Modals/ModalCreateAction";
import { ModalExecuteAction } from "../../Modals/ModalExecuteAction";
import { ModalStartOrFinishAction } from "../../Modals/ModalStartOrFinishAction";
import { MODAL_STYLES } from "../../../../components/Modal";
import { ModalCreateActionInProgress } from "../../Modals/ModalCreateActionInProgress";
import { ModalCreateActionFinished } from "../../Modals/ModalCreateActionFinished";

interface ActionModalsProps {
  modals: {
    startOrFinishAction: boolean;
    seeDetails: boolean;
    disableAction: boolean;
    addAction: boolean;
    executeAction: boolean;
    createActionInProgress: boolean;
    createActionFinished: boolean;
  };
  handleModalVisibility: (
    modalName:
      | "startOrFinishAction"
      | "seeDetails"
      | "disableAction"
      | "addAction"
      | "executeAction"
      | "createActionInProgress"
      | "createActionFinished"
  ) => void;
  actionInfo: IAction;
}

export function ActionModals({
  modals,
  handleModalVisibility,
  actionInfo,
}: ActionModalsProps) {
  return (
    <>
      <Modal
        isOpen={modals.startOrFinishAction}
        style={MODAL_STYLES.modalDefault}
      >
        <ModalStartOrFinishAction
          action={actionInfo}
          closeModal={() => handleModalVisibility("startOrFinishAction")}
        />
      </Modal>

      <Modal isOpen={modals.seeDetails} style={MODAL_STYLES.modalDefault}>
        <ModalSeeDetails
          action={actionInfo}
          closeModal={() => handleModalVisibility("seeDetails")}
        />
      </Modal>

      <Modal isOpen={modals.disableAction} style={MODAL_STYLES.modalDefault}>
        <ModalDisableAction
          action={actionInfo}
          closeModal={() => handleModalVisibility("disableAction")}
        />
      </Modal>

      <Modal isOpen={modals.addAction} style={MODAL_STYLES.modalDefault}>
        <ModalCreateAction
          closeModal={() => handleModalVisibility("addAction")}
        />
      </Modal>

      <Modal isOpen={modals.executeAction} style={MODAL_STYLES.modalDefault}>
        <ModalExecuteAction
          action={actionInfo}
          closeModal={() => handleModalVisibility("executeAction")}
        />
      </Modal>

      <Modal
        isOpen={modals.createActionInProgress}
        style={MODAL_STYLES.modalDefault}
      >
        <ModalCreateActionInProgress
          closeModal={() => handleModalVisibility("createActionInProgress")}
        />
      </Modal>

      <Modal
        isOpen={modals.createActionFinished}
        style={MODAL_STYLES.modalDefault}
      >
        <ModalCreateActionFinished
          closeModal={() => handleModalVisibility("createActionFinished")}
        />
      </Modal>
    </>
  );
}
