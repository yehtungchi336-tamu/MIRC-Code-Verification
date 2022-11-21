function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

var FullscreenPortal = function (_Component) {
  _inherits(FullscreenPortal, _Component);

  function FullscreenPortal(props) {
    _classCallCheck(this, FullscreenPortal);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.el = document.createElement('div');
    _this.el.classList.add(props.className);
    return _this;
  }

  FullscreenPortal.prototype.componentDidMount = function componentDidMount() {
    document.body.appendChild(this.el);
  };

  FullscreenPortal.prototype.componentWillUnmount = function componentWillUnmount() {
    document.body.removeChild(this.el);
  };

  FullscreenPortal.prototype.render = function render() {
    return createPortal(this.props.children, this.el);
  };

  return FullscreenPortal;
}(Component);

FullscreenPortal.propTypes = process.env.NODE_ENV !== "production" ? {
  children: PropTypes.element,
  className: PropTypes.string
} : {};

export default FullscreenPortal;