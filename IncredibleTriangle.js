/**
 * This JavaScript program renders an orthographic view of a exciting triangle.
 * The real purpose is to illustrate the basics of rendering.
 *
 * Jordan Deason
 * August 2020
 */

"use strict";

// global variables  (CPU memory)
var canvas;
var gl;
var pBuffer;  // position buffer
var cBuffer;  // color buffer
var typesBuffer;

var pointsArray = [];
var colorsArray = [];
var typesArray = [];
var index=0;

//alert("arrays created");

// color palette -- just simplifies some things  (RGBA)
var colorPalette = [

    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4(1.0, 99.0/255, 71.0/255, 1.0), // tomato
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4(1,239.0/255,213.0/255,1.0), // papaya whip
    vec4( 0.0, 1.0, 1.0, 1.0)   // cyan
];
//("colorPalette created");

//boat info
var theta = 0.0;
var deltatheta = 0.01;
var thetaLoc;
var triangleOneON = true;

/*//flag info, not sure if necessary yet
var phi = 0.0;
var deltaphi = 0.0;
var phiLoc;
var triangleTwoON = true;
*/
// *****************************

// callback function that starts once html5 window is loaded
window.onload = function init() {

    // SETUP WEBGL ENVIRONMENT
    // associate canvas with "gl-canvas" and setup
    canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //alert("WebGL available");

    // set up orthgraphic view using the entire canvas, and
    // set the default color of the view as "jordy blue"
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor(137/255, 196/255, 244/255, 1.0);

    //alert("canvas configured");


    //  CONFIGURE GPU SHADERS
    //  Compile and load vertex and fragment shaders
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    //alert("shaders compiled and loaded onto GPU");

    thetaLoc = gl.getUniformLocation(program, "theta");
    //phiLoc = gl.getUniformLocation(program, "phi");

    //alert("uniform theta located");

    //variables for vertices of sky triangles
    var x1 = 255;
    var y1 = 336;
    var x2 = -46;
    var y2 = 336;
    var x3 = -46;
    var y3 = 316;
    var i;

    //for loop to make the left 35 sky triangles
    for (i = 0; i < 35; i++) {
        //alert("enters for loop to make left triangles");
        //create synthetic images in loop
        //alternates color in the sky
        if (i % 2 == 1){
            mytriangle(vec2(x1,y1), vec2(x2,y2), vec2(x3,y3), vec4(241/255, 90/255, 3/255, 1), 1.0);
        }
        else {
            mytriangle(vec2(x1,y1), vec2(x2,y2), vec2(x3,y3), vec4(255/255, 203/255, 5/255, 1), 1.0);
        }
        //move vertices
        y2 = y2 - 12;
        y3 = y3 - 12;
    }

    // vertices of right sky triangles
    x1 = 255;
    y1 = 336;
    x2 = 556;
    y2 = 336;
    x3 = 556;
    y3 = 316;

    //for loop to make the right 35 sky triangles
    for (i = 0; i < 35; i++) {
        //alert("enters for loop to make right triangles");
        //create synthetic images in loop
        //alternates color in the sky
        if (i % 2 == 1){
            mytriangle(vec2(x1,y1), vec2(x2,y2), vec2(x3,y3), vec4(241/255, 90/255, 3/255, 1),1.0);
        }
        else{
            mytriangle(vec2(x1,y1), vec2(x2,y2), vec2(x3,y3), vec4(255/255, 203/255, 5/255, 1), 1.0);
        }
        //move vertices
        y2 = y2 - 12;
        y3 = y3 - 12;
    }

    //vertices of middle sky triangles
    x1 = 255;
    y1 = 336;
    x2 = -46;
    y2 = -84;
    x3 = -26;
    y3 = -84;

    //for loop to make the middle 41 triangles
    for (i = 0; i < 41; i++) {
        //alert("enters for loop to make mid triangles");
        //create synthetic images in loop
        //alternates color in the sky
        if (i % 2 != 1){
            mytriangle(vec2(x1,y1), vec2(x2,y2), vec2(x3,y3), vec4(241/255, 90/255, 3/255, 1), 1.0);
        }
        else{
            mytriangle(vec2(x1,y1), vec2(x2,y2), vec2(x3,y3), vec4(255/255, 203/255, 5/255, 1), 1.0);
        }
        //move vertices
        x2 = x2 + 15;
        x3 = x3 + 15;
    }
    //making sun
    //alert("beginning sun");
    mytriangle(vec2(255,280), vec2(220,336), vec2(290,336), vec4(255/255, 236/255, 139/255, 1), 1.0);
    mytriangle(vec2(255,336), vec2(205,300), vec2(305,300), vec4(255/255, 236/255, 139/255, 1), 1.0);
    mytriangle(vec2(250,336), vec2(225,285), vec2(255,300), vec4(255/255, 236/255, 139/255, 1), 1.0);
    mytriangle(vec2(260,336), vec2(285,285), vec2(255,300), vec4(255/255, 236/255, 139/255, 1), 1.0);
    mytriangle(vec2(260,336), vec2(305,325), vec2(255,300), vec4(255/255, 236/255, 139/255, 1), 1.0);
    mytriangle(vec2(260,336), vec2(200,325), vec2(255,300), vec4(255/255, 236/255, 139/255, 1), 1.0);
    //alert("done with sun");


    //RANDOM GENERATOR WAVES. Refresh to watch the waves move!
    var blue1WaveLocX;
    var blue1WaveLocY;
    var blue2WaveLocX;
    var blue2WaveLocY;
    var w;
    for (w = 0; w < 50; w++) {
        //alert("enters for loop for waves");
        //calls generate location fnx
        blue1WaveLocX = generateRandomLoc(1);
        blue1WaveLocY = generateRandomLoc(0);
        //calls createWave function for blue1 waves
        createWave(vec2(blue1WaveLocX,blue1WaveLocY), vec2(blue1WaveLocX+15,blue1WaveLocY-10), vec2(blue1WaveLocX+30,blue1WaveLocY), vec4(107/255, 185/255, 240/255, 1), 1.0);
        //calls generate location fnx
        blue2WaveLocX = generateRandomLoc(1);
        blue2WaveLocY = generateRandomLoc(0);
        //calls createWave function for blue2 waves
        createWave(vec2(blue2WaveLocX,blue2WaveLocY), vec2(blue2WaveLocX+15,blue2WaveLocY-10), vec2(blue2WaveLocX+30,blue2WaveLocY), vec4(162/255, 208/255, 245/255, 1), 1.0);
    }

        var boatX;
        var boatY;
        var col;
        //boatX = generateRandomLoc(1);
        //boatY = generateRandomLoc(0);

        boatX = 225;
        boatY = 430;

        makeBoat(vec2(boatX,boatY), vec2(boatX+50,boatY+25), vec2(boatX+100,boatY), vec4(113/255, 76/255, 61/255, 1), 2.0);
        makeBoat(vec2(boatX+48,boatY), vec2(boatX+48,boatY-30), vec2(boatX+52,boatY), vec4(0.0, 0.0, 0.0, 1.0), 2.0);
        makeBoat(vec2(boatX+52,boatY), vec2(boatX+48,boatY-30), vec2(boatX+52,boatY-30), vec4(0.0, 0.0, 0.0, 1.0), 2.0);
        col = flagColor();
        if (col == 1) {
            makeBoat(vec2(boatX + 52, boatY - 30), vec2(boatX + 52, boatY - 20), vec2(boatX + 80, boatY - 25), vec4(231 / 255, 116 / 255, 113 / 255, 1.0), 2.0);
        }
        else{
            makeBoat(vec2(boatX + 52, boatY - 30), vec2(boatX + 52, boatY - 20), vec2(boatX + 80, boatY - 25), vec4(106/255,251/255,146/255, 1.0), 2.0);
        }
        //alert("synthetic image made");


    // CREATE CPU BUFFERS CORRESPONDING TO SHADER ATTRIBUTES,
    // TRANSFER SYNTHETIC IMAGE TO GPU
    //
    // Vertices have two attributes, position and color, which will
    // require two buffers
    //
    // set up pBuffer as a buffer where each entry is 8 bytes
    // (2X4 bytes, or 2 thirtytwo bit floats)
    pBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

    // associate JavaScript vPosition with vertex shader attribute "vPosition"
    // as a two dimensional vector where each component is a float
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    //alert("pBuffer and vPosition set up");

    //
    // set up cBuffer as a buffer where each entry is 16 bytes
    // (4x4 bytes, of 4 thirtytwo bit colors)
    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW);

    // associate JavaScript vColor with vertex shader attribute "vColor"
    // as a four dimensional vector (RGBA)
    var vColor = gl.getAttribLocation( program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    //alert("cBuffer and vColor set up");


    typesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, typesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(typesArray), gl.STATIC_DRAW);

    var vType = gl.getAttribLocation(program, "vType");
    gl.vertexAttribPointer(vType, 1, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vType);

    //alert("cBuffer, vColor, and vType set up");


    // INITIATE RENDERING OF SYNTHETIC IMAGE
    // render away
    render();
}

