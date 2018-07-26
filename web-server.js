var express = require('express')
var app = express()

const reports = require('./report.json')
const resources = require('./resources.json')

app.use(express.static('web'))

const ParseFileJson = (resource) => {
    const filesData = resource.map( (_res) => {
      const {url} = _res
      const files = _res.data.map(file => {
        const {url, durationTime, bodySize} = file
        return {url, durationTime, size: bodySize}
      })
      return {url,files}
    })
  
    return filesData
  }

const ReportHeader= () => {
    return `<tr>
                <th>URL</th>
                <th>Total</th>
                <th>HTTP Response</th>
                <th>Header JS/Image</th>
                <th>Header </th>
                <th>Header Size</th>
                <th>Rendering</th>
            </tr>`
  }


  const hiddenText = (_str, _max) => {
    var max = _max || 50
  
    if (_str.length > max) {
      var first23Words = _str.substring(0, 23)
      var last23Words = _str.substring(_str.length - 23, _str.length)
      return first23Words + '...' + last23Words
    } else {
      return _str
    }
  };

  const fileDetailRow = (file) => {
    return `<div> 
      <span class='fileSize'>${file.size/1000 + 'kb'} </span>
      <span class='fileTime'>${file.durationTime/1000 + 's'} </span>
      <span class='fileUrl'>
        <a href=${file.url} >${hiddenText(file.url)}</a>
      </span>
    </div>`
  }

const filesDetail = (files) => {
    return `<span class="tooltiptext">
              ${files.map( (file) => fileDetailRow(file)).join('')}
          </span>`
  }
  
  
  const rowHtml = (report, resource) => {
      console.log()
      return `<tr>
          <td>
            <a href=${report.url} >${report.url}</a>
          </td>
          <td>${report.totalTime/1000 + 's'}</td>
          <td>${report.httpResponseTime/1000 + 's'}</td>
          <td  class="tooltip">
              <span class="tooltipTitle">
                ${(resource.files && resource.files.length) || 0 + ' files'}
                ${filesDetail(resource.files)}
              </span>
          </td>
          <td>${report.headerJSImageTime/1000 + 's'}</td>
          <td>${report.headerReceivedSize/1000 +'kb'}</td>
          <td>${report.renderingTime/1000 + 's'}</td>
        </tr>
        `
  }

const html = (reportData = {}) =>  {
    const reportsHtml = reports.map(report => {
        const __resource = ParseFileJson(resources).filter(res => res.url === report.url)[0]
        return rowHtml(report, __resource)
    }).join('')

return `
    <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" type="text/css" href="./style.css">
        </head>
        <body>
            <h1 class="reportTitle"> Web Performance Report</h1>
            <table class="reportTable">
                ${ReportHeader()}
                ${reportsHtml}
            </table>
        </body>
    </html>
    `
}

app.get('*', function (req, res) {
    res.send(html(reports))
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})