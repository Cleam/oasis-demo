/* eslint-disable @typescript-eslint/ban-ts-comment */

/**
 * @title GLTF Basic
 * @category Basic
 */
import { OrbitControl } from '@oasis-engine/controls';
import { Camera, Engine, GLTFResource, WebCanvas, WebGLEngine, WebGLRenderer } from 'oasis-engine';

export async function init() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const webCanvas = new WebCanvas(canvas);
  const webGLRenderer = new WebGLRenderer({
    alpha: true,
  });
  const engine = new Engine(webCanvas, webGLRenderer) as WebGLEngine;
  console.log('1 canvas.width :>> ', canvas.width);
  console.log('1 canvas.height :>> ', canvas.height);
  engine.canvas.resizeByClientSize();
  console.log('-- engine.canvas.resizeByClientSize() --');
  console.log('2 canvas.width :>> ', canvas.width);
  console.log('2 canvas.height :>> ', canvas.height);
  console.log('engine._renderContext :>> ', engine._renderContext);

  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity();

  // 透明背景
  // scene.background.solidColor.setValue(1, 1, 1, 0);

  const cameraEntity = rootEntity.createChild('camera');
  cameraEntity.addComponent(Camera);
  cameraEntity.transform.setPosition(5, 5, 5);
  cameraEntity.addComponent(OrbitControl);

  scene.ambientLight.diffuseSolidColor.setValue(1, 1, 1, 1);

  const gltf = await engine.resourceManager.load<GLTFResource>('/src/assets/model/duck.gltf');
  console.log('gltf :>> ', gltf);
  rootEntity.addChild(gltf.defaultSceneRoot);

  engine.run();
}
