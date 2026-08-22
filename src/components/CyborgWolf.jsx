import { useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import cyborgWolfScene from "../assets/3d/cyborgwolf.glb";
import CanvasLoader from "./Loader";

const LEFT_FACING_ROTATION_Y = 3 + Math.PI;

const toonGradient = new THREE.DataTexture(
  new Uint8Array([
    16, 18, 36, 255,
    58, 72, 144, 255,
    146, 178, 238, 255,
    236, 246, 255, 255,
  ]),
  4,
  1,
  THREE.RGBAFormat
);
toonGradient.magFilter = THREE.NearestFilter;
toonGradient.minFilter = THREE.NearestFilter;
toonGradient.generateMipmaps = false;
toonGradient.needsUpdate = true;

const nightTint = new THREE.Color("#7569dc");

const getToonColor = (material) => {
  const color = material?.color?.clone() ?? new THREE.Color("#6fb8d4");
  color.lerp(nightTint, 0.13);

  const hsl = {};
  color.getHSL(hsl);
  color.setHSL(
    hsl.h,
    hsl.s < 0.08 ? hsl.s : THREE.MathUtils.clamp(hsl.s * 1.04 + 0.03, 0.16, 0.82),
    THREE.MathUtils.clamp(hsl.l * 0.9, 0.22, 0.64)
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

const getRendererConfig = () => {
  if (typeof window === "undefined") {
    return { antialias: true, dpr: [1, 1.5], isMobile: false };
  }

  const width = window.innerWidth;
  const isMobile = width < 768;
  const maxDpr = isMobile ? 0.82 : width < 1280 ? 1.35 : 1.65;
  const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

  return {
    antialias: !isMobile,
    dpr: isMobile ? dpr : [1, dpr],
    isMobile,
  };
};

const getModelLayout = () => {
  if (typeof window === "undefined") {
    return {
      scale: [2, 2, 2],
      position: [0.2, -2.15, 0],
    };
  }

  if (window.innerWidth < 768) {
    return {
      scale: [1, 1, 1],
      position: [0.2, -0.85, 0],
    };
  }

  if (window.innerWidth < 1024) {
    return {
      scale: [1.33, 1.33, 1.33],
      position: [0.2, -1.15, 0],
    };
  }

  if (window.innerWidth < 1280) {
    return {
      scale: [1.5, 1.5, 1.5],
      position: [0.2, -1.45, 0],
    };
  }

  if (window.innerWidth < 1536) {
    return {
      scale: [1.66, 1.66, 1.66],
      position: [0.2, -1.95, 0],
    };
  }

  return {
    scale: [2, 2, 2],
    position: [0.2, -2.15, 0],
  };
};

const CyborgWolf = ({ rotationRef, scale, position, isMobile }) => {
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
      child.frustumCulled = true;

      if (Array.isArray(child.material)) {
        child.material = child.material.map(createToonMaterial);
      } else {
        child.material = createToonMaterial(child.material);
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (!cyborgWolfRef.current) return;

    const targetRotationX = (rotationRef.current?.x ?? 0) + 0.5;
    const targetRotationY = LEFT_FACING_ROTATION_Y + (rotationRef.current?.y ?? 0);
    const damping = Math.min(1, delta * (isMobile ? 18 : 8));

    cyborgWolfRef.current.rotation.x = THREE.MathUtils.lerp(
      cyborgWolfRef.current.rotation.x,
      targetRotationX,
      damping
    );
    cyborgWolfRef.current.rotation.y = THREE.MathUtils.lerp(
      cyborgWolfRef.current.rotation.y,
      targetRotationY,
      damping
    );
  });

  return (
    <group
      ref={cyborgWolfRef}
      position={position}
      scale={scale}
      rotation={[0.5, LEFT_FACING_ROTATION_Y, 0]}
    >
      <primitive object={scene} />
    </group>
  );
};

const CyborgWolfCanvas = ({ scrollContainer }) => {
  const rotationRef = useRef({ x: 0, y: 0 });
  const [modelLayout, setModelLayout] = useState(getModelLayout);
  const [rendererConfig, setRendererConfig] = useState(getRendererConfig);

  useEffect(() => {
    const container = scrollContainer.current;
    if (!container) return;

    const updateRotation = () => {
      const scrollTop = container.scrollTop;

      rotationRef.current.x = scrollTop * -0.0016;
      rotationRef.current.y = scrollTop * -0.003;
    };

    const handleScroll = () => {
      updateRotation();
    };

    const handleResize = () => {
      setModelLayout(getModelLayout());
      setRendererConfig(getRendererConfig());
    };

    handleResize();
    updateRotation();
    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollContainer]);

  return (
    <Canvas
      className="cyborgwolf-canvas w-full h-screen bg-transparent z-10"
      camera={{ near: 0.1, far: 1000 }}
      dpr={rendererConfig.dpr}
      flat
      gl={{
        antialias: rendererConfig.antialias,
        alpha: true,
        depth: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
        stencil: false,
      }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.NoToneMapping;
        gl.outputEncoding = THREE.sRGBEncoding;
        gl.setClearAlpha(0);
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <directionalLight
          color="#f4fbff"
          position={[-2, 5, 4]}
          intensity={rendererConfig.isMobile ? 1.38 : 1.5}
        />
        <ambientLight color="#352f74" intensity={rendererConfig.isMobile ? 0.62 : 0.54} />
        {!rendererConfig.isMobile && (
          <>
            <pointLight color="#aeb7ff" position={[1.2, 2.5, 5]} intensity={0.38} />
            <spotLight color="#f7e8ff" position={[0, 12, 5]} angle={0.34} penumbra={0.68} intensity={0.76} />
          </>
        )}
        <hemisphereLight
          skyColor="#e0ebff"
          groundColor="#16082e"
          intensity={rendererConfig.isMobile ? 0.5 : 0.62}
        />

        <CyborgWolf
          rotationRef={rotationRef}
          scale={modelLayout.scale}
          position={modelLayout.position}
          isMobile={rendererConfig.isMobile}
        />
      </Suspense>
    </Canvas>
  );
};

useGLTF.preload(cyborgWolfScene);

export default CyborgWolfCanvas;
