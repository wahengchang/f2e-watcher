'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Report = require('./Report.css');

var _Report2 = _interopRequireDefault(_Report);

var _hiddenText = require('../utils/hiddenText.js');

var _hiddenText2 = _interopRequireDefault(_hiddenText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileDetailRow = function FileDetailRow(_ref) {
  var file = _ref.file;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'span',
      { className: (0, _classnames2.default)(_Report2.default['fileSize']) },
      file.size / 1000 + 'kb',
      ' '
    ),
    _react2.default.createElement(
      'span',
      { className: (0, _classnames2.default)(_Report2.default['fileTime']) },
      file.durationTime / 1000 + 's',
      ' '
    ),
    _react2.default.createElement(
      'span',
      { className: (0, _classnames2.default)(_Report2.default['fileUrl']) },
      _react2.default.createElement(
        'a',
        { href: file.url },
        (0, _hiddenText2.default)(file.url)
      )
    )
  );
};

var FilesDetail = function FilesDetail(_ref2) {
  var files = _ref2.files;

  return _react2.default.createElement(
    'span',
    { className: (0, _classnames2.default)(_Report2.default['tooltiptext']) },
    files.map(function (file, index) {
      return _react2.default.createElement(FileDetailRow, { key: index, file: file });
    })
  );
};

var ReportRow = function ReportRow(_ref3) {
  var re = _ref3.re,
      res = _ref3.res;

  return _react2.default.createElement(
    'tr',
    null,
    _react2.default.createElement(
      'td',
      null,
      _react2.default.createElement(
        'a',
        { href: re.url },
        re.url
      )
    ),
    _react2.default.createElement(
      'td',
      null,
      re.totalTime / 1000 + 's'
    ),
    _react2.default.createElement(
      'td',
      null,
      re.httpResponseTime / 1000 + 's'
    ),
    _react2.default.createElement(
      'td',
      { className: (0, _classnames2.default)(_Report2.default['tooltip']) },
      _react2.default.createElement(
        'span',
        { className: (0, _classnames2.default)(_Report2.default['tooltipTitle']) },
        res.files.length + ' files'
      ),
      _react2.default.createElement(FilesDetail, { files: res.files })
    ),
    _react2.default.createElement(
      'td',
      null,
      re.headerJSImageTime / 1000 + 's'
    ),
    _react2.default.createElement(
      'td',
      null,
      re.headerReceivedSize / 1000 + 'kb'
    ),
    _react2.default.createElement(
      'td',
      null,
      re.renderingTime / 1000 + 's'
    )
  );
};

var ReportHeader = function ReportHeader() {
  return _react2.default.createElement(
    'tr',
    null,
    _react2.default.createElement(
      'th',
      null,
      'URL'
    ),
    _react2.default.createElement(
      'th',
      null,
      'Total'
    ),
    _react2.default.createElement(
      'th',
      null,
      'HTTP Response'
    ),
    _react2.default.createElement(
      'th',
      null,
      'Header JS/Image'
    ),
    _react2.default.createElement(
      'th',
      null,
      'Header '
    ),
    _react2.default.createElement(
      'th',
      null,
      'Header Size'
    ),
    _react2.default.createElement(
      'th',
      null,
      'Rendering'
    )
  );
};

/*
Output
{
  url:
  files: [
    url: ,
    size: ,
    durationTime: 
  ]
}
*/
var ParseFileJson = function ParseFileJson(resource) {
  var filesData = resource.map(function (_res) {
    var url = _res.url;

    var files = _res.data.map(function (file) {
      var url = file.url,
          durationTime = file.durationTime,
          bodySize = file.bodySize;

      return { url: url, durationTime: durationTime, size: bodySize };
    });
    return { url: url, files: files };
  });

  return filesData;
};

var Report = function Report(_ref4) {
  var report = _ref4.report,
      resource = _ref4.resource;

  // console.log(' ==== report: ', report)
  var _res = ParseFileJson(resource);
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h1',
        { className: (0, _classnames2.default)(_Report2.default['title']) },
        'Web Performance Report'
      )
    ),
    _react2.default.createElement(
      'table',
      { className: (0, _classnames2.default)(_Report2.default['tftable']) },
      _react2.default.createElement(
        'tbody',
        null,
        _react2.default.createElement(ReportHeader, null),
        report.map(function (_re, index) {
          return _react2.default.createElement(ReportRow, {
            key: index,
            re: _re,
            res: _res.filter(function (__res) {
              return __res.url === _re.url;
            })[0]
          });
        })
      )
    )
  );
};

Report.propTypes = {
  // onClick: PropTypes.func.isRequired,
  report: _react.PropTypes.array.isRequired,
  resource: _react.PropTypes.array.isRequired
};

exports.default = Report;