import { Accordion, AccordionItem } from 'react-sanfona';
import { Image } from 'semantic-ui-react';
import React from 'react';
import styled from 'styled-components';

import Container from './components/Container';
import Wrapper from './components/Wrapper';

import addBtnIcon from '../../../assets/icons/btn-large-add.svg';

const CustomImage = styled(Image)`
  &&& {
    width: 2rem;
    height: 2rem;
  }
`;

const ViewContainer = styled.div`
  padding-top: 1rem;
  padding-bottom: 3rem;
`;

const ButtonContainer = styled.div`
  width: 2rem;
  margin-top: -0.325rem;
`;
class SupportHomeDesktop extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <Container>
          <ViewContainer>
            <Accordion>
              {this.props.bookings && this.props.bookings[0]
                ? this.props.bookings[0].items.map(item => {
                    return (
                      <AccordionItem
                        key={item.id}
                        style={{ marginBottom: 20 }}
                        title={
                          <div
                            style={{ display: 'flex', flexDirection: 'row' }}
                          >
                            <ButtonContainer>
                              <CustomImage src={addBtnIcon} />
                            </ButtonContainer>
                            <div
                              style={{
                                fontSize: 15,
                                marginLeft: 15,
                                color: 'rgb(53,50,58)',
                                width: '100%',
                              }}
                            >
                              {`${item.title}`}
                            </div>
                          </div>
                        }
                        expanded={item === 1}
                      >
                        <div
                          style={{
                            fontSize: 15,
                            marginLeft: 30,
                            marginTop: 5,
                            marginBottom: 10,
                            color: 'rgb(117,116,121)',
                            whiteSpace: 'pre-line',
                          }}
                        >
                          {`${item.body}`}
                        </div>
                      </AccordionItem>
                    );
                  })
                : null}
            </Accordion>
          </ViewContainer>
        </Container>
      </Wrapper>
    );
  }
}

export default SupportHomeDesktop;
