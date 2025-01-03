import { useQuery } from "react-query";
import { useAuth } from "./auth";
import { Api } from "../services/api";

interface User {
  id: string;
  name: string;
  suname: string;
}

interface SelectOption {
  value: string;
  label: string;
}

export function useCompanyUsers() {
  const { user, infoCompany } = useAuth();

  const { data: users = [], isLoading } = useQuery({
    queryKey: [
      "company-users",
      user?.user_type_id,
      infoCompany?.id,
      user?.customer?.[0]?.id,
    ],
    queryFn: async () => {
      const idCustomer =
        user?.user_type_id === 3 ? infoCompany.id : user?.customer[0].id;

      const { data } = await Api.get(`auth/user-customer/${idCustomer}`);
      return data?.data || [];
    },
    enabled: !!user && (!!infoCompany?.id || !!user?.customer?.[0]?.id),
  });

  const getUserOptions = (): SelectOption[] => {
    return (
      users[0]?.user?.map((user: User): SelectOption => ({
        value: user.id,
        label: `${user.name} ${user.suname}`,
      })) || []
    );
  };

  return {
    users,
    isLoading,
    getUserOptions,
  };
}
