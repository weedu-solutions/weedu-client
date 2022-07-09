import { useDisclosure, ModalOverlay, ModalContent, ModalCloseButton, Button, Modal } from "@chakra-ui/react"
import React from "react"
import { MyButton } from "../styles"
import { ModalBody } from "./styles"
import moreIcon from "../../../assets/more.svg";


export function ModalDetails() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    return (
        <>
            <MyButton onClick={onOpen}><img src={moreIcon} alt="Mais detalhes" /></MyButton>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />

                    <ModalBody>
                        <Button mr={3}>
                            Começar ação
                        </Button>
                        <Button mr={3} mt="5px">
                            Ver detalhes
                        </Button>
                        <Button mr={3} mt="5px">
                            Desativar ação
                        </Button>
                        <Button onClick={onClose} mr={3} mt="5px" colorScheme='red' >
                            Cancel
                        </Button>
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    )
}
