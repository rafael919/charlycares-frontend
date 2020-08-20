import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Layout from 'Components/Layout';
import React from 'react';
import { FormattedMessage, injectIntl} from 'react-intl';
import Type from './components/Type';

import fixedIcon from 'Assets/icons/icn-fixed-sitter.svg';
import lastMinuteIcon from 'Assets/icons/icn-last-minute-sitter.svg';
import flexIcon from 'Assets/icons/icn-flex-sitter.svg';
import afterSchoolIcon from 'Assets/icons/icn-after-school-sitter.svg';
import styled from 'styled-components';


const Header = styled.h4`
  margin-top: 0.5rem !important;
`;

const navigateToBookingCreate = (history, type) => () => {
  history.push('/booking/create');
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {  
    window.analytics.track('FBabysitterNeeds', {
      type: type
    });
  }
}


const BabysittingType = ({ history, intl }) => {
  return (
    <Layout
      navBorder
      onNavBack={history.goBack}
    >
      <CustomRow>
        <CustomColumn>
          <Header>
            <FormattedMessage
              id='booking.babysitting.types.header'
            />
          </Header>
          <Type 
            header={intl.formatMessage({
                  id: 'booking.babysitting.types.title1',
                })}
            explanation={intl.formatMessage({
                  id: 'booking.babysitting.types.explanation1',
                })}
            icon={flexIcon}
            onClick={navigateToBookingCreate(history, 'flexible')}
          />
          <Type 
            header={intl.formatMessage({
                  id: 'booking.babysitting.types.title2',
                })}
            explanation={intl.formatMessage({
                  id: 'booking.babysitting.types.explanation2',
                })}
            icon={lastMinuteIcon}
            onClick={navigateToBookingCreate(history, 'last_minute')}
          />
          <Type 
            header={intl.formatMessage({
                  id: 'booking.babysitting.types.title3',
                })}
            explanation={intl.formatMessage({
                  id: 'booking.babysitting.types.explanation3',
                })}
            icon={fixedIcon}
            onClick={navigateToBookingCreate(history, 'recurring')}
          />
          <Type 
            header={intl.formatMessage({
                  id: 'booking.babysitting.types.title4',
                })}
            explanation={intl.formatMessage({
                  id: 'booking.babysitting.types.explanation4',
                })}
            icon={afterSchoolIcon}
            onClick={navigateToBookingCreate(history, 'after_school')}
          />
        </CustomColumn>
      </CustomRow>
    </Layout>
  );
};

export default injectIntl(BabysittingType);
