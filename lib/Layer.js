/**
 * 动画图层类【基类】
 * @author dingyang[dingyang9642@126.com]
 */
class AnimationLayer {
    /**
     * AnimationLayer类构造函数
     * @return {object}    默认实例化对象
     */
    constructor (id, options) {
		this.id = id;          // 图层id
		this.visible = true;   // 图层是否可见
		this.options = {       // 图层属性设置
			opacity: (options && options.opacity) ? options.opacity : 1.0,  // 图层透明度
			zIndex: (options && options.zIndex) ? options.zIndex : 0        // 图层zIndex层级
		};
        this.datas = (options.datas) ? options.datas : {};                  // 用户自定义数据
    }

	onAdd (animationMap) {
		this._animationMap = animationMap;
		this._animationMapContainer = this._animationMap.getContainer(); // 获取容器
		this._size = this._animationMap.getSize(); // 获取容器大小{w: h:}
        this._container = this.createCanvas(this.id, this._size.w, this._size.h);
        this.setzIndex();   // 设置index层级
		this.setOpacity();  // 设置canvas透明度
        this._animationMapContainer.appendChild(this._container); // 添加canvas至容器中
	}

    createCanvas (id, w, h) {
        var canvas = document.createElement('canvas');
        canvas.id = id;
        canvas.width = w;
        canvas.height = h;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        canvas.style.left = '0px';
        canvas.style.top = '0px';
        canvas.style.position = "absolute";
        return canvas;
    }

    /**
	 * 设置图层zIndex值
	 */
	setzIndex () {
        if (!isNaN(this.options.zIndex)) {
            this._container && (this._container.style.zIndex = this.options.zIndex);
        }
    }

	/**
	 * 设置图层透明度
	 */
	setOpacity () {
        if (!isNaN(this.options.opacity)) {
            this._container && (this._container.style.opacity = this.options.opacity);
        }
    }

    reSize () {
        this._size = this._animationMap.getSize(); // 获取容器大小{w: h:}
        this._container.width = this._size.w;
        this._container.height = this._size.h;
        this._container.style.width = this._size.w + 'px';
        this._container.style.height = this._size.h + 'px';
    }

    getSize () {
        return this._size;
    }
    // 清空图层，置于子图层实现
    clearLayer () {
        
    }
    
}