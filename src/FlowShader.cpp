#include "FlowShader.h"

//Disclaimer: The flow shader contains code from Andrew Benson. http://abstrakt.vade.info/


void FlowShader::setup(){
	repos.setupShaderFromFile(GL_VERTEX_SHADER, ofToDataPath("shaders/repos.vert"));
	repos.setupShaderFromFile(GL_FRAGMENT_SHADER, ofToDataPath("shaders/repos.frag"));
	repos.linkProgram();
	cout<<"Repos shader"<<endl;

	//flow.setupShaderFromFile(GL_VERTEX_SHADER, ofToDataPath("shaders/flow.vert"));
	//flow.setupShaderFromFile(GL_FRAGMENT_SHADER, ofToDataPath("shaders/flow.frag"));
	//flow.linkProgram();

	//blur.setupShaderFromFile(GL_VERTEX_SHADER, ofToDataPath("shaders/blur.vert"));
	//blur.setupShaderFromFile(GL_FRAGMENT_SHADER, ofToDataPath("shaders/blur.frag"));
	//blur.linkProgram();
}
