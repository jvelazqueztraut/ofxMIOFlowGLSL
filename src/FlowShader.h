#pragma once

#include "ofMain.h"

class FlowShader  {
public:
	void setup();

	ofShader flow,repos,blur,dilate;
};
