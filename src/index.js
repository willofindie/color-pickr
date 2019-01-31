import React from 'react';
import PropTypes from 'prop-types';

import GradientSelector from './components/gradient-selector';
import HueSelector from './components/hue-selector';

export default class Pickr extends React.PureComponent {
  static propTypes = {
    withSwatch: PropTypes.bool,
    hueOrientation: PropTypes.oneOf(['h', 'v']).isRequired,
  };

  static defaultProps = {
    hueOrientation: 'h',
  };

  state = {
    hexValue: '',
  };

  handleShadowChange = (hex, rgb, hsv) => {
    this.setState({
      hexValue: hex,
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
        <GradientSelector onChange={this.handleShadowChange} />
        <div className='slider-container'>
          {withSwatch && <div className='swatch' style={{ background: this.state.hexValue }} />}
          <HueSelector onChange={() => {}} orientation={hueOrientation} />
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
