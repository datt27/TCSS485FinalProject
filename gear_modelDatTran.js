//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
function dtranGear(numTeeth, numSpoke) {
    const vertices = [];
    const colors = [];
    const normals = [];


////////////////////////////
// Making gear triangles

   var n = numTeeth*2;
   var gColor = [1,0.70,0];
   var rad = 1.0;
   var outRad = rad * 1.2;
   var angInc = 2*3.14159/n;
   var angIncSpoke = 2*3.14159/numSpoke;
   var ang = 0;
   var z = 0.1;
   var slant = 0.075;

   var smallRad = rad-0.65;
   var bigRad = rad-0.2;

   var i;       //  gear face
   var r;
   for (r = 0; r < 2; r++){
        ang = 0;
        for (i = 0; i < n; i++) {

            //inner circle
            vertices.push(0,0,z,
                       smallRad*Math.cos(ang),smallRad*Math.sin(ang),z,
                       smallRad*Math.cos(ang+angInc),smallRad*Math.sin(ang+angInc),z)
            colors.push(gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2]);

            if (z > 0) normals.push(0,0,1, 0,0,1, 0,0,1  );
            else normals.push(0,0,-1, 0,0,-1, 0,0,-1  );

            vertices.push(0,0,z,
                       smallRad*Math.cos(ang),smallRad*Math.sin(ang),z,
                       smallRad*Math.cos(ang+angInc),smallRad*Math.sin(ang+angInc),z)
            colors.push(gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2]);

            if (z > 0) normals.push(0,0,1, 0,0,1, 0,0,1  );
            else normals.push(0,0,-1, 0,0,-1, 0,0,-1  );

            //outer circle - first half (triangle)
            vertices.push(bigRad*Math.cos(ang),bigRad*Math.sin(ang),z,
                       rad*Math.cos(ang),rad*Math.sin(ang),z,
                       rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)
            colors.push(gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2]);

            if (z > 0) normals.push(0,0,1, 0,0,1, 0,0,1  );
            else normals.push(0,0,-1, 0,0,-1, 0,0,-1  );

            //outer circle - second half (triangle)
            vertices.push(bigRad*Math.cos(ang),bigRad*Math.sin(ang),z,
                       rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
                       bigRad*Math.cos(ang+angInc),bigRad*Math.sin(ang+angInc),z)
            colors.push(gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2]);

            if (z > 0) normals.push(0,0,1, 0,0,1, 0,0,1  );
            else normals.push(0,0,-1, 0,0,-1, 0,0,-1  );

            ang += angInc;
        }
        z = -z;
   }

    // Spokes
    ang = 0;
    var r;
    for (r = 0; r < 2; r++) {
        for (i = 0; i < numSpoke*2; i++) {
            if (r == 0){
                //spokes walls - left side
                var norm = calcNormal(smallRad*Math.cos(ang),smallRad*Math.sin(ang),-z,
                                    bigRad*Math.cos(ang),bigRad*Math.sin(ang),-z,
			                        bigRad*Math.cos(ang),bigRad*Math.sin(ang),z
				                    );
                // first half
                vertices.push(smallRad*Math.cos(ang),smallRad*Math.sin(ang),-z,
                              bigRad*Math.cos(ang),bigRad*Math.sin(ang),-z,
                              bigRad*Math.cos(ang),bigRad*Math.sin(ang),z)

                colors.push(gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2]);
                normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

                // second half
                vertices.push(smallRad*Math.cos(ang),smallRad*Math.sin(ang),-z,
                              bigRad*Math.cos(ang),bigRad*Math.sin(ang),z,
                              smallRad*Math.cos(ang), smallRad*Math.sin(ang),z)

                colors.push(gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2]);
                normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

                //spokes walls - right side
                var norm = calcNormal(smallRad*Math.cos(ang+angInc), smallRad*Math.sin(ang+angInc),-z,
                                      bigRad*Math.cos(ang+angInc),bigRad*Math.sin(ang+angInc),z,
			                          bigRad*Math.cos(ang+angInc),bigRad*Math.sin(ang+angInc),-z
				                     );
                // first half
                vertices.push(smallRad*Math.cos(ang+angInc),smallRad*Math.sin(ang+angInc),-z,
                              bigRad*Math.cos(ang+angInc),bigRad*Math.sin(ang+angInc),z,
                              bigRad*Math.cos(ang+angInc),bigRad*Math.sin(ang+angInc),-z);

                colors.push(gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2]);
                normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);
                // second half
                vertices.push(smallRad*Math.cos(ang+angInc),smallRad*Math.sin(ang+angInc),-z,
                          bigRad*Math.cos(ang+angInc),bigRad*Math.sin(ang+angInc),z,
                          smallRad*Math.cos(ang+angInc),smallRad*Math.sin(ang+angInc),z)

                colors.push(gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2]);
                normals.push(norm[0],norm[1],norm[2],norm[0],norm[1],norm[2],norm[0],norm[1],norm[2])


            }


            // spokes faces - first half
            vertices.push(smallRad*Math.cos(ang),smallRad*Math.sin(ang),z,
                       bigRad*Math.cos(ang),bigRad*Math.sin(ang),z,
                       smallRad*Math.cos(ang+angInc),smallRad*Math.sin(ang+angInc),z)
            colors.push(gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2]);

            if (z > 0) normals.push(0,0,1, 0,0,1, 0,0,1  );
            else normals.push(0,0,-1, 0,0,-1, 0,0,-1  );

            // spokes faces - second half
            vertices.push(smallRad*Math.cos(ang+angInc),smallRad*Math.sin(ang+angInc),z,
                       bigRad*Math.cos(ang),bigRad*Math.sin(ang),z,
                       bigRad*Math.cos(ang+angInc),bigRad*Math.sin(ang+angInc),z)
            colors.push(gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2]);

            if (z > 0) normals.push(0,0,1, 0,0,1, 0,0,1  );
            else normals.push(0,0,-1, 0,0,-1, 0,0,-1  );

            ang += angIncSpoke;
        }
        z = -z;


    }



   var newZ;

   for (r = 0; r < 2; r++) {
        ang = 0;
        var drawTooth = false;
  
        for ( i = 0; i < n; i++) {       // face of the teeth
	         drawTooth = !drawTooth;
	         if (drawTooth) {
	             //new Z for front-face
                 if(r == 0){
                    newZ = z-slant;
                    var norm = calcNormal(outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), newZ,
                                       rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                                       rad*Math.cos(ang), rad*Math.sin(ang), z
				                    );
                 }
                 //new Z for back-face
                 else {
                    newZ = z+slant;
				    var norm = calcNormal(rad*Math.cos(ang), rad*Math.sin(ang), z,
                                       rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                                       outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), newZ
				                    );
                 }


                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                               outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), newZ);

                 colors.push(gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2]);

                 normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), newZ,
                               outRad*Math.cos(ang), outRad*Math.sin(ang), newZ);


                 colors.push(gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2]);

                 normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


		     }
	         ang += angInc;
        }
        z = -z;
   }

 //  z = -z;  BUG 1
   //use angIncTEmp = angInc / m; for smoothness
   var angIncTemp = angInc;
   // inner circle's edge
   //n * m if angIncTEmp = angInc / m
   for (i = 0; i < n; i++){
        var norm = [smallRad*Math.cos(ang+angIncTemp/2),rad*Math.sin(ang+angIncTemp/2),0];
	    //inner circle's edge
        vertices.push(
               smallRad*Math.cos(ang),smallRad*Math.sin(ang),-z,
               smallRad*Math.cos(ang+angIncTemp),smallRad*Math.sin(ang+angIncTemp),-z,
               smallRad*Math.cos(ang+angIncTemp),smallRad*Math.sin(ang+angIncTemp),z)

        colors.push(gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2]);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
               smallRad*Math.cos(ang),smallRad*Math.sin(ang),-z,
               smallRad*Math.cos(ang+angIncTemp),smallRad*Math.sin(ang+angIncTemp),z,
               smallRad*Math.cos(ang),smallRad*Math.sin(ang),z)

        colors.push(gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2]);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        //outer circle bottom edge
         var norm = calcNormal(bigRad*Math.cos(ang+angIncTemp),bigRad*Math.sin(ang+angIncTemp),-z,
                               bigRad*Math.cos(ang),bigRad*Math.sin(ang),-z,
                               bigRad*Math.cos(ang+angIncTemp),bigRad*Math.sin(ang+angIncTemp),z
		                       );
         vertices.push(
               bigRad*Math.cos(ang),bigRad*Math.sin(ang),-z,
               bigRad*Math.cos(ang+angIncTemp),bigRad*Math.sin(ang+angIncTemp),-z,
               bigRad*Math.cos(ang+angIncTemp),bigRad*Math.sin(ang+angIncTemp),z)
        colors.push(gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2]);
        //colors.push(1,0,0,0,1,0,0,0,1)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
               bigRad*Math.cos(ang),bigRad*Math.sin(ang),-z,
               bigRad*Math.cos(ang+angIncTemp),bigRad*Math.sin(ang+angIncTemp),z,
               bigRad*Math.cos(ang),bigRad*Math.sin(ang),z)
        colors.push(gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2]);

        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        ang += angIncTemp;

   }





   
   ang = 0;                          // coin edge
   var drawTooth = true;
   for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
	    var norm = [rad*Math.cos(ang+angInc/2),rad*Math.sin(ang+angInc/2),0];
        if (drawTooth) {
          
        vertices.push(
               rad*Math.cos(ang),rad*Math.sin(ang),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)

        colors.push(gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2]);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
               rad*Math.cos(ang),rad*Math.sin(ang),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
               rad*Math.cos(ang),rad*Math.sin(ang),z)

        colors.push(gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2]);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])
        }

	    ang += angInc;
   }


 ang = 0;
   drawTooth = false;     // tooth roof
   for (i = 0; i < n; i++) {
	    drawTooth = !drawTooth;
	    if (drawTooth) {
	      
        var norm = [outRad*Math.cos(ang+angInc/2),outRad*Math.sin(ang+angInc/2),0];
        vertices.push(
              outRad*Math.cos(ang),outRad*Math.sin(ang),-z+slant,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z+slant,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z-slant)

        colors.push(gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2]);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
              outRad*Math.cos(ang),outRad*Math.sin(ang),-z+slant,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z-slant,
              outRad*Math.cos(ang),outRad*Math.sin(ang),z-slant)

        colors.push(gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2]);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

		}
	    ang += angInc;
   }

   ang = 0;

   drawTooth = false;
   for ( i = 0; i < n; i++) {   // tooth walls
	    drawTooth = !drawTooth;
	    if (drawTooth) {
			
            
           // BUG 3   norm vs. normal  
		   var norm = calcNormal( rad*Math.cos(ang), rad*Math.sin(ang),-z,
		                          outRad*Math.cos(ang),outRad*Math.sin(ang),-z,
		                          outRad*Math.cos(ang),outRad*Math.sin(ang),z
		                         );

           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z,
               outRad*Math.cos(ang),outRad*Math.sin(ang),-z+slant,
               outRad*Math.cos(ang),outRad*Math.sin(ang),z-slant)
           colors.push(gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2]);

           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z,
               outRad*Math.cos(ang),outRad*Math.sin(ang),z-slant,
               rad*Math.cos(ang),   rad*Math.sin(ang),z)

           colors.push(gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2]);
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])



           var norm = calcNormal( rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc),-z,
                                   outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z,
			                        outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z
				                    );

           vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z+slant,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z-slant)
           colors.push(gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2]);
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

           vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z-slant,
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),z)
           colors.push(gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2],gColor[0],gColor[1],gColor[2]);
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])
           

		}
	    ang += angInc;
   }

   




    



    return [vertices,colors,normals]
}




















function calcNormal(x1, y1,  z1,
                    x2,  y2,  z2,
                    x3,  y3,  z3) {
              
    var ux = x2-x1, uy = y2-y1, uz = z2-z1;
    var vx = x3-x1, vy = y3-y1, vz = z3-z1;

    return [ uy * vz - uz * vy,
             uz * vx - ux * vz,
             ux * vy - uy * vx];
}