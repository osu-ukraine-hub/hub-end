import { UserEntity } from "src/entities";

export default interface Leaderboard {
  rank: number;
  score: number;
  user: UserEntity;
}
