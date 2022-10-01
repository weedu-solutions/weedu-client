import { createContext, useState } from 'react';

interface IUserDataForm {
  name: string;
  suname: string;
  email: string;
  user_type_id: string;
  password: string;
  is_active: string;
  customer_id: Array<number>;
  maneger_id: string;
}

export interface IUserData {
  name: string;
  suname: string;
  email: string;
  user_type_id: number;
  password: string;
  id: number;
  is_active: number;
}

const initialUserDataForm = {
  name: "",
  suname: "",
  email: "",
  user_type_id: "",
  password: "",
  is_active: "1",
  customer_id: [],
  maneger_id: ""
}



export interface IAuthContextState {
  userDataForm: IUserDataForm;
  setUserDataForm: any;
  userDataList: Array<IUserData>;
  setUserDataList: any;
}

export const UserContext = createContext<IAuthContextState>(
  {} as IAuthContextState,
);

export const UserProvider: React.FC = ({ children }) => {

  const [userDataForm, setUserDataForm] = useState<IUserDataForm>(initialUserDataForm);
  const [userDataList, setUserDataList] = useState<Array<IUserData>>([]);
  // const [userCompany, setUserCompany] = useState<IUserDataForm>(initialUserDataForm);

  return (
    <UserContext.Provider
      value={{userDataForm, setUserDataForm, userDataList, setUserDataList}}
    >
      {children}
    </UserContext.Provider>
  )
}
