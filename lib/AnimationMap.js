/**
 * 定义动画容器类
 * @author dingyang[dingyang9642@126.com]
 */
class AnimationMap {
    /**
     * AnimationMap类构造函数
     * @param  {string} id 承载动画容器
     * @return {object}    默认实例化对象
     */
    constructor (id) {
        this._Contaniner = document.getElementById(id);         // 容器
        this._ContaninerHeight = this._Contaniner.offsetHeight; // 容器高度
        this._ContaninerWidth = this._Contaniner.offsetWidth;   // 容器宽度
        this.layers = [];

        /**DEBUG**/
        // console.log(this._ContaninerHeight); console.log(this._ContaninerWidth);
        /**END**/
    }

    /**
     * 获取
     * @return {[type]} [description]
     */
    getContainer () {
        return this._Contaniner;
    }

    reSize () {
        // 重设容器宽高
        this._ContaninerHeight = this._Contaniner.offsetHeight; // 容器高度
        this._ContaninerWidth = this._Contaniner.offsetWidth;   // 容器宽度       
        var _layers = this.layers;
        var _layersLength = _layers.length;
        for (var i = 0; i < _layersLength; i++) {
            var tmpLayer = _layers[i];
            tmpLayer.reSize();
        }
    }

    /**
     * 获取动画容器大小
     * @return {object} {w: xx, h: xx}
     */
    getSize () {
        var _w = this._ContaninerWidth,
            _h = this._ContaninerHeight;
        return {w: _w, h: _h};
    }

    addLayer (layer) {
        var self = this;
        var layerId = layer.id;
        var isLayerInMap = self.isLayerInMap(layerId);
        if (isLayerInMap) {
            console.log('this layer is in map!');
            return;
        }
        layer.onAdd(self);
        self.addLayerToLayers(layer);
    }

    removeLayerById (layerid) {
        var self = this;
        var isLayerInMap = self.isLayerInMap(layerid);
        if (!isLayerInMap) {
            console.log('this layer is not in map, you can not remove it!');
            return;
        }
        // 删除图层
        var _Contaniner = self.getContainer();
        var layerElement = document.getElementById(layerid);
        _Contaniner.removeChild(layerElement);
        self.removeLayerFromLayersById(layerid);
    }

    addLayerToLayers (layer) {
        var self = this;
        self.layers.push(layer);
        return true;
    }

    removeLayerFromLayersById (layerid) {
        var self = this;
        var layers = this.layers;
        var layersLength = layers.length;
        for (var i = 0; i < layersLength; i++) {
            var tmpLayer = layers[i];
            var tmpLayerId = tmpLayer.id;
            if (tmpLayerId === layerid) {
                this.layers.splice(i, 1);
                break;
            }
        }
        return true;
    }

    isLayerInMap (layerid) {
        var result = false;
        var layers = this.layers;
        var layersLength = layers.length;
        for (var i = 0; i < layersLength; i++) {
            var tmpLayer = layers[i];
            var tmpLayerId = tmpLayer.id;
            if (tmpLayerId === layerid) {
                result = true;
                break;
            }
        }
        return result;
    }
}