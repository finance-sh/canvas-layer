var Util = {

    /**
     * 对象合并【待完善】
     * @param  {object} originalObject 默认json对象数据
     * @param  {object} ownObject      用户自定义对象
     * @return {object}                合并之后的返回对象
     */
    extend: function (originalObject, ownObject) {
        // 1、进行json对象深拷贝
        var _originalObject = this.deepCopy(originalObject, {});
        var _ownObject = this.deepCopy(ownObject, {});
        // 2、循环合并
        for (var key in _ownObject) {
            _originalObject[key] = _ownObject[key];
        }
        return _originalObject;
    },

    /**
     * 深拷贝
     * @param  {object} p 需要拷贝的对象
     * @param  {object} c 拷贝目标对象类型【[] || {}】
     * @return {object}   深拷贝之后的返回对象
     */
    deepCopy: function (p, c) {
        c = c || {};
        for (var i in p) {
        　　if (typeof p[i] === 'object') {
        　　　　c[i] = (p[i].constructor === Array) ? [] : {};
                this.deepCopy(p[i], c[i]);
        　　} else {
        　　　　　c[i] = p[i];
        　　}
        }
        return c;
    }
};