// ****************************

// RENDER THE IMAGE
// recursive function to render the synthetic image
function render() {

    // clear the working buffer
    gl.clear( gl.COLOR_BUFFER_BIT );





    theta = IncrementClampRadians(theta, deltatheta);


    gl.uniform1f(thetaLoc,theta);




    // render the points and colors as triangles
    gl.drawArrays( gl.TRIANGLES, 0,pointsArray.length);

    // recursively call render() in the context of the browser
    window.requestAnimFrame(render);
}


function IncrementClampRadians(theta, delta){
    theta += delta;
    if (theta >= 2*Math.PI){
        return theta - 2*Math.PI;
    }
    return theta;
}

// *************************

// CONVERT FROM BROWSER COORDINATES TO WEBGL COORDINATES
// Of course this could be put into the vertex shader.
function coordscale(coord) {
    //alert("in coordscale coord= "+coord);

    return vec2(2.0 * coord[0] / canvas.width - 1, 2.0 * (canvas.height - coord[1]) / canvas.height - 1);
}

// ************************

// CREATE (SINGLE) COLORED TRIANGLE
// put a triangle into the points and colors arrays
function mytriangle(aa, bb, cc, cccc, triangType)
{
    //alert("inside mytriangle fxn");


    // focus on points to render
    pointsArray.push(coordscale(aa));
    pointsArray.push(coordscale(bb));
    pointsArray.push(coordscale(cc));

    // focus on colors for each vertex (same in this case)
    colorsArray.push(cccc);
    colorsArray.push(cccc);
    colorsArray.push(cccc);

    typesArray.push(triangType);
    typesArray.push(triangType);
    typesArray.push(triangType);

    return;

}

