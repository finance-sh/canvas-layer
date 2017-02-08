var animationMap = new AnimationMap('animationMap');
var loadingLayer = new LoadingLayer('loadingLayer', {
    zIndex: 2,
    opacity: 1
});


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
                text: '不知道，你呢？',
                centerX: 200,
                centerY: 40,
                color: 'blue',
                textAlign: 'right'
            }, {
                text: '我也不知道，你是谁？',
                centerX: 10,
                centerY: 70,
                color: 'red'
            }, {
                text: '我是xx呀，哈哈',
                centerX: 200,
                centerY: 100,
                color: 'blue',
                textAlign: 'right'
            }
        ]
    }
});




animationMap.addLayer(loadingLayer);

animationMap2.addLayer(progressLayer);

animationMap3.addLayer(textLayer);



window.onresize = function() {
    animationMap.reSize();
    animationMap2.reSize();
    animationMap3.reSize();
};