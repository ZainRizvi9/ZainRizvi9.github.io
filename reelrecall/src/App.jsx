import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'
import { MOVIES, PAIR_COUNTS, TMDB_API_KEY, TMDB_IMG_BASE } from './data'

const GRID_COLS = { easy: 6, medium: 8, hard: 10 }
const CARD_W    = { easy: 148, medium: 140, hard: 120 }
const CARD_H    = { easy: 210, medium: 190, hard: 160 }

const fmtTime = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
const shuffle  = arr => [...arr].sort(() => Math.random() - 0.5)

const posterCache = {}

async function loadPosters(movieList) {
  const needed = movieList.filter(m => !(m.id in posterCache))
  await Promise.all(needed.map(async m => {
    try {
      const res  = await fetch(`https://api.themoviedb.org/3/movie/${m.id}?api_key=${TMDB_API_KEY}`)
      const data = await res.json()
      posterCache[m.id] = data.poster_path ? TMDB_IMG_BASE + data.poster_path : null
    } catch {
      posterCache[m.id] = null
    }
  }))
}

const SHELF_IDS = [
  155,    // The Dark Knight
  76341,  // Mad Max: Fury Road
  562,    // Die Hard
  98,     // Gladiator
  948,    // Halloween
  419430, // Get Out
  578,    // Jaws
  238,    // The Godfather
  289,    // Casablanca
  27205,  // Inception
  346364, // It
  694,    // The Shining
  862,    // Toy Story
  8363,   // Superbad
  120467, // The Grand Budapest Hotel
  426,    // Vertigo
  947,    // Lawrence of Arabia
  389     // 12 Angry Men
]

const IconFilm = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M17 7h5M2 17h5M17 17h5"/>
  </svg>
)
const IconStar = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
)
const IconArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)
const IconBack = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
)
const IconCheck = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
    <path d="M5 13l4 4L19 7"/>
  </svg>
)
const IconProjector = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.3" strokeLinecap="round">
    <circle cx="12" cy="12" r="3.5"/>
    <path d="M3 8v8l9-4-9-4z" opacity=".5"/>
    <rect x="14" y="7" width="7" height="10" rx="1.5"/>
    <line x1="7" y1="8" x2="7" y2="16" opacity=".35"/>
  </svg>
)
const IconFilmPH = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2a2a2f" strokeWidth="1.2" strokeLinecap="round">
    <rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M17 7h5M2 17h5M17 17h5"/>
  </svg>
)

function CardBack() {
  const holes = Array.from({ length: 8 })
  return (
    <div className="face cback">
      <div className="cback-inner">
        <div className="cback-film-l">{holes.map((_, i) => <div key={i} className="hole" />)}</div>
        <div className="cback-center">
          <div className="cback-icon"><IconProjector /></div>
          <div className="cback-lbl">ReelRecall</div>
        </div>
        <div className="cback-film-r">{holes.map((_, i) => <div key={i} className="hole" />)}</div>
      </div>
    </div>
  )
}

function CardFront({ card }) {
  if (card.kind === 'poster') {
    return (
      <div className="face cfront">
        {card.poster
          ? <img className="poster-img" src={card.poster} alt={card.title} />
          : <div className="poster-ph"><IconFilmPH /></div>
        }
        <div className="ctype">Poster</div>
      </div>
    )
  }
  return (
    <div className="face cfront ctitle-front">
      <div className="ctitle-text">{card.title}</div>
      <div className="ctitle-year">{card.year}</div>
      <div className="ctype ctitle-type">Title</div>
    </div>
  )
}

function Card({ card, level, onClick }) {
  const w = CARD_W[level]
  const h = CARD_H[level]
  const cls = ['card', card.flipped ? 'flipped' : '', card.matched ? 'matched' : '', card.shake ? 'shake' : '']
    .filter(Boolean).join(' ')
  return (
    <div className={cls} style={{ width: w, height: h }} onClick={onClick}>
      <div className="card-inner">
        <CardBack />
        <CardFront card={card} />
      </div>
      <div className="match-check"><IconCheck /></div>
    </div>
  )
}

