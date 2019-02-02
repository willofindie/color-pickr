import React from 'react';
import PropTypes from 'prop-types';
import toggleDocumentListeners from '../toggle-document-listeners';
import getRelativePos from '../get-relative-pos';

export default class Gradient extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    hue: 0,
  };

  state = {
    isComponentRendered: false,
    isMouseDown: false,
    x: null,
    y: null,
  };

  hueOffset = 15;

  isVertical = (w, h) => {
    if (w > h) {
      return false;
    }
    return true;
  };

  handleMouseDown = () => {
    this.setState({ isMouseDown: true });
    toggleDocumentListeners(true, this.handleMouseUp, this.handleMouseMove);
  };
  handleMouseUp = () => {
    this.setState({ isMouseDown: false });
    toggleDocumentListeners(true, this.handleMouseUp, this.handleMouseMove);
  };
  handleMouseMove = evt => {
    if (this.state.isMouseDown) {
      this.handleDrag(evt);
    }
  };

  handleDrag = e => {
    if (this.dragContainer) {
      const bounds = this.dragContainer.getBoundingClientRect();
      const { x, y } = getRelativePos(e, bounds);
      let hue = 0;
      if (this.isVertical(bounds.width, bounds.height)) {
        hue = (y / bounds.height) * 360 + this.hueOffset;
        this.setState({ y, x: null });
      } else {
        hue = (x / bounds.width) * 360 + this.hueOffset;
        this.setState({ x, y: null });
      }
      this.props.onChange(hue);
      return true;
    }

    return false;
  };

  getPosition = () => {
    if (this.dragEle) {
      return {
        top: this.state.y != null ? this.state.y - this.dragEle.offsetHeight / 2 : 0,
        left: this.state.x != null ? this.state.x - this.dragEle.offsetWidth / 2 : 0,
      };
    }
    return {
      top: this.state.y != null ? this.state.y : 0,
      left: this.state.x != null ? this.state.x : 0,
    };
  };

  renderGradientOrientation = isVertical => {
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
    if (isVertical) {
      return (
        <linearGradient id='gradient-hsv-0' x1='0%' y1='100%' x2='0%' y2='0%'>
          {stops}
        </linearGradient>
      );
    }
    return (
      <linearGradient id='gradient-hsv-0' x1='100%' y1='0%' x2='0%' y2='0%'>
        {stops}
      </linearGradient>
    );
  };
  /**
   * Credits to https://github.com/DavidDurman/FlexiColorPicker
   * Modifications done by this repository contributors
   */
  renderSVGGradient = () => {
    if (this.dragContainer) {
      const bounds = this.dragContainer.getBoundingClientRect();
      const isVertical = this.isVertical(bounds.width, bounds.height);
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          version='1.1'
          width='100%'
          height='100%'
          viewBox={isVertical ? '0 0 10 200' : '0 0 200 10'}
          className='hue-svg'
        >
          <defs>{this.renderGradientOrientation(isVertical)}</defs>
          <rect x='0' y='0' width='100%' height='100%' fill='url(#gradient-hsv-0)' />
        </svg>
      );
    }
    return null;
  };

  componentDidMount() {
    if (!this.state.isComponentRendered) {
      // Rerender the component just once more, so that svg gradient gets
      // rendered respective to given orientation...
      this.setState({
        isComponentRendered: true,
      });
    }
  }

  render() {
    return (
      <div
        className='hue-slider-container'
        style={{ position: 'relative', display: 'inline-block' }}
      >
        <div
          ref={ele => {
            this.dragContainer = ele;
          }}
          onMouseDown={this.handleMouseDown}
          className='hue-container'
        >
          {this.renderSVGGradient()}
        </div>
        <div
          ref={ele => {
            this.dragEle = ele;
          }}
          className='hue-selector'
          onMouseDown={this.handleMouseDown}
          style={{
            position: 'absolute',
            ...this.getPosition(),
          }}
        />
      </div>
    );
  }
}
