class GB_TweenActionWaitLib extends GB_TweenActionBase {
	private _completeCB: () => void;// 完成回调
	private _target: egret.DisplayObject;// 缓动动画对象
	private _beginTime: number;// 开始时间

	private _isOver: boolean;// 结束标记
	private _duration: number;// duration（持续时间）。
	private _timeoutHandle: number;// 缓动延时句柄

	/**
	 * 构造函数
	 * @param tg 缓动对象
	 * @param ev 结束参数
	 * @param dy 持续时间
	 * @param completeCB 完成回调
	 */
	public constructor(tg: egret.DisplayObject,  dy: number, completeCB: () => void) {
		super();
		this._target = tg;
		this._duration = dy;
		this._completeCB = completeCB;
		this._isOver = true;
	}

	/**
	 * 动画完成
	 */
	private _complete() {
		// egret.log("等待回调执行");
		this._completeCB();
	}

	/**
	 * 开始播放
	 */
	public play(isReplay: boolean) {
		if (!this._isOver) {
			return;
		}
		this._isOver = false;
		this._timeoutHandle = setTimeout(() => {
			this.stop();
		}, this._duration);
	}

	/**
	 * 停止
	 */
	public stop(isRecover: boolean = false) {
		this._isOver = true;
		clearInterval(this._timeoutHandle);
		this._complete();
	}
}