import styled from 'styled-components';
import Pickr from 'color-pickr';

export default styled(Pickr)`
  position: relative;
  width: 200px;
  border-radius: 3px;
  border: 1px solid #ccc;

  .gradient {
    width: 200px;
    height: 200px;
    border-radius: 3px;
  }

  .gradient-selector {
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

  .gradient-svg {
    border-radius: 3px 3px 0 0;
  }

  .slider-container {
    display: flex;
    align-items: center;
    padding: 10px;
  }

  .swatch {
    width: 20px;
    height: 20px;
    border-radius: 3px;
    flex: 0 0 auto;
    margin: 0 5px 0 0;
  }

  .hue-slider-container {
    position: relative;
    margin-left: 4px;
    flex: 1 1 auto;
    height: 10px;
  }

  .hue-container {
    position: relative;
    height: 100%;
  }

  .hue-svg {
    position: absolute;
    top: 0;
    left: 0;
  }

  .hue-selector {
    position: absolute;
    top: -1px;
    left: -5px;
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #ccc;
    box-shadow: 0 1px 5px -2px rgba(0, 0, 0, 0.2), 0 1px 3px -1px rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }

  .hex-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 10px;
    margin-bottom: 10px;
  }

  .input-container {
    width: 100%;
    margin: 5px 0;
  }

  input {
    width: 100%;
    font-size: 14px;
    box-sizing: border-box;
    padding: 5px 15px;
    line-height: 1;
    border-radius: 3px;
    border: 1px solid #ccc;
  }

  .title {
    text-align: center;
    font-size: 12px;
    text-transform: uppercase;
    color: #aaa;
  }
`;
