

## Run f2e-watcher
```
$ node module/
```

## report.json format
```js
[
    {
        "url": "https://www.google.com/",
        "initTime": 3556,
        "httpResponseTime": 86,
        "headerJSImageTime": 23,
        "renderingTime": 45,
        "headerReceivedCount": 6,
        "headerReceivedSize": 11963,
        "totalTime": 154
    }
]
```

## resource.json format
```js
[{
    url: 'https://google.com/', 
    data: [
        {
            body                : "",
            bodySize            : 28561,
            contentType         : "text/html; charset=utf-8",
            id                  : 1,
            redirectURL         : null,
            stage               : start,
            status              : 200,
            statusText          : OK,
            time                : 2017-07-23T14:45:30.294Z,
            url                 : "http://www.cnblogs.com/mvc/Blog/CommentForm.aspx?postId=4214669&blogApp=xinzhyu&_=1500821142589",
            startTime           : 1500821130294,
            finishedTime        : 1500821130520,
            durationTime        : 226,
            headers: [
                    {
                        "name": "Server",
                        "value": "bfe/1.0.8.13-sslpool-patch"
                    },
                    {
                        "name": "Date",
                        "value": "Sun, 23 Jul 2017 14:45:31 GMT"
                    },
                    {
                        "name": "Content-Type",
                        "value": "application/javascript"
                    }
            ]
        }
    ]
}]
```