// function to create waves REFRESH TO WATCH MOVE AROUND
function createWave(loc1, loc2, loc3, waveColor, triangType)
{
    //alert("inside createWave fxn");

    // focus on points to render
    pointsArray.push(coordscale(loc1));
    pointsArray.push(coordscale(loc2));
    pointsArray.push(coordscale(loc3));
    // focus on colors for each vertex (same in this case)
    colorsArray.push(waveColor);
    colorsArray.push(waveColor);
    colorsArray.push(waveColor);

    typesArray.push(triangType);
    typesArray.push(triangType);
    typesArray.push(triangType);
    return;
}

// function to generate wave location and boat location
function generateRandomLoc(n)
{
//alert("inside generateRandomLoc fxn");

    if (n == 1){
          return Math.floor((Math.random() * 450) + 15);
    }
    else {
          return Math.floor((Math.random() * 150) + 342);
    }
}
/*


//function to make middle sky triangles
function MidSkyTriangles(t1,t2,t3,t4,t5,t6){
    var i;
    for (i = 0; i < 35; i++) {
        //create synthetic images in loop
        //alternates color in the sky
        if (i % 2 == 1){
              mytriangle(vec2(t1,t2), vec2(t3,t4), vec2(t5,t6), vec4(241/255, 90/255, 3/255, 1));
        }
        else {
              mytriangle(vec2(t1,t2), vec2(t3,t4), vec2(t5,t6), vec4(241/255, 90/255, 3/255, 1));
        }
        //move vertices
        t3 = t3 + 15;
        t5 = t5 + 15;
    }
}

//function to make left and right sky triangles
function RLSkyTriangles(t1,t2,t3,t4,t5,t6){
    var i;
    for (i = 0; i < 35; i++) {
        //create synthetic images in loop
        //alternates color in the sky
        if (i % 2 == 1){
              mytriangle(vec2(t1,t2), vec2(t3,t4), vec2(t5,t6), vec4(241/255, 90/255, 3/255, 1));
        }
        else{
             mytriangle(vec2(t1,t2), vec2(t3,t4), vec2(t5,t6), vec4(241/255, 90/255, 3/255, 1));
        }
        //move vertices
        t4 = y2 - 12;
        t6 = y3 - 12;
    }
}
*/
// function to make boat. REFRESH TO WATCH MOVE AROUND
function makeBoat(x,y,z,w, triangType) {

    // focus on points to render
    pointsArray.push(coordscale(x));
    pointsArray.push(coordscale(y));
    pointsArray.push(coordscale(z));
    // focus on colors for each vertex (same in this case)
    colorsArray.push(w);
    colorsArray.push(w);
    colorsArray.push(w);

    typesArray.push(triangType);
    typesArray.push(triangType);
    typesArray.push(triangType);

    return;
}

//function to pick flag color
function flagColor(){
    return Math.floor((Math.random() * 2) + 1);
}