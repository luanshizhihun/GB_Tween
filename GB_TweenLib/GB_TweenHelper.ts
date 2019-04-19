/**
 * 缓动动画工具，因为白鹭的缓动动画太sb了，所以希望自己做一个来替换掉。
 * 第一期是希望制作一个简单的缓动出来，包括最基本的方法，复杂使用不在当
 * 前考虑范围内。
 * version 1.0.2
 */
class GB_TweenHelper {
	private static _tweens: GB_TweenHelper[] = [];// 缓动对象缓存
	private _target: egret.DisplayObject;// 要激活 Tween 的对象
	private _props_loop: boolean;// 参数，支持loop(循环播放) onChange(变化函数) onChangeObj(变化函数作用域)
	private _props_onChange: Function;// 参数，支持loop(循环播放) onChange(变化函数) onChangeObj(变化函数作用域)
	private _props_onChangeObj: Function;// 参数，支持loop(循环播放) onChange(变化函数) onChangeObj(变化函数作用域)
	private _actionGroup: GB_TweenActionGroupLib;// 动作容器，所有的动作都会存放在这里

	// 构造函数
	public constructor(target: egret.DisplayObject, props) {
		this._target = target;
		this._props_loop = props && props.loop ? props.loop : false;
		this._props_onChange = props && props.onChange ? props.onChange : null;
		this._props_onChangeObj = props && props.onChangeObj ? props.onChangeObj : null;
		this._actionGroup = new GB_TweenActionGroupLib(target, this._props_loop);
		GB_TweenHelper._tweens.push(this);
		// 模拟析构函数，当对象被删除的时候调用并删除对象内容
		target.addEventListener(egret.Event.REMOVED_FROM_STAGE, this._reConstructor, this)
	}

	// 析构函数
	public _reConstructor() {
		egret.log("执行析构函数，删除缓动对象");
		GB_TweenHelper.removeTweens(this._target);
		this._target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this._reConstructor, this);
	}

	/**
	 * 生成一个缓动对象
	 * @param target {any} 要激活 Tween 的对象
     * @param props {any} 参数，支持loop(循环播放) onChange(变化函数) onChangeObj(变化函数作用域)
     * @param pluginData {any} 暂未实现
     * @param override {boolean} 暂未实现。
	 */
	public static get(target: any, props?: {
		loop?: boolean;
		onChange?: Function;
		onChangeObj?: any;
	}, pluginData?: any, override?: boolean): GB_TweenHelper {
		return new GB_TweenHelper(target, props);
	}

	/**
     * 删除一个对象上的全部 Tween 动画
     * @param target  需要移除 Tween 的对象
     */
	public static removeTweens(target: egret.DisplayObject) {
		let tweens = GB_TweenHelper._tweens;
		for (let i = tweens.length - 1; i >= 0; i--) {
			if (tweens[i]._target == target) {
				tweens[i].stop();
				tweens.splice(i, 1);
			}
		}
	};

	/**
     * 删除所有 Tween
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
	public static removeAllTweens() {
		let tweens = GB_TweenHelper._tweens;
		for (let i = 0, l = tweens.length; i < l; i++) {
			let tween_2 = tweens[i];
			tween_2.stop();
		}
		tweens.length = 0;
	};

	/**
	 * 添加缓动动画
	 */
	public to(props: any, duration: number = 0, ease: Function = null): GB_TweenHelper {
		this._actionGroup.addAction(props, duration);
		return this;
	}

	/**
	 * 添加延时等待
	 */
	public wait(time: number): GB_TweenHelper {
		this._actionGroup.addWaitAction(time);
		return this;
	}

	/**
	 * 添加回调方法
	 */
	public call(callback: Function, thisObj: any = null, params: any[] = []): GB_TweenHelper {
		this._actionGroup.addCallbackAction(callback, thisObj, params);
		return this;
	}

	/**
	 * 设置缓动方法
	 */
	public setTweenType(changeType: twChangeTypeStruct, sportType: twSportTypeStruct) {
		this._actionGroup.setTweenType(changeType, sportType);
	}

	public play(isReplay: boolean = true) {
		this._actionGroup.play(isReplay);
	}

	public stop(isRecover: boolean = false) {
		this._actionGroup.stop(isRecover);
	}

}
