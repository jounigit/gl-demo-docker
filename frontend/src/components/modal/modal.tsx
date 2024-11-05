import type { FC } from 'react'
import * as ReactDOM from 'react-dom'

import {
  Wrapper,
  Header,
  StyledModal,
  HeaderText,
  CloseButton,
  Content,
  Backdrop,
} from './modal.style'

export interface ModalProps {
  isShown: boolean;
  hide: () => void;
  modalContent: JSX.Element;
  headerText: string | undefined;
}

export const Modal: FC<ModalProps> = ({
  isShown,
  hide,
  modalContent,
  headerText,
}) => {
  const modal = (
    <>
      <Backdrop onClick={hide} />
      <Wrapper
        aria-modal
        aria-labelledby={headerText}
        tabIndex={-1}
        // biome-ignore lint/a11y/useSemanticElements: <explanation>
        role="dialog"
      >
        <StyledModal>
          <Header>
            <HeaderText>{headerText}</HeaderText>
            <CloseButton onClick={hide}>X</CloseButton>
          </Header>
          <Content>{modalContent}</Content>
        </StyledModal>
      </Wrapper>
    </>
  )

  return isShown ? ReactDOM.createPortal(modal, document.body) : null
}
