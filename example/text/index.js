var animationMap = new AnimationMap('animationMap');
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




animationMap.addLayer(textLayer);



window.onresize = function() {
    animationMap.reSize();
};