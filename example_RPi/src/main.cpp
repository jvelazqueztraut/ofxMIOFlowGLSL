#include "ofMain.h"
#include "testApp.h"

//========================================================================
int main( ){

	ofGLESWindowSettings settings;
	settings.glesVersion = 2;
	ofCreateWindow(settings);
	
	// this kicks off the running of my app
	// can be OF_WINDOW or OF_FULLSCREEN
	// pass in width and height too:
	ofRunApp( new testApp());

}
