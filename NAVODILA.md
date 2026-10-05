# Aeterna Lux — navodila za urejanje strani

Vsa vsebina (žare, cene, kontakt, geslo) je v **eni datoteki: `podatki.js`**.
Drugih datotek ti ni treba spreminjati.

## Kako urejaš na GitHubu (brez programov)
1. Odpri repozitorij na github.com in klikni na datoteko `podatki.js`.
2. Klikni ikono svinčnika ✏️ (Edit).
3. Popravi, kar želiš, in spodaj klikni **Commit changes**.

Lahko pa samo napišeš Claudu, kaj želiš spremeniti, pa to naredi namesto tebe.

## Najpogostejše spremembe

**Sprememba cene** — v delu `kategorije` popravi številko pri `cena:` (brez €, brez DDV).

**Žare ni več na zalogi** — pri tej žari spremeni `zaloga: true` v `zaloga: false`
(pokaže se oznaka »Po naročilu«). Če jo želiš povsem odstraniti, izbriši celo vrstico.

**Nova žara**
1. Sliko naloži v mapo `slike/zare/` (Add file → Upload files). Ime naj bo kar šifra, npr. `KE-05.jpg`.
2. V `podatki.js` pod `zare:` kopiraj obstoječo vrstico in popravi šifro, kategorijo, ime slike in opis:
   ```js
   { koda: "KE-05", kategorija: "KE", slika: "KE-05.jpg", opis: "Opis žare", zaloga: true, novo: true },
   ```
3. `novo: true` pomeni, da se žara prikaže tudi v sekciji **Nove linije** z oznako NOVO.

**Šifre**: KS = kovinska standard, KP = kovinska premium, KA = kamnita, LE = lesena,
ME = medeninasta, KE = keramična, KR = kristalna, SO = socialna. Vsaka šifra mora biti unikatna.

**Sprememba gesla** — popravi `geslo: "..."` na vrhu datoteke.

## Pazi
- Besedilo vedno ostane med narekovaji `"..."`.
- Na koncu vsake vrstice žare je vejica `,`.
- Če se stran po spremembi ne prikaže, je najverjetneje manjkajoča vejica ali narekovaj.

## O zaščiti z geslom
Geslo prepreči, da bi stran po naključju videl kdorkoli, in Google je ne indeksira.
Ni pa to bančna zaščita: spretnejši uporabnik bi vsebino lahko prebral iz kode strani.
Za cenik in katalog je to običajno dovolj. Če boš želel močnejšo zaščito (npr. vsaka
stranka svoj email za prijavo), se da to urediti pri objavi strani (npr. Cloudflare Access).

## Pošiljanje strani po mailu
Datoteka **`Aeterna-Lux-katalog.html`** je cela stran v eni datoteki (z vsemi slikami).
Pošlješ jo strankam kot prilogo, one jo odprejo v brskalniku. Gesla ni, ker jo dobijo osebno.

Po vsaki spremembi v `podatki.js` je treba datoteko izdelati znova
(`python3 izdelaj-datoteko.py`) — ali pa samo prosi Claude, naj to naredi.
Strankam nato pošlji novo verzijo.
