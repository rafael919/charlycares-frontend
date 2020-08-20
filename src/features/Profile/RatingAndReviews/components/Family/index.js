import { Rating } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
// import { FormattedMessage } from 'react-intl';

import arrowIcon from 'Assets/icons/btn-large-arrow-right.svg';
// import warningIcon from 'Assets/icons/warning.svg';
import placeholder from 'Assets/images/familyProfilePlaceholder.png';

const Container = styled.li`
  padding: 1.4375rem 1.9375rem 1.625rem 0.9375rem;
  display: flex;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
`;
const Section = styled.div`
  display: flex;
  flex-direction: ${({ column }) => (column ? 'column' : null)};
  justify-content: space-around;
  margin-right: 1rem;
`;
const Day = styled.p`
  font-family: ${({ theme }) => theme.primaryFont};
  font-size: 1rem;
  color: ${({ theme }) => theme.primaryText};
  margin-bottom: 0.2rem;
`;
const DateSection = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.secondaryFont};
  font-weight: 300;
  font-size: 0.875rem;
`;
const Image = styled.img`
  width: 4rem;
  height: 3rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  display: block;
  margin-right: 0.625rem;
`;

const Icon = styled.img`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
`;

// const WarningIcon = styled.img`
//   display: inline-block;
//   width: 1.125rem;
//   height: 1.125rem;
//   margin-left: 0.5rem;
// `;

// const WarningWrapper = styled.div`
//   font-size: 0.75rem;
//   color: #dd0000;
//   display: flex;
//   align-items: center;
// `;

const goToReview = (history, id, data) => () => {
  history.push('/profile/rating-reviews/' + id, data);
};

const Family = ({ data, history, onRate }) => {
  const startDate = moment(data.start_date ? data.start_date : data.created_at, 'YYYY-MM-DD HH:mm:ss');

  return (
    <Container onClick={goToReview(history, data.id, data)}>
      <Section>
        <Image src={data.family ? data.family.image : placeholder} />
        <div>
          <Day>{startDate.clone().format('dddd')}</Day>
          <DateSection>{startDate.clone().format('MMMM DD, YYYY')}</DateSection>
        </div>
      </Section>
      <Section column>
        <div>
          <Rating maxRating={5} disabled rating={data.rating} onRate={onRate} />
        </div>
      </Section>
      <Icon src={arrowIcon} />
    </Container>
  );
};

export default withRouter(Family);
