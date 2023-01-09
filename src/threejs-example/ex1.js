/* eslint-disable no-undef */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0xdddddd });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//create a blue LineBasicMaterial
const material2 = new THREE.LineBasicMaterial({ color: 0x0000ff });
const points = [];
points.push(new THREE.Vector3(-5, 0, 0));
points.push(new THREE.Vector3(0, 5, 0));
points.push(new THREE.Vector3(5, 0, 0));

const geometry2 = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geometry2, material2);
scene.add(line);

camera.position.z = 10;

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
