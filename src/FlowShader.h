#pragma once

#include "ofMain.h"

#ifndef STRINGIFY(A)
    #define STRINGIFY(A) #A
#endif

class FlowShader  {
public:
	void setup();

	ofShader repos, flow,blur;  
};
