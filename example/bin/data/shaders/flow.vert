varying vec2 texCoord;  
void main()  
{  
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;   
	texCoord = vec2(gl_TextureMatrix[0] * gl_MultiTexCoord0);  
}