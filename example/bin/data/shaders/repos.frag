varying vec2 texCoord;  
uniform vec2 amt;  
uniform sampler2DRect tex0;  
uniform sampler2DRect tex1;  

vec2 get2DOff(sampler2DRect tex ,vec2 coord) {
	vec4 col = texture2DRect(tex, coord);
	if (col.w >0.95)  col.z=col.z*-1.0;
	return vec2(-1.0*(col.y-col.x),col.z);//,1,1);
}

void main()  
{  
	vec2 coord =  get2DOff(tex1 ,texCoord)*amt+texCoord;  //relative coordinates  
	vec4 repos = texture2DRect(tex0, coord);  
	gl_FragColor = repos;
} 