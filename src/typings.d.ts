declare module '*.json' {
    const value: any;
    export default value;
  }
  
  declare namespace NodeModule {
    // eslint-disable-next-line no-var
    var id: string;
  }
  
  declare const require: NodeRequire;
  
  interface NodeRequire {
    context(
      directory: string,
      useSubdirectories?: boolean,
      regExp?: RegExp
    ): {
      (key: string): any;
      keys(): string[];
    };
  }
  
  declare const __webpack_public_path__: string;
  