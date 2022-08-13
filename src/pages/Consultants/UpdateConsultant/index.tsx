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


interface IConsultant {
    name?: string;
    suname?: string;
    is_active?: number;
    manager_id?: string;
    password?: string;
    user_type_id?: string;
    email?: string;
    id?: string | number;
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
    const [profileType, setProfileType] = useState(consultant ? consultant?.user_type_id : '3');
    const [isModalBlockOpen, setIsModalBlockOpen] = useState(false);

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
            user_type_id: Number(profileType),
            password,
            id: consultant?.id,
            customer_id: [idCustumer]
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
                user_type_id: Number(profileType),
                password: '1234aaaaa',
                id: consultant?.id,
                customer_id: [idCustumer]
            })
                .then((res: AxiosResponse) => {
                    // eslint-disable-next-line no-lone-blocks
                    {
                        consultant?.is_active === 0 ?
                            Notify(NotifyTypes.SUCCESS, 'Consultor bloqueado com sucesso!')
                            :
                            Notify(NotifyTypes.SUCCESS, 'Consultor desbloqueado com sucesso!')
                    }
                    navigate(ROUTES.CONSULTANTS)
                })
                .catch((err: AxiosResponse) => {
                    // eslint-disable-next-line no-lone-blocks
                    {
                        consultant?.is_active === 0 ?
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
                                defaultValue={consultant?.name}
                                {...register('name')}
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
                                {...register('suname')}
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
                                {...register('email')}
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
                                <option value='4'>Gestor</option>
                            </Select>

                            <FormLabel
                                color="#E71D36"
                                fontSize="13px"
                                mt="4px"
                            >
                                {errors.user_type_id && errors.user_type_id.message}
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
                                backgroundColor={consultant?.is_active === 0 ? '#E71D36' : '#7956F7'}
                                width={'40%'}
                                height={'50px'}
                                title={consultant?.is_active === 1 ? 'Desbloquear' : 'Bloquear'}
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
                        <h1>Confirmação de {consultant?.is_active === 0 ? "bloqueio" : "desbloqueio"}</h1>
                    </ModalTitle>

                    <ModalSubtitle>
                        <p>
                            Tem certeza que deseja {consultant?.is_active === 0 ? "bloquear " : "desbloquear "}
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
                            title={consultant?.is_active === 0 ? 'Bloquear' : 'Desbloquear'}
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


