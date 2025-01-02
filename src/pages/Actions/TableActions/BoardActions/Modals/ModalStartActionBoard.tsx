import { useState } from 'react';
import moment from 'moment';
import { FormInput } from '../../../../../components/Form/FormInput';
import { Modal, ModalSection, ModalGrid, ModalButtonContainer, ModalCancelButton, ModalSubmitButton } from '../../../../../components/Modal';
import { Notify, NotifyTypes } from '../../../../../components/Notify';
import { Api } from '../../../../../services/api';
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';


interface ModalStartActionProps {
  closeModal: () => void;
  action: any;
  refetchAllActions: () => void;
  onCancel: () => void;
}

export function ModalStartActionBoard({ closeModal, action, refetchAllActions, onCancel }: ModalStartActionProps) {
  const [initDate, setInitDate] = useState('');

  const handleSubmit = async () => {
    try {
      if (!initDate) {
        Notify(NotifyTypes.ERROR, "A data de início é obrigatória");
        return;
      }

      await Api.post(`/auth/plan/${action.id}`, {
        ...action,
        status: 2,
        init_date: moment(initDate).format("DD/MM/YYYY"),
      });

      await refetchAllActions();
      Notify(NotifyTypes.SUCCESS, "Ação iniciada com sucesso!");
      closeModal();
    } catch (error) {
      onCancel(); // Volta para a coluna inicial em caso de erro
      Notify(NotifyTypes.ERROR, "Não foi possível iniciar a ação.");
    }
  };

  return (
    <Modal title="Iniciar Ação" onClose={closeModal}>
      <ModalSection>
        <ModalGrid>
          <FormInput
            label="Data de Início Real"
            type="date"
            defaultValue={initDate}
            onChange={(e) => setInitDate(e.target.value)} name={''} register={function <TFieldName extends string = string>(name: TFieldName, options?: RegisterOptions<any, TFieldName> | undefined): UseFormRegisterReturn<TFieldName> {
              throw new Error('Function not implemented.');
            } }          />
        </ModalGrid>
      </ModalSection>

      <ModalButtonContainer>
        <ModalCancelButton onClick={() => {
          onCancel();
          closeModal();
        }}>
          Cancelar
        </ModalCancelButton>
        <ModalSubmitButton onClick={handleSubmit}>
          Iniciar Ação
        </ModalSubmitButton>
      </ModalButtonContainer>
    </Modal>
  );
}