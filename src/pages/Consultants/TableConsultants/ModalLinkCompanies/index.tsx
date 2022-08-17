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
    linkedBusinesses?: any;
}


export function ModalLinkCompanies({ isActive, consultantInfo, linkedBusinesses }: IModal) {

    const [link_Company, setLinkCompany] = useState('');
    const [companies, setCompanies] = useState([]);

    const navigate = useNavigate();

    const linkedBusinessesIDs = linkedBusinesses.map((business: any) => {
        return business.id
    });

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
            customer_id: [...linkedBusinessesIDs, link_Company]
        })
            .then((res: AxiosResponse) => {
                Notify(NotifyTypes.SUCCESS, 'Dados editados com sucesso!')
                navigate(ROUTES.CONSULTANTS)
            })
            .catch((err: AxiosResponse) => {
                Notify(NotifyTypes.ERROR, 'Não foi possível editar os dados.')
            });
    }

    let optionsCompanies = companies;

    optionsCompanies = optionsCompanies.filter((it: any) => !linkedBusinesses.some((i2: any) => it.id === i2.id))

    const verifyLinkedCompanies = optionsCompanies.length === 0;

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

                    <Select
                        h="56px"
                        w="100%"
                        fontSize="16px"
                        placeholder='Selecionar'
                        focusBorderColor={"#7956F7"}
                        onChange={(e) => {
                            const linkCompany = e.target.value;
                            setLinkCompany(linkCompany);
                        }
                        }
                    >
                        {
                            optionsCompanies?.map((companie: any) =>
                                <option
                                    key={companie.id}
                                    value={companie.id}
                                >
                                    {companie.company_name}
                                </option>
                            )
                        }
                    </Select>

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
                    title={'Vincular'}
                    disabled={verifyLinkedCompanies === true ? true : false}
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
