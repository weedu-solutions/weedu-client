import { useState } from "react";
import moment from "moment";
import { FormInput } from "../../../../../components/Form/FormInput";
import {
  Modal,
  ModalSection,
  ModalGrid,
  ModalButtonContainer,
  ModalCancelButton,
  ModalSubmitButton,
} from "../../../../../components/Modal";
import { Notify, NotifyTypes } from "../../../../../components/Notify";
import { Api } from "../../../../../services/api";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

interface ModalFinishActionProps {
  closeModal: () => void;
  action: any;
  refetchAllActions: () => void;
  onCancel: () => void;
}

export function ModalFinishActionBoard({
  closeModal,
  action,
  refetchAllActions,
  onCancel,
}: ModalFinishActionProps) {
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async () => {
    try {
      if (!endDate) {
        Notify(NotifyTypes.ERROR, "A data de término é obrigatória");
        return;
      }

      if (!action.init_date) {
        Notify(NotifyTypes.ERROR, "A ação precisa ter uma data de início");
        return;
      }

      await Api.post(`/auth/plan/${action.id}`, {
        ...action,
        status: 3,
        end_date: moment(endDate).format("DD/MM/YYYY"),
      });

      await refetchAllActions();
      Notify(NotifyTypes.SUCCESS, "Ação finalizada com sucesso!");
      closeModal();
    } catch (error) {
      onCancel();
      Notify(NotifyTypes.ERROR, "Não foi possível finalizar a ação.");
    }
  };

  return (
    <Modal title="Finalizar Ação" onClose={closeModal}>
      <ModalSection>
        <ModalGrid>
          <FormInput
            label="Data de Término Real"
            type="date"
            defaultValue={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            name={""}
            register={function <TFieldName extends string = string>(
              name: TFieldName,
              options?: RegisterOptions<any, TFieldName> | undefined
            ): UseFormRegisterReturn<TFieldName> {
              throw new Error("Function not implemented.");
            }}
          />
        </ModalGrid>
      </ModalSection>

      <ModalButtonContainer>
        <ModalCancelButton
          onClick={() => {
            onCancel();
            closeModal();
          }}
        >
          Cancelar
        </ModalCancelButton>
        <ModalSubmitButton onClick={handleSubmit}>
          Finalizar Ação
        </ModalSubmitButton>
      </ModalButtonContainer>
    </Modal>
  );
}
