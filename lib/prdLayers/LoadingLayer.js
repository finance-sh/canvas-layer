/**
 * 加载图层类[由loadingLayer textLayer组成]
 * @author dingyang[dingyang9642@126.com]
 */
class LoadingLayer {
    /**
     * LoadingLayer类构造函数
     * @return {object}    默认实例化对象
     */
    constructor(id) {
        var textTips = '加载中...';
        var radius = 0.18; // 此时单位为rem
        var totalLength = this.getTotalLengthRem(textTips, radius);
        console.log(totalLength);
        // 圆圈配置参数
        var iconOptions = {
            zIndex: 2,
            opacity: 1,
            datas: {
                outter_line_width: '.05rem',
                outter_radius: radius + "rem",
                centerX: 'center',
                centerY: 'center',
                offsetX: '-' + (totalLength / 2 + radius + 0.05) + 'rem'
            }
        };
        // 文本配置参数
        var textOptions = {
            zIndex: 2,
            opacity: 1,
            datas: {
                texts: [{
                        text: textTips,
                        textAlign: 'center',
                        centerX: 'center',         // 圆环位置，默认center为居中，开发者需要传递number坐标
                        centerY: 'center',
                        offsetX: (totalLength / 2 - radius + 0.05) + 'rem',
                        offsetY: '-0.18rem',
                        font: '0.3rem sans-serif',   // 绘制文本字体
                        color: '#fff'             // 绘制文本颜色
                    }
                ]
            }
        };
        this._COMloadingLayer = new COMLoadingLayer(id + '_loadinglayer', iconOptions);
        this._COMtextLayer = new COMTextLayer(id + '_textlayer', textOptions);
    }

    getTotalLengthRem (text, radius) {
        var textLen = CanvasUtil.getTextStringLength(text);
        var textRemLen = Util.getRemNumber(textLen);
        var circleLength = radius * 2;
        return textRemLen + circleLength;
    }

    onAdd (animationMap) {
        this._COMloadingLayer.onAdd(animationMap);
        this._COMtextLayer.onAdd(animationMap);
    }

    reSize () {
        this._COMloadingLayer.reSize();
        this._COMtextLayer.reSize();
    }
}