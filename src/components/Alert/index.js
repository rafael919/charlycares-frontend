import styled from 'styled-components';
import { Modal } from 'semantic-ui-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Paragraph } from 'Components/Text';
import BasicButton from 'Components/Buttons/Basic';

const CustomModal = styled(Modal)`
  top: 30% !important;
  &&& {
    & > .content {
      padding: 1rem 2.5rem;
    }
  }
`;

const Title = styled.h3`
  color: ${props => props.theme.primaryText};
  font-family: ${({ theme }) => theme.secondaryFont};
  text-align: center;
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Alert = ({ toggle, open, desc, onPress, title, next, cancel }) => {
  return (
    <CustomModal open={open} size="mini">
      <Modal.Content>
        <Title>
          {title ? title : <FormattedMessage id="attention" />}
        </Title>
        <Paragraph secondaryText textAlign="center" fontSize="0.9375rem">
          {desc}
        </Paragraph>
        <ButtonContainer>
          <BasicButton onClick={toggle} outline color="#F56B87">
            {cancel ? cancel : <FormattedMessage id="attention.cancel" />}
          </BasicButton>
          <BasicButton onClick={onPress} outline color="#4286f4">
            {next ? next : <FormattedMessage id="attention.continue" /> }
          </BasicButton>
        </ButtonContainer>
      </Modal.Content>
    </CustomModal>
  );
};

export default Alert;
