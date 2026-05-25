import { useState, useEffect, useRef } from "react";

const ADMIN_PASS = "annie2024";
const OWNER = {
  phone: "0639644388",
  phoneDisplay: "063 964 4388",
  email: "bangkokcondo.th@gmail.com",
  ig: "realestate_ann",
  igUrl: "https://www.instagram.com/realestate_ann",
  lineId: "97b2blaq",
  whatsapp: "66639644388",
};

const SEED = [
  { id:1, title:"Rhythm Sukhumvit 42", location:"Sukhumvit, Bangkok", type:"Condo", status:"For Sale", price:"฿5,200,000", beds:1, baths:1, sqm:34, floor:"12", totalFloors:"35", furnished:"Fully Furnished", available:"Now", maintenance:"฿3,500/mo", parking:"1 slot", pets:"Not allowed", facilities:"Pool, Gym, Security, Lobby", bts:"Ekkamai BTS — 5 min walk", imgs:["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80","https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80","https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"], tag:"New" },
  { id:2, title:"Pool Villa Rawai", location:"Rawai, Phuket", type:"House", status:"For Rent", price:"฿85,000/mo", beds:4, baths:3, sqm:320, floor:"1", totalFloors:"2", furnished:"Fully Furnished", available:"Now", maintenance:"Included", parking:"2 slots", pets:"Allowed", facilities:"Private Pool, Garden, Security", bts:"5 min to Rawai Beach", imgs:["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80","https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80","https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"], tag:"Hot" },
  { id:3, title:"Nimman Studio", location:"Nimmanhaemin, Chiang Mai", type:"Apartment", status:"For Rent", price:"฿18,000/mo", beds:1, baths:1, sqm:42, floor:"4", totalFloors:"8", furnished:"Fully Furnished", available:"Now", maintenance:"฿800/mo", parking:"1 slot", pets:"Not allowed", facilities:"Pool, Gym, Co-working space", bts:"Walk to Maya Mall — 3 min", imgs:["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80","https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80","https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"], tag:"Popular" },
  { id:4, title:"Thonglor Townhouse", location:"Thonglor, Bangkok", type:"House", status:"For Sale", price:"฿12,900,000", beds:3, baths:3, sqm:220, floor:"1-3", totalFloors:"3", furnished:"Partially Furnished", available:"Now", maintenance:"฿2,000/mo", parking:"2 slots", pets:"Allowed", facilities:"Rooftop, Garden, Security", bts:"Thonglor BTS — 8 min walk", imgs:["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80","https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80","https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80"], tag:"New" },
  { id:5, title:"Oceanview Penthouse", location:"Patong, Phuket", type:"Condo", status:"For Sale", price:"฿28,000,000", beds:3, baths:3, sqm:145, floor:"18", totalFloors:"18", furnished:"Fully Furnished", available:"Now", maintenance:"฿8,500/mo", parking:"2 slots", pets:"Not allowed", facilities:"Infinity Pool, Gym, Concierge, Sky Lounge", bts:"Patong Beach — 3 min drive", imgs:["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80","https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80","https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"], tag:"Luxury" },
  { id:6, title:"Lanna Heritage Villa", location:"Old City, Chiang Mai", type:"House", status:"For Rent", price:"฿45,000/mo", beds:3, baths:2, sqm:210, floor:"1-2", totalFloors:"2", furnished:"Fully Furnished", available:"Now", maintenance:"Included", parking:"2 slots", pets:"Allowed", facilities:"Garden, Pool, Traditional Design", bts:"Inside Old City Moat — walk everywhere", imgs:["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80","https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80","https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"], tag:"Featured" },
];

const TAG_COLORS = { New:"#2563EB", Hot:"#DC2626", Popular:"#16A34A", Luxury:"#7C3AED", Featured:"#D97706", Reduced:"#EA580C" };
const ALL_TYPES  = ["All","Condo","House","Apartment"];
const ALL_CITIES = ["Bangkok","Phuket","Chiang Mai","Pattaya","Hua Hin","Koh Samui"];
const ALL_TAGS   = Object.keys(TAG_COLORS);

const S = {
  inp: (extra) => ({ width:"100%", padding:"10px 12px", border:"1.5px solid #E5DDD3", borderRadius:10, fontSize:13, outline:"none", background:"#FDFAF6", color:"#1C1410", fontFamily:"'Outfit',sans-serif", transition:"border-color 0.2s", ...extra }),
  gold: { background:"linear-gradient(135deg,#C9A96E,#9B6B2A)", color:"#fff", border:"none", borderRadius:11, padding:"10px 22px", fontSize:13, fontWeight:700, cursor:"pointer" },
};

function onFG(e){ e.target.style.borderColor="#C9A96E"; }
function onBG(e){ e.target.style.borderColor="#E5DDD3"; }

