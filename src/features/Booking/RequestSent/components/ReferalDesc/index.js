import React from 'react';
import styled from 'styled-components';
import { Image } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';

import presentIcon from 'Assets/icons/icn-present.svg';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const CustomImage = styled(Image)`
  &&& {
    margin-right: 0.9375rem;
  }
`;

const ReferalDesc = () => {
  return (
    <Wrapper>
      <CustomImage src={presentIcon} />
      <div>
        <Paragraph light>
          Ook zo tevreden over onze service? Raad deze dan aan aan jouw vrienden
          en ontvang €10,- oppastegoed voor elke aangedragen nieuwe
        </Paragraph>
      </div>
    </Wrapper>
  );
};

export default ReferalDesc;
