#Class


实现简单类的创建和继承

---


##使用说明

###create  `Class.create([parent,]properties)`

创建一个新类

**参数**
`parent` 继承的父类
`properties` 要混入的实例属性，可以选择一下类型：
+ `object` 类属性的集合，同时可以定义一些特殊功能，例如： `Extends` 、`Implements` 、`Statics` 、`init`
+ `function` 作为初始化方法`init`

**属性：Extends**
+ `class` 继承指定的父类，注意只能有一个父类，不支持多继承。

**属性：Implements**
+ `class` 把已创建类的属性混入到类中
+ `array` 把多个已创建类的属性混入到类中

**属性：Statics**
+ `object` 创建类的私有属性

**属性：init**
+ `function` 标明初始化方法，会在构建实例时调用


看一看例子：

Class Example:
```js
/* pig.js */
define(function(require, exports, module) {
    var Class = require('class');

    var Pig = Class.create({
        Statics:{
            title:'A1'
        },

        init: function(name) {
            this.name = name;
        },

        talk: function() {
            alert('我是' + this.name);
        },

        pigType: 'normalPig'

    });

    module.exports = Pig;
});
```

```js
/* pig-test.js */
define(function(require, exports, module) {
    var Pig = require('./pig');

    Pig.title; // return 'A1'

    var MyPig = new Pig('宝妮猪');
    MyPig.talk(); // alert '我是宝妮猪' 
});
```


Extends Example:
```js
/* pink-pig.js */
define(function(require, exports, module) {
    var Class = require('class');
        var Pig = require('./pig');

    var PinkPig = Class.create({
        Extends: Pig,

        init: function(name) {
            this.parent(name); // 调用Pig 类中的init方法
        },

        pigType: 'pinkPig'
    });

    module.exports = PinkPig;
});
```

**还可以将父类传入第一个参数实现继承**
```js
/* pink-pig-extend-parent.js */
define(function(require, exports, module) {
    var Class = require('class');
        var Pig = require('./pig');

    var PinkPig = Class.create(Pig, {
        init: function(name) {
            this.parent(name); // 调用Pig 类中的init方法
        },

        pigType: 'pinkPig'
    });

    module.exports = PinkPig;
});
```

```js
/* pink-pig-test.js */
define(function(require, exports, module) {
    var PinkPig = require('./pink-pig');

    PinkPig.pigType; // return 'pinkPig'

    var MyPinkPig = new PinkPig('粉红色宝妮猪');
    MyPinkPig.talk(); // alert '我是粉红色宝妮猪' 
});
```

Implements Example:
```js
/* flyable-pink-pig.js */
define(function(require, exports, module) {
    var Class = require('class');
    var PinkPig = require('./pink-pig');

    var Flyable = {
        fly: function() {
            alert('我飞起来了');
        }
    };
    var FlyablePinkPig = Class.create({
        Extends: PinkPig,
        Implements: Flyable,

        init: function(name) {
            this.parent(name);
        },

        pigType: 'flyablePinkPig'
    });
    
    module.exports = FlyablePinkPig;
});
```

```js
/* flyable-pink-pig-test.js */
define(function(require, exports, module) {
    var FlyablePinkPig = require('./flyable-pink-pig');

    var MyFlyablePinkPig = new FlyablePinkPig('飞天宝妮猪');
    MyFlyablePinkPig.talk(); // alert '我是飞天宝妮猪'
    MyFlyablePinkPig.fly(); // alert '我飞起来了'
});
```



**注意：** 由 `Class.create` 创建的类，自动具有 `extend` 和 `implement` 方法，功能基本分别与 `Extends` 和 `Implements` 一致



###extend  `MyClass.extend(properties)`

例子：

```js
/* pink-pig-extend.js */
define(function(require, exports, module) {
    var Pig = require('./pig');

    var PinkPig = Pig.extend({
        init: function(name) {
            this.parent(name); // 调用Pig 类中的init方法
        },

        pigType: 'pinkPig'
    });

    module.exports = PinkPig;
});
```

```js
/* pink-pig-extend-test.js */
define(function(require, exports, module) {
    var PinkPig = require('./pink-pig-extend');

    PinkPig.pigType; // return 'pinkPig'

    var MyPinkPig = new PinkPig('粉红色宝妮猪');
    MyPinkPig.talk(); // alert '我是粉红色宝妮猪' 
});
```


###implement  `MyClass.implement(properties)`

对已创建的类混入实例属性，该方法与 `Implements` 类似，唯一区别就是 `Implements` 能使用数组形式混入多个实例，`implement` 不能

例子：
```js
/* flyable-pink-pig-job-test.js */
define(function(require, exports, module) {
    var FlyablePinkPig = require('./flyable-pink-pig');

    FlyablePinkPig.implement({
        job: function() {
            alert('收集108粒珍珠');
        }
    });

    var MyFlyablePinkPig = new FlyablePinkPig('飞天宝妮猪');

    MyFlyablePinkPig.talk(); // alert '我是飞天宝妮猪'
    MyFlyablePinkPig.fly(); // alert '我飞起来了'
    MyFlyablePinkPig.job(); // alert '收集108粒珍珠'
});
```


##速度竞赛

http://jsperf.com/class-speed/2