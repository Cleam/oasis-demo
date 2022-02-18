// import { defineComponent } from 'vue';
import type { ComponentPublicInstance, FunctionalComponent } from 'vue';

declare global {
  // type Component<T = any> =
  //   | ReturnType<typeof defineComponent>
  //   | (() => Promise<typeof import('*.vue')>)
  //   | (() => Promise<T>);

  type Nullable<T> = T | null;
  type Recordable<T = any> = Record<string, T>;
  interface ImportMetaEnv {
    VITE_TITLE: string;
    VITE_PORT: number;
    VITE_PROXY: [string, string][];
    VITE_APP_ENV: string;
    VITE_DROP_CONSOLE: boolean;
    VITE_BUILD_DIR: string;
    VITE_APP_BASE_API: string;
    VITE_APP_BASE_API_PATH: string;
  }

  interface Window {
    viewDidAppear: (...args: any[]) => void;
    viewDidDisAppear: (...args: any[]) => void;
  }
}

declare module 'vue' {
  export type JSXComponent<Props = any> =
    | { new (): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>;
}
