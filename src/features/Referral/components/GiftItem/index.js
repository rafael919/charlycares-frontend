import { isMobile } from 'react-device-detect';
import React from 'react';
import styled from 'styled-components';
import ProfilePlaceHolder from 'Assets/images/profile-placeholder.png'

const GiftItem = ({
  img,
  amount,
  text,
}) => {
  return (
    <Container >
      <ImageAndDateContainer>
        <div style = {{marginTop : 10}}> 
          <Image src={img != null ? img : ProfilePlaceHolder} />
        </div>
        <div style = {{marginLeft : 15 , marginTop : 25}}>
            <div style = {{textAlign : 'left',display : 'flex',flexDirection : 'row'}}>
              <Day>
                <div dangerouslySetInnerHTML={text}></div>
              </Day>
              {amount > 0 && <Amount>{amount}</Amount>}
            </div>
        </div>
      </ImageAndDateContainer>

    </Container>
  )
};

const Container = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  align-items : center;
  width: 100%;
  height : 110px;
  padding: 1rem 1rem;
  cursor: pointer;
  background: #daf5d4;
  margin-bottom: 2rem;
  ${({ theme }) =>
    !isMobile &&
    `
    background:  '#daf5d4';
    border-radius: 0.3125rem;
    margin-bottom: 0.3125rem;
  `}
`;


const ImageAndDateContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 5rem;
  height: 5rem;
  margin-right: 0.925rem;
  margin-left : 0.5rem;
  border: 1px solid ${props => props.theme.defaultGrey};
  border-radius: 50%;
`;

const Day = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-weight: 600;
  font-size: 1rem;
  flex-direction : row;
`;
const Amount = styled.div`
  font-family: ${props => props.theme.primaryFont};
  
  font-size: 0.9rem;
  color : #fff;
  background : #ff4f81;
  width : 3.5rem;
  height : 1.5rem;
  margin-left : 0.8rem;
  border-radius : 0.3125rem;
  justify-content : center;
  align-items : center;
  display : flex;
`;

export default GiftItem;
