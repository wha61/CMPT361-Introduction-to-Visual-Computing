import { Mat4 } from './math.js';
import { Parser } from './parser.js';
import { Scene } from './scene.js';
import { Renderer } from './renderer.js';
import { TriangleMesh } from './trianglemesh.js';
// DO NOT CHANGE ANYTHING ABOVE HERE

////////////////////////////////////////////////////////////////////////////////
// TODO: Implement createCube, createSphere, computeTransformation, and shaders
////////////////////////////////////////////////////////////////////////////////

// Example two triangle quad
const quad = {
  positions: [-1, -1, -1, 1, -1, -1, 1, 1, -1, -1, -1, -1, 1,  1, -1, -1,  1, -1],
  normals: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
  uvCoords: [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1]
}
const unit_cube = {
  // Vertex coordinates
  positions: [1, 1, 1, -1, 1, 1, -1, -1, 1,// v0-v1-v2 front
              1, 1, 1, -1, -1, 1, 1, -1, 1,// v0-v2-v3 front
              1, 1, 1, 1, -1, 1, 1, -1, -1,// v0-v3-v4 right
              1, 1, 1, 1, -1, -1, 1, 1, -1,// v0-v4-v5 right
              1, 1, 1, 1, 1, -1, -1, 1, -1,// v0-v5-v6 up
              1, 1, 1, -1, 1, -1, -1, 1, 1,// v0-v6-v1 up
              -1, 1, 1, -1, 1, -1, -1, -1, -1,// v1-v6-v7 left
              -1, 1, 1, -1, -1, -1, -1, -1, 1,// v1-v7-v2 left
              -1, -1, -1, 1.0, -1, -1, 1, -1, 1,// v7-v4-v3 down
              -1, -1, -1, 1, -1, 1, -1, -1, 1,// v7-v3-v2 down
              1, -1, -1, -1, -1, -1, -1, 1, -1, // v4-v7-v6 back
              1, -1, -1, -1, 1, -1, 1, 1, -1,// v4-v6-v5 back
],
/*  indices: [1, 1, 0, 1, 0, 0, 1, 0,    // v0-v1-v2-v3 front
            0, 1, 0, 0, 1, 0, 1, 1,    // v0-v3-v4-v5 right
            1, 0, 1, 1, 0, 1, 0, 0,    // v0-v5-v6-v1 up
            1, 1, 0, 1, 0, 0, 1, 0,    // v1-v6-v7-v2 left
            0, 0, 1, 0, 1, 1, 0, 1,    // v7-v4-v3-v2 down
            0, 0, 1, 0, 1, 1, 0, 1     // v4-v7-v6-v5 back

          ],     
*/
// normal coordinates
  normals: [0, 0, 1, 0, 0, 1, 0, 0, 1,// v0-v1-v2 front
            0, 0, 1, 0, 0, 1, 0, 0, 1,// v0-v2-v3 front
            1, 0, 0, 1, 0, 0, 1, 0, 0,// v0-v3-v4 right
            1, 0, 0, 1, 0, 0, 1, 0, 0,// v0-v4-v5 right
            0, 1, 0, 0, 1, 0, 0, 1, 0,// v0-v5-v6 up
            0, 1, 0, 0, 1, 0, 0, 1, 0,// v0-v6-v1 up
            -1, 0, 0, -1, 0, 0, -1, 0, 0,// v1-v6-v7 left
            -1, 0, 0, -1, 0, 0, -1, 0, 0,// v1-v7-v2 left
            0, -1, 0, 0, -1, 0, 0, -1, 0,// v7-v4-v3 down
            0, -1, 0, 0, -1, 0, 0, -1, 0,// v7-v3-v2 down
            0, 0, -1, 0, 0, -1, 0, 0, -1,// v4-v7-v6 back
            0, 0, -1, 0, 0, -1, 0, 0, -1,// v4-v6-v5 back
  ],
  // Texture coordinates
  /*uvCoords: [ 1, 1, 0, 1, 0, 0,// v0-v1-v2 front
              1, 1, 0, 0, 1, 0,// v0-v2-v3 front
              0, 1, 0, 0, 1, 0,// v0-v3-v4 right
              0, 1, 1, 0, 1, 1,// v0-v4-v5 right
              1, 0, 1, 1, 0, 1,// v0-v5-v6 up
              1, 0, 0, 1, 0, 0,// v0-v6-v1 up
              1, 1, 0, 1, 0, 0,// v1-v6-v7 left
              1, 1, 0, 0, 1, 0,// v1-v7-v2 left
              0, 0, 1, 0, 1, 1,// v7-v4-v3 down
              0, 0, 1, 1, 0, 1,// v7-v3-v2 down
              0, 0, 1, 0, 1, 1,// v4-v7-v6 back
              0, 0, 1, 1, 0, 1,// v4-v6-v5 back
]*/
  uvCoords: [ 1, 1, 1, 0, 0, 0,// v0-v1-v2 front
              1, 1, 0, 0, 0, 1,// v0-v2-v3 front
              1, 0, 0, 0, 0, 1,// v0-v3-v4 right
              1, 0, 0, 1, 1, 1,// v0-v4-v5 right
              0, 1, 1, 1, 1, 0,// v0-v5-v6 up
              0, 1, 1, 0, 0, 0,// v0-v6-v1 up
              1, 1, 1, 0, 0, 0,// v1-v6-v7 left
              1, 1, 0, 0, 0, 1,// v1-v7-v2 left
              0, 0, 0, 1, 1, 1,// v7-v4-v3 down
              0, 0, 1, 1, 1, 0,// v7-v3-v2 down
              0, 0, 0, 1, 1, 1,// v4-v7-v6 back
              0, 0, 1, 1, 1, 0,// v4-v6-v5 back
]
}
TriangleMesh.prototype.createCube = function() {
  // TODO: populate unit cube vertex positions, normals, and uv coordinates
  this.positions = unit_cube.positions;
  this.normals = unit_cube.normals;
  this.uvCoords = unit_cube.uvCoords;
}

