import { useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import cyborgWolfScene from "../assets/3d/cyborgwolf.glb";
import CanvasLoader from "./Loader";

const LEFT_FACING_ROTATION_Y = 3 + Math.PI;

const toonGradient = new THREE.DataTexture(
  new Uint8Array([
    22, 26, 36, 255,
    68, 96, 122, 255,
    157, 198, 216, 255,
    245, 232, 198, 255,
  ]),
  4,
  1,
  THREE.RGBAFormat
);
toonGradient.magFilter = THREE.NearestFilter;
toonGradient.minFilter = THREE.NearestFilter;
toonGradient.generateMipmaps = false;
toonGradient.needsUpdate = true;

const getToonColor = (material) => {
  const color = material?.color?.clone() ?? new THREE.Color("#6fb8d4");
  const hsl = {};
  color.getHSL(hsl);
  color.setHSL(
    hsl.h,
    hsl.s < 0.08 ? hsl.s : Math.min(1, hsl.s * 1.35 + 0.14),
    THREE.MathUtils.clamp(hsl.l * 0.68, 0.16, 0.54)
  );
  return color;
};

const createToonMaterial = (material) => {
  if (material?.userData?.toonAdjusted) return material;

  if (material?.map) {
    material.map.encoding = THREE.sRGBEncoding;
    material.map.needsUpdate = true;
  }

  const toonMaterial = new THREE.MeshToonMaterial({
    color: getToonColor(material),
    map: material?.map ?? null,
    alphaMap: material?.alphaMap ?? null,
    gradientMap: toonGradient,
    transparent: material?.transparent ?? false,
    opacity: material?.opacity ?? 1,
    side: material?.side ?? THREE.FrontSide,
    vertexColors: material?.vertexColors ?? false,
    flatShading: true,
  });

  toonMaterial.toneMapped = false;
  toonMaterial.userData.toonAdjusted = true;
  toonMaterial.needsUpdate = true;

  return toonMaterial;
};

const CyborgWolf = ({ rotationX, rotationY, scale, position }) => {
  const cyborgWolfRef = useRef();
  const { scene, animations } = useGLTF(cyborgWolfScene);
  const { actions } = useAnimations(animations, cyborgWolfRef);

  useEffect(() => {
    const action = actions["Animation"];
    if (!action) return;

    action.reset().fadeIn(0.3).play();

    return () => {
      action.fadeOut(0.3);
    };
  }, [actions]);

  useEffect(() => {
    scene.traverse((child) => {
      if (!child.isMesh || !child.material) return;

      child.castShadow = true;
      child.receiveShadow = true;

      if (Array.isArray(child.material)) {
        child.material = child.material.map(createToonMaterial);
      } else {
        child.material = createToonMaterial(child.material);
      }
    });
  }, [scene]);

  return (
    <mesh
      ref={cyborgWolfRef}
      position={position}
      scale={scale}
      rotation={[rotationX + 0.5, LEFT_FACING_ROTATION_Y + rotationY, 0]}
    >
      <primitive object={scene} />
    </mesh>
  );
};

const CyborgWolfCanvas = ({ scrollContainer }) => {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [scale, setScale] = useState([2, 2, 2]);
  const [position, setPosition] = useState([0.2, -1.2, 0]);

  useEffect(() => {
    const container = scrollContainer.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const rotationXValue = scrollTop * -0.0016;
      const rotationYValue = scrollTop * -0.003;
      setRotationX(rotationXValue);
      setRotationY(rotationYValue);
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScale([1, 1, 1]);
        setPosition([0.2, -0.4, 0]);
      } else if (window.innerWidth < 1024) {
        setScale([1.33, 1.33, 1.33]);
        setPosition([0.2, -0.6, 0]);
      } else if (window.innerWidth < 1280) {
        setScale([1.5, 1.5, 1.5]);
        setPosition([0.2, -0.7, 0]);
      } else if (window.innerWidth < 1536) {
        setScale([1.66, 1.66, 1.66]);
        setPosition([0.2, -1.1, 0]);
      } else {
        setScale([2, 2, 2]);
        setPosition([0.2, -1.2, 0]);
      }
    };

    handleResize();
    handleScroll();
    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollContainer]);

  return (
    <Canvas
      className={`w-full h-screen bg-transparent z-10`}
      camera={{ near: 0.1, far: 1000 }}
      flat
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.NoToneMapping;
        gl.outputEncoding = THREE.sRGBEncoding;
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <directionalLight position={[2, 3, 2]} intensity={1.15} />
        <ambientLight intensity={0.22} />
        <pointLight position={[10, 5, 10]} intensity={0.35} />
        <spotLight position={[0, 50, 10]} angle={0.18} penumbra={0.85} intensity={0.5} />
        <hemisphereLight skyColor="#5ad7ff" groundColor="#07111f" intensity={0.3} />

        <CyborgWolf rotationX={rotationX} rotationY={rotationY} scale={scale} position={position} />
      </Suspense>
    </Canvas>
  );
};

export default CyborgWolfCanvas;
