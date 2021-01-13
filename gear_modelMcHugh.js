//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
function mchughGear(numTeeth, numSpokes) {
    const vertices = [];
    const colors = [];
    const normals = [];


////////////////////////////
// Making gear triangles


    var n = numTeeth * 2;
    var m = numSpokes * 2;
    var rad = 1.0;
    var outRad = rad * 1.2;
    var angInc = 2*3.14159/n;
    var ang = 0;
    var z = 0.1;

    var i;      
    // coin face, front
    for (i = 0; i < n; i++) {

        // gear center front
        vertices.push(0,0,z,
            rad*Math.cos(ang) * .2,rad*Math.sin(ang) * .2,z,
            rad*Math.cos(ang+angInc) * .2,rad*Math.sin(ang+angInc) * .2,z)

            colors.push( 0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
            normals.push(0,0,1, 0,0,1, 0,0,1);

            // gear outer ring front
            vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), -z,
                            rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), -z,
                            (rad - .2)*Math.cos(ang+angInc), (rad - .2)*Math.sin(ang+angInc), -z)

            colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
                  
            if (z < 0)
                normals.push(0,0,1, 0,0,1, 0,0,1  );    
            else
                normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

                vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), -z,
                    (rad - .2)*Math.cos(ang+angInc), (rad - .2)*Math.sin(ang+angInc), -z,
                    (rad - .2)*Math.cos(ang), (rad - .2)*Math.sin(ang), -z);


                colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5) 

                if (z < 0)
                    normals.push(0,0,1, 0,0,1, 0,0,1  );    
                else
                    normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
        ang += angInc;
    }


   ang = 0;   
   // coin face, back
   for (i = 0; i < n; i++) {

        // gear center back
        vertices.push(0,0,-z,
            rad*Math.cos(ang) * .2,rad*Math.sin(ang) * .2,-z,
            rad*Math.cos(ang+angInc) * .2,rad*Math.sin(ang+angInc) * .2,-z)

            colors.push( 0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
            normals.push(0,0,-1, 0,0,-1, 0,0,-1  );

            // gear center roof
            var norm = [Math.cos(ang+angInc/2),Math.sin(ang+angInc/2),0];
            vertices.push(
                .2*Math.cos(ang),.2*Math.sin(ang),-z,
                .2*Math.cos(ang+angInc),.2*Math.sin(ang+angInc),-z,
                .2*Math.cos(ang+angInc),.2*Math.sin(ang+angInc),z)

            colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

            vertices.push(
                .2*Math.cos(ang),.2*Math.sin(ang),-z,
                .2*Math.cos(ang+angInc),.2*Math.sin(ang+angInc),z,
                .2*Math.cos(ang),.2*Math.sin(ang),z)

            colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])        
            
            // gear outer ring back
            vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                            rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                            (rad - .2)*Math.cos(ang+angInc), (rad - .2)*Math.sin(ang+angInc), z)

            colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
                  
            if (z > 0)
                normals.push(0,0,1, 0,0,1, 0,0,1  );    
            else
                normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

                vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                    (rad - .2)*Math.cos(ang+angInc), (rad - .2)*Math.sin(ang+angInc), z,
                    (rad - .2)*Math.cos(ang), (rad - .2)*Math.sin(ang), z);


                colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5) 

                if (z > 0)
                    normals.push(0,0,1, 0,0,1, 0,0,1  );    
                else
                    normals.push(0,0,-1, 0,0,-1, 0,0,-1  );


            // gear outer ring bottom
            var norm = [-Math.cos(ang+angInc/2),-Math.sin(ang+angInc/2),0];
            vertices.push(
                .8*Math.cos(ang),.8*Math.sin(ang),-z,
                .8*Math.cos(ang+angInc),.8*Math.sin(ang+angInc),-z,
                .8*Math.cos(ang+angInc),.8*Math.sin(ang+angInc),z)

            colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

            vertices.push(
                .8*Math.cos(ang),.8*Math.sin(ang),-z,
                .8*Math.cos(ang+angInc),.8*Math.sin(ang+angInc),z,
                .8*Math.cos(ang),.8*Math.sin(ang),z)

            colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])
        ang += angInc;
         
   }


   var r;
   for (r = 0; r < 2; r++) {
        ang = 0;
        var drawSpoke = false;
  
        for ( i = 0; i < m; i++) {       // face of the spokes
	         drawSpoke = !drawSpoke;
	         if (drawSpoke) {

                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                               0, 0, z)

                 colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
                  
                 if (z > 0)
                      normals.push(0,0,1, 0,0,1, 0,0,1  );    
                 else
                      normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               0, 0, z,
                               0, 0, z);


                 colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5) 

                 if (z > 0)
                      normals.push(0,0,1, 0,0,1, 0,0,1  );    
                 else
                      normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

		     }
	         ang += angInc * n/m;
        }
        z = -z;
   }


    drawSpoke = false;
    for ( i = 0; i < m; i++) {   // spoke walls
        drawSpoke = !drawSpoke;
        if (drawSpoke) {
            
            // BUG 3   norm vs. normal  
            var norm = calcNormal( rad*Math.cos(ang), rad*Math.sin(ang),-z,
                                    0,0,z,
                                    0,0,-z);

            
                        //            0,0,-z,
                        //            0,0,z);

            vertices.push(
                rad*Math.cos(ang),   rad*Math.sin(ang),-z,
                0,0,-z,
                0,0,z)
            colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

            vertices.push(
                rad*Math.cos(ang),   rad*Math.sin(ang),-z,
                0,0,z,
                rad*Math.cos(ang),   rad*Math.sin(ang),z)
            colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             

            var norm = calcNormal( rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc),-z,
                                    0,0,-z,
                                    0,0,z);

                                //    0,0,z,
                               //     0,0,-z);
                                    
            vertices.push(
                rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
                0,0,-z,
                0,0,z)
            colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             

            vertices.push(
                rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
                0,0,z,
                rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),z)
            colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             
		}
	    ang += angInc * n/m;
    }


   var r;
   for (r = 0; r < 2; r++) {
        ang = 0;
        var drawTooth = false;
  
        for ( i = 0; i < n; i++) {       // face of the teeth
	         drawTooth = !drawTooth;
	         if (drawTooth) {

                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                               outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z * .5)

                 colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
                  
                 if (z > 0)
                      normals.push(0,0,1, 0,0,1, 0,0,1  );    
                 else
                      normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z * .5,
                               outRad*Math.cos(ang), outRad*Math.sin(ang), z * .5);


                 colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5) 

                 if (z > 0)
                      normals.push(0,0,1, 0,0,1, 0,0,1  );    
                 else
                      normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

		     }
	         ang += angInc;
        }
        z = -z;
   }

 //  z = -z;  BUG 1



   
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

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
               rad*Math.cos(ang),rad*Math.sin(ang),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
               rad*Math.cos(ang),rad*Math.sin(ang),z)

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
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
              outRad*Math.cos(ang),outRad*Math.sin(ang),-z * .5,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z * .5,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z * .5)

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
              outRad*Math.cos(ang),outRad*Math.sin(ang),-z * .5,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z * .5,
              outRad*Math.cos(ang),outRad*Math.sin(ang),z * .5)

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
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
               outRad*Math.cos(ang),outRad*Math.sin(ang),-z * .5,
               outRad*Math.cos(ang),outRad*Math.sin(ang),z * .5)
           colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z,
               outRad*Math.cos(ang),outRad*Math.sin(ang),z * .5,
               rad*Math.cos(ang),   rad*Math.sin(ang),z)
           colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             



           var norm = calcNormal( rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc),-z,
                                   outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z,
			                        outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z
				                    );
				                  
           vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z * .5,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z * .5)
           colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             


           vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z * .5,
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),z)
           colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
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