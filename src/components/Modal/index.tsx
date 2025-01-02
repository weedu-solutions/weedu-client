import { ReactNode } from "react";
import { IoClose } from "react-icons/io5";
import * as S from "./styles";

interface ModalProps {
  title?: string | React.ReactNode;
  subtitle?: string;
  children: ReactNode;
  onClose: () => void;
  maxWidth?: string;
}

export const MODAL_STYLES = {
  modalDefault: {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.50)",
    },
    content: {
      background: "transparent",
      border: "none",
      margin: "auto",
    },
  },
};

export function Modal({
  title,
  subtitle,
  children,
  onClose,
  maxWidth = "900px",
}: ModalProps) {
  return (
    <S.Overlay>
      <S.Container maxWidth={maxWidth}>
        <S.Header>
          <S.HeaderContent>
            <S.Title>{title}</S.Title>
            {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
          </S.HeaderContent>
          <S.CloseButton onClick={onClose}>
            <IoClose size={24} />
          </S.CloseButton>
        </S.Header>

        <S.Content>{children}</S.Content>
      </S.Container>
    </S.Overlay>
  );
}

export const ModalSection = S.Section;
export const ModalSectionTitle = S.SectionTitle;
export const ModalGrid = S.Grid;
export const ModalButtonContainer = S.ButtonContainer;
export const ModalCancelButton = S.CancelButton;
export const ModalSubmitButton = S.SubmitButton;
export const ModalErrorMessage = S.ErrorMessage;
