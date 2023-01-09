import psycopg2

conn = psycopg2.connect(
    database="Filtravimo-Sistemos",
    user="postgres",
    password="password",
    host="localhost",
    port="5432"
)

cur = conn.cursor()

#cia bus isvedimas is postgresql(work in progress)

#siaip esu imetes sqlite duombazes faila

#cur.execute("SELECT * from category_typetb")
cur.execute("SELECT * from categoriestb")
rows = cur.fetchall()

for row in rows:
    print("ID :", row[0])
    print("Category :", row[1])
    print("Descripotion:", row[2])
    print("\n")

print("DB queries completed")
conn.close()