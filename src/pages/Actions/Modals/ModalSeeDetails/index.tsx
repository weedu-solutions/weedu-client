import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Switch, Text } from "@chakra-ui/react";
import moment from "moment";
import { useAuth } from "../../../../hooks/auth";
import { Api } from "../../../../services/api";
import { Notify, NotifyTypes } from "../../../../components/Notify";
import {
  Modal,
  ModalSection,
  ModalSectionTitle,
  ModalGrid,
  ModalButtonContainer,
  ModalCancelButton,
  ModalSubmitButton,
} from "../../../../components/Modal";
import { IAction } from "../../../../interfaces/actions";
import { FormInput } from "../../../../components/Form/FormInput";
import { FormSelect } from "../../../../components/Form/FormSelect";
import { FormTextarea } from "../../../../components/Form/FormTextarea";
import { BoxColor } from "../../../../components/BoxColor";
import { useActions } from "../../../../hooks/useActions";

const editActionSchema = z.object({
  problem: z.string().min(1, "O problema é obrigatório"),
  what: z.string().min(1, "O que será feito é obrigatório"),
  how: z.string().min(1, "Como será feito é obrigatório"),
  who: z.string().min(1, "Responsável é obrigatório"),
  why_1: z.string().nullable().optional(),
  why_2: z.string().nullable().optional(),
  why_3: z.string().nullable().optional(),
  why_4: z.string().nullable().optional(),
  why_5: z.string().nullable().optional(),
  user_id: z.string().nullable().optional(),
  observation: z.string().nullable().optional(),
});

type EditActionFormData = z.infer<typeof editActionSchema>;

interface ModalSeeDetailsProps {
  closeModal: () => void;
  action: IAction;
  // refetchAllActions: () => void;
}

const formatDateToInput = (date: string | undefined) => {
  if (!date) return "";
  return moment(date, "DD/MM/YYYY").format("YYYY-MM-DD");
};

interface User {
  id: number;
  name: string;
}

