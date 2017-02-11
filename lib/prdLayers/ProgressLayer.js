/**
 * 进度条图层类
 * @author dingyang[dingyang9642@126.com]
 */
class ProgressLayer extends AnimationLayer {
    /**
     * ProgressLayer类构造函数
     * @return {object}    默认实例化对象
     */
    constructor(id, options) {
        super(id, options);  // 调用父类的constructor(id, options)
        this._datas = this.getRenderOptions(this.datas);
    }

    
    /**
     * 获取绘制进度条配置参数
     * @param  {object} options 用户自定义配置参数
     * @return {object}         和默认参数合并
     */
    getRenderOptions (options) {
        options = (options) ? options : {};
        var defaultOptions = {
            inner_radius: 5,                // 圆环内半径
            inner_fillStyle: '#fff',        // 圆环内径的填充色 
            outter_radius: 10,              // 圆环外半径
            line_width: 2,                  // 圆环忠建线条宽度  
            default_color: '#aaa',          // 圆环默认颜色【灰色】 
            highlight_color: '#00f',        // 圆环高亮颜色
            total_step: 3,                  // 进度条步骤总数目
            now_step: 2,                    // 进度条步骤当前进度
            padding: 5,                     // 默认距离左右间距
            tips_default_color: '#aaa',     // 下方文字默认颜色
            tips_hightlight_color: '#333',  // 下方文字高亮默认颜色
            tips_font: '10px sans-serif',   // 下方文字默认字体
            tips_gap: 10,                   // 圆圈下方对应的多行文案时间距
            tips: [
                [{
                    text: 'test',
                    color: '',
                    font: ''
                }],
                [{
                    text: 'test1',
                    color: '',
                    font: ''
                }]
            ]
        };
        var newOptions = Util.extend(defaultOptions, options);
        return newOptions;
    }

    onAdd (animationMap) {
        super.onAdd(animationMap);
        this.render();
    }

    reSize () {
        super.reSize();
        this.render();
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
        var _progressOptions       = this._datas;
        var _inner_radius          = _progressOptions.inner_radius,
            _inner_fillStyle       = _progressOptions.inner_fillStyle,
            _outter_radius         = _progressOptions.outter_radius,
            _line_width            = _progressOptions.line_width,
            _default_color         = _progressOptions.default_color,
            _highlight_color       = _progressOptions.highlight_color,
            _total_step            = _progressOptions.total_step,
            _now_step              = _progressOptions.now_step,
            _padding               = _progressOptions.padding,
            _tips                  = _progressOptions.tips,
            _tips_default_color    = _progressOptions.tips_default_color,
            _tips_hightlight_color = _progressOptions.tips_hightlight_color,
            _tips_gap              = _progressOptions.tips_gap,
            _tips_font             = _progressOptions.tips_font;
        
        var middle_y = parseFloat(_h / 2);
        for (var i = 0; i < _total_step; i++) {
            var _gap = ((_w - (_outter_radius * 2) - (_padding * 2)) / (_total_step - 1)).toFixed(2);
            _gap = parseFloat(_gap);
            var middle_x = (i * _gap + _outter_radius + _padding).toFixed(2);
            middle_x = parseFloat(middle_x);
            var circleColor = ((i + 1) <= _now_step) ? _highlight_color : _default_color;
            // 绘制圆圈
            CanvasUtil.drawPoint(this.id, {x: middle_x, y: middle_y}, {
                type: '2',
                fillStyle: circleColor,
                lineWidth: 0,
                fillAlpha: 1,
                radius: _outter_radius
            });
            CanvasUtil.drawPoint(this.id, {x: middle_x, y: middle_y}, {
                type: '2',
                fillStyle: _inner_fillStyle,
                lineWidth: 0,
                fillAlpha: 1,
                radius: _inner_radius
            });

            
            // 绘制文案
            var now_step_text = _tips[i];
            var now_step_text_length = now_step_text.length;
            var textAlign = (i === 0) ? 'left' : ((i === (_total_step - 1)) ? 'right' : 'center');
            var startX = (i === 0) ? (middle_x - _outter_radius) : ((i === (_total_step - 1)) ? (middle_x + _outter_radius) : middle_x);
            var textColor = ((i + 1) <= _now_step) ? _tips_hightlight_color : _tips_default_color;
            var textFont = _tips_font;
            for (var j = 0; j < now_step_text_length; j++) {
                var now_tip = now_step_text[j];
                var tipTextColor = (now_tip.color) ? now_tip.color : textColor;
                var tipTextFont = (now_tip.font) ? now_tip.font : textFont;
                var tipTextFontSize = isNaN(parseInt(tipTextFont, 10)) ? 10 : parseInt(tipTextFont, 10);
                var yPlus = _outter_radius + (j + 1) * _tips_gap + j * tipTextFontSize;
                CanvasUtil.drawText(this.id, now_tip.text, {x: startX, y: middle_y + yPlus}, {
                    type: '2',
                    textAlign: textAlign,
                    fillStyle: tipTextColor,
                    fillAlpha: 1,
                    font: tipTextFont
                });
            }


            if ((i + 1) === _total_step) return; // 直接返回，取消绘制线条
            // 绘制线条
            var line_points = [{
                x: middle_x + _outter_radius,
                y: middle_y
            }, {
                x: middle_x + _gap - (_outter_radius),
                y: middle_y
            }];
            var lineColor = ((i + 2) <= _now_step) ? _highlight_color : _default_color;
            CanvasUtil.drawLine(this.id, line_points, {
                strokeStyle: lineColor,
                lineWidth: _line_width,
                lineAlpha: 1
            });

        }

    }
}