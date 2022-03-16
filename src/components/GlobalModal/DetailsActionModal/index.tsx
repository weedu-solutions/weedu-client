import {
  Text,
  Button,
  Center,
  Modal,
  ScrollView,
  Box,
  TextArea,
} from "native-base";
import { useState } from "react";
import { BadgeStatus } from "../../BadgeStatus";
import { FiEdit } from "react-icons/fi";
import { DatePicker } from "../../DatePicker";

export function DetailsActionModal() {
  const [modalVisible, setModalVisible] = useState(true);

  // const handleSizeClick = () => {
  //   setModalVisible(!modalVisible);
  // };

  return (
    <Modal
      isOpen={modalVisible}
      onClose={setModalVisible}
      size="xl"
      position="absolute"
      bottom={40}
    >
      <Modal.Content>
        <Modal.CloseButton borderRadius="50%" />
        <ScrollView>
          <Box paddingX={12} paddingY={6}>
            <Box
              alignItems="center"
              flexDir="row"
              justifyContent="center"
              borderBottomWidth={1}
              borderBottomColor="neutral.ligth"
              paddingBottom={2}
            >
              <Text
                fontFamily="Inter"
                fontSize="24px"
                fontWeight="700"
                marginRight={2}
              >
                Detalhes da ação
              </Text>

              <BadgeStatus type={"To_Start"} />
            </Box>

            <Text
              fontFamily="Inter"
              fontSize="14px"
              fontWeight="700"
              marginRight={2}
            >
              Qualquer alteracao dos dados atuais esta sujeita a aprovacao ou
              nao do{" "}
            </Text>

            <Box pt={4}>
              <Text
                fontFamily="Inter"
                fontSize="14px"
                fontWeight="700"
                marginRight={2}
                paddingRight="5%"
              >
                Qual o problema ou causa que será tratado?
              </Text>
              <TextArea bgColor="#F4F2FC" borderWidth={0}>
                teste
              </TextArea>
              <Box
                position="absolute"
                top="35%"
                right="3%"
                alignItems="center"
                justifyContent="center"
              >
                <FiEdit size={24} />
              </Box>
            </Box>
            <Text
              fontFamily="Inter"
              fontSize="14px"
              fontWeight="700"
              marginRight={2}
              marginTop={2}
            >
              Observações
            </Text>
            <Box pt={4}>
              <Text
                fontFamily="Inter"
                fontSize="14px"
                fontWeight="700"
                marginRight={2}
              >
                O que será feito? (What?)
              </Text>
              <TextArea
                bgColor="#F4F2FC"
                borderWidth={0}
                maxHeight="sm"
                paddingRight="5%"
              >
                teste
              </TextArea>
              <Box
                position="absolute"
                top="35%"
                right="3%"
                alignItems="center"
                justifyContent="center"
              >
                <FiEdit size={24} />
              </Box>
            </Box>

            <Box pt={4}>
              <Text
                fontFamily="Inter"
                fontSize="14px"
                fontWeight="700"
                marginRight={2}
              >
                Como irá realizar esta ação (passo a passo)? (How?)
              </Text>
              <TextArea bgColor="#F4F2FC" borderWidth={0} paddingRight="5%">
                Baixa conversão de smart lead para MQL Os negócios dos
                Prospectores que sairam da empresa ficam sem "dono" e ficam
                parados em nome da Mayara (IC) sem continuidade
              </TextArea>
              <Box
                position="absolute"
                top="35%"
                right="3%"
                alignItems="center"
                justifyContent="center"
              >
                <FiEdit size={24} />
              </Box>
            </Box>

            <Box pt={4}>
              <Text
                fontFamily="Inter"
                fontSize="14px"
                fontWeight="700"
                marginRight={2}
              >
                Responsável pela ação (Who?)
              </Text>
              <TextArea bgColor="#F4F2FC" borderWidth={0} paddingRight="5%">
                Lorem ipsum
              </TextArea>
              <Box
                position="absolute"
                top="35%"
                right="3%"
                alignItems="center"
                justifyContent="center"
              >
                <FiEdit size={24} />
              </Box>
            </Box>

            <DatePicker />

            <Box pt={4}>
              <Text
                fontFamily="Inter"
                fontSize="14px"
                fontWeight="700"
                marginRight={2}
              >
                Observações
              </Text>
              <TextArea bgColor="#F4F2FC" borderWidth={0} paddingRight="5%">
                Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                Lorem ipsum Lorem ipsum
              </TextArea>
              <Box
                position="absolute"
                top="35%"
                right="3%"
                alignItems="center"
                justifyContent="center"
              >
                <FiEdit size={24} />
              </Box>
            </Box>
          </Box>
        </ScrollView>

        <Center>
          <Button isDisabled minWidth="374px" minHeight="72px" marginY="16px" isLoading>
            Atualizar status
          </Button>
        </Center>
      </Modal.Content>
    </Modal>
  );
}
