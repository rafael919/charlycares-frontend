import React from 'react';
import styled from 'styled-components';

import checkIcon from 'Assets/icons/btn-check-on.svg';
import addIcon from 'Assets/icons/btn-check-off.svg';

const Sitting = ({ selected }) => {
  return (
    <Container>
      <Heading>What kind of sitting are you looking for?</Heading>
      <Desc>Desired sitting duration</Desc>
      <ListOfDurations>
        <Duration selected={selected.includes('option1')}>
          <Text>2 to 4 hours</Text>
          <Button>
            <Icon src={selected.includes('option1') ? checkIcon : addIcon} />
          </Button>
        </Duration>
        <Duration selected={selected.includes('option2')}>
          <Text>4 to 6 hours</Text>
          <Button>
            <Icon src={selected.includes('option2') ? checkIcon : addIcon} />
          </Button>
        </Duration>
        <Duration selected={selected.includes('option3')}>
          <Text>> 6 hours</Text>
          <Button>
            <Icon src={selected.includes('option3') ? checkIcon : addIcon} />
          </Button>
        </Duration>
      </ListOfDurations>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid #e6e6e6;
`;

const Heading = styled.h1`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Desc = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.grey};
`;

const ListOfDurations = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  width: 100%;
`;

const Duration = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => !props.selected && props.theme.grey};
`;

const Text = styled.div`
  font-size: 0.9375rem;
`;

const Button = styled.button`
  padding: 0;
  border: 0;
  background-color: transparent;
`;
const Icon = styled.img``;

export default Sitting;
