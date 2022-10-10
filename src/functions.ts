import axios from "axios";
import type { Character, CharacterAttr, Accessories, Accessory } from "./types/Character";
import type { User, UserAttr } from "./types/Appusers";

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
        console.log(element);
        characters.push(element);
      });
      console.log(characters[0].attributes.accessories.background.name);
    });
}

const laFunction = async () => {
  const AppUSer = await axios.get("http://xrlab.cepegra.be:1337/api/appusers?populate=*");
  console.log(AppUSer.data.data);

  const nosUsers: User[] = AppUSer.data.data.map((element: User) => element.attributes.pseudo);

  console.log("lemap", nosUsers[0]);
};

export { fetchCharacterApi, laFunction, characters };
