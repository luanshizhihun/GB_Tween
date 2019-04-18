/**
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）；
 * d: duration（持续时间）。
 */
class GB_TweenActionLib extends GB_TweenActionBase {
	private _completeCB: () => void;// 完成回调
	private _target: egret.DisplayObject;// 缓动动画对象
	private _beginTime: number;// 开始时间

	private _isOver: boolean;// 结束标记
	private _beginValue: any;// 初始值
	private _endValue: any;// 变化值
	private _duration: number;// duration（持续时间）。

	private _timeoutHandle: number;// 缓动延时句柄
	private _changeType: twChangeTypeStruct;// 变化类型，3个
	private _sportType: twSportTypeStruct;// 运动类型，例如匀速

	/**
	 * 构造函数
	 * @param tg 缓动对象
	 * @param ev 结束参数
	 * @param dy 持续时间
	 * @param completeCB 完成回调
	 */
	public constructor(tg: egret.DisplayObject, ev: any, dy: number, completeCB: () => void) {
		super();
		this._target = tg;
		this._endValue = ev;
		this._duration = dy;
		this._completeCB = completeCB;
		this._beginValue = {};
		this._isOver = true;
		this._changeType = twChangeTypeStruct.easeIn;
		this._sportType = twSportTypeStruct.Linear;
	}

	/**
	 * 更新缓动动画
	 * @param dy 更新时间
	 */
	private _upDate(dy: number): boolean {
		let isComplete = false;
		if (dy > this._duration) {
			dy = this._duration
			isComplete = true;
		}

		for (let key in this._beginValue) {
			let nextValue = 0;
			if (this._sportType == twSportTypeStruct.Linear) {
				nextValue = GB_TweenAlgorithmHelper.getInstance().Linear(dy, this._beginValue[key], this._endValue[key], this._duration);
			} else {
				nextValue = GB_TweenAlgorithmHelper.getInstance()[this._sportType + "_" + this._changeType](dy, this._beginValue[key], this._endValue[key], this._duration);
			}

			this._target[key] = nextValue;
			// egret.log("key===" + key + ",value" + nextValue);
		}
		return isComplete;
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
		this._isOver = false;
		for (let key in this._endValue) {
			this._beginValue[key] = this._target[key];
		}
		this._beginTime = (new Date()).getTime();
		if (isReplay) {
			this.recover();
		}

		this._timeoutHandle = setInterval(() => {
			let now: number = (new Date()).getTime();
			let isc = this._upDate(now - this._beginTime);
			if (isc) {
				this.stop();
			}
		}, 17);
	}

	/**
	 * 停止
	 */
	public stop(isRecover: boolean = false) {
		this._isOver = true;
		clearInterval(this._timeoutHandle);
		if (isRecover) {
			this.recover();
		}

		this._complete();
	}

	/**
	 * 恢复初始状态
	 */
	public recover() {
		for (let key in this._beginValue) {
			this._target[key] = this._beginValue[key];
		}
	}

	/**
	 * 设置变化参数
	 * @param changeType 变化类型
	 * @param sportType 运动类型
	 */
	public setTweenType(changeType: twChangeTypeStruct, sportType: twSportTypeStruct) {
		if (this._isOver) {
			this._changeType = changeType;
			this._sportType = sportType;
		}
	}
}