/**
	 * Linear：线性匀速运动效果；
	 * Quadratic：二次方的缓动（t^2）；
	 * Cubic：三次方的缓动（t^3）；
	 * Quartic：四次方的缓动（t^4）；
	 * Quintic：五次方的缓动（t^5）；
	 * Sinusoidal：正弦曲线的缓动（sin(t)）；
	 * Exponential：指数曲线的缓动（2^t）；
	 * Circular：圆形曲线的缓动（sqrt(1-t^2)）；
	 * Elastic：指数衰减的正弦曲线缓动；
	 * Back：超过范围的三次方缓动（(s+1)*t^3 – s*t^2）；
	 * Bounce：指数衰减的反弹缓动。
	 */
class GB_TweenAlgorithmHelper {
	public constructor() {
	}

	public static instance = null;
	public static getInstance(): GB_TweenAlgorithmHelper {
		if (GB_TweenAlgorithmHelper.instance == null) {
			GB_TweenAlgorithmHelper.instance = new GB_TweenAlgorithmHelper();
		}
		return GB_TweenAlgorithmHelper.instance;
	}

	/**
 	* 缓动算法类，所有缓动相关算法都在这里编写
 	* t: current time（当前时间）；
 	* b: beginning value（初始值）；
 	* c: change in value（变化量）；
 	* d: duration（持续时间）。
 	*/

	public Linear(t: number, b: number, c: number, d: number): number {
		let changeV = (c - b) * t / d;
		return b + changeV;
	}
	///////////////////////////////////完///////////////////////////////////////

	public Quadratic_easeIn(t: number, b: number, c: number, d: number): number {
		let changeV = (c - b) * (t /= d) * t;
		return b + changeV;
	}

	public Quadratic_easeOut(t: number, b: number, c: number, d: number): number {
		let changeV = -(c - b) * (t /= d) * (t - 2);
		return b + changeV;
	}

	public Quadratic_easeInOut(t: number, b: number, c: number, d: number): number {
		if ((t /= d / 2) < 1) return (c - b) / 2 * t * t + b;
		return -(c - b) / 2 * ((--t) * (t - 2) - 1) + b;
	}
	////////////////////////////////////完//////////////////////////////////////

	public Cubic_easeIn(t: number, b: number, c: number, d: number): number {
		return (c - b) * (t /= d) * t * t + b;
	}

	public Cubic_easeOut(t: number, b: number, c: number, d: number): number {
		return (c - b) * ((t = t / d - 1) * t * t + 1) + b;
	}

	public Cubic_easeInOut(t: number, b: number, c: number, d: number): number {
		if ((t /= d / 2) < 1) return (c - b) / 2 * t * t * t + b;
		return (c - b) / 2 * ((t -= 2) * t * t + 2) + b;
	}
	////////////////////////////////////wan//////////////////////////////////////

	public Quart_easeIn(t: number, b: number, c: number, d: number): number {
		return (c - b) * (t /= d) * t * t * t + b;
	}

	public Quart_easeOut(t: number, b: number, c: number, d: number): number {
		return -(c - b) * ((t = t / d - 1) * t * t * t - 1) + b;
	}

	public Quart_easeInOut(t: number, b: number, c: number, d: number): number {
		if ((t /= d / 2) < 1) return (c - b) / 2 * t * t * t * t + b;
		return -(c - b) / 2 * ((t -= 2) * t * t * t - 2) + b;
	}
	///////////////////////////////////wan///////////////////////////////////////

	public Quint_easeIn(t: number, b: number, c: number, d: number): number {
		return (c - b) * (t /= d) * t * t * t * t + b;
	}

	public Quint_easeOut(t: number, b: number, c: number, d: number): number {
		return (c - b) * ((t = t / d - 1) * t * t * t * t + 1) + b;
	}

	public Quint_easeInOut(t: number, b: number, c: number, d: number): number {
		if ((t /= d / 2) < 1) return (c - b) / 2 * t * t * t * t * t + b;
		return (c - b) / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	}
	///////////////////////////////////wan////////////////////////////////////////

	public Sine_easeIn(t: number, b: number, c: number, d: number): number {
		return -(c - b) * Math.cos(t / d * (Math.PI / 2)) + (c - b) + b;
	}

	public Sine_easeOut(t: number, b: number, c: number, d: number): number {
		return (c - b) * Math.sin(t / d * (Math.PI / 2)) + b;
	}

