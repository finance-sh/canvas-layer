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
    },
    /**
     * 将rem单位转为px单位
     * @type {Object}
     */
    getPxNumber: function (str) {
        if (typeof str === 'number') return str;
        if (typeof str === 'string' && str.indexOf('px') > -1) {
            return parseInt(str, 10);
        }
        if (typeof str === 'string' && str.indexOf('rem') > -1) {
            var remNumber = parseFloat(str) * 1;
            // 首先获取html的fontSize值
            var initFontSize = 10;
            var htmlFontSize = document.getElementsByTagName('html')[0].style.fontSize;
            if(htmlFontSize !== '') {
                initFontSize = parseFloat(htmlFontSize) * 1;
            }
            return remNumber * initFontSize;
        }
        return 10;
    },

    getRemNumber: function (str) {
        var initFontSize = 10;
        var htmlFontSize = document.getElementsByTagName('html')[0].style.fontSize;
        if(htmlFontSize !== '') {
            initFontSize = parseFloat(htmlFontSize) * 1;
        }
        if (typeof str === 'number') {
            return (str / initFontSize);
        }
        if (typeof str === 'string' && str.indexOf('px') > -1) {
            var pxNumber = parseFloat(str) * 1;
            return (pxNumber / initFontSize);
        }
        if (typeof str === 'string' && str.indexOf('rem') > -1) {
            var pxNumber = parseFloat(str) * 1;
            return pxNumber;
        }
        return 10;
    }
};