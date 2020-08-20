import infoIcon from 'Assets/icons/btn-info.svg';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import { InlineText } from 'Components/Text';
import React from 'react';
import { Image } from 'semantic-ui-react';

const InfoLink = CustomLink.extend`
  &&& {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const FeatureDesc = ({ feature, desc, info }) => {
  return (
    <CustomRow padding="0 0 1rem 0">
      <CustomColumn padding="0 0 0 1rem" textAlign="left" width={5}>
        <InlineText fontSize="0.875rem">{feature}</InlineText>
      </CustomColumn>
      <CustomColumn textAlign="left" width={11}>
        <InlineText light fontSize="0.9375rem">
          {desc}
        </InlineText>
        {info && (
          <InfoLink to={info}>
            <Image src={infoIcon} />
          </InfoLink>
        )}
      </CustomColumn>
    </CustomRow>
  );
};

export default FeatureDesc;
