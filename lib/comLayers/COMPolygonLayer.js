/**
 * 多边形图层类
 * @author dingyang[dingyang9642@126.com]
 */
class COMPolygonLayer extends AnimationLayer {
    /**
     * COMPolygonLayer类构造函数
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
     * 获取绘制多边形图层配置参数
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
            offsetX: 0,          // 绘制之后X方向偏移量
            offsetY: 0,          // 绘制之后Y方向偏移量
            points: [],
            polygons: []
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
        var _polygonOptions = this._datas;
        var _default_type        = _polygonOptions.type,
            _default_lineWidth   = Util.getPxNumber(_polygonOptions.lineWidth),
            _default_strokeStyle = _polygonOptions.strokeStyle,
            _default_lineAlpha   = _polygonOptions.lineAlpha,
            _default_fillStyle   = _polygonOptions.fillStyle,
            _default_fillAlpha   = _polygonOptions.fillAlpha,
            _default_offsetX     = Util.getPxNumber(_polygonOptions.offsetX),
            _default_offsetY     = Util.getPxNumber(_polygonOptions.offsetY),
            _default_points      = _polygonOptions.points,
            _polygons            = _polygonOptions.polygons;
        var _polygonsLength = _polygons.length;
        for (var i = 0; i < _polygonsLength; i++) {
            var tmpPolygon = _polygons[i];
            var _tmpType        = (tmpPolygon.type) ? tmpPolygon.type : _default_type,
                _tmpLineWidth   = (tmpPolygon.lineWidth) ? Util.getPxNumber(tmpPolygon.lineWidth) : _default_lineWidth,
                _tmpStrokeStyle = (tmpPolygon.strokeStyle) ? tmpPolygon.strokeStyle : _default_strokeStyle,
                _tmpLineAlpha   = (tmpPolygon.lineAlpha) ? tmpPolygon.lineAlpha : _default_lineAlpha,
                _tmpFillStyle   = (tmpPolygon.fillStyle) ? tmpPolygon.fillStyle : _default_fillStyle,
                _tmpFillAlpha   = (tmpPolygon.fillAlpha) ? tmpPolygon.fillAlpha : _default_fillAlpha,
                _tmpPoints      = (tmpPolygon.points) ? tmpPolygon.points : _default_points,
                _tmpOffsetX     = (tmpPolygon.offsetX) ? Util.getPxNumber(tmpPolygon.offsetX) : _default_offsetX,
                _tmpOffsetY     = (tmpPolygon.offsetY) ? Util.getPxNumber(tmpPolygon.offsetY) : _default_offsetY;

            var _tmpPointsLength = _tmpPoints.length;
            if (_tmpPointsLength < 4) continue;
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
            CanvasUtil.drawPolygon(this.id, newPoints, {
                type: _tmpType,
                lineWidth: _tmpLineWidth,
                strokeStyle: _tmpStrokeStyle,
                lineAlpha: _tmpLineAlpha,
                fillStyle: _tmpFillStyle,
                fillAlpha: _tmpFillAlpha
            });
        }
    }
    
}