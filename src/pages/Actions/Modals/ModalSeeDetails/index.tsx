import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import moment from "moment";
import { useState } from "react";
import { useForm } from "react-hook-form";

import closeModalIcon from "../../../../assets/icon-close.svg";
import { ButtonDefault } from "../../../../components/FormChakra/Button";
import { Notify, NotifyTypes } from "../../../../components/Notify";
import { useAuth } from "../../../../hooks/auth";
import IActions from "../../../../interfaces/actions";
import { Api } from "../../../../services/api";
import { AttentionMessage } from "../../CreateAction/styles";
import {
  Footer,
  Form,
  Margin,
  Separator,
  SubTitle,
  Title,
  Toggle,
  Wrapper,
} from "./styles";
import { useQueryClient } from "react-query";

type ModalSeeDetailsProps = {
  closeModal: any;
  action: IActions | undefined;
};

// {
//   Action active 1
//   Action not active 0
// }

export function ModalSeeDetails({ closeModal, action }: ModalSeeDetailsProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [editData, setEditData] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isChecked, setIsChecked] = useState(
    action?.is_active === 1 ? true : false
  );

  const [preview_init_date, setPreview_init_date] = useState(
    action?.preview_init_date
  );
  const [preview_end_date, setPreview_end_date] = useState(
    action?.preview_end_date
  );
  const [responsible, setResponsible] = useState(action?.who);

  const handlePreviewInitDate = (event: any) =>
    setPreview_init_date(event.target.value);
  const handlePreviewEndDate = (event: any) =>
    setPreview_end_date(event.target.value);

  let chosenInitDate = moment(preview_init_date).format("DD/MM/YYYY");
  let chosenEndDate = moment(preview_end_date).format("DD/MM/YYYY");

  const infoCompanyConsultant: any = JSON.parse(
    localStorage.getItem("company_consultant") || "{}"
  );
  const usersCompanyConsultant: any = JSON.parse(
    localStorage.getItem("users_company") || "{}"
  );

  const idCustumer =
    user?.user_type_id === 3 ? infoCompanyConsultant.id : user?.customer[0].id;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({
    problem,
    why_1,
    why_2,
    why_3,
    why_4,
    why_5,
    what,
    how,
    who,
    observation,
  }: IActions) => {
    await Api.post(`/auth/plan/${action?.id}`, {
      problem,
      what,
      how,
      who,
      why_1,
      why_2,
      why_3,
      why_4,
      why_5,
      preview_init_date:
        editData === false ? action?.preview_init_date : chosenInitDate,
      preview_end_date:
        editData === false ? action?.preview_end_date : chosenEndDate,
      init_date: action?.init_date ? action?.init_date : null,
      end_date: action?.end_date ? action?.end_date : null,
      observation,
      user_id: user.id,
      customer_id: idCustumer,
      where: "O",
      is_active: isChecked === true ? 1 : 0,
    })
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ["all-actions"],
        });
        queryClient.invalidateQueries({
          queryKey: ["actions-costumer"],
        });
        closeModal();
        Notify(NotifyTypes.SUCCESS, "Plano de Ação editado com sucesso!");
      })
      .catch((err: AxiosResponse) => {
        queryClient.invalidateQueries({
          queryKey: ["all-actions"],
        });
        queryClient.invalidateQueries({
          queryKey: ["actions-costumer"],
        });
        closeModal();
        Notify(NotifyTypes.ERROR, "Não foi possível editar o Plano de Ação.");
      });
  };

  const handleSaveDetails = () => {
    handleSubmit(onSubmit)();
  };

  const handleToggle = async () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <Wrapper>
        <Title>
          <div></div>
          <div>
            <h1>Detalhes da Ação</h1>
          </div>
          <div>
            <Button colorScheme="#FFFFFF" onClick={closeModal}>
              <img src={closeModalIcon} alt="Fechar modal" />
            </Button>
          </div>
        </Title>

        <SubTitle>
          <Separator />
          <h1>
            Qualquer alteração dos dados atuais está sujeita a aprovação do
            consultor
          </h1>
        </SubTitle>

        <Form>
          <form>
            <FormControl>
              <Box>
                <FormLabel htmlFor="problem">
                  Qual o problema ou causa que será tratado?
                </FormLabel>
                <Textarea
                  backgroundColor="#F4F2FC"
                  borderColor="#F4F2FC"
                  id="problem"
                  placeholder="Informe o problema ou causa"
                  {...register("problem", {
                    required: 'O campo "Problema/Causa" não pode ser vazio.',
                  })}
                  focusBorderColor={errors.problem ? "#E71D36" : "#7956F7"}
                  h="56px"
                  fontSize="16px"
                  defaultValue={action?.problem}
                />
                <FormLabel color="#E71D36" fontSize="13px" mt="4px">
                  {errors.problem && errors.problem.message}
                </FormLabel>
              </Box>

              <Box mt="20px">
                <FormLabel htmlFor="why_1">Porque 1</FormLabel>
                <Input
                  backgroundColor="#F4F2FC"
                  borderColor="#F4F2FC"
                  id="why_1"
                  placeholder="Informe o que será feito"
                  {...register("why_1")}
                  focusBorderColor={errors.why_1 ? "#E71D36" : "#7956F7"}
                  h="56px"
                  fontSize="16px"
                  defaultValue={action?.why_1}
                />
                <FormLabel color="#E71D36" fontSize="13px" mt="4px">
                  {errors.why_1 && errors.why_1.message}
                </FormLabel>
              </Box>

              <Box mt="20px">
                <FormLabel htmlFor="why_2">Porque 2</FormLabel>
                <Input
                  backgroundColor="#F4F2FC"
                  borderColor="#F4F2FC"
                  id="why_2"
                  placeholder="Informe o que será feito"
                  {...register("why_2")}
                  focusBorderColor={errors.why_2 ? "#E71D36" : "#7956F7"}
                  h="56px"
                  fontSize="16px"
                  defaultValue={action?.why_2}
                />
                <FormLabel color="#E71D36" fontSize="13px" mt="4px">
                  {errors.why_2 && errors.why_2.message}
                </FormLabel>
              </Box>

              <Box mt="20px">
                <FormLabel htmlFor="why_3">Porque 3</FormLabel>
                <Input
                  backgroundColor="#F4F2FC"
                  borderColor="#F4F2FC"
                  id="why_3"
                  placeholder="Informe o que será feito"
                  {...register("why_3")}
                  focusBorderColor={errors.why_3 ? "#E71D36" : "#7956F7"}
                  h="56px"
                  fontSize="16px"
                  defaultValue={action?.why_3}
                />
                <FormLabel color="#E71D36" fontSize="13px" mt="4px">
                  {errors.why_3 && errors.why_3.message}
                </FormLabel>
              </Box>

              <Box mt="20px">
                <FormLabel htmlFor="why_4">Porque 4</FormLabel>
                <Input
                  backgroundColor="#F4F2FC"
                  borderColor="#F4F2FC"
                  id="why_4"
                  placeholder="Informe o que será feito"
                  {...register("why_4")}
                  focusBorderColor={errors.why_4 ? "#E71D36" : "#7956F7"}
                  h="56px"
                  fontSize="16px"
                  defaultValue={action?.why_4}
                />
                <FormLabel color="#E71D36" fontSize="13px" mt="4px">
                  {errors.why_4 && errors.why_4.message}
                </FormLabel>
              </Box>

              <Box mt="20px">
                <FormLabel htmlFor="why_5">Porque 5</FormLabel>
                <Input
                  backgroundColor="#F4F2FC"
                  borderColor="#F4F2FC"
                  id="why_5"
                  placeholder="Informe o que será feito"
                  {...register("why_5")}
                  focusBorderColor={errors.why_5 ? "#E71D36" : "#7956F7"}
                  h="56px"
                  fontSize="16px"
                  defaultValue={action?.why_5}
                />
                <FormLabel color="#E71D36" fontSize="13px" mt="4px">
                  {errors.why_5 && errors.why_5.message}
                </FormLabel>
              </Box>

              <Box mt="20px">
                <FormLabel htmlFor="what">O que será feito? (What?)</FormLabel>
                <Input
                  backgroundColor="#F4F2FC"
                  borderColor="#F4F2FC"
                  id="what"
                  placeholder="Informe o que será feito"
                  {...register("what", {
                    required: 'O campo "What?" não pode ser vazio.',
                  })}
                  focusBorderColor={errors.what ? "#E71D36" : "#7956F7"}
                  h="56px"
                  fontSize="16px"
                  defaultValue={action?.what}
                />
                <FormLabel color="#E71D36" fontSize="13px" mt="4px">
                  {errors.what && errors.what.message}
                </FormLabel>
              </Box>

              <Box mt="20px">
                <FormLabel htmlFor="how">
                  Como irá realizar esta Ação (passo a passo)? (How?)
                </FormLabel>
                <Textarea
                  backgroundColor="#F4F2FC"
                  borderColor="#F4F2FC"
                  id="how"
                  placeholder="Informe o que será feito"
                  {...register("how", {
                    required: 'O campo "How?" não pode ser vazio.',
                  })}
                  focusBorderColor={errors.how ? "#E71D36" : "#7956F7"}
                  h="56px"
                  fontSize="16px"
                  defaultValue={action?.how}
                />
                <FormLabel color="#E71D36" fontSize="13px" mt="4px">
                  {errors.how && errors.how.message}
                </FormLabel>
              </Box>

              <Box mt="20px">
                <FormLabel htmlFor="name">
                  Responsável pela Ação (Who?)
                </FormLabel>

                <Select
                  h="56px"
                  fontSize="16px"
                  placeholder="Informe o responsável pela Ação"
                  focusBorderColor={errors.email ? "#E71D36" : "#7956F7"}
                  value={responsible}
                  {...register("who", {
                    required: 'O campo "Who?" não pode ser vazio.',
                  })}
                  onChange={(e) => {
                    const responsibleAction = e.target.value;
                    setResponsible(responsibleAction);
                  }}
                >
                  {usersCompanyConsultant[0].user.map((user: any) => (
                    <option key={user?.name + Math.random()} value={user?.name}>
                      {user?.name}
                    </option>
                  ))}
                </Select>
                <FormLabel color="#E71D36" fontSize="13px" mt="4px">
                  {errors.who && errors.who.message}
                </FormLabel>
              </Box>

              {editData ? (
                <Box mt="20px">
                  <Stack direction={["column", "row"]}>
                    <Box w="50%">
                      <FormLabel htmlFor="preview_init_date">
                        Início Previsto (When?)
                      </FormLabel>
                      <Input
                        backgroundColor="#F4F2FC"
                        borderColor="#F4F2FC"
                        id="preview_init_date"
                        type="date"
                        placeholder="00/00/0000"
                        {...register("preview_init_date", {
                          required:
                            'O campo "Início previsto" nao pode ser vazio.',
                        })}
                        focusBorderColor={
                          errors.preview_init_date ? "#E71D36" : "#7956F7"
                        }
                        h="56px"
                        defaultValue={preview_init_date}
                        onChange={handlePreviewInitDate}
                        fontSize="16px"
                      />
                      <FormLabel color="#E71D36" fontSize="13px" mt="4px">
                        {errors.preview_init_date &&
                          errors.preview_init_date.message}
                      </FormLabel>
                    </Box>

                    <Box w="50%">
                      <FormLabel htmlFor="preview_end_date">
                        Fim Previsto (When?)
                      </FormLabel>
                      <Input
                        backgroundColor="#F4F2FC"
                        borderColor="#F4F2FC"
                        id="preview_end_date"
                        type="date"
                        {...register("preview_end_date", {
                          required:
                            'O campo "Fim previsto" não pode ser vazio.',
                        })}
                        defaultValue={preview_init_date}
                        onChange={handlePreviewEndDate}
                        focusBorderColor={
                          errors.preview_end_date ? "#E71D36" : "#7956F7"
                        }
                        h="56px"
                        fontSize="16px"
                      />
                      <FormLabel color="#E71D36" fontSize="13px" mt="4px">
                        {errors.preview_end_date &&
                          errors.preview_end_date.message}
                      </FormLabel>
                    </Box>
                  </Stack>

                  <AttentionMessage>
                    {preview_end_date && preview_init_date
                      ? preview_end_date < preview_init_date
                        ? "Atenção a data de fim previsto, deve ser maior que a data de ínicio."
                        : ""
                      : ""}
                  </AttentionMessage>
                </Box>
              ) : (
                <Box mt="20px">
                  <Stack direction={["column", "row"]}>
                    <Box w="50%">
                      <FormLabel htmlFor="preview_init_date">
                        Início Previsto (When?)
                      </FormLabel>
                      <Input
                        backgroundColor="#F4F2FC"
                        borderColor="#F4F2FC"
                        id="preview_init_date"
                        focusBorderColor={
                          errors.preview_init_date ? "#E71D36" : "#7956F7"
                        }
                        h="56px"
                        value={action?.preview_init_date}
                        color="black"
                        fontSize="16px"
                        disabled
                      />
                      <FormLabel color="#E71D36" fontSize="13px" mt="4px">
                        {errors.preview_init_date &&
                          errors.preview_init_date.message}
                      </FormLabel>
                    </Box>

                    <Box w="50%">
                      <FormLabel htmlFor="preview_end_date">
                        Fim Previsto (When?)
                      </FormLabel>
                      <Input
                        backgroundColor="#F4F2FC"
                        borderColor="#F4F2FC"
                        id="preview_end_date"
                        h="56px"
                        color="black"
                        focusBorderColor={
                          errors.preview_end_date ? "#E71D36" : "#7956F7"
                        }
                        value={action?.preview_end_date}
                        fontSize="16px"
                        disabled
                      />
                      <FormLabel color="#E71D36" fontSize="13px" mt="4px">
                        {errors.preview_end_date &&
                          errors.preview_end_date.message}
                      </FormLabel>
                    </Box>
                  </Stack>

                  <AttentionMessage>
                    {preview_end_date && preview_init_date
                      ? preview_init_date > preview_end_date
                        ? "Atenção a data de fim previsto, deve ser maior que a data de ínicio."
                        : ""
                      : ""}
                  </AttentionMessage>
                </Box>
              )}

              <Button
                color="#7956F7"
                variant="link"
                marginBottom="10px"
                onClick={() => {
                  setEditData(!editData);
                }}
              >
                {editData ? "Cancelar" : "Editar datas previstas"}
              </Button>

              <Box mt="20px">
                <Stack direction={["column", "row"]}>
                  <Box w="50%">
                    <FormLabel htmlFor="init_date">
                      Início real (When?)
                    </FormLabel>
                    <Input
                      backgroundColor="#F4F2FC"
                      borderColor="#F4F2FC"
                      id="init_date"
                      placeholder="00/00/0000"
                      focusBorderColor={
                        errors.init_date ? "#E71D36" : "#7956F7"
                      }
                      h="56px"
                      value={action?.init_date}
                      fontSize="16px"
                      color="black"
                      isDisabled
                    />
                  </Box>

                  <Box w="50%">
                    <FormLabel htmlFor="end_date">Fim real (When?)</FormLabel>
                    <Input
                      backgroundColor="#F4F2FC"
                      borderColor="#F4F2FC"
                      id="preview_end_date"
                      placeholder="00/00/0000"
                      focusBorderColor={errors.end_date ? "#E71D36" : "#7956F7"}
                      h="56px"
                      value={action?.end_date}
                      fontSize="16px"
                      color="black"
                      isDisabled
                    />
                  </Box>
                </Stack>
              </Box>

              <Box mt="20px">
                <FormLabel htmlFor="observation">Observações</FormLabel>
                <Input
                  backgroundColor="#F4F2FC"
                  borderColor="#F4F2FC"
                  id="observation"
                  placeholder="Informe observações relevantes para execução do projeto"
                  {...register("observation")}
                  focusBorderColor={errors.observation ? "#E71D36" : "#7956F7"}
                  h="56px"
                  fontSize="16px"
                  defaultValue={action?.observation}
                />
                <FormLabel color="#E71D36" fontSize="13px" mt="4px">
                  {errors.observation && errors.observation.message}
                </FormLabel>
              </Box>
            </FormControl>

            <Footer>
              <Margin>
                {action?.end_date && action?.init_date ? (
                  <Toggle>
                    <span>Ação finalizada</span>
                  </Toggle>
                ) : (
                  <Toggle>
                    <Switch
                      colorScheme="purple"
                      size="md"
                      isChecked={isChecked}
                      onChange={handleToggle}
                    />
                    {!isChecked ? (
                      <>
                        <span>Ação desativada</span>
                      </>
                    ) : (
                      <>
                        <span>Ação ativada</span>
                      </>
                    )}
                  </Toggle>
                )}
              </Margin>

              <ButtonDefault
                backgroundColor={"#7956F7"}
                width={"35%"}
                height={"50px"}
                loadingText={"Salvar alterações"}
                loading={isSubmitting}
                disabled={action?.status === 3 ? true : false}
                title={"Salvar alterações"}
                onClick={handleSaveDetails}
              />
            </Footer>
          </form>
        </Form>
      </Wrapper>
    </>
  );
}
