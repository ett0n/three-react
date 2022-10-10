declare global {
  namespace JSX {
    //define aframeElement as an extended react HTMLElement
    interface aframeElement extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
      //toute propriété de l'objet aframeElement qui est une string (attribut) peut exister et obtenir un type "unknown"
      [x: string]: unknown;
    }
    interface IntrinsicElements {
      animation: aframeElement;
      "a-asset-item": aframeElement;
      "a-assets": aframeElement;
      "a-box": aframeElement;
      "a-camera": aframeElement;
      "a-circle": aframeElement;
      "a-cone": aframeElement;
      "a-cursor": aframeElement;
      "a-curvedimage": aframeElement;
      "a-cylinder": aframeElement;
      "a-dodecahedron": aframeElement;
      "a-entity": aframeElement;
      "a-gltf-model": aframeElement;
      "a-icosahedron": aframeElement;
      "a-image": aframeElement;
      "a-light": aframeElement;
      "a-link": aframeElement;
      "a-obj-model": aframeElement;
      "a-octahedron": aframeElement;
      "a-plane": aframeElement;
      "a-ring": aframeElement;
      "a-scene": aframeElement;
      "a-sky": aframeElement;
      "a-sound": aframeElement;
      "a-sphere": aframeElement;
      "a-tetrahedron": aframeElement;
      "a-text": aframeElement;
      "a-torus": aframeElement;
      "a-torus-knot": aframeElement;
      "a-triangle": aframeElement;
      "a-video": aframeElement;
      "a-videosphere": aframeElement;
    }
  }
}

export {};
