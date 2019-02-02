import React from 'react';
import PropTypes from 'prop-types';
import toggleDocumentListeners from '../toggle-document-listeners';
import getRelativePos from '../get-relative-pos';
import { hsv2hex, hsv2rgb } from '../utils';

export default class Gradient extends React.PureComponent {
  static propTypes = {
    hue: PropTypes.number.isRequired,
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

  handleMouseDown = () => {
    this.setState({ isMouseDown: true });
    toggleDocumentListeners(true, this.handleMouseUp, this.handleMouseMove);
  };
  handleMouseUp = () => {
    this.setState({ isMouseDown: false });
    toggleDocumentListeners(false, this.handleMouseUp, this.handleMouseMove);
  };
  handleMouseMove = evt => {
    if (this.state.isMouseDown) {
      this.handleDrag(evt);
    }
  };

  handleDrag = e => {
    const bounds = this.dragContainer.getBoundingClientRect();
    const { x, y } = getRelativePos(e, bounds);
    const hsv = {
      h: this.props.hue,
      s: x / bounds.width,
      v: (bounds.height - y) / bounds.height,
    };
    this.props.onChange(hsv2hex(hsv), hsv2rgb(hsv), hsv);
    this.setState({ x, y });
  };

  getPosition = () => {
    if (this.dragEle) {
      return {
        top: this.state.y - this.dragEle.offsetHeight / 2,
        left: this.state.x - this.dragEle.offsetWidth / 2,
      };
    }
    return {};
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
      viewBox='0 0 200 200'
      className='gradient-svg'
    >
      <defs>
        <linearGradient id='gradient-black-0' x1='0%' y1='100%' x2='0%' y2='0%'>
          <stop offset='0%' stopColor='#000000' stopOpacity='1' />
          <stop offset='100%' stopColor='#CC9A81' stopOpacity='0' />
        </linearGradient>
        <linearGradient id='gradient-white-0' x1='0%' y1='100%' x2='100%' y2='100%'>
          <stop offset='0%' stopColor='#FFFFFF' stopOpacity='1' />
          <stop offset='100%' stopColor='#CC9A81' stopOpacity='0' />
        </linearGradient>
      </defs>
      <rect x='0' y='0' width='100%' height='100%' fill='url(#gradient-white-0)' />
      <rect x='0' y='0' width='100%' height='100%' fill='url(#gradient-black-0)' />
    </svg>
  );

  componentDidMount() {
    if (!this.state.isComponentRendered) {
      // Render it once more to get a proper setup...
      if (this.dragContainer) {
        const containerBounds = this.dragContainer.getBoundingClientRect();
        this.setState({
          x: containerBounds.width, // getPosition will handle the rest...
          y: 0,
        });
      }
    }
  }

  render() {
    return (
      <div className='gradient-container' style={{ position: 'relative', display: 'inline-block' }}>
        <div
          ref={ele => {
            this.dragContainer = ele;
          }}
          className='gradient'
          onMouseDown={this.handleMouseDown}
          style={{
            background: hsv2hex({ h: this.props.hue, s: 1, v: 1 }),
          }}
        >
          {this.renderSVGGradient()}
        </div>
        <div
          ref={ele => {
            this.dragEle = ele;
          }}
          className='gradient-selector'
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
