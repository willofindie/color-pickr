import React from 'react';
import PropTypes from 'prop-types';

export default class Gradient extends React.PureComponent {
  static propTypes = {
    orientation: PropTypes.oneOf(['h', 'v']),
  };

  renderGradientOrientation = orientation => {
    const stops = [
      <stop key='1' offset='0%' stopColor='#FF0000' stopOpacity='1' />,
      <stop key='2' offset='13%' stopColor='#FF00FF' stopOpacity='1' />,
      <stop key='3' offset='25%' stopColor='#8000FF' stopOpacity='1' />,
      <stop key='4' offset='38%' stopColor='#0040FF' stopOpacity='1' />,
      <stop key='5' offset='50%' stopColor='#00FFFF' stopOpacity='1' />,
      <stop key='6' offset='63%' stopColor='#00FF40' stopOpacity='1' />,
      <stop key='7' offset='75%' stopColor='#0BED00' stopOpacity='1' />,
      <stop key='8' offset='88%' stopColor='#FFFF00' stopOpacity='1' />,
      <stop key='9' offset='100%' stopColor='#FF0000' stopOpacity='1' />,
    ];
    if (orientation === 'h') {
      return (
        <linearGradient id='gradient-hsv-0' x1='100%' y1='0%' x2='0%' y2='0%'>
          {stops}
        </linearGradient>
      );
    }
    return (
      <linearGradient id='gradient-hsv-0' x1='0%' y1='100%' x2='0%' y2='0%'>
        {stops}
      </linearGradient>
    );
  };
  /**
   * Credits to https://github.com/DavidDurman/FlexiColorPicker
   * Modifications done by this repository contributors
   */
  renderSVGGradient = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      width='100%'
      height='100%'
      viewBox={this.props.orientation === 'h' ? '0 0 200 10' : '0 0 10 200'}
      className='hue-svg'
    >
      <defs>{this.renderGradientOrientation(this.props.orientation)}</defs>
      <rect x='0' y='0' width='100%' height='100%' fill='url(#gradient-hsv-0)' />
    </svg>
  );

  render() {
    const { orientation } = this.props;
    return (
      <div className='hue-slider-container'>
        <div className='hue-container'>{this.renderSVGGradient()}</div>
        <div className='hue-selector' />
      </div>
    );
  }
}
