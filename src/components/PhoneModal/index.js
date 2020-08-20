import styled from 'styled-components';
import { Modal, Image } from 'semantic-ui-react';
import CloseIcon from 'Assets/icons/close.svg';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Paragraph } from 'Components/Text';
import phoneIcon from 'Assets/icons/btn-phone.svg';
import AppStoreIcon from 'Assets/icons/appstore-icon.png';
import PlayStoreIcon from 'Assets/icons/playstore-icon.png';

const CustomModal = styled(Modal)`
  top: 10% !important;
  &&& {
    & > .content {
      padding: 1.5 1.5rem 1.5rem;
    }
  }
`;

const CloseImage = styled(Image)`
  position: absolute !important;
  top: 0.275rem;
  left: 0.275rem;
`;

const StoreButtonsContainer = styled.div`
  display: inline-flex;
  width: 100%;
  justify-content: space-evenly;
  margin-bottom: 1.5rem;
`;

const StoreButton = styled(Image)`
  width: 45%;
  height: 3rem;
`;

const CallButton = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 8rem;
  margin-right: 0.5rem;
`;

const ButtonText = styled.div`
  color: ${props => props.theme.accentText};
  font-size: 0.75rem;
`;

type Props = {
  toggle: Function,
  open: boolean,
};

const ButtonTextContainer = styled.div`
  display: inline-flex;
  margin-bottom: 1.5rem;
`;

const Container = styled.div``;

const Divider = styled.div`
  width: 100%;
  background-color: ${props => props.theme.defaultGrey};
  border-top: 1px solid ${props => props.theme.darkGray};
  border-bottom: 1px solid ${props => props.theme.darkGray};
  height: 0.5rem;
  margin-top: 3rem;
`;
const PhoneModal = ({ toggle, open }: Props) => {
  return (
    <CustomModal open={open} onClose={toggle} size="mini">
      <CloseImage src={CloseIcon} onClick={toggle} />
      <Divider />
      <Modal.Content>
        <Container>
          <ButtonTextContainer>
            <CallButton>
              <Image src={phoneIcon} />
              <ButtonText>
                <FormattedMessage id="booking.accepted.call" />
              </ButtonText>
            </CallButton>
            <Paragraph secondaryText fontSize="0.9375rem" light>
              <FormattedMessage id="desktop.phone.explanation" />
            </Paragraph>
          </ButtonTextContainer>
          <StoreButtonsContainer>
            <StoreButton src={AppStoreIcon} />
            <StoreButton src={PlayStoreIcon} />
          </StoreButtonsContainer>
          <Paragraph
            secondaryText
            textAlign="center"
            fontSize="0.9375rem"
            light
          >
            <FormattedMessage id="desktop.phone.explanationStore" />
          </Paragraph>
        </Container>
      </Modal.Content>
    </CustomModal>
  );
};

export default PhoneModal;
