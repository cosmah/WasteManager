THIS IS THE ROOT README.md

env/Scripts/activate
pip install -r requirements.txt
django-admin startproject backend
python manage.py startapp api
#provisioning the new database migrations
python manage.py makemigrations 
python manage.py migrate 
python manage.py runserver 
python manage.py runserver 192.168.78.177:8000

https://github.com/techwithtim/Django-React-Full-Stack-App/blob/main/backend/backend/settings.py

^C(env) cosmah@cosmah:~/Desktop/pro/WasteManager/Backend/backend$ python manage.py createsuruser
Username (leave blank to use 'cosmah'): admin
Email address: jacfrost06@gmail.com
Password: 
Password (again): 
Superuser created successfully.
(env) cosmah@cosmah:~/Desktop/pro/WasteManager/Backend/backend$ 