#pragma once

#include "ofMain.h"

#ifndef STRINGIFY(A)
    #define STRINGIFY(A) #A
#endif

class FlowShader  {
public:
	void setup();

	string getVertShader();
	string getFlowShader();
	string getReposShader();
	string getBlurShader();


	ofShader repos, flow,blur;  
};
