import { Grid, Container } from 'semantic-ui-react';
import Background from 'Components/Background';
import FullHeight from 'Components/FullHeight';
import Logo from './components/Logo';
import React from 'react';
import backgroundImg from 'Assets/images/website-frontpage.jpg';
import logo2 from 'Assets/images/logo2.png';

export default ({ children, withLogo }) => {
  const scrollable = {
    overflow: 'auto', 
    height: '85vh', 
  }
  return (
    <Container style={scrollable} as={FullHeight} fluid>
      {withLogo && <Logo src={logo2} />}
      <Grid padded as={FullHeight}>
        <Grid.Column only="computer" stretched computer={5} widescreen={7}>
          <Background src={backgroundImg} />
        </Grid.Column>
        <Grid.Column
          verticalAlign="middle"
          widescreen={9}
          computer={11}
          tablet={16}
          mobile={16}
        >
          <Grid centered verticalAlign="middle">
            {children}
          </Grid>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
