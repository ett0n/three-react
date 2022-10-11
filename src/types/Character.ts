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
interface AccessoriesStr {
  background?: string | null;
  body: string | null;
  feet: string | null;
  head: string | null;
  hand_l: string | null;
  hand_r: string | null;
  hat: string | null;
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

export type { Character, CharacterAttr, Accessories, AccessoriesStr, Accessory, AccessoriesGlb };
