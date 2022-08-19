import { useNavigate } from "react-router-dom";
import { ButtonDefault } from "../../../components/FormChakra/Button";
import { LayoutRegister } from "../../../components/LayoutRegister";
import { Wrapper, ButtonWrapper, AttentionMessage } from "./styles";
import { useForm } from 'react-hook-form'
import { Api } from "../../../services/api";
import { AxiosResponse } from "axios";
import { useAuth } from "../../../hooks/auth";
import { Notify, NotifyTypes } from "../../../components/Notify";
import { ROUTES } from "../../../constants/routes";
import IActions from "../../../interfaces/actions";
import moment from "moment";

import {
    FormLabel,
    FormControl,
    Input,
    Stack,
    Box,
    Select,
    Textarea
} from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { CustomerServices } from "../../../services/customer";


export function CreateAction() {
    const { user } = useAuth();

    const [preview_init_date, setPreview_init_date] = useState("");
    const [preview_end_date, setPreview_end_date] = useState("");
    const [responsible, setResponsible] = useState("");

    const handlePreviewInitDate = (event: any) => setPreview_init_date(event.target.value);
    const handlePreviewEndDate = (event: any) => setPreview_end_date(event.target.value);

    let chosenInitDate = moment(preview_init_date).format('DD/MM/YYYY');
    let chosenEndDate = moment(preview_end_date).format('DD/MM/YYYY');

    const infoCompanyConsultant: any = JSON.parse(localStorage.getItem('company_consultant') || '{}');
    const usersCompanyConsultant: any = JSON.parse(localStorage.getItem('users_company') || '{}');

    const filterCollaborators = usersCompanyConsultant[0].user.filter((users: any) => users.user_type_id === 1 || users.id === user.id)
    const idResponsibleAction = responsible.split(',');

    const idCustumer =
        user.user_type_id === 3 ?
            infoCompanyConsultant.id
            :
            user.customer[0].id
        ;

    const navigate = useNavigate()


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
        observation
    }: IActions) => {
        await Api.post('/auth/plan', {
            problem,
            what,
            how,
            who: user.user_type_id === 1 ? user.name : idResponsibleAction[0],
            why_1,
            why_2,
            why_3,
            why_4,
            why_5,
            preview_init_date: chosenInitDate,
            preview_end_date: chosenEndDate,
            init_date: null,
            end_date: null,
            observation,
            user_id: user.user_type_id === 1 ? user.id : idResponsibleAction[1],
            customer_id: idCustumer,
            where: "O",
            is_active: user.is_active
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
                                placeholder='Informe o porque 1'
                                {...register('why_1')}
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
                                placeholder='Informe o porque 2'
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
                                placeholder='Informe o porque 3'
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
                                placeholder='Informe o porque 4'
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
                                placeholder='Informe o porque 5'
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
                            <Textarea
                                id='how'
                                placeholder='Informe o passo a passo'
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
                            <FormLabel htmlFor='who'>Responsável pela ação (Who?)</FormLabel>
                            {
                                user.user_type_id === 1 ?
                                    <Input
                                        id='preview_init_date'
                                        {...register('who')}
                                        value={user.name}
                                        focusBorderColor={"#7956F7"}
                                        h="56px"
                                        cursor={"not-allowed"}
                                        fontSize="16px"
                                    /> :
                                    <Select
                                        h="56px"
                                        fontSize="16px"
                                        placeholder='Informe o responsável pela ação'
                                        focusBorderColor={errors.email ? "#E71D36" : "#7956F7"}
                                        value={responsible}
                                        {...register('who', {
                                            required: 'O campo "Who?" não pode ser vazio.',
                                        })}
                                        onChange={(e) => {
                                            const responsibleAction = e.target.value;
                                            setResponsible(responsibleAction);
                                        }
                                        }
                                    >

                                        {

                                            user.user_type_id === 2 ?
                                                filterCollaborators.map((user: any) =>
                                                    <option value={[user.name, user.id]}>{user.name}</option>
                                                )
                                                :
                                                usersCompanyConsultant[0].user.map((user: any) =>
                                                    <option value={user.name}>{user.name}</option>
                                                )

                                        }

                                    </Select>
                            }


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
                                        value={preview_init_date}
                                        onChange={handlePreviewInitDate}
                                        focusBorderColor={errors.preview_init_date ? "#E71D36" : "#7956F7"}
                                        h="56px"
                                        type="date"
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
                                        type="date"
                                        {...register('preview_end_date', {
                                            required: 'O campo "Fim previsto" não pode ser vazio.',
                                        })}
                                        value={preview_end_date}
                                        onChange={handlePreviewEndDate}
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

                            <AttentionMessage>
                                {
                                    preview_end_date && preview_init_date ?
                                        preview_end_date < preview_init_date ?
                                            "Atenção a data de fim previsto, deve ser maior que a data de ínicio."
                                            : ""
                                        : ""
                                }
                            </AttentionMessage>

                        </Box>

                        <Box mt="20px">
                            <FormLabel htmlFor='observation'>Observações</FormLabel>
                            <Input
                                id='observation'
                                placeholder='Informe observações relevantes para execução do projeto'
                                {...register('observation')}
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
                            disabled={preview_end_date < preview_init_date ? true : false}
                        />
                    </ButtonWrapper>
                </form>
            </Wrapper>
        </LayoutRegister >
    );
}


