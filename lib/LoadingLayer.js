/**
 * 加载图层类
 * @author dingyang[dingyang9642@126.com]
 */
class LoadingLayer extends AnimationLayer {
    /**
     * LoadingLayer类构造函数
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
     * 获取绘制加载中图层配置参数
     * @param  {object} options 用户自定义配置参数
     * @return {object}         和默认参数合并
     */
    getRenderOptions (options) {
        options = (options) ? options : {};
        var defaultOptions = {
            outter_color: '#777',
            outter_line_width: 3,
            outter_radius: 8,
            circles: [
                {'angle': 10, 'alpha': 0.05}, {'angle': 20, 'alpha': 0.1}, {'angle': 30, 'alpha': 0.15},
                {'angle': 40, 'alpha': 0.2}, {'angle': 50, 'alpha': 0.25}, {'angle': 60, 'alpha': 0.3},
                {'angle': 70, 'alpha': 0.35}, {'angle': 80, 'alpha': 0.4}, {'angle': 90, 'alpha': 0.45},
                {'angle': 100, 'alpha': 0.5}, {'angle': 110, 'alpha': 0.55}, {'angle': 120, 'alpha': 0.6},
                {'angle': 130, 'alpha': 0.65}, {'angle': 140, 'alpha': 0.7}, {'angle': 150, 'alpha': 0.75},
                {'angle': 160, 'alpha': 0.8}, {'angle': 170, 'alpha': 0.85}, {'angle': 180, 'alpha': 0.9},
            ],
            centerX: 'center',   // 圆环位置，默认center为居中，开发者需要传递number坐标
            centerY: 'center'
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
    


    loop () {
        var self = this;
        var _size = this.getSize();
        var _w = _size.w;
        var _h = _size.h;
        var _loadingOptions = this._datas;
        var _outter_color          = _loadingOptions.outter_color,
            _outter_line_width     = _loadingOptions.outter_line_width,
            _outter_radius         = _loadingOptions.outter_radius,
            _circles               = _loadingOptions.circles,
            _centerX               = _loadingOptions.centerX,
            _centerY               = _loadingOptions.centerY;
        var originX = (typeof _centerX === 'string' && _centerX === 'center') ? (_w / 2) : (_centerX * 1);
        var originY = (typeof _centerY === 'string' && _centerY === 'center') ? (_h / 2) : (_centerY * 1);
        // 第一步：清空画布
        self.clearLayer();
        // 第二步：绘制外围圆圈
        CanvasUtil.drawPoint(this.id, {x: originX, y: originY}, {
            type: '1',
            strokeStyle: _outter_color,
            lineWidth: _outter_line_width,
            radius: _outter_radius
        });
        // 第三步：绘制圆形list
        var _circlesLength = _circles.length;
        for (var i = 0; i < _circlesLength; i++) {
            var tmpCircle = _circles[i];
            var tmpCircleAngle = tmpCircle.angle;
            var tmpCircleAlpha = tmpCircle.alpha;
            if(_circles[i].angle >= 360) { _circles[i].angle = 0; }
            var x = _outter_radius * Math.cos((tmpCircleAngle) * Math.PI / 180) + originX;
            var y = _outter_radius * Math.sin((tmpCircleAngle) * Math.PI / 180) + originY;
            CanvasUtil.drawPoint(this.id, {x: x, y: y}, {
                type: '2',
                fillStyle: '#fff',
                fillAlpha: tmpCircleAlpha,
                radius: _outter_line_width / 2
            });
            _circles[i].angle+=10;
        }
    }
    
    render () {
        var self = this;
        if (self.intervalTimer) {
            window.clearInterval(self.intervalTimer);
        }
        self.intervalTimer = window.setInterval(function() {
            self.loop();
        }, 33);
    }
    
}