TriangleMesh.prototype.createSphere = function(numStacks, numSectors) {
  // TODO: populate unit sphere vertex positions, normals, uv coordinates, and indices
  var vertices = [];
  let normals = [];
  var texCoords = [];
  let x, y, z, xy;                              // vertex position
  let nx, ny, nz, lengthInv = 1.0;    // vertex normal  
  let s, t;                                     // vertex texCoord

  var sectorStep = 2 * Math.PI / numSectors;
  var stackStep = Math.PI / numStacks;
  var sectorAngle, stackAngle;

  for(let i = numStacks; i >= 0; --i)
  {
    stackAngle = Math.PI / 2 - i * stackStep;        // starting from -pi/2 to pi/2
    xy = 1 * Math.cos(stackAngle);             // r * cos(u)
    z = 1 * Math.sin(stackAngle);              // r * sin(u)

    // add (numSectors+1) vertices per stack
    // the first and last vertices have same position and normal, but different tex coords
    for(let j = numSectors; j >= 0; --j)
    {
        sectorAngle = j * sectorStep;           // starting from 0 to 2pi

        // vertex position (x, y, z)
        x = xy * Math.cos(sectorAngle);             // r * cos(u) * cos(v)
        y = xy * Math.sin(sectorAngle);             // r * cos(u) * sin(v)
        vertices.push(x);
        vertices.push(y);
        vertices.push(z);

        // normalized vertex normal (nx, ny, nz)
        nx = x * lengthInv;
        ny = y * lengthInv;
        nz = z * lengthInv;
        normals.push(nx);
        normals.push(ny);
        normals.push(nz);

        // vertex tex coord (s, t) range between [0, 1]
        s = j / numSectors;
        t = i / numStacks;
        texCoords.push(s);
        texCoords.push(t);
    }
}
//texCoords = texCoords.reverse();
// generate CCW index list of sphere triangles
// k1--k1+1
// |  / |
// | /  |
// k2--k2+1
  var indices = [];
  var lineIndices=[];
  var k1, k2;
  for(let i = 0; i < numStacks; ++i)
  {
    k1 = i * (numSectors + 1);     // beginning of current stack
    k2 = k1 + numSectors + 1;      // beginning of next stack

    for(let j = 0; j < numSectors; ++j, ++k1, ++k2)
    {
        // 2 triangles per sector excluding first and last stacks
        // k1 => k2 => k1+1
        if(i != 0)
        {
            indices.push(k1);
            indices.push(k2);
            indices.push(k1 + 1);
        }

        // k1+1 => k2 => k2+1
        if(i != (numStacks-1))
        {
            indices.push(k1 + 1);
            indices.push(k2);
            indices.push(k2 + 1);
        }

        // store indices for lines
        // vertical lines for all stacks, k1 => k2
        lineIndices.push(k1);
        lineIndices.push(k2);
        if(i != 0)  // horizontal lines except 1st stack, k1 => k+1
        {
            lineIndices.push(k1);
            lineIndices.push(k1 + 1);
        }
    }
}
  this.positions = vertices;
  this.normals = normals; 
  this.uvCoords = texCoords;
  this.indices = indices;
}