/* ── Property Detail Modal ── */
function PropDetail({ p, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);
  const imgs = p.imgs || [p.img];
  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(p.location+", Thailand")}`;
  const waUrl = `https://wa.me/${OWNER.whatsapp}?text=${encodeURIComponent(`Hi Annie! I'm interested in ${p.title} at ${p.location} (${p.price}). Can you give me more details?`)}`;
  const lineUrl = `https://line.me/ti/p/~${OWNER.lineId}`;

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:400, display:"flex", alignItems:"center", justifyContent:"center", padding:16, backdropFilter:"blur(6px)" }}>
      <div style={{ background:"#fff", borderRadius:22, width:"100%", maxWidth:620, maxHeight:"92vh", overflowY:"auto" }}>
        {/* photo gallery */}
        <div style={{ position:"relative", height:280, overflow:"hidden", borderRadius:"22px 22px 0 0" }}>
          <img src={imgs[imgIdx]} alt={p.title} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,transparent 50%,rgba(0,0,0,0.5) 100%)" }}/>
          {/* close */}
          <button onClick={onClose} style={{ position:"absolute", top:14, right:14, width:36, height:36, borderRadius:"50%", border:"none", background:"rgba(0,0,0,0.5)", color:"#fff", fontSize:18, cursor:"pointer" }}>✕</button>
          {/* tag */}
          <span style={{ position:"absolute", top:14, left:14, background:TAG_COLORS[p.tag]||"#2563EB", color:"#fff", fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:20, textTransform:"uppercase", letterSpacing:"0.08em" }}>{p.tag}</span>
          {/* photo thumbnails */}
          {imgs.length > 1 && (
            <div style={{ position:"absolute", bottom:14, left:"50%", transform:"translateX(-50%)", display:"flex", gap:6 }}>
              {imgs.map((im, i) => (
                <div key={i} onClick={()=>setImgIdx(i)} style={{ width: i===imgIdx?28:8, height:8, borderRadius:4, background: i===imgIdx?"#fff":"rgba(255,255,255,0.5)", cursor:"pointer", transition:"all 0.2s" }}/>
              ))}
            </div>
          )}
          {/* arrow buttons */}
          {imgs.length > 1 && <>
            <button onClick={()=>setImgIdx((imgIdx-1+imgs.length)%imgs.length)} style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", width:32, height:32, borderRadius:"50%", border:"none", background:"rgba(0,0,0,0.4)", color:"#fff", fontSize:16, cursor:"pointer" }}>‹</button>
            <button onClick={()=>setImgIdx((imgIdx+1)%imgs.length)} style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", width:32, height:32, borderRadius:"50%", border:"none", background:"rgba(0,0,0,0.4)", color:"#fff", fontSize:16, cursor:"pointer" }}>›</button>
          </>}
          {/* photo count */}
          <div style={{ position:"absolute", bottom:14, right:14, background:"rgba(0,0,0,0.5)", color:"#fff", fontSize:11, fontWeight:600, padding:"3px 8px", borderRadius:10 }}>
            📷 {imgIdx+1}/{imgs.length}
          </div>
        </div>

        <div style={{ padding:"22px 24px" }}>
          {/* title + price */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6, flexWrap:"wrap", gap:8 }}>
            <div>
              <div style={{ fontSize:10, color:"#A89580", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>{p.type} · {p.status}</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, color:"#1C1410", lineHeight:1.2 }}>{p.title}</h2>
            </div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:"#B8893A" }}>{p.price}</div>
          </div>

          {/* location + maps */}
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16, flexWrap:"wrap" }}>
            <span style={{ fontSize:13, color:"#7B6A5A" }}>📍 {p.location}</span>
            <a href={mapsUrl} target="_blank" rel="noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:5, background:"#EFF6FF", color:"#2563EB", fontSize:12, fontWeight:700, padding:"5px 12px", borderRadius:20, textDecoration:"none", border:"1px solid #BFDBFE" }}>
              🗺 Open Google Maps
            </a>
          </div>

          {/* BTS / transport */}
          {p.bts && <div style={{ background:"#F0FDF4", border:"1px solid #BBF7D0", borderRadius:10, padding:"8px 12px", fontSize:12, color:"#166534", fontWeight:600, marginBottom:14 }}>
            🚇 {p.bts}
          </div>}

          {/* key stats */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(80px,1fr))", gap:10, marginBottom:16 }}>
            {[
              {e:"🛏", l:"Beds", v:p.beds},
              {e:"🚿", l:"Baths", v:p.baths},
              {e:"📐", l:"Area", v:`${p.sqm}m²`},
              {e:"🏢", l:"Floor", v:p.floor||"–"},
              {e:"🏗", l:"Total", v:`${p.totalFloors||"–"} fl`},
            ].map((x,i)=>(
              <div key={i} style={{ background:"#FDFAF6", border:"1px solid #EDE8E0", borderRadius:12, padding:"10px 8px", textAlign:"center" }}>
                <div style={{ fontSize:20, marginBottom:4 }}>{x.e}</div>
                <div style={{ fontWeight:700, color:"#1C1410", fontSize:14 }}>{x.v}</div>
                <div style={{ fontSize:10, color:"#A89580", textTransform:"uppercase", letterSpacing:"0.06em" }}>{x.l}</div>
              </div>
            ))}
          </div>

          {/* details grid */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:16 }}>
            {[
              {l:"Furnished", v:p.furnished||"–"},
              {l:"Available", v:p.available||"Now"},
              {l:"Maintenance", v:p.maintenance||"–"},
              {l:"Parking", v:p.parking||"–"},
              {l:"Pets", v:p.pets||"–"},
            ].map((x,i)=>(
              <div key={i} style={{ background:"#F7F3EE", borderRadius:10, padding:"10px 12px" }}>
                <div style={{ fontSize:10, color:"#A89580", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3 }}>{x.l}</div>
                <div style={{ fontSize:13, color:"#1C1410", fontWeight:600 }}>{x.v}</div>
              </div>
            ))}
          </div>

          {/* facilities */}
          {p.facilities && (
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:11, color:"#A89580", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:8 }}>Facilities</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {p.facilities.split(",").map((f,i)=>(
                  <span key={i} style={{ background:"#EFF6FF", color:"#2563EB", fontSize:11, fontWeight:600, padding:"4px 10px", borderRadius:20, border:"1px solid #BFDBFE" }}>✓ {f.trim()}</span>
                ))}
              </div>
            </div>
          )}

          {/* contact buttons */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginTop:8 }}>
            <a href={waUrl} target="_blank" rel="noreferrer"
              style={{ textDecoration:"none", background:"#25D366", color:"#fff", borderRadius:12, padding:"12px 8px", textAlign:"center", fontWeight:700, fontSize:13 }}>
              💬 WhatsApp
            </a>
            <a href={lineUrl} target="_blank" rel="noreferrer"
              style={{ textDecoration:"none", background:"#06C755", color:"#fff", borderRadius:12, padding:"12px 8px", textAlign:"center", fontWeight:700, fontSize:13 }}>
              💚 Line
            </a>
            <a href={mapsUrl} target="_blank" rel="noreferrer"
              style={{ textDecoration:"none", background:"#2563EB", color:"#fff", borderRadius:12, padding:"12px 8px", textAlign:"center", fontWeight:700, fontSize:13 }}>
              🗺 Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Card ── */
function Card({ p, idx, isAdmin, onEdit, onDel }) {
  const [liked, setLiked] = useState(false);
  const [vis, setVis] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const ref = useRef(null);
  const imgs = p.imgs || [p.img];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <>
      {showDetail && <PropDetail p={p} onClose={()=>setShowDetail(false)}/>}
      <div ref={ref} style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(32px)", transition:`opacity 0.5s ease ${idx*0.07}s, transform 0.5s ease ${idx*0.07}s`, background:"#fff", borderRadius:18, overflow:"hidden", border:"1px solid #EDE8E0", boxShadow:"0 2px 14px rgba(0,0,0,0.06)", cursor:"pointer" }}
        onClick={()=>!isAdmin && setShowDetail(true)}
        onMouseEnter={e=>{ e.currentTarget.style.boxShadow="0 14px 40px rgba(0,0,0,0.13)"; e.currentTarget.style.transform="translateY(-4px)"; }}
        onMouseLeave={e=>{ e.currentTarget.style.boxShadow="0 2px 14px rgba(0,0,0,0.06)"; e.currentTarget.style.transform="translateY(0)"; }}>

        {/* image */}
        <div style={{ position:"relative", height:210, overflow:"hidden" }}>
          <img src={imgs[0]} alt={p.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,transparent 40%,rgba(0,0,0,0.55) 100%)" }} />
          <span style={{ position:"absolute", top:12, left:12, background:TAG_COLORS[p.tag]||"#2563EB", color:"#fff", fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:20, letterSpacing:"0.08em", textTransform:"uppercase" }}>{p.tag}</span>
          {/* photo count badge */}
          {imgs.length > 1 && (
            <span style={{ position:"absolute", bottom:10, left:12, background:"rgba(0,0,0,0.55)", color:"#fff", fontSize:10, fontWeight:600, padding:"3px 8px", borderRadius:10 }}>
              📷 {imgs.length} photos
            </span>
          )}
          <div style={{ position:"absolute", top:10, right:10, display:"flex", gap:6 }}>
            {isAdmin ? (
              <>
                <button onClick={e=>{ e.stopPropagation(); onEdit(p); }} style={{ width:30, height:30, borderRadius:"50%", border:"none", background:"rgba(255,255,255,0.92)", cursor:"pointer", fontSize:14 }}>✏️</button>
                <button onClick={e=>{ e.stopPropagation(); onDel(p.id); }} style={{ width:30, height:30, borderRadius:"50%", border:"none", background:"rgba(255,255,255,0.92)", cursor:"pointer", fontSize:14 }}>🗑️</button>
              </>
            ) : (
              <button onClick={e=>{e.stopPropagation();setLiked(!liked);}} style={{ width:32, height:32, borderRadius:"50%", border:"none", background:"rgba(255,255,255,0.92)", cursor:"pointer", fontSize:16 }}>{liked?"❤️":"🤍"}</button>
            )}
          </div>
          <span style={{ position:"absolute", top:10, right:isAdmin?80:52, background:"rgba(255,255,255,0.15)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.28)", borderRadius:20, padding:"3px 10px", color:"#fff", fontSize:11, fontWeight:600 }}>{p.status}</span>
        </div>

        {/* body */}
        <div style={{ padding:"15px 17px 17px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", gap:8, marginBottom:5 }}>
            <div>
              <div style={{ fontSize:10, color:"#A89580", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:3 }}>{p.type}</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:700, color:"#1C1410", lineHeight:1.25 }}>{p.title}</div>
            </div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontWeight:700, color:"#B8893A", whiteSpace:"nowrap" }}>{p.price}</div>
          </div>

          <div style={{ fontSize:12, color:"#A89580", marginBottom:6 }}>📍 {p.location}</div>

          {/* BTS badge */}
          {p.bts && <div style={{ fontSize:11, color:"#166534", background:"#F0FDF4", border:"1px solid #BBF7D0", borderRadius:8, padding:"3px 8px", marginBottom:10, display:"inline-block", fontWeight:600 }}>
            🚇 {p.bts}
          </div>}

          <div style={{ height:1, background:"#F3EEE8", marginBottom:10 }} />

          <div style={{ display:"flex", gap:12, marginBottom:10 }}>
            {[`🛏 ${p.beds}`, `🚿 ${p.baths}`, `📐 ${p.sqm}m²`].map((v,i)=>(
              <span key={i} style={{ fontSize:12, color:"#6B5E52", fontWeight:500 }}>{v}</span>
            ))}
          </div>

          {/* furnished + pets */}
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:12 }}>
            {p.furnished && <span style={{ fontSize:10, background:"#F3EEE8", color:"#7B6A5A", padding:"2px 8px", borderRadius:10, fontWeight:600 }}>{p.furnished}</span>}
            {p.pets && <span style={{ fontSize:10, background: p.pets==="Allowed"?"#F0FDF4":"#FEF2F2", color: p.pets==="Allowed"?"#166534":"#DC2626", padding:"2px 8px", borderRadius:10, fontWeight:600 }}>{p.pets==="Allowed"?"🐾 Pet Friendly":"🚫 No Pets"}</span>}
            {p.parking && <span style={{ fontSize:10, background:"#EFF6FF", color:"#2563EB", padding:"2px 8px", borderRadius:10, fontWeight:600 }}>🚗 {p.parking}</span>}
          </div>

          {/* action buttons */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:7 }}>
            <a href={`https://wa.me/${OWNER.whatsapp}?text=${encodeURIComponent("Hi Annie! I'm interested in "+p.title+" ("+p.price+")")}`} target="_blank" rel="noreferrer"
              onClick={e=>e.stopPropagation()}
              style={{ textDecoration:"none", background:"#25D366", color:"#fff", borderRadius:10, padding:"8px 4px", textAlign:"center", fontWeight:700, fontSize:11 }}>
              💬 WhatsApp
            </a>
            <a href={`https://line.me/ti/p/~${OWNER.lineId}`} target="_blank" rel="noreferrer"
              onClick={e=>e.stopPropagation()}
              style={{ textDecoration:"none", background:"#06C755", color:"#fff", borderRadius:10, padding:"8px 4px", textAlign:"center", fontWeight:700, fontSize:11 }}>
              💚 Line
            </a>
            <a href={`https://www.google.com/maps/search/${encodeURIComponent(p.location+", Thailand")}`} target="_blank" rel="noreferrer"
              onClick={e=>e.stopPropagation()}
              style={{ textDecoration:"none", background:"#2563EB", color:"#fff", borderRadius:10, padding:"8px 4px", textAlign:"center", fontWeight:700, fontSize:11 }}>
              🗺 Maps
            </a>
          </div>

          {!isAdmin && <div style={{ textAlign:"center", marginTop:10, fontSize:12, color:"#C9A96E", fontWeight:600 }}>Tap card for full details & photos →</div>}
        </div>
      </div>
    </>
  );
}

