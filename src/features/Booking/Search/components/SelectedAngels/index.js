import { Image } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';
import React from 'react';
import styled from 'styled-components';
import placeholder from 'Assets/images/profile-placeholder.png';

const SelectedContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding-bottom: 0.22rem;
`;

const ImagesContainer = styled.div`
  display: flex;
  flex: 1.5;
  flex-wrap: wrap;
`;

const AdviceContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`;

const AdviceRow = styled.div`
  text-align: left;
  font-size: 0.75rem;
  color: ${props => props.theme.grey};
`;

const CustomImage = styled(Image)`
  &&& {
    width: ${isMobile ? '2.3rem' : '2.5625rem'};
    height: ${isMobile ? '2.3rem' : '2.5625rem'};
    margin-right: 0.5rem;
    margin-top: 0.3rem;
    border: 1px solid #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  }
`;

const SelectedAngels = ({ selectedAngels = [], maxAngels }) => {
  return (
    <SelectedContainer>
      {selectedAngels.length > 0 && (
        <ImagesContainer>
          {selectedAngels.map((angel, i) => {
            const ifAngelImg = (angel => {
              if (angel) {
                if (angel.image) return angel.image;
                if (angel.profile && angel.profile.image)
                  return angel.profile.image;
                return placeholder;
              }
              return placeholder;
            })(angel);
            return <CustomImage circular key={i} src={ifAngelImg} />;
          })}
        </ImagesContainer>
      )}
      <AdviceContainer>
        {Boolean(maxAngels) ? (
          <AdviceRow>
            <FormattedMessage
              id="booking.offers.addAngelsDesc"
              values={{ max: maxAngels }}
            />
          </AdviceRow>
        ) : (
          <React.Fragment>
            <AdviceRow>
              <FormattedMessage id="booking.search.advice" />
            </AdviceRow>
            <AdviceRow>
              <FormattedMessage id="booking.search.adviceDesc" />
            </AdviceRow>
          </React.Fragment>
        )}
      </AdviceContainer>
    </SelectedContainer>
  );
};

export default SelectedAngels;
