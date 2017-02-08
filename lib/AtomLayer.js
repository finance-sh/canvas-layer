/**
 * 粒子图层类
 * @author dingyang[dingyang9642@126.com]
 */
class AtomLayer extends AnimationLayer {
    /**
     * AtomLayer类构造函数
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
            img_url: './ceshi.jpg',
            img_width: 600,
            img_height: 337
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
    
    getImageData () {
        var self = this;
        var atomOptions = self._datas;
        var _imgUrl     = atomOptions.img_url,
            _imgWidth   = atomOptions.img_width,
            _imgHeight  = atomOptions.img_height;
        CanvasUtil.getImageData(_imgUrl, _imgWidth, _imgHeight, function(imageData) {
            CanvasUtil.getParticles(imageData, function(datas){
                var particles = datas;
                var particlesLength = particles.length;
                for (var i = 0; i < particlesLength; i++) {
                    var tmpParticle = particles[i];
                    CanvasUtil.drawPolygon(self.id, [{
                        x: tmpParticle.pos.x,
                        y: tmpParticle.pos.y
                    },{
                        x: tmpParticle.pos.x + 1,
                        y: tmpParticle.pos.y
                    },{
                        x: tmpParticle.pos.x + 1,
                        y: tmpParticle.pos.y + 1
                    },{
                        x: tmpParticle.pos.x,
                        y: tmpParticle.pos.y + 1
                    },{
                        x: tmpParticle.pos.x,
                        y: tmpParticle.pos.x
                    }], {
                        type: '2',
                        fillStyle: tmpParticle.fillStyle
                    });
                }
            });
        });
    }

    loop () {
        
    }
    
    render () {
        var self = this;
        self.getImageData();
    }
    
}