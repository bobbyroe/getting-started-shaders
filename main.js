import * as THREE from "three";
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(0, 1, 1, 0, 0.1, 1000);
camera.position.set(0, 0, 1);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

async function main() {
  const vsh = await fetch('./vert.glsl');
  const fsh = await fetch('./frag.glsl');

  const uniforms = {
    time: { value: 0.0 },
    resolution: { value: new THREE.Vector2( w, h )},
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: await vsh.text(),
    fragmentShader: await fsh.text()
  });

  const geometry = new THREE.PlaneGeometry(1, 1);

  const plane = new THREE.Mesh(geometry, material);
  plane.position.set(0.5, 0.5, 0);
  scene.add(plane);
  
  function animate(t) {
    t *= 0.001;
    requestAnimationFrame(animate);
    uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height);
    uniforms.time.value = t;
    renderer.render(scene, camera);
  }
  animate();
}

main();

function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);