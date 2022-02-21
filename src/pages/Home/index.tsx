import { Box, Input, Text } from "native-base";
import { DashHeader } from "../../components/DashHeader";
import { PieChart } from "react-minimal-pie-chart";
import { ItemTableRow } from "../../components/ItemTableRow";
import { FiSearch } from "react-icons/fi";
import { Filter } from "../../components/Filter";
import { theme } from "../../theme";

import * as S from "./styles";
import { CreateTask } from "../../components/CreateTask";

export function Home() {
  const dataGraph = [
    { title: "Em esecução", value: 28, color: "#1C86FF" },
    { title: "Executadas", value: 23, color: "#011627" },
    { title: "Atrasadas a terminar", value: 30, color: "#E71D36" },
    { title: "A iniciar", value: 15, color: "#2EC4B6" },
  ];
  const dataGraph2 = [
    { title: "No prazo", value: 32, color: "#011627" },
    { title: "Fora do praz", value: 68, color: "#E71D36" },
  ];

  return (
    <Box alignItems="center" paddingBottom="5%">
      <DashHeader />

      <S.Container>
        <Text
          fontFamily="Inter"
          fontWeight="400"
          fontSize="24px"
          color="primary.darker"
        >
          Luciano Lima
        </Text>
        <Box
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          paddingY={8}
          width={1200}
        >
          <Box
            maxWidth="590"
            height="400"
            borderWidth={1}
            borderColor="#E0DDF0"
            paddingY={4}
            paddingX={12}
            borderRadius={2}
          >
            <Text
              fontFamily="Inter"
              fontWeight="700"
              fontSize="20px"
              color="primary.darker"
            >
              Status das iniciativas
            </Text>
            <Text marginY={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porta
              pellentesque vulputate ut egestas nunc, at.
            </Text>

            <Box
              paddingY={4}
              flexDir="row"
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Box width="50%">
                <PieChart
                  data={dataGraph}
                  style={{
                    width: "80%",
                    height: "80%",
                  }}
                  animate
                  animationDuration={500}
                  animationEasing="ease-out"
                  label={(value) =>
                    `${parseInt(value.dataEntry.percentage.toString())}%`
                  }
                  labelPosition={50}
                  lengthAngle={360}
                  viewBoxSize={[100, 100]}
                  labelStyle={{
                    fontSize: "10px",
                    fontWeight: "800",
                  }}
                />
              </Box>
              <Box
                bgColor="rgba(119, 119, 119, 0.04)"
                width="50%"
                padding={4}
                borderRadius={2}
              >
                <Text fontSize="14px">Tempo médio de execução</Text>
                <Text
                  fontFamily="Inter"
                  fontWeight="700"
                  fontSize="32px"
                  color="primary.darker"
                  marginY={2}
                >
                  3d 5h 59m
                </Text>

                {dataGraph.map((item) => (
                  <Box flexDir="row" alignItems="center">
                    <Box
                      w="16px"
                      h="16px"
                      borderRadius="4px"
                      bgColor={item.color}
                      mr="4px"
                    />
                    <Text fontSize="14px">{item.title}</Text>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <Box
            maxWidth="590"
            height="400"
            borderWidth={1}
            borderColor="#E0DDF0"
            paddingY={4}
            paddingX={12}
            borderRadius={2}
          >
            <Text
              fontFamily="Inter"
              fontWeight="700"
              fontSize="20px"
              color="primary.darker"
            >
              Status das finalizadas
            </Text>
            <Text marginY={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porta
              pellentesque vulputate ut egestas nunc, at.
            </Text>

            <Box
              paddingY={4}
              flexDir="row"
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Box width="50%">
                <PieChart
                  data={dataGraph2}
                  style={{
                    width: "80%",
                    height: "80%",
                  }}
                  animate
                  animationDuration={500}
                  animationEasing="ease-out"
                  label={(value) =>
                    `${parseInt(value.dataEntry.percentage.toString())}%`
                  }
                  labelPosition={50}
                  lengthAngle={360}
                  viewBoxSize={[100, 100]}
                  labelStyle={{
                    fontSize: "10px",
                    fontWeight: "800",
                  }}
                  lineWidth={30}
                  paddingAngle={0}
                  radius={50}
                  startAngle={0}
                />
              </Box>
              <Box
                bgColor="rgba(119, 119, 119, 0.04)"
                width="50%"
                padding={4}
                borderRadius={2}
              >
                <Text fontSize="14px">Tempo médio de execução</Text>
                <Text
                  fontFamily="Inter"
                  fontWeight="700"
                  fontSize="32px"
                  color="primary.darker"
                  marginY={2}
                >
                  3d 5h 59m
                </Text>

                {dataGraph2.map((item) => (
                  <Box flexDir="row" alignItems="center">
                    <Box
                      w="16px"
                      h="16px"
                      borderRadius="4px"
                      bgColor={item.color}
                      mr="4px"
                    />
                    <Text fontSize="14px">{item.title}</Text>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box>
          <Box
            width="100%"
            borderTopWidth={1}
            borderTopColor="#7A778A"
            paddingY={12}
            flexDir="row"
            justifyContent="space-between"
          >
            <Box flexDir="row">
              <Filter pressed title="Filtrando" />
              <Filter pressed={false} title="Filtrar" />
            </Box>

            <Input
              placeholder="Pesquisar"
              borderRadius="4px"
              borderColor="#D6D7DA"
              _focus={{
                borderColor: theme.colors.primary.darker,
              }}
              paddingRight="16px"
              maxWidth="460px"
              minWidth="260px"
              rightElement={
                <Box paddingRight="16px">
                  <FiSearch color="#747880" />
                </Box>
              }
            />
          </Box>
          <ItemTableRow status="To_Start" />
          <ItemTableRow status="To_Running" />
          <ItemTableRow status="Late_To_Start" />
          <ItemTableRow status="Executed" />
          <ItemTableRow status="Late_To_Finish" />
        </Box>
      </S.Container>

      <CreateTask />
    </Box>
  );
}
