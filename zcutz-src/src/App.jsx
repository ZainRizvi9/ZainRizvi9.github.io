import { useState } from "react";

// ─── Colour tokens ──────────────────────────────────────────────────────────
const black   = "#0a0a0a";
const offBlack= "#141416";
const card    = "#1c1c20";
const border  = "#2e2e34";
const red     = "#dc2626";
const blue    = "#1d4ed8";
const white   = "#f0f0f0";
const grey    = "#6b7280";
const greyLt  = "#9ca3af";
const green   = "#16a34a";

// ─── Data ───────────────────────────────────────────────────────────────────
const SERVICES = [
  { id:1, name:"Skin Fade",       price:35, duration:"30 min", desc:"Zero-to-skin taper with a razor-sharp blend. Our most popular service." },
  { id:2, name:"Classic Cut",     price:30, duration:"45 min", desc:"A timeless scissor cut tailored to your head shape and style." },
  { id:3, name:"Beard Trim",      price:20, duration:"20 min", desc:"Clean shape-up and line work to tidy your beard." },
  { id:4, name:"Cut & Beard",     price:50, duration:"60 min", desc:"The full package — a great haircut plus a sculpted beard." },
  { id:5, name:"Kids Cut",        price:22, duration:"30 min", desc:"Relaxed, no-stress cuts for kids under 12." },
  { id:6, name:"Hot Towel Shave", price:38, duration:"40 min", desc:"Traditional straight-razor shave with hot towel wrap." },
];

const BARBERS = [
  { id:1, initials:"DR", color:red,       img:"/zcutz/barber1.jpeg", name:"Dave Reyes",  role:"Senior Barber",    exp:"8 years", specialty:["Skin fades","Tapers","Zero work"],    bio:"Dave is the go-to for razor-sharp fades. Eight years in, he still obsesses over every blend." },
  { id:2, initials:"KO", color:blue,      img:"/zcutz/barber2.jpeg", name:"Karim Osei",  role:"Master Barber",    exp:"5 years", specialty:["Beards","Classic cuts","Line-ups"],    bio:"Karim brings old-school barber tradition to every chair. His beard sculpting is second to none." },
  { id:3, initials:"LP", color:"#374151", img:"/zcutz/barber3.jpg", name:"Lena Park",   role:"Barber & Stylist", exp:"6 years", specialty:["Scissor work","Textured cuts","Kids"], bio:"Lena blends precision scissor technique with creative flair. Favourite for textured and curly cuts." },
];

const TIMES  = ["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","1:00 PM","1:30 PM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM"];
const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const daysInMonth = (y,m) => new Date(y,m+1,0).getDate();
const firstDayOf  = (y,m) => new Date(y,m,1).getDay();

