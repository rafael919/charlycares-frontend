import React from 'react';
import styled from 'styled-components';
import { Paragraph } from 'Components/Text';
import { FormattedMessage } from 'react-intl';
import placeholder from 'Assets/images/familyProfilePlaceholder.png';

const Description = ({ name, img, bio }) => {
  return (
    <Container>
      <div>
        <FamilyImage src={img ? img : placeholder} />
      </div>
      <TextWrapper>
        <FamilyName>
          <FormattedMessage id="profile.family.familyName" values={{ name }} />
        </FamilyName>
        <Paragraph light fontSize="0.9375rem">
          {bio}
        </Paragraph>
      </TextWrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem 0;
`;

const FamilyImage = styled.img`
  width: 100%;
  max-width: 100%;
  height: 14.25rem;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.defaultBtnBackgroundColor};
`;

const TextWrapper = styled.div`
  padding-bottom: 1rem;
`;
const FamilyName = styled.div`
  font-family: ${props => props.theme.primaryFont};
  padding: 1rem 0;
  font-size: 1.25rem;
`;

export default Description;
