/**
 * 点图层类
 * @author dingyang[dingyang9642@126.com]
 */
class COMPointLayer extends AnimationLayer {
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
            type: '2',
            lineWidth: 2,
            strokeStyle: '#000',
            lineAlpha: 1,
            fillStyle: '#000',
            fillAlpha: 1,
            radius: 1,
            centerX: 'center',
            centerY: 'center',
            offsetX: 0,          // 绘制之后X方向偏移量
            offsetY: 0,          // 绘制之后Y方向偏移量
            points: []
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
        var _pointOptions = this._datas;
        var _default_type        = _pointOptions.type,
            _default_centerX     = _pointOptions.centerX,
            _default_centerY     = _pointOptions.centerY,
            _default_lineWidth   = Util.getPxNumber(_pointOptions.lineWidth),
            _default_strokeStyle = _pointOptions.strokeStyle,
            _default_lineAlpha   = _pointOptions.lineAlpha,
            _default_fillStyle   = _pointOptions.fillStyle,
            _default_fillAlpha   = _pointOptions.fillAlpha,
            _default_radius      = Util.getPxNumber(_pointOptions.radius),
            _default_offsetX     = Util.getPxNumber(_pointOptions.offsetX),
            _default_offsetY     = Util.getPxNumber(_pointOptions.offsetY),
            _points              = _pointOptions.points;
        var originX = (typeof _default_centerX === 'string' && _default_centerX === 'center') ? (_w / 2) : Util.getPxNumber(_default_centerX);
        var originY = (typeof _default_centerY === 'string' && _default_centerY === 'center') ? (_h / 2) : Util.getPxNumber(_default_centerY);
        var _pointsLength = _points.length;
        for (var i = 0; i < _pointsLength; i++) {
            var tmpPoint = _points[i];
            var _tmpType        = (tmpPoint.type) ? tmpPoint.type : _default_type,
                _tmpLineWidth   = (tmpPoint.lineWidth) ? Util.getPxNumber(tmpPoint.lineWidth) : _default_lineWidth,
                _tmpStrokeStyle = (tmpPoint.strokeStyle) ? tmpPoint.strokeStyle : _default_strokeStyle,
                _tmpLineAlpha   = (tmpPoint.lineAlpha) ? tmpPoint.lineAlpha : _default_lineAlpha,
                _tmpFillStyle   = (tmpPoint.fillStyle) ? tmpPoint.fillStyle : _default_fillStyle,
                _tmpFillAlpha   = (tmpPoint.fillAlpha) ? tmpPoint.fillAlpha : _default_fillAlpha,
                _tmpRadius      = (tmpPoint.radius) ? Util.getPxNumber(tmpPoint.radius) : _default_radius,
                _tmpCenterX     = (tmpPoint.centerX || tmpPoint.centerX === 0) ? ((typeof tmpPoint.centerX === 'string' && tmpPoint.centerX === 'center') ? (_w / 2) : Util.getPxNumber(tmpPoint.centerX)) : originX,
                _tmpCenterY     = (tmpPoint.centerY || tmpPoint.centerY === 0) ? ((typeof tmpPoint.centerY === 'string' && tmpPoint.centerY === 'center') ? (_h / 2) : Util.getPxNumber(tmpPoint.centerY)) : originY,
                _tmpOffsetX     = (tmpPoint.offsetX) ? Util.getPxNumber(tmpPoint.offsetX) : _default_offsetX,
                _tmpOffsetY     = (tmpPoint.offsetY) ? Util.getPxNumber(tmpPoint.offsetY) : _default_offsetY;
            CanvasUtil.drawPoint(this.id, {x: _tmpCenterX + _tmpOffsetX, y: _tmpCenterY + _tmpOffsetY}, {
                type: _tmpType,
                lineWidth: _tmpLineWidth,
                strokeStyle: _tmpStrokeStyle,
                lineAlpha: _tmpLineAlpha,
                fillStyle: _tmpFillStyle,
                fillAlpha: _tmpFillAlpha,
                radius: _tmpRadius
            });
        }
    }
    
}