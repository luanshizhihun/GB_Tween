# 缓动系统文档说明
## 说明
本缓动系统目的是替换egret中Tween系统。因为egret系统自带的tween运行依赖引擎自身tick，在切换到后台或浏览器失去焦点时引擎会暂停所有tick。这将导致所有正在运行的缓动动画被挂起。如果游戏流程高度依赖缓动动画，那么游戏逻辑将会出现无法预知的问题。为了彻底根除此问题，故而编写此缓动系统库。本库脱离egret系统运行，不会受限于egret的tick。即便失去焦点也不会被挂起。同时考虑到进行中的项目有可能已经大量使用egret的tween缓动系统，因此常用方法参照egret的tween方法命名，所以进行中的项目可以轻松使用，只需替换命名空间“egret.Tween”为"GZTweenHelper"即可。另外，本库编写了少量扩展方法，方便今后使用。

## 使用例
下面是一个简单的使用例子，展现了缓动系统的运行方式，同时提供了play方法帮助控制开启时间，更加灵活。

```
let a = GB_TweenHelper.get(obj, { loop: true })
    .to({ y: 300, alpha: 0.1, rotation: 90 }, 5000)
    .wait(500)
    .to({ y: -300, alpha: 1, rotation: 0 }, 5000)
    .call((param) => {
     }, this, ["name"]);
a.play(false);
```

## 配置说明
只需将缓动库文件夹放入项目src目录中即可

## api说明

#### get

生成缓动对象  
参数：  
target {any} 要激活 Tween 的对象  
props {any} 参数，支持loop(循环播放) onChange(变化函数) onChangeObj(变化函数作用域)  

返回值：GZTweenHelper

> GZTweenHelper.get(target,{loop:true});  

#### removeTweens

删除对象身上的缓动动画  
参数：  
target {any} 需要删除的对象    

返回值：GZTweenHelper

> GZTweenHelper.removeTweens(target); 

#### removeAllTweens

删除所有缓动动画  
参数：无   

返回值：GZTweenHelper

> GZTweenHelper.removeAllTweens(); 

#### setTweenType

设置缓动方法  
参数：  
changeType {twChangeTypeStruct} 缓动变化类型  
sportType {twSportTypeStruct} 缓动方法类型  

返回值：void

> tweenObj.setTweenType(twChangeTypeStruct.easeInOut, twSportTypeStruct.Bounce); 

#### to

增加缓动动作  
参数：  
props {any} 缓动参数，请参照egret的Tween  
duration {number} 持续时间  

返回值：GZTweenHelper

> tweenObj.to(props, 1000);

#### wait

增加延时等待  
参数：   
duration {number} 持续时间  

返回值：GZTweenHelper

> tweenObj.wait(1000);

#### call

增加回调  
参数：   
callback {Function} 回调方法，可返回数据，返回的数据是第三个参数：param  
thisObj {any} 执行回调对象  
params {array} 回调方法参数  

返回值：GZTweenHelper

> tweenObj.call((param)=>{}, this, ["name"]);

#### play

执行缓动  
参数：   
isReplay {boolean} 是否重制对象参数为初始值，默认是true   

返回值：void

> tweenObj.play(true);

#### stop

停止缓动  
参数：   
isReplay {boolean} 是否重制对象参数为初始值，默认是false   

返回值：void

> tweenObj.stop(false);
