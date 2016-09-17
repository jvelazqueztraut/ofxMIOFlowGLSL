#include "testApp.h"


void testApp::setup(){  
	int w,h;
	w=640;
	h=480;
	cam.setup(w, h, true);


	ofSetBackgroundAuto(false);
	ofEnableAlphaBlending();

	mioFlow.setup(w,h);
} 



//--------------------------------------------------------------  
void testApp::update(){  
	cam.update();  

	if (cam.isFrameNew()) {
		float valX=(float)ofGetMouseX()/(float)ofGetWidth();
		float valY=(float)ofGetMouseY()/(float)ofGetHeight();

		mioFlow.update(cam.getTexture(),valX,valY*10,0.5);
	}
}  

//--------------------------------------------------------------  
void testApp::draw(){  
	ofBackground(0);

	mioFlow.drawReposition(0,0);
	mioFlow.drawFlowGridRaw(640,0);
	mioFlow.drawFlowGrid(0,480);
	ofSetColor(255);
	ofDrawBitmapString("oi -> " + ofToString(ofGetFrameRate()),20,20,0);
}  