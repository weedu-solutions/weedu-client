import { LayoutRegister } from "../../../components/LayoutRegister";
import { ButtonWrapper, Wrapper, ButtonBlock, ButtonsEdit } from "./styles";
import {
    FormLabel,
    FormControl,
    Input,
    Box,
    Button,
    InputGroup,
    InputRightElement,
    Select
} from '@chakra-ui/react'
import { ButtonDefault } from "../../../components/FormChakra/Button";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/auth";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Api } from "../../../services/api";
import { AxiosResponse } from "axios";
import { Notify, NotifyTypes } from "../../../components/Notify";
import { ROUTES } from "../../../constants/routes";
import { ConsultantsServices } from "../../../services/consultants";

interface IConsultant {
    name?: string;
    suname?: string;
    is_active?: string;
    manager_id?: string;
    password?: string;
    user_type_id?: string;
    email?: string;
}

export function UpdateConsultant() {

    const { user } = useAuth();

    const [show, setShow] = useState(false);
    const [consultant, setConsultant] = useState<IConsultant>();
    const [profileType, setProfileType] = useState(consultant ? consultant?.user_type_id : '3');

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate()
    const idCustumer = user.customer[0].id;

    const idConsultant = localStorage.getItem('idConsultant');
    const consultantSelected: any = localStorage.getItem('consultantSelected');



    function handleCancelEdit() {
        navigate(-1)

    }

    const handleClick = () => setShow(!show);

    const onSubmit = async ({
        name,
        suname,
        password,
        email
    }: IConsultant) => {
        await Api.post(`/auth/user/${idConsultant}`, {
            name,
            suname,
            email,
            is_active: consultant?.is_active,
            user_type_id: profileType,
            password: consultantSelected,
        })
            .then((res: AxiosResponse) => {
                Notify(NotifyTypes.SUCCESS, 'Consultor cadastrado com sucesso!')
                navigate(ROUTES.CONSULTANTS)
            })
            .catch((err: AxiosResponse) => {
                Notify(NotifyTypes.ERROR, 'Não foi possível cadastrar consultor.')
            });
    }

    useEffect(() => {

        const getDataConsultant = async () => {
            const { data } = await ConsultantsServices.getConsultant(idConsultant);
            setConsultant(data);
        }

        getDataConsultant()

    }, []);



    return (
        <LayoutRegister>
            <strong>Editar consultor Weedu</strong>
            <Wrapper>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl>
                        <Box>
                            <FormLabel htmlFor='name'>Nome</FormLabel>
                            <Input
                                id='name'
                                placeholder='Informe o nome'
                                {...register('name', {
                                    required: 'O campo "Nome" não pode ser vazio.',
                                })}
                                focusBorderColor={errors.name ? "#E71D36" : "#7956F7"}
                                h="56px"
                                defaultValue={consultant?.name}
                                fontSize="16px"
                            />
                            <FormLabel
                                color="#E71D36"
                                fontSize="13px"
                                mt="4px"
                            >
                                {errors.name && errors.name.message}
                            </FormLabel>
                        </Box>

                        <Box mt="20px">
                            <FormLabel htmlFor='suname'>Sobrenome</FormLabel>
                            <Input
                                id='suname'
                                placeholder='Informe o sobrenome'
                                {...register('suname', {
                                    required: 'O campo "Sobrenome" não pode ser vazio.',
                                })}
                                defaultValue={consultant?.suname}
                                focusBorderColor={errors.suname ? "#E71D36" : "#7956F7"}
                                h="56px"
                                fontSize="16px"
                            />
                            <FormLabel
                                color="#E71D36"
                                fontSize="13px"
                                mt="4px"
                                defaultValue={consultant?.suname}
                            >
                                {errors.suname && errors.suname.message}
                            </FormLabel>
                        </Box>

                        <Box mt="20px">
                            <FormLabel htmlFor='telephone'>Telefone</FormLabel>
                            <Input
                                id='telephone'
                                placeholder='Informe o telefone'
                                {...register('telephone')}
                                focusBorderColor={errors.telephone ? "#E71D36" : "#7956F7"}
                                h="56px"
                                fontSize="16px"
                            />
                            <FormLabel
                                color="#E71D36"
                                fontSize="13px"
                                mt="4px"
                            >
                                {errors.telephone && errors.telephone.message}
                            </FormLabel>
                        </Box>

                        <Box mt="20px">
                            <FormLabel htmlFor='email'>Email</FormLabel>
                            <Input
                                id='email'
                                placeholder='Informe o email'
                                {...register('email', {
                                    required: 'O campo "Email" não pode ser vazio.',
                                })}
                                defaultValue={consultant?.email}
                                focusBorderColor={errors.email ? "#E71D36" : "#7956F7"}
                                h="56px"
                                fontSize="16px"
                            />
                            <FormLabel
                                color="#E71D36"
                                fontSize="13px"
                                mt="4px"
                            >
                                {errors.email && errors.email.message}
                            </FormLabel>
                        </Box>

                        <Box mt="20px">
                            <FormLabel htmlFor='password'>Tipo de perfil</FormLabel>
                            <Select
                                {...register('password')}
                                h="56px"
                                fontSize="16px"
                                focusBorderColor={errors.email ? "#E71D36" : "#7956F7"}
                                value={profileType}
                                onChange={(e) => {
                                    const valueProfileType = e.target.value;
                                    setProfileType(valueProfileType);
                                }
                                }
                            >
                                <option value='3'>Consultor</option>
                                <option value='4'>Gestor</option>
                            </Select>

                            <FormLabel
                                color="#E71D36"
                                fontSize="13px"
                                mt="4px"
                            >
                                {errors.password && errors.password.message}
                            </FormLabel>
                        </Box>

                        <Box mt="20px">
                            <FormLabel htmlFor='password'>Senha</FormLabel>
                            <InputGroup justifyContent="center">
                                <Input
                                    id='password'
                                    placeholder='Informe a senha'
                                    {...register('password')}
                                    defaultValue={consultantSelected?.password}
                                    focusBorderColor={errors.password ? "#E71D36" : "#7956F7"}
                                    h="56px"
                                    fontSize="16px"
                                    type={show ? 'text' : 'password'}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormLabel
                                color="#E71D36"
                                fontSize="13px"
                                mt="4px"
                            >
                                {errors.password && errors.password.message}
                            </FormLabel>
                        </Box>

                    </FormControl>

                    <ButtonWrapper>
                        <ButtonBlock>
                            <ButtonDefault
                                backgroundColor={'#E71D36'}
                                width={'40%'}
                                height={'50px'}
                                loadingText={'Bloquear'}
                                title={'Bloquear'}
                                type="submit"
                            />
                        </ButtonBlock>

                        <ButtonsEdit>
                            <ButtonDefault
                                onClick={() => handleCancelEdit()}
                                backgroundColor={'#646170'}
                                width={'49%'}
                                height={'50px'}
                                title={'Cancelar'}
                            />
                            <ButtonDefault
                                backgroundColor={'#7956F7'}
                                width={'49%'}
                                height={'50px'}
                                loadingText={'Confirmar'}
                                title={'Confirmar'}
                                type="submit"
                            />
                        </ButtonsEdit>
                    </ButtonWrapper>
                </form>
            </Wrapper>
        </LayoutRegister>
    );
}


