import { Grid, Container } from 'semantic-ui-react';
import { isIOS, isMobile } from 'react-device-detect';
import NavigationHeader from 'Components/NavigationHeader';
import React from 'react';
import styled from 'styled-components';

const CustomGrid = ({
  marginTop,
  marginBottom,
  backgroundColor,
  padding,
  longTitle,
  ...rest
}) => <Grid {...rest} />;

const StyledGrid = styled(CustomGrid)`
  &&& {
    height: 100%;
    overflow-x: ${isMobile ? 'hidden' : null};
    padding: ${props => props.padding && props.padding};
    margin-top: ${props => (props.marginTop ? props.marginTop : 0)};
    margin-bottom: ${props => (props.marginBottom ? props.marginBottom : 0)};
    background-color: ${props =>
      props.backgroundColor && props.backgroundColor};
    padding-top: 2.78rem !important;
    &::-webkit-scrollbar {
      background-color: #f9f8f9;
      display: none;
    }
  }
`;

const StyledContainer = styled(Container)`
  &&& {
    height: 100%;
    will-change: auto;
    backface-visibility: hidden;
    ${isIOS && `height: 100% !important;`};
  }
`;

export default class Layout extends React.Component {
  render() {
    const {
      children,
      fluid,
      marginTop,
      padding,
      marginBottom,
      onNavBack = null,
      onNavClose = null,
      navLeftComponent,
      navRightComponent,
      navTitle = null,
      navSubTitle = null,
      navBorder = null,
      noNav,
      backgroundColor,
      withDays,
      noBPadding,
      flexcenteritem,
      paddingrightitem,
      margincenteritem,
      leftcenter,
    } = this.props;

    return (
      <StyledContainer fluid={fluid}>
        {!noNav ? (
          <NavigationHeader
            leftComponent={navLeftComponent}
            rightComponent={navRightComponent}
            title={navTitle}
            subTitle={navSubTitle}
            border={navBorder}
            onBack={onNavBack}
            onClose={onNavClose}
            withDays={withDays}
            noBPadding={noBPadding}
            flexcenteritem={flexcenteritem}
            paddingrightitem={paddingrightitem}
            margincenteritem={margincenteritem}
            leftcenter={leftcenter}
          />
        ) : null}
        <StyledGrid
          backgroundColor={backgroundColor}
          marginTop={marginTop}
          marginBottom={marginBottom}
          padding={padding}
          id="grid"
        >
          {children}
        </StyledGrid>
      </StyledContainer>
    );
  }
}
