class GB_TweenActionGroupLib {
	private _target: egret.DisplayObject;// 缓动对象
	private _actions: GB_TweenActionBase[];// 动作群管理
	private _actionIndex: number;// 播放动作编号

	private _beginValue: any;// 初始值
	private _isLoop: boolean;// 是否循环
	private _completeCB: Function;// 完成回调
	private _isReplay:boolean;// 是否重制参数
	public constructor(tg: egret.DisplayObject, loop: boolean, completeCB: Function = null) {
		this._target = tg;
		this._isLoop = loop;
		this._actions = [];
		this._actionIndex = 0;
		this._completeCB = completeCB;
		this._beginValue = {};
		this._isReplay = false;
	}

	/**
	 * 播放动画
	 */
	public play(isReplay: boolean) {
		this._isReplay = isReplay;
		this.playPrivate(isReplay);
	}

	/**
	 * 私有播放动画
	 */
	private playPrivate(isReplay: boolean) {
		if (isReplay) {
			this.recover();
		}
		let act = this._actions[this._actionIndex];
		this._actionIndex++;
		// this._actionIndex >= this._actions.length ? this._actionIndex = 0 : 0;
		if (act) {
			act.play(isReplay);
		} else {
			this._actionIndex = 0;
			if (this._isLoop) {
				this.playPrivate(this._isReplay);
			} else if (this._completeCB) {
				this._completeCB();
			}
		}
	}

	/**
	 * 添加动画
	 */
	public addAction(ev: any, dy: number, sportT: twSportTypeStruct = twSportTypeStruct.Linear, changeT: twChangeTypeStruct = twChangeTypeStruct.easeIn) {
		let act = new GB_TweenActionLib(this._target, ev, dy, () => {
			this.playPrivate(false);
		});
		act.setTweenType(changeT, sportT);
		this._actions.push(act);
		for (let key in ev) {
			if (!this._beginValue[key]) {
				this._beginValue[key] = this._target[key];
			}
		}
	}

	/**
	 * 添加延时
	 */
	public addWaitAction(dy: number) {
		let act = new GB_TweenActionWaitLib(this._target, dy, () => {
			this.playPrivate(false);
		});
		this._actions.push(act);
	}

	/**
	 * 添加回调
	 */
	public addCallbackAction(callback: Function, thisObj: any, params: any[]) {
		let act = new GB_TweenActionCallbackLib(this._target, () => {
			if (thisObj) {
				callback.call(thisObj, params);
			} else {
				callback(params);
			}

			this.playPrivate(false);
		});
		this._actions.push(act);
	}

	/**
	 * 设置缓动方法
	 */
	public setTweenType(changeType: twChangeTypeStruct, sportType: twSportTypeStruct) {
		for (let act of this._actions) {
			act.setTweenType(changeType, sportType);
		}

	}

	/**
	 * 重制动画
	 */
	private recover() {
		for (let key in this._beginValue) {
			this._target[key] = this._beginValue[key];
		}
	}

	/**
	 * 停止动画
	 */
	public stop(isRecover: boolean = false) {
		for (let act of this._actions) {
			act.stop(isRecover);
		}
	}
}