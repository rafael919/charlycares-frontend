import React from 'react';
import styled from 'styled-components';
import selectedIcon from 'Assets/icons/btn-check-on.svg';
import addIcon from 'Assets/icons/add-btn.svg';

const Container = styled.li`
  display: flex;
  position: relative;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.defaultBtnBackgroundColor};
  ${({ weekend }) => {
    if (weekend) {
      return `
        &:after {
          content: "";
          position: absolute;
          width: calc(100% + 2rem);
          height: 100%;
          left: -1rem;
          top: 0;
          background: rgba(255,253,141,0.2);
          z-index: -1;
        }
      `;
    }
    return null;
  }}
`;
const Button = styled.button`
  display: block;
  background: transparent;
  border: 0;
  cursor: pointer;
  transform: translate3d(0, 0, 0);
`;
const Icon = styled.img`
  cursor: pointer;
`;

const Column = styled.div`
  flex: 1.8;
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'left')};
`;
const ButtonContainer = styled.div`
  justify-content: center;
  display: flex;
  flex: 1;
  cursor: pointer;
`;
const DayName = styled.span`
  font-size: 0.9375rem;
`;

const Day = ({ day, data, onStatusChange, weekend }) => {
  if (!data) return null;
  return (
    <Container weekend={weekend}>
      <Column>
        <DayName>{day}</DayName>
      </Column>
      <ButtonContainer>
        <Button onClick={onStatusChange(data.day_of_week, 'morning')}>
          <Icon src={data.morning === 0 ? addIcon : selectedIcon} />
        </Button>
      </ButtonContainer>
      <ButtonContainer>
        <Button onClick={onStatusChange(data.day_of_week, 'afternoon')}>
          <Icon src={data.afternoon === 0 ? addIcon : selectedIcon} />
        </Button>
      </ButtonContainer>
      <ButtonContainer>
        <Button onClick={onStatusChange(data.day_of_week, 'evening')}>
          <Icon src={data.evening === 0 ? addIcon : selectedIcon} />
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default Day;
