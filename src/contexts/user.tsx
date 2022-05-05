import { createContext, useState } from 'react';

interface IUserDataForm {
  name: string;
  suname: string;
  email: string;
  user_type_id: string;
  password: string;
  is_active: string;
  customer_id: Array<number>;
}

const initialUserDataForm = {
  name: "",
  suname: "",
  email: "",
  user_type_id: "",
  password: "",
  is_active: "1",
  customer_id: []
}

export interface IAuthContextState {
  userDataForm: IUserDataForm;
  setUserDataForm: any;
}

export const UserContext = createContext<IAuthContextState>(
  {} as IAuthContextState,
);

export const UserProvider: React.FC = ({ children }) => {

  const [userDataForm, setUserDataForm] = useState<IUserDataForm>(initialUserDataForm);

  return (
    <UserContext.Provider
      value={{userDataForm, setUserDataForm}}
    >
      {children}
    </UserContext.Provider>
  )
}
