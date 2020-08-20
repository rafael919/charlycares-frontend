import styled from 'styled-components';
import { Modal, Image } from 'semantic-ui-react';
import CloseIcon from 'Assets/icons/close.svg';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PromoImageSrc from 'Assets/images/app-promotor-image.png';
import PhoneInput from './components/PhoneInput';
import API from './api';

const CustomModal = styled(Modal)`
  top: 10% !important;
  width: 640px;
`;

const CloseImage = styled(Image)`
  position: absolute !important;
  top: 0.275rem;
  left: 0.275rem;
`;

const Column = styled.div`
  background-color: ${props => props.theme[props.background]};
  display: inline-block;
  vertical-align: top;
  text-align: center;
  width: ${props => props.width};
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
`;

const Container = styled.div``;

const ListItem = styled.p`
  font-weight: 300;
`;

const Header = styled.p`
    margin-top: 1rem !important;
    font-size: 1.25rem; 
    font-weight; bold;
`;

const SubHeader = styled.p`
  font-weight: 300;
  margin-bottom: 1.75rem;
  font-size: 1.25rem;
`;

const PromoImage = styled.img`
  height: 100%;
  width: 100%;
`;

const List = styled.div`
  margin: auto;
  width: 75%;
  text-align: left;
`;

const LeftColumn = styled.div`
  padding: 2rem;
`;
const RightColumn = styled.div`
  padding: 2rem;
`;

const MessageSent = styled.p`
  margin-top: 1.25rem;
  color: ${props => props.theme.warning};
`;
class AppPromotor extends Component {
  state = {
    phone: '',
    country: '31',
    showMessageSent: false,
  };

  onChangePhoneNumber = (e, data) => {
    this.setState(state => {
      if (data.name === 'country') {
        return {
          ...state,
          country: data.value,
        };
      } else {
        return {
          ...state,
          phone: data.value,
        };
      }
    });
  };

  onSend = () => {
    const phoneNumber = this.state.country + this.state.phone;
    API.sendDownloadLink({ phoneNumber: phoneNumber }).then(resp => {
      console.log(resp);
      if (resp.status === 200)
        this.setState({
          phone: '',
          country: '31',
          showMessageSent: true,
        });
    });
  };

  render() {
    return (
      <CustomModal
        open={this.props.show}
        onClose={this.props.toggle}
        size="small"
      >
        <CloseImage src={CloseIcon} onClick={this.props.toggle} />
        <Container>
          <Column width={'55%'}>
            <LeftColumn>
              <Header>
                <FormattedMessage id="promotor.header" />
              </Header>
              <SubHeader>
                <FormattedMessage id="promotor.subheader" />
              </SubHeader>

              <List>
                <ListItem>
                  <FormattedMessage id="promotor.usp1" />
                </ListItem>
                <ListItem>
                  <FormattedMessage id="promotor.usp2" />
                </ListItem>
                <ListItem>
                  <FormattedMessage id="promotor.usp3" />
                </ListItem>
              </List>
              <PhoneInput
                country={this.state.country}
                phone={this.state.phone}
                onChangePhoneNumber={this.onChangePhoneNumber}
                onSend={this.onSend}
              />
              {this.state.showMessageSent && (
                <MessageSent>
                  <FormattedMessage id="promotor.smsSent" />
                </MessageSent>
              )}
            </LeftColumn>
          </Column>
          <Column background={'defaultGrey'} width={'45%'}>
            <RightColumn>
              <PromoImage src={PromoImageSrc} />
            </RightColumn>
          </Column>
        </Container>
      </CustomModal>
    );
  }
}

export default AppPromotor;
