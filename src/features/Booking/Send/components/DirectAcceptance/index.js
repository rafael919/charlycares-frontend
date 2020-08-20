import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Angel from './components/Angel';
import AngelsList from './components/AngelsList';
import Description from './components/Description';

const DirectAcceptance = ({
  selectedAngels = [],
  onToggleAngelApproval,
  approval,
}) => (
  <React.Fragment>
    <CustomRow padding="0 0 2rem 0">
      <CustomColumn padding="0 0 1rem 0">
        <FormattedMessage id="booking.create.send.directAcceptanceTitle" />
      </CustomColumn>
      <CustomColumn padding="0 0 1rem 0">
        <Description>
          <FormattedMessage id="booking.create.send.directAcceptanceExplanation" />
        </Description>
      </CustomColumn>
      <CustomColumn>
        <AngelsList>
          {selectedAngels.map(angel => (
            <Angel
              key={angel.id}
              approval={approval}
              onToggleAngelApproval={onToggleAngelApproval(angel.id)}
              img={angel.image}
              name={angel.first_name}
              liked={angel.is_liked}
              forApproval={approval.includes(angel.id)}
            />
          ))}
        </AngelsList>
      </CustomColumn>
    </CustomRow>
  </React.Fragment>
);

export default DirectAcceptance;
