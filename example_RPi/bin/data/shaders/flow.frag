uniform sampler2D tex0;  
uniform sampler2D tex1;  


uniform vec2 scale;  
uniform vec2 offset;  
uniform float lambda;   
varying vec2 texCoordVarying;  


vec4 getColorCoded(float x, float y,vec2 scale) {
	vec2 xout = vec2(max(x,0.0),abs(min(x,0.0)))*scale.x;
	vec2 yout = vec2(max(y,0.0),abs(min(y,0.0)))*scale.y;
	float dirY = 1.0;
	if (yout.x > yout.y)  dirY=0.90;
	return vec4(xout.xy,max(yout.x,yout.y),dirY);
}


vec4 getGrayScale(vec4 col) {
	float gray = dot(vec3(col.x, col.y, col.z), vec3(0.3, 0.59, 0.11));
	return vec4(gray,gray,gray,1.0);
}
vec4 texture2DGray(sampler2D tex, vec2 coord) {
	return getGrayScale(texture2D(tex, coord));
}

void main()  
{     
	vec4 a = texture2DGray(tex0, texCoordVarying);
	vec4 b = texture2DGray(tex1, texCoordVarying);
	vec2 x1 = vec2(offset.x,0.0);
	vec2 y1 = vec2(0.0,offset.y);

	//get the difference
	vec4 curdif = b-a;

	//calculate the gradient
	//for X________________
	vec4 gradx = texture2DGray(tex1, texCoordVarying+x1)-texture2DGray(tex1, texCoordVarying-x1);
	gradx += texture2DGray(tex0, texCoordVarying+x1)-texture2DGray(tex0, texCoordVarying-x1);


	//for Y________________
	vec4 grady = texture2DGray(tex1, texCoordVarying+y1)-texture2DGray(tex1, texCoordVarying-y1);
	grady += texture2DGray(tex0, texCoordVarying+y1)-texture2DGray(tex0, texCoordVarying-y1);

	vec4 gradmag = sqrt((gradx*gradx)+(grady*grady)+vec4(lambda));

	vec4 vx = curdif*(gradx/gradmag);
	vec4 vy = curdif*(grady/gradmag);

	gl_FragColor = getColorCoded(vx.r,vy.r,scale);   
}  