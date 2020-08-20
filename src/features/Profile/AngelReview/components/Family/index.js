import { FormattedMessage } from 'react-intl';
import { Header } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
import React from 'react';
import styled from 'styled-components';

import placeholder from 'Assets/images/profile-placeholder.png';
import arrowRightIcon from 'Assets/icons/btn-large-arrow-right.svg';

const FamilyInfoContainer = styled.button`
  position: relative;
  flex: 1.7;
  padding: 0;
  padding-top: 0.5rem;
  border: 0;
  background: transparent;
  &:focus {
    outline: 0;
  }
  align-self: baseline;
`;

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 1.5rem;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  margin-right: 0.75rem;
  height: 5rem;
`;

const SectionWrapper = styled.div`
  width: 100%;
  padding: ${isMobile ? '1rem' : 0};
  padding-top: 1.5rem;
  position: relative;
  background-color: #fff;
`;

const FamilyImage = styled.img`
  width: 7.5rem;
  border: 1px solid ${({ theme }) => theme.defaultBtnBackgroundColor};
  border-radius: 4px;
  height: auto;
`;

const FamilyInfo = styled.div`
  font-size: 0.75rem;
  font-weight: 300;
  line-height: 1.3;
  text-align: left;
  margin-right: 2rem;
`;

const ArrowRightBtn = styled.img`
  position: absolute;
  right: 0rem;
  bottom: 0rem;
`;

const cutBio = bio => {
  if (!bio) return;
  if(bio.length >= 135) {
    return bio.slice(0, 135) + '...';
  }
  return bio;
};

const FamilySection = ({
  img,
  name,
  shortBio,
  onFamilySelect
}) => {
  return (
    <SectionWrapper>
      <Header as="h3">
        <FormattedMessage
          id="booking.angel.offers.details.familyName"
          values={{ name: name }}
        />
      </Header>
      <InfoContainer>
        <ImageContainer>
          <FamilyImage src={img ? img : placeholder} />
        </ImageContainer>
        <FamilyInfoContainer onClick={onFamilySelect}>
          <FamilyInfo>{cutBio(shortBio)}</FamilyInfo>
          <ArrowRightBtn src={arrowRightIcon} />
        </FamilyInfoContainer>
      </InfoContainer>
    </SectionWrapper>
  );
};

export default FamilySection;
