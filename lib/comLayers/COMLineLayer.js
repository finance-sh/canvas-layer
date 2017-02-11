/**
 * 线图层类
 * @author dingyang[dingyang9642@126.com]
 */
class COMLineLayer extends AnimationLayer {
    /**
     * COMLineLayer类构造函数
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
            lineWidth: 2,
            strokeStyle: '#000',
            lineAlpha: 1,
            offsetX: 0,          // 绘制之后X方向偏移量
            offsetY: 0,          // 绘制之后Y方向偏移量
            points: [],
            lines: []
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
        var _lineOptions = this._datas;
        var _default_lineWidth   = Util.getPxNumber(_lineOptions.lineWidth),
            _default_strokeStyle = _lineOptions.strokeStyle,
            _default_points      = _lineOptions.points,
            _default_lineAlpha   = _lineOptions.lineAlpha,
            _default_offsetX     = Util.getPxNumber(_lineOptions.offsetX),
            _default_offsetY     = Util.getPxNumber(_lineOptions.offsetY),
            _lines               = _lineOptions.lines;
        var _linesLength = _lines.length;
        for (var i = 0; i < _linesLength; i++) {
            var tmpLine = _lines[i];
            var _tmpLineWidth   = (tmpLine.lineWidth) ? Util.getPxNumber(tmpLine.lineWidth) : _default_lineWidth,
                _tmpStrokeStyle = (tmpLine.strokeStyle) ? tmpLine.strokeStyle : _default_strokeStyle,
                _tmpPoints      = (tmpLine.points) ? tmpLine.points : _default_points,
                _tmpLineAlpha   = (tmpLine.lineAlpha) ? tmpLine.lineAlpha : _default_lineAlpha;
            var _tmpPointsLength = _tmpPoints.length;
            if (_tmpPointsLength < 2) continue;
            var newPoints = [];
            for (var j = 0; j < _tmpPointsLength; j++) {
                var tmpPoint = _tmpPoints[j];
                var newX = Util.getPxNumber(tmpPoint.x);
                var newY = Util.getPxNumber(tmpPoint.y);
                var _offsetX      = (tmpPoint.offsetX || tmpPoint.offsetX === 0) ? Util.getPxNumber(tmpPoint.offsetX) : _default_offsetX;
                var _offsetY      = (tmpPoint.offsetY || tmpPoint.offsetY === 0) ? Util.getPxNumber(tmpPoint.offsetY) : _default_offsetY;
                newPoints.push({
                    x: newX + _offsetX,
                    y: newY + _offsetY
                });
            }
            CanvasUtil.drawLine(this.id, newPoints, {
                lineWidth: _tmpLineWidth,
                strokeStyle: _tmpStrokeStyle,
                lineAlpha: _tmpLineAlpha
            });
        }
    }
    
}