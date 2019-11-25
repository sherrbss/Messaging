# Running:

```Temporary accounts:
  username: admin   password: admin
  username: admin1  password: admin
  username: admin2  password: admin
```

Running Frontend:

```json
npm i
npm start
```

Running Serverside:
```json
redis-server
```

Running Backend:

```json
virtualenv env
source env/bin/activate
pip install -r requirements.txt
python manage.py runserver
```
