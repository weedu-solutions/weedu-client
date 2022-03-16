import { Box, Text, Input, Pressable } from "native-base";
import { FiEdit } from "react-icons/fi";

export function DatePicker() {
  return (
    <Box>
      <Box flexDir="row">
        <Box pt={4} marginRight={2}>
          <Text
            fontFamily="Inter"
            fontSize="14px"
            fontWeight="700"
            marginRight={2}
          >
            Início Previsto (When?)
          </Text>
          <Box flexDir="row" alignItems="center">
            <Input
              bgColor="#F4F2FC"
              borderWidth={0}
              paddingRight="5%"
              placeholder="dd/mm/aaaa"
            />
            <Pressable position="absolute" right={1}>
              <FiEdit size={24} />
            </Pressable>
          </Box>
        </Box>

        <Box pt={4}>
          <Text
            fontFamily="Inter"
            fontSize="14px"
            fontWeight="700"
            marginRight={2}
          >
            Fim Previsto (When?)
          </Text>
          <Box flexDir="row" alignItems="center">
            <Input
              bgColor="#F4F2FC"
              borderWidth={0}
              paddingRight="5%"
              placeholder="dd/mm/aaaa"
            />
            <Pressable position="absolute" right={1}>
              <FiEdit size={24} />
            </Pressable>
          </Box>
        </Box>
      </Box>

      <Box flexDir="row">
        <Box pt={4} marginRight={2}>
          <Text
            fontFamily="Inter"
            fontSize="14px"
            fontWeight="700"
            marginRight={2}
          >
            Início real
          </Text>
          <Box flexDir="row" alignItems="center">
            <Input
              bgColor="#F4F2FC"
              borderWidth={0}
              paddingRight="5%"
              placeholder="dd/mm/aaaa"
            />
            <Pressable position="absolute" right={1}>
              <FiEdit size={24} />
            </Pressable>
          </Box>
        </Box>

        <Box pt={4}>
          <Text
            fontFamily="Inter"
            fontSize="14px"
            fontWeight="700"
            marginRight={2}
          >
            Fim real
          </Text>
          <Box flexDir="row" alignItems="center">
            <Input
              bgColor="#F4F2FC"
              borderWidth={0}
              paddingRight="5%"
              placeholder="dd/mm/aaaa"
            />
            <Pressable position="absolute" right={1}>
              <FiEdit size={24} />
            </Pressable>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
