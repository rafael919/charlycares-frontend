import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import EarnPointHelp from '../components/EarnPointHelp';

const Container = styled.ul`
  padding: 0;
  margin: 0;
  width: 100%;
  ${({ theme }) =>
    !isMobile &&
    `
    background:  #fff;    
    border: 1px solid ${theme.defaultGrey};
    border-radius: 0.3125rem;
    margin-bottom: 0.3125rem;
  `}

  & > li:last-child:after {
    display: none;
  }
`;

const EarnPointHelpList = ({
  earnPointHelpItems = [],
  history,
  togglePhoneModal,
}) => {
  return (
    <Container>
      {earnPointHelpItems.map((item, idx) => (
        <EarnPointHelp
          key={idx}
          item={item}
          history={history}
          togglePhoneModal={togglePhoneModal}
          last={idx === earnPointHelpItems.length - 1}
        />
      ))}
    </Container>
  );
};

export default EarnPointHelpList;
