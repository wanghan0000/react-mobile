declare module '*.json' {
    const value: any;
    export default value;
  }
  
  declare module NodeModule {
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
  