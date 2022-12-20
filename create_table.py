import psycopg2
  
# connection establishment
conn = psycopg2.connect(
   database="postgres",
    user='postgres',
    password='password',
    host='localhost',
    port= '5432'
)
  
conn.autocommit = True
  
# Creating a cursor object
cursor = conn.cursor()
  
# query to create a database 
sql = ''' CREATE database products1 '''
commands = (
    """
    CREATE TABLE kategorija (
        kateghorija_id SERIAL PRIMARY KEY,
        kategorijos VARCHAR(255) NOT NULL
    )
    """,
    """ 
    CREATE TABLE pramogos (
        FOREIGN KEY (vendor_id)
            REFERENCES kategorija (kategorijos)
            ON UPDATE CASCADE ON DELETE CASCADE,
        parmoga VARCHAR(255) NOT NULL
            )
    """)
  
# executing above query
try:
    cursor.execute(sql)
    cursor.execute(commands)
    print("Database has been created successfully !!")
except:
    print("Already exists")
  
# Closing the connection
conn.close()