Scene.prototype.computeTransformation = function(transformSequence) {
  // TODO: go through transform sequence and compose into overallTransform
 
  var transformSequence1 = transformSequence;
  var transformSequence2 = transformSequence;
  var transformSequence3 = transformSequence;
  transformSequence3.push(0);
  var array0transform = Mat4.create();
  var array1transform = Mat4.create();
  var array2transform = Mat4.create();
  var array3transform = Mat4.create();
  var one_zero = Mat4.create();
  var two_one_zero = Mat4.create();
  var three_two_one_zero = Mat4.create();
  var T = 'T';
  var Rx = "Rx";
  var Ry = "Ry";
  var Rz = "Rz";
  //var S = 'S';
  var check0 = transformSequence[0][0];
  var check1 = transformSequence1[1][0];
  var check2 = transformSequence2[2][0];
  let check3 = transformSequence3[3][0];
  if(true){
    //for array0
    //translate
    if(check0 == T){
      let x = transformSequence[0][1];
      let y = transformSequence[0][2];
      let z = transformSequence[0][3];
      Mat4.set(array0transform,1,0,0,x,0,1,0,y,0,0,1,z,0,0,0,1);
    }
    //rotate along x
    else if(check0 == Rx){
      let theta = transformSequence[0][1];
      let radian = (theta*Math.PI)/180;
      let costheta = Math.cos(radian);
      let sintheta = Math.sin(radian);
      Mat4.set(array0transform,1,0,0,0,0,costheta,-sintheta,0,0,sintheta,costheta,0,0,0,0,1);
    }
    //rotate along y
    else if(check0 == Ry){
      let theta = transformSequence[0][1];
      let radian = (theta*Math.PI)/180;
      let costheta = Math.cos(radian);
      let sintheta = Math.sin(radian);
      Mat4.set(array0transform,costheta,0,sintheta,0,0,1,0,0,-sintheta,0,costheta,0,0,0,0,1);
    }
    //rotate along z
    else if(check0 == Rz){
      let theta = transformSequence[0][1];
      let radian = (theta*Math.PI)/180;
      let costheta = Math.cos(radian);
      let sintheta = Math.sin(radian);
      Mat4.set(array0transform,costheta,-sintheta,0,0,sintheta,costheta,0,0,0,0,1,0,0,0,0,1);
    }
    //scale
    else{
      let x = transformSequence[0][1];
      let y = transformSequence[0][2];
      let z = transformSequence[0][3];
      Mat4.set(array0transform,x,0,0,0,0,y,0,0,0,0,z,0,0,0,0,1);
    }
  }

  if(true){
    //for array1
    //translate
    if(check1 == T){
      let x = transformSequence[1][1];
      let y = transformSequence[1][2];
      let z = transformSequence[1][3];
      Mat4.set(array1transform,1,0,0,x,0,1,0,y,0,0,1,z,0,0,0,1);
    }
    //rotate along x
    else if(check1 == Rx){
      let theta = transformSequence[1][1];
      let radian = (theta*Math.PI)/180;
      let costheta = Math.cos(radian);
      let sintheta = Math.sin(radian);
      Mat4.set(array1transform,1,0,0,0,0,costheta,-sintheta,0,0,sintheta,costheta,0,0,0,0,1);
    }
    //rotate along y
    else if(check1 == Ry){
      let theta = transformSequence[1][1];
      let radian = (theta*Math.PI)/180;
      let costheta = Math.cos(radian);
      let sintheta = Math.sin(radian);
      Mat4.set(array1transform,costheta,0,sintheta,0,0,1,0,0,-sintheta,0,costheta,0,0,0,0,1);
    }
    //rotate along z
    else if(check1 == Rz){
      let theta = transformSequence[1][1];
      let radian = (theta*Math.PI)/180;
      let costheta = Math.cos(radian);
      let sintheta = Math.sin(radian);
      Mat4.set(array1transform,costheta,-sintheta,0,0,sintheta,costheta,0,0,0,0,1,0,0,0,0,1);
    }
    //scale
    else{
      let x = transformSequence[1][1];
      let y = transformSequence[1][2];
      let z = transformSequence[1][3];
      Mat4.set(array1transform,x,0,0,0,0,y,0,0,0,0,z,0,0,0,0,1);
    }
  }

  if(true){
    //for array2
    //translate
    if(check2 == T){
      let x = transformSequence[2][1];
      let y = transformSequence[2][2];
      let z = transformSequence[2][3];
      Mat4.set(array2transform,1,0,0,x,0,1,0,y,0,0,1,z,0,0,0,1);
    }
    //rotate along x
    else if(check2 == Rx){
      let theta = transformSequence[2][1];
      let radian = (theta*Math.PI)/180;
      let costheta = Math.cos(radian);
      let sintheta = Math.sin(radian);
      Mat4.set(array2transform,1,0,0,0,0,costheta,-sintheta,0,0,sintheta,costheta,0,0,0,0,1);
    }
    //rotate along y
    else if(check2 == Ry){
      let theta = transformSequence[2][1];
      let radian = (theta*Math.PI)/180;
      let costheta = Math.cos(radian);
      let sintheta = Math.sin(radian);
      Mat4.set(array2transform,costheta,0,sintheta,0,0,1,0,0,-sintheta,0,costheta,0,0,0,0,1);
    }
    //rotate along z
    else if(check2 == Rz){
      let theta = transformSequence[2][1];
      let radian = (theta*Math.PI)/180;
      let costheta = Math.cos(radian);
      let sintheta = Math.sin(radian);
      Mat4.set(array2transform,costheta,-sintheta,0,0,sintheta,costheta,0,0,0,0,1,0,0,0,0,1);
    }
    //scale
    else{
      let x = transformSequence[2][1];
      let y = transformSequence[2][2];
      let z = transformSequence[2][3];
      Mat4.set(array2transform,x,0,0,0,0,y,0,0,0,0,z,0,0,0,0,1);
    }
  }

  if(check3 != undefined){
    //for array3
    //translate
    if(check3 == T){
      let x = transformSequence[3][1];
      let y = transformSequence[3][2];
      let z = transformSequence[3][3];
      Mat4.set(array3transform,1,0,0,x,0,1,0,y,0,0,1,z,0,0,0,1);
    }
    //rotate along x
    else if(check3 == Rx){
      let theta = transformSequence[3][1];
      let radian = (theta*Math.PI)/180;
      let costheta = Math.cos(radian);
      let sintheta = Math.sin(radian);
      Mat4.set(array3transform,1,0,0,0,0,costheta,-sintheta,0,0,sintheta,costheta,0,0,0,0,1);
    }
    //rotate along y
    else if(check3 == Ry){
      let theta = transformSequence[3][1];
      let radian = (theta*Math.PI)/180;
      let costheta = Math.cos(radian);
      let sintheta = Math.sin(radian);
      Mat4.set(array3transform,costheta,0,sintheta,0,0,1,0,0,-sintheta,0,costheta,0,0,0,0,1);
    }
    //rotate along z
    else if(check3 == Rz){
      let theta = transformSequence[3][1];
      let radian = (theta*Math.PI)/180;
      let costheta = Math.cos(radian);
      let sintheta = Math.sin(radian);
      Mat4.set(array3transform,costheta,-sintheta,0,0,sintheta,costheta,0,0,0,0,1,0,0,0,0,1);
    }
    //scale
    else{
      let x = transformSequence[3][1];
      let y = transformSequence[3][2];
      let z = transformSequence[3][3];
      Mat4.set(array3transform,x,0,0,0,0,y,0,0,0,0,z,0,0,0,0,1);
    }
  }
  Mat4.transpose(array0transform,array0transform);
  Mat4.transpose(array1transform,array1transform);
  Mat4.transpose(array2transform,array2transform);
  Mat4.transpose(array3transform,array3transform);
  
  Mat4.multiply(one_zero,array1transform,array0transform);
  Mat4.multiply(two_one_zero,array2transform,one_zero);
  Mat4.multiply(three_two_one_zero,array3transform,two_one_zero);
  var overallTransform = Mat4.create();  // identity matrix
  overallTransform = three_two_one_zero;
  //Mat4.transpose(overallTransform,three_two_one_zero);
  return overallTransform;
  
}
//so far working all good
Renderer.prototype.VERTEX_SHADER = `
precision mediump float;
attribute vec3 position, normal;
attribute vec2 uvCoord;
uniform vec3 lightPosition;
uniform mat4 projectionMatrix, viewMatrix, modelMatrix;
uniform mat3 normalMatrix;
varying vec2 vTexCoord;

// TODO: implement vertex shader logic below

varying vec3 norm;
varying vec4 pos;
varying vec3 lightPos;

void main() {
  vTexCoord = uvCoord;
  norm = normalize(normalMatrix * normal);
  pos = modelMatrix * vec4(position, 1.0);
  lightPos = lightPosition;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
`;

