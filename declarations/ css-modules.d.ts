declare module '*.css' {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
} 

declare namespace JSX {
    interface IntrinsicElements {
      foo: { requiredProp: string; optionalProp?: number };
    }
  }