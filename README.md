# Running:

```Temporary accounts:
  username: admin   password: admin
  username: admin1  password: admin
  username: admin2  password: admin
```

Initial Setup:
```json
pip3 install -r requirements.txt
pip3 install django-allauth
pip3 install channels
pip3 install django-rest-auth
pip3 install channels_redis
pip3 install "whitenoise <4"
pip3 install service_identity
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
python manage.py runserver
```
