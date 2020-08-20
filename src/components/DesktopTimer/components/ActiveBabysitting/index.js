import { getAge } from 'Utils';
import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Timer from './components/Timer';
import Family from './components/Family';

import Angel from './components/Angel';
const AngelWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ActiveBabySitting = ({
  activeBabysitting = {},
  onShowModal,
  history,
  role,
  togglePhoneModal,
  minimized,
}) => {
  return (
    <AngelWrapper>
      {activeBabysitting && !minimized ? (
        role === 'family' ? (
          <Angel
            div
            id={activeBabysitting.angel.id}
            img={activeBabysitting.angel.image}
            name={activeBabysitting.angel.first_name}
            age={getAge(activeBabysitting.angel.birthdate)}
            role={role}
            userId={activeBabysitting.angel.user_id}
            history={history}
            newMessage={activeBabysitting.angel.unread_message_count}
            togglePhoneModal={togglePhoneModal}
          />
        ) : (
          <Family
            div
            id={activeBabysitting.family.id}
            img={activeBabysitting.family.image}
            name={activeBabysitting.family.last_name}
            role={role}
            userId={activeBabysitting.family.user_id}
            history={history}
            newMessage={activeBabysitting.family.new_messages}
            togglePhoneModal={togglePhoneModal}
          />
        )
      ) : null}
      {activeBabysitting && activeBabysitting.angel ? (
        <Timer
          minimized={minimized}
          onShowModal={onShowModal}
          startTime={activeBabysitting.start_time}
          transactionCosts={activeBabysitting.transactioncosts}
          credit={activeBabysitting.credit}
          bookingId={activeBabysitting.booking_id}
          angel={activeBabysitting.angel}
          role={role}
        />
      ) : null}
    </AngelWrapper>
  );
};

export default withRouter(ActiveBabySitting);
