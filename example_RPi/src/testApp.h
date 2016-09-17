#pragma once

#include "ofMain.h"
#include "ofxMioFlowGLSL.h"


class testApp : public ofBaseApp{  
    public:  
        void setup();  
        void update();  
        void draw();  

      
        ofVideoPlayer video;
		ofxMioFlowGLSL mioFlow;
}; 