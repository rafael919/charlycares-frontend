import React from 'react';
import styled from 'styled-components';
import CustomLink from 'Components/CustomLink';
import { FormattedMessage } from 'react-intl';

import arrowRight from 'Assets/icons/btn-large-arrow-right.svg';

const cutBio = bio => {
  if (!bio) return;
  return bio
    .split(' ')
    .slice(0, 20)
    .join(' ');
};

const navigateToProfileEdit = history => () => {
  history.push('/profile/edit');
};

const ProfileSection = ({
  role,
  profile = { family: { short_bio: '' } },
  history,
}) => {
  return (
    <Container onClick={navigateToProfileEdit(history)}>
      <Header>
        <FormattedMessage
          id="profile.family.familyName"
          values={{ name: profile.last_name }}
        />
      </Header>
      <FamilyContainer>
        {profile.image ? (
          role === 'family' ? (
            <FamilyImage src={profile.image} />
          ) : (
            <AngelImage src={profile.image} />
          )
        ) : (
          <ImagePlaceholder>
            <FormattedMessage id="profile.family.addPhoto" />
          </ImagePlaceholder>
        )}
        {!profile.family.short_bio.length ? (
          <FamilyDescContainer>
            <FamilyDesc>
              <FormattedMessage id="profile.family.noDesc" />
            </FamilyDesc>
            <div>
              <CustomLink fontSize="0.8125rem" to="/profile/edit">
                <FormattedMessage id="profile.family.edit" />
              </CustomLink>
            </div>
          </FamilyDescContainer>
        ) : (
          <FamilyDescContainer>
            <FamilyDesc>{cutBio(profile.family.short_bio)}</FamilyDesc>
            <div>
              <CustomLink fontSize="0.8125rem" to="/profile/edit">
                <FormattedMessage id="profile.family.edit" />
              </CustomLink>
            </div>
          </FamilyDescContainer>
        )}

        <ArrowContainer>
          <Icon src={arrowRight} />
        </ArrowContainer>
      </FamilyContainer>
      {!profile.image && (
        <ProfileInfo>
          <FormattedMessage id="profile.family.info" />
        </ProfileInfo>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
  width: 100%;
`;

const Header = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
`;

const FamilyContainer = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  padding-bottom: 1.125rem;
`;

const ImagePlaceholder = styled.div`
  width: 21.866667vw;
  height: 21.866667vw;
  padding: 1rem 0.3rem;
  border-radius: 50%;
  color: ${props => props.theme.secondaryColor};
  background: #f9f8f9;
  border: 1px solid ${props => props.theme.defaultGrey};
  font-size: 0.8125rem;
  text-align: center;
  line-height: 1.31;
  margin-right: 0.875rem;
`;

const FamilyImage = styled.img`
  width: 10.25rem;
  height: 6.83rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.defaultBtnBackgroundColor};
  margin-right: 2.1334vw;
`;

const AngelImage = styled.img`
  width: 21.866667vw;
  height: 21.866667vw;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.defaultGrey};
  margin-right: 2.1334vw;
`;

const FamilyDescContainer = styled.div`
  padding-top: 0.5rem;
  max-width: 13.0625rem;
`;

const FamilyDesc = styled.div`
  font-size: 0.75rem;
  font-weight: 300;
  line-height: 1.25;
`;

const ArrowContainer = styled.div`
  border: 0;
  background: transparent;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const Icon = styled.img``;

const ProfileInfo = styled.p`
  font-size: 0.9375rem;
  line-height: 1.47;
  font-weight: 300;
  position: relative;
  border-left: 2px solid ${props => props.theme.secondaryColor};
  padding: 0.1rem 0 0.3rem 1rem;
`;

export default ProfileSection;
