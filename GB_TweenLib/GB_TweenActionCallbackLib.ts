class GB_TweenActionCallbackLib extends GB_TweenActionBase {
	private _completeCB: () => void;// 完成回调
	private _target: egret.DisplayObject;// 缓动动画对象

	/**
	 * 构造函数
	 * @param tg 缓动对象
	 * @param ev 结束参数
	 * @param dy 持续时间
	 * @param completeCB 完成回调
	 */
	public constructor(tg: egret.DisplayObject, completeCB: () => void) {
		super();
		this._target = tg;
		this._completeCB = completeCB;
	}

	/**
	 * 动画完成
	 */
	private _complete() {
		this._completeCB();
	}

	/**
	 * 开始播放
	 */
	public play(isReplay: boolean) {
		this._complete();
	}
}