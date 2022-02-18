// import Sentry, { setupSentry } from './utils/sentry';
// import { detectWebGLContext } from '/@/utils';
// import Oasis from '/@/oasis/index';

// try {
//   setupSentry();
// } catch (e) {
//   console.error('sentry setup error', e);
// }

// const isSupportWebGL = detectWebGLContext();
// if (isSupportWebGL) {
//   new Oasis().init();
// } else {
//   // throw new Error('浏览器不支持webgl');
//   Sentry.captureException(new Error('浏览器不支持webgl'));
// }

import '/@/styles/index.scss';
import { init } from '/@/oasis/_index';
init();
