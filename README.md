# f2e-watcher
It is a tool that automatically check perforamce of website by given list of URLs, and result showed as a website.

Isomorphic Web Application is widely used and it is complex,problem of  performance occurs easier than before, this is a toolkit to ensure performance quality assurance.

 - See also: [express-watcher](https://www.npmjs.com/package/express-watcher)

## Install
The base of f2e-watcher is casperjs, and the base of casperjs is phantomjs. So, installing phantomjs and casperjs is necessary. 

#### Install phantomjs
 - Please check the newest documentation of [phantomjs](http://phantomjs.org/)
 ```
 $ npm install -g phantomjs
 ```

#### Install casperjs
 - Please check the newest documentation of [casperjs](http://casperjs.org/)
 ```
 $ npm install -g casperjs
 ```

#### Download f2e-watcher and install
```
$ git clone git@github.com:wahengchang/f2e-watcher.git
$ cd f2e-watcher
$ npm install
$ cd reportWeb/ && npm install && cd ..
```

## Run

#### 1. Modifying config.json as the target URLs
```
{
    "urls": [
        "https://yahoo.com/",
        "https://tw.user.mall.yahoo.com/",
        "https://google.com/"
    ]
}
```

### 2. Run the script
```
$ npm run report:all

//open browser http://localhost:3000/preload for the result
```
![image](https://user-images.githubusercontent.com/5538753/28765563-ff6b49b2-75fd-11e7-884e-1efd6a6a1ef3.png)


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
