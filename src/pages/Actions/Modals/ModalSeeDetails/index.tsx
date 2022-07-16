/* eslint-disable react-hooks/exhaustive-deps */
import { Footer, Form, Separator, SubTitle, Title, Wrapper, Toggle, Margin, ContainerButtons } from "./styles";
import {
    FormLabel,
    FormControl,
    Input,
    Stack,
    Box,
    Button,
    Textarea,
    Switch
} from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import closeModalIcon from "../../../../assets/icon-close.svg";
import IActions from "../../../../interfaces/actions";
import { useAuth } from "../../../../hooks/auth";
import { Api } from "../../../../services/api";
import { AxiosResponse } from "axios";
import { Notify, NotifyTypes } from "../../../../components/Notify";
import { ROUTES } from "../../../../constants/routes";
import { useNavigate } from "react-router-dom";
import { ButtonDefault } from "../../../../components/FormChakra/Button";
import { useEffect, useState } from "react";


type ModalSeeDetailsProps = {
    click: any;
    action: IActions | undefined;
}

export function ModalSeeDetails({ click, action }: ModalSeeDetailsProps) {
    const { user } = useAuth();
    const navigate = useNavigate()
    const [isActiveAction, setIsActiveAction] = useState<boolean>(false);

    function IsActiveAction() {
        if (action?.is_active === 1) {
            setIsActiveAction(true);
        } else {
            setIsActiveAction(false);
        }
    }

    useEffect(() => {
        IsActiveAction()
    }, []);

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

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
        preview_init_date,
        preview_end_date,
        observation,
        init_date,
        end_date
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
            preview_init_date,
            preview_end_date,
            init_date,
            end_date,
            observation,
            user_id: user.id,
            customer_id: user.user_type_id,
            where: "O",
            status: action?.status,
            is_active: user.is_active
        })
            .then((res: AxiosResponse) => {
                Notify(NotifyTypes.SUCCESS, 'Plano de ação editado com sucesso!')
                navigate(ROUTES.ACTIONS)
            })
            .catch((err: AxiosResponse) => {
                Notify(NotifyTypes.ERROR, 'Não foi possível editar o Plano de ação.')
            });
    }

    return (
        <>
            <Wrapper>
                <Title>
                    <div></div>
                    <div>
                        <h1>Detalhes da ação</h1>
                    </div>
                    <div>
                        <Button colorScheme='#FFFFFF' onClick={click}>
                            <img src={closeModalIcon} alt="Fechar modal" />
                        </Button>
                    </div>

                </Title>

                <SubTitle>
                    <Separator />
                    <h1>
                        Qualquer alteração dos dados atuais está sujeita a aprovação do consultor
                    </h1>
                </SubTitle>

                <Form>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <FormControl>
                            <Box>
                                <FormLabel htmlFor='problem'>Qual o problema ou causa que será tratado?</FormLabel>
                                <Textarea
                                    backgroundColor="#F4F2FC"
                                    borderColor="#F4F2FC"
                                    id='problem'
                                    placeholder='Informe o problema ou causa'
                                    {...register('problem', {
                                        required: 'O campo "Problema/Causa" não pode ser vazio.',
                                    })}
                                    focusBorderColor={errors.problem ? "#E71D36" : "#7956F7"}
                                    h="56px"
                                    fontSize="16px"
                                    defaultValue={action?.problem}
                                />
                                <FormLabel
                                    color="#E71D36"
                                    fontSize="13px"
                                    mt="4px"
                                >
                                    {errors.problem && errors.problem.message}
                                </FormLabel>
                            </Box>

                            <Box mt="20px">
                                <FormLabel htmlFor='why_1'>Porque 1</FormLabel>
                                <Input
                                    backgroundColor="#F4F2FC"
                                    borderColor="#F4F2FC"
                                    id='why_1'
                                    placeholder='Informe o que será feito'
                                    {...register('why_1')}
                                    focusBorderColor={errors.why_1 ? "#E71D36" : "#7956F7"}
                                    h="56px"
                                    fontSize="16px"
                                    defaultValue={action?.why_1}
                                />
                                <FormLabel
                                    color="#E71D36"
                                    fontSize="13px"
                                    mt="4px"
                                >
                                    {errors.why_1 && errors.why_1.message}
                                </FormLabel>
                            </Box>

                            <Box mt="20px">
                                <FormLabel htmlFor='why_2'>Porque 2</FormLabel>
                                <Input
                                    backgroundColor="#F4F2FC"
                                    borderColor="#F4F2FC"
                                    id='why_2'
                                    placeholder='Informe o que será feito'
                                    {...register('why_2')}
                                    focusBorderColor={errors.why_2 ? "#E71D36" : "#7956F7"}
                                    h="56px"
                                    fontSize="16px"
                                    defaultValue={action?.why_2}
                                />
                                <FormLabel
                                    color="#E71D36"
                                    fontSize="13px"
                                    mt="4px"
                                >
                                    {errors.why_2 && errors.why_2.message}
                                </FormLabel>
                            </Box>

                            <Box mt="20px">
                                <FormLabel htmlFor='why_3'>Porque 3</FormLabel>
                                <Input
                                    backgroundColor="#F4F2FC"
                                    borderColor="#F4F2FC"
                                    id='why_3'
                                    placeholder='Informe o que será feito'
                                    {...register('why_3')}
                                    focusBorderColor={errors.why_3 ? "#E71D36" : "#7956F7"}
                                    h="56px"
                                    fontSize="16px"
                                    defaultValue={action?.why_3}
                                />
                                <FormLabel
                                    color="#E71D36"
                                    fontSize="13px"
                                    mt="4px"
                                >
                                    {errors.why_3 && errors.why_3.message}
                                </FormLabel>
                            </Box>

                            <Box mt="20px">
                                <FormLabel htmlFor='why_4'>Porque 4</FormLabel>
                                <Input
                                    backgroundColor="#F4F2FC"
                                    borderColor="#F4F2FC"
                                    id='why_4'
                                    placeholder='Informe o que será feito'
                                    {...register('why_4')}
                                    focusBorderColor={errors.why_4 ? "#E71D36" : "#7956F7"}
                                    h="56px"
                                    fontSize="16px"
                                    defaultValue={action?.why_4}
                                />
                                <FormLabel
                                    color="#E71D36"
                                    fontSize="13px"
                                    mt="4px"
                                >
                                    {errors.why_4 && errors.why_4.message}
                                </FormLabel>
                            </Box>

                            <Box mt="20px">
                                <FormLabel htmlFor='why_5'>Porque 5</FormLabel>
                                <Input
                                    backgroundColor="#F4F2FC"
                                    borderColor="#F4F2FC"
                                    id='why_5'
                                    placeholder='Informe o que será feito'
                                    {...register('why_5')}
                                    focusBorderColor={errors.why_5 ? "#E71D36" : "#7956F7"}
                                    h="56px"
                                    fontSize="16px"
                                    defaultValue={action?.why_5}
                                />
                                <FormLabel
                                    color="#E71D36"
                                    fontSize="13px"
                                    mt="4px"
                                >
                                    {errors.why_5 && errors.why_5.message}
                                </FormLabel>
                            </Box>

                            <Box mt="20px">
                                <FormLabel htmlFor='what'>O que será feito? (What?)</FormLabel>
                                <Input
                                    backgroundColor="#F4F2FC"
                                    borderColor="#F4F2FC"
                                    id='what'
                                    placeholder='Informe o que será feito'
                                    {...register('what', {
                                        required: 'O campo "What?" não pode ser vazio.',
                                    })}
                                    focusBorderColor={errors.what ? "#E71D36" : "#7956F7"}
                                    h="56px"
                                    fontSize="16px"
                                    defaultValue={action?.what}
                                />
                                <FormLabel
                                    color="#E71D36"
                                    fontSize="13px"
                                    mt="4px"
                                >
                                    {errors.what && errors.what.message}
                                </FormLabel>
                            </Box>

                            <Box mt="20px">
                                <FormLabel htmlFor='how'>Como irá realizar esta ação (passo a passo)? (How?)</FormLabel>
                                <Input
                                    backgroundColor="#F4F2FC"
                                    borderColor="#F4F2FC"
                                    id='how'
                                    placeholder='Informe o que será feito'
                                    {...register('how', {
                                        required: 'O campo "How?" não pode ser vazio.',
                                    })}
                                    focusBorderColor={errors.how ? "#E71D36" : "#7956F7"}
                                    h="56px"
                                    fontSize="16px"
                                    defaultValue={action?.how}
                                />
                                <FormLabel
                                    color="#E71D36"
                                    fontSize="13px"
                                    mt="4px"
                                >
                                    {errors.how && errors.how.message}
                                </FormLabel>
                            </Box>

                            <Box mt="20px">
                                <FormLabel htmlFor='name'>Responsável pela ação (Who?)</FormLabel>
                                <Input
                                    backgroundColor="#F4F2FC"
                                    borderColor="#F4F2FC"
                                    id='who'
                                    placeholder='Informe o que será feito'
                                    {...register('who', {
                                        required: 'O campo "Who?" não pode ser vazio.',
                                    })}
                                    focusBorderColor={errors.who ? "#E71D36" : "#7956F7"}
                                    h="56px"
                                    fontSize="16px"
                                    defaultValue={action?.who}
                                />
                                <FormLabel
                                    color="#E71D36"
                                    fontSize="13px"
                                    mt="4px"
                                >
                                    {errors.who && errors.who.message}
                                </FormLabel>
                            </Box>

                            <Box mt="20px">
                                <Stack direction={['column', 'row']}>
                                    <Box w="50%">
                                        <FormLabel htmlFor='preview_init_date'>Início Previsto (When?)</FormLabel>
                                        <Input
                                            backgroundColor="#F4F2FC"
                                            borderColor="#F4F2FC"
                                            id='preview_init_date'
                                            placeholder='00/00/0000'
                                            {...register('preview_init_date', {
                                                required: 'O campo "Início previsto" nao pode ser vazio.',
                                                pattern: {
                                                    value: /^\d{2}\/\d{2}\/\d{4}$/,
                                                    message: "A data precisa ser no formato DD/MM/AAAA."
                                                }
                                            })}
                                            focusBorderColor={errors.preview_init_date ? "#E71D36" : "#7956F7"}
                                            h="56px"
                                            defaultValue={action?.preview_init_date}
                                            fontSize="16px"
                                        />
                                        <FormLabel
                                            color="#E71D36"
                                            fontSize="13px"
                                            mt="4px"
                                        >
                                            {errors.preview_init_date && errors.preview_init_date.message}
                                        </FormLabel>
                                    </Box>

                                    <Box w="50%">
                                        <FormLabel htmlFor='preview_end_date'>Fim Previsto (When?)</FormLabel>
                                        <Input
                                            backgroundColor="#F4F2FC"
                                            borderColor="#F4F2FC"
                                            id='preview_end_date'
                                            placeholder='00/00/0000'
                                            {...register('preview_end_date', {
                                                required: 'O campo "Fim previsto" não pode ser vazio.',
                                                pattern: {
                                                    value: /^\d{2}\/\d{2}\/\d{4}$/,
                                                    message: "A data precisa ser no formato DD/MM/AAAA."
                                                }
                                            })}
                                            focusBorderColor={errors.preview_end_date ? "#E71D36" : "#7956F7"}
                                            h="56px"
                                            defaultValue={action?.preview_end_date}
                                            fontSize="16px"
                                        />
                                        <FormLabel
                                            color="#E71D36"
                                            fontSize="13px"
                                            mt="4px"
                                        >
                                            {errors.preview_end_date && errors.preview_end_date.message}
                                        </FormLabel>
                                    </Box>
                                </Stack>
                            </Box>

                            <Box mt="20px">
                                <Stack direction={['column', 'row']}>
                                    <Box w="50%">
                                        <FormLabel htmlFor='init_date'>Início real (When?)</FormLabel>
                                        <Input
                                            backgroundColor="#F4F2FC"
                                            borderColor="#F4F2FC"
                                            id='init_date'
                                            placeholder='00/00/0000'
                                            {...register('init_date')}
                                            focusBorderColor={errors.init_date ? "#E71D36" : "#7956F7"}
                                            h="56px"
                                            defaultValue={action?.init_date}
                                            fontSize="16px"
                                            color="black"
                                            isDisabled
                                        />
                                        <FormLabel
                                            color="#E71D36"
                                            fontSize="13px"
                                            mt="4px"
                                        >
                                            {errors.init_date && errors.init_date.message}
                                        </FormLabel>
                                    </Box>

                                    <Box w="50%">
                                        <FormLabel htmlFor='end_date'>Fim real (When?)</FormLabel>
                                        <Input
                                            backgroundColor="#F4F2FC"
                                            borderColor="#F4F2FC"
                                            id='preview_end_date'
                                            placeholder='00/00/0000'
                                            {...register('end_date')}
                                            focusBorderColor={errors.end_date ? "#E71D36" : "#7956F7"}
                                            h="56px"
                                            defaultValue={action?.end_date}
                                            fontSize="16px"
                                            isDisabled
                                            color="black"
                                        />
                                        <FormLabel
                                            color="#E71D36"
                                            fontSize="13px"
                                            mt="4px"
                                        >
                                            {errors.end_date && errors.end_date.message}
                                        </FormLabel>
                                    </Box>
                                </Stack>
                            </Box>

                            <Box mt="20px">
                                <FormLabel htmlFor='observation'>Observações</FormLabel>
                                <Input
                                    backgroundColor="#F4F2FC"
                                    borderColor="#F4F2FC"
                                    id='observation'
                                    placeholder='Informe observações relevantes para execução do projeto'
                                    {...register('observation')}
                                    focusBorderColor={errors.observation ? "#E71D36" : "#7956F7"}
                                    h="56px"
                                    fontSize="16px"
                                    defaultValue={action?.observation}
                                />
                                <FormLabel
                                    color="#E71D36"
                                    fontSize="13px"
                                    mt="4px"
                                >
                                    {errors.observation && errors.observation.message}
                                </FormLabel>
                            </Box>
                        </FormControl>

                        <Footer>
                            <Margin>
                                <Toggle>
                                    <Switch
                                        colorScheme='purple'
                                        size='md'
                                        isChecked={isActiveAction}
                                    />
                                    {
                                        action?.is_active === 0 ?
                                            <>
                                                <span>Ação desativada</span>
                                            </>

                                            : <>
                                                <span>Ação ativada</span>
                                            </>
                                    }

                                </Toggle>
                            </Margin>

                            <ContainerButtons>
                                <ButtonDefault
                                    onClick={() => navigate(-1)}
                                    backgroundColor={'#E71D36'}
                                    width={'35%'}
                                    height={'50px'}
                                    title={'Recusar alteração'}
                                />
                                <ButtonDefault
                                    backgroundColor={'#7956F7'}
                                    width={'35%'}
                                    height={'50px'}
                                    loadingText={'Aprovar alteração'}
                                    loading={isSubmitting}
                                    title={'Aprovar alteração'}
                                    type="submit"
                                />
                            </ContainerButtons>
                        </Footer>
                    </form>

                </Form>
            </Wrapper>
        </>
    )
}