// ─── Global CSS ─────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{background:${black};color:${white};font-family:'Barlow',sans-serif;font-size:15px;line-height:1.6}
  ::-webkit-scrollbar{width:5px}
  ::-webkit-scrollbar-track{background:${black}}
  ::-webkit-scrollbar-thumb{background:${border};border-radius:3px}
  input,textarea{color-scheme:dark}
  input::placeholder,textarea::placeholder{color:${grey}}
  @keyframes slideDown{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
`;
if (!document.getElementById("zcutz-global")) {
  const el = document.createElement("style");
  el.id = "zcutz-global";
  el.textContent = css;
  document.head.appendChild(el);
}

// ─── SVG Service Icons ───────────────────────────────────────────────────────
function IconFade({ size=28, color=red }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect x="4"  y="21" width="20" height="3"   rx="1.5" fill={color} opacity="1"/>
      <rect x="6"  y="16" width="16" height="2.5" rx="1.2" fill={color} opacity="0.72"/>
      <rect x="9"  y="11" width="10" height="2"   rx="1"   fill={color} opacity="0.48"/>
      <rect x="11" y="7"  width="6"  height="1.5" rx="0.75"fill={color} opacity="0.28"/>
      <rect x="13" y="4"  width="2"  height="1"   rx="0.5" fill={color} opacity="0.12"/>
    </svg>
  );
}
function IconScissors({ size=28, color=red }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="7"  cy="20" r="3.5" stroke={color} strokeWidth="1.8" fill="none"/>
      <circle cx="21" cy="20" r="3.5" stroke={color} strokeWidth="1.8" fill="none"/>
      <line x1="9.5"  y1="17.5" x2="20" y2="5" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="18.5" y1="17.5" x2="8"  y2="5" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}
function IconBeard({ size=28, color=red }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M8 6 Q14 3 20 6 L21 14 Q21 22 14 24 Q7 22 7 14 Z" stroke={color} strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
      <path d="M9 16 Q14 21 19 16" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M11 13 Q13 11 14 13 Q15 11 17 13" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}
function IconCutBeard({ size=28, color=red }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="5"  cy="22" r="2.5" stroke={color} strokeWidth="1.6" fill="none"/>
      <circle cx="15" cy="22" r="2.5" stroke={color} strokeWidth="1.6" fill="none"/>
      <line x1="7"  y1="20" x2="15" y2="8" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="13" y1="20" x2="7"  y2="8" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M18 8 Q23 8 24 14 Q24 20 21 21 Q18 22 18 18 L18 8Z" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      <path d="M19 15 Q21 18 23 15" stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    </svg>
  );
}
function IconKids({ size=28, color=red }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="11" r="6" stroke={color} strokeWidth="1.8" fill="none"/>
      <line x1="14" y1="5"  x2="14" y2="2"   stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="10" y1="6"  x2="8"  y2="3.5" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="18" y1="6"  x2="20" y2="3.5" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M11 13 Q14 16 17 13" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M8 24 Q8 20 14 19 Q20 20 20 24" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}
function IconRazor({ size=28, color=red }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect x="12" y="14" width="4" height="11" rx="2"    stroke={color} strokeWidth="1.7" fill="none"/>
      <rect x="7"  y="5"  width="14" height="10" rx="2"   stroke={color} strokeWidth="1.7" fill="none"/>
      <line x1="7" y1="11" x2="21" y2="11" stroke={color} strokeWidth="1.2"/>
      <circle cx="10" cy="8" r="1" fill={color}/>
      <circle cx="14" cy="8" r="1" fill={color}/>
      <circle cx="18" cy="8" r="1" fill={color}/>
    </svg>
  );
}
const SERVICE_ICONS = [IconFade, IconScissors, IconBeard, IconCutBeard, IconKids, IconRazor];

function RadioDot({ selected, color=red }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink:0 }}>
      <circle cx="9" cy="9" r="8" stroke={selected ? color : border} strokeWidth="1.5" fill="none"/>
      {selected && <circle cx="9" cy="9" r="4.5" fill={color}/>}
    </svg>
  );
}

// ─── Barber avatar helper ────────────────────────────────────────────────────
function BarberAvatar({ b, size=54, border_color=null }) {
  const bc = border_color || b.color;
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", overflow:"hidden", border:`2px solid ${bc}`, flexShrink:0 }}>
      <img src={b.img} alt={b.name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }}/>
    </div>
  );
}

// ─── Barber Pole ─────────────────────────────────────────────────────────────
function BarberPole({ size=40 }) {
  return (
    <svg width={size} height={size*2.6} viewBox="0 0 60 156" fill="none">
      <circle cx="30" cy="9"   r="8.5" fill={black} stroke={greyLt} strokeWidth="1.2"/>
      <circle cx="30" cy="9"   r="4"   fill="#222"/>
      <rect x="16" y="16" width="28" height="7" rx="2.5" fill={black} stroke={border} strokeWidth="0.8"/>
      <defs><clipPath id="pole-body"><rect x="18" y="23" width="24" height="98" rx="5"/></clipPath></defs>
      <rect x="18" y="23" width="24" height="98" rx="5" fill={white}/>
      <g clipPath="url(#pole-body)">
        {[-48,-28,-8,12,32,52,72,92,112].map((o,i)=>(
          <rect key={"b"+i} x="-12" y={o} width="84" height="11" fill={blue} opacity="0.92" transform="rotate(-40 30 72)"/>
        ))}
        {[-38,-18,2,22,42,62,82,102,122].map((o,i)=>(
          <rect key={"r"+i} x="-12" y={o} width="84" height="11" fill={red} opacity="0.92" transform="rotate(-40 30 72)"/>
        ))}
      </g>
      <rect x="18" y="23" width="24" height="98" rx="5" fill="none" stroke={border} strokeWidth="1.2"/>
      <rect x="15" y="121" width="30" height="8"  rx="2.5" fill={black} stroke={border} strokeWidth="0.8"/>
      <rect x="12" y="129" width="36" height="9"  rx="3"   fill={black} stroke={border} strokeWidth="0.8"/>
      <circle cx="30" cy="147" r="6.5" fill={black} stroke={greyLt} strokeWidth="1.2"/>
      <circle cx="30" cy="147" r="3"   fill="#222"/>
    </svg>
  );
}

// ─── Reusable components ─────────────────────────────────────────────────────
function Label({ children, color=red }) {
  return (
    <span style={{ display:"inline-block", fontSize:10, fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", color, border:`1px solid ${color}`, borderRadius:3, padding:"3px 10px" }}>
      {children}
    </span>
  );
}

function Btn({ children, onClick, variant="red", full=false, small=false, style:extra={} }) {
  const base = { display:"inline-flex", alignItems:"center", justifyContent:"center", gap:6, fontFamily:"'Barlow',sans-serif", fontWeight:600, fontSize:small?12:13, letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer", border:"none", borderRadius:5, padding:small?"8px 18px":"11px 26px", transition:"opacity 0.15s", width:full?"100%":"auto", ...extra };
  const variants = {
    red:     { background:red,   color:"#fff" },
    blue:    { background:blue,  color:"#fff" },
    outline: { background:"transparent", color:white, border:`1px solid ${border}` },
    ghost:   { background:"transparent", color:greyLt, border:"none", padding:"8px 12px", textTransform:"none", letterSpacing:0, fontWeight:400, fontSize:15 },
    white:   { background:white, color:blue },
  };
  return <button style={{...base,...variants[variant]}} onClick={onClick}>{children}</button>;
}

function Alert({ type="info", children }) {
  const styles = {
    success: { bg:"#14532d22", border:green,  color:"#4ade80", icon:"✓" },
    info:    { bg:"#1e3a5f22", border:blue,   color:"#93c5fd", icon:"ℹ" },
    warning: { bg:"#78350f22", border:"#d97706", color:"#fcd34d", icon:"⚠" },
    error:   { bg:"#7f1d1d22", border:red,    color:"#fca5a5", icon:"✕" },
  };
  const s = styles[type];
  return (
    <div style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"10px 14px", background:s.bg, border:`1px solid ${s.border}`, borderRadius:6, marginBottom:12, animation:"slideDown 0.2s ease" }}>
      <span style={{ color:s.color, fontWeight:700, flexShrink:0, marginTop:1 }}>{s.icon}</span>
      <span style={{ fontSize:13, color:s.color, lineHeight:1.5 }}>{children}</span>
    </div>
  );
}

function FormField({ label, type="text", value, onChange, placeholder, error }) {
  return (
    <div style={{ marginBottom:14 }}>
      <label style={{ display:"block", fontSize:11, fontWeight:600, color:greyLt, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:5 }}>{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={{ width:"100%", display:"block", padding:"11px 15px", background:card, border:`1px solid ${error?red:border}`, borderRadius:6, color:white, fontSize:14, fontFamily:"'Barlow',sans-serif", outline:"none", transition:"border-color 0.15s" }}
      />
      {error && <p style={{ fontSize:11, color:"#fca5a5", marginTop:4, animation:"slideDown 0.15s ease" }}>⚠ {error}</p>}
    </div>
  );
}

function Divider() {
  return <div style={{ borderTop:`1px solid ${border}`, margin:"0 2.5rem" }}/>;
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar({ page, setPage }) {
  const links = [["home","Home"],["services","Services"],["barbers","Barbers"],["book","Book"],["contact","Contact"]];
  return (
    <nav style={{ position:"sticky", top:0, zIndex:300, background:black, borderBottom:`1px solid ${border}`, height:68, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 2.5rem" }}>
      <div onClick={()=>setPage("home")} style={{ display:"flex", alignItems:"center", gap:11, cursor:"pointer" }}>
        <BarberPole size={18}/>
        <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:30, letterSpacing:"0.3em", color:white, lineHeight:1 }}>ZCUTZ</span>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:"1.75rem" }}>
        {links.map(([key,label])=>(
          <span key={key} onClick={()=>setPage(key)} style={{ fontSize:12, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer", color:page===key?red:greyLt, borderBottom:page===key?`2px solid ${red}`:"2px solid transparent", paddingBottom:2, transition:"color 0.2s" }}>{label}</span>
        ))}
        <Btn onClick={()=>setPage("book")} style={{ fontSize:14, padding:"12px 28px", letterSpacing:"0.1em" }}>Book now</Btn>
      </div>
    </nav>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <div>
      <section style={{ minHeight:"91vh", display:"flex", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"5rem 2rem", background:black, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", opacity:0.025, backgroundImage:"repeating-linear-gradient(-45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize:"18px 18px" }}/>
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:"2rem" }}><BarberPole size={46}/></div>
          <div style={{ display:"flex", justifyContent:"center", gap:8, marginBottom:"1.75rem", flexWrap:"wrap" }}>
            <Label color={red}>Ottawa</Label>
            <Label color={blue}>Est. 2018</Label>
            <Label color={greyLt}>Premium cuts</Label>
          </div>
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(5.5rem,14vw,10.5rem)", letterSpacing:"0.08em", color:white, lineHeight:0.92, marginBottom:"1.75rem" }}>
            ZC<span style={{ color:red }}>U</span>TZ
          </h1>
          <p style={{ fontSize:16, fontWeight:300, fontStyle:"italic", color:greyLt, maxWidth:420, margin:"0 auto 2.5rem", lineHeight:1.85 }}>
            Ottawa&apos;s sharpest barbershop — precision fades, clean cuts, and a chair-side experience like no other.
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap", alignItems:"center" }}>
            <Btn onClick={()=>setPage("book")} style={{ fontSize:16, padding:"15px 36px", letterSpacing:"0.1em" }}>Book a session →</Btn>
            <Btn variant="outline" onClick={()=>setPage("services")} small>View services</Btn>
          </div>
        </div>
      </section>

      <div style={{ background:red, padding:"1.75rem 2.5rem", display:"flex", justifyContent:"center", alignItems:"center", gap:"clamp(2rem,6vw,5rem)", flexWrap:"wrap" }}>
        <div style={{ textAlign:"center" }}>
          <p style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:56, letterSpacing:"0.05em", color:"#fff", lineHeight:1 }}>500+</p>
          <p style={{ fontSize:12, color:"rgba(255,255,255,0.8)", fontWeight:400, marginTop:3 }}>Happy clients / month</p>
        </div>
        <div style={{ width:1, height:48, background:"rgba(255,255,255,0.25)", flexShrink:0 }}/>
        {[["3","Expert barbers"],["8+","Years in Ottawa"],["6","Services"]].map(([n,l])=>(
          <div key={l} style={{ textAlign:"center" }}>
            <p style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:34, letterSpacing:"0.05em", color:"rgba(255,255,255,0.9)", lineHeight:1 }}>{n}</p>
            <p style={{ fontSize:11, color:"rgba(255,255,255,0.65)", fontWeight:400, marginTop:3 }}>{l}</p>
          </div>
        ))}
      </div>

      <Divider/>

      <section style={{ background:offBlack, padding:"5rem 2.5rem" }}>
        <div style={{ maxWidth:980, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"2.5rem", flexWrap:"wrap", gap:12 }}>
            <div><Label color={red}>Services</Label><h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(2.5rem,5vw,3.5rem)", letterSpacing:"0.06em", color:white, marginTop:10 }}>WHAT WE DO</h2></div>
            <Btn variant="outline" onClick={()=>setPage("services")} small>See all →</Btn>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:16 }}>
            {SERVICES.slice(0,3).map((s,i)=>{
              const Icon = SERVICE_ICONS[i];
              return (
                <div key={s.id} onClick={()=>setPage("services")} style={{ background:card, border:`1px solid ${border}`, borderTop:`3px solid ${red}`, borderRadius:10, padding:"1.6rem", cursor:"pointer" }}>
                  <div style={{ width:46, height:46, borderRadius:9, background:`${red}18`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}><Icon size={24}/></div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:8 }}>
                    <p style={{ fontSize:17, fontWeight:600, color:white }}>{s.name}</p>
                    <p style={{ fontSize:22, fontWeight:600, color:red }}>${s.price}</p>
                  </div>
                  <p style={{ fontSize:13, color:grey, lineHeight:1.7, marginBottom:10 }}>{s.desc}</p>
                  <p style={{ fontSize:11, color:greyLt }}>⏱ {s.duration}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Divider/>

      <section style={{ background:black, padding:"5rem 2.5rem" }}>
        <div style={{ maxWidth:980, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"2.5rem", flexWrap:"wrap", gap:12 }}>
            <div><Label color={blue}>Our team</Label><h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(2.5rem,5vw,3.5rem)", letterSpacing:"0.06em", color:white, marginTop:10 }}>MEET THE BARBERS</h2></div>
            <Btn variant="outline" onClick={()=>setPage("barbers")} small>Full profiles →</Btn>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:16 }}>
            {BARBERS.map(b=>(
              <div key={b.id} onClick={()=>setPage("barbers")} style={{ background:card, border:`1px solid ${border}`, borderLeft:`4px solid ${b.color}`, borderRadius:10, padding:"1.75rem", cursor:"pointer" }}>
                <div style={{ marginBottom:"1rem" }}><BarberAvatar b={b} size={54}/></div>
                <p style={{ fontSize:17, fontWeight:600, color:white, marginBottom:3 }}>{b.name}</p>
                <p style={{ fontSize:12, color:b.color, fontWeight:600, letterSpacing:"0.04em", marginBottom:8 }}>{b.role}</p>
                <p style={{ fontSize:12, color:grey, lineHeight:1.7, fontWeight:400 }}>{b.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ background:blue, padding:"4rem 2rem", textAlign:"center" }}>
        <div style={{ display:"flex", justifyContent:"center", marginBottom:"1.25rem" }}><BarberPole size={28}/></div>
        <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(2.5rem,6vw,3.75rem)", letterSpacing:"0.06em", color:"#fff", marginBottom:"0.75rem" }}>READY FOR YOUR NEXT CUT?</h2>
        <p style={{ fontSize:15, fontWeight:300, color:"rgba(255,255,255,0.75)", marginBottom:"2rem" }}>Walk-ins welcome — booking ahead guarantees your spot.</p>
        <Btn variant="white" onClick={()=>setPage("book")} style={{ fontSize:15, padding:"14px 32px" }}>Book your appointment →</Btn>
      </div>
    </div>
  );
}

// ─── Services page ───────────────────────────────────────────────────────────
function ServicesPage({ setPage, setBookingService }) {
  return (
    <div style={{ background:black, minHeight:"100vh", padding:"3.5rem 2.5rem" }}>
      <div style={{ maxWidth:980, margin:"0 auto" }}>
        <Label color={red}>Pricing</Label>
        <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(3rem,7vw,4.5rem)", letterSpacing:"0.06em", color:white, margin:"12px 0 8px" }}>OUR SERVICES</h1>
        <p style={{ fontSize:14, color:grey, marginBottom:"3rem", fontWeight:300 }}>All services include a hot towel finish and styling product. Walk-ins welcome.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:18 }}>
          {SERVICES.map((s,i)=>{
            const Icon = SERVICE_ICONS[i];
            return (
              <div key={s.id} style={{ background:card, border:`1px solid ${border}`, borderTop:`3px solid ${red}`, borderRadius:10, padding:"1.75rem", display:"flex", flexDirection:"column" }}>
                <div style={{ width:48, height:48, borderRadius:10, background:`${red}18`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 }}><Icon size={26}/></div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:10 }}>
                  <p style={{ fontSize:18, fontWeight:600, color:white }}>{s.name}</p>
                  <p style={{ fontSize:24, fontWeight:600, color:red }}>${s.price}</p>
                </div>
                <p style={{ fontSize:13, color:grey, lineHeight:1.8, marginBottom:14, flex:1 }}>{s.desc}</p>
                <p style={{ fontSize:12, color:greyLt, marginBottom:18 }}>⏱ {s.duration}</p>
                <Btn full onClick={()=>{ setBookingService(s); setPage("book"); }}>Book this →</Btn>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Barbers page ────────────────────────────────────────────────────────────
function BarbersPage({ setPage, setBookingBarber }) {
  return (
    <div style={{ background:black, minHeight:"100vh", padding:"3.5rem 2.5rem" }}>
      <div style={{ maxWidth:980, margin:"0 auto" }}>
        <Label color={blue}>The team</Label>
        <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(3rem,7vw,4.5rem)", letterSpacing:"0.06em", color:white, margin:"12px 0 8px" }}>OUR BARBERS</h1>
        <p style={{ fontSize:14, color:grey, marginBottom:"3rem", fontWeight:300 }}>Every barber at ZCUTZ is fully trained and passionate about their craft.</p>
        <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
          {BARBERS.map(b=>(
            <div key={b.id} style={{ background:card, border:`1px solid ${border}`, borderLeft:`4px solid ${b.color}`, borderRadius:12, overflow:"hidden", display:"flex", flexWrap:"wrap" }}>
            {/* Large photo panel */}
            <div style={{ width:220, flexShrink:0, position:"relative" }}>
            <img src={b.img} alt={b.name} style={{ width:"100%", height:"100%", minHeight:260, objectFit:"cover", objectPosition: b.id===2 ? "center top" : "20% top", display:"block" }}/>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"8px 12px", background:"rgba(0,0,0,0.55)" }}>
                <p style={{ fontSize:10, color:greyLt }}>{b.exp} experience</p>
              </div>
            </div>
            <div style={{ flex:1, minWidth:200, padding:"2rem" }}>
                <p style={{ fontSize:21, fontWeight:600, color:white, marginBottom:3 }}>{b.name}</p>
                <p style={{ fontSize:12, color:b.color, fontWeight:600, letterSpacing:"0.04em", marginBottom:10 }}>{b.role}</p>
                <p style={{ fontSize:14, color:grey, lineHeight:1.8, fontWeight:400, marginBottom:"1.25rem" }}>{b.bio}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:"1.5rem" }}>
                  {b.specialty.map(tag=>(
                    <span key={tag} style={{ fontSize:11, color:greyLt, background:black, border:`1px solid ${border}`, borderRadius:4, padding:"3px 11px" }}>{tag}</span>
                  ))}
                </div>
                <Btn onClick={()=>{ setBookingBarber(b); setPage("book"); }}>Book with {b.name.split(" ")[0]} →</Btn>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Booking ─────────────────────────────────────────────────────────────────
function Breadcrumb({ step }) {
  const crumbs = ["Service","Barber","Date & Time","Details"];
  return (
    <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:"1.5rem", flexWrap:"wrap" }}>
      {crumbs.map((c,i)=>{
        const idx=i+1, done=step>idx, active=step===idx;
        return (
          <div key={c} style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ fontSize:12, fontWeight:active?600:400, color:done?green:active?red:grey, textDecoration:done?"underline":"none" }}>
              {done?"✓ ":""}{c}
            </span>
            {i<crumbs.length-1 && <span style={{ color:border, fontSize:12 }}>›</span>}
          </div>
        );
      })}
    </div>
  );
}

function StepIcon({ step, active }) {
  const c = active ? red : greyLt;
  const icons = [null,
    <svg key="1" width="14" height="14" viewBox="0 0 28 28" fill="none"><circle cx="7" cy="20" r="3.5" stroke={c} strokeWidth="1.8" fill="none"/><circle cx="21" cy="20" r="3.5" stroke={c} strokeWidth="1.8" fill="none"/><line x1="9.5" y1="17.5" x2="20" y2="5" stroke={c} strokeWidth="1.8" strokeLinecap="round"/><line x1="18.5" y1="17.5" x2="8" y2="5" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
    <svg key="2" width="14" height="14" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="10" r="5" stroke={c} strokeWidth="1.8" fill="none"/><path d="M5 26 Q5 18 14 18 Q23 18 23 26" stroke={c} strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>,
    <svg key="3" width="14" height="14" viewBox="0 0 28 28" fill="none"><rect x="4" y="6" width="20" height="18" rx="2.5" stroke={c} strokeWidth="1.7" fill="none"/><line x1="4" y1="12" x2="24" y2="12" stroke={c} strokeWidth="1.4"/><line x1="10" y1="3" x2="10" y2="9" stroke={c} strokeWidth="1.7" strokeLinecap="round"/><line x1="18" y1="3" x2="18" y2="9" stroke={c} strokeWidth="1.7" strokeLinecap="round"/><circle cx="10" cy="17" r="1.5" fill={c}/><circle cx="14" cy="17" r="1.5" fill={c}/><circle cx="18" cy="17" r="1.5" fill={c}/></svg>,
    <svg key="4" width="14" height="14" viewBox="0 0 28 28" fill="none"><rect x="5" y="3" width="18" height="22" rx="2.5" stroke={c} strokeWidth="1.7" fill="none"/><line x1="9" y1="10" x2="19" y2="10" stroke={c} strokeWidth="1.4" strokeLinecap="round"/><line x1="9" y1="15" x2="19" y2="15" stroke={c} strokeWidth="1.4" strokeLinecap="round"/><line x1="9" y1="20" x2="15" y2="20" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>,
  ];
  return icons[step]||null;
}

const STEP_LABELS = ["","Choose service","Choose barber","Pick date & time","Your details"];

function BookingPage({ preService, preBarber }) {
  const today = new Date();
  const [step,    setStep]    = useState(1);
  const [service, setService] = useState(preService||null);
  const [barber,  setBarber]  = useState(preBarber||null);
  const [calY,    setCalY]    = useState(today.getFullYear());
  const [calM,    setCalM]    = useState(today.getMonth());
  const [date,    setDate]    = useState(null);
  const [time,    setTime]    = useState(null);
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [phone,   setPhone]   = useState("");
  const [errors,  setErrors]  = useState({});
  const [selAlert,setSelAlert]= useState(null);

  const showAlert = (msg) => { setSelAlert(msg); setTimeout(()=>setSelAlert(null), 2200); };
  const totalDays = daysInMonth(calY,calM);
  const startDay  = firstDayOf(calY,calM);

  const validateAndNext = () => {
    if (step===1 && !service)  { setErrors({ service:"Please select a service to continue." }); return; }
    if (step===2 && !barber)   { setErrors({ barber:"Please choose a barber to continue." }); return; }
    if (step===3) {
      if (!date) { setErrors({ date:"Please select a date." }); return; }
      if (!time) { setErrors({ time:"Please select a time slot." }); return; }
    }
    if (step===4) {
      const e={};
      if (!name.trim())  e.name  = "Full name is required.";
      if (!email.trim()) e.email = "Email address is required.";
      else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Please enter a valid email address.";
      if (!phone.trim()) e.phone = "Phone number is required.";
      if (Object.keys(e).length) { setErrors(e); return; }
    }
    setErrors({});
    setStep(s=>s+1);
  };

  return (
    <div style={{ background:black, minHeight:"100vh", padding:"3.5rem 2.5rem" }}>
      <div style={{ maxWidth:680, margin:"0 auto" }}>
        <Label color={red}>Appointment</Label>
        <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(2.75rem,6vw,4rem)", letterSpacing:"0.06em", color:white, margin:"12px 0 1.5rem" }}>BOOK A SESSION</h1>

        {step<5 && <Breadcrumb step={step}/>}

        {step<5 && (
          <>
            <div style={{ display:"flex", gap:4, marginBottom:10 }}>
              {[1,2,3,4].map(i=>(
                <div key={i} style={{ flex:1, height:4, borderRadius:2, background:step>=i?red:border, opacity:step>=i?1:0.35, transition:"background 0.3s" }}/>
              ))}
            </div>
            <div style={{ display:"flex", marginBottom:"2rem" }}>
              {[1,2,3,4].map(i=>(
                <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                  <div style={{ width:28, height:28, borderRadius:"50%", background:step===i?`${red}22`:step>i?`${green}18`:"transparent", border:`1px solid ${step>i?green:step===i?red:border}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    {step>i ? <span style={{ color:green, fontSize:11, fontWeight:700 }}>✓</span> : <StepIcon step={i} active={step>=i}/>}
                  </div>
                  <span style={{ fontSize:9, color:step===i?red:step>i?green:grey, fontWeight:step===i?600:400, textAlign:"center" }}>
                    {STEP_LABELS[i].split(" ").slice(0,2).join(" ")}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {selAlert && <Alert type="success">{selAlert}</Alert>}

        {step===1 && (
          <div>
            <h2 style={{ fontSize:18, fontWeight:600, color:white, marginBottom:"1.25rem" }}>Which service?</h2>
            {errors.service && <Alert type="error">{errors.service}</Alert>}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:10 }}>
              {SERVICES.map((s,i)=>{
                const Icon = SERVICE_ICONS[i];
                const sel  = service?.id===s.id;
                return (
                  <div key={s.id} onClick={()=>{ setService(s); setErrors({}); showAlert(`${s.name} selected — $${s.price}`); }}
                    style={{ background:sel?`${red}18`:card, border:`1px solid ${sel?red:border}`, borderRadius:8, padding:"1.1rem", cursor:"pointer", transition:"all 0.15s", position:"relative" }}>
                    <div style={{ position:"absolute", top:10, right:10 }}>
                      <RadioDot selected={sel} color={red}/>
                    </div>
                    <div style={{ marginBottom:8, marginTop:4 }}><Icon size={22} color={sel?red:greyLt}/></div>
                    <p style={{ fontSize:15, fontWeight:600, color:white, marginBottom:3 }}>{s.name}</p>
                    <p style={{ fontSize:12, color:sel?greyLt:grey }}>{s.duration} · ${s.price}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step===2 && (
          <div>
            <h2 style={{ fontSize:18, fontWeight:600, color:white, marginBottom:"1.25rem" }}>Choose your barber</h2>
            {errors.barber && <Alert type="error">{errors.barber}</Alert>}
            <p style={{ fontSize:12, color:grey, marginBottom:14 }}>Select one barber — single selection only.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {BARBERS.map(b=>{
                const sel = barber?.id===b.id;
                return (
                  <div key={b.id} onClick={()=>{ setBarber(b); setErrors({}); showAlert(`${b.name} selected`); }}
                    style={{ background:sel?`${blue}15`:card, border:`1px solid ${sel?blue:border}`, borderRadius:8, padding:"1rem 1.25rem", cursor:"pointer", display:"flex", alignItems:"center", gap:14, transition:"all 0.15s" }}>
                    <RadioDot selected={sel} color={blue}/>
                    <BarberAvatar b={b} size={46} border_color={sel?b.color:border}/>
                    <div style={{ flex:1 }}>
                      <p style={{ fontSize:15, fontWeight:600, color:white }}>{b.name}</p>
                      <p style={{ fontSize:12, color:sel?greyLt:grey }}>{b.role} · {b.exp}</p>
                      <p style={{ fontSize:11, color:grey, marginTop:2 }}>{b.specialty.join(" · ")}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step===3 && (
          <div>
            <h2 style={{ fontSize:18, fontWeight:600, color:white, marginBottom:"1.25rem" }}>Pick a date & time</h2>
            {errors.date && <Alert type="error">{errors.date}</Alert>}
            {errors.time && <Alert type="error">{errors.time}</Alert>}
            <div style={{ background:card, border:`1px solid ${border}`, borderRadius:10, padding:"1.25rem", marginBottom:16 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem" }}>
                <Btn variant="ghost" onClick={()=>{ if(calM===0){setCalM(11);setCalY(y=>y-1);}else setCalM(m=>m-1); }}>‹</Btn>
                <span style={{ fontSize:15, fontWeight:600, color:white }}>{MONTHS[calM]} {calY}</span>
                <Btn variant="ghost" onClick={()=>{ if(calM===11){setCalM(0);setCalY(y=>y+1);}else setCalM(m=>m+1); }}>›</Btn>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3, marginBottom:6 }}>
                {DAYS.map(d=><div key={d} style={{ textAlign:"center", fontSize:10, color:grey, fontWeight:600 }}>{d}</div>)}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3 }}>
                {Array.from({length:startDay},(_,i)=><div key={"p"+i}/>)}
                {Array.from({length:totalDays},(_,i)=>{
                  const day=i+1, ds=`${MONTHS[calM]} ${day}, ${calY}`;
                  const past=new Date(calY,calM,day)<new Date(today.getFullYear(),today.getMonth(),today.getDate());
                  const sel=date===ds;
                  return <div key={day} onClick={()=>{ if(!past){ setDate(ds); setErrors(e=>({...e,date:null})); showAlert(`${ds} selected`); }}}
                    style={{ textAlign:"center", fontSize:12, padding:"7px 0", borderRadius:5, cursor:past?"default":"pointer", background:sel?red:"transparent", color:past?border:sel?"#fff":white, transition:"background 0.1s" }}>{day}</div>;
                })}
              </div>
            </div>
            {date && (
              <div>
                <p style={{ fontSize:13, color:grey, marginBottom:10 }}>Available slots — {date}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {TIMES.map(t=>{
                    const sel=time===t;
                    return <div key={t} onClick={()=>{ setTime(t); setErrors(e=>({...e,time:null})); showAlert(`${t} selected`); }}
                      style={{ padding:"9px 14px", borderRadius:6, cursor:"pointer", fontSize:13, fontWeight:500, background:sel?red:card, border:`1px solid ${sel?red:border}`, color:sel?"#fff":white, transition:"all 0.15s" }}>{t}</div>;
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {step===4 && (
          <div>
            <h2 style={{ fontSize:18, fontWeight:600, color:white, marginBottom:4 }}>Your details</h2>
            <p style={{ fontSize:13, color:grey, fontWeight:300, marginBottom:"1.5rem" }}>Almost there — just a few details to confirm your booking.</p>
            <div style={{ background:card, border:`1px solid ${border}`, borderTop:`3px solid ${red}`, borderRadius:10, padding:"1.25rem", marginBottom:"1.75rem" }}>
              <p style={{ fontSize:11, color:red, fontWeight:600, letterSpacing:"0.1em", marginBottom:12 }}>BOOKING SUMMARY</p>
              {[["Service",service?.name],["Barber",barber?.name],["Date",date],["Time",time],["Duration",service?.duration],["Price",`$${service?.price}`]].map(([k,v])=>(
                <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <span style={{ fontSize:13, color:grey }}>{k}</span>
                  <span style={{ fontSize:13, color:k==="Price"?red:white, fontWeight:k==="Price"?600:400 }}>{v}</span>
                </div>
              ))}
            </div>
            <FormField label="Full name"     value={name}  onChange={e=>{ setName(e.target.value);  setErrors(er=>({...er,name:null}));  }} placeholder="e.g. Marcus Johnson"   error={errors.name}/>
            <FormField label="Email address" type="email"  value={email} onChange={e=>{ setEmail(e.target.value); setErrors(er=>({...er,email:null})); }} placeholder="e.g. marcus@email.com" error={errors.email}/>
            <FormField label="Phone number"  type="tel"    value={phone} onChange={e=>{ setPhone(e.target.value); setErrors(er=>({...er,phone:null})); }} placeholder="e.g. (613) 555-0192"   error={errors.phone}/>
          </div>
        )}

        {step===5 && (
          <div style={{ textAlign:"center", padding:"3rem 1rem", animation:"fadeIn 0.4s ease" }}>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:"1.25rem" }}><BarberPole size={38}/></div>
            <div style={{ width:58, height:58, borderRadius:"50%", background:green, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, color:"#fff", margin:"0 auto 1.25rem" }}>✓</div>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(2.5rem,6vw,3.5rem)", letterSpacing:"0.06em", color:white, marginBottom:"0.75rem" }}>YOU'RE ALL SET!</h2>
            <div style={{ maxWidth:420, margin:"0 auto 1.5rem" }}>
              <Alert type="success">Booking confirmed! Confirmation sent to {email}</Alert>
            </div>
            <div style={{ background:card, border:`1px solid ${border}`, borderTop:`3px solid ${green}`, borderRadius:10, padding:"1.25rem", maxWidth:380, margin:"0 auto 2.5rem", textAlign:"left" }}>
              {[["Service",service?.name],["Barber",barber?.name],["Date",date],["Time",time],["Price",`$${service?.price}`]].map(([k,v])=>(
                <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <span style={{ fontSize:13, color:grey }}>{k}</span>
                  <span style={{ fontSize:13, color:k==="Price"?green:white, fontWeight:k==="Price"?600:400 }}>{v}</span>
                </div>
              ))}
            </div>
            <Btn onClick={()=>{ setStep(1);setService(null);setBarber(null);setDate(null);setTime(null);setName("");setEmail("");setPhone("");setErrors({}); }}>Book another appointment</Btn>
          </div>
        )}

        {step<5 && (
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:"2.5rem" }}>
            {step>1?<Btn variant="outline" onClick={()=>{ setStep(s=>s-1); setErrors({}); }}>← Back</Btn>:<div/>}
            <Btn onClick={validateAndNext}>{step===4?"Confirm booking →":"Continue →"}</Btn>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function ContactPage() {
  const [formErrors, setFormErrors] = useState({});
  const [submitted,  setSubmitted]  = useState(false);
  const [fields,     setFields]     = useState({ name:"", email:"", message:"" });

  const handleSubmit = () => {
    const e={};
    if (!fields.name.trim())    e.name    = "Name is required.";
    if (!fields.email.trim())   e.email   = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(fields.email)) e.email = "Please enter a valid email.";
    if (!fields.message.trim()) e.message = "Please write a message.";
    if (Object.keys(e).length) { setFormErrors(e); return; }
    setSubmitted(true); setFormErrors({});
  };

  return (
    <div style={{ background:black, minHeight:"100vh", padding:"3.5rem 2.5rem" }}>
      <div style={{ maxWidth:820, margin:"0 auto" }}>
        <Label color={red}>Find us</Label>
        <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(3rem,7vw,4.5rem)", letterSpacing:"0.06em", color:white, margin:"12px 0 2.5rem" }}>CONTACT US</h1>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(175px,1fr))", gap:14, marginBottom:"2.5rem" }}>
          {[{label:"Address",val:"218 Bank St\nOttawa, ON K2P 1X1"},{label:"Phone",val:"(613) 555-0192"},{label:"Email",val:"hello@zcutz.ca"},{label:"Hours",val:"Mon–Fri  9am–7pm\nSat  9am–5pm\nSun  Closed"}].map(item=>(
            <div key={item.label} style={{ background:card, border:`1px solid ${border}`, borderTop:`3px solid ${red}`, borderRadius:10, padding:"1.25rem" }}>
              <p style={{ fontSize:10, color:red, fontWeight:600, letterSpacing:"0.15em", marginBottom:10 }}>{item.label.toUpperCase()}</p>
              <p style={{ fontSize:13, color:white, lineHeight:1.9, whiteSpace:"pre-line", fontWeight:400 }}>{item.val}</p>
            </div>
          ))}
        </div>
        <div style={{ background:card, border:`1px solid ${border}`, borderRadius:10, padding:"1.75rem" }}>
          <p style={{ fontSize:16, fontWeight:600, color:white, marginBottom:"1.25rem" }}>Send us a message</p>
          {submitted
            ? <Alert type="success">Message sent! We will get back to you within 24 hours.</Alert>
            : (
              <>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <FormField label="Full name"     value={fields.name}  onChange={e=>setFields(f=>({...f,name:e.target.value}))}  placeholder="Your name"       error={formErrors.name}/>
                  <FormField label="Email address" type="email" value={fields.email} onChange={e=>setFields(f=>({...f,email:e.target.value}))} placeholder="your@email.com" error={formErrors.email}/>
                </div>
                <div style={{ marginBottom:14 }}>
                  <label style={{ display:"block", fontSize:11, fontWeight:600, color:greyLt, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:5 }}>Message</label>
                  <textarea value={fields.message} onChange={e=>setFields(f=>({...f,message:e.target.value}))} placeholder="How can we help?" rows={4}
                    style={{ width:"100%", padding:"11px 15px", background:black, border:`1px solid ${formErrors.message?red:border}`, borderRadius:6, color:white, fontSize:14, fontFamily:"'Barlow',sans-serif", outline:"none", resize:"vertical" }}/>
                  {formErrors.message && <p style={{ fontSize:11, color:"#fca5a5", marginTop:4 }}>⚠ {formErrors.message}</p>}
                </div>
                <Btn onClick={handleSubmit}>Send message →</Btn>
              </>
            )
          }
        </div>
      </div>
    </div>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background:offBlack, borderTop:`1px solid ${border}`, padding:"2.5rem" }}>
      <div style={{ maxWidth:980, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"2rem" }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
            <BarberPole size={16}/>
            <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:"0.3em", color:white }}>ZCUTZ</span>
          </div>
          <p style={{ fontSize:12, color:grey, fontWeight:400 }}>Ottawa's premier barbershop.</p>
          <p style={{ fontSize:12, color:grey, fontWeight:400 }}>218 Bank St · (613) 555-0192</p>
        </div>
        <div style={{ display:"flex", gap:"3rem", flexWrap:"wrap" }}>
          <div>
            <p style={{ fontSize:10, color:red, fontWeight:600, letterSpacing:"0.15em", marginBottom:10 }}>NAVIGATE</p>
            {["home","services","barbers","book","contact"].map(p=>(
              <p key={p} onClick={()=>setPage(p)} style={{ fontSize:13, color:grey, marginBottom:5, cursor:"pointer", fontWeight:400, textTransform:"capitalize" }}>{p}</p>
            ))}
          </div>
          <div>
            <p style={{ fontSize:10, color:red, fontWeight:600, letterSpacing:"0.15em", marginBottom:10 }}>HOURS</p>
            {["Mon–Fri  9am–7pm","Sat  9am–5pm","Sun  Closed"].map(h=>(
              <p key={h} style={{ fontSize:13, color:grey, marginBottom:5, fontWeight:400 }}>{h}</p>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth:980, margin:"1.5rem auto 0", borderTop:`1px solid ${border}`, paddingTop:"1.25rem", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
        <p style={{ fontSize:11, color:grey }}>© 2026 ZCUTZ Barbershop</p>
        <p style={{ fontSize:11, color:greyLt }}>Designed by Zain Rizvi · SEG3125 Assignment 2</p>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page,           setPage]           = useState("home");
  const [bookingService, setBookingService] = useState(null);
  const [bookingBarber,  setBookingBarber]  = useState(null);

  const renderPage = () => {
    switch (page) {
      case "home":     return <HomePage     setPage={setPage}/>;
      case "services": return <ServicesPage setPage={setPage} setBookingService={setBookingService}/>;
      case "barbers":  return <BarbersPage  setPage={setPage} setBookingBarber={setBookingBarber}/>;
      case "book":     return <BookingPage  preService={bookingService} preBarber={bookingBarber}/>;
      case "contact":  return <ContactPage/>;
      default:         return <HomePage     setPage={setPage}/>;
    }
  };

  return (
    <div style={{ minHeight:"100vh", background:black }}>
      <Navbar page={page} setPage={setPage}/>
      {renderPage()}
      <Footer setPage={setPage}/>
    </div>
  );
}