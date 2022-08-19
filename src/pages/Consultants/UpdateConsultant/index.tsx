import { LayoutRegister } from "../../../components/LayoutRegister";
import { ButtonWrapper, Wrapper, ButtonBlock, ButtonsEdit, ModalBody, ModalTitle, ButtonsContainer, ModalSubtitle } from "./styles";
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
import Modal from 'react-modal'
import { useFetch } from "../../../hooks/useFetch";


interface IConsultant {
    name?: string;
    suname?: string;
    is_active?: number;
    manager_id?: string;
    password?: string;
    user_type_id?: string;
    email?: string;
    id?: string | number;
    phone?: any;
}

const customStyleModalBlock = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.50)'
    },
    content: {
        maxWidth: '400px',
        height: '300px',
        margin: 'auto',
    }
}

export function UpdateConsultant() {

    const { user } = useAuth();

    const [show, setShow] = useState(false);
    const [consultant, setConsultant] = useState<IConsultant>();
    const [companies, setCompanies] = useState<IConsultant>();

    const [profileType, setProfileType] = useState(consultant ? consultant?.user_type_id : Number(3));
    const [isModalBlockOpen, setIsModalBlockOpen] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate()

    const idConsultant = localStorage.getItem('idConsultant');

    function handleCancelEdit() {
        navigate(-1)
    }


    const onSubmit = async ({
        name,
        suname,
        email,
        phone
    }: IConsultant) => {
        await Api.post(`/auth/user/${idConsultant}`, {
            name,
            suname,
            email,
            is_active: consultant?.is_active,
            user_type_id: Number(profileType),
            phone,
            id: consultant?.id,
            customer_id: companies
        })
            .then((res: AxiosResponse) => {
                Notify(NotifyTypes.SUCCESS, 'Dados editados com sucesso!')
                navigate(ROUTES.CONSULTANTS)
            })
            .catch((err: AxiosResponse) => {
                Notify(NotifyTypes.ERROR, 'Não foi possível editar os dados.')
            });
    }


    // 0 - Bloqueado
    // 1 - Desbloqueado
    function blockAndUnBlockCunsulant() {
        if (consultant?.is_active === 1) {
            return Number(0);
        } else {
            return Number(1);
        }
    }


    const handleBlockConsultant = async () => {
        if (consultant) {
            await Api.post(`/auth/user/${idConsultant}`, {
                name: consultant?.name,
                suname: consultant?.suname,
                email: consultant?.email,
                is_active: blockAndUnBlockCunsulant(),
                user_type_id: consultant.user_type_id,
                id: consultant?.id,
                phone: consultant?.phone,
                customer_id: companies
            })
                .then((res: AxiosResponse) => {
                    // eslint-disable-next-line no-lone-blocks
                    {
                        consultant?.is_active === 1 ?
                            Notify(NotifyTypes.SUCCESS, 'Consultor bloqueado com sucesso!')
                            :
                            Notify(NotifyTypes.SUCCESS, 'Consultor desbloqueado com sucesso!')
                    }
                    navigate(ROUTES.CONSULTANTS)
                })
                .catch((err: AxiosResponse) => {
                    // eslint-disable-next-line no-lone-blocks
                    {
                        consultant?.is_active === 1 ?
                            Notify(NotifyTypes.ERROR, 'Não foi possível bloquear o consultor.')
                            :
                            Notify(NotifyTypes.ERROR, 'Não foi possível desbloquear o consultor.')
                    }

                });
        } else {
            Notify(NotifyTypes.ERROR, 'Erro interno no servidor.')
        }
    }

    useEffect(() => {

        const getDataConsultant = async () => {
            const { data } = await ConsultantsServices.getConsultant(idConsultant);
            setConsultant(data);

            const filterIdCompanies = data.customer.map((business: any) => {
                return business.id
            });

            setCompanies(filterIdCompanies)

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
                                fontSize="16px"
                                defaultValue={consultant?.name}

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
                            <FormLabel htmlFor='phone'>Telefone</FormLabel>
                            <Input
                                id='phone'
                                placeholder='Informe o telefone'
                                {...register('phone')}
                                defaultValue={consultant?.phone}
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
                            <FormLabel htmlFor='user_type_id'>Tipo de perfil</FormLabel>
                            <Select
                                {...register('user_type_id')}
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
                                <option value='2'>Gestor</option>
                            </Select>

                            <FormLabel
                                color="#E71D36"
                                fontSize="13px"
                                mt="4px"
                            >
                                {errors.user_type_id && errors.user_type_id.message}
                            </FormLabel>
                        </Box>

                        {/* <Box mt="20px">
                            <FormLabel htmlFor='password'>Senha</FormLabel>
                            <InputGroup justifyContent="center">
                                <Input
                                    id='password'
                                    placeholder='Informe a senha'
                                    {...register('password', {
                                        required: 'O campo "Senha" não pode ser vazio.',
                                    })}
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
                        </Box> */}

                    </FormControl>

                    <ButtonWrapper>
                        <ButtonBlock>
                            <ButtonDefault
                                backgroundColor={consultant?.is_active === 0 ? '#E71D36' : '#7956F7'}
                                width={'40%'}
                                height={'50px'}
                                title={consultant?.is_active === 0 ? 'Desbloquear' : 'Bloquear'}
                                onClick={() => setIsModalBlockOpen(true)}
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

            <Modal
                isOpen={isModalBlockOpen}
                style={customStyleModalBlock}
            >
                <ModalBody>
                    <ModalTitle>
                        <h1>Confirmação de {consultant?.is_active === 1 ? "bloqueio" : "desbloqueio"}</h1>
                    </ModalTitle>

                    <ModalSubtitle>
                        <p>
                            Tem certeza que deseja {consultant?.is_active === 1 ? "bloquear " : "desbloquear "}
                        </p>
                        <span>
                            o consultor(a) {consultant?.name} ?
                        </span>
                    </ModalSubtitle>

                    <ButtonsContainer>
                        <ButtonDefault
                            onClick={() => handleBlockConsultant()}
                            backgroundColor={consultant?.is_active === 0 ? '#E71D36' : '#7956F7'}
                            width={'100%'}
                            height={'50px'}
                            title={consultant?.is_active === 1 ? 'Bloquear' : 'Desbloquear'}
                        />
                        <ButtonDefault
                            onClick={() => setIsModalBlockOpen(false)}
                            backgroundColor={'#646170'}
                            width={'100%'}
                            height={'50px'}
                            title={'Cancelar'}
                        />
                    </ButtonsContainer>


                </ModalBody>
            </Modal>
        </LayoutRegister>
    );
}


