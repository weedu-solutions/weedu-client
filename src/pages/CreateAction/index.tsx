import { useNavigate } from "react-router-dom";
import { ButtonDefault } from "../../components/FormChakra/Button";
import { LayoutRegister } from "../../components/LayoutRegister";
import { Wrapper, ButtonWrapper } from "./styles";
import { useForm } from 'react-hook-form'
import { Api } from "../../services/api";
import { AxiosResponse } from "axios";
import { useAuth } from "../../hooks/auth";

import {
    FormLabel,
    FormControl,
    Input,
    Stack,
    Box,
} from '@chakra-ui/react'
import { Notify, NotifyTypes } from "../../components/Notify";
import { ROUTES } from "../../constants/routes";
interface IRequest {
    problem?: string;
    why_1?: string;
    why_2?: string;
    why_3?: string;
    why_4?: string;
    why_5?: string;
    what?: string;
    how?: string;
    who?: string;
    preview_init_date?: string;
    preview_end_date?: string;
    observation?: string;
}


export function CreateAction() {
    const { user } = useAuth();
    const navigate = useNavigate()
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
        observation
    }: IRequest) => {
        await Api.post('/api/auth/plan', {
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
            user_id: user.user_type_id
        })
            .then((res: AxiosResponse) => {
                Notify(NotifyTypes.SUCCESS, 'Plano de ação criado com sucesso!')
                navigate(ROUTES.ACTIONS)
            })
            .catch((err: AxiosResponse) => {
                Notify(NotifyTypes.ERROR, 'Não foi possível criar um Plano de ação.')
            });
    }

    return (
        <LayoutRegister>
            <strong>Adicionar uma nova ação</strong>
            <Wrapper>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl>
                        <Box>
                            <FormLabel htmlFor='problem'>Qual o problema ou causa que será tratado?</FormLabel>
                            <Input
                                id='problem'
                                placeholder='Informe o problema ou causa'
                                {...register('problem', {
                                    required: 'O campo "Problema/Causa" não pode ser vazio.',
                                })}
                                focusBorderColor={errors.problem ? "#E71D36" : "#7956F7"}
                                h="56px"
                                fontSize="16px"
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
                                id='why_1'
                                placeholder='Informe o que será feito'
                                {...register('why_1', {
                                    required: 'O campo "Porque 1" não pode ser vazio.',
                                })}
                                focusBorderColor={errors.why_1 ? "#E71D36" : "#7956F7"}
                                h="56px"
                                fontSize="16px"
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
                                id='why_2'
                                placeholder='Informe o que será feito'
                                {...register('why_2')}
                                focusBorderColor={errors.why_2 ? "#E71D36" : "#7956F7"}
                                h="56px"
                                fontSize="16px"
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
                                id='why_3'
                                placeholder='Informe o que será feito'
                                {...register('why_3')}
                                focusBorderColor={errors.why_3 ? "#E71D36" : "#7956F7"}
                                h="56px"
                                fontSize="16px"
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
                                id='why_4'
                                placeholder='Informe o que será feito'
                                {...register('why_4')}
                                focusBorderColor={errors.why_4 ? "#E71D36" : "#7956F7"}
                                h="56px"
                                fontSize="16px"
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
                                id='why_5'
                                placeholder='Informe o que será feito'
                                {...register('why_5')}
                                focusBorderColor={errors.why_5 ? "#E71D36" : "#7956F7"}
                                h="56px"
                                fontSize="16px"
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
                                id='what'
                                placeholder='Informe o que será feito'
                                {...register('what', {
                                    required: 'O campo "What?" não pode ser vazio.',
                                })}
                                focusBorderColor={errors.what ? "#E71D36" : "#7956F7"}
                                h="56px"
                                fontSize="16px"
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
                                id='how'
                                placeholder='Informe o que será feito'
                                {...register('how', {
                                    required: 'O campo "How?" não pode ser vazio.',
                                })}
                                focusBorderColor={errors.how ? "#E71D36" : "#7956F7"}
                                h="56px"
                                fontSize="16px"
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
                                id='who'
                                placeholder='Informe o que será feito'
                                {...register('who', {
                                    required: 'O campo "Who?" não pode ser vazio.',
                                })}
                                focusBorderColor={errors.who ? "#E71D36" : "#7956F7"}
                                h="56px"
                                fontSize="16px"
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
                                        id='preview_init_date'
                                        placeholder='00/00/0000'
                                        {...register('preview_init_date', {
                                            required: 'O campo "Início previsto" nao pode ser vazio.',
                                        })}
                                        focusBorderColor={errors.preview_init_date ? "#E71D36" : "#7956F7"}
                                        h="56px"

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
                                        id='preview_end_date'
                                        placeholder='00/00/0000'
                                        {...register('preview_end_date', {
                                            required: 'O campo "Fim previsto" não pode ser vazio.'
                                        })}
                                        focusBorderColor={errors.preview_end_date ? "#E71D36" : "#7956F7"}
                                        h="56px"

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
                            <FormLabel htmlFor='observation'>Observações</FormLabel>
                            <Input
                                id='observation'
                                placeholder='Informe observações relevantes para execução do projeto'
                                {...register('observation', {
                                    // required: 'O campo Observações não pode ser vazio.',
                                })}
                                focusBorderColor={errors.observation ? "#E71D36" : "#7956F7"}
                                h="56px"
                                fontSize="16px"
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

                    <ButtonWrapper>
                        <ButtonDefault
                            onClick={() => navigate(-1)}
                            backgroundColor={'#646170'}
                            width={'40%'}
                            height={'50px'}
                            title={'Cancelar'}
                        />
                        <ButtonDefault
                            backgroundColor={'#7956F7'}
                            width={'40%'}
                            height={'50px'}
                            loadingText={'Confirmar'}
                            loading={isSubmitting}
                            title={'Confirmar'}
                            type="submit"
                        />

                    </ButtonWrapper>
                </form>

            </Wrapper>
        </LayoutRegister >
    );
}


