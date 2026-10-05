/*
  ============================================================
  AETERNA LUX — VSEBINA SPLETNE STRANI
  ============================================================
  To je EDINA datoteka, ki jo urejaš za spremembe vsebine.
  Navodila: glej NAVODILA.md

  Pravila, da se nič ne pokvari:
  - Besedilo vedno ostane med narekovaji: "takole"
  - Za vsako vrstico/blokom pride vejica ,
  - Ne briši oglatih [ ] in zavitih { } oklepajev
  ============================================================
*/

const PODATKI = {

  // ---------- GESLO ZA VSTOP NA STRAN ----------
  // To geslo daš strankam. Ko ga spremeniš, se morajo vsi ponovno prijaviti.
  geslo: "aeterna2026",

  // ---------- KONTAKT IN PODJETJE ----------
  kontakt: {
    ime: "Žan Horvat",
    telefon: "070 500 257",
    email: "aeternalux.info@gmail.com",
    kraj: "Orehova vas · dostava po celotni Sloveniji",
    podjetje: "Aeterna Lux, trgovanje in storitve, Žan Horvat s.p.",
    naslov: "Ob nadvozu 11, 2312 Orehova vas",
  },

  // ---------- UVODNO BESEDILO ----------
  uvod: "Uvoz kakovostnih žar neposredno od evropskih proizvajalcev. Brez minimalnih naročil, dobava v 2–7 dneh, osebni servis iz Štajerske.",

  // ---------- ZAKAJ AETERNA LUX (4 prednosti) ----------
  prednosti: [
    { naslov: "Brez minimalnih naročil", opis: "Naročite 3 ali 30 kosov." },
    { naslov: "Dobava 2–7 dni", opis: "Hitreje od večine dobaviteljev." },
    { naslov: "Celoten razpon programov", opis: "Klasični, civilni in socialni." },
    { naslov: "Osebni servis", opis: "En klic, en človek, vzorce pripeljem osebno." },
  ],

  // ---------- KATEGORIJE IN CENIK ----------
  // koda = kratica, ki se uporablja v šifrah žar (npr. KS-01)
  // cena = cena brez DDV v evrih (samo številka)
  kategorije: [
    { koda: "KS", naziv: "Kovinska žara – standard", cena: 59,  opis: "26 × 18,5 cm, ~5 L — več barv, z ali brez simbolov" },
    { koda: "KP", naziv: "Kovinska žara – premium",  cena: 75,  opis: "Bogatejša izdelava, okrašen pokrov in nogice" },
    { koda: "KA", naziv: "Kamnita žara",             cena: 75,  opis: "Klasične izvedbe" },
    { koda: "LE", naziv: "Lesena žara",              cena: 95,  opis: "Masiven les, naravni toni" },
    { koda: "ME", naziv: "Medeninasta žara",         cena: 95,  opis: "Tradicionalne gravure" },
    { koda: "KE", naziv: "Keramična žara",           cena: 105, opis: "32 × 17 cm, ~4 L — unikatni dizajni" },
    { koda: "KR", naziv: "Kristalna žara",           cena: 149, opis: "Premium segment" },
    { koda: "SO", naziv: "Žara za socialne pogrebe", cena: 29,  opis: "Enostavna izvedba" },
  ],

  // ---------- POPUSTI IN POGOJI ----------
  popusti: [
    "10–24 kosov: −5 %",
    "25+ kosov: −10 %",
    "Dostava vključena pri naročilih 10+ kosov",
  ],
  pogoji: [
    "Vse cene so brez DDV.",
    "Plačilo: 30 dni po dobavi.",
    "Veljavnost ponudbe: 60 dni.",
    "Razpoložljivost vsake žare potrdim v enem delovnem dnevu.",
  ],

  // ---------- ŽARE ----------
  // koda:    šifra, ki jo stranka pove po telefonu (mora biti unikatna)
  // kategorija: koda kategorije od zgoraj (KS, KP, KA, LE, ME, KE, KR, SO)
  // slika:   ime datoteke v mapi slike/zare/
  // opis:    kratek opis (lahko prazen "")
  // zaloga:  true = na zalogi, false = po naročilu
  // novo:    true = prikaže se pod "Nove linije" z oznako NOVO
  // cena:    (neobvezno) če ima žara drugačno ceno od kategorije, dodaj npr.  cena: 65,
  zare: [
    { koda: "KS-01", kategorija: "KS", slika: "KS-01.jpg", opis: "Srebrna, ščetkana površina, križ na pokrovu", zaloga: true, novo: false },
    { koda: "KS-02", kategorija: "KS", slika: "KS-02.jpg", opis: "Bordo lak, zlata vrtnica in križ",          zaloga: true, novo: false },
    { koda: "KS-03", kategorija: "KS", slika: "KS-03.jpg", opis: "Zeleno-sivi marmorni videz, križ",          zaloga: true, novo: false },
    { koda: "KS-04", kategorija: "KS", slika: "KS-04.jpg", opis: "Bronasto rjava, zlat obroč, križ",          zaloga: true, novo: false },

    { koda: "KP-01", kategorija: "KP", slika: "KP-01.jpg", opis: "Črna, okrašen pokrov, srebrne nogice",      zaloga: true, novo: false },
    { koda: "KP-02", kategorija: "KP", slika: "KP-02.jpg", opis: "Mat črna, srebrni križ in ročaji",          zaloga: true, novo: false },
    { koda: "KP-03", kategorija: "KP", slika: "KP-03.jpg", opis: "Črna s kromiranim pokrovom in podstavkom",  zaloga: true, novo: false },
    { koda: "KP-04", kategorija: "KP", slika: "KP-04.jpg", opis: "Zlata, srebrni križ in ročaji",             zaloga: true, novo: false },

    { koda: "ME-01", kategorija: "ME", slika: "ME-01.jpg", opis: "Zlato-črna s progami",                      zaloga: true, novo: false },
    { koda: "ME-02", kategorija: "ME", slika: "ME-02.jpg", opis: "Turkizna z gravuro",                        zaloga: true, novo: false },
    { koda: "ME-03", kategorija: "ME", slika: "ME-03.jpg", opis: "Črna, sijajna, zlat pokrov",                zaloga: true, novo: false },
    { koda: "ME-04", kategorija: "ME", slika: "ME-04.jpg", opis: "Bela z zlato gravuro",                      zaloga: true, novo: false },

    { koda: "KA-01", kategorija: "KA", slika: "KA-01.jpg", opis: "Krogla, sivi marmor",                       zaloga: true, novo: false },
    { koda: "KA-02", kategorija: "KA", slika: "KA-02.jpg", opis: "Oniks, topli toni",                         zaloga: true, novo: false },
    { koda: "KA-03", kategorija: "KA", slika: "KA-03.jpg", opis: "Sivo-zeleni marmor",                        zaloga: true, novo: false },
    { koda: "KA-04", kategorija: "KA", slika: "KA-04.jpg", opis: "Kocka, črni marmor",                        zaloga: true, novo: false },

    { koda: "LE-01", kategorija: "LE", slika: "LE-01.jpg", opis: "Črna, zlat križ s Kristusom",               zaloga: true, novo: false },
    { koda: "LE-02", kategorija: "LE", slika: "LE-02.jpg", opis: "Svetlo rjava, stopničast pokrov",           zaloga: true, novo: false },
    { koda: "LE-03", kategorija: "LE", slika: "LE-03.jpg", opis: "Temni oreh, okras vrtnice",                 zaloga: true, novo: false },
    { koda: "LE-04", kategorija: "LE", slika: "LE-04.jpg", opis: "Patiniran les, vgraviran križ",             zaloga: true, novo: false },

    { koda: "KE-01", kategorija: "KE", slika: "KE-01.jpg", opis: "Vijolično-črna, zlato srce",                zaloga: true, novo: false },
    { koda: "KE-02", kategorija: "KE", slika: "KE-02.jpg", opis: "Bela, oblika cvetnega popka, zlato srce",   zaloga: true, novo: false },
    { koda: "KE-03", kategorija: "KE", slika: "KE-03.jpg", opis: "Vijolična s kalo",                          zaloga: true, novo: false },
    { koda: "KE-04", kategorija: "KE", slika: "KE-04.jpg", opis: "Bel marmorni vzorec, zlat križ",            zaloga: true, novo: false },

    { koda: "KR-01", kategorija: "KR", slika: "KR-01.jpg", opis: "Šampanjec z okrasom vrtnic, z mini žaro",   zaloga: true, novo: false },
    { koda: "KR-02", kategorija: "KR", slika: "KR-02.jpg", opis: "Šampanjec, krogla, s svečnikom",            zaloga: true, novo: false },
    { koda: "KR-03", kategorija: "KR", slika: "KR-03.jpg", opis: "Grafitna s kristalnimi cvetovi, z mini žaro", zaloga: true, novo: false },
    { koda: "KR-04", kategorija: "KR", slika: "KR-04.jpg", opis: "Bron, rebrasta, z mini žaro",               zaloga: true, novo: false },
  ],
};
