import { useEffect } from "react";
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Mesh,
  MeshBasicMaterial,
  BoxGeometry,
} from "three";
export default function Page() {
  useEffect(() => {
    const scene = new Scene();
    const renderer = new WebGLRenderer({
      antialias: true,
      canvas: document.getElementById("bg"),
    });
    const camara = new PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    //mover camara
    camara.position.z = 6;
    //crear el cubo
    const geometria = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0xffffff });
    const cubo = new Mesh(geometria, material);

    console.log(0xfffffff);
    scene.add(cubo);
    renderer.setSize(window.innerWidth, window.innerHeight);

    function animate() {
      cubo.rotation.x += 0.001;
      cubo.rotation.y += 0.001;
      renderer.render(scene, camara);
      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  return <canvas id="bg" />;
}
