import React from 'react';
import PropTypes from 'prop-types';

import GradientSelector from './components/gradient-selector';
import HueSelector from './components/hue-selector';
import { hsv2hex, hsv2rgb } from './utils';

export default class Pickr extends React.PureComponent {
  static propTypes = {
    withSwatch: PropTypes.bool,
    hueOrientation: PropTypes.oneOf(['h', 'v']).isRequired,
  };

  static defaultProps = {
    hueOrientation: 'h',
  };

  state = {
    hue: 0,
    hexValue: '',
    hsv: {},
  };

  handleShadowChange = (hex, rgb, hsv) => {
    this.setState({
      hexValue: hex,
      hsv,
    });
  };

  handleHueChange = hue => {
    const hsv = {
      h: hue,
      s: this.state.hsv.s,
      v: this.state.hsv.v,
    };
    this.setState({
      hue,
      hexValue: hsv2hex(hsv),
      hsv,
    });
  };

  handleHexChange = e => {
    this.setState({
      hexValue: e.target.value,
    });
  };

  render() {
    const { withSwatch, hueOrientation } = this.props;
    return (
      <div className={`${this.props.className} kamamana-color-pickr`}>
        <GradientSelector hue={this.state.hue} onChange={this.handleShadowChange} />
        <div className='slider-container'>
          {withSwatch && <div className='swatch' style={{ background: this.state.hexValue }} />}
          <HueSelector onChange={this.handleHueChange} orientation={hueOrientation} />
        </div>
        <div className='selection-container'>
          <div className='hex-container'>
            <div className='hex-input-container input-container'>
              <input
                type='text'
                className='hex-input'
                value={this.state.hexValue}
                onChange={this.handleHexChange}
              />
            </div>
            <span className='hex-title title'>HEX</span>
          </div>
        </div>
      </div>
    );
  }
}
