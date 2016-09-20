#include "FlowShader.h"

//Disclaimer: The flow shader contains code from Andrew Benson. http://abstrakt.vade.info/


void FlowShader::setup(){
	flow.load(ofToDataPath("shaders/flow"));
    repos.load(ofToDataPath("shaders/repos"));
	blur.load(ofToDataPath("shaders/blur"));
    dilate.load(ofToDataPath("shaders/dilate"));
}
