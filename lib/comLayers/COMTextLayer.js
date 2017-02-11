/**
 * 文本图层类
 * @author dingyang[dingyang9642@126.com]
 */
class COMTextLayer extends AnimationLayer {
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
            offsetX: 0,  // 绘制之后X方向偏移量
            offsetY: 0, // 绘制之后Y方向偏移量
            texts: [{
                    text: '测试文本',
                    textAlign: 'left',
                    centerX: 0,  // 圆环位置，默认center为居中，开发者需要传递number坐标
                    centerY: 0,
                    offsetX: 0,  // 绘制之后X方向偏移量
                    offsetY: 0,  // 绘制之后Y方向偏移量
                    font: '10px sans-serif',   // 绘制文本字体
                    color: '#333'              // 绘制文本颜色
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
            _default_offsetX     = _textOptions.offsetX,
            _default_offsetY     = _textOptions.offsetY,
            _default_font        = _textOptions.font,
            _default_color       = _textOptions.color,
            _default_text        = _textOptions.text,
            _default_textAlign   = _textOptions.textAlign,
            _texts               = _textOptions.texts;
        var originX = (typeof _default_centerX === 'string' && _default_centerX === 'center') ? (_w / 2) : Util.getPxNumber(_default_centerX);
        var originY = (typeof _default_centerY === 'string' && _default_centerY === 'center') ? (_h / 2) : Util.getPxNumber(_default_centerY);
        var _textsLength = _texts.length;
        for (var i = 0; i < _textsLength; i++) {
            var tmpText = _texts[i];
            var _tmptext        = (tmpText.text) ? tmpText.text : _default_text,
                _tmpTextAlign   = (tmpText.textAlign) ? tmpText.textAlign : _default_textAlign,
                _tmpCenterX     = (tmpText.centerX || tmpText.centerX === 0) ? ((typeof tmpText.centerX === 'string' && tmpText.centerX === 'center') ? (_w / 2) : Util.getPxNumber(tmpText.centerX)) : originX,
                _tmpCenterY     = (tmpText.centerY || tmpText.centerY === 0) ? ((typeof tmpText.centerY === 'string' && tmpText.centerY === 'center') ? (_h / 2) : Util.getPxNumber(tmpText.centerY)) : originY,
                _tmpOffsetX     = (tmpText.offsetX || tmpText.offsetX === 0) ? Util.getPxNumber(tmpText.offsetX) : Util.getPxNumber(_default_offsetX),
                _tmpOffsetY     = (tmpText.offsetY || tmpText.offsetY === 0) ? Util.getPxNumber(tmpText.offsetY) : Util.getPxNumber(_default_offsetY),
                _tmpFont        = (tmpText.font) ? tmpText.font : _default_font,
                _tmpColor       = (tmpText.color) ? tmpText.color : _default_color;
            CanvasUtil.drawText(this.id, _tmptext, {x: _tmpCenterX + _tmpOffsetX, y: _tmpCenterY + _tmpOffsetY}, {
                type: '2',
                textAlign: _tmpTextAlign,
                fillStyle: _tmpColor,
                fillAlpha: 1,
                font: _tmpFont
            });
        }
    }
    
}