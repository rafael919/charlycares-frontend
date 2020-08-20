import { Modal } from 'semantic-ui-react';
import React from 'react';
import styled from 'styled-components';

import ActiveBabysitting from './components/ActiveBabysitting';
import API from './api';
import PaymentConfirmation from '../../features/Payments/PaymentConfirmation/Desktop';
import PhoneModal from 'Components/PhoneModal';
import closeIcon from 'Assets/icons/closed_icon.svg';
import anime from 'animejs';

const Container = styled.div`
  box-shadow: ${({ minimized }) =>
    !minimized ? '0 0 14px 0 rgba(0, 0, 0, 0.3)' : 'unset'};
  border-radius: 4px;
  background-color: ${({ minimized }) =>
    !minimized ? '#ffffff' : 'transparent'};
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.875rem;
  z-index: 10000;
`;

const CustomModal = styled(Modal)`
  &&& {
    & > .content {
      padding: 0 1rem 1rem;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.3rem;
  left: 0;
  background: transparent;
  border: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`;

const CloseIcon = styled.img``;

class DesktopTimer extends React.Component {
  container = React.createRef();

  state = {
    activeBabySitting: null,
    showPaymentConfirmation: false,
    minimized: false,
  };

  togglePhoneModal = () => {
    this.setState({
      showPhoneModal: !this.state.showPhoneModal,
    });
  };

  componentDidMount() {
    API.getActiveSitting()
      .then(res => {
        this.setState(
          {
            activeBabySitting: res.data.data,
          },
          () => {
            this.animation = anime({
              targets: this.container.current,
              left: ['50%', 95],
              duration: 700,
              easing: 'easeInQuad',
              autoplay: false,
            });
          }
        );
      })
      .catch(err => {});
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.showPaymentConfirmation !==
        this.state.showPaymentConfirmation &&
      this.state.showPaymentConfirmation === false &&
      this.state.minimized === true
    ) {
      anime({
        targets: this.container.current,
        left: ['50%', 95],
        duration: 700,
        easing: 'easeInQuad',
      });
    }
  }

  onModalToggle = () => {
    this.setState(state => ({
      showPaymentConfirmation: !state.showPaymentConfirmation,
    }));
  };

  onAnimationPlay = () => {
    this.setState({ minimized: true }, this.animation.play);
  };

  onEndActiveBabySitting = () => {
    this.setState(state => ({
      activeBabySitting: null,
    }));
  };

  render() {
    if (
      !this.state.activeBabySitting ||
      Array.isArray(this.state.activeBabySitting)
    ) {
      return null;
    }
    return (
      <React.Fragment>
        <PhoneModal
          open={this.state.showPhoneModal}
          toggle={this.togglePhoneModal}
        />
        {!this.state.showPaymentConfirmation ? (
          <Container
            minimized={this.state.minimized}
            innerRef={this.container}
            id="container"
          >
            {!this.state.minimized ? (
              <CloseButton onClick={this.onAnimationPlay}>
                <CloseIcon src={closeIcon} />
              </CloseButton>
            ) : null}

            <ActiveBabysitting
              minimized={this.state.minimized}
              onShowModal={this.onModalToggle}
              activeBabysitting={this.state.activeBabySitting}
              role={this.props.role}
              history={this.props.history}
              togglePhoneModal={this.togglePhoneModal}
            />
          </Container>
        ) : null}

        <CustomModal
          open={this.state.showPaymentConfirmation}
          style={{ zIndex: 10000 }}
          size="mini"
        >
          <Modal.Content scrolling>
            <PaymentConfirmation
              onClose={this.onModalToggle}
              angel={this.state.activeBabySitting.angel}
              transactionCosts={this.state.activeBabySitting.transactioncosts}
              credit={this.state.activeBabySitting.credit}
              startTime={this.state.activeBabySitting.start_time}
              endTime={this.state.activeBabySitting.end_time}
              onEndSitting={this.onEndActiveBabySitting}
              togglePhoneModal={this.togglePhoneModal}
            />
          </Modal.Content>
        </CustomModal>
      </React.Fragment>
    );
  }
}

export default DesktopTimer;
