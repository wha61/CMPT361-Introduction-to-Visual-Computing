import { Framebuffer } from './framebuffer.js';
import { Rasterizer } from './rasterizer.js';
// DO NOT CHANGE ANYTHING ABOVE HERE

////////////////////////////////////////////////////////////////////////////////
// TODO: Implement functions drawLine(v1, v2) and drawTriangle(v1, v2, v3) below.
////////////////////////////////////////////////////////////////////////////////

//color_of_vertex_begin*(1-fraction)+color_ogvertex_end*fraction .
//respectively calculate R,G,B for the point.
//Not familar with javascript, so do not know how to combine RGB, so I did respectively.
var getRofPoint = function(x1,x2,y1,y2,xp,yp,r1,r2){
  let totalDistance = Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));
  let distanceFromStartVertex = Math.sqrt(Math.pow((xp-x1),2)+Math.pow((yp-y1),2));
  let fractionOfPoint = distanceFromStartVertex/totalDistance;
  let rp = r1*(1-fractionOfPoint)+r2*fractionOfPoint;

  return rp;
}
var getGofPoint = function(x1,x2,y1,y2,xp,yp,g1,g2){
  let totalDistance = Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));
  let distanceFromStartVertex = Math.sqrt(Math.pow((xp-x1),2)+Math.pow((yp-y1),2));
  let fractionOfPoint = distanceFromStartVertex/totalDistance;
  let gp = g1*(1-fractionOfPoint)+g2*fractionOfPoint;

  return gp;
}
var getBofPoint = function(x1,x2,y1,y2,xp,yp,b1,b2){
  let totalDistance = Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));
  let distanceFromStartVertex = Math.sqrt(Math.pow((xp-x1),2)+Math.pow((yp-y1),2));
  let fractionOfPoint = distanceFromStartVertex/totalDistance;
  let bp = b1*(1-fractionOfPoint)+b2*fractionOfPoint;

  return bp;
}
//another way, two choose one
//color_of_vertex_begin+(color_of_vertex_end-color_of_vertex_begin)*fraction
/*var getRofPoint = function(x1,x2,y1,y2,xp,yp,r1,r2){
  let totalDistance = Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));
  let distanceFromStartVertex = Math.sqrt(Math.pow((xp-x1),2)+Math.pow((yp-y1),2));
  let fractionOfPoint = distanceFromStartVertex/totalDistance;
  let diffBetweenR1R2 = r2-r1;
  var rp = r1 + diffBetweenR1R2*fractionOfPoint;

  return rp;
}
var getGofPoint = function(x1,x2,y1,y2,xp,yp,g1,g2){
  let totalDistance = Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));
  let distanceFromStartVertex = Math.sqrt(Math.pow((xp-x1),2)+Math.pow((yp-y1),2));
  let fractionOfPoint = distanceFromStartVertex/totalDistance;
  let diffBetweenG1G2 = g2-g1;
  var gp = g1 + diffBetweenG1G2*fractionOfPoint;

  return gp;
}
var getBofPoint = function(x1,x2,y1,y2,xp,yp,b1,b2){
  let totalDistance = Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));
  let distanceFromStartVertex = Math.sqrt(Math.pow((xp-x1),2)+Math.pow((yp-y1),2));
  let fractionOfPoint = distanceFromStartVertex/totalDistance;
  let diffBetweenB1B2 = b2-b1;
  var bp = b1 + diffBetweenB1B2*fractionOfPoint;

  return bp;
}*/
//triangle inside-outside test function.
var pointIsInsideTriangle = function(v1,v2,v3,xp,yp){
  const [x1, y1, [r1, g1, b1]] = v1;
  const [x2, y2, [r2, g2, b2]] = v2;
  const [x3, y3, [r3, g3, b3]] = v3;
  //conter-closkwise
  //v1->v2
  let a1_2 = y2-y1;
  let b1_2 = x1-x2;
  let c1_2 = (x2*y1-x1*y2); 
  let z1_2 = a1_2*xp+b1_2*yp+c1_2;
  //v2->v3
  let a2_3 = y3-y2;
  let b2_3 = x2-x3;
  let c2_3 = (x3*y2-x2*y3);
  let z2_3 = a2_3*xp+b2_3*yp+c2_3;
  //v3->v1
  let a3_1 = y1-y3;
  let b3_1 = x3-x1;
  let c3_1 = (x1*y3-x3*y1);
  let z3_1 = a3_1*xp+b3_1*yp+c3_1;
  //apply top-left rule.
  let k1_2 = -a1_2/b1_2;//b1_2!=0
  let k2_3 = -a2_3/b2_3;//b2_3!=0
  let k3_1 = -a3_1/b3_1;//b3_1!=0
  //z>0.
  if(z1_2>0&&z2_3>0&&z3_1>0){
    var check = 1;
  }
  //z=0
  //case that v1->v2 is horizontal and v3 below
  else if(z1_2==0&&k1_2==0&&y3>y1){
    var check = 1;
  }
  //case that v2->v3 is horizontal and v1 below
  else if(z2_3==0&&k2_3==0&&y1>y2){
    var check = 1;
  }
  //case that v3->v1 is horizontal and v2 below
  else if(z3_1==0&&k3_1==0&&y2>y3){
    var check = 1;
  }
  //z<0
  else{
    var check = 0;
  }
  return check;
}
//get the Area of the triangle formed by v1, v2, v3.
var getAreaOfTriangle = function(v1,v2,v3){
  const [x1, y1, [r1, g1, b1]] = v1;
  const [x2, y2, [r2, g2, b2]] = v2;
  const [x3, y3, [r3, g3, b3]] = v3;
  var area = Math.abs((1/2)*(x1*y2-x2*y1+x2*y3-x3*y2+x3*y1-x1*y3));
  return area;
}
var getUOfBarycentricCoordinates = function(v1,v2,v3,xp,yp){
  const [x1, y1, [r1, g1, b1]] = v1;
  const [x2, y2, [r2, g2, b2]] = v2;
  const [x3, y3, [r3, g3, b3]] = v3;
  let A = getAreaOfTriangle(v1,v2,v3);
  //the area of the triangle formed by v2->v3->p.
  let a = Math.abs((1/2)*(x2*y3-x3*y2+x3*yp-xp*y3+xp*y2-x2*yp));
  let U = a/A;

  return U;
}
var getVOfBarycentricCoordinates = function(v1,v2,v3,xp,yp){
  const [x1, y1, [r1, g1, b1]] = v1;
  const [x2, y2, [r2, g2, b2]] = v2;
  const [x3, y3, [r3, g3, b3]] = v3;
  let A = getAreaOfTriangle(v1,v2,v3);
  //the area of the triangle formed by v3->v1->p.
  let a = Math.abs((1/2)*(x3*y1-x1*y3+x1*yp-xp*y1+xp*y3-x3*yp));
  let V = a/A;

  return V;
}
var getWOfBarycentricCoordinates = function(v1,v2,v3,xp,yp){
  let U = getUOfBarycentricCoordinates(v1,v2,v3,xp,yp);
  let V = getVOfBarycentricCoordinates(v1,v2,v3,xp,yp);
  //as U+V+W = 1.
  let W = 1-U-V;

  return W; 
}
//get color at P
//I did R,G,B respectively.
var getRColorAtP = function(v1,v2,v3,xp,yp){
  const [x1, y1, [r1, g1, b1]] = v1;
  const [x2, y2, [r2, g2, b2]] = v2;
  const [x3, y3, [r3, g3, b3]] = v3;
  let U = getUOfBarycentricCoordinates(v1,v2,v3,xp,yp);
  let V = getVOfBarycentricCoordinates(v1,v2,v3,xp,yp);
  let W = 1-U-V;

  let Rp = U*r1 + V*r2 + W*r3;
  return Rp;
}
var getGColorAtP = function(v1,v2,v3,xp,yp){
  const [x1, y1, [r1, g1, b1]] = v1;
  const [x2, y2, [r2, g2, b2]] = v2;
  const [x3, y3, [r3, g3, b3]] = v3;
  let U = getUOfBarycentricCoordinates(v1,v2,v3,xp,yp);
  let V = getVOfBarycentricCoordinates(v1,v2,v3,xp,yp);
  let W = 1-U-V;

  let Gp = U*g1 + V*g2 + W*g3;
  return Gp;
}
var getBColorAtP = function(v1,v2,v3,xp,yp){
  const [x1, y1, [r1, g1, b1]] = v1;
  const [x2, y2, [r2, g2, b2]] = v2;
  const [x3, y3, [r3, g3, b3]] = v3;
  let U = getUOfBarycentricCoordinates(v1,v2,v3,xp,yp);
  let V = getVOfBarycentricCoordinates(v1,v2,v3,xp,yp);
  let W = 1-U-V;

  let Bp = U*b1 + V*b2 + W*b3;
  return Bp;
}
// take two vertices defining line and rasterize to framebuffer
Rasterizer.prototype.drawLine = function(v1, v2) {
  const [x1, y1, [r1, g1, b1]] = v1;
  const [x2, y2, [r2, g2, b2]] = v2;
  // TODO/HINT: use this.setPixel(x, y, color) in this function to draw triangle 
  let dx = x2-x1;
  let dy = y2-y1;
  let m = dy/dx;
  //eight cases in total
  //case that 0<=m<=1
  if(0<=m<=1){
    if(dx>=0&&dy>=0){
      let y = y1;
      for(let x = x1; x <= x2;x++){
        
        let rp = getRofPoint(x1,x2,y1,y2,x,y,r1,r2);
        let gp = getGofPoint(x1,x2,y1,y2,x,y,g1,g2);
        let bp = getBofPoint(x1,x2,y1,y2,x,y,b1,b2);
        this.setPixel(Math.floor(x), Math.floor(y), [rp, gp, bp]);
        y += m;
      }
    }
    if(dx<=0&&dy<=0){
      let y = y1;
      for(let x = x1; x >= x2;x--){
        let rp = getRofPoint(x1,x2,y1,y2,x,y,r1,r2);
        let gp = getGofPoint(x1,x2,y1,y2,x,y,g1,g2);
        let bp = getBofPoint(x1,x2,y1,y2,x,y,b1,b2);
        this.setPixel(Math.floor(x), Math.floor(y), [rp, gp, bp]);
        y -= m;
      }
    }
  }
  //case that -1<=m<=0 
  if(0>=m>=-1){
    if(dy>=0&&dx<=0){
      let y = y1;
      for(let x = x1; x >= x2;x--){
        let rp = getRofPoint(x1,x2,y1,y2,x,y,r1,r2);
        let gp = getGofPoint(x1,x2,y1,y2,x,y,g1,g2);
        let bp = getBofPoint(x1,x2,y1,y2,x,y,b1,b2);
        this.setPixel(Math.floor(x), Math.floor(y), [rp, gp, bp]);
        y -= m;
      }
    }
    if(dy<=0&&dx>=0){
      let y = y1;
      for(let x = x1; x <= x2;x++){
        let rp = getRofPoint(x1,x2,y1,y2,x,y,r1,r2);
        let gp = getGofPoint(x1,x2,y1,y2,x,y,g1,g2);
        let bp = getBofPoint(x1,x2,y1,y2,x,y,b1,b2);
        this.setPixel(Math.floor(x), Math.floor(y), [rp, gp, bp]);
        y += m;
      }
    }
  }
  //case that m>1
  if(m>=1){
    if(dy>=0&&dx>=0){
      let x = x1;
      for(let y = y1; y <= y2;y++){
        let rp = getRofPoint(x1,x2,y1,y2,x,y,r1,r2);
        let gp = getGofPoint(x1,x2,y1,y2,x,y,g1,g2);
        let bp = getBofPoint(x1,x2,y1,y2,x,y,b1,b2);
        this.setPixel(Math.floor(x), Math.floor(y), [rp, gp, bp]);
        x += 1/m;
      }
    }
    if(dy<=0&&dx<=0){
      let x = x1;
      for(let y = y1; y >= y2;y--){
        let rp = getRofPoint(x1,x2,y1,y2,x,y,r1,r2);
        let gp = getGofPoint(x1,x2,y1,y2,x,y,g1,g2);
        let bp = getBofPoint(x1,x2,y1,y2,x,y,b1,b2);
        this.setPixel(Math.floor(x), Math.floor(y), [rp, gp, bp]);
        x -= 1/m;
      }
    }
  }
  //case that m<-1
  if(m<=-1){
    if(dy>=0&&dx<=0){
      let x = x1;
      for(let y = y1; y <= y2;y++){
        let rp = getRofPoint(x1,x2,y1,y2,x,y,r1,r2);
        let gp = getGofPoint(x1,x2,y1,y2,x,y,g1,g2);
        let bp = getBofPoint(x1,x2,y1,y2,x,y,b1,b2);
        this.setPixel(Math.floor(x), Math.floor(y), [rp, gp, bp]);
        x += 1/m;
      }
    }
    if(dy<=0&&dx>=0){
      let x = x1;
      for(let y = y1; y >= y2;y--){
        let rp = getRofPoint(x1,x2,y1,y2,x,y,r1,r2);
        let gp = getGofPoint(x1,x2,y1,y2,x,y,g1,g2);
        let bp = getBofPoint(x1,x2,y1,y2,x,y,b1,b2);
        this.setPixel(Math.floor(x), Math.floor(y), [rp, gp, bp]);
        x -= 1/m;
      }
    }
  }
}

