import { css } from 'styled-components';
import { isMobile } from 'react-device-detect';

const global = css`
  html,
  body,
  #root {
    height: 100%;
    width: 100%;
  }

  body {
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
  }

  .dimmed.dimmable > .ui.animating.dimmer,
  .dimmed.dimmable > .ui.visible.dimmer,
  .ui.active.dimmer {
    overflow: auto !important;
  }

  ${isMobile
    ? `.dimmer.visible.transition {
    display: flex !important;
    justify-content: flex-end !important;
  }`
    : null};

  ${!isMobile
    ? `
    .modals.dimmer .ui.scrolling.modal {
      overflow-y: hidden !important;
    }


    `
    : null}

  .main {
    width: 100%;
  }

  .tick {
    background: red;
  }

  .page-wrapper {
    height: 100%;
  }

  .fade-appear {
    opacity: 0;
    transform: translateX(-200px);
    z-index: 1;
  }

  .fade-enter {
    opacity: 0;
    transform: translateX(-200px);
    z-index: 1;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 600ms ease-in, transform 600ms ease-in;
  }

  .ui.modal {
    position: absolute;
  }

  .carousel .control-dots {
    padding-left: 0px;
  }

  .carousel-wrapper,
  .carousel,
  .carousel > .slider-wrapper,
  .carousel > .slider-wrapper > .slider {
    height: 100%;
  }
  
  ${!isMobile &&
    `
    body {
      background: #f9f8f9;
      overflow-y: hidden; 
    }

    #root {
      overflow-x: hidden; 
      overflow-y: hidden;
    }

  .rdt {
    position: absolute;
  }

  .rdt-relative {
    position: relative;
    display: flex;
    align-items: center;
  }

  .rdtPicker {
    display: none;
    position: absolute;
    width: 250px;
    padding: 4px;
    margin-top: 1px;
    z-index: 99999 !important;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #f9f9f9;
  }
  .rdtOpen .rdtPicker {
    display: block;
  }
  .rdtStatic .rdtPicker {
    box-shadow: none;
    position: absolute;
  }

  .rdtPicker .rdtTimeToggle {
    text-align: center;
  }

  .rdtPicker table {
    width: 100%;
    margin: 0;
  }
  .rdtPicker td,
  .rdtPicker th {
    text-align: center;
    height: 28px;
  }
  .rdtPicker td {
    cursor: pointer;
  }
  .rdtPicker td.rdtDay:hover,
  .rdtPicker td.rdtHour:hover,
  .rdtPicker td.rdtMinute:hover,
  .rdtPicker td.rdtSecond:hover,
  .rdtPicker .rdtTimeToggle:hover {
    background: #eeeeee;
    cursor: pointer;
  }
  .rdtPicker td.rdtOld,
  .rdtPicker td.rdtNew {
    color: #999999;
  }
  .rdtPicker td.rdtToday {
    position: relative;
  }
  .rdtPicker td.rdtToday:before {
    content: '';
    display: inline-block;
    border-left: 7px solid transparent;
    border-bottom: 7px solid #428bca;
    border-top-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    bottom: 4px;
    right: 4px;
  }
  .rdtPicker td.rdtActive,
  .rdtPicker td.rdtActive:hover {
    background-color: #428bca;
    color: #fff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  }
  .rdtPicker td.rdtActive.rdtToday:before {
    border-bottom-color: #fff;
  }
  .rdtPicker td.rdtDisabled,
  .rdtPicker td.rdtDisabled:hover {
    background: none;
    color: #999999;
    cursor: not-allowed;
  }

  .rdtPicker td span.rdtOld {
    color: #999999;
  }
  .rdtPicker td span.rdtDisabled,
  .rdtPicker td span.rdtDisabled:hover {
    background: none;
    color: #999999;
    cursor: not-allowed;
  }
  .rdtPicker th {
    border-bottom: 1px solid #f9f9f9;
  }
  .rdtPicker .dow {
    width: 14.2857%;
    border-bottom: none;
    cursor: default;
  }
  .rdtPicker th.rdtSwitch {
    width: 100px;
  }
  .rdtPicker th.rdtNext,
  .rdtPicker th.rdtPrev {
    font-size: 21px;
    vertical-align: top;
  }

  .rdtPrev span,
  .rdtNext span {
    display: block;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
  }

  .rdtPicker th.rdtDisabled,
  .rdtPicker th.rdtDisabled:hover {
    background: none;
    color: #999999;
    cursor: not-allowed;
  }
  .rdtPicker thead tr:first-child th {
    cursor: pointer;
  }
  .rdtPicker thead tr:first-child th:hover {
    background: #eeeeee;
  }

  .rdtPicker tfoot {
    border-top: 1px solid #f9f9f9;
  }

  .rdtPicker button {
    border: none;
    background: none;
    cursor: pointer;
  }
  .rdtPicker button:hover {
    background-color: #eee;
  }

  .rdtPicker thead button {
    width: 100%;
    height: 100%;
  }

  td.rdtMonth,
  td.rdtYear {
    height: 50px;
    width: 25%;
    cursor: pointer;
  }
  td.rdtMonth:hover,
  td.rdtYear:hover {
    background: #eee;
  }

  .rdtCounters {
    display: inline-block;
  }

  .rdtCounters > div {
    float: left;
  }

  .rdtCounter {
    height: 100px;
  }

  .rdtCounter {
    width: 40px;
  }

  .rdtCounterSeparator {
    line-height: 100px;
  }

  .rdtCounter .rdtBtn {
    height: 40%;
    line-height: 40px;
    cursor: pointer;
    display: block;

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
  }
  .rdtCounter .rdtBtn:hover {
    background: #eee;
  }
  .rdtCounter .rdtCount {
    height: 20%;
    font-size: 1.2em;
  }

  .rdtMilli {
    vertical-align: middle;
    padding-left: 8px;
    width: 48px;
  }

  .rdtMilli input {
    width: 100%;
    font-size: 1.2em;
    margin-top: 37px;
  }

  .rdtTime td {
    cursor: default;
  }
  .visible.transition {
    margin-top: auto !important;
    display: inline-block !important;
    position: relative;
    top: 20%;
  }
  `} .close-appear {
  }

  .close-enter {
  }

  .close-enter.close-enter-active {
  }

  .desktop-enter {
    opacity: 0.01;
  }
  .desktop-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }
  .desktop-exit {
    opacity: 1;
  }
  .desktop-exit-active {
    opacity: 0.01;
    transition: opacity 500ms ease-in;
  }
`;

export default global;