Renderer.prototype.FRAGMENT_SHADER = `
precision mediump float;
uniform vec3 ka, kd, ks, lightIntensity;
uniform float shininess;
uniform sampler2D uTexture;
uniform bool hasTexture;
varying vec2 vTexCoord;

// TODO: implement fragment shader logic below

varying vec3 norm;
varying vec4 pos;
varying vec3 lightPos;


void main() {
  //L
  vec3 light_direction = lightPos - vec3(pos);
  float light_distance = length(light_direction);
  light_direction = light_direction / light_distance; 
  //R
  vec3 reflect_direction = reflect(-light_direction, norm);
  reflect_direction = normalize(reflect_direction);
  vec3 view_pos = vec3(10,10,10);
  vec3 view_direction = normalize(view_pos-vec3(pos));
  // (d^2)
  float temp = pow(light_distance,2.0);

  //ambient  ca = ka * La
  vec3 ambient = ka * lightIntensity;

  //diffuse cd = (kd / d^2) * max(0, dot(N,L)) * Ld
  float D = max(0.0, dot(norm, light_direction));
  vec3 diffuse = (kd/temp) * D * lightIntensity;

  //specular cs = (ks / d^2) * max(0, dot(R,V) ^ shininess)) * Ls
  float S = max(0.0,dot(view_direction, reflect_direction));
  S = pow(S, shininess);
  vec3 specular = (ks/temp) * S * lightIntensity;
  gl_FragColor = vec4(ambient + diffuse + specular,1.0);

  vec4 Texturepic	= texture2D(uTexture, vTexCoord);

  if(hasTexture){
      gl_FragColor = gl_FragColor * Texturepic;
  }
}
`;
//I have implement the texture part not included the uv mapping

