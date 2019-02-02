import React from 'react';
import PropTypes from 'prop-types';

import GradientSelector from './components/gradient-selector';
import HueSelector from './components/hue-selector';
import { hsv2hex } from './utils';

export default class Pickr extends React.PureComponent {
  static propTypes = {
    withSwatch: PropTypes.bool,
  };

  static defaultProps = {};

  state = {
    hue: 0,
    hexValue: '#ff0000',
    hsv: {
      h: 0,
      s: 1,
      v: 1,
    },
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
    const { withSwatch } = this.props;
    return (
      <div className={`${this.props.className} kamamana-color-pickr`}>
        <GradientSelector hue={this.state.hue} onChange={this.handleShadowChange} />
        <div className='slider-container'>
          {withSwatch && <div className='swatch' style={{ background: this.state.hexValue }} />}
          <HueSelector onChange={this.handleHueChange} />
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
