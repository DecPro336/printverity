/* 3D view of the STEP body (three.js): faces coloured by their status against the drawing, orbit / zoom, auto-framed. */
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { Mesh } from "../types";

export const STATUS_COLORS: Record<string, string> = { match: "#6b7f99", conflict: "#c8321e", info: "#d99a2b", neutral: "#c9d2dc" };

/** True when this browser can create a WebGL context (some VMs and software-GL desktops cannot). */
export function webglAvailable(): boolean {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { return false; }
}

export function ModelViewer({ mesh, onFail }: { mesh: Mesh; onFail?: (reason: string) => void }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = host.current; if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      if (!webglAvailable()) throw new Error("WebGL is not available in this browser");
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }); renderer.setClearColor(0x000000, 0);   // transparent: the themed .viewer3d background shows through
    } catch (e) { onFail?.((e as Error).message); return; }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, el.clientWidth / el.clientHeight, 0.1, 100000);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio)); renderer.setSize(el.clientWidth, el.clientHeight); el.appendChild(renderer.domElement);
    renderer.domElement.addEventListener("webglcontextlost", ev => { ev.preventDefault(); onFail?.("WebGL context lost"); });
    // geometry: one buffer, per-vertex colour from the owning face's status
    const pos: number[] = []; const col: number[] = []; const tmp = new THREE.Color();
    for (const f of mesh.faces) {
      tmp.set(STATUS_COLORS[f.status] || STATUS_COLORS.neutral);
      for (const [a, b, c] of f.tris) for (const i of [a, b, c]) { const v = mesh.vertices[i]; pos.push(v[0], v[1], v[2]); col.push(tmp.r, tmp.g, tmp.b); }
    }
    const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3)); geo.computeVertexNormals();
    const body = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, metalness: 0.1, roughness: 0.75, flatShading: true }));
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 25), new THREE.LineBasicMaterial({ color: "#1b2430", transparent: true, opacity: 0.55 }));
    scene.add(body); scene.add(edges);
    scene.add(new THREE.HemisphereLight("#ffffff", "#8090a0", 1.1)); const key = new THREE.DirectionalLight("#ffffff", 1.4); key.position.set(1, 2, 3); scene.add(key);
    // frame the bounding box from an isometric-ish direction
    const [mn, mx] = mesh.bbox; const center = new THREE.Vector3((mn[0] + mx[0]) / 2, (mn[1] + mx[1]) / 2, (mn[2] + mx[2]) / 2);
    const radius = Math.max(0.5, 0.5 * Math.hypot(mx[0] - mn[0], mx[1] - mn[1], mx[2] - mn[2]));   // bounding sphere
    const dist = radius / Math.sin(THREE.MathUtils.degToRad(camera.fov / 2)) * 1.05 / Math.min(1, camera.aspect);
    camera.up.set(0, 0, 1); camera.position.copy(center).add(new THREE.Vector3(-1.1, -1.4, 1.0).normalize().multiplyScalar(dist)); camera.lookAt(center);
    const controls = new OrbitControls(camera, renderer.domElement); controls.target.copy(center); controls.enableDamping = true; controls.update();
    let raf = 0; const loop = () => { controls.update(); renderer.render(scene, camera); raf = requestAnimationFrame(loop); }; loop();
    const onResize = () => { camera.aspect = el.clientWidth / el.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(el.clientWidth, el.clientHeight); }; window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); controls.dispose(); renderer.dispose(); geo.dispose(); if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement); };
  }, [mesh, onFail]);
  return <div className="viewer3d" ref={host} />;
}
