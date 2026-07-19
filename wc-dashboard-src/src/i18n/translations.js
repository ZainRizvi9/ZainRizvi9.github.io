export const translations = {
  en: {
    title: "World Cup 2026 Golden Boot Tracker",
    subtitle: "Live goals, assists, and expected goals as the final approaches",
    intro:
      "The 2026 World Cup final is tomorrow: Argentina vs Spain. Explore how the six leading Golden Boot contenders built their tallies round by round, and see who outperformed their expected goals (xG) the most.",
    langLabel: "Language",
    heroEyebrow: "FIFA WORLD CUP 2026 · FINAL: ARGENTINA VS SPAIN",

    statPlayers: "Players tracked",
    statAlive: "Still alive",
    statTopGoals: "Most goals",
    statDaysToFinal: "Days to the final",
    progressTitle: "Tournament Progress",
    progressRounds: "rounds played",
    progressFinal: "Final · Jul 19",

    chart1Title: "Goal Contributions by Round",
    chart1Context:
      "Hover a player to spotlight their line. Switch metrics to compare goals, assists, or combined contributions round by round. Only the final remains.",
    chart1Empty: "Select at least one player to see the chart.",
    selectPlayers: "Players",
    selectAll: "Select all",
    clearAll: "Clear",
    metricGoals: "Goals",
    metricAssists: "Assists",
    metricGA: "G+A",
    noAssistData: "no assist data recorded",
    statusAlive: "Still in it",
    statusEliminated: "Eliminated",

    chart2Title: "Goals vs Expected Goals (xG)",
    chart2Context:
      "Goals scored versus expected goals for each contender. A bar taller than its xG marker means the player is finishing above the rate their chances suggest. Click a bar for the full breakdown.",
    goals: "Goals",
    xG: "xG",
    xGNotAvailable: "xG not available",
    overperform: "goals above xG",
    underperform: "goals below xG",
    onPace: "right on xG",
    clickHint: "Click a bar to see details",

    legendsTitle: "Golden Boot Contenders",
    currentTally: "goals so far",

    footer:
      "Stats current through the semifinals as of July 18, 2026 (FIFA World Cup 2026 final: Argentina vs Spain, July 19, 2026). Sourced from FIFA official stats, ESPN, Yahoo Sports and Goal.com. Round-by-round splits are approximate where match-by-match detail wasn't reported.",
  },
  es: {
    title: "Rastreador de la Bota de Oro Mundial 2026",
    subtitle: "Goles, asistencias y goles esperados en vivo mientras se acerca la final",
    intro:
      "La final del Mundial 2026 es mañana: Argentina vs España. Explora cómo los seis principales candidatos a la Bota de Oro construyeron su cuenta ronda por ronda, y descubre quién superó más su cifra de goles esperados (xG).",
    langLabel: "Idioma",
    heroEyebrow: "MUNDIAL FIFA 2026 · FINAL: ARGENTINA VS ESPAÑA",

    statPlayers: "Jugadores seguidos",
    statAlive: "Siguen en competencia",
    statTopGoals: "Máx. de goles",
    statDaysToFinal: "Días para la final",
    progressTitle: "Progreso del Torneo",
    progressRounds: "rondas jugadas",
    progressFinal: "Final · 19 jul",

    chart1Title: "Contribuciones de Gol por Ronda",
    chart1Context:
      "Pasa el cursor sobre un jugador para destacar su línea. Cambia de métrica para comparar goles, asistencias o contribuciones combinadas ronda por ronda. Solo falta la final.",
    chart1Empty: "Selecciona al menos un jugador para ver el gráfico.",
    selectPlayers: "Jugadores",
    selectAll: "Seleccionar todo",
    clearAll: "Limpiar",
    metricGoals: "Goles",
    metricAssists: "Asistencias",
    metricGA: "G+A",
    noAssistData: "sin datos de asistencias registrados",
    statusAlive: "Sigue en carrera",
    statusEliminated: "Eliminado",

    chart2Title: "Goles vs Goles Esperados (xG)",
    chart2Context:
      "Goles anotados frente a goles esperados para cada candidato. Una barra más alta que su marcador de xG significa que el jugador está definiendo por encima de lo que sugieren sus ocasiones. Haz clic en una barra para ver el detalle completo.",
    goals: "Goles",
    xG: "xG",
    xGNotAvailable: "xG no disponible",
    overperform: "goles por encima del xG",
    underperform: "goles por debajo del xG",
    onPace: "justo en el xG",
    clickHint: "Haz clic en una barra para ver los detalles",

    legendsTitle: "Candidatos a la Bota de Oro",
    currentTally: "goles hasta ahora",

    footer:
      "Estadísticas vigentes hasta semifinales al 18 de julio de 2026 (final del Mundial 2026: Argentina vs España, 19 de julio de 2026). Fuente: estadísticas oficiales de FIFA, ESPN, Yahoo Sports y Goal.com. Los desgloses ronda por ronda son aproximados donde no se reportó el detalle partido por partido.",
  },
};

export function t(lang, key) {
  return translations[lang]?.[key] ?? translations.en[key] ?? key;
}