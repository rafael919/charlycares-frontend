import { Image, Header } from 'semantic-ui-react';
import React from 'react';
import styled from 'styled-components';
import CustomLink from 'Components/CustomLink';

import babyIcon from 'Assets/icons/icn-feature-baby.svg';
import driverIcon from 'Assets/icons/icn-feature-driverslicence.svg';
import firstAidIcon from 'Assets/icons/icn-feature-first-aid-large.svg';
import insuranceIcon from 'Assets/icons/icn-feature-insurance.svg';
import proIcon from 'Assets/icons/icn-feature-pro-large.svg';

const Skill = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
`;

const SkillsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Wrapper = styled.div`
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  padding: 1rem 0;
`;

const Skills = () => {
  return (
    <Wrapper>
      <Header textAlign="left" as="h5">
        Skills & Experiences
      </Header>
      <SkillsContainer>
        <Skill>
          <Image src={proIcon} />
        </Skill>
        <Skill>
          <Image src={firstAidIcon} />
        </Skill>
        <Skill>
          <Image src={babyIcon} />
        </Skill>
        <Skill>
          <Image src={driverIcon} />
        </Skill>
        <Skill>
          <Image src={insuranceIcon} />
        </Skill>
        <Skill>
          <CustomLink fontSize="1.25rem" to="/booking/angel">
            +6
          </CustomLink>
        </Skill>
      </SkillsContainer>
    </Wrapper>
  );
};

export default Skills;
