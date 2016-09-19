
precision highp float;

varying vec2 texCoordVarying;  
uniform vec2 amt;  
uniform sampler2D tex0;  
uniform sampler2D tex1;  

vec2 get2DOff(sampler2D tex ,vec2 coord) {
	vec4 col = texture2D(tex, coord);
	if (col.w >0.95)  col.z=col.z*-1.0;
	return vec2(-1.0*(col.y-col.x),col.z);//,1,1);
}

void main()  
{  
	vec2 coord =  get2DOff(tex1 ,texCoordVarying)*amt+texCoordVarying;  //relative coordinates  
	vec4 repos = texture2D(tex0, coord);  
	gl_FragColor = repos;
} 