// take 3 vertices defining a solid triangle and rasterize to framebuffer
Rasterizer.prototype.drawTriangle = function(v1, v2, v3) {
  const [x1, y1, [r1, g1, b1]] = v1;
  const [x2, y2, [r2, g2, b2]] = v2;
  const [x3, y3, [r3, g3, b3]] = v3;
  // TODO/HINT: use this.setPixel(x, y, color) in this function to draw triangle
  //draw the triangle.
  this.drawLine(v1,v2);
  this.drawLine(v2,v3);
  this.drawLine(v3,v1);
  //form the bounding box.
  let xmax = Math.max(x1,x2,x3);
  let xmin = Math.min(x1,x2,x3);
  let ymax = Math.max(y1,y2,y3);
  let ymin = Math.min(y1,y2,y3);
  //inside bounding box, check if points are inside the triangle.
  for(let x = xmin; x <= xmax; x++){
    for(let y = ymin; y<=ymax;y++){
      let checkInside = pointIsInsideTriangle(v1,v2,v3,x,y);
      if(checkInside==1){
        let Rp = getRColorAtP(v1,v2,v3,x,y);
        let Gp = getGColorAtP(v1,v2,v3,x,y);
        let Bp = getBColorAtP(v1,v2,v3,x,y);
        this.setPixel(Math.floor(x), Math.floor(y), [Rp, Gp, Bp]);
      }
    }
  }
}


