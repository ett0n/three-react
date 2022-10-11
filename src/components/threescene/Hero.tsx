import { useGLTF } from "@react-three/drei";
import axios from "axios";
import { useEffect, useMemo, useState, Suspense, AnchorHTMLAttributes } from "react";
import type { Anchors } from "../../types/Anchors";
import type { Accessories, Character, AccessoriesStr } from "../../types/Character";

export const Hero = () => {
  //defining
  const anc: Anchors = {
    hats: [0, 3.43, -0.03],
    heads: [0, 3.1, -0.54],
    costumes: [0, 0.6, 0],
    hand_l: [-1.2, 2, 0],
    foot_l: [-0.34, 0.3, -0.02],
    foot_r: [0.34, 0.3, -0.02],
  };

  //defining character GLB
  const character = useGLTF("/assets/character/character.glb");

  //state managing active accessories
  const [getAccessories, setAccessories] = useState<AccessoriesStr>({
    hat: "/assets/accessories/hats/sphere-1/sphere-1.glb",
    head: "/assets/accessories/heads/glasses-1/glasses-1.glb",
    body: "/assets/accessories/costumes/rectangle-1/rectangle-1.glb",
    hand_l: "/assets/accessories/hands/hammer-1/hammer-1.glb",
    hand_r: "/assets/accessories/hands/hammer-1/hammer-1.glb",
    feet: "/assets/accessories/feet/sneakers-1/sneakers-1.glb",
  });

  //component using gltf source from state
  function Accessory({ src, clone }: { src: string | null; clone?: boolean }) {
    if (src === null) return <div></div>;
    const gltf = useGLTF(src, true);
    if (clone) {
      return (
        <Suspense fallback={null}>
          <primitive object={gltf.scene.clone()} />
        </Suspense>
      );
    } else {
      return (
        <Suspense fallback={null}>
          <primitive object={gltf.scene} />
        </Suspense>
      );
    }
  }
  //pushing every chracter from API result in an array[] of Characters
  let characters: Character[] = [];

  // CALL API
  async function fetchCharacterApi(idUser: number) {
    await axios
      .get(`http://xrlab.cepegra.be:1337/api/appusers/${idUser}?populate[characters][populate][accessories][populate]=*`)
      //if API down
      .catch((error: string) => {
        console.log("apidown or wrong id", error);
      })
      .then((response: any) => {
        console.log("jecalllapi");
        let characterResponse = response.data.data.attributes.characters.data;
        characterResponse.forEach((element: Character) => {
          characters.push(element);
        });
        let charNumber = 0;
        //character[x].accessory_name
        let accessories = {
          hatN: characters[charNumber].attributes.accessories.hat.name,
          headN: characters[charNumber].attributes.accessories.head.name,
          bodyN: characters[charNumber].attributes.accessories.body.name,
          hand_lN: characters[charNumber].attributes.accessories.hand_l.name,
          hand_rN: characters[charNumber].attributes.accessories.hand_r.name,
          feet: characters[charNumber].attributes.accessories.feet.name,
        };
        console.log(accessories);
        //refreshing accessory state with API accessories
        setAccessories({
          hat: accessories.hatN !== null ? `/assets/accessories/hats/${accessories.hatN}/${accessories.hatN}.glb` : null,
          head: accessories.headN !== null ? `/assets/accessories/heads/${accessories.headN}/${accessories.headN}.glb` : null,
          body: accessories.bodyN !== null ? `/assets/accessories/costumes/${accessories.bodyN}/${accessories.bodyN}.glb` : null,
          hand_l: accessories.hand_lN !== null ? `/assets/accessories/hands/${accessories.hand_lN}/${accessories.hand_lN}.glb` : null,
          hand_r: accessories.hand_rN !== null ? `/assets/accessories/hands/${accessories.hand_rN}/${accessories.hand_rN}.glb` : null,
          feet: accessories.feet !== null ? `/assets/accessories/feet/${accessories.feet}/${accessories.feet}.glb` : null,
        });
      });
  }
  useEffect(() => {
    fetchCharacterApi(1);
  }, []);

  useEffect(() => {
    console.log("prout");
  }, [getAccessories]);

  const sX = 0.3;

  return (
    <>
      <primitive object={character.scene}>
        <mesh position={anc.hats} scale={1}>
          <Accessory src={getAccessories.hat} />
        </mesh>
        <mesh position={anc.heads} scale={0.1}>
          <Accessory src={getAccessories.head} />
        </mesh>
        <mesh position={anc.costumes} scale={0.4}>
          <Accessory src={getAccessories.body} />
        </mesh>
        <mesh position={anc.hand_l} scale={0.001} rotation={[2, 0, 0]}>
          <Accessory src={getAccessories.hand_l} />
        </mesh>
        <mesh position={anc.hand_r} scale={0.001} rotation={[2, 0, 0]}>
          <Accessory src={getAccessories.hand_r} clone={true} />
        </mesh>
        <mesh position={anc.foot_l} scale={[sX, sX, sX]} rotation={[0, 0, 0]}>
          <Accessory src={getAccessories.feet} />
        </mesh>
        <mesh position={anc.foot_r} scale={[-sX, sX, sX]} rotation={[0, 0, 0]}>
          <Accessory src={getAccessories.feet} clone={true} />
        </mesh>
      </primitive>
    </>
  );
};
