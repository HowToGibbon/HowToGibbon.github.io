import './style.css'

import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(100);
camera.position.setX(-3);

renderer.render(scene, camera);

// Background

const spaceTexture = new THREE.TextureLoader().load('background.jpg');
scene.background = spaceTexture;

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 14, 60);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347, wireframe: true});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Moon

const moonTexture = new THREE.TextureLoader().load('footballfield.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
);

scene.add(moon);
 
// Capsule

const capsule = new THREE.Mesh( 
  new THREE.CylinderGeometry( 10, 10, 200, 17 ),
  new THREE.MeshBasicMaterial( {color: 0x0076ff, transparent: true, opacity: 0.2} )
);

scene.add( capsule );

const saber = new THREE.Mesh( 
  new THREE.CylinderGeometry( 5, 5, 200, 25 ),
  new THREE.MeshBasicMaterial( {color: 0x007acc, transparent: true, opacity: 0.6} )
);

scene.add( saber );

// Positioning

torus.rotation.x += 0.9;
torus.rotation.y += 0.6;
torus.rotation.z += 0.2;

moon.position.z = 70;
moon.position.setX(-20);

capsule.position.z = 100;
capsule.position.setX(20);
saber.position.z = 110;
saber.position.setX(15);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.y += 0.005;

  camera.position.z = t * -0.05;
 // camera.position.x = t * 0.00000005;
  //camera.rotation.y = t * 0.0000005;
}

document.body.onscroll = moveCamera;
window.addEventListener('resize', onWindowResize);
moveCamera();

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.0009;
  torus.rotation.y += 0.0006;
  torus.rotation.z += 0.0002;

  moon.rotation.y += 0.002;

  capsule.rotation.y += 0.9;
  saber.rotation.y += 0.9;

  renderer.render(scene, camera);
}

function onWindowResize() {

  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize( width, height );

}

animate();