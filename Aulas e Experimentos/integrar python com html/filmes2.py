filmes = {
 "drama": ["Cidadão Kane", "O Poderoso Chefão"],
 "comédia": ["Tempos Modernos", "American Pie", "Dr. Dolittle"],
 "policial": ["Chuva Negra", "Desejo de Matar", "Difícil de Matar"],
 "guerra": ["Rambo", "Platoon", "Tora!Tora!Tora!"],
}
pagina = open("filmes2.html", "w", encoding="utf-8")
pagina.write("""
    <!DOCTYPE html>
    <html lang="pt-BR">
        <head>
            <meta charset="utf-8">
            <title>Filmes</title>
        </head>
        <body>
""")
for c, v in filmes.items():
    pagina.write(f"<h1>{c.capitalize()}</h1>")
    pagina.write("<ul>")
    for e in v:
        pagina.write(f"<li>{e}</li>")
    pagina.write("</ul>")
pagina.write("""
</body>
</html>
""")
pagina.close()