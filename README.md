# canvas
基于地图分层的理念开发实现本该类库，暂时处于初级阶段...<br/>

###1、LoadingLayer【加载图层】
```javascript  
    var animationMap = new AnimationMap('animationMap');
    var loadingLayer = new LoadingLayer('loadingLayer');
    animationMap.addLayer(loadingLayer);
```

###2、ProgressLayer【进度条图层】
```javascript  
    var animationMap2 = new AnimationMap('animationMap2');
    var progressLayer = new ProgressLayer('progressLayer', {
        zIndex: 1,
        datas: {
            total_step: 3,
            now_step: 2,
            tips: [
                [{'text': '哈哈1'},{'text': '哈哈11'}],
                [{'text': '哈哈2'}],
                [{'text': '哈哈3'}],
                [{'text': '哈哈4'}]
            ]
        }
    });
    animationMap2.addLayer(progressLayer);
```

###3、TextLayer【文本图层】
```javascript  
    var animationMap3 = new AnimationMap('animationMap3');
    var textLayer = new TextLayer('textLayer', {
        zIndex: 2,
        opacity: 1,
        datas: {
            texts: [
                {
                    text: 'hi 你几岁了？',
                    centerX: 10,
                    centerY: 10,
                    color: 'red'
                }, {
                    text: '我10岁，你呢？',
                    centerX: 200,
                    centerY: 40,
                    color: 'blue',
                    textAlign: 'right'
                }
            ]
        }
    });
    animationMap3.addLayer(textLayer);
```

###4、AtomLayer【粒子效果图层】
```javascript  
    var animationMap = new AnimationMap('animationMap');
    var atomLayer = new AtomLayer('atomLayer', {
        zIndex: 2,
        opacity: 1,
        datas: {
            img_url: './cl.jpg',
            img_width: 349,
            img_height: 511
        }
    });
    animationMap.addLayer(atomLayer);
```

###5、PointLayer【点图层】
```javascript  
    var animationMap = new AnimationMap('animationMap');
    var pointLayer = new COMPointLayer('pointLayer', {
        zIndex: 2,
        opacity: 1,
        datas: {
            points: [{
                type: '2',
                lineWidth: 2,
                strokeStyle: '#f00',
                lineAlpha: 1,
                fillStyle: '#f00',
                fillAlpha: 0.5,
                radius: 30,
                centerX: 'center',
                centerY: 'center',
            }]
        }
    });
    animationMap.addLayer(pointLayer);
```

###6、LineLayer【线图层】
```javascript  
    var animationMap = new AnimationMap('animationMap');
    var lineLayer = new COMLineLayer('lineLayer', {
        zIndex: 2,
        opacity: 1,
        datas: {
            lines: [{
                lineWidth: 2,
                strokeStyle: '#f00',
                lineAlpha: 1,
                points: [{
                    x: 6, y: 1
                }, {
                    x: 55, y: 50
                }, {
                    x: 75, y: 30
                }]
            }]
        }
    });
    animationMap.addLayer(lineLayer);
```

###7、PolygonLayer【多边形图层】
```javascript  
    var animationMap = new AnimationMap('animationMap');
    var polygonLayer = new COMPolygonLayer('polygonLayer', {
        zIndex: 2,
        opacity: 1,
        datas: {
            polygons: [{
                type: '1',
                lineWidth: 1,
                strokeStyle: '#f00',
                lineAlpha: 1,
                points: [{
                    x: 106, y: 1
                }, {
                    x: 155, y: 50
                }, {
                    x: 175, y: 30
                }, {
                    x: 106, y: 1
                }]
            }]
        }
    });
    animationMap.addLayer(polygonLayer);
```