interface Character {
  id: number;
  attributes: CharacterAttr;
}

interface CharacterAttr {
  accessories: Accessories;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
  disabled: boolean;
}

interface Accessories {
  id: number;
  background: Accessory;
  body: Accessory;
  feet: Accessory;
  head: Accessory;
  hand_l: Accessory;
  hand_r: Accessory;
  hat: Accessory;
}

interface AccessoriesGlb {
  background: Accessory;
  body: Accessory;
  feet: Accessory;
  head: Accessory;
  hand_l: Accessory;
  hand_r: Accessory;
  hat: Accessory;
}

interface Accessory {
  id: number;
  name: string;
  color: null | string;
}

export type { Character, CharacterAttr, Accessories, Accessory };
