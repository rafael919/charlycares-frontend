import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import proIcon from 'Assets/icons/icn-feature-pro.svg';
import firstAidIcon from 'Assets/icons/icn-feature-first-aid.svg';
import babyIcon from 'Assets/icons/icn-feature-baby.svg';
import insuranceIcon from 'Assets/icons/icn-feature-insurance.svg';
import licenceIcon from 'Assets/icons/icn-feature-driverslicence.svg';

import Toggle from 'Components/Toggle';

const Skills = ({ skills, driverLicense, onDriverLicenseStatusChange }) => {
  return (
    <Container>
      <HeadingContainer>
        <Heading>
          <FormattedMessage id="profile.angel.edit.skillsSectionHeading" />
        </Heading>
      </HeadingContainer>
      <IconsContainer>
        {skills.babysit_expertise && <Icon src={proIcon} />}
        {skills.first_aid && <Icon src={firstAidIcon} />}
        {skills.works_with_kids && <Icon src={babyIcon} />}
        {skills.liability_insurance && <Icon src={insuranceIcon} />}
      </IconsContainer>
      <LicenceContainer>
        <LicenceInnerContainer>
          <Icon src={licenceIcon} />
          <LicenceText>
            <FormattedMessage id="profile.angel.edit.canDrive" />
          </LicenceText>
        </LicenceInnerContainer>
        <Toggle
          name="driverLicence"
          onChange={onDriverLicenseStatusChange}
          value={driverLicense}
        />
      </LicenceContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 1.25rem 1rem 1.25rem;
`;

const Heading = styled.h2`
  font-family: ${props => props.theme.primaryFont};
  font-size: 1rem;
  margin-bottom: 0;
`;

const HeadingContainer = styled.div`
  position: relative;
  padding-bottom: 1rem;
`;

const IconsContainer = styled.div`
  display: flex;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.defaultGrey};
`;

const LicenceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0 0;
`;
const LicenceInnerContainer = styled.div`
  display: flex;
  align-items: center;
`;
const LicenceText = styled.div`
  font-size: 0.9375rem;
  font-weight: 300;
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 1.7rem;
`;

export default Skills;
