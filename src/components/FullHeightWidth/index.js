import styled from 'styled-components';
import React from 'react';
import WithRole from 'Components/WithRole';

const SFullHeightWidth = styled.div`
  min-height: 100% !important;
  height: 100% !important;
  margin: auto;
  ${({ role }) => {
    return role ? `width: calc(949.4px + 2rem)!important;` : ``;
  }};
`;

const FullHeightWidth = ({ children }) => {
  return (
    <WithRole>
      {role => <SFullHeightWidth role={role}>{children}</SFullHeightWidth>}
    </WithRole>
  );
};

export default FullHeightWidth;
