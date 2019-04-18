class twSportTypeStruct {
	static Linear = "Linear";//线性匀速运动效果；
	static Quadratic = "Quadratic";//二次方的缓动（t^2）；
	static Cubic = "Cubic";//三次方的缓动（t^3）；
	static Quartic = "Quart";//四次方的缓动（t^4）；
	static Quintic = "Quint";//五次方的缓动（t^5）；
	static Sinusoidal = "Sine";//正弦曲线的缓动（sin(t)）；
	static Exponential = "Expo";//指数曲线的缓动（2^t）；
	static Circular = "Circ";//圆形曲线的缓动（sqrt(1-t^2)）；
	static Elastic = "Elastic";//指数衰减的正弦曲线缓动；
	static Back = "Back";//超过范围的三次方缓动（(s+1)*t^3 – s*t^2）；
	static Bounce = "Bounce";//指数衰减的反弹缓动。
}

class twChangeTypeStruct {
	static easeIn = "easeIn";// 由慢到快
	static easeOut = "easeOut";// 由快到慢
	static easeInOut = "easeInOut";// 由慢到快到慢
}