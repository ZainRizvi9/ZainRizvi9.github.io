// ─── TMDB Configuration ───────────────────────────────────────────────────────
export const TMDB_API_KEY = '8407fcbff3aa62f8d802da703f6e0b8e'
export const TMDB_IMG_BASE = 'https://image.tmdb.org/t/p/w185'

// ─── Game Configuration ───────────────────────────────────────────────────────
export const PAIR_COUNTS = { easy: 6, medium: 8, hard: 10 }
export const GRID_COLS   = { easy: 4, medium: 4, hard: 5 }
export const CARD_W      = { easy: 88, medium: 86, hard: 74 }
export const CARD_H      = { easy: 128, medium: 128, hard: 110 }

// ─── Movie Data (TMDB IDs for poster fetching) ────────────────────────────────
export const MOVIES = {
  action: [
    { t: 'The Dark Knight',     y: 2008, id: 155 },
    { t: 'Mad Max: Fury Road',  y: 2015, id: 76341 },
    { t: 'Die Hard',            y: 1988, id: 562 },
    { t: 'Gladiator',           y: 2000, id: 98 },
    { t: 'The Terminator',      y: 1984, id: 218 },
    { t: 'Inception',           y: 2010, id: 27205 },
    { t: 'Top Gun: Maverick',   y: 2022, id: 361743 },
    { t: 'John Wick',           y: 2014, id: 245891 },
    { t: 'Heat',                y: 1995, id: 949 },
    { t: 'Aliens',              y: 1986, id: 679 },
  ],
  comedy: [
    { t: 'Home Alone',                y: 1990, id: 771 },
    { t: 'Superbad',                  y: 2007, id: 8363 },
    { t: 'The Grand Budapest Hotel',  y: 2014, id: 120467 },
    { t: 'Toy Story',                 y: 1995, id: 862 },
    { t: 'Knives Out',                y: 2019, id: 546554 },
    { t: "Ferris Bueller's Day Off",  y: 1986, id: 9377 },
    { t: 'The Princess Bride',        y: 1987, id: 2493 },
    { t: 'Clueless',                  y: 1995, id: 9603 },
    { t: 'Game Night',                y: 2018, id: 445571 },
    { t: 'Crazy Rich Asians',         y: 2018, id: 455207 },
  ],
  horror: [
    { t: 'Halloween',       y: 1978, id: 948 },
    { t: 'Get Out',         y: 2017, id: 419430 },
    { t: 'Jaws',            y: 1975, id: 578 },
    { t: 'It',              y: 2017, id: 346364 },
    { t: 'The Shining',     y: 1980, id: 694 },
    { t: 'A Quiet Place',   y: 2018, id: 447332 },
    { t: 'Hereditary',      y: 2018, id: 493922 },
    { t: 'Scream',          y: 1996, id: 4232 },
    { t: '28 Days Later',   y: 2002, id: 170 },
    { t: 'Midsommar',       y: 2019, id: 530385 },
  ],
  classics: [
    { t: 'Casablanca',          y: 1942, id: 289 },
    { t: 'The Godfather',       y: 1972, id: 238 },
    { t: "Singin' in the Rain", y: 1952, id: 872 },
    { t: 'Rear Window',         y: 1954, id: 567 },
    { t: 'Some Like It Hot',    y: 1959, id: 239 },
    { t: 'Sunset Boulevard',    y: 1950, id: 599 },
    { t: '12 Angry Men',        y: 1957, id: 389 },
    { t: 'Roman Holiday',       y: 1953, id: 804 },
    { t: 'Lawrence of Arabia',  y: 1962, id: 947 },
    { t: 'Vertigo',             y: 1958, id: 426 },
  ],
}