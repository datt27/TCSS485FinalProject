/* Modified by Dat Tran
  Gears Used:
  0  - Alex Larsen
  6  - Matthew Fomich
  10 - James McHugh
  16 - Gordon McCreary
  20 - Steven Tran
*/

main();


function main() {

  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl', {antialias: true}  );

  // If we don't have a GL context, give up now
  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }


  var angle_x = 0;
  var angle_y = 90;
  var t = 0;
  var gear_id = 0;
  var camera_speed = 0.1;
  var darkness = 0.0;
  

  // Vertex shader program, runs on GPU, once per vertex

  const vsSource = `
  // Vertex Shader
  precision mediump int;
  precision mediump float;

  // Scene transformations
  uniform mat4 u_PVM_transform; // Projection, view, model transform
  uniform mat4 u_VM_transform;  // View, model transform

  // Light model
  uniform vec3 u_Light_position;
  uniform vec3 u_Light_color;
  uniform float u_Shininess;
  uniform vec3 u_Ambient_color;

  // Original model data
  attribute vec3 a_Vertex;
  attribute vec3 a_Color;
  attribute vec3 a_Vertex_normal;

  // Data (to be interpolated) that is passed on to the fragment shader
  varying vec3 v_Vertex;
  varying vec4 v_Color;
  varying vec3 v_Normal;

  void main() {

    // Perform the model and view transformations on the vertex and pass this
    // location to the fragment shader.
    v_Vertex = vec3( u_VM_transform * vec4(a_Vertex, 1.0) );

    // Perform the model and view transformations on the vertex's normal vector
    // and pass this normal vector to the fragment shader.
    v_Normal = vec3( u_VM_transform * vec4(a_Vertex_normal, 0.0) );

    // Pass the vertex's color to the fragment shader.
    v_Color = vec4(a_Color, 1.0);

    // Transform the location of the vertex for the rest of the graphics pipeline
    gl_Position = u_PVM_transform * vec4(a_Vertex, 1.0);
  }
  `;

  // Fragment shader program, runs on GPU, once per potential pixel

  const fsSource = `
  // Fragment shader program
  precision mediump int;
  precision mediump float;

  // Light model
  uniform vec3 u_Light_position;
  uniform vec3 u_Light_color;
  uniform float u_Shininess;
  uniform vec3 u_Ambient_color;

  // Data coming from the vertex shader
  varying vec3 v_Vertex;
  varying vec4 v_Color;
  varying vec3 v_Normal;

  void main() {

    vec3 to_light;
    vec3 vertex_normal;
    vec3 reflection;
    vec3 to_camera;
    float cos_angle;
    vec3 diffuse_color;
    vec3 specular_color;
    vec3 ambient_color;
    vec3 color;

    // Calculate the ambient color as a percentage of the surface color
    ambient_color = u_Ambient_color * vec3(v_Color);

    // Calculate a vector from the fragment location to the light source
    to_light = u_Light_position - v_Vertex;
    to_light = normalize( to_light );

    // The vertex's normal vector is being interpolated across the primitive
    // which can make it un-normalized. So normalize the vertex's normal vector.
    vertex_normal = normalize( v_Normal );

    // Calculate the cosine of the angle between the vertex's normal vector
    // and the vector going to the light.
    cos_angle = dot(vertex_normal, to_light);
    cos_angle = clamp(cos_angle, 0.0, 1.0);

    // Scale the color of this fragment based on its angle to the light.
    diffuse_color = vec3(v_Color) * cos_angle;

    // Calculate the reflection vector
    reflection = 2.0 * dot(vertex_normal,to_light) * vertex_normal - to_light;

    // Calculate a vector from the fragment location to the camera.
    // The camera is at the origin, so negating the vertex location gives the vector
    to_camera = -1.0 * v_Vertex;

    // Calculate the cosine of the angle between the reflection vector
    // and the vector going to the camera.
    reflection = normalize( reflection );
    to_camera = normalize( to_camera );
    cos_angle = dot(reflection, to_camera);
    cos_angle = clamp(cos_angle, 0.0, 1.0);
    cos_angle = pow(cos_angle, u_Shininess);

    // The specular color is from the light source, not the object
    if (cos_angle > 0.0) {
      specular_color = u_Light_color * cos_angle;
      diffuse_color = diffuse_color * (1.0 - cos_angle);
    } else {
      specular_color = vec3(0.0, 0.0, 0.0);
    }

    color = ambient_color + diffuse_color + specular_color;

    gl_FragColor = vec4(color, v_Color.a);
  }
  `;

  // Initialize a shader program; this is where all
  // the lighting for the objects, if any, is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Tell WebGL to use our program when drawing
  gl.useProgram(shaderProgram);

  // Collect all the info needed to use the shader program.
  // Look up locations of attributes and uniforms used by
  // our shader program
  const programInfo = {
    program: shaderProgram,
    locations: {
      a_vertex: gl.getAttribLocation(shaderProgram, 'a_Vertex'),
      a_color: gl.getAttribLocation(shaderProgram, 'a_Color'),
      a_normal: gl.getAttribLocation(shaderProgram, 'a_Vertex_normal'),
      u_light_position: gl.getUniformLocation(shaderProgram, 'u_Light_position'),
	  u_light_color: gl.getUniformLocation(shaderProgram, 'u_Light_color'),
	  u_shininess: gl.getUniformLocation(shaderProgram, 'u_Shininess'),
	  u_ambient_color: gl.getUniformLocation(shaderProgram, 'u_Ambient_color'),
	  u_PVM_transform: gl.getUniformLocation(shaderProgram, 'u_PVM_transform'),
	  u_VM_transform: gl.getUniformLocation(shaderProgram, 'u_VM_transform'),

    },
  };

  // add an event handler so we can interactively rotate the model
  document.addEventListener('keydown',

      function key_event(event) {

         if(event.keyCode == 37) {   //left
             angle_y -= 3;
         } else if(event.keyCode == 38) {  //top
             angle_x -= 3;
         } else if(event.keyCode == 39) {  //right
             angle_y += 3;
         } else if(event.keyCode == 40) {  //bottom
             angle_x += 3;
         } else if (event.keyCode == 83){ // s button
            if (camera_speed > 0.05){
              camera_speed -= 0.05;
            }     
         } else if (event.keyCode == 70){ // f button
            camera_speed += 0.05; 
         }
          else if(event.keyCode == 13 || event.keyCode == 8) {  //enter  or backspace
             if (event.keyCode == 13)
                 gear_id_change = 1;
             else 
                 gear_id_change = -1;
             
             gear_id += gear_id_change;
             
             if (gear_id < 0)
                 gear_id = 0;
             if (gear_id > 27)
                 gear_id = 27;

             console.log("Gear ID = ",gear_id);
             buffers = initBuffers(gl,programInfo,gear_id);
             enableAttributes(gl,buffers,programInfo)
         }

         drawScene(gl, programInfo, buffersCollection, angle_x, angle_y, t, darkness);
         return false;
      })


  // build the object(s) we'll be drawing, put the data in buffers
  var buffers1 = initBuffers(gl, programInfo, 10);
  var buffers2 = initBuffers(gl, programInfo, 0);
  var buffers3 = initBuffers(gl, programInfo, 16);
  var buffers4 = initBuffers(gl, programInfo, 6);
  var buffers5 = initBuffers(gl, programInfo, 20);
  var buffers6 = initBuffers(gl, programInfo, 10);

  buffersCollection = {};
  buffersCollection.gear1 = buffers1;
  buffersCollection.gear2 = buffers2;
  buffersCollection.gear3 = buffers3;
  buffersCollection.gear4 = buffers4;
  buffersCollection.gear5 = buffers5;
  buffersCollection.gear6 = buffers6;

  //enableAttributes(gl,buffers,programInfo)

  // Draw the scene
  // Animation
  self.animate = function () {
    angle_x++;
    darkness+=0.001*(camera_speed*10);
    t+= camera_speed;
    if (t > 150){
      t = 0;
      darkness = 0;
    } 
    drawScene(gl, programInfo, buffersCollection, angle_x, angle_y, t, darkness);
    requestAnimationFrame(self.animate);
  }

  animate();
}



