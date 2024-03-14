import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonDefault } from "../../components/FormChakra/Button";
import { InputText } from "../../components/InputText";
import { LayoutRegister } from "../../components/LayoutRegister";
import { Notify, NotifyTypes } from "../../components/Notify";
import { ROUTES } from "../../constants/routes";
import { useUser } from "../../hooks/user";
import { UserServices } from "../../services/user";
import {
  ButtonWrapper,
  CustomInput,
  CustomOption,
  Label,
  Wrapper,
} from "./styled";
import { Select as SelectC } from "@chakra-ui/react";

export function UpdateUserCompany() {
  interface IDataForm {
    name: string;
    suname: string;
    email: string;
    user_type_id: string;
    password: string;
    is_active: string;
    customer_id: Array<number>;
    manager_id: number;
    id?: string;
  }

  const initialForm = {
    name: "",
    suname: "",
    email: "",
    user_type_id: "",
    password: "",
    is_active: "1",
    customer_id: [],
    manager_id: 0,
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const { userDataForm, userDataList } = useUser();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState<IDataForm>(initialForm);

  const managerOptions = userDataList.map((user) => ({
    label: user?.name,
    value: String(user?.user_type_id),
    id: user.id,
  }));

  useEffect(() => {
    setDataForm({
      name: userDataForm?.name,
      suname: userDataForm?.suname,
      email: userDataForm?.email,
      user_type_id: userDataForm?.user_type_id,
      password: userDataForm?.password,
      is_active: userDataForm?.is_active,
      customer_id: [Number(id)],
      manager_id: Number(userDataForm?.manager[0]?.id),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleUpdateUserCompany() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const { data } = await UserServices.updateUserCustomer(
      userDataForm?.id,
      dataForm
    );

    setIsLoading(true);

    if (data) {
      Notify(NotifyTypes.SUCCESS, "Dados alterados com sucesso!");
      navigate(ROUTES.CUSTOMERS);
    }
  }

  return (
    <LayoutRegister>
      <strong>Editar usuário da empresa</strong>
      <Wrapper>
        <InputText
          title="Nome"
          value={dataForm.name ?? ""}
          onChange={(event: any) =>
            setDataForm({ ...dataForm, name: String(event.target.value) })
          }
          placeholder="Digite seu nome"
          type="text"
        />

        <InputText
          title="Sobrenome"
          value={dataForm.suname ?? ""}
          onChange={(event: any) =>
            setDataForm({ ...dataForm, suname: String(event.target.value) })
          }
          placeholder="Agora seu sobrenome"
          type="text"
        />

        <InputText
          title="E-mail"
          value={dataForm.email ?? ""}
          isDisabled
          onChange={(event: any) =>
            setDataForm({ ...dataForm, email: String(event.target.value) })
          }
          placeholder="Agora digite seu e-mail"
          type="text"
        />

        {Number(userDataForm.user_type_id) !== 4 ? (
          <CustomInput>
            <Label htmlFor="">Tipo de perfil</Label>
            <SelectC
              value={userDataForm.user_type_id}
              onChange={(event) =>
                setDataForm({ ...dataForm, user_type_id: event.target.value })
              }
            >
              <CustomOption value="1">Colaborador</CustomOption>
              <CustomOption value="2">Gestor</CustomOption>
            </SelectC>
          </CustomInput>
        ) : (
          <InputText
            isDisabled
            title="Tipo de perfil"
            value="Administrador"
            type="text"
          />
        )}

        {(Number(userDataForm.user_type_id) === 1 ||
          dataForm.user_type_id === "1") && (
          <>
            <Label htmlFor="">Gestor</Label>
            <CustomInput>
              <SelectC
                style={{
                  height: "3.5rem",
                }}
                value={dataForm?.manager_id}
                onChange={(event) =>
                  setDataForm({
                    ...dataForm,
                    manager_id: Number(event.target.value),
                  })
                }
              >
                {managerOptions.map((user) => (
                  <CustomOption key={user.id} value={user.id}>
                    {user.label}
                  </CustomOption>
                ))}
              </SelectC>
            </CustomInput>
          </>
        )}

        <InputText
          title="Senha"
          value={dataForm.password ?? ""}
          onChange={(event: any) =>
            setDataForm({ ...dataForm, password: String(event.target.value) })
          }
          placeholder="Escolha uma senha"
          type="password"
        />

        <InputText isDisabled title="ID da empresa" value={id} type="text" />

        <ButtonWrapper>
          <ButtonDefault
            onClick={() => navigate(-1)}
            backgroundColor={"#646170"}
            width={"40%"}
            height={"50px"}
            title={"Cancelar"}
          />
          <ButtonDefault
            onClick={handleUpdateUserCompany}
            backgroundColor={"#7956F7"}
            width={"40%"}
            height={"50px"}
            loading={isLoading}
            loadingText={"Editar"}
            title={"Editar"}
          />
        </ButtonWrapper>
      </Wrapper>
    </LayoutRegister>
  );
}
