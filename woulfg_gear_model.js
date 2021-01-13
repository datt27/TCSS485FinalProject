//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
function woulfgGear(numTeeth, numSpokes) {
    const vertices = [];
    const colors = [];
    const normals = [];


////////////////////////////
// Making gear triangles

   var n = 2 * numTeeth;
   var rad = 1;
   var outRad = 1.2;
   var innerRad = .3;
   var innerOuterRad = 0.85;
   var angInc = 2*3.14159/n;
   var ang = 0;
   var z = 0.1;
   var spokeCount = numSpokes;
   var spoAng = 2 * 3.14159 / spokeCount;

   var i;       //  coin face, front
   for (i = 0; i < n; i++) {
      
         vertices.push(0,0,z,
                       innerRad*Math.cos(ang),innerRad*Math.sin(ang),z,
                       innerRad*Math.cos(ang+angInc),innerRad*Math.sin(ang+angInc),z)

         colors.push( 0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2);
         //colors.push( 1,0,0,  0,1,0,  0,0,1);
         normals.push(0,0,1, 0,0,1, 0,0,1  );
         ang += angInc;
   }

    


   ang = 0;
   for (i = 0; i < n; i++) {
      

         var mat = new Learn_webgl_matrix();
         var rotateMat =  mat.create();
         mat.rotate(rotateMat, 180, 0,1,0);

         var vec4 = new Learn_webgl_point4();
         var v1 = vec4.create(0,0,z);
         var v2 = vec4.create(innerRad*Math.cos(ang),innerRad*Math.sin(ang),z);
         var v3 = vec4.create(innerRad*Math.cos(ang+angInc),innerRad*Math.sin(ang+angInc),z);

         var newV1 = vec4.create();   
         mat.multiplyP4(newV1,rotateMat,v1);

         var newV2 = vec4.create();   
         mat.multiplyP4(newV2,rotateMat,v2);

         var newV3 = vec4.create();   
         mat.multiplyP4(newV3,rotateMat,v3);                  


         vertices.push(  newV1[0], newV1[1], newV1[2],  
                         newV2[0], newV2[1], newV2[2],          
                         newV3[0], newV3[1], newV3[2]                              
                       )

         colors.push( 0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2);
         //colors.push( 1,0,0,  0,1,0,  0,0,1);
         /// AND WE COULD HAVE ROTATED THE NORMALS
         normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
         ang += angInc;
   }   

/*
   ang = 0;   // coin face, back
   for (i = 0; i < n; i++) {
      
         vertices.push(0,0,-z,
                       rad*Math.cos(ang),rad*Math.sin(ang),-z,
                       rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z)

         colors.push( 0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
         normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
         ang += angInc;
   }

*/



   var r;
   for (r = 0; r < 2; r++) {
        ang = 0;
        var drawTooth = false;
  
        for ( i = 0; i < n; i++) {       // face of the teeth
	         drawTooth = !drawTooth;
	         if (drawTooth) {

                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                               outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), 0.25 * z)

                 colors.push(0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2)
                 
                 var no;
                  
                 if (z > 0) {
                 	  
                 	  no = calcNormal(     
                            rad*Math.cos(ang), rad*Math.sin(ang), z,
                            outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), 0.25 *z,
                            rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z
                 	  );
                      
                 }
                 else {
                      
                      no = calcNormal(
                        rad*Math.cos(ang), rad*Math.sin(ang), z,  
                        rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,  
                        outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), 0.25 * z
                      );

                 }

                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), 0.25 * z,
                               outRad*Math.cos(ang), outRad*Math.sin(ang), 0.25 * z);


                 colors.push(0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2) 

                 normals.push(
                     no[0], no[1], no[2],
                    no[0], no[1], no[2],
                    no[0], no[1], no[2],
                    no[0], no[1], no[2],
                    no[0], no[1], no[2],
                    no[0], no[1], no[2]
                 );    

		     }
	         ang += angInc;
        }
        z = -z;
   }

 //  z = -z;  BUG 1
   for (i = 0; i < spokeCount; i++) { //Addition of spokes (for each spoke)
        
        for(r = 0; r < 2; r++) {
           
           var no;

           if(z > 0) { // calc face normals in the usual way
            no = calcNormal(
                innerRad * Math.cos(ang - .2), innerRad * Math.sin(ang - .2), 0.4 *z,
                (innerOuterRad + .1) * Math.cos(ang - .2), (innerOuterRad + .1) * Math.sin(ang - .2), 0.4 *z,
                innerRad * Math.cos(ang + .2), innerRad * Math.sin(ang + .2), 0.4 *z
            );
           } else {
                
            no = calcNormal(
                innerRad * Math.cos(ang - .2), innerRad * Math.sin(ang - .2), 0.4 *z,
                innerRad * Math.cos(ang + .2), innerRad * Math.sin(ang + .2), 0.4 *z,
                (innerOuterRad + .1) * Math.cos(ang - .2), (innerOuterRad + .1) * Math.sin(ang - .2), 0.4 *z
            );

           }

            vertices.push(
                innerRad * Math.cos(ang - .2), innerRad * Math.sin(ang - .2), 0.4 *z,
                (innerOuterRad + .1) * Math.cos(ang - .2), (innerOuterRad + .1) * Math.sin(ang - .2), 0.4 *z,
                innerRad * Math.cos(ang + .2), innerRad * Math.sin(ang + .2), 0.4 *z,

                innerRad * Math.cos(ang + .2), innerRad * Math.sin(ang + .2), 0.4 *z,
                (innerOuterRad + .1) * Math.cos(ang - .2), (innerOuterRad + .1) * Math.sin(ang - .2), 0.4 *z,
                (innerOuterRad + .1) * Math.cos(ang + .2), (innerOuterRad + .1) * Math.sin(ang + .2), 0.4 *z

            );

            colors.push(0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2,
                    0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2);

            normals.push(
                no[0], no[1], no[2],
                no[0], no[1], no[2],
                no[0], no[1], no[2],
                no[0], no[1], no[2],
                no[0], no[1], no[2],
                no[0], no[1], no[2]
            );
            

            z = -z;

        }
       
        no = calcNormal(
            innerRad * Math.cos(ang - .2), innerRad * Math.sin(ang - .2), 0.4 *z,
            innerRad * Math.cos(ang - .2), innerRad * Math.sin(ang - .2), -0.4 *z,
            (innerOuterRad + .1) * Math.cos(ang - .2), (innerOuterRad + .1) * Math.sin(ang - .2), -0.4 *z
        );

        vertices.push(
            innerRad * Math.cos(ang - .2), innerRad * Math.sin(ang - .2), 0.4 *z,
            innerRad * Math.cos(ang - .2), innerRad * Math.sin(ang - .2), -0.4 *z,
            (innerOuterRad + .1) * Math.cos(ang - .2), (innerOuterRad + .1) * Math.sin(ang - .2), -0.4 *z,

            (innerOuterRad + .1) * Math.cos(ang - .2), (innerOuterRad + .1) * Math.sin(ang - .2), -0.4 *z,
            (innerOuterRad + .1) * Math.cos(ang - .2), (innerOuterRad + .1) * Math.sin(ang - .2), 0.4 *z,
            innerRad * Math.cos(ang - .2), innerRad * Math.sin(ang - .2), 0.4 *z
        
        );
            
            colors.push(0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2,
                0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2);

            normals.push(
                no[0], no[1], no[2],
                no[0], no[1], no[2],
                no[0], no[1], no[2],
                no[0], no[1], no[2],
                no[0], no[1], no[2],
                no[0], no[1], no[2]
            );


         no = calcNormal(
            innerRad * Math.cos(ang + .2), innerRad * Math.sin(ang + .2), 0.4 *z,
            (innerOuterRad + .1) * Math.cos(ang + .2), (innerOuterRad + .1) * Math.sin(ang + .2), -0.4 *z,
            innerRad * Math.cos(ang + .2), innerRad * Math.sin(ang + .2), -0.4 *z

        );

        vertices.push(
            innerRad * Math.cos(ang + .2), innerRad * Math.sin(ang + .2), 0.4 *z,
            innerRad * Math.cos(ang + .2), innerRad * Math.sin(ang + .2), -0.4 *z,
            (innerOuterRad + .1) * Math.cos(ang + .2), (innerOuterRad + .1) * Math.sin(ang + .2), -0.4 *z,

            (innerOuterRad + .1) * Math.cos(ang + .2), (innerOuterRad + .1) * Math.sin(ang + .2), -0.4 *z,
            (innerOuterRad + .1) * Math.cos(ang + .2), (innerOuterRad + .1) * Math.sin(ang + .2), 0.4 *z,
            innerRad * Math.cos(ang + .2), innerRad * Math.sin(ang + .2), 0.4 *z
        
        );
            
            colors.push(0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2,
               0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2);

            normals.push(
                no[0], no[1], no[2],
                no[0], no[1], no[2],
                no[0], no[1], no[2],
                no[0], no[1], no[2],
                no[0], no[1], no[2],
                no[0], no[1], no[2]
            );

        ang += spoAng;

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

        colors.push(0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
               rad*Math.cos(ang),rad*Math.sin(ang),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
               rad*Math.cos(ang),rad*Math.sin(ang),z)

        colors.push(0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])            
        }

	    ang += angInc;
   }

 ang = 0; 
 for (i = 0; i < n; i++) { // Upper Outer coin face

    var normP = [0, 0, z]; // Coin faces +/- z
    var normN = [0, 0, -z];
    
    vertices.push( 
        innerOuterRad*Math.cos(ang), innerOuterRad*Math.sin(ang), z,
        innerOuterRad*Math.cos(ang + angInc), innerOuterRad*Math.sin(ang+angInc), z,
        rad*Math.cos(ang + angInc), rad*Math.sin(ang+angInc), z,
        
        rad*Math.cos(ang + angInc), rad*Math.sin(ang+angInc), z,
        innerOuterRad*Math.cos(ang), innerOuterRad*Math.sin(ang), z,
        rad*Math.cos(ang), rad * Math.sin(ang), z
    );
    
        colors.push(0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2,
                    0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2);
        
        normals.push(normP[0], normP[1], normP[2],
                    normP[0], normP[1], normP[2],
                    normP[0], normP[1], normP[2],
                    normP[0], normP[1], normP[2],
                    normP[0], normP[1], normP[2],
                    normP[0], normP[1], normP[2]);
        
        vertices.push( 
        innerOuterRad*Math.cos(ang), innerOuterRad*Math.sin(ang), -z,
        innerOuterRad*Math.cos(ang + angInc), innerOuterRad*Math.sin(ang+angInc), -z,
        rad*Math.cos(ang + angInc), rad*Math.sin(ang+angInc), -z,
        
        rad*Math.cos(ang + angInc), rad*Math.sin(ang+angInc), -z,
        innerOuterRad*Math.cos(ang), innerOuterRad*Math.sin(ang), -z,
        rad*Math.cos(ang), rad * Math.sin(ang), -z
    );
    
    colors.push(0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2,
                0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2);
            
            normals.push(normN[0], normN[1], normN[2],
                    normN[0], normN[1], normN[2],
                    normN[0], normN[1], normN[2],
                    normN[0], normN[1], normN[2],
                    normN[0], normN[1], normN[2],
                    normN[0], normN[1], normN[2]);

    ang += angInc;

 }

 ang = 0;
 for (i = 0; i < n; i++){ // Outward facing interior coin edge 

    // We're making a square so the triangles and vertices share normals
    var no = calcNormal(       innerRad * Math.cos(ang), innerRad * Math.sin(ang), -z,
        innerRad * Math.cos(ang + angInc), innerRad * Math.sin(ang + angInc), -z,
        innerRad * Math.cos(ang), innerRad * Math.sin(ang), z);

    vertices.push(
        
        innerRad * Math.cos(ang), innerRad * Math.sin(ang), -z,
        innerRad * Math.cos(ang + angInc), innerRad * Math.sin(ang + angInc), -z,
        innerRad * Math.cos(ang), innerRad * Math.sin(ang), z,

        innerRad * Math.cos(ang + angInc), innerRad * Math.sin(ang + angInc), -z,
        innerRad * Math.cos(ang + angInc), innerRad * Math.sin(ang + angInc), z,
        innerRad * Math.cos(ang), innerRad * Math.sin(ang), z
    );

        colors.push(0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2,
                0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2);

    normals.push(no[0], no[1], no[2],
                no[0], no[1], no[2],
                no[0], no[1], no[2],
                no[0], no[1], no[2],
                no[0], no[1], no[2],
                no[0], no[1], no[2]);
    ang += angInc;
 }

 ang = 0;
 for (i = 0; i < n; i++){ // Inward facing interior coin edge 

    // We're making a square so the triangles and vertices share normals
    var no = calcNormal(       innerOuterRad * Math.cos(ang), innerOuterRad * Math.sin(ang), z,
        innerOuterRad * Math.cos(ang + angInc), innerOuterRad * Math.sin(ang + angInc), z,
        innerOuterRad * Math.cos(ang), innerOuterRad * Math.sin(ang), -z);

    vertices.push(
        
        innerOuterRad * Math.cos(ang), innerOuterRad * Math.sin(ang), z,
        innerOuterRad * Math.cos(ang + angInc), innerOuterRad * Math.sin(ang + angInc), z,
        innerOuterRad * Math.cos(ang), innerOuterRad * Math.sin(ang), -z,

        innerOuterRad * Math.cos(ang + angInc), innerOuterRad * Math.sin(ang + angInc), z,
        innerOuterRad * Math.cos(ang + angInc), innerOuterRad * Math.sin(ang + angInc), -z,
        innerOuterRad * Math.cos(ang), innerOuterRad * Math.sin(ang), -z
    );

        colors.push(0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2,
                0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2);

    normals.push(no[0], no[1], no[2],
                no[0], no[1], no[2],
                no[0], no[1], no[2],
                no[0], no[1], no[2],
                no[0], no[1], no[2],
                no[0], no[1], no[2]);
    ang += angInc;
 }

 ang = 0;
   drawTooth = false;     // tooth roof
   for (i = 0; i < n; i++) {
	    drawTooth = !drawTooth;
	    if (drawTooth) {
	      
        var norm = [outRad*Math.cos(ang+angInc/2),outRad*Math.sin(ang+angInc/2),0];
        vertices.push(
              outRad*Math.cos(ang),outRad*Math.sin(ang),-0.25*z,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-0.25*z,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),0.25*z)

        colors.push(0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
              outRad*Math.cos(ang),outRad*Math.sin(ang),-0.25*z,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),0.25*z,
              outRad*Math.cos(ang),outRad*Math.sin(ang),0.25*z)

        colors.push(0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2)
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
		                          outRad*Math.cos(ang),outRad*Math.sin(ang),-0.25*z,
		                            outRad*Math.cos(ang),outRad*Math.sin(ang),0.25*z
		                            
				                    );

           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z,
               outRad*Math.cos(ang),outRad*Math.sin(ang),-0.25*z,
               outRad*Math.cos(ang),outRad*Math.sin(ang),0.25*z)
           colors.push(0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z,
               outRad*Math.cos(ang),outRad*Math.sin(ang),0.25*z,
               rad*Math.cos(ang),   rad*Math.sin(ang),z)
           colors.push(0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             



           var norm = calcNormal( rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc),-z,
                                   outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),.25*z,
			                        outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-.25*z
				                    );
				                  
           vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-.25*z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),.25*z)
           colors.push(0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             


           vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),.25*z,
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),z)
           colors.push(0.722,0.322,0.2, 0.722,0.322,0.2,  0.722,0.322,0.2)
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