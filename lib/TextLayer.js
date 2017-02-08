/**
 * 文本图层类
 * @author dingyang[dingyang9642@126.com]
 */
class TextLayer extends AnimationLayer {
    /**
     * TextLayer类构造函数
     * @return {object}    默认实例化对象
     */
    constructor(id, options) {
        super(id, options);  // 调用父类的constructor(id, options)
        this._datas = this.getRenderOptions(this.datas);
    }

    onAdd (animationMap) {
        super.onAdd(animationMap);
        this.render();
    }

    reSize () {
        super.reSize();
        this.render();
    }

    /**
     * 获取绘制文本图层配置参数
     * @param  {object} options 用户自定义配置参数
     * @return {object}         和默认参数合并
     */
    getRenderOptions (options) {
        options = (options) ? options : {};
        var defaultOptions = {
            text: '测试文本',
            textAlign: 'left',
            centerX: 'center',         // 圆环位置，默认center为居中，开发者需要传递number坐标
            centerY: 'center',
            font: '10px sans-serif',   // 绘制文本字体
            color: '#333',             // 绘制文本颜色
            texts: [{
                    text: '测试文本',
                    textAlign: 'left',
                    centerX: 0,         // 圆环位置，默认center为居中，开发者需要传递number坐标
                    centerY: 0,
                    font: '10px sans-serif',   // 绘制文本字体
                    color: '#333'             // 绘制文本颜色
                }
            ]
        };
        var newOptions = Util.extend(defaultOptions, options);
        return newOptions;
    }

    clearLayer () {
        var _size = this.getSize();
        var _w = _size.w;
        var _h = _size.h;
        super.clearLayer();
        CanvasUtil.clearLayer(this.id, _w, _h);
    }
    
    render () {
        var self = this;
        var _size = this.getSize();
        var _w = _size.w;
        var _h = _size.h;
        var _textOptions = this._datas;
        var _default_centerX     = _textOptions.centerX,
            _default_centerY     = _textOptions.centerY,
            _default_font        = _textOptions.font,
            _default_color       = _textOptions.color,
            _default_text        = _textOptions.text,
            _default_textAlign   = _textOptions.textAlign,
            _texts               = _textOptions.texts;
        var originX = (typeof _default_centerX === 'string' && _default_centerX === 'center') ? (_w / 2) : (_default_centerX * 1);
        var originY = (typeof _default_centerY === 'string' && _default_centerY === 'center') ? (_h / 2) : (_default_centerY * 1);
        var _textsLength = _texts.length;
        for (var i = 0; i < _textsLength; i++) {
            var tmpText = _texts[i];
            var _tmptext        = (tmpText.text) ? tmpText.text : _default_text,
                _tmpTextAlign   = (tmpText.textAlign) ? tmpText.textAlign : _default_textAlign,
                _tmpCenterX     = (typeof tmpText.centerX === 'number') ? tmpText.centerX : originX,
                _tmpCenterY     = (typeof tmpText.centerY === 'number') ? tmpText.centerY : originY,
                _tmpFont        = (tmpText.font) ? tmpText.font : _default_font,
                _tmpColor       = (tmpText.color) ? tmpText.color : _default_color;
            CanvasUtil.drawText(this.id, _tmptext, {x: _tmpCenterX, y: _tmpCenterY}, {
                type: '2',
                textAlign: _tmpTextAlign,
                fillStyle: _tmpColor,
                fillAlpha: 1,
                font: _tmpFont
            });
        }
    }
    
}