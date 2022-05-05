import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../../../constants/routes"
import { CustomerServices } from "../../../../services/customer"
import { colors } from "../../../../theme"
import { ModalBlockContent, Wrapper } from "./styled"
import { MdMoreVert } from 'react-icons/md'
import { More } from '../More'
import Modal from 'react-modal'
import { Button } from "../../../../components/Button"
import { UserServices } from "../../../../services/user"
import { useUser } from '../../../../hooks/user'

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
    backgroundColor:'rgba(0,0,0,0.50)'
  },
  content: {
    maxWidth: '400px',
    height: '300px', 
    margin: 'auto',
  }
}

export function DataTableUserCustomer({ id }: any) {

  const navigate = useNavigate()
  const { setUserDataForm } = useUser()

  const [ userData, setUserData ] = useState([])
  const [ currentUser, setCurrentUser ] = useState({} as any)
  const [pending, setPending] = useState<boolean>(false)
  const [isModalBlockOpen, setIsModalBlockOpen] = useState(false)

  function compare(a: any, b: any) {
    if(a.id < b.id) return -1;
    if(a.id > b.id) return 1;
    return 0;
  }

  const getUserCustomer = async () => {
    setPending(pending => !pending)
    const { data } = await CustomerServices.getAllUserCustomer(id)
    setUserData(data.data[0].user.sort(compare))
    setPending(pending => !pending)
  }


  function onEdit(user: any) {
    setCurrentUser(user)
    setUserDataForm(user)
    navigate(`${ROUTES.REGISTER_USER_COMPANY}/${id}`)
  }

  function onBlock(user: any) {
    setCurrentUser(user)
    setIsModalBlockOpen(oldValue => !oldValue)
  }

  async function handleCloseModal() {
    setIsModalBlockOpen(false)
  }

  async function handleBlockUser() {
    await UserServices.blockUserCustomer(currentUser.id, {is_active: "0"})
    navigate(0)
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
      name: 'Ações',
      sortable: true,
      selector: (row: any) => <More onBlock={() => onBlock(row)} onEdit={() => onEdit(row)} />,
      reorder: true
    },
  ]

  useEffect(() => {
    getUserCustomer()
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
      <div className="container">
        <div className="headers">
          <strong>Funcionários</strong>
          <button onClick={() => navigate(`${ROUTES.REGISTER_USER_COMPANY}/${id}`)}>Adicionar novo funcionários</button>
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
