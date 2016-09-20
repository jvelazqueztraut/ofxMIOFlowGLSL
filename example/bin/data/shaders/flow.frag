uniform sampler2DRect tex0;  
uniform sampler2DRect tex1;  


uniform vec2 scale;  
uniform vec2 offset;  
uniform float lambda;   
varying vec2 texCoord;  


vec4 getColorCoded(float x, float y, vec2 scale) {
	vec2 xout = vec2(max(x,0.0),abs(min(x,0.0)))*scale.x;
	vec2 yout = vec2(max(y,0.0),abs(min(y,0.0)))*scale.y;
	float mag = sqrt(x*x + y*y)*scale.x*scale.y;
	return vec4(xout.xy,max(yout.x,yout.y),mag);
}


float getGrayScale(vec4 col) {
	return dot(vec3(col.x, col.y, col.z), vec3(0.3, 0.59, 0.11));
}
float texture2DRectGray(sampler2DRect tex, vec2 coord) {
	return getGrayScale(texture2DRect(tex, coord));
}

void main()  
{     
	float a = texture2DRectGray(tex0, texCoord);
	float b = texture2DRectGray(tex1, texCoord);
	vec2 x1 = vec2(offset.x,0.0);
	vec2 y1 = vec2(0.0,offset.y);

	//get the difference
	float curdif = b-a;

	//calculate the gradient
	//for X________________
	float gradx = texture2DRectGray(tex1, texCoord+x1)-texture2DRectGray(tex1, texCoord-x1);
	gradx += texture2DRectGray(tex0, texCoord+x1)-texture2DRectGray(tex0, texCoord-x1);


	//for Y________________
	float grady = texture2DRectGray(tex1, texCoord+y1)-texture2DRectGray(tex1, texCoord-y1);
	grady += texture2DRectGray(tex0, texCoord+y1)-texture2DRectGray(tex0, texCoord-y1);

	float gradmag = sqrt((gradx*gradx)+(grady*grady)+lambda);

	float vx = curdif*(gradx/gradmag);
	float vy = curdif*(grady/gradmag);

	gl_FragColor = getColorCoded(vx,vy,scale);   
}  