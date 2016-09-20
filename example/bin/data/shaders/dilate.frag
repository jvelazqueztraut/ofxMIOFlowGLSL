uniform sampler2DRect tex0;
varying vec2 texCoord;

uniform float dilateSize;

vec4 get2DOff(sampler2DRect tex ,vec2 coord) {
	vec4 col = texture2DRect(tex, coord);
	if (col.w >0.95)  col.z=col.z*-1.0;
	return vec4(col.y-col.x,col.z,1.0,1.0);
}

vec4 getColorCoded(float x, float y, vec2 scale) {
	vec2 xout = vec2(max(x,0.0),abs(min(x,0.0)))*scale.x;
	vec2 yout = vec2(max(y,0.0),abs(min(y,0.0)))*scale.y;
	float mag = sqrt(x*x + y*y)*scale.x*scale.y;
	return vec4(xout.xy,max(yout.x,yout.y),mag);
}

void main() {  
	// Take the central sample first...
	vec4 value = get2DOff(tex0, texCoord.st);
	float mag = value.x*value.x + value.y*value.y;
	// Go through the remaining 8 vertical samples (4 on each side of the center)

	vec4 newValue = vec4(0.0, 0.0, 0.0, 0.0);
	float newMag = 0.0;

	for (float x = -1.0*dilateSize; x <= dilateSize; x++) {
		for (float y = -1.0*dilateSize ; y <= dilateSize ; y++) {
			newValue = get2DOff(tex0, texCoord.st + vec2(x,y));
			newMag = newValue.x*newValue.x + newValue.y*newValue.y;         
			if(newMag > mag){
				value = newValue;
				mag = newMag;
			}
		}
	}

	gl_FragColor = getColorCoded(value.x, value.y,vec2(1.0,1.0));
}