////////////////////////////////////////////////////////////////////////////////
// EXTRA CREDIT: change DEF_INPUT to create something interesting!
////////////////////////////////////////////////////////////////////////////////
const DEF_INPUT = [
  "c,myCamera,perspective,5,5,5,0,0,0,0,1,0;",
  "l,myLight,point,0,5,0,2,2,2;",
  "p,unitCube,cube;",
  "p,unitSphere,sphere,20,20;",
  "m,redDiceMat,0.3,0,0,0.7,0,0,1,1,1,15,dice.jpg;",
  "m,grnDiceMat,0,0.3,0,0,0.7,0,1,1,1,15,dice.jpg;",
  "m,bluDiceMat,0,0,0.3,0,0,0.7,1,1,1,15,dice.jpg;",
  "m,globeMat,0.3,0.3,0.3,0.7,0.7,0.7,1,1,1,5,globe.jpg;",
  "o,rd,unitCube,redDiceMat;",
  "o,gd,unitCube,grnDiceMat;",
  "o,bd,unitCube,bluDiceMat;",
  "o,gl,unitSphere,globeMat;",
  "X,rd,Rz,75;X,rd,Rx,90;X,rd,S,0.5,0.5,0.5;X,rd,T,-1,0,2;",
  "X,gd,Ry,45;X,gd,S,0.5,0.5,0.5;X,gd,T,2,0,2;",
  "X,bd,S,0.5,0.5,0.5;X,bd,Rx,90;X,bd,T,2,0,-1;",
  "X,gl,S,1.5,1.5,1.5;X,gl,Rx,90;X,gl,Ry,-150;X,gl,T,0,1.5,0;",
].join("\n");
//
///////////////////////////////////////////////////////////////////////
//DEF_INPUT I write, you can copy and have a look.
/*
  "c,myCamera,perspective,5,5,5,0,0,0,0,1,0;",
  "l,myLight,point,1,1,1,3,3,3;",
  "p,unitCube,cube;",
  "p,unitSphere,sphere,20,20;",
  "m,sun,0.3,0.3,0.3,0.7,0.7,0.7,1,1,1,5,sun.jpg;",
  "o,s,unitSphere,sun;",
  "X,s,S,2,2,2;X,s,Rx,90;X,s,Ry,-150;X,s,T,-2,1,-2;",
  
  "m,moon,0.3,0.3,0.3,0.7,0.7,0.7,1,1,1,5,moon.jpg;",
  "o,m,unitSphere,moon;",
  "X,m,Rz,75;X,m,Rx,90;X,m,S,0.25,0.25,0.25;X,m,T,-1,0,3;",
  
  "m,earth,0.3,0.3,0.3,0.7,0.7,0.7,1,1,1,5,globe.jpg;",
  "o,e,unitSphere,earth;",
  "X,e,Rz,75;X,e,Rx,90;X,e,S,0.9,0.9,0.9;X,e,T,-1,0,1.5;",
  
  "m,hair,0.3,0.3,0.3,0.7,0.7,0.7,1,1,1,5,hair.jpg;",
  "o,h,unitSphere,hair;",
  "X,h,S,1.0,1.0,1.0;X,h,Rx,90;X,h,T,2.0,0,-1;",
  
  "m,text,0.3,0.3,0.3,0.7,0.7,0.7,1,1,1,5,text.jpg;",
  "o,t,unitSphere,text;",
  "X,t,S,0.9,0.9,0.9;X,t,Rx,90;X,t,T,2.0,0,2.0;",

*/
///////////////////////////////////////////////////////////////////////

// DO NOT CHANGE ANYTHING BELOW HERE
export { Parser, Scene, Renderer, DEF_INPUT };
