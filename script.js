// Menú responsive
const menuButton = document.querySelector('.icono-menu');
const menu = document.querySelector('.menu');

menuButton.addEventListener('click', () => {
    menu.classList.toggle('active'); // Mostrar/ocultar el menú
});

// Crear la escena
const scene = new THREE.Scene();

// Crear la cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 10); // Ajustar la posición de la cámara: (X, Y, Z)
camera.lookAt(0, 0, 0);

// Configurar el renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0); // Fondo transparente
document.querySelector('.imagen-3d').appendChild(renderer.domElement);

// Agregar luces
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Luz ambiental
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(12, 12, 12); // Ubicar la luz
scene.add(pointLight);

// Cargar el modelo GLB
let model; // Modelo cargado
const loader = new THREE.GLTFLoader();
loader.load(
  'Personaje2.glb', // Ruta del archivo GLB
  (gltf) => {
    model = gltf.scene;
    model.scale.set(5, 5, 5); // Escalar el modelo
    model.position.set(0, -5, 2); // Posicionar el modelo
    scene.add(model);
  },
  undefined,
  (error) => {
    console.error('Error al cargar el modelo:', error); // Manejo de errores
  }
);

// Controles de rotación automática (sin interacción del mouse)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.autoRotate = true; // Activar rotación automática
controls.autoRotateSpeed = 1.5; // Velocidad de rotación
controls.enableZoom = false; // Desactivar zoom
controls.enableRotate = true; // Permitir rotación manual
controls.enablePan = false; // Desactivar arrastre

// Ajustar tamaño al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animar la escena
function animate() {
  requestAnimationFrame(animate);
  if (model) model.rotation.y += 0.01; // Rotación continua
  controls.update(); // Actualizar controles
  renderer.render(scene, camera); // Renderizar la escena
}
animate();
