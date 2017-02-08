# canvas
基于地图分层的理念开发实现本该类库，暂时处于初级阶段...<br/>

###1、LoadingLayer【加载图层】
```javascript  
    var animationMap = new AnimationMap('animationMap');
    var loadingLayer = new LoadingLayer('loadingLayer', {
        zIndex: 2,
        opacity: 1
    });
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