	public Sine_easeInOut(t: number, b: number, c: number, d: number): number {
		return -(c - b) / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	}
	/////////////////////////////////////wan//////////////////////////////////////

	public Expo_easeIn(t: number, b: number, c: number, d: number): number {
		return (t == 0) ? b : (c - b) * Math.pow(2, 10 * (t / d - 1)) + b;
	}

	public Expo_easeOut(t: number, b: number, c: number, d: number): number {
		return (t == d) ? c : (c - b) * (-Math.pow(2, -10 * t / d) + 1) + b;
	}

	public Expo_easeInOut(t: number, b: number, c: number, d: number): number {
		if (t == 0) return b;
		if (t == d) return c;
		if ((t /= d / 2) < 1) return (c - b) / 2 * Math.pow(2, 10 * (t - 1)) + b;
		return (c - b) / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	}
	/////////////////////////////////////wan//////////////////////////////////////

	public Circ_easeIn(t: number, b: number, c: number, d: number): number {
		return -(c - b) * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	}

	public Circ_easeOut(t: number, b: number, c: number, d: number): number {
		return (c - b) * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	}

	public Circ_easeInOut(t: number, b: number, c: number, d: number): number {
		if ((t /= d / 2) < 1) return -(c - b) / 2 * (Math.sqrt(1 - t * t) - 1) + b;
		return (c - b) / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	}
	/////////////////////////////////////wan//////////////////////////////////////

	public Elastic_easeIn(t: number, b: number, c: number, d: number): number {
		let s;
		if (t == 0) return b;
		if ((t /= d) == 1) return c;
		let p = d * .3;
		// if (!a || a < Math.abs(c)) {
		s = p / 4;
		let a = (c - b);
		// } else {
		// 	s = p / (2 * Math.PI) * Math.asin(c / a);
		// }
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	}

	public Elastic_easeOut(t: number, b: number, c: number, d: number): number {
		let s;
		if (t == 0) return b;
		if ((t /= d) == 1) return c;
		let p = d * .3;
		// if (!a || a < Math.abs(c)) {
		let a = (c - b);
		s = p / 4;
		// } else {
		// 	s = p / (2 * Math.PI) * Math.asin(c / a);
		// }
		return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + (c - b) + b);
	}

	public Elastic_easeInOut(t: number, b: number, c: number, d: number): number {
		let s;
		if (t == 0) return b;
		if ((t /= d / 2) == 2) return c;
		let p = d * (.3 * 1.5);
		// if (!a || a < Math.abs(c)) {
		let a = (c - b);
		s = p / 4;
		// } else {
		// 	s = p / (2 * Math.PI) * Math.asin(c / a);
		// }
		if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + (c - b) + b;
	}
	////////////////////////////////////wan///////////////////////////////////////

	public Back_easeIn(t: number, b: number, c: number, d: number): number {
		let s = 1.70158;
		return (c - b) * (t /= d) * t * ((s + 1) * t - s) + b;
	}

	public Back_easeOut(t: number, b: number, c: number, d: number): number {
		let s = 1.70158;
		return (c - b) * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	}

	public Back_easeInOut(t: number, b: number, c: number, d: number): number {
		let s = 1.70158;
		if ((t /= d / 2) < 1) return (c - b) / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		return (c - b) / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	}
	////////////////////////////////////wan///////////////////////////////////////

	public Bounce_easeIn(t: number, b: number, c: number, d: number): number {
		return (c - b) - this.Bounce_easeOut(d - t, 0, (c - b), d) + b;
	}

	public Bounce_easeOut(t: number, b: number, c: number, d: number): number {
		if ((t /= d) < (1 / 2.75)) {
			return (c - b) * (7.5625 * t * t) + b;
		} else if (t < (2 / 2.75)) {
			return (c - b) * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
		} else if (t < (2.5 / 2.75)) {
			return (c - b) * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
		} else {
			return (c - b) * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
		}
	}

	public Bounce_easeInOut(t: number, b: number, c: number, d: number): number {
		if (t < d / 2) {
			return this.Bounce_easeIn(t * 2, 0, (c - b), d) * .5 + b;
		} else {
			return this.Bounce_easeOut(t * 2 - d, 0, (c - b), d) * .5 + (c - b) * .5 + b;
		}
	}
}