function PosterShelf({ shelfPosters }) {
  const items = [...shelfPosters, ...shelfPosters]
  return (
    <div className="poster-shelf">
      <div className="shelf-track">
        {items.map((url, i) => (
          <div key={i} className="shelf-item">
            {url
              ? <img src={url} alt="" aria-hidden="true" />
              : <div className="shelf-item-ph" />
            }
          </div>
        ))}
      </div>
    </div>
  )
}

function SetupScreen({ onStart, shelfPosters }) {
  const [genre, setGenre] = useState('action')
  const [level, setLevel] = useState('easy')

  const genres = [
    { val: 'action',   label: 'Action' },
    { val: 'comedy',   label: 'Comedy' },
    { val: 'horror',   label: 'Horror' },
    { val: 'classics', label: 'Classics' },
  ]
  const levels = [
    { val: 'easy',   label: 'Easy — 6 pairs' },
    { val: 'medium', label: 'Medium — 8 pairs' },
    { val: 'hard',   label: 'Hard — 10 pairs' },
  ]

  return (
    <div className="setup">
      <div className="hero">
        <div className="hero-bg">
          <svg viewBox="0 0 860 160" fill="none" preserveAspectRatio="xMidYMid slice">
            {[40,80,120].map(y => <line key={y} x1="0" y1={y} x2="860" y2={y} stroke="white" strokeWidth="1"/>)}
            {[140,280,420,560,700].map(x => <line key={x} x1={x} y1="0" x2={x} y2="160" stroke="white" strokeWidth="1"/>)}
          </svg>
        </div>
        <div className="hero-deco">
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="46" stroke="white" strokeWidth="1.5"/>
            <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="1"/>
            <circle cx="50" cy="50" r="8" fill="white" opacity=".8"/>
            {[[50,18],[50,82],[18,50],[82,50],[27,27],[73,73],[73,27],[27,73]].map(([cx,cy],i) => (
              <circle key={i} cx={cx} cy={cy} r="5" stroke="white" strokeWidth="1.2"/>
            ))}
          </svg>
        </div>
        <div className="wordmark">
          <span className="wm-reel">Reel</span>
          <div className="wm-dot" />
          <span className="wm-recall">Recall</span>
        </div>
        <div className="tagline">Match the poster. Remember the film.</div>
      </div>

      <PosterShelf shelfPosters={shelfPosters} />

      <div className="setup-body">
        <div className="cfg-row">
          <div className="cfg-label"><IconFilm /> Genre</div>
          <div className="pill-row">
            {genres.map(g => (
              <button key={g.val} className={`pill${genre === g.val ? ' active' : ''}`} onClick={() => setGenre(g.val)}>
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <div className="divider" />

        <div className="cfg-row">
          <div className="cfg-label"><IconStar /> Difficulty</div>
          <div className="pill-row">
            {levels.map(l => (
              <button key={l.val} className={`pill${level === l.val ? ' active' : ''}`} onClick={() => setLevel(l.val)}>
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <button className="start-btn" onClick={() => onStart(genre, level)}>
          Start Game <IconArrow />
        </button>
      </div>
    </div>
  )
}

function FilmReelSVG({ size = 120 }) {
  const cx = size / 2
  const cy = size / 2
  const outerR = size * 0.46
  const innerR = size * 0.28
  const hubR   = size * 0.10
  const holeR  = size * 0.115
  const holes  = Array.from({ length: 5 }, (_, i) => {
    const angle = (i / 5) * 2 * Math.PI - Math.PI / 2
    const r = (innerR + outerR * 0.68) / 2
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  })
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx={cx} cy={cy} r={outerR} fill="white" opacity="1"/>
      <circle cx={cx} cy={cy} r={innerR} fill="#0e0e12"/>
      {holes.map((h, i) => <circle key={i} cx={h.x} cy={h.y} r={holeR} fill="#0e0e12"/>)}
      <circle cx={cx} cy={cy} r={hubR} fill="white"/>
      {Array.from({ length: 5 }, (_, i) => {
        const angle = (i / 5) * 2 * Math.PI
        return <circle key={i} cx={cx + hubR * 1.7 * Math.cos(angle)} cy={cy + hubR * 1.7 * Math.sin(angle)} r={hubR * 0.22} fill="white"/>
      })}
      <circle cx={cx} cy={cy} r={hubR * 0.38} fill="#0e0e12"/>
    </svg>
  )
}

function FilmStripBar({ posters }) {
  const items = [...posters, ...posters]
  const REEL_SIZE = 90

  return (
    <div className="film-strip-bar">
      <div className="strip-reel strip-reel-left">
        <FilmReelSVG size={REEL_SIZE} />
      </div>

      <div className="strip-track-wrap">
        <div className="strip-sprockets strip-sprockets-top"/>
        <div className="strip-frames">
          <div className="strip-frames-inner">
            {items.map((url, i) => (
              <div key={i} className="strip-frame">
                {url
                  ? <img src={url} alt="" aria-hidden="true"/>
                  : <div className="strip-frame-ph"/>
                }
              </div>
            ))}
          </div>
        </div>
        <div className="strip-sprockets strip-sprockets-bottom"/>
      </div>

      <div className="strip-reel strip-reel-right">
        <FilmReelSVG size={REEL_SIZE} />
      </div>
    </div>
  )
}

function GameScreen({ cards, level, moves, pairs, total, time, feedback, feedbackCls, onFlip, onBack, shelfPosters }) {
  const cols = GRID_COLS[level]
  return (
    <div className="game">
      <div className="topbar">
        <div className="tl">Reel<em>·</em>Recall</div>
        <div className="stats">
          <div className="sblock"><div className="sval">{moves}</div><div className="slbl">Moves</div></div>
          <div className="sdiv" />
          <div className="sblock"><div className="sval">{pairs}/{total}</div><div className="slbl">Pairs</div></div>
          <div className="sdiv" />
          <div className="sblock"><div className="sval">{fmtTime(time)}</div><div className="slbl">Time</div></div>
        </div>
        <button className="back-btn" onClick={onBack}><IconBack /> Menu</button>
      </div>

      <div className={`fb${feedbackCls ? ' ' + feedbackCls : ''}`}>{feedback}</div>

      <div className="grid-wrap">
        <div className="grid" style={{ gridTemplateColumns: `repeat(${cols}, auto)` }}>
          {cards.map(card => (
            <Card key={card.uid} card={card} level={level} onClick={() => onFlip(card.uid)} />
          ))}
        </div>
      </div>

      <FilmStripBar posters={shelfPosters} />
    </div>
  )
}

function TheatreCurtains() {
  return (
    <div className="curtain-wrap">
      <svg className="curtain-panel curtain-left" viewBox="0 0 300 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0 C 50 220 -10 440 40 660 C 65 760 30 840 10 900 L 300 900 L 300 0 Z"
          fill="#8B0010" opacity=".95"/>
        <path d="M70 0 C 95 220 55 440 85 660 C 100 760 75 840 65 900"
          stroke="#6B000C" strokeWidth="9" fill="none" opacity=".5"/>
        <path d="M150 0 C 175 220 130 440 165 660 C 180 760 155 840 148 900"
          stroke="#6B000C" strokeWidth="7" fill="none" opacity=".4"/>
        <path d="M225 0 C 240 220 205 440 235 660 C 248 760 225 840 218 900"
          stroke="#6B000C" strokeWidth="6" fill="none" opacity=".3"/>
        <path d="M25 0 C 35 220 15 440 30 660" stroke="#C0002A" strokeWidth="3" fill="none" opacity=".3"/>
        <line x1="0" y1="3" x2="300" y2="3" stroke="#C8A84B" strokeWidth="4" opacity=".85"/>
        {[20,55,90,125,160,195,230,265].map(x => (
          <line key={x} x1={x} y1={3} x2={x+7} y2={32} stroke="#C8A84B" strokeWidth="2" opacity=".7"/>
        ))}
      </svg>

      <svg className="curtain-panel curtain-right" viewBox="0 0 300 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M300 0 C 250 220 310 440 260 660 C 235 760 270 840 290 900 L 0 900 L 0 0 Z"
          fill="#8B0010" opacity=".95"/>
        <path d="M230 0 C 205 220 245 440 215 660 C 200 760 225 840 235 900"
          stroke="#6B000C" strokeWidth="9" fill="none" opacity=".5"/>
        <path d="M150 0 C 125 220 170 440 135 660 C 120 760 145 840 152 900"
          stroke="#6B000C" strokeWidth="7" fill="none" opacity=".4"/>
        <path d="M75 0 C 60 220 95 440 65 660 C 52 760 75 840 82 900"
          stroke="#6B000C" strokeWidth="6" fill="none" opacity=".3"/>
        <path d="M275 0 C 265 220 285 440 270 660" stroke="#C0002A" strokeWidth="3" fill="none" opacity=".3"/>
        <line x1="0" y1="3" x2="300" y2="3" stroke="#C8A84B" strokeWidth="4" opacity=".85"/>
        {[15,50,85,120,155,190,225,260].map(x => (
          <line key={x} x1={x} y1={3} x2={x-7} y2={32} stroke="#C8A84B" strokeWidth="2" opacity=".7"/>
        ))}
      </svg>

      <svg className="curtain-valance" viewBox="0 0 1600 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0 Q 200 95 400 65 Q 600 35 800 60 Q 1000 85 1200 55 Q 1400 25 1600 0 L 1600 0 L 0 0 Z"
          fill="#8B0010" opacity=".9"/>
        <path d="M0 0 Q 200 80 400 55 Q 600 30 800 50 Q 1000 70 1200 48 Q 1400 22 1600 0"
          stroke="#6B000C" strokeWidth="2.5" fill="none" opacity=".55"/>
        <line x1="0" y1="2" x2="1600" y2="2" stroke="#C8A84B" strokeWidth="3" opacity=".7"/>
      </svg>
    </div>
  )
}

function EndScreen({ moves, time, score, onReplay, onMenu }) {
  return (
    <div className="end">
      <TheatreCurtains />
      <div className="end-title">That's<br />a <em>Wrap!</em></div>
      <div className="end-sub">All pairs matched</div>
      <div className="end-row">
        <div className="estat"><div className="estat-v">{moves}</div><div className="estat-l">Moves</div></div>
        <div className="estat"><div className="estat-v">{fmtTime(time)}</div><div className="estat-l">Time</div></div>
        <div className="estat red"><div className="estat-v">{score}</div><div className="estat-l">Score</div></div>
      </div>
      <div className="end-btns">
        <button className="ebtn-p" onClick={onReplay}>Play Again</button>
        <button className="ebtn-s" onClick={onMenu}>Change Settings</button>
      </div>
    </div>
  )
}

export default function App() {
  const [screen, setScreen]           = useState('setup')
  const [loading, setLoading]         = useState(false)
  const [cards, setCards]             = useState([])
  const [level, setLevel]             = useState('easy')
  const [moves, setMoves]             = useState(0)
  const [pairs, setPairs]             = useState(0)
  const [total, setTotal]             = useState(6)
  const [time, setTime]               = useState(0)
  const [feedback, setFeedback]       = useState('')
  const [feedbackCls, setFeedbackCls] = useState('')
  const [endStats, setEndStats]       = useState({ moves: 0, time: 0, score: 0 })
  const [shelfPosters, setShelfPosters] = useState([])

  const cardsRef  = useRef([])
  const firstRef  = useRef(null)
  const lockedRef = useRef(false)
  const movesRef  = useRef(0)
  const pairsRef  = useRef(0)
  const totalRef  = useRef(6)
  const timerRef  = useRef(null)
  const timeRef   = useRef(0)
  const lastGenre = useRef('action')
  const lastLevel = useRef('easy')

  useEffect(() => {
    Promise.all(SHELF_IDS.map(async id => {
      try {
        const res  = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`)
        const data = await res.json()
        return data.poster_path ? TMDB_IMG_BASE + data.poster_path : null
      } catch { return null }
    })).then(urls => setShelfPosters(urls.filter(Boolean)))
    return () => clearInterval(timerRef.current)
  }, [])

  const syncCards = () => setCards([...cardsRef.current])
  const fb = (msg, cls = '') => { setFeedback(msg); setFeedbackCls(cls) }

  const startGame = useCallback(async (genre, lvl) => {
    clearInterval(timerRef.current)
    lastGenre.current = genre
    lastLevel.current = lvl
    firstRef.current  = null
    lockedRef.current = false
    movesRef.current  = 0
    pairsRef.current  = 0
    timeRef.current   = 0
    const tot = PAIR_COUNTS[lvl]
    totalRef.current  = tot

    setLevel(lvl)
    setMoves(0)
    setPairs(0)
    setTime(0)
    setTotal(tot)
    fb('Flip a card to begin — match each poster to its title.')
    setLoading(true)
    setScreen('loading')

    const pool = MOVIES[genre].slice(0, tot)
    await loadPosters(pool)
    setLoading(false)

    const deck = []
    pool.forEach((m, i) => {
      deck.push({ uid: i * 2,     pid: i, kind: 'poster', title: m.t, year: m.y, poster: posterCache[m.id], flipped: false, matched: false, shake: false })
      deck.push({ uid: i * 2 + 1, pid: i, kind: 'title',  title: m.t, year: m.y, flipped: false, matched: false, shake: false })
    })
    cardsRef.current = shuffle(deck)
    syncCards()
    setScreen('game')

    timerRef.current = setInterval(() => {
      timeRef.current += 1
      setTime(t => t + 1)
    }, 1000)
  }, [])

  const handleFlip = useCallback((uid) => {
    if (lockedRef.current) return

    const arr = cardsRef.current
    const idx = arr.findIndex(c => c.uid === uid)
    if (idx === -1) return
    const card = arr[idx]
    if (card.flipped || card.matched) return

    arr[idx] = { ...card, flipped: true }
    cardsRef.current = [...arr]
    syncCards()

    if (firstRef.current === null) {
      firstRef.current = uid
      return
    }

    const firstUid = firstRef.current
    firstRef.current = null
    lockedRef.current = true

    const firstIdx = cardsRef.current.findIndex(c => c.uid === firstUid)
    const a = cardsRef.current[firstIdx]
    const b = cardsRef.current[idx]

    movesRef.current += 1
    setMoves(movesRef.current)

    if (a.pid === b.pid && a.kind !== b.kind) {
      setTimeout(() => {
        cardsRef.current = cardsRef.current.map(c =>
          c.uid === a.uid || c.uid === b.uid ? { ...c, matched: true, flipped: true } : c
        )
        syncCards()
        pairsRef.current += 1
        setPairs(pairsRef.current)
        fb(`✓  "${a.title}" matched!`, 'hit')
        lockedRef.current = false

        if (pairsRef.current === totalRef.current) {
          clearInterval(timerRef.current)
          const score = Math.max(0, Math.round(9000 / movesRef.current * totalRef.current - timeRef.current * 2))
          setTimeout(() => {
            setEndStats({ moves: movesRef.current, time: timeRef.current, score })
            setScreen('end')
          }, 800)
        }
      }, 300)
    } else {
      fb('Not a match — remember where you saw it.', 'miss')
      setTimeout(() => {
        cardsRef.current = cardsRef.current.map(c =>
          c.uid === a.uid || c.uid === b.uid ? { ...c, shake: true } : c
        )
        syncCards()
        setTimeout(() => {
          cardsRef.current = cardsRef.current.map(c =>
            c.uid === a.uid || c.uid === b.uid ? { ...c, flipped: false, shake: false } : c
          )
          syncCards()
          lockedRef.current = false
          fb('Keep going — find the matching pairs.')
        }, 500)
      }, 700)
    }
  }, [])

  const goMenu = useCallback(() => {
    clearInterval(timerRef.current)
    setScreen('setup')
  }, [])

  return (
    <div className="rr">
      {screen === 'setup' && <SetupScreen onStart={startGame} shelfPosters={shelfPosters} />}
      {screen === 'game'  && (
        <GameScreen
          cards={cards} level={level} moves={moves} pairs={pairs}
          total={total} time={time} feedback={feedback} feedbackCls={feedbackCls}
          onFlip={handleFlip} onBack={goMenu} shelfPosters={shelfPosters}
        />
      )}
      {screen === 'end' && (
        <EndScreen
          moves={endStats.moves} time={endStats.time} score={endStats.score}
          onReplay={() => startGame(lastGenre.current, lastLevel.current)}
          onMenu={goMenu}
        />
      )}
      {(loading || screen === 'loading') && (
        <div className="loader">
          <div className="loader-film">
            {Array.from({ length: 5 }).map((_, i) => <div key={i} className="loader-frame" />)}
          </div>
          <div className="loader-text">Loading posters...</div>
        </div>
      )}
    </div>
  )
}