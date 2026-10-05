// Aeterna Lux — logika strani. Vsebina se ureja v podatki.js.
(function () {
  "use strict";

  const P = PODATKI;
  const $ = (id) => document.getElementById(id);
  const KLJUC_PRIJAVA = "aeterna-prijava";
  const KLJUC_IZBOR = "aeterna-izbor";

  const shrani = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const preberi = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const odstrani = (k) => { try { localStorage.removeItem(k); } catch (e) {} };

  const telLink = "tel:+386" + P.kontakt.telefon.replace(/\s/g, "").replace(/^0/, "");
  const evri = (n) => n.toLocaleString("sl-SI") + " €";
  const kategorija = (koda) => P.kategorije.find((k) => k.koda === koda) || { naziv: koda, cena: 0 };
  const cenaZare = (z) => (typeof z.cena === "number" ? z.cena : kategorija(z.kategorija).cena);

  // ---------- PRIJAVA ----------
  function jePrijavljen() { return preberi(KLJUC_PRIJAVA) === P.geslo; }

  function odkleni() {
    $("prijava").hidden = true;
    $("stran").hidden = false;
    izrisi();
  }

  $("prijava-tel").textContent = P.kontakt.telefon;
  $("prijava-tel").href = telLink;

  $("prijava-obrazec").addEventListener("submit", (e) => {
    e.preventDefault();
    if ($("geslo").value.trim() === P.geslo) {
      shrani(KLJUC_PRIJAVA, P.geslo);
      odkleni();
    } else {
      $("prijava-napaka").hidden = false;
      $("geslo").select();
    }
  });

  $("odjava").addEventListener("click", () => {
    odstrani(KLJUC_PRIJAVA);
    location.reload();
  });

  // ---------- MOJ IZBOR ----------
  let izbor = [];
  try { izbor = JSON.parse(preberi(KLJUC_IZBOR) || "[]"); } catch (e) { izbor = []; }
  izbor = izbor.filter((k) => P.zare.some((z) => z.koda === k));

  function preklopiIzbor(koda) {
    izbor = izbor.includes(koda) ? izbor.filter((k) => k !== koda) : izbor.concat(koda);
    shrani(KLJUC_IZBOR, JSON.stringify(izbor));
    osveziIzbor();
  }

  function osveziIzbor() {
    $("izbor").hidden = izbor.length === 0;
    $("izbor-kode").textContent = izbor.join(", ");
    document.querySelectorAll("[data-izbor]").forEach((b) => {
      const v = izbor.includes(b.dataset.izbor);
      b.classList.toggle("izbrano", v);
      b.textContent = v ? "★" : "☆";
      b.setAttribute("aria-pressed", v);
    });
    const odprta = $("pv-izberi").dataset.koda;
    if (odprta) $("pv-izberi").textContent = izbor.includes(odprta) ? "Odstrani iz izbora" : "Dodaj v moj izbor";
  }

  $("izbor-pocisti").addEventListener("click", () => {
    izbor = [];
    shrani(KLJUC_IZBOR, "[]");
    osveziIzbor();
  });

  // ---------- KARTICE ŽAR ----------
  function kartica(z) {
    const k = kategorija(z.kategorija);
    const el = document.createElement("article");
    el.className = "kartica";
    el.innerHTML = `
      <button class="kartica-slika" type="button" aria-label="Povečaj ${z.koda}">
        <img src="slike/zare/${z.slika}" alt="${k.naziv} ${z.koda}" loading="lazy">
        ${z.novo ? '<span class="znacka">Novo</span>' : ""}
      </button>
      <div class="kartica-telo">
        <div class="kartica-vrh">
          <span class="koda">${z.koda}</span>
          <button class="zvezda" type="button" data-izbor="${z.koda}" aria-label="Dodaj ${z.koda} v izbor">☆</button>
        </div>
        <p class="kartica-kat">${k.naziv}</p>
        <div class="kartica-dno">
          <span class="cena">${evri(cenaZare(z))} <small>+ DDV</small></span>
          <span class="status ${z.zaloga ? "na-zalogi" : "po-narocilu"}">${z.zaloga ? "Na zalogi" : "Po naročilu"}</span>
        </div>
      </div>`;
    el.querySelector(".kartica-slika").addEventListener("click", () => odpriPovecavo(z));
    el.querySelector(".zvezda").addEventListener("click", () => preklopiIzbor(z.koda));
    return el;
  }

  // ---------- KATALOG IN FILTRI ----------
  let aktivnaKat = "vse";

  function izrisiKatalog() {
    const iskanje = $("iskanje").value.trim().toUpperCase().replace(/\s/g, "");
    const zadetki = P.zare.filter((z) =>
      (aktivnaKat === "vse" || z.kategorija === aktivnaKat) &&
      (!iskanje || z.koda.toUpperCase().replace(/\s/g, "").includes(iskanje))
    );
    const mreza = $("mreza");
    mreza.replaceChildren(...zadetki.map(kartica));
    $("ni-zadetkov").hidden = zadetki.length > 0;
    osveziIzbor();
  }

  function izrisiFiltre() {
    const kat = P.kategorije.filter((k) => P.zare.some((z) => z.kategorija === k.koda));
    const cipi = [{ koda: "vse", naziv: "Vse" }].concat(kat.map((k) => ({ koda: k.koda, naziv: k.naziv.replace("žara", "").replace(/\s+–\s+/, " – ").trim() })));
    $("filtri-kategorije").replaceChildren(...cipi.map((c) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "cip" + (c.koda === aktivnaKat ? " aktiven" : "");
      b.textContent = c.naziv;
      b.setAttribute("aria-pressed", c.koda === aktivnaKat);
      b.addEventListener("click", () => { aktivnaKat = c.koda; izrisiFiltre(); izrisiKatalog(); });
      return b;
    }));
  }

  // ---------- POVEČAVA ----------
  function odpriPovecavo(z) {
    const k = kategorija(z.kategorija);
    $("pv-slika").src = "slike/zare/" + z.slika;
    $("pv-slika").alt = k.naziv + " " + z.koda;
    $("pv-kategorija").textContent = k.naziv;
    $("pv-koda").textContent = z.koda;
    $("pv-opis").textContent = [z.opis, k.opis].filter(Boolean).join(". ");
    $("pv-cena").innerHTML = evri(cenaZare(z)) + " <small>+ DDV</small>";
    $("pv-status").innerHTML = `<span class="status ${z.zaloga ? "na-zalogi" : "po-narocilu"}">${z.zaloga ? "Na zalogi" : "Po naročilu"}</span>`;
    $("pv-izberi").dataset.koda = z.koda;
    osveziIzbor();
    $("povecava").showModal();
  }

  $("pv-izberi").addEventListener("click", () => preklopiIzbor($("pv-izberi").dataset.koda));
  $("povecava").addEventListener("click", (e) => {
    if (e.target === $("povecava") || e.target.hasAttribute("data-zapri")) $("povecava").close();
  });

  // ---------- IZRIS VSEGA ----------
  function izrisi() {
    const K = P.kontakt;
    $("uvod-besedilo").textContent = P.uvod;

    $("prednosti").replaceChildren(...P.prednosti.map((p, i) => {
      const d = document.createElement("div");
      d.className = "prednost";
      d.innerHTML = `<span>${String(i + 1).padStart(2, "0")}</span><h3></h3><p></p>`;
      d.querySelector("h3").textContent = p.naslov;
      d.querySelector("p").textContent = p.opis;
      return d;
    }));

    const nove = P.zare.filter((z) => z.novo);
    $("novosti-sekcija").hidden = nove.length === 0;
    $("novosti").replaceChildren(...nove.map(kartica));

    izrisiFiltre();
    izrisiKatalog();
    $("iskanje").addEventListener("input", izrisiKatalog);

    $("cenik-vrstice").replaceChildren(...P.kategorije.map((k) => {
      const tr = document.createElement("tr");
      const ima = P.zare.some((z) => z.kategorija === k.koda);
      tr.innerHTML = `<td class="cenik-naziv"></td><td class="tiho">${ima ? k.koda + "-…" : "po povpraševanju"}</td><td class="tiho"></td><td class="desno cena">${evri(k.cena)}</td>`;
      tr.children[0].textContent = k.naziv;
      tr.children[2].textContent = k.opis;
      return tr;
    }));
    const seznam = (id, arr) => $(id).replaceChildren(...arr.map((t) => { const li = document.createElement("li"); li.textContent = t; return li; }));
    seznam("popusti", P.popusti);
    seznam("pogoji", P.pogoji);

    for (const id of ["glava-tel", "k-tel", "pv-tel", "izbor-klic"]) $(id).href = telLink;
    $("glava-tel").textContent = K.telefon;
    $("k-tel").textContent = K.telefon;
    $("pv-tel").textContent = K.telefon;
    $("k-ime").textContent = K.ime;
    $("k-email").textContent = K.email;
    $("k-email").href = "mailto:" + K.email;
    $("k-kraj").textContent = K.kraj;
    $("noga-podjetje").textContent = `${K.podjetje} · ${K.naslov}`;
  }

  if (jePrijavljen()) odkleni();
  else $("geslo").focus();
})();
