// 核心方法是使用Object.defineProperty(object, property, descriptor)进行对象属性的监听，让对象属性变成可观察模式。
// 其中descriptor包含四个属性：enumerable:属性是否可枚举（默认为falses）；configurable:属性是否可被修改或者删除（默认为false）；
// get: 获取属性的方法；set:设置属性的方法


// observer函数的作用是遍历option对象中的属性，让每个属性进行响应式处理
function observer(option) {
    if (!option || typeof option !== 'object') return;
    Object.keys(option).forEach(key => {
        // 严格说应该根据属性是否是object进行递归响应式处理
        defineReactive(option, key, option[key]);
    });
}


// defineReactive实现对象属性的响应系统。
function defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            return val;
        },
        set: function(newVal) {
            if (newVal === val) return;
            cb(newVal);
        }
    })
}

// cb 函数表示视图更新的处理函数
function cb(val) {
    console.log(val);
}

// 创建一个vue对象, 这里的options.data代表的就是我们平时写在vue中的data
class Vue{
    constructor(options) {
        this._data = options.data;
        observer(this._data);
    }
};


let vue = new Vue({
    data: {
        test: 'the first vue demo'
    },
})

vue._data.test = 'hello world'; //进行视图更新