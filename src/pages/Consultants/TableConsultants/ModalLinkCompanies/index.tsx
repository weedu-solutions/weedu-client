import { Box, FormLabel, Select } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonDefault } from "../../../../components/FormChakra/Button";
import { Notify, NotifyTypes } from "../../../../components/Notify";
import { ROUTES } from "../../../../constants/routes";
import { Api } from "../../../../services/api";
import { CustomerServices } from "../../../../services/customer";


import { BodyModal, ContainerButtons, ContainerSelect } from "./styles";


interface IModal {
    isActive: any;
    consultantInfo: any;
    LinkCompanies?: any;
}


export function ModalLinkCompanies({ isActive, consultantInfo, LinkCompanies }: IModal) {

    const [link_Company, setLinkCompany] = useState('');

    const navigate = useNavigate();

    const [companies, setCompanies] = useState([]);

    console.log(link_Company);

    const getData = async () => {
        const { data } = await CustomerServices.getAllCustomers()
        setCompanies(data);
    }

    useEffect(() => {
        getData();
    }, [setCompanies])

    const onSubmit = async () => {
        await Api.post(`/auth/user/${consultantInfo.id}`, {
            name: consultantInfo.name,
            suname: consultantInfo.suname,
            email: consultantInfo.email,
            is_active: consultantInfo.is_active,
            user_type_id: consultantInfo.user_type_id,
            password: "de",
            id: consultantInfo.id,
            customer_id: link_Company
        })
            .then((res: AxiosResponse) => {
                Notify(NotifyTypes.SUCCESS, 'Dados editados com sucesso!')
                navigate(ROUTES.CONSULTANTS)
            })
            .catch((err: AxiosResponse) => {
                Notify(NotifyTypes.ERROR, 'Não foi possível editar os dados.')
            });
    }

    return (
        <BodyModal>
            <h1>
                Vincular empresas para {consultantInfo.name}
            </h1>
            <h2>
                Selecione as empresa que deseja vincular
            </h2>
            <h2>
                a este colaborador
            </h2>

            <ContainerSelect>
                <Box mt="20px">
                    <FormLabel htmlFor='name'>Empresa a vincular</FormLabel>
                    {

                        <Select
                            h="56px"
                            w="100%"
                            fontSize="16px"
                            placeholder='Selecionar'
                            // focusBorderColor={errors.email ? "#E71D36" : "#7956F7"}
                            // value={responsible}
                            // {...register('who', {
                            //     required: 'O campo "Who?" não pode ser vazio.',
                            // })}
                            onChange={(e) => {
                                const linkCompany = e.target.value;
                                setLinkCompany(linkCompany);
                            }
                            }
                        >
                            {
                                companies?.map((companie: any) =>
                                    <option
                                        key={companie.id}
                                        value={companie.company_name}
                                    >
                                        {companie.company_name}
                                    </option>
                                )
                            }
                        </Select>

                    }

                    <FormLabel
                        color="#E71D36"
                        fontSize="13px"
                        mt="4px"
                    >
                        {/* {errors.who && errors.who.message} */}
                    </FormLabel>
                </Box>
            </ContainerSelect>

            <ContainerButtons>
                <ButtonDefault
                    backgroundColor={'#7956F7'}
                    width={'100%'}
                    height={'50px'}
                    loadingText={'Vincular'}
                    title={'Vincular'}
                    onClick={() => onSubmit()}
                    type="submit"
                />
                <ButtonDefault
                    backgroundColor={'#646170'}
                    width={'100%'}
                    height={'50px'}
                    onClick={isActive}
                    title={'Cancelar'}
                />
            </ContainerButtons>

        </BodyModal>

    )
}
