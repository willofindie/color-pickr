import React, {Fragment} from 'react';
import { resolve } from 'styled-jsx/css';
import Pickr from 'color-pickr';

const styled = resolve`
  position: relative;
  width: 200px;
  border-radius: 3px;
  box-sizing: border-box;

  :global(.kamamana-color-pickr .gradient-container) {
    border-radius: 3px;
  }

  :global(.kamamana-color-pickr .gradient) {
    width: 198px;
    height: 198px;
    border-radius: 3px;
  }

  :global(.kamamana-color-pickr .gradient-selector) {
    position: absolute;
    right: 0;
    top: 0;
    background-color: #fff;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
    box-shadow: 0 1px 5px -2px rgba(0, 0, 0, 0.2), 0 1px 3px -1px rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }

  :global(.kamamana-color-pickr .gradient-svg) {
    border-radius: 3px 3px 0 0;
  }

  :global(.kamamana-color-pickr .slider-container) {
    display: flex;
    align-items: center;
    padding: 10px;
  }

  :global(.kamamana-color-pickr .swatch) {
    width: 20px;
    height: 20px;
    border-radius: 3px;
    flex: 0 0 auto;
    margin: 0 5px 0 0;
  }

  :global(.kamamana-color-pickr .hue-slider-container) {
    position: relative;
    margin-left: 4px;
    flex: 1 1 auto;
    height: 10px;
  }

  :global(.kamamana-color-pickr .hue-container) {
    position: relative;
    height: 100%;
  }

  :global(.kamamana-color-pickr .hue-svg) {
    position: absolute;
    top: 0;
    left: 0;
  }

  :global(.kamamana-color-pickr .hue-selector) {
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #ccc;
    box-shadow: 0 1px 5px -2px rgba(0, 0, 0, 0.2), 0 1px 3px -1px rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }

  :global(.kamamana-color-pickr .hex-container) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 10px;
    margin-bottom: 10px;
  }

  :global(.kamamana-color-pickr .input-container) {
    width: 100%;
    margin: 5px 0;
  }

  :global(.kamamana-color-pickr input) {
    width: 100%;
    font-size: 14px;
    box-sizing: border-box;
    padding: 5px 15px;
    line-height: 1;
    border-radius: 3px;
    border: 1px solid #ccc;
  }

  :global(.kamamana-color-pickr .title) {
    text-align: center;
    font-size: 12px;
    text-transform: uppercase;
    color: #aaa;
  }
`

export default class StyledPickr extends React.Component {
  render () {
    const { className, ...rest } = this.props;
    return <Fragment>
      <Pickr className={`${styled.className} ${className}`} {...rest} />
      {styled.styles}
    </Fragment>
  }
}
