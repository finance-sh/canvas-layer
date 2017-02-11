var CanvasUtil= {
    /**
     * 获取canvas画布对象
     * @param  {string} id canvas元素ID
     * @return {object}    画布对象
     */
    getContext: function (id) {
        var ctx = document.getElementById(id).getContext("2d");
        return ctx;
    },

    getImageData: function (imageUrl, imageWidth, imageHeight, callback) {
        var self = this;
        // 1、创建canvas
        var canvas = self.createCanvas(imageWidth, imageHeight);
        var ctx = canvas.getContext("2d");
        var image = new Image();
        image.onload = function () {
            ctx.drawImage(image, 0, 0);
            var imgData = ctx.getImageData(0, 0, imageWidth, imageHeight);
            callback(imgData);
        };
        image.src = imageUrl;
    },

    getParticles: function (imageData, callback) {
        var imgDatas = imageData.data;
        var imgDatasLength = imgDatas.length;
        var imgWidth = imageData.width;
        var imgHeight = imageData.height;
        var cellWidth = 3;
        var cellHeight = 3;
        var clomuns = parseInt(imgWidth / cellWidth, 10);
        var rows = parseInt(imgHeight / cellHeight, 10);
        var result = [];
        for (var i = 1; i <= clomuns; i++) {
            for (var j = 1; j <= rows; j++) {
                var posR = ((j * cellHeight - 1) * imgWidth + (i * cellWidth -1)) * 4;
                var tmpData = {
                    R: imgDatas[posR],
                    G: imgDatas[posR + 1],
                    B: imgDatas[posR + 2],
                    A: imgDatas[posR + 3],
                    fillStyle: '#006eff',
                    pos: {
                        x: i * cellWidth + (Math.random() - 0.5) * 5,
                        y: j * cellHeight + (Math.random() - 0.5) * 5
                    }
                };
                tmpData.fillStyle = 'rgba(' + tmpData.R + ', ' + tmpData.G + ', ' + tmpData.B + ',1)';
                if (tmpData.A > 100) {
                    result.push(tmpData);
                }
            }
        }
        callback(result);
    },

    getParticles2: function (imageData, callback) {
        var imgDatas = imageData.data;
        var imgDatasLength = imgDatas.length;
        var imgWidth = imageData.width;
        var imgHeight = imageData.height;
        var cols = 120,
            rows = 30;
        var result = [];
        var s_width = parseInt(imgWidth / cols, 10),
            s_height = parseInt(imgHeight / rows, 10);
        for(var i = 0; i < cols; i++) {
            for(var j = 0; j < rows; j++) {
                //计算(i,j)在数组中的R的坐标值
                var pos = (j * s_height * imgWidth + i * s_width) * 4;
                var tmpData = {
                    R: imgDatas[pos],
                    G: imgDatas[pos + 1],
                    B: imgDatas[pos + 2],
                    A: imgDatas[pos + 3],
                    fillStyle: '#006eff',
                    pos: {
                        x: i * s_width + (Math.random() - 0.5) * 10,
                        y: j * s_height + (Math.random() - 0.5) * 10
                    }
                };
                tmpData.fillStyle = 'rgba(' + tmpData.R + ', ' + tmpData.G + ', ' + tmpData.B + ',1)';
                if (tmpData.A > 100) {
                  result.push(tmpData);
                }
            }
        }
        callback(result);
    },

    createCanvas: function (w, h) {
        var canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        return canvas;
    },

    /**
     * 合并Canvas绘制图形配置参数
     * @param  {object} options 用户自定义配置参数
     * @return {object}         和默认参数合并
     */
    getCanvasOptions: function (options) {
        options = (options) ? options : {};
        var defaultOptions = {
            type: '1', // 区分是否多边形需要填充，1为只stroke，2为只填充, 3即stroke又fill
            fillStyle: '#fff',
            strokeStyle: '#000',
            lineWidth: 1,
            lineAlpha: 1,             // 设置线条透明度
            fillAlpha: 1,             // 设置fill填充透明度
            radius: 2,                // 设置圆形图形半径
            sAngle: 0,                // 设置圆形起始角度
            eAngle: Math.PI * 2,      // 设置圆形结束角度
            counterclockwise: true,   // 设置绘制圆形是否顺时针
            textAlign: 'left',        // 绘制文本的显示位置，分别有 left  center  right
            font: '10px sans-serif',  // 设置文本字体
            textAlpha: 1,             // 文本透明度
            maxWidth: 0               // 绘制文本最大长度，默认为0，【即不设定宽度限制】
        };
        var newOptions = Util.extend(defaultOptions, options);
        return newOptions;
    },

    clearLayer: function (id, w, h) {
        var self = this;
        var ctx = self.getContext(id);
        ctx.clearRect(0, 0, w, h);
    },

    /**
     * 矩形圆形方法
     * @param  {string} id      canvas元素的id名称
     * @param  {object} points  {x: 10, y: 10}
     * @param  {json} options   可选参数，填充色、边框色、边框粗细等
     * @return {object}         context对象
     */
    drawPoint: function (id, point, options) {
        var self = this;

        var _rectOptions = self.getCanvasOptions(options);
        var _type = _rectOptions.type;                // 多边形是否需要填充
        var _fillStyle = _rectOptions.fillStyle;      // 多边形填充色
        var _strokeStyle = _rectOptions.strokeStyle;  // 边框颜色
        var _lineWidth = _rectOptions.lineWidth;      // 边框宽度
        var _lineAlpha = _rectOptions.lineAlpha;      // 线条透明度
        var _fillAlpha = _rectOptions.fillAlpha;      // 填充透明度
        var _radius = _rectOptions.radius;            // 绘制圆形图形的半径
        var _sAngle = _rectOptions.sAngle;            // 绘制圆形图形的起始角度
        var _eAngle = _rectOptions.eAngle;            // 绘制圆形图形的结束角度
        var _counterclockwise = _rectOptions.counterclockwise; // 设置绘制圆形是否顺时针

        var ctx = self.getContext(id);
        ctx.beginPath();

        ctx.lineWidth = _lineWidth;
        ctx.strokeStyle = _strokeStyle;
        ctx.fillStyle = _fillStyle;
        ctx.globalAlpha = _lineAlpha;

        var _x = point.x;
        var _y = point.y;
        ctx.arc(_x, _y, _radius, _sAngle, _eAngle, _counterclockwise);
        if (_type === '1') {
            ctx.stroke();
        } else if (_type === '2') {
            ctx.globalAlpha = _fillAlpha;
            ctx.fill();
        } else if (_type === '3') {
            ctx.stroke();
            ctx.globalAlpha = _fillAlpha;
            ctx.fill();
        }
        return self;
    },

    /**
     * 矩形线条方法
     * @param  {string} id      canvas元素的id名称
     * @param  {array} points   [{x:,y:}, {x:,y:}]
     * @param  {json} options   可选参数，填充色、边框色、边框粗细等
     * @return {object}         context对象
     */
    drawLine: function (id, points, options) {
        var self = this;

        var _pointsLength = points.length;
        if (_pointsLength < 2) {console.log('points-length is not enougth!');return;}

        var _rectOptions = self.getCanvasOptions(options);
        var _strokeStyle = _rectOptions.strokeStyle;  // 边框颜色
        var _lineWidth = _rectOptions.lineWidth;      // 边框宽度
        var _lineAlpha = _rectOptions.lineAlpha;      // 线条透明度
        
        var ctx = self.getContext(id);
        ctx.beginPath();

        ctx.lineWidth = _lineWidth;
        ctx.strokeStyle = _strokeStyle;
        ctx.globalAlpha = _lineAlpha;

        var firstPointX = points[0].x,
            firstPointY = points[0].y;
        ctx.moveTo(firstPointX, firstPointY);
        for (var i = 1; i < _pointsLength; i++) {
            var tmpPointX = points[i].x,
                tmpPointY = points[i].y;
            ctx.lineTo(tmpPointX, tmpPointY);
        }
        ctx.stroke();
        return self;
    },

    /**
     * 矩形多边形方法
     * @param  {string} id      canvas元素的id名称
     * @param  {array} points   [{x:,y:}, {x:,y:}]
     * @param  {json} options   可选参数，填充色、边框色、边框粗细等
     * @return {object}         context对象
     */
    drawPolygon: function (id, points, options) {
        var self = this;

        var _pointsLength = points.length;
        if (_pointsLength < 4) {console.log('points-length is not enougth!');return;}

        var _rectOptions = self.getCanvasOptions(options);
        var _type = _rectOptions.type;                // 多边形是否需要填充
        var _fillStyle = _rectOptions.fillStyle;      // 多边形填充色
        var _strokeStyle = _rectOptions.strokeStyle;  // 边框颜色
        var _lineWidth = _rectOptions.lineWidth;      // 边框宽度
        var _lineAlpha = _rectOptions.lineAlpha;      // 线条透明度
        var _fillAlpha = _rectOptions.fillAlpha;      // 填充透明度
        
        var ctx = self.getContext(id);
        ctx.beginPath();

        ctx.lineWidth = _lineWidth;
        ctx.strokeStyle = _strokeStyle;
        ctx.fillStyle = _fillStyle;
        ctx.globalAlpha = _lineAlpha;

        var firstPointX = points[0].x,
            firstPointY = points[0].y;
        ctx.moveTo(firstPointX, firstPointY);
        for (var i = 1; i < _pointsLength; i++) {
            var tmpPointX = points[i].x,
                tmpPointY = points[i].y;
            ctx.lineTo(tmpPointX, tmpPointY);
        }
        if (_type === '1') {
            ctx.stroke();
        } else if (_type === '2') {
            ctx.globalAlpha = _fillAlpha;
            ctx.fill();
        } else if (_type === '3') {
            ctx.stroke();
            ctx.globalAlpha = _fillAlpha;
            ctx.fill();
        }
        return self;
    },

    /**
     * 获取字符串长度
     * @param  {[type]} text [description]
     * @return {[type]}      [description]
     */
    getTextStringLength: function (text) {
        if (typeof text !== 'string') return 0;
        var canvasElement = this.createCanvas(500, 50);
        var ctx = canvasElement.getContext("2d");
        var drwText = ctx.measureText(text);
        var textWidth = drwText.width;
        return textWidth;
    },

     /**
     * 矩形文本方法
     * @param  {string} id      canvas元素的id名称
     * @param  {string} text    绘制的文本内容
     * @param  {object} point   {x:,y:}
     * @param  {json} options   可选参数，文本透明度、颜色、字体等
     * @return {object}         context对象
     */
    drawText: function (id, text, point, options) {
        var self = this;

        var _rectOptions = self.getCanvasOptions(options);
        var _type = _rectOptions.type;                 // 多边形是否需要填充
        var _strokeStyle = _rectOptions.strokeStyle;   // 空心字体颜色
        var _fillStyle = _rectOptions.fillStyle;       // 实心字体颜色
        var _textAlpha = _rectOptions.textAlpha;       // 文本透明度
        var _font = _rectOptions.font;                 // 文本字体设置
        var _maxWidth = _rectOptions.maxWidth;         // 绘制文本的最大宽度
        var _textAlign = _rectOptions.textAlign;       // 文本显示位置

        var ctx = self.getContext(id);
        ctx.beginPath();

        ctx.fillStyle = _fillStyle;
        ctx.strokeStyle = _strokeStyle;
        ctx.globalAlpha = _textAlpha;
        ctx.font = _font;
        var tmpFontSize = _font.split(' ')[0];
        var textFontSize = Util.getPxNumber(tmpFontSize);

        var _x = 0;
        var _y = 0;
        var drwText = ctx.measureText(text);
        var textWidth = drwText.width;
        if (_textAlign === 'left') {
            _x = point.x;
            _y = point.y + textFontSize;
        } else if (_textAlign === 'center') {
            _x = point.x - parseFloat(textWidth / 2);
            _y = point.y + textFontSize;
        } else if (_textAlign === 'right') {
            _x = point.x - parseFloat(textWidth);
            _y = point.y + textFontSize;
        } else {
            console.log('textAlign setting error!');
            return;
        }
        
        if (_type === '1') {
            if (_maxWidth === 0) {
                // 不设定文本最大宽度
                ctx.strokeText(text, _x, _y);
            } else {
                ctx.strokeText(text, _x, _y, _maxWidth);
            }
            
        } else {
            if (_maxWidth === 0) {
                // 不设定文本最大宽度
                ctx.fillText(text, _x, _y);
            } else {
                ctx.fillText(text, _x, _y, _maxWidth);
            }
        }
        return self;
    }
};