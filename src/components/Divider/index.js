import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

const Divider = styled.div`
  min-height: ${props =>
    props.children && !props.minheight
      ? '3rem'
      : !props.minheight
      ? '0.625rem'
      : props.minheight};
  min-width: 100%;
  height: ${({ height }) => (height ? height : null)};
  color: ${props => props.theme.lightGrey};
  background: #f9f8f9;
  border-top: ${props =>
    props.noTopBorder
      ? 0
      : isMobile || props.desktopBorderTop
      ? `1px solid ${props.theme.defaultGrey}`
      : 0};
  border-bottom: ${props =>
    props.noBottomBorder
      ? 0
      : isMobile || props.desktopBorderBottom
      ? `1px solid ${props.theme.defaultGrey}`
      : 0};
  text-align: ${props => (props.textAlign ? props.textAlign : 'left')};
  display: flex;
  justify-content: ${props =>
    props.right
      ? 'flex-end'
      : props.center
      ? 'center'
      : props.both
      ? 'space-between'
      : null};
  align-items: ${props =>
    props.right || props.center || props.both ? 'center' : 'flex-end'};
  padding: ${props =>
    props.padding
      ? props.padding
      : !isMobile
      ? '0 1rem 0.3rem 1rem'
      : '0 1rem'};
  font-size: 0.875rem;
  font-weight: 300;
  position: relative;
  ${!isMobile && 'margin: 0 -1rem;'};
  margin: ${props =>
    props.margin ? props.margin : !isMobile ? '0 -1rem' : ''};

  ${({ inner }) => {
    if (inner) {
      return `
        width: calc(100% + 4rem);
        margin-left: -2rem;
      `;
    }
    return null;
  }}
`;

export default Divider;