////////////////////////////////////////////////////////////////////////////////
// EXTRA CREDIT: change DEF_INPUT to create something interesting!
////////////////////////////////////////////////////////////////////////////////
const DEF_INPUT = [
  "v,10,10,1.0,0.0,0.0;",
  "v,52,52,0.0,1.0,0.0;",
  "v,52,10,0.0,0.0,1.0;",
  "v,10,52,1.0,1.0,1.0;",
  "t,0,1,2;",
  "t,0,3,1;",
  "v,10,10,1.0,1.0,1.0;",
  "v,10,52,0.0,0.0,0.0;",
  "v,52,52,1.0,1.0,1.0;",
  "v,52,10,0.0,0.0,0.0;",
  "l,4,5;",
  "l,5,6;",
  "l,6,7;",
  "l,7,4;"
].join("\n");

//Hi, below is a new interesting input I created, you can paste to above and have a look at it.
//It includes some of the hardest corner cases.
/*
  my part output:
  "v,10,10,0.0,0.0,0.0;",
  "v,10,30,0.0,0.0,0.0;",
  "v,30,30,0.0,0.0,0.0;",
  "v,30,10,0.0,0.0,0.0;",
  "l,0,1;",
  "l,1,2;",
  "l,2,3;",
  "l,3,0;",
  "v,11,11,1.0,1.0,1.0;",
  "v,11,29,1.0,1.0,1.0;",
  "v,29,29,1.0,1.0,1.0;",
  "v,29,11,1.0,1.0,1.0;",
  "t,4,5,6;",
  "t,6,7,4;",
  "v,20,5,0.0,0.0,0.0;",
  "v,40,5,0.0,0.0,0.0;",
  "v,40,25,0.0,0.0,0.0;",
  "l,0,8;",
  "l,3,9;",
  "l,8,9;",
  "l,2,10;",
  "l,9,10;",
  "v,31,10,0.0,0.0,0.0;",
  "v,31,29,1.0,1.0,1.0;",
  "v,39,24,1.0,1.0,1.0;",
  "v,39,6,1.0,1.0,1.0;",
  "t,11,12,13;",
  "t,11,13,14;",
  "v,12,9,1.0,0.0,0.0;",
  "v,30,9,0.0,1.2,0.0;",
  "v,36,6,0.0,0.0,1.0;",
  "v,18,7,0.5,0.5,0.5;",
  "t,15,16,17;",
  "t,17,18,15;",
  "v,15,15,0.0,0.0,0.0;",
  "v,15,17,0.0,0.0,0.0;",
  "v,25,15,0.0,0.0,0.0;",
  "v,25,17,0.0,0.0,0.0;",
  "l,19,20;",
  "l,21,22;",
  "v,20,27,0.5,0.0,0.0;",
  "v,18,23,0.5,0.0,0.0;",
  "v,22,23,0.5,0.0,0.0;",
  "t,23,25,24;",
  "v,21,31,0.6,0.0,0.0;",
  "v,26,31,0.6,0.0,0.0;",
  "v,25,50,0.6,0.0,0.0;",
  "t,26,28,27;",
  "v,14,31,0.0,0.0,0.2;",
  "v,15,55,0.2,0.2,0.3;",
  "v,35,28,0.0,0.0,0.0;",
  "v,34,55,0.2,0.2,0.3;",
  "t,29,30,32",
  "l,29,30;",
  "l,31,32;",
  "l,30,32;",
  "v,16,55,0.0,0.0,0.0;",
  "v,16,62,0.0,0.0,0.0;",
  "v,32,55,0.0,0.0,0.0;",
  "v,32,62,0.0,0.0,0.0;",
  "l,33,34;",
  "l,35,36;",
  "v,5,5,0.0,0.0,0.0;",
  "v,45,5,0.0,0.0,0.0;",
  "l,29,37;",
  "l,31,38;",
  "v,34,31,0.0,0.0,0.0;",
  "t,30,32,39;",

  "v,40,40,1.0,0.0,0.0;",
  "v,45,55,0.0,0.0,1.0;",
  "v,55,55,0.0,1.0,0.0;",
  "v,60,40,0.0,1.0,1.0;",
  "v,55,30,1.0,0.0,1.0;",
  "v,45,30,1.0,1.0,0.0;",
  "t,40,41,42;",
  "t,40,42,43;",
  "t,40,43,44;",
  "t,40,43,45;",

  "v,45,40,1.0,1.0,1.0;",
  "v,45,44,1.0,1.0,1.0;",
  "v,55,40,1.0,1.0,1.0;",
  "v,55,44,1.0,1.0,1.0;",
  "l,46,47;",
  "l,48,49;"

  Assignment sample output:
  "v,10,10,1.0,0.0,0.0;",
  "v,52,52,0.0,1.0,0.0;",
  "v,52,10,0.0,0.0,1.0;",
  "v,10,52,1.0,1.0,1.0;",
  "t,0,1,2;",
  "t,0,3,1;",
  "v,10,10,1.0,1.0,1.0;",
  "v,10,52,0.0,0.0,0.0;",
  "v,52,52,1.0,1.0,1.0;",
  "v,52,10,0.0,0.0,0.0;",
  "l,4,5;",
  "l,5,6;",
  "l,6,7;",
  "l,7,4;"
  */

  
// DO NOT CHANGE ANYTHING BELOW HERE
export { Rasterizer, Framebuffer, DEF_INPUT };
