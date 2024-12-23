import { useEffect } from "react";
import {
  Scene,
  WebGLRenderer,
  //hay distintas tipos de camara pero el que vamos a usar es PerspectiveCamera
  PerspectiveCamera,
  Mesh,
  MeshBasicMaterial,
  BoxGeometry,
  //para el skyBox
  SphereGeometry,
  TextureLoader,
  BackSide,
  MeshPhongMaterial,
  //para crear las luces
  DirectionalLight,
  HemisphereLight,
  AmbientLight,
} from "three";
//para construir en three soolo necesitamos 3 cosas una escena una camara y un render
export default function Page() {
  useEffect(() => {
    const scene = new Scene();
    const renderer = new WebGLRenderer({
      //el antialias suavisa la imagen
      antialias: true,
      canvas: document.getElementById("bg"),
    });

    const camara = new PerspectiveCamera(
      50,
      //el ancho de pantalla seria window.innerWidth
      window.innerWidth / window.innerHeight,
      // desde que tan cerca se vea la camara
      0.1,
      //desde que tan lejos se vea la camara
      1000
    );
    //mover camara
    camara.position.z = 6;

    //crear el cubo
    const geometria = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0xff5733 });
    const cubo = new Mesh(geometria, material);
    console.log(0xfffffff);
    scene.add(cubo);

    //crear skybox
    //los atribuos son : tamaño de la esfera, numero de segmento, tamaño del segmento
    const skygeometry = new SphereGeometry(360, 25, 25);
    const loader = new TextureLoader();
    const textura = loader.load("/custom-sky.png");
    const material2 = new MeshPhongMaterial({
      map: textura,
    });
    const skyBox = new Mesh(skygeometry, material2);
    scene.add(skyBox);
    //el codigo de abajo es para que se vea tambien del lado reverso de la imagen sky
    skyBox.material.side = BackSide;

    //crear la iluminacion
    scene.add(new AmbientLight(0xffffff, 0.9));
    scene.add(new HemisphereLight(0xffffff, 0.9));

    renderer.setSize(window.innerWidth, window.innerHeight);

    // esta funcion es para animar el objeto
    function animate() {
      cubo.rotation.x += 0.002;
      cubo.rotation.y += 0.002;
      renderer.render(scene, camara);
      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  return <canvas id="bg" />;
}
