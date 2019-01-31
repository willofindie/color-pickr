import React from 'react'
import PropTypes from 'prop-types'

class ColorInputAddon extends React.Component {
  render () {
    const { color, className, ...rest } = this.props;
    return (
      <div
        ref={ele => { this.colorTrigger = ele }}
        className='color-input-addon'
        {...rest}
      >
        <style jsx>{`
          .color-input-addon {
            display: block;
            border-radius: 3px;
            margin: 0 -7px;
            width: 22px;
            height: 22px;
            background-color: ${this.props.color};
          }
        `}</style>
      </div>
    )
  }
}

ColorInputAddon.propTypes = {
  className: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

ColorInputAddon.defaultProps = {
  className: ''
}

export default ColorInputAddon
