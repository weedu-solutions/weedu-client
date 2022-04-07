import { ReactNode } from "react";
import { Image } from "native-base";
import Background from "../../assets/bg.svg";
import { Header } from "./components/Header";
import { Wrapper } from "./styled";

export interface Props {
  children: ReactNode
}

export function Layout({children}: Props) {
  return (
    <Wrapper>
      <Image source={{ uri: Background }} width='100%'height='100%' position="absolute"/>
      <Header />
      {children}
    </Wrapper>
  )
}
