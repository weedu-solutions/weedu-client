import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box } from "@chakra-ui/react";
import moment from "moment";
import { useAuth } from "../../../../hooks/auth";
import { Notify, NotifyTypes } from "../../../../components/Notify";
import {
  Modal,
  ModalSection,
  ModalSectionTitle,
  ModalGrid,
  ModalButtonContainer,
  ModalCancelButton,
  ModalSubmitButton,
  ModalErrorMessage,
} from "../../../../components/Modal";
import { FormInput } from "../../../../components/Form/FormInput";
import { FormSelect } from "../../../../components/Form/FormSelect";
import { FormTextarea } from "../../../../components/Form/FormTextarea";
import { useCompanyUsers } from "../../../../hooks/useCompanyUsers";
import { useActions } from "../../../../hooks/useActions";

const createActionSchema = z.object({
  problem: z.string().min(1, "O problema é obrigatório"),
  what: z.string().min(1, "O que será feito é obrigatório"),
  how: z.string().min(1, "Como será feito é obrigatório"),
  who: z.string().min(1, "Responsável é obrigatório"),
  why_1: z.string().min(1, "Por que? (1) é obrigatório"),
  why_2: z.string().optional(),
  why_3: z.string().optional(),
  why_4: z.string().optional(),
  why_5: z.string().optional(),
  user_id: z.string().optional(),
  observation: z.string().optional(),
  preview_init_date: z.string().min(1, "Data inicial é obrigatória"),
  preview_end_date: z.string().min(1, "Data final é obrigatória"),
});

type CreateActionFormData = z.infer<typeof createActionSchema>;

interface ModalCreateActionProps {
  closeModal: () => void;
}

export function ModalCreateAction({
  closeModal,
}: ModalCreateActionProps) {
  const { user, infoCompany } = useAuth();
  const { createAction } = useActions();
  const { getUserOptions } = useCompanyUsers();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    watch,
  } = useForm<CreateActionFormData>({
    resolver: zodResolver(createActionSchema),
  });

  const preview_init_date = watch("preview_init_date");
  const preview_end_date = watch("preview_end_date");
  const isDateValid =
    preview_end_date &&
    preview_init_date &&
    preview_end_date >= preview_init_date;

  const idCustumer =
    user?.user_type_id === 3 ? infoCompany.id : user?.customer[0].id;

  const onSubmit = async (data: CreateActionFormData) => {
    try {
      setLoading(true);

      await createAction.mutateAsync({
        ...data,
        customer_id: idCustumer,
        where: "O",
        who: data?.who,
        is_active: user.is_active,
        preview_init_date: moment(data.preview_init_date).format("DD/MM/YYYY"),
        preview_end_date: moment(data.preview_end_date).format("DD/MM/YYYY"),
        init_date: null,
        end_date: null,
        user_id: data?.user_id?.toString(),
      });

      Notify(NotifyTypes.SUCCESS, "Plano de Ação criado com sucesso!");
      closeModal();
    } catch (error) {
      Notify(NotifyTypes.ERROR, "Não foi possível criar o Plano de Ação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Nova Ação"
      subtitle="Preencha os dados para criar uma nova ação"
      onClose={closeModal}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalSection>
          <ModalSectionTitle>Identificação do Problema</ModalSectionTitle>
          <FormTextarea
            label="Qual o problema ou causa que será tratado?"
            name="problem"
            register={register}
            error={errors.problem?.message}
            placeholder="Descreva detalhadamente o problema ou causa"
          />
        </ModalSection>

        <ModalSection>
          <ModalSectionTitle>Análise dos 5 Porquês</ModalSectionTitle>
          <ModalGrid>
            {[1, 2, 3, 4, 5].map((num) => (
              <FormInput
                key={num}
                label={`Por que? (${num})`}
                name={`why_${num}`}
                register={register}
                error={errors[`why_${num}` as keyof typeof errors]?.message}
                placeholder={`${num}º por quê?`}
              />
            ))}
          </ModalGrid>
        </ModalSection>

        <ModalSection>
          <ModalSectionTitle>Detalhes da Ação</ModalSectionTitle>
          <ModalGrid>
            <Box gridColumn="span 2">
              <FormInput
                label="O que será feito? (What?)"
                name="what"
                register={register}
                error={errors.what?.message}
                placeholder="Descreva a ação a ser realizada"
              />
            </Box>

            <Box gridColumn="span 2">
              <FormTextarea
                label="Como irá realizar esta Ação? (How?)"
                name="how"
                register={register}
                error={errors.how?.message}
                placeholder="Descreva o passo a passo da execução"
              />
            </Box>

            <FormSelect
              label="Responsável pela Ação (Who?)"
              name="user_id"
              register={register}
              error={errors.user_id?.message}
              placeholder="Selecione o responsável"
              options={getUserOptions()}
              onChange={(e) => {
                const selectedId = e.target.value;
                const selectedOption = getUserOptions().find(
                  (option) => option.value.toString() === selectedId
                );
                if (selectedOption) {
                  setValue('who', selectedOption.label);
                  setValue('user_id', selectedOption.value);
                }
              }}
            />
          </ModalGrid>
        </ModalSection>

        <ModalSection>
          <ModalSectionTitle>Cronograma</ModalSectionTitle>
          <ModalGrid>
            <FormInput
              label="Data Início Prevista"
              name="preview_init_date"
              type="date"
              register={register}
              error={errors.preview_init_date?.message}
            />

            <FormInput
              label="Data Fim Prevista"
              name="preview_end_date"
              type="date"
              register={register}
              error={errors.preview_end_date?.message}
            />
          </ModalGrid>

          {preview_end_date && preview_init_date && !isDateValid && (
            <ModalErrorMessage>
              A data final deve ser maior ou igual à data inicial
            </ModalErrorMessage>
          )}
        </ModalSection>

        <ModalSection>
          <ModalSectionTitle>Observações Adicionais</ModalSectionTitle>
          <FormTextarea
            label="Observações"
            name="observation"
            register={register}
            error={errors.observation?.message}
            placeholder="Informações complementares importantes"
          />
        </ModalSection>

        <ModalButtonContainer>
          <ModalCancelButton type="button" onClick={closeModal}>
            Cancelar
          </ModalCancelButton>
          <ModalSubmitButton type="submit" disabled={loading || !isDateValid}>
            {loading ? "Criando..." : "Criar Ação"}
          </ModalSubmitButton>
        </ModalButtonContainer>
      </form>
    </Modal>
  );
}
