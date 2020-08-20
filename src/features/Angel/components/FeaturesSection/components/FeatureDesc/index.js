import { Image } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import React from 'react';
import styled from 'styled-components';

import infoIcon from 'Assets/icons/btn-info.svg';

const InfoLink = styled.div`
  &&& {
    position: absolute;
    right: 4.3%;
    top: 50%;
    transform: translateY(-75%);
  }
`;
const Container = styled.div`
  padding: 0 0 1rem;
  display: flex;
  width: 100%;
  position: relative;
`;

const TitleContainer = styled.div`
  width: 30%;
  margin-right: 7%;
`;

const Value = styled.div`
  width: 63%;
`;

const FeatureDesc = ({ feature, desc, info }) => {
  return (
    <Container>
      <TitleContainer>
        <InlineText fontSize="0.875rem">{feature}</InlineText>
      </TitleContainer>
      <Value>
        <InlineText light fontSize="0.9375rem">
          {desc}
        </InlineText>
        {info && (
          <InfoLink onClick={info}>
            <Image src={infoIcon} />
          </InfoLink>
        )}
      </Value>
    </Container>
  );
};

export default FeatureDesc;
