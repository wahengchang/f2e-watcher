'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _Report = require('./../components/Report');

var _Report2 = _interopRequireDefault(_Report);

var _report = require('../actions/report');

var _report2 = _interopRequireDefault(_report);

var _resource = require('../actions/resource');

var _resource2 = _interopRequireDefault(_resource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {fetchResourceData} from '../utils/resource'

var _mockReport = require('../../../report.json');
var _mockResource = require('../../../resources.json');

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    report: state.report,
    resource: state.resource
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    // onClick: () => {
    //   dispatch(reportActionCreator.setReport());
    // }
  };
};

var preloadHello = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Report2.default);

preloadHello.initState = function (store, req, res) {
  return function (dispatch, getState) {
    return new Promise(function (resolve, reject) {

      // fetchResourceData().then(
      //   (resourceList) => {
      //     const reportData = _mockReport
      //     dispatch(resourceActionCreator.setResource(resourceList))
      //     dispatch(reportActionCreator.setReport(reportData))
      //     resolve(1)
      //   }
      // )
      var resourceData = _mockResource;
      dispatch(_resource2.default.setResource(resourceData));
      var reportData = _mockReport;
      dispatch(_report2.default.setReport(reportData));
      resolve(1);
    });
  };
};

// preloadHello.getInitState = (isServer) => {
//   return (isServer) ? initState : null
// }

exports.default = preloadHello;