// types/r3f.d.ts
import '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      primitive: any;
      ambientLight: any;
      pointLight: any;
      color: any;
    }
  }
}
export {};
