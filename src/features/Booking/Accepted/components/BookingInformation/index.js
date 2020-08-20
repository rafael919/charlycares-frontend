import React, { Component } from 'react';
import styled from 'styled-components';
import { Image, Grid } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import { FormattedMessage } from 'react-intl';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import LinksSection from '../../../components/LinksSection';
import arrowDown from 'Assets/icons/btn-small-arrow-down.svg';

const BookingInformationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-top: ${props => props.borderTop && '1px solid #e6e6e6'};
  border-bottom: ${props => props.borderBottom && '1px solid #e6e6e6'};
  font-size: 0.9375rem;
  color: ${props => props.theme.grey};
`;

const PersonalMessageText = styled.div`
  font-size: 0.875rem;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.87);
`;

class BookingInformation extends Component {
  constructor(props) {
    super(props);
    this.state = { personalMessageStatus: false };

    this.showPersonalMessage = this.showPersonalMessage.bind(this);
  }

  showPersonalMessage() {
    this.setState(state => ({
      personalMessageStatus: !state.personalMessageStatus,
    }));
  }

  render() {
    if (!this.state.personalMessageStatus) {
      return (
        <BookingInformationContainer
          borderBottom={this.props.borderBottom}
          borderTop={this.props.borderTop}
          onClick={this.showPersonalMessage}
        >
          <span>
            <FormattedMessage id="booking.accepted.allBookingInformation" />
          </span>
          <Image src={arrowDown} />
        </BookingInformationContainer>
      );
    } else {
      return (
        <div>
          <BookingInformationContainer
            borderBottom={this.props.borderBottom}
            borderTop={this.props.borderTop}
          >
            <Grid columns={3} divided>
              <CustomRow>
                <CustomColumn mobile={16}>
                  <InlineText bold primaryFont>
                    <FormattedMessage id="booking.accepted.personalMessage" />
                  </InlineText>
                </CustomColumn>
              </CustomRow>

              <CustomRow noPadding>
                <CustomColumn mobile={16}>
                  <PersonalMessageText>
                    {this.props.message ? this.props.message : ''}
                  </PersonalMessageText>
                </CustomColumn>
              </CustomRow>
            </Grid>
          </BookingInformationContainer>
          <CustomRow noPadding>
            <CustomColumn noPadding>
              <LinksSection
                onEdit={this.props.onEditBooking}
                onCancel={this.props.onCancelBooking}
                editAllowed={this.props.isEditable}
              />
            </CustomColumn>
          </CustomRow>
        </div>
      );
    }
  }
}

export default BookingInformation;
