export interface GameEntry {
  PK: string;
  SK: Date;
  Winner: Player;
  Loser: Player;
}

export interface Player {
  Id: string;
  Name: string;
  Score: number;
  Image: string;
}
