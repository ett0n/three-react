import { useGLTF } from "@react-three/drei";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import type { Ancrages } from "../../types/Ancrages";
import type { Accessories, Character } from "../../types/Character";

export const Hero = () => {
  const [getAccessories, setAccessories] = useState({
    hat: useGLTF("/assets/accessories/hats/sphere-1/sphere-1.glb"),
    head: useGLTF("/assets/accessories/heads/glasses-1/glasses-1.glb"),
    body: useGLTF("/assets/accessories/costumes/rectangle-1/rectangle-1.glb"),
    hand_l: useGLTF("/assets/accessories/hands/hammer-1/hammer-1.glb"),
    feet: useGLTF("/assets/accessories/feet/sneakers-1/sneakers-1.glb"),
  });

  const [getLeNom, setLeNom] = useState("sphere");

  const [leTest, setLeTest] = useState<{ test: boolean; test2: boolean }>({ test: true, test2: false });

  // CALL API
  let characters: Character[] = [];
  async function fetchCharacterApi(idUser: number) {
    await axios
      .get(`http://xrlab.cepegra.be:1337/api/appusers/${idUser}?populate[characters][populate][accessories][populate]=*`)
      .catch((error: string) => {
        console.log("apidown or wrong id", error);
      })
      .then((response: any) => {
        let characterResponse = response.data.data.attributes.characters.data;
        characterResponse.forEach((element: Character) => {
          characters.push(element);
        });
        console.log(characters[0].attributes.accessories);

        let charNumber = 0;

        let accessoires = {
          hatN: characters[charNumber].attributes.accessories.hat.name,
          headN: characters[charNumber].attributes.accessories.head.name,
          bodyN: characters[charNumber].attributes.accessories.body.name,
          hand_lN: characters[charNumber].attributes.accessories.hand_l.name,
          hand_rN: characters[charNumber].attributes.accessories.hand_r.name,
          feet: characters[charNumber].attributes.accessories.feet.name,
        };
        console.log(accessoires);

        setLeTest({ test: false, test2: true });
        setLeNom("cube");
      });
  }

  console.log(leTest.test, leTest.test2);
  console.log(getAccessories);
  console.log(getLeNom);

  useEffect(() => {
    console.log("g bien vu que ca a changé");
  }, [getLeNom]);

  useEffect(() => {
    fetchCharacterApi(1);
  }, []);

  // Set accessories fetched from API

  const anc: Ancrages = {
    hats: [0, 3.43, -0.03],
    heads: [0, 3.1, -0.54],
    costumes: [0, 0.6, 0],
    hand_l: [-1.2, 2, 0],
    foot_l: [-0.34, 0.3, -0.02],
    foot_r: [0.34, 0.3, -0.02],
  };

  const sX = 0.3;

  const character = useGLTF("/assets/character/character.glb");
  //character.materials["Material.001"].color = { r: 3, g: 0, b: 0, isColor: false };

  character.materials.Material.color = { r: 1, g: 0, b: 0, isColor: false };
  return (
    <>
      {/* je comprend plus rien */}
      <primitive object={character.scene}>
        <mesh position={anc.hats} scale={1}>
          <primitive object={getAccessories.hat.scene}></primitive>
        </mesh>
        <mesh position={anc.heads} scale={17.5}>
          <primitive object={getAccessories.head.scene}></primitive>
        </mesh>
        <mesh position={anc.costumes} scale={0.4}>
          <primitive object={getAccessories.body.scene}></primitive>
        </mesh>
        <mesh position={anc.hand_l} scale={0.001} rotation={[2, 0, 0]}>
          <primitive object={getAccessories.hand_l.scene}></primitive>
        </mesh>
        <mesh position={anc.foot_l} scale={[sX, sX, sX]} rotation={[0, 0, 0]}>
          <primitive object={getAccessories.feet.scene}></primitive>
        </mesh>
        <mesh position={anc.foot_r} scale={[-sX, sX, sX]} rotation={[0, 0, 0]}>
          <primitive object={getAccessories.feet.scene.clone()}></primitive>
        </mesh>
      </primitive>
    </>
  );
};
