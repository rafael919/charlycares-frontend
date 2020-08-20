import React from 'react';
import styled from 'styled-components';
import BasicButton from 'Components/Buttons/Basic';

const ConfirmationSection = ({
  sendExport,
}) => {
  return (
    <div>
      <Description>
        Je krijgt een uitgebreid oppasoverzicht van de hierboven geselecteerde
        (geslaagde) betalingen per mail toegestuurd
      </Description>
      <div>
        <BasicButton primary fluid onClick={sendExport} >
          Send by email
        </BasicButton>
      </div>
    </div>
  );
};

const Description = styled.div`
  font-weight: 300;
  font-size: 0.75rem;
  line-height: 1.42;
  padding-bottom: 0.5rem;
`;

export default ConfirmationSection;
