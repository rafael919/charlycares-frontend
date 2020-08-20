import { Image } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';

const SelectedContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding-bottom: 0.22rem;
`;

const ImagesContainer = styled.div`
  display: flex;
  flex: 1;
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
    width: 41px;
    height: 41px;
  }
`;

const SelectedAngels = ({ selectedAngels = [] }) => {
  return (
    <SelectedContainer>
      <ImagesContainer>
        {selectedAngels.map((angel, i) => (
          <CustomImage key={i} src={angel.img} />
        ))}
      </ImagesContainer>
      <AdviceContainer>
        <AdviceRow>
          <FormattedMessage id="booking.search.advice" />
        </AdviceRow>
        <AdviceRow>
          <FormattedMessage id="booking.search.adviceDesc" />
        </AdviceRow>
      </AdviceContainer>
    </SelectedContainer>
  );
};

export default SelectedAngels;
