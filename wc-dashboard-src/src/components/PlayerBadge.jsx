import { TEAM_CODES } from "../data/playersData";
import "./PlayerBadge.css";

export default function PlayerBadge({ player, size = "md" }) {
  const code = TEAM_CODES[player.team] || "???";
  return (
    <span className={`player-badge player-badge--${size}`} style={{ "--badge-color": player.color }}>
      {code}
    </span>
  );
}
