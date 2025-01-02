import { ModalSection, ModalButtonContainer, ModalCancelButton, ModalSubmitButton, Modal  } from "../../../../../components/Modal";
import { Notify, NotifyTypes } from "../../../../../components/Notify";
import { Api } from "../../../../../services/api";

  interface ModalDeactivateActionProps {
    closeModal: () => void;
    action: any;
    refetchAllActions: () => void;
    onCancel: () => void;
  }
  
  export function ModalDeactivateActionBoard({ closeModal, action, refetchAllActions, onCancel }: ModalDeactivateActionProps) {
    const handleSubmit = async () => {
      try {
        await Api.post(`/auth/plan/${action.id}`, {
          ...action,
          status: 4,
          is_active: 0
        });
  
        await refetchAllActions();
        Notify(NotifyTypes.SUCCESS, "Ação desativada com sucesso!");
        closeModal();
      } catch (error) {
        onCancel();
        Notify(NotifyTypes.ERROR, "Não foi possível desativar a ação.");
      }
    };
  
    return (
      <Modal title="Desativar Ação"  onClose={function (): void {
            throw new Error("Function not implemented.");
        } } >
        <ModalSection>
          <p>Tem certeza que deseja desativar esta ação?</p>
        </ModalSection>
  
        <ModalButtonContainer>
          <ModalCancelButton onClick={() => {
            onCancel();
            closeModal();
          }}>
            Cancelar
          </ModalCancelButton>
          <ModalSubmitButton onClick={handleSubmit}>
            Confirmar Desativação
          </ModalSubmitButton>
        </ModalButtonContainer>
      </Modal>
    );
  }