"""
Izdela eno samo datoteko Aeterna-Lux-katalog.html, ki jo lahko pošlješ strankam po mailu.
Vse slike, slogi in vsebina so vgrajeni, zato internet ni potreben (razen za pisavo).

Zagon:  python3 izdelaj-datoteko.py
"""
import base64, json, os, re

KORENSKA = os.path.dirname(os.path.abspath(__file__))
IZHOD = os.path.join(KORENSKA, "Aeterna-Lux-katalog.html")


def beri(pot):
    with open(os.path.join(KORENSKA, pot), encoding="utf-8") as f:
        return f.read()


def data_uri(pot):
    tip = "image/png" if pot.endswith(".png") else "image/jpeg"
    with open(os.path.join(KORENSKA, pot), "rb") as f:
        return f"data:{tip};base64," + base64.b64encode(f.read()).decode()


html = beri("index.html")

# slogi in skripte neposredno v datoteko
html = html.replace('<link rel="stylesheet" href="slog.css">', "<style>\n" + beri("slog.css") + "\n</style>")
slike = {ime: data_uri("slike/zare/" + ime) for ime in sorted(os.listdir(os.path.join(KORENSKA, "slike/zare")))}
skripte = (
    "<script>\nwindow.BREZ_GESLA = true;\nwindow.SLIKE = " + json.dumps(slike) + ";\n</script>\n"
    "<script>\n" + beri("podatki.js") + "\n</script>\n"
    "<script>\n" + beri("app.js") + "\n</script>"
)
html = html.replace('<script src="podatki.js"></script>\n  <script src="app.js"></script>', skripte)

# logo in ikone
for pot in sorted(set(re.findall(r'"(slike/[^"]+\.png)"', html))):
    html = html.replace(f'"{pot}"', f'"{data_uri(pot)}"')

with open(IZHOD, "w", encoding="utf-8") as f:
    f.write(html)
print(f"Izdelano: {IZHOD} ({os.path.getsize(IZHOD) / 1e6:.1f} MB)")
