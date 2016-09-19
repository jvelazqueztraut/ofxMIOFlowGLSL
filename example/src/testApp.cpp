#include "testApp.h"


void testApp::setup(){
	video.load("test.mov");
    video.play();

	ofSetBackgroundAuto(false);
	ofEnableAlphaBlending();

	mioFlow.setup(video.getWidth(),video.getHeight());
} 



//--------------------------------------------------------------  
void testApp::update(){  
	video.update();

	if (video.isFrameNew()) {
		float valX=(float)ofGetMouseX()/(float)ofGetWidth();
		float valY=(float)ofGetMouseY()/(float)ofGetHeight();

		mioFlow.update(video.getTexture(),valX,valY*10,10);
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