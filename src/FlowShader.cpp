#include "FlowShader.h"

//Disclaimer: The flow shader contains code from Andrew Benson. http://abstrakt.vade.info/


void FlowShader::setup(){
	repos.load(ofToDataPath("shaders/repos"));

	flow.load(ofToDataPath("shaders/flow"));

	blur.load(ofToDataPath("shaders/blur"));
}