/* ── Property Form Modal ── */
function PropForm({ init, onSave, onClose }) {
  const empty = { title:"", location:"", type:"Condo", status:"For Sale", price:"", beds:1, baths:1, sqm:0, imgs:[], img:"", tag:"New", floor:"", totalFloors:"", furnished:"Fully Furnished", available:"Now", maintenance:"", parking:"", pets:"Not allowed", facilities:"", bts:"" };
  const [f, setF] = useState(init || empty);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);
  const set = (k,v) => setF(x=>({...x,[k]:v}));
  const LBL = ({t}) => <label style={{ fontSize:11, fontWeight:700, color:"#7B6A5A", letterSpacing:"0.07em", textTransform:"uppercase", display:"block", marginBottom:5 }}>{t}</label>;

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    let loaded = 0;
    const newImgs = [...(f.imgs||[])];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        newImgs.push(ev.target.result);
        loaded++;
        if (loaded === files.length) {
          set("imgs", newImgs);
          set("img", newImgs[0]);
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImg = (i) => {
    const newImgs = (f.imgs||[]).filter((_,idx)=>idx!==i);
    set("imgs", newImgs);
    set("img", newImgs[0]||"");
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", backdropFilter:"blur(6px)", zIndex:500, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background:"#fff", borderRadius:22, padding:"28px 24px", width:"100%", maxWidth:560, maxHeight:"94vh", overflowY:"auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:"#1C1410" }}>{init?"✏️ Edit Listing":"➕ New Listing"}</h3>
          <button onClick={onClose} style={{ background:"#F3EEE8", border:"none", borderRadius:8, padding:"6px 12px", cursor:"pointer", fontWeight:600, fontSize:13 }}>✕ Close</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>

          {/* PHOTOS */}
          <div style={{ gridColumn:"1/-1" }}>
            <LBL t="Property Photos (tap to upload multiple)"/>
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={handlePhotoUpload} style={{ display:"none" }}/>
            <button onClick={()=>fileRef.current.click()} style={{ width:"100%", padding:"14px", border:"2px dashed #C9A96E", borderRadius:12, background:"#FFFBF5", color:"#9B6B2A", fontSize:14, fontWeight:600, cursor:"pointer", marginBottom:10 }}>
              {uploading ? "⏳ Uploading..." : "📸 Upload Photos from Camera Roll"}
            </button>
            {(f.imgs||[]).length > 0 && (
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {(f.imgs||[]).map((img,i)=>(
                  <div key={i} style={{ position:"relative" }}>
                    <img src={img} alt="" style={{ width:80, height:60, objectFit:"cover", borderRadius:8, border:"1.5px solid #E5DDD3" }}/>
                    <button onClick={()=>removeImg(i)} style={{ position:"absolute", top:-6, right:-6, width:20, height:20, borderRadius:"50%", border:"none", background:"#EF4444", color:"#fff", fontSize:11, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
                    {i===0 && <div style={{ position:"absolute", bottom:2, left:2, background:"#C9A96E", color:"#fff", fontSize:9, fontWeight:700, padding:"1px 5px", borderRadius:4 }}>MAIN</div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* text fields */}
          {[{label:"Title",k:"title",ph:"e.g. Condo Sukhumvit"},{label:"Location",k:"location",ph:"e.g. Sukhumvit, Bangkok"},{label:"Price",k:"price",ph:"฿5,200,000 or ฿35,000/mo"},{label:"BTS / Transport",k:"bts",ph:"e.g. Ekkamai BTS — 5 min walk"},{label:"Facilities",k:"facilities",ph:"Pool, Gym, Security"}].map(field=>(
            <div key={field.k} style={{ gridColumn:"1/-1" }}>
              <LBL t={field.label}/>
              <input value={f[field.k]||""} placeholder={field.ph} onChange={e=>set(field.k,e.target.value)} style={S.inp()} onFocus={onFG} onBlur={onBG}/>
            </div>
          ))}

          {[{label:"Type",k:"type",opts:["Condo","House","Apartment","Villa"]},{label:"Status",k:"status",opts:["For Sale","For Rent"]},{label:"Furnished",k:"furnished",opts:["Fully Furnished","Partially Furnished","Unfurnished"]},{label:"Pets",k:"pets",opts:["Allowed","Not allowed"]},{label:"Badge",k:"tag",opts:ALL_TAGS}].map(sel=>(
            <div key={sel.k}>
              <LBL t={sel.label}/>
              <select value={f[sel.k]||""} onChange={e=>set(sel.k,e.target.value)} style={S.inp({cursor:"pointer"})}>
                {sel.opts.map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
          ))}

          {[{label:"Beds",k:"beds"},{label:"Baths",k:"baths"},{label:"Area m²",k:"sqm"},{label:"Floor",k:"floor"},{label:"Total Floors",k:"totalFloors"}].map(n=>(
            <div key={n.k}>
              <LBL t={n.label}/>
              <input type="text" value={f[n.k]||""} onChange={e=>set(n.k,e.target.value)} style={S.inp()} onFocus={onFG} onBlur={onBG}/>
            </div>
          ))}

          {[{label:"Maintenance Fee",k:"maintenance",ph:"e.g. ฿3,500/mo"},{label:"Parking",k:"parking",ph:"e.g. 1 slot"},{label:"Available Date",k:"available",ph:"e.g. Now or 1 Jun 2026"}].map(field=>(
            <div key={field.k}>
              <LBL t={field.label}/>
              <input value={f[field.k]||""} placeholder={field.ph} onChange={e=>set(field.k,e.target.value)} style={S.inp()} onFocus={onFG} onBlur={onBG}/>
            </div>
          ))}

        </div>
        <div style={{ display:"flex", gap:10, marginTop:20 }}>
          <button onClick={onClose} style={{ flex:1, background:"#F3EEE8", color:"#6B5E52", border:"none", padding:"11px", borderRadius:11, fontSize:13, fontWeight:600, cursor:"pointer" }}>Cancel</button>
          <button onClick={()=>onSave({...f, img:f.imgs&&f.imgs[0]?f.imgs[0]:f.img})} style={{...S.gold,flex:2}}>{init?"Save Changes ✓":"Add Property ✓"}</button>
        </div>
      </div>
    </div>
  );
}

function AdminLogin({ onLogin }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const tryLogin = () => { if(pw===ADMIN_PASS) onLogin(); else setErr(true); };
  return (
    <div style={{ minHeight:"100vh", background:"#0F0A04", display:"flex", alignItems:"center", justifyContent:"center", padding:20, fontFamily:"'Outfit',sans-serif" }}>
      <div style={{ background:"#1C1410", border:"1px solid rgba(201,169,110,0.3)", borderRadius:22, padding:"44px 36px", width:"100%", maxWidth:380, textAlign:"center" }}>
        <div style={{ display:"flex", justifyContent:"center", marginBottom:14 }}>
          <svg width="52" height="48" viewBox="0 0 42 38">
            <path d="M2,20 L21,3 L40,20" fill="none" stroke="#F5E9D0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="8" y1="20" x2="8" y2="38" stroke="#F5E9D0" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
            <line x1="34" y1="20" x2="34" y2="38" stroke="#F5E9D0" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
            <line x1="21" y1="3" x2="21" y2="38" stroke="#F5E9D0" strokeWidth="1" strokeLinecap="round" opacity="0.15"/>
          </svg>
        </div>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:700, color:"#F5E9D0", marginBottom:4 }}>
          Bangkok <span style={{ color:"#C9A96E" }}>Property Finder</span>
        </div>
        <div style={{ color:"#7B6A5A", fontSize:13, marginBottom:28 }}>Admin Panel — Real Estate By Annie</div>
        <div style={{ textAlign:"left", marginBottom:14 }}>
          <label style={{ fontSize:11, fontWeight:700, color:"#7B6A5A", letterSpacing:"0.08em", textTransform:"uppercase", display:"block", marginBottom:7 }}>Password</label>
          <input type="password" value={pw} onChange={e=>{ setPw(e.target.value); setErr(false); }} onKeyDown={e=>e.key==="Enter"&&tryLogin()} placeholder="Enter password"
            style={S.inp({ background:"#261C10", color:"#F5E9D0", borderColor:err?"#EF4444":"rgba(201,169,110,0.25)" })}/>
          {err && <p style={{ color:"#EF4444", fontSize:12, marginTop:6 }}>❌ Wrong password. Try again.</p>}
        </div>
        <button onClick={tryLogin} style={{...S.gold, width:"100%", padding:"12px", fontSize:14}}>Sign In →</button>
      </div>
    </div>
  );
}

function AdminDash({ props, onAdd, onEdit, onDel, onLogout, onView }) {
  return (
    <div style={{ minHeight:"100vh", background:"#F7F3EE", fontFamily:"'Outfit',sans-serif" }}>
      <div style={{ background:"#1C1410", padding:"0 clamp(16px,4vw,40px)", borderBottom:"1px solid rgba(201,169,110,0.2)", position:"sticky", top:0, zIndex:50 }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:60 }}>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:700, color:"#F5E9D0" }}>
            <span style={{ display:"inline-flex", alignItems:"center", gap:10 }}>
              <svg width="24" height="22" viewBox="0 0 42 38">
                <path d="M2,20 L21,3 L40,20" fill="none" stroke="#F5E9D0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="8" y1="20" x2="8" y2="38" stroke="#F5E9D0" strokeWidth="1.5" strokeLinecap="round" opacity="0.25"/>
                <line x1="34" y1="20" x2="34" y2="38" stroke="#F5E9D0" strokeWidth="1.5" strokeLinecap="round" opacity="0.25"/>
              </svg>
              Bangkok <span style={{ color:"#C9A96E" }}>Property Finder</span> <span style={{ color:"#7B6A5A", fontSize:13, fontWeight:400 }}>Admin</span>
            </span>
          </span>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <span style={{ color:"#7B6A5A", fontSize:13 }}>Hi <b style={{ color:"#C9A96E" }}>Annie</b> 👋</span>
            <button onClick={onView} style={{ background:"rgba(201,169,110,0.1)", color:"#C9A96E", border:"1px solid rgba(201,169,110,0.3)", padding:"6px 14px", borderRadius:20, fontSize:12, fontWeight:600, cursor:"pointer" }}>👁 View Site</button>
            <button onClick={onLogout} style={{ background:"rgba(239,68,68,0.08)", color:"#EF4444", border:"1px solid rgba(239,68,68,0.25)", padding:"6px 14px", borderRadius:20, fontSize:12, fontWeight:600, cursor:"pointer" }}>🚪 Logout</button>
          </div>
        </div>
      </div>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"28px clamp(16px,4vw,40px)" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:14, marginBottom:26 }}>
          {[{e:"🏘️",n:props.length,l:"Total Listings",bg:"#1C1410",nc:"#C9A96E"},{e:"🏷️",n:props.filter(p=>p.status==="For Sale").length,l:"For Sale",bg:"#EFF6FF",nc:"#2563EB"},{e:"🔑",n:props.filter(p=>p.status==="For Rent").length,l:"For Rent",bg:"#F0FDF4",nc:"#16A34A"},{e:"👁️",n:"49",l:"Views / 30 days",bg:"#FFFBEB",nc:"#D97706"}].map((s,i)=>(
            <div key={i} style={{ background:s.bg, borderRadius:14, padding:"18px 16px", border:`1px solid ${s.nc}22` }}>
              <div style={{ fontSize:22, marginBottom:7 }}>{s.e}</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, fontWeight:700, color:s.nc, lineHeight:1 }}>{s.n}</div>
              <div style={{ fontSize:11, color:s.nc, marginTop:4, fontWeight:600, opacity:0.75 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18, flexWrap:"wrap", gap:12 }}>
          <div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, color:"#1C1410" }}>All Listings</h2>
            <p style={{ color:"#A89580", fontSize:13, marginTop:2 }}>Add, edit or remove your properties</p>
          </div>
          <button onClick={onAdd} style={{...S.gold, display:"flex", alignItems:"center", gap:7, padding:"10px 20px"}}>＋ Add New Property</button>
        </div>
        <div style={{ background:"#fff", borderRadius:18, overflow:"hidden", boxShadow:"0 3px 18px rgba(0,0,0,0.06)", border:"1px solid #EDE8E0" }}>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"'Outfit',sans-serif" }}>
              <thead>
                <tr style={{ background:"#1C1410" }}>
                  {["Photo + Title","Location","Type","Status","Price","Actions"].map(h=>(
                    <th key={h} style={{ padding:"12px 15px", textAlign:"left", fontSize:10, fontWeight:700, color:"#C9A96E", letterSpacing:"0.12em", textTransform:"uppercase", whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {props.length===0 && <tr><td colSpan={6} style={{ padding:"50px", textAlign:"center", color:"#A89580" }}><div style={{ fontSize:36, marginBottom:10 }}>📭</div><div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20 }}>No listings yet</div></td></tr>}
                {props.map((p,i)=>{
                  const imgs = p.imgs||[p.img];
                  return (
                  <tr key={p.id} style={{ borderBottom:"1px solid #F3EEE8", background:i%2===0?"#fff":"#FDFAF6" }}
                    onMouseEnter={e=>e.currentTarget.style.background="#FBF7F2"}
                    onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"#fff":"#FDFAF6"}>
                    <td style={{ padding:"11px 15px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{ position:"relative" }}>
                          <img src={imgs[0]} alt="" style={{ width:46, height:36, objectFit:"cover", borderRadius:8, flexShrink:0 }} onError={e=>e.target.src="https://placehold.co/46x36"}/>
                          {imgs.length>1 && <span style={{ position:"absolute", bottom:-4, right:-4, background:"#C9A96E", color:"#fff", fontSize:8, fontWeight:700, padding:"1px 4px", borderRadius:6 }}>{imgs.length}</span>}
                        </div>
                        <div>
                          <div style={{ fontSize:13, fontWeight:600, color:"#1C1410" }}>{p.title}</div>
                          <div style={{ fontSize:11, color:"#A89580" }}>{p.beds}bd · {p.baths}ba · {p.sqm}m²</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding:"11px 15px", fontSize:12, color:"#6B5E52", whiteSpace:"nowrap" }}>{p.location}</td>
                    <td style={{ padding:"11px 15px" }}><span style={{ background:"#F3EEE8", borderRadius:20, padding:"3px 9px", fontSize:11, fontWeight:600, color:"#7B6A5A" }}>{p.type}</span></td>
                    <td style={{ padding:"11px 15px" }}><span style={{ background:p.status==="For Sale"?"#EFF6FF":"#F0FDF4", borderRadius:20, padding:"3px 9px", fontSize:11, fontWeight:600, color:p.status==="For Sale"?"#2563EB":"#16A34A" }}>{p.status}</span></td>
                    <td style={{ padding:"11px 15px", fontSize:13, fontWeight:700, color:"#B8893A", whiteSpace:"nowrap" }}>{p.price}</td>
                    <td style={{ padding:"11px 15px" }}>
                      <div style={{ display:"flex", gap:7 }}>
                        <button onClick={()=>onEdit(p)} style={{ background:"#EFF6FF", color:"#2563EB", border:"none", padding:"6px 11px", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer" }}>✏️ Edit</button>
                        <button onClick={()=>onDel(p.id)} style={{ background:"#FEF2F2", color:"#EF4444", border:"none", padding:"6px 11px", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer" }}>🗑️ Delete</button>
                      </div>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ marginTop:22, display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))", gap:14 }}>
          <a href={OWNER.igUrl} target="_blank" rel="noreferrer" style={{ textDecoration:"none", background:"linear-gradient(135deg,#f09433,#dc2743,#bc1888)", borderRadius:14, padding:"18px 20px", display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:28 }}>📸</span>
            <div><div style={{ color:"rgba(255,255,255,0.7)", fontSize:10, fontWeight:700, textTransform:"uppercase" }}>Instagram</div><div style={{ color:"#fff", fontWeight:700, fontSize:15, marginTop:2 }}>@{OWNER.ig}</div></div>
            <span style={{ marginLeft:"auto", color:"rgba(255,255,255,0.6)", fontSize:20 }}>↗</span>
          </a>
          <div style={{ background:"#1C1410", borderRadius:14, padding:"18px 20px", border:"1px solid rgba(201,169,110,0.2)" }}>
            <div style={{ color:"#C9A96E", fontSize:10, fontWeight:700, textTransform:"uppercase", marginBottom:10 }}>Contact Info</div>
            <div style={{ color:"#C0B0A0", fontSize:13, marginBottom:6 }}>📞 {OWNER.phoneDisplay}</div>
            <div style={{ color:"#C0B0A0", fontSize:13, marginBottom:6 }}>✉️ {OWNER.email}</div>
            <div style={{ color:"#C0B0A0", fontSize:13 }}>💚 Line: {OWNER.lineId}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PublicSite({ props, isAdmin, onEditProp, onDelProp, onGoAdmin }) {
  const [city, setCity]       = useState("Bangkok");
  const [type, setType]       = useState("All");
  const [status, setStatus]   = useState("All");
  const [q, setQ]             = useState("");
  const [heroOn, setHeroOn]   = useState(false);
  const [contact, setContact] = useState({ name:"", email:"", msg:"" });
  const [sent, setSent]       = useState(false);

  useEffect(() => { const t = setTimeout(() => setHeroOn(true), 80); return () => clearTimeout(t); }, []);

  const shown = props.filter(p => {
    if (type !== "All" && p.type !== type) return false;
    if (status !== "All" && p.status !== status) return false;
    if (!p.location.toLowerCase().includes(city.toLowerCase())) return false;
    if (q && !p.title.toLowerCase().includes(q.toLowerCase()) && !p.location.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  const fadeUp = (d=0) => ({ opacity:heroOn?1:0, transform:heroOn?"translateY(0)":"translateY(24px)", transition:`opacity 0.75s ease ${d}s, transform 0.75s ease ${d}s` });

  return (
    <div style={{ fontFamily:"'Outfit',sans-serif", background:"#FDFAF6", color:"#1C1410", minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#C9A96E;border-radius:4px}
        input,select,textarea,button{font-family:'Outfit',sans-serif}
        @keyframes fadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
        @keyframes floatBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
      `}</style>

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, background:"rgba(253,250,246,0.98)", backdropFilter:"blur(18px)", borderBottom:"1px solid rgba(201,169,110,0.25)", boxShadow:"0 2px 20px rgba(0,0,0,0.06)", padding:"0 clamp(16px,4vw,48px)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            {/* Option 1 Style — Skyline + House Roof Logo */}
            <svg width="42" height="38" viewBox="0 0 100 90" style={{ flexShrink:0 }}>
              <defs>
                <linearGradient id="lg" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#C9A96E"/>
                  <stop offset="100%" stopColor="#7C4F1A"/>
                </linearGradient>
                <clipPath id="cr">
                  <polygon points="0,0 100,0 100,62 50,30 0,62"/>
                </clipPath>
              </defs>
              {/* Buildings clipped above roof line */}
              <g clipPath="url(#cr)" fill="url(#lg)">
                {/* Left rectangular buildings */}
                <rect x="4" y="40" width="9" height="50"/>
                <rect x="15" y="30" width="11" height="60"/>
                {/* Left small Thai spire */}
                <path d="M 28,62 C 26,54 25,46 27,39 C 28,33 31,29 34,29 C 37,29 40,33 41,39 C 43,46 42,54 40,62 Z"/>
                {/* Center main tall prang */}
                <path d="M 41,65 C 38,54 36,42 39,30 C 41,21 46,13 50,5 C 54,13 59,21 61,30 C 64,42 62,54 59,65 Z"/>
                {/* Right small Thai spire */}
                <path d="M 59,62 C 58,54 57,46 59,39 C 60,33 63,29 66,29 C 69,29 72,33 73,39 C 75,46 74,54 72,62 Z"/>
                {/* Right rectangular buildings */}
                <rect x="74" y="30" width="11" height="60"/>
                <rect x="87" y="40" width="9" height="50"/>
              </g>
              {/* House roof chevron */}
              <path d="M 0,62 L 50,30 L 100,62" fill="none" stroke="url(#lg)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              {/* House walls */}
              <line x1="0" y1="62" x2="0" y2="88" stroke="url(#lg)" strokeWidth="2.5"/>
              <line x1="100" y1="62" x2="100" y2="88" stroke="url(#lg)" strokeWidth="2.5"/>
              {/* Base */}
              <line x1="0" y1="88" x2="100" y2="88" stroke="url(#lg)" strokeWidth="1.5"/>
              {/* Door */}
              <path d="M 44,88 L 44,76 Q 50,71 56,76 L 56,88" fill="none" stroke="url(#lg)" strokeWidth="1.8"/>
            </svg>
            {/* Text */}
            <div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontWeight:700, color:"#1C1410", letterSpacing:"0.1em", lineHeight:1 }}>BANGKOK</div>
              <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:3 }}>
                <div style={{ width:10, height:"1px", background:"#9B6B2A" }}/>
                <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:8, color:"#9B6B2A", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:600 }}>Property Finder</span>
                <div style={{ width:10, height:"1px", background:"#9B6B2A" }}/>
              </div>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:20 }}>
            {["Buy","Rent","Contact"].map(l=>(
              <a key={l} href={`#${l.toLowerCase()}`} style={{ color:"#6B5E52", fontSize:13, fontWeight:500, textDecoration:"none", letterSpacing:"0.04em" }}
                onMouseEnter={e=>e.target.style.color="#C9A96E"} onMouseLeave={e=>e.target.style.color="#6B5E52"}>{l}</a>
            ))}
            <a href={OWNER.igUrl} target="_blank" rel="noreferrer" style={{ color:"#6B5E52", fontSize:12, fontWeight:500, textDecoration:"none" }}
              onMouseEnter={e=>e.target.style.color="#E1306C"} onMouseLeave={e=>e.target.style.color="#6B5E52"}>
              📸 @{OWNER.ig}
            </a>
            <button onClick={onGoAdmin} style={{ background:"linear-gradient(135deg,#C9A96E,#9B6B2A)", color:"#fff", border:"none", padding:"7px 16px", borderRadius:20, fontSize:12, fontWeight:600, cursor:"pointer", letterSpacing:"0.03em" }}>🔐 Admin</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position:"relative", minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", overflow:"hidden", paddingTop:64 }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"url('https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1900&q=80')", backgroundSize:"cover", backgroundPosition:"center" }}/>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(160deg,rgba(12,7,2,0.82) 0%,rgba(12,7,2,0.5) 55%,rgba(12,7,2,0.85) 100%)" }}/>
        <div style={{ position:"absolute", top:"13%", right:"7%", width:200, height:200, borderRadius:"50%", border:"1px solid rgba(201,169,110,0.18)", animation:"floatBob 5s ease-in-out infinite", pointerEvents:"none" }}/>

        <div style={{ position:"relative", zIndex:2, textAlign:"center", padding:"0 20px", maxWidth:900, width:"100%" }}>
          <div style={{ ...fadeUp(0.1), display:"inline-flex", alignItems:"center", gap:8, background:"rgba(245,158,11,0.12)", border:"1px solid rgba(245,158,11,0.35)", borderRadius:24, padding:"6px 16px", marginBottom:22 }}>
            <span>🇹🇭</span>
            <span style={{ color:"#F59E0B", fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase" }}>Thailand Property Specialist</span>
          </div>
          <div style={fadeUp(0.2)}>
            <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(40px,6.5vw,80px)", fontWeight:700, color:"#F5E9D0", lineHeight:1.08, marginBottom:18, textShadow:"0 4px 30px rgba(0,0,0,0.5)" }}>
              Your Dream Home<br/><em style={{ color:"#F59E0B" }}>Awaits in Thailand</em>
            </h1>
            <p style={{ color:"#B0A090", fontSize:"clamp(14px,1.8vw,17px)", lineHeight:1.8, maxWidth:500, margin:"0 auto 36px" }}>
              Condos, houses &amp; apartments for rent and sale — personally curated by <strong style={{ color:"#C9A96E" }}>Annie</strong>, your Bangkok real estate expert.
            </p>
          </div>
          <div style={fadeUp(0.35)}>
            <div style={{ background:"rgba(253,250,246,0.97)", borderRadius:18, padding:"17px", boxShadow:"0 28px 70px rgba(0,0,0,0.38)", display:"flex", gap:9, alignItems:"center", flexWrap:"wrap" }}>
              <div style={{ display:"flex", gap:4, background:"#F3EEE8", padding:4, borderRadius:10 }}>
                {["All","For Sale","For Rent"].map(s=>(
                  <button key={s} onClick={()=>setStatus(s)} style={{ padding:"6px 11px", borderRadius:7, border:"none", background:status===s?"#1C1410":"transparent", color:status===s?"#C9A96E":"#7B6A5A", fontSize:11, fontWeight:700, cursor:"pointer", transition:"all 0.15s", whiteSpace:"nowrap" }}>
                    {s==="All"?"Buy & Rent":s}
                  </button>
                ))}
              </div>
              <select value={city} onChange={e=>setCity(e.target.value)} style={S.inp({ minWidth:120, flex:1, cursor:"pointer", padding:"9px 10px" })}>
                {ALL_CITIES.map(c=><option key={c}>{c}</option>)}
              </select>
              <select value={type} onChange={e=>setType(e.target.value)} style={S.inp({ minWidth:110, cursor:"pointer", padding:"9px 10px" })}>
                {ALL_TYPES.map(t=><option key={t}>{t}</option>)}
              </select>
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="🔍 Search..." style={S.inp({ flex:2, minWidth:130 })} onFocus={onFG} onBlur={onBG}/>
              <button onClick={()=>document.getElementById("buy")?.scrollIntoView({behavior:"smooth"})} style={{...S.gold, whiteSpace:"nowrap"}}>Search</button>
            </div>
          </div>
        </div>

        <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"rgba(12,7,2,0.88)", backdropFilter:"blur(12px)", borderTop:"1px solid rgba(201,169,110,0.15)", padding:"18px clamp(20px,5vw,60px)", opacity:heroOn?1:0, transition:"opacity 1.2s 0.7s" }}>
          <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", justifyContent:"space-around", flexWrap:"wrap", gap:16 }}>
            {[["18,500+","Properties"],["9,200+","Happy Clients"],["48","Cities"],["15+","Years Exp"]].map(([n,l])=>(
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(22px,3vw,36px)", fontWeight:700, color:"#F59E0B", lineHeight:1 }}>{n}</div>
                <div style={{ color:"#7B6A5A", fontSize:10, marginTop:3, letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LISTINGS */}
      <section id="buy" style={{ padding:"72px clamp(20px,5vw,60px)", maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:28, flexWrap:"wrap", gap:14 }}>
          <div>
            <div style={{ color:"#F59E0B", fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:8 }}>Live Listings</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(26px,4vw,44px)", fontWeight:700, color:"#1C1410" }}>Properties in {city}</h2>
          </div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {ALL_TYPES.map(t=>(
              <button key={t} onClick={()=>setType(t)} style={{ padding:"6px 14px", borderRadius:20, border:"1.5px solid", borderColor:type===t?"#C9A96E":"#E5DDD3", background:type===t?"#C9A96E":"transparent", color:type===t?"#fff":"#7B6A5A", fontSize:11, fontWeight:600, cursor:"pointer", transition:"all 0.15s" }}>{t}</button>
            ))}
          </div>
        </div>
        {shown.length===0 ? (
          <div style={{ textAlign:"center", padding:"60px 20px", color:"#A89580" }}>
            <div style={{ fontSize:44, marginBottom:12 }}>🔍</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, marginBottom:6 }}>No properties found</div>
            <div style={{ fontSize:13 }}>Try adjusting your filters</div>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:22 }}>
            {shown.map((p,i)=><Card key={p.id} p={p} idx={i} isAdmin={isAdmin} onEdit={onEditProp} onDel={onDelProp}/>)}
          </div>
        )}
      </section>

      {/* ABOUT */}
      <section id="rent" style={{ background:"linear-gradient(135deg,#1C1410 0%,#2E1E0E 100%)", padding:"72px clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:48, alignItems:"center" }}>
          <div>
            <div style={{ color:"#F59E0B", fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:12 }}>Your Agent</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(28px,4vw,46px)", fontWeight:700, color:"#F5E9D0", marginBottom:16 }}>
              Real Estate<br/><em style={{ color:"#C9A96E" }}>By Annie</em>
            </h2>
            <p style={{ color:"#8E7E6E", lineHeight:1.85, fontSize:14, marginBottom:26 }}>
              Professional agent specialising in Bangkok condos, Phuket villas and Chiang Mai homes. Helping buyers, renters and investors — in Thai and English.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
              <div style={{ color:"#C0B0A0", fontSize:14 }}>📞 {OWNER.phoneDisplay}</div>
              <div style={{ color:"#C0B0A0", fontSize:14 }}>✉️ {OWNER.email}</div>
              <a href={OWNER.igUrl} target="_blank" rel="noreferrer" style={{ color:"#C0B0A0", fontSize:14, textDecoration:"none" }}>📸 @{OWNER.ig}</a>
              <div style={{ display:"flex", gap:10, marginTop:4 }}>
                <a href={`https://wa.me/${OWNER.whatsapp}`} target="_blank" rel="noreferrer"
                  style={{ textDecoration:"none", background:"#25D366", color:"#fff", padding:"9px 18px", borderRadius:11, fontSize:13, fontWeight:700, display:"flex", alignItems:"center", gap:6 }}>
                  💬 WhatsApp
                </a>
                <a href={`https://line.me/ti/p/~${OWNER.lineId}`} target="_blank" rel="noreferrer"
                  style={{ textDecoration:"none", background:"#06C755", color:"#fff", padding:"9px 18px", borderRadius:11, fontSize:13, fontWeight:700, display:"flex", alignItems:"center", gap:6 }}>
                  💚 Line
                </a>
              </div>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:13 }}>
            {[{e:"✅",t:"Verified Listings",d:"Every property personally checked."},{e:"🌏",t:"Thai & English",d:"Bilingual support throughout."},{e:"⚡",t:"Fast Closings",d:"Deal signed in as little as 7 days."},{e:"🌟",t:"500+ Clients",d:"Trusted since 2010."}].map((c,i)=>(
              <div key={i} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(201,169,110,0.14)", borderRadius:14, padding:"20px 16px", transition:"all 0.22s" }}
                onMouseEnter={e=>{ e.currentTarget.style.background="rgba(201,169,110,0.08)"; e.currentTarget.style.borderColor="rgba(201,169,110,0.38)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor="rgba(201,169,110,0.14)"; }}>
                <div style={{ fontSize:26, marginBottom:9 }}>{c.e}</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:16, fontWeight:700, color:"#F5E9D0", marginBottom:5 }}>{c.t}</div>
                <div style={{ color:"#8E7E6E", fontSize:12, lineHeight:1.6 }}>{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CITIES */}
      <section style={{ padding:"72px clamp(20px,5vw,60px)", maxWidth:1200, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <div style={{ color:"#F59E0B", fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:10 }}>Explore</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(26px,4vw,44px)", fontWeight:700, color:"#1C1410" }}>Browse by City</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(148px,1fr))", gap:13 }}>
          {[{c:"Bangkok",img:"https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=80",n:"8,200+"},{c:"Phuket",img:"https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400&q=80",n:"3,400+"},{c:"Chiang Mai",img:"https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80",n:"2,100+"},{c:"Pattaya",img:"https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80",n:"1,800+"},{c:"Hua Hin",img:"https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&q=80",n:"900+"},{c:"Koh Samui",img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",n:"600+"}].map((x,i)=>(
            <div key={i} onClick={()=>{ setCity(x.c); document.getElementById("buy")?.scrollIntoView({behavior:"smooth"}); }} style={{ position:"relative", borderRadius:14, overflow:"hidden", cursor:"pointer", aspectRatio:"3/4", border:city===x.c?"3px solid #C9A96E":"3px solid transparent", transition:"all 0.22s" }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              <img src={x.img} alt={x.c} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 55%)" }}/>
              <div style={{ position:"absolute", bottom:11, left:11 }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, fontWeight:700, color:"#fff" }}>{x.c}</div>
                <div style={{ color:"#C9A96E", fontSize:11, fontWeight:600 }}>{x.n}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background:"#F3EEE8", padding:"72px clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ color:"#F59E0B", fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:10 }}>Get in Touch</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(26px,4vw,44px)", fontWeight:700, color:"#1C1410" }}>Contact Annie</h2>
            <p style={{ color:"#7B6A5A", fontSize:14, marginTop:8 }}>Annie replies within 24 hours</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:26, alignItems:"start" }}>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[{e:"📞",l:"Phone",v:OWNER.phoneDisplay},{e:"✉️",l:"Email",v:OWNER.email}].map((r,i)=>(
                <div key={i} style={{ background:"#fff", borderRadius:13, padding:"15px 17px", display:"flex", alignItems:"center", gap:13, boxShadow:"0 2px 10px rgba(0,0,0,0.04)" }}>
                  <div style={{ width:40, height:40, borderRadius:"50%", background:"linear-gradient(135deg,#C9A96E,#9B6B2A)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{r.e}</div>
                  <div>
                    <div style={{ fontSize:10, color:"#A89580", fontWeight:700, letterSpacing:"0.07em", textTransform:"uppercase" }}>{r.l}</div>
                    <div style={{ fontSize:13, color:"#1C1410", fontWeight:600, marginTop:2 }}>{r.v}</div>
                  </div>
                </div>
              ))}
              <a href={`https://wa.me/${OWNER.whatsapp}`} target="_blank" rel="noreferrer"
                style={{ textDecoration:"none", background:"#25D366", borderRadius:13, padding:"15px 17px", display:"flex", alignItems:"center", gap:13 }}>
                <div style={{ width:40, height:40, borderRadius:"50%", background:"rgba(255,255,255,0.25)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>💬</div>
                <div><div style={{ fontSize:10, color:"rgba(255,255,255,0.8)", fontWeight:700, textTransform:"uppercase" }}>WhatsApp</div><div style={{ fontSize:14, color:"#fff", fontWeight:700, marginTop:2 }}>{OWNER.phoneDisplay}</div></div>
                <span style={{ marginLeft:"auto", color:"rgba(255,255,255,0.7)", fontSize:18 }}>↗</span>
              </a>
              <a href={`https://line.me/ti/p/~${OWNER.lineId}`} target="_blank" rel="noreferrer"
                style={{ textDecoration:"none", background:"#06C755", borderRadius:13, padding:"15px 17px", display:"flex", alignItems:"center", gap:13 }}>
                <div style={{ width:40, height:40, borderRadius:"50%", background:"rgba(255,255,255,0.25)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>💚</div>
                <div><div style={{ fontSize:10, color:"rgba(255,255,255,0.8)", fontWeight:700, textTransform:"uppercase" }}>Line</div><div style={{ fontSize:14, color:"#fff", fontWeight:700, marginTop:2 }}>ID: {OWNER.lineId}</div></div>
                <span style={{ marginLeft:"auto", color:"rgba(255,255,255,0.7)", fontSize:18 }}>↗</span>
              </a>
              <a href={OWNER.igUrl} target="_blank" rel="noreferrer"
                style={{ textDecoration:"none", background:"linear-gradient(135deg,#f09433,#dc2743,#bc1888)", borderRadius:13, padding:"15px 17px", display:"flex", alignItems:"center", gap:13 }}>
                <div style={{ width:40, height:40, borderRadius:"50%", background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>📸</div>
                <div><div style={{ fontSize:10, color:"rgba(255,255,255,0.7)", fontWeight:700, textTransform:"uppercase" }}>Instagram</div><div style={{ fontSize:14, color:"#fff", fontWeight:700, marginTop:2 }}>@{OWNER.ig}</div></div>
                <span style={{ marginLeft:"auto", color:"rgba(255,255,255,0.7)", fontSize:18 }}>↗</span>
              </a>
            </div>
            <div style={{ background:"#fff", borderRadius:18, padding:"26px 22px", boxShadow:"0 6px 28px rgba(0,0,0,0.07)" }}>
              {sent ? (
                <div style={{ textAlign:"center", padding:"30px 10px" }}>
                  <div style={{ fontSize:44, marginBottom:12 }}>✅</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, marginBottom:6 }}>Message Sent!</div>
                  <p style={{ color:"#7B6A5A", fontSize:13, marginBottom:16 }}>Annie will reply within 24 hours.</p>
                  <button onClick={()=>setSent(false)} style={{ background:"#F3EEE8", color:"#6B5E52", border:"none", padding:"8px 18px", borderRadius:10, fontSize:13, fontWeight:600, cursor:"pointer" }}>Send Another</button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:21, fontWeight:700, color:"#1C1410", marginBottom:18 }}>Send a Message</h3>
                  <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                    {[{l:"Name",k:"name",t:"text",ph:"Your name"},{l:"Email",k:"email",t:"email",ph:"your@email.com"}].map(field=>(
                      <div key={field.k}>
                        <label style={{ fontSize:11, fontWeight:700, color:"#7B6A5A", letterSpacing:"0.07em", textTransform:"uppercase", display:"block", marginBottom:5 }}>{field.l}</label>
                        <input type={field.t} placeholder={field.ph} value={contact[field.k]} onChange={e=>setContact({...contact,[field.k]:e.target.value})} style={S.inp()} onFocus={onFG} onBlur={onBG}/>
                      </div>
                    ))}
                    <div>
                      <label style={{ fontSize:11, fontWeight:700, color:"#7B6A5A", letterSpacing:"0.07em", textTransform:"uppercase", display:"block", marginBottom:5 }}>Message</label>
                      <textarea rows={4} placeholder="I'm interested in a property..." value={contact.msg} onChange={e=>setContact({...contact,msg:e.target.value})} style={{...S.inp(),resize:"vertical"}} onFocus={onFG} onBlur={onBG}/>
                    </div>
                    <button onClick={()=>{ if(contact.name&&contact.email) setSent(true); }} style={{...S.gold,width:"100%",padding:"12px",fontSize:14}}>
                      Send to Annie →
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:"#0F0A04", padding:"36px clamp(20px,5vw,60px) 22px", borderTop:"1px solid rgba(201,169,110,0.12)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:16, alignItems:"center" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <svg width="28" height="26" viewBox="0 0 42 38">
                <path d="M2,20 L21,3 L40,20" fill="none" stroke="#F5E9D0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="8" y1="20" x2="8" y2="38" stroke="#F5E9D0" strokeWidth="1.2" strokeLinecap="round" opacity="0.25"/>
                <line x1="34" y1="20" x2="34" y2="38" stroke="#F5E9D0" strokeWidth="1.2" strokeLinecap="round" opacity="0.25"/>
              </svg>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:700, color:"#F5E9D0", letterSpacing:"0.1em" }}>BANGKOK <span style={{ color:"#C9A96E", fontStyle:"italic", fontWeight:400 }}>Property Finder</span></div>
            </div>
            <div style={{ color:"#4A3A2A", fontSize:12, marginTop:4 }}>{OWNER.email} · {OWNER.phoneDisplay}</div>
          </div>
          <div style={{ color:"#4A3A2A", fontSize:12 }}>© 2026 Bangkok Property Finder Finder · Real Estate By Annie · Bangkok, Thailand</div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [screen, setScreen]     = useState("site");
  const [props, setProps]       = useState(() => {
    try { const s = localStorage.getItem("bangkokpropertyfinder_props"); return s ? JSON.parse(s) : SEED; } catch { return SEED; }
  });
  const [form, setForm]         = useState(null);
  const [delId, setDelId]       = useState(null);
  const [toast, setToast]       = useState(null);
  const [adminView, setAdminView] = useState(false);

  useEffect(() => {
    try { localStorage.setItem("bangkokpropertyfinder_props", JSON.stringify(props)); } catch (_) {}
  }, [props]);

  const flash = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleSave = (data) => {
    const updated = form && form.id
      ? props.map(p => p.id === form.id ? { ...data, id: p.id } : p)
      : [{ ...data, id: Date.now() }, ...props];
    setProps(updated);
    setForm(null);
    flash(form && form.id ? "✅ Property updated!" : "✅ Property added!");
  };

  const confirmDel = () => {
    setProps(props.filter(p => p.id !== delId));
    setDelId(null);
    flash("🗑️ Listing deleted.");
  };

  if (screen === "login") return <AdminLogin onLogin={() => setScreen("admin")} />;

  return (
    <>
      {screen === "admin"
        ? <AdminDash props={props} onAdd={()=>setForm({})} onEdit={p=>setForm(p)} onDel={id=>setDelId(id)}
            onLogout={()=>{ setScreen("site"); setAdminView(false); }}
            onView={()=>{ setScreen("site"); setAdminView(true); }}/>
        : <PublicSite props={props} isAdmin={adminView}
            onEditProp={p=>setForm(p)} onDelProp={id=>setDelId(id)}
            onGoAdmin={()=>setScreen(adminView?"admin":"login")}/>
      }
      {form !== null && <PropForm init={form&&form.id?form:null} onSave={handleSave} onClose={()=>setForm(null)}/>}
      {delId !== null && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.65)", zIndex:600, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
          <div style={{ background:"#fff", borderRadius:20, padding:"32px 26px", maxWidth:340, width:"100%", textAlign:"center", fontFamily:"'Outfit',sans-serif" }}>
            <div style={{ fontSize:42, marginBottom:12 }}>🗑️</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:"#1C1410", marginBottom:8 }}>Delete this listing?</div>
            <p style={{ color:"#7B6A5A", fontSize:13, marginBottom:22 }}>This cannot be undone.</p>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={()=>setDelId(null)} style={{ flex:1, background:"#F3EEE8", color:"#6B5E52", border:"none", padding:"11px", borderRadius:11, fontSize:13, fontWeight:600, cursor:"pointer" }}>Cancel</button>
              <button onClick={confirmDel} style={{ flex:1, background:"#EF4444", color:"#fff", border:"none", padding:"11px", borderRadius:11, fontSize:14, fontWeight:700, cursor:"pointer" }}>Delete</button>
            </div>
          </div>
        </div>
      )}
      {toast && (
        <div style={{ position:"fixed", bottom:22, right:22, background:"#1C1410", color:"#fff", padding:"11px 20px", borderRadius:11, fontSize:13, fontWeight:600, boxShadow:"0 6px 22px rgba(0,0,0,0.25)", zIndex:700, animation:"fadeUp 0.3s ease", border:"1px solid rgba(201,169,110,0.3)" }}>
          {toast}
        </div>
      )}
    </>
  );
}
