/**
 * entry.js
 * 
 * This is the first file loaded. It sets up the Renderer, 
 * Scene and Camera. It also starts the render loop and 
 * handles window resizes.
 * 
 */

import { WebGLRenderer, PerspectiveCamera, Scene, Vector3, BoxGeometry, Mesh, MeshBasicMaterial, MeshLambertMaterial } from 'three';
import SeedScene from './objects/Scene.js';

const scene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({antialias: true});
const seedScene = new SeedScene();

// Make the cube, and add it to the scene
var geometry = new BoxGeometry();
var material = new MeshLambertMaterial( { color: 0xff0000 } );
var cube = new Mesh( geometry, material );
scene.add( cube );


// scene
// scene.add(seedScene);

// camera
camera.position.set(6,3,-10);
camera.lookAt(new Vector3(0,0,0));

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x7ec0ee, 1);

// render loop
const onAnimationFrameHandler = (timeStamp) => {
  renderer.render(scene, camera);
  seedScene.update && seedScene.update(timeStamp);
  window.requestAnimationFrame(onAnimationFrameHandler);

  // add code to manipulate assets
  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;


}
window.requestAnimationFrame(onAnimationFrameHandler);


// resize
const windowResizeHanlder = () => { 
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHanlder();
window.addEventListener('resize', windowResizeHanlder);

// dom
document.body.style.margin = 0;
document.body.appendChild( renderer.domElement );

