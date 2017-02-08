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
            img_url: './baidu.JPG',
            img_width: 246,
            img_height: 80
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
        var atomOptions = this._datas;
        var _imgUrl     = atomOptions.img_url,
            _imgWidth   = atomOptions.img_width,
            _imgHeight  = atomOptions.img_height;
        CanvasUtil.getImageData(_imgUrl, _imgWidth, _imgHeight, function(imageData) {
            console.log(imageData);
            CanvasUtil.getParticles(imageData, function(){
                
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