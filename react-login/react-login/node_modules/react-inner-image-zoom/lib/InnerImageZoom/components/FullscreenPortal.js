'use strict';

exports.__esModule = true;

var _react = require('react');

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    return (0, _reactDom.createPortal)(this.props.children, this.el);
  };

  return FullscreenPortal;
}(_react.Component);

FullscreenPortal.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes2.default.element,
  className: _propTypes2.default.string
} : {};

exports.default = FullscreenPortal;
module.exports = exports['default'];