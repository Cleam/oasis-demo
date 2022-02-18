import { resolve } from 'path';

const wrapperEnv = (envConf: Recordable): ImportMetaEnv => {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    if (realName === 'true') {
      realName = true;
    } else if (realName === 'false') {
      realName = false;
    }

    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }
    if (envName === 'VITE_PROXY' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = '';
      }
    }

    ret[envName] = realName;
    if (typeof realName === 'string') {
      process.env[envName] = realName;
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return ret;
};

//NOSONAR const loadEnv = (): ViteEnv => {
//   return import.meta.env;
// };

const pathResolve = (dir: string) => {
  return resolve(process.cwd(), '.', dir);
};

export { wrapperEnv, pathResolve };
