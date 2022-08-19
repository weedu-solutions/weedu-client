import { useNavigate } from "react-router-dom";
import LayoutLogged from "../../../components/LayoutLogged";
import { useAuth } from "../../../hooks/auth";
import { Body, Box, ButtonSeeMore, Content, Wrapper } from "./styles";
import iconButton from "../../../assets/see-more.svg";
import { ROUTES } from "../../../constants/routes";


export function ConsultantCompanies() {
    const { user } = useAuth();
    const navigate = useNavigate()

    function handleSeeMore(companyInfo: any) {
        localStorage.setItem('company_consultant', JSON.stringify(companyInfo));
        navigate(ROUTES.ACTIONS);
    }

    return (
        <LayoutLogged>
            <Wrapper>
                <div className="container">
                    <Content>
                        <h1>Suas empresas - {user.name}</h1>
                    </Content>
                </div>
            </Wrapper>

            <Body>
                {
                    user.customer.map((customer: any) =>
                        <Box>
                            <h1>{customer.fantasy_name}</h1>
                            <ButtonSeeMore
                                onClick={() => handleSeeMore(customer)}
                            >
                                Ver detalhes <img src={iconButton} alt="Mais detalhes" />
                            </ButtonSeeMore>
                        </Box>)
                }

            </Body>
        </LayoutLogged>
    );
}


