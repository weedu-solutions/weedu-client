import { LayoutRegister } from "../../../components/LayoutRegister";
import { ButtonWrapper, Wrapper } from "./styles";
import {
    FormLabel,
    FormControl,
    Input,
    Box,
    Button,
    InputGroup,
    InputRightElement
} from '@chakra-ui/react'
import { ButtonDefault } from "../../../components/FormChakra/Button";
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import { Notify, NotifyTypes } from "../../../components/Notify";
import { ROUTES } from "../../../constants/routes";
import { AxiosError, AxiosResponse } from "axios";
import { useAuth } from "../../../hooks/auth";
import { Api } from "../../../services/api";
import React from "react";

interface ICreateConsultant {
    name?: string;
    suname?: string;
    is_active?: string;
    manager_id?: string;
    password?: string;
    user_type_id?: string;
    email?: string;
    phone?: number | string;
}

export function CreateConsultant() {
    const { user } = useAuth();
    const navigate = useNavigate()
    const idCustumer = user.customer[0].id;
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const onSubmit = async ({
        name,
        suname,
        password,
        email,
        phone
    }: ICreateConsultant) => {
        await Api.post('/auth/user', {
            name,
            suname,
            is_active: Number(1),
            customer_id: [idCustumer],
            password,
            phone,
            user_type_id: 3,
            email
        })
            .then((res: AxiosResponse) => {
                Notify(NotifyTypes.SUCCESS, 'Consultor cadastrado com sucesso!')
                navigate(ROUTES.CONSULTANTS)
            })
            .catch((err: AxiosError) => {
                if (err.response?.status === 422) {
                    Notify(NotifyTypes.ERROR, 'Número máximo de funcionários excedido.')
                } else {
                    Notify(NotifyTypes.ERROR, 'Não foi possível cadastrar consultor.')
                }
            });
    }

    return (
        <LayoutRegister>
            <strong>Cadastrar consultores Weedu</strong>
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
                                focusBorderColor={errors.suname ? "#E71D36" : "#7956F7"}
                                h="56px"
                                fontSize="16px"
                            />
                            <FormLabel
                                color="#E71D36"
                                fontSize="13px"
                                mt="4px"
                            >
                                {errors.suname && errors.suname.message}
                            </FormLabel>
                        </Box>

                        <Box mt="20px">
                            <FormLabel htmlFor='phone'>Telefone</FormLabel>
                            <Input
                                id='phone'
                                placeholder='Informe o telefone'
                                {...register('phone')}
                                focusBorderColor={errors.phone ? "#E71D36" : "#7956F7"}
                                h="56px"
                                fontSize="16px"
                            />
                            <FormLabel
                                color="#E71D36"
                                fontSize="13px"
                                mt="4px"
                            >
                                {errors.phone && errors.phone.message}
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
                            <FormLabel htmlFor='password'>Senha</FormLabel>
                            <InputGroup justifyContent="center">
                                <Input
                                    id='password'
                                    placeholder='Informe a senha'
                                    {...register('password')}
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
                            title={'Confirmar'}
                            type="submit"
                        />
                    </ButtonWrapper>
                </form>
            </Wrapper>
        </LayoutRegister >
    );
}


