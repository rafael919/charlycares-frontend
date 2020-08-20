import { FormattedMessage } from 'react-intl';
import { Image, Header } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
import React from 'react';
import styled from 'styled-components';

import babyIcon from 'Assets/icons/icn-feature-baby.svg';
import driverIcon from 'Assets/icons/icn-feature-driverslicence.svg';
import firstAidIcon from 'Assets/icons/icn-feature-first-aid.svg';
import insuranceIcon from 'Assets/icons/icn-feature-insurance.svg';
import workingWithKidsIcon from 'Assets/icons/icn-feature-pro.svg';

const Skill = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  margin-right: ${isMobile ? '8vw' : 0};
`;

const SkillsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Wrapper = styled.div`
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  padding: 1rem 0;
`;

const Skills = ({
  workingWithKids,
  pro,
  firstAid,
  baby,
  driver,
  insurance,
}) => {
  return (
    <Wrapper>
      <Header textAlign="left" as="h5">
        <FormattedMessage id="angel.skills.header" />
      </Header>
      <SkillsContainer>
        {workingWithKids && (
          <Skill>
            <Image src={workingWithKidsIcon} />
          </Skill>
        )}
        {pro && (
          <Skill>
            <Image src={workingWithKidsIcon} />
          </Skill>
        )}
        {firstAid && (
          <Skill>
            <Image src={firstAidIcon} />
          </Skill>
        )}
        {baby <= 24 && (
          <Skill>
            <Image src={babyIcon} />
          </Skill>
        )}
        {driver && (
          <Skill>
            <Image src={driverIcon} />
          </Skill>
        )}
        {insurance && (
          <Skill>
            <Image src={insuranceIcon} />
          </Skill>
        )}

        {/* <Skill>
          <CustomLink fontSize="1.25rem" to="/booking/angel">
            +6
          </CustomLink>
        </Skill> */}
      </SkillsContainer>
    </Wrapper>
  );
};

export default Skills;
