#pragma once

#include "ofMain.h"
#include "FlowShader.h"


class ofxMioFlowGLSL  {
public:
	void setup(int wI,int hI);

	void update(ofTexture& cur);
	void update(ofTexture& cur, float lambdaI,float dilateAmountI, float blurAmountI, float displaceAmountI);

	void drawFlowGrid(int x,int y);
    void drawFlowDilateGrid(int x,int y);
	void drawFlowGridRaw(int x,int y);
	void drawReposition(int x,int y);

	ofTexture getFlowBlurTexture();
	ofTexture getFlowRawTexture();
     
private: 

	int w, h;  

	float lambda;
    float dilateAmount;
	float blurAmount;
	float displaceAmount;

	FlowShader flowShader;
    ofFbo  lastTex;  
    ofFbo fboFlow,fboDilate,fboBlurH,fboBlurV,fboRepos;
};
