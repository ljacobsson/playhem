export interface ScoreSubmission {
  player1_score: Player1Score;
  player1_user: Player1User;
  player2_score: Player2Score;
  player2_user: Player2User;
}

export interface Player1Score {
  selected_option: SelectedOption;
  type: string;
}

export interface SelectedOption {
  text: Text1;
  value: string;
}

export interface Text1 {
  emoji: boolean;
  text: string;
  type: string;
}

export interface Player1User {
  selected_user: string;
  type: string;
}

export interface Player2Score {
  selected_option: SelectedOption1;
  type: string;
}

export interface SelectedOption1 {
  text: Text2;
  value: string;
}

export interface Text2 {
  emoji: boolean;
  text: string;
  type: string;
}

export interface Player2User {
  selected_user: string;
  type: string;
}

export interface Submit {
  emoji: boolean;
  text: string;
  type: string;
}

export interface Title {
  emoji: boolean;
  text: string;
  type: string;
}