export function ModalSeeDetails({
  closeModal,
  action,
      //  refetchAllActions,
}: ModalSeeDetailsProps) {
  const { user, infoCompany } = useAuth();
  const { updateAction } = useActions();
  const [editData, setEditData] = useState(false);
  const [isChecked, setIsChecked] = useState(action?.is_active === 1);
  const [preview_init_date, setPreview_init_date] = useState(
    formatDateToInput(action?.preview_init_date)
  );
  const [preview_end_date, setPreview_end_date] = useState(
    formatDateToInput(action?.preview_end_date)
  );

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<EditActionFormData>({
    resolver: zodResolver(editActionSchema),
    defaultValues: {
      problem: action?.problem,
      what: action?.what,
      how: action?.how,
      who: action?.who,
      why_1: action?.why_1,
      why_2: action?.why_2,
      why_3: action?.why_3,
      why_4: action?.why_4,
      why_5: action?.why_5,
      observation: action?.observation,
    },
  });

  const usersCompanyConsultant = JSON.parse(
    localStorage.getItem("users_company") || "[]"
  );
  const idCustumer =
    user?.user_type_id === 3 ? infoCompany.id : user?.customer[0].id;
  const users: User[] = usersCompanyConsultant[0]?.user || [];

  const onSubmit = async (data: EditActionFormData) => {
    try {
      const selectedUser = users.find(u => u.id === Number(data.user_id));

      const formData = {
        id: action.id,
        ...data,
        who: selectedUser?.name || action?.who,
        user_id: selectedUser?.id || action?.user_id,
        customer_id: idCustumer,
        where: "O",
        is_active: isChecked ? 1 : 0,
        preview_init_date: editData ? moment(preview_init_date).format("DD/MM/YYYY") : action?.preview_init_date,
        preview_end_date: editData ? moment(preview_end_date).format("DD/MM/YYYY") : action?.preview_end_date,
        init_date: action?.init_date || null,
        end_date: action?.end_date || null,
        why_1: data.why_1 || null,
        why_2: data.why_2 || null,
        why_3: data.why_3 || null,
        why_4: data.why_4 || null,
        why_5: data.why_5 || null,
        observation: data.observation || null,
      };

      await updateAction.mutateAsync(formData);
      Notify(NotifyTypes.SUCCESS, "Plano de Ação editado com sucesso!");
      closeModal();
    } catch (error) {
      Notify(NotifyTypes.ERROR, "Não foi possível editar o Plano de Ação.");
    }
  };

  return (
    <Modal title="Detalhes do Plano de Ação" onClose={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalSection>
          <ModalSectionTitle>Identificação do Problema</ModalSectionTitle>
          <FormTextarea
            label="Qual o problema ou causa que será tratado?"
            name="problem"
            register={register}
            error={errors.problem?.message}
            placeholder="Descreva o problema ou causa"
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
                placeholder="Descreva a ação"
              />
            </Box>

            <Box gridColumn="span 2">
              <FormTextarea
                label="Como irá realizar esta Ação? (How?)"
                name="how"
                register={register}
                error={errors.how?.message}
                placeholder="Descreva como será feito"
              />
            </Box>

            <Box>
              <FormSelect
                label="Responsável pela Ação (Who?)"
                name="user_id"
                register={register}
                error={errors.who?.message}
                placeholder="Selecione o responsável"
                defaultValue={action?.user_id}
                options={users.map(user => ({
                  value: user.id.toString(),
                  label: user.name
                }))}
                isDisabled={!!action?.end_date && !!action?.init_date}
                onChange={(e) => {
                  const selectedUser = users.find(u => u.id === Number(e.target.value));
                  if (selectedUser) {
                    setValue('who', selectedUser.name);
                    setValue('user_id', selectedUser.id.toString());
                  }
                }}
              />
            </Box>
          </ModalGrid>
        </ModalSection>

        <ModalSection>
          <ModalSectionTitle>Cronograma</ModalSectionTitle>
          <ModalGrid>
            <Box>
              <FormInput
                label="Data Início Prevista"
                name="preview_init_date"
                type="date"
                register={register}
                isDisabled={!editData}
                defaultValue={preview_init_date}
                onChange={(e) => setPreview_init_date(e.target.value)}
              />
              {action?.init_date && (
                <Box mt={2} fontSize="sm" color="gray.600">
                  Início real: {action.init_date}
                </Box>
              )}
            </Box>

            <Box>
              <FormInput
                label="Data Fim Prevista"
                name="preview_end_date"
                type="date"
                register={register}
                isDisabled={!editData}
                defaultValue={preview_end_date}
                onChange={(e) => setPreview_end_date(e.target.value)}
              />
              {action?.end_date && (
                <Box mt={2} fontSize="sm" color="gray.600">
                  Fim real: {action.end_date}
                </Box>
              )}
            </Box>
          </ModalGrid>

          <Box mt={4}>
            <ModalCancelButton
              type="button"
              onClick={() => setEditData(!editData)}
            >
              {editData ? "Cancelar" : "Editar datas previstas"}
            </ModalCancelButton>
          </Box>
        </ModalSection>

        <ModalSection>
          <ModalSectionTitle>Status da Ação</ModalSectionTitle>

          <Box
            display="flex"
            flexDirection="column"
            gap={4}
            p={4}
            bg="gray.50"
            borderRadius="md"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              bg="white"
              p={3}
              borderRadius="md"
              boxShadow="sm"
            >
              <Box display="flex" alignItems="center" gap={3}>
                <Switch
                  colorScheme="purple"
                  size="md"
                  isChecked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  isDisabled={!!action?.end_date && !!action?.init_date}
                />
                <Text fontWeight="500" color="gray.700">
                  {action?.end_date && action?.init_date
                    ? "Ação finalizada"
                    : isChecked
                    ? "Ação ativada"
                    : "Ação desativada"}
                </Text>
              </Box>

              <BoxColor status={action.status} rowInfo={action} />
            </Box>
          </Box>
        </ModalSection>

        <ModalButtonContainer>
          <ModalCancelButton type="button" onClick={closeModal}>
            Cancelar
          </ModalCancelButton>
          <ModalSubmitButton type="submit">Salvar alterações</ModalSubmitButton>
        </ModalButtonContainer>
      </form>
    </Modal>
  );
}
