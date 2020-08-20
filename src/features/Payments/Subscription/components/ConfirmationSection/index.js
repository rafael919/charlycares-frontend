import React from 'react';
import styled from 'styled-components';
import BasicButton from 'Components/Buttons/Basic';

const ConfrimationSection = ({ sum }) => {
  return (
    <div>
      <Description>
        Je kunt het openstaande bedrag direct betalen, je wordt naar onze
        betaalpagina geleid
      </Description>
      <div>
        <BasicButton fluid primary>
          Pay now € {sum}-
        </BasicButton>
      </div>
    </div>
  );
};

const Description = styled.p`
  font-weight: 300;
  font-size: 0.75rem;
  text-align: left;
`;

export default ConfrimationSection;
