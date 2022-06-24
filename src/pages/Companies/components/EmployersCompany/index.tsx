import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../../../constants/routes"
import { CustomerServices } from "../../../../services/customer"
import { colors } from "../../../../theme"
import Modal from 'react-modal'
import { Button } from "../../../../components/Button"
import { UserServices } from "../../../../services/user"
import { useUser } from '../../../../hooks/user'
import { IUserData } from "../../../../contexts/user"
import { Notify, NotifyTypes } from "../../../../components/Notify"
import { MdMoreVert } from "react-icons/md"
import {
  Box,
  ModalBlockContent,
  Wrapper,
  ButtonTooltip
} from "./styled"
import { useAuth } from "../../../../hooks/auth"

const styles = {
  rows: {
    style: {
      color: colors.primary.darker,
      fontWeight: '500',
    },
  },
  headCells: {
    style: {
      color: colors.primary.darker,
      fontWeight: '800',
    },
  }
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

export function EmployersCompany({ userRow }: any) {

  const navigate = useNavigate()
  const { setUserDataForm, setUserDataList } = useUser()
  const { user } = useAuth();

  const [userData, setUserData] = useState([])
  const [currentUser, setCurrentUser] = useState({} as any)
  const [pending, setPending] = useState<boolean>(false)
  const [isModalBlockOpen, setIsModalBlockOpen] = useState(false)
  const [isModalUnblockOpen, setIsModalUnblockOpen] = useState(false)

  function compare(a: any, b: any) {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  }

  const getUserCustomer = async () => {
    setPending(pending => !pending)
    const { data } = await CustomerServices.getAllUserCustomer(userRow.id)
    setUserData(data.data[0].user.sort(compare))
    setPending(pending => !pending)
  }

  function onEdit(user: any) {
    setCurrentUser(user)
    setUserDataForm(user)
    setGestors()
    navigate(`${ROUTES.UPDATE_USER_COMPANY}/${userRow.id}`)
  }

  function setGestors() {
    const filteredData = userData.filter((user: IUserData) => user.user_type_id === 2)
    setUserDataList(filteredData)
  }

  function onAddEmployer() {
    setGestors()
    navigate(`${ROUTES.REGISTER_USER_COMPANY}/${userRow.id}`)
  }

  function onBlock(user: any) {
    setCurrentUser(user)
    if (user.is_active === 0) {
      setIsModalUnblockOpen(oldValue => !oldValue)
      return
    }
    setIsModalBlockOpen(oldValue => !oldValue)
  }

  async function handleCloseModal() {
    setIsModalBlockOpen(false)
    setIsModalUnblockOpen(false)
  }

  async function handleBlockUser() {
    try {
      await UserServices.blockUserCustomer(currentUser.id, { is_active: "0" })
      setIsModalBlockOpen(oldValue => !oldValue)
      Notify(NotifyTypes.SUCCESS, 'Usuário bloqueado com sucesso')
    } catch (error) {
      setIsModalBlockOpen(oldValue => !oldValue)
      Notify(NotifyTypes.ERROR, 'Algo deu errado, por favor tente novamente')
    }
  }

  async function handleUnblockUser() {
    try {
      await UserServices.blockUserCustomer(currentUser.id, { is_active: "1" })
      setIsModalUnblockOpen(oldValue => !oldValue)
      Notify(NotifyTypes.SUCCESS, 'Usuário desbloqueado com sucesso')
    } catch (error) {
      setIsModalUnblockOpen(oldValue => !oldValue)
      Notify(NotifyTypes.ERROR, 'Algo deu errado, por favor tente novamente')
    }
  }

  const headers = [
    {
      id: 1,
      name: 'Nome',
      selector: (row: any) => row.name,
      sortable: true,
      reorder: true
    },
    {
      id: 2,
      name: 'Sobrenome',
      selector: (row: any) => row.suname,
      sortable: true,
      reorder: true
    },
    {
      id: 3,
      name: 'E-mail',
      selector: (row: any) => row.email,
      sortable: true,
      reorder: true
    },
    {
      id: 4,
      name: 'Status de bloqueio',
      selector: (row: any) => row.is_active === 1 ? 'Ativo' : 'Inativo',
      sortable: true,
      reorder: true
    },
    {
      id: 5,
      name: 'Perfil',
      sortable: true,
      selector: (row: any) => row.user_type_id === 1 ? 'Colaborador' : 'Gestor',
      reorder: true
    },
    {
      id: 6,
      name: 'Ações',
      sortable: true,
      selector: (row: any) =>
        <Box>
          <ButtonTooltip><MdMoreVert /></ButtonTooltip>
          <div className="dropdown">
            <button onClick={() => onEdit(row)}>Editar detalhes</button>
            {
              user.id !== userRow.id ?
                <button onClick={() => onBlock(row)}>{userRow.is_active === 1 ? 'Bloquear funcionário' : 'Desbloquear funcionário'}</button>
                :
                ''
            }
          </div>
        </Box>,
      reorder: true
    },
  ]

  useEffect(() => {
    getUserCustomer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <Wrapper>
      <Modal
        isOpen={isModalBlockOpen}
        style={customStyleModalBlock}
      >
        <ModalBlockContent>
          <h2>Bloquear funcionário</h2>
          <p>Tem certeza que deseja bloquear o funcionario <b>{currentUser.name}</b> ?</p>
          <Button small type="button" onClick={handleBlockUser} customColor="red" title={'Bloquear'} />
          <Button small type="button" onClick={handleCloseModal} customStyles="margin-top:20px;" customColor="#646170" title={'Cancelar'} />
        </ModalBlockContent>
      </Modal>
      <Modal
        isOpen={isModalUnblockOpen}
        style={customStyleModalBlock}
      >
        <ModalBlockContent>
          <h2>Desbloquear funcionário</h2>
          <p>Tem certeza que deseja desbloquear o funcionario <b>{currentUser.name}</b> ?</p>
          <Button small type="button" onClick={handleUnblockUser} customColor={colors.primary.medium} title={'Desbloquear'} />
          <Button small type="button" onClick={handleCloseModal} customStyles="margin-top:20px;" customColor="#646170" title={'Cancelar'} />
        </ModalBlockContent>
      </Modal>
      <div className="container">
        <div className="headers">
          <strong>Funcionários</strong>
          {!pending && <button onClick={onAddEmployer}>Adicionar novo funcionários</button>}
        </div>
        <DataTable
          data={userData}
          columns={headers}
          progressPending={pending}
          customStyles={styles}
        />
      </div>
    </Wrapper>
  )
}


