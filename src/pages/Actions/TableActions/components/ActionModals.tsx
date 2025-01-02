import Modal from "react-modal";
import { ModalBlockContent } from "../../styles";
import { ModalOptions } from "../../Modals/ModalOptions";
import { ModalStartAction } from "../../Modals/ModalStartAction";
import { ModalSeeDetails } from "../../Modals/ModalSeeDetails";
import { ModalDisableAction } from "../../Modals/ModalDisableAction";
import IActions from "../../../../interfaces/actions";
import { MODAL_STYLES } from "../constants";
import { ModalCreateAction } from "../../Modals/ModalCreateAction";

interface ActionModalsProps {
  modals: {
    startAction: boolean;
    seeDetails: boolean;
    disableAction: boolean;
    options: boolean;
    addAction: boolean;
  };
  handleModalVisibility: (
    modalName:
      | "startAction"
      | "seeDetails"
      | "disableAction"
      | "options"
      | "addAction"
  ) => void;
  actionInfo: IActions | undefined;
  refetchAllActions: () => void;
}

export function ActionModals({
  modals,
  handleModalVisibility,
  actionInfo,
  refetchAllActions,
}: ActionModalsProps) {
  return (
    <>
      <Modal
        style={MODAL_STYLES.options}
        isOpen={modals.options}
        ariaHideApp={false}
      >
        <ModalBlockContent>
          <ModalOptions
            handleOpenModalStartAction={handleModalVisibility}
            handleOpenModalSeeDetails={() =>
              handleModalVisibility("seeDetails")
            }
            handleOpenModalDisableAction={() =>
              handleModalVisibility("disableAction")
            }
            handleModal={() => handleModalVisibility("options")}
            action={actionInfo}
          />
        </ModalBlockContent>
      </Modal>

      <Modal isOpen={modals.startAction} style={MODAL_STYLES.startAction}>
        <ModalBlockContent>
          <ModalStartAction
            action={actionInfo}
            closeModal={() => handleModalVisibility("startAction")}
            refetchAllActions={refetchAllActions}
          />
        </ModalBlockContent>
      </Modal>

      <Modal isOpen={modals.seeDetails} style={MODAL_STYLES.seeAction}>
        <ModalSeeDetails
          action={actionInfo}
          closeModal={() => handleModalVisibility("seeDetails")}
          refetchAllActions={refetchAllActions}
        />
      </Modal>

      <Modal isOpen={modals.disableAction} style={MODAL_STYLES.disableAction}>
        <ModalBlockContent>
          <ModalDisableAction
            action={actionInfo}
            closeModal={() => handleModalVisibility("disableAction")}
            refetchAllActions={refetchAllActions}
          />
        </ModalBlockContent>
      </Modal>

      <Modal isOpen={modals.addAction} style={MODAL_STYLES.seeAction}>
        <ModalCreateAction
          closeModal={() => handleModalVisibility("addAction")}
          refetchAllActions={refetchAllActions}
        />
      </Modal>
    </>
  );
}
