interface User {
  id: number;
  attributes: UserAttr;
}

interface UserAttr {
  characters: { data: any };
  createdAt: string;
  disabled: boolean;
  email: string;
  pseudo: string;
  publishedAt: string;
  stats: { id: number; connexion: number; win: number; loose: number; ar: number };
  updatedAt: string;
}

export type { User, UserAttr };
