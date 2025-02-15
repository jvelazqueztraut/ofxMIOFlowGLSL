
precision highp float;

uniform sampler2D tex0;
uniform vec2 texOffset;
varying vec2 texCoordVarying;

uniform float blurSize;       
uniform float horizontalPass; // 0 or 1 to indicate vertical or horizontal pass
uniform float sigma;        // The sigma value for the gaussian function: higher value means more blur
// A good value for 9x9 is around 3 to 5
// A good value for 7x7 is around 2.5 to 4
// A good value for 5x5 is around 2 to 3.5
// ... play around with this based on what you need :)

const float pi = 3.14159265;

vec4 get2DOff(sampler2D tex ,vec2 coord) {
	vec4 col = texture2D(tex, coord);
	if (col.w >0.95)  col.z=col.z*-1.0;
	return vec4(col.y-col.x,col.z,1.0,1.0);
}


vec4 getColorCoded(float x, float y,vec2 scale) {
	vec2 xout = vec2(max(x,0.0),abs(min(x,0.0)))*scale.x;
	vec2 yout = vec2(max(y,0.0),abs(min(y,0.0)))*scale.y;
	float dirY = 1.0;
	if (yout.x > yout.y)  dirY=0.90;
	return vec4(xout.yx,max(yout.x,yout.y),dirY);
}

void main() {
	vec2 blurMultiplyVec = 0.0 < horizontalPass ? vec2(1.0, 0.0) : vec2(0.0, 1.0);

	// Incremental Gaussian Coefficent Calculation (See GPU Gems 3 pp. 877 - 889)
	vec3 incrementalGaussian;
	incrementalGaussian.x = 1.0 / (sqrt(2.0 * pi) * sigma);
	incrementalGaussian.y = exp(-0.5 / (sigma * sigma));
	incrementalGaussian.z = incrementalGaussian.y * incrementalGaussian.y;

	vec4 avgValue = vec4(0.0, 0.0, 0.0, 0.0);
	float coefficientSum = 0.0;

	// Take the central sample first...
	avgValue += get2DOff(tex0, texCoordVarying.st) * incrementalGaussian.x;
	coefficientSum += incrementalGaussian.x;
	incrementalGaussian.xy *= incrementalGaussian.yz;

	// Go through the remaining 8 vertical samples (4 on each side of the center)

	for (float i = 1.0; i <= 4.0 ; i++) {
		avgValue += get2DOff(tex0, texCoordVarying.st - i * texOffset * 
			blurMultiplyVec) * incrementalGaussian.x;         
		avgValue += get2DOff(tex0, texCoordVarying.st + i * texOffset * 
			blurMultiplyVec) * incrementalGaussian.x;         
		coefficientSum += 2.0 * incrementalGaussian.x;
		incrementalGaussian.xy *= incrementalGaussian.yz;
	}


	vec4 finColor = avgValue / coefficientSum;


	gl_FragColor = getColorCoded(finColor.x, finColor.y,vec2(1.0,1.0));
}