//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple two-dimensional square.
//
function initBuffers(gl,programInfo,gear_id) {

  switch(gear_id) {



  case 0:
    gearData = alexGear(20,5);
    break;
    
  case 1:
    gearData = babcockGear(32, 6);
    break;

  case 2:
    gearData = brittanyGear(20,10);
    break;

  case 3:
    gearData = bschmitzGear(30, 30);
    break;

  case 4:
    gearData = dtranGear(20, 10);
    break; 

  case 5:
    gearData = flyGear(20, 5);
    break;

  case 6:
    gearData = FomichGear(20,16,0.2);
    break; 

  case 7:
    gearData = smithGear(40,10);
    break; 

  case 8:
    gearData = trentGear(100,7);
    break; 

  case 9:
    gearData = mchughGear(20,4);
    break; 

  case 10:
    gearData = phucphamGear(40,20);
    break; 

  case 11:
    gearData = dSaeleeGear(20,8);
    break; 

  case 12:
    gearData = shafferGear(20,10);
    break; 

  case 13:
    gearData = stocksettGear(20,4);
    break; 

  case 14:
    gearData = GaryGear(23, 7, 1, 0.05); 
    break; 

  case 15:
    gearData = gmontesGear(20, 7, 0.9, 0.4, 0.2, 1);
    break; 

  case 16:
    gearData = gordonGear(20, 7, 1, 0.2);
    break; 

  case 17:
    gearData = jHuntGear(36,3);
    break; 

  case 18:
    gearData = mnguyenGear(20, 20);          
    break; 

  case 19:
    gearData = sschulerGear(20,12);  
    break; 

  case 20:
    gearData = stran(20, 5, 0.15);
    break; 

  case 21:
    gearData = woulfgGear(25, 6);
    break; 

  case 22:
    gearData = creatediemVuGear(20,10);  
    break; 

  case 23:
    gearData = keroGear(20, 3); 
    break; 

  case 24:
    gearData = lairdGear(40, 2, .2);;
    break; 

  case 25:
    gearData = patrickMoyGear(40, 25); 
    break; 

  case 26:
    gearData = nheimb(100, 4, 2);
    break;     

  case 27:
    gearData = createGear();  // the starting gear for HW4
    break;

  }

  const vertices = gearData[0];
  const colors = gearData[1];
  const normals = gearData[2];

  // Create  buffers for the object's vertex positions
  const vertexBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // Now pass the list of vertices to the GPU to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.
  gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array(vertices),
                gl.STATIC_DRAW);


  // do likewise for colors
  const colorBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

  gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array(colors),
                gl.STATIC_DRAW);


const normalBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

  gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array(normals),
                gl.STATIC_DRAW);

  return {
    // each vertex in buffer has 3 floats
    num_vertices: vertices.length / 3,
    vertex: vertexBuffer,
    color: colorBuffer,
    normal: normalBuffer
  };

}



function enableAttributes(gl,buffers,programInfo) {

    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;

  // Tell WebGL how to pull vertex positions from the vertex
  // buffer. These positions will be fed into the shader program's
  // "a_vertex" attribute.

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertex);
    gl.vertexAttribPointer(
        programInfo.locations.a_vertex,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.locations.a_vertex);


    // likewise connect the colors buffer to the "a_color" attribute
    // in the shader program
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
        programInfo.locations.a_color,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.locations.a_color);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
    gl.vertexAttribPointer(
        programInfo.locations.a_normal,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.locations.a_normal);

}


//
// Draw the scene.
//
function drawScene(gl, programInfo, buffersCollection, angle_x, angle_y, t, darkness) {
  gl.clearColor(darkness, darkness, darkness, darkness);  // Clear to white, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


  //make transform to implement interactive rotation

  var matrix = new Learn_webgl_matrix();

  var rotate_x_matrix = matrix.create();
  var rotate_x_matrix_reverse = matrix.create();
  var rotate_y_matrix = matrix.create();
  
  var rotate_z_matrix = matrix.create();
  var lookat = matrix.create();
  var u_PVM_transform = matrix.create();
  var u_VM_transform = matrix.create();
  var scale = matrix.create();

  //var proj = matrix.createFrustum(-1, 1, -1, 1, 3, 7);
  var proj = matrix.createFrustum(-1, 1, -1, 1, 3, 20);

  /*
                          [5,5,7],
                          [3,6,3],
                          [0,4.5,-3],
                          [-3,3,-6]
  */
  var camera_location = [0,0,0];
  var control_points = [
                          [0,5,5],
                          [3,6,3],
                          [1,4,-3],
                          [-3,3,-5]
                       ];

  function weight (t){
      return [Math.pow(1-t, 3), 3*Math.pow(1-t, 2)*t, 3*(1-t)*Math.pow(t,2), Math.pow(t,3)]
  }
  
  var cp;
  weights = weight(t/100);
  for (cp = 0; cp < 4; cp++){
    camera_location[0] += weights[cp] * control_points[cp][0];
    camera_location[1] += weights[cp] * control_points[cp][1];
    camera_location[2] += weights[cp] * control_points[cp][2];
  }
  
          
  matrix.scale(scale,0.8,0.8,0.8);
  matrix.lookAt(lookat, 
               camera_location[0], camera_location[1], camera_location[2], 
                0,0,0, 
                0,1,0);
  
  //matrix.lookAt(lookat, 6,0,5, 0,0,0, 0,1,0);
  matrix.rotate(rotate_x_matrix, angle_x, 1, 0, 0);
  matrix.rotate(rotate_y_matrix, angle_y, 0, 1, 0);


 var p4 = new Learn_webgl_point4();
 var light_position =  p4.create(0,0,2,1);
                   
 var light_in_camera_space = p4.create(0,0,0,0);
 matrix.multiplyP4(light_in_camera_space,lookat,light_position);

 gl.uniform3f(programInfo.locations.u_Light_position, 
                                             light_in_camera_space[0],
                                             light_in_camera_space[1],
                                             light_in_camera_space[2]);

  gl.uniform3f(programInfo.locations.u_light_color, 1.0, 1.0, 1.0);
  gl.uniform1f(programInfo.locations.u_shininess, 10);
  gl.uniform3f(programInfo.locations.u_ambient_color, 0.2, 0.2, 0.2);

  //---------------------------Gear1----------------------------------
  var buffers1 = buffersCollection.gear1;
  
  enableAttributes(gl,buffers1,programInfo)
  
  var translate = matrix.create();
  matrix.translate(translate, 0,0,1);

   // Combine the two rotations into a single transformation
   matrix.multiplySeries(u_VM_transform, lookat,
    translate,rotate_x_matrix, rotate_y_matrix, scale);
  matrix.multiplySeries(u_PVM_transform, proj, u_VM_transform);

  // Set the shader program's uniform
  gl.uniformMatrix4fv(programInfo.locations.u_VM_transform, false, u_VM_transform);
  gl.uniformMatrix4fv(programInfo.locations.u_PVM_transform, false, u_PVM_transform);


  { // now tell the shader (GPU program) to draw some triangles
    const offset = 0;
    gl.drawArrays(gl.TRIANGLES, offset, buffers1.num_vertices);
  }

  //---------------------------Gear6----------------------------------
  var buffers6 = buffersCollection.gear6;
  
  enableAttributes(gl,buffers6,programInfo)
  
  var translate = matrix.create();
  matrix.translate(translate, -1.8,0,1);
  matrix.rotate(rotate_x_matrix_reverse, -angle_x, 1, 0, 0);
  
   // Combine the two rotations into a single transformation
   matrix.multiplySeries(u_VM_transform, lookat,
    translate,rotate_x_matrix_reverse, rotate_y_matrix, scale);
  matrix.multiplySeries(u_PVM_transform, proj, u_VM_transform);

  // Set the shader program's uniform
  gl.uniformMatrix4fv(programInfo.locations.u_VM_transform, false, u_VM_transform);
  gl.uniformMatrix4fv(programInfo.locations.u_PVM_transform, false, u_PVM_transform);


  { // now tell the shader (GPU program) to draw some triangles
    const offset = 0;
    gl.drawArrays(gl.TRIANGLES, offset, buffers6.num_vertices);
  }


 //---------------------------Gear2----------------------------------
 var buffers2 = buffersCollection.gear2;
  
  enableAttributes(gl,buffers2,programInfo)

  translate = matrix.create();
  
  matrix.rotate(rotate_x_matrix_reverse, -angle_x, 1, 0, 0);
  
  matrix.translate(translate,0,0,-0.7);
  

  // Combine the two rotations into a single transformation
  matrix.multiplySeries(u_VM_transform, lookat,
    translate,rotate_x_matrix_reverse, rotate_y_matrix, scale);
  matrix.multiplySeries(u_PVM_transform, proj, u_VM_transform);

  // Set the shader program's uniform
  gl.uniformMatrix4fv(programInfo.locations.u_VM_transform, false, u_VM_transform);
  gl.uniformMatrix4fv(programInfo.locations.u_PVM_transform, false, u_PVM_transform);

  { // now tell the shader (GPU program) to draw some triangles
    const offset = 0;
    gl.drawArrays(gl.TRIANGLES, offset, buffers2.num_vertices);
  }

  //---------------------------Gear3----------------------------------
 var buffers3 = buffersCollection.gear3;
  
 enableAttributes(gl,buffers3,programInfo)

 translate = matrix.create();
 //rotate_y_matrix = matrix.create();

 
 matrix.rotate(rotate_y_matrix, 180, 0, 1, 0);
 matrix.rotate(rotate_x_matrix, 0, 1, 0, 0);
 matrix.rotate(rotate_z_matrix, -angle_x, 0, 0, 1);

 matrix.translate(translate,0.75,0.05,-1.5);
 
 // Combine the two rotations into a single transformation
 matrix.multiplySeries(u_VM_transform, lookat,
   translate,rotate_x_matrix, rotate_y_matrix, rotate_z_matrix, scale);
 matrix.multiplySeries(u_PVM_transform, proj, u_VM_transform);

 // Set the shader program's uniform
 gl.uniformMatrix4fv(programInfo.locations.u_VM_transform, false, u_VM_transform);
 gl.uniformMatrix4fv(programInfo.locations.u_PVM_transform, false, u_PVM_transform);

 { // now tell the shader (GPU program) to draw some triangles
   const offset = 0;
   gl.drawArrays(gl.TRIANGLES, offset, buffers3.num_vertices);
 }

  //---------------------------Gear4----------------------------------
  var buffers4 = buffersCollection.gear4;
  
  enableAttributes(gl,buffers4,programInfo)
 
  translate = matrix.create();
  //rotate_y_matrix = matrix.create();
 
  
  matrix.rotate(rotate_y_matrix, 180, 0, 1, 0);
  matrix.rotate(rotate_x_matrix, 0, 1, 0, 0);
  matrix.rotate(rotate_z_matrix, angle_x, 0, 0, 1);
 
  matrix.translate(translate,2.2,0.7,-1.5);
  
  // Combine the two rotations into a single transformation
  matrix.multiplySeries(u_VM_transform, lookat,
    translate,rotate_x_matrix, rotate_y_matrix, rotate_z_matrix, scale);
  matrix.multiplySeries(u_PVM_transform, proj, u_VM_transform);
 
  // Set the shader program's uniform
  gl.uniformMatrix4fv(programInfo.locations.u_VM_transform, false, u_VM_transform);
  gl.uniformMatrix4fv(programInfo.locations.u_PVM_transform, false, u_PVM_transform);
 
  { // now tell the shader (GPU program) to draw some triangles
    const offset = 0;
    gl.drawArrays(gl.TRIANGLES, offset, buffers4.num_vertices);
  }

  //---------------------------Gear5----------------------------------
  var buffers5 = buffersCollection.gear5;
  
  enableAttributes(gl,buffers5,programInfo)
 
  translate = matrix.create();
  //rotate_y_matrix = matrix.create();
 
  
  matrix.rotate(rotate_y_matrix, 0, 0, 1, 0);
  matrix.rotate(rotate_x_matrix, 90, 1, 0, 0);
  matrix.rotate(rotate_z_matrix, -angle_x, 0, 0, 1);
 
  matrix.translate(translate,-0.9,-0.85,1);
  
  // Combine the two rotations into a single transformation
  matrix.multiplySeries(u_VM_transform, lookat,
    translate,rotate_x_matrix, rotate_y_matrix, rotate_z_matrix, scale);
  matrix.multiplySeries(u_PVM_transform, proj, u_VM_transform);
 
  // Set the shader program's uniform
  gl.uniformMatrix4fv(programInfo.locations.u_VM_transform, false, u_VM_transform);
  gl.uniformMatrix4fv(programInfo.locations.u_PVM_transform, false, u_PVM_transform);
 
  { // now tell the shader (GPU program) to draw some triangles
    const offset = 0;
    gl.drawArrays(gl.TRIANGLES, offset, buffers5.num_vertices);
  }

  
}

//
// Initialize a shader program, so WebGL knows how to draw our data
// BOILERPLATE CODE, COPY AND PASTE
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.  BOILERPLATE CODE, COPY AND PASTE
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object
  gl.shaderSource(shader, source);

  // Compile the shader program
  gl.compileShader(shader);

  // See if it compiled successfully
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}


