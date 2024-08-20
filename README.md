THIS IS THE ROOT README.md
source env/bin/activate
env/Scripts/activate
pip install -r requirements.txt
django-admin startproject backend
python manage.py startapp api
#provisioning the new database migrations
python manage.py makemigrations 
python manage.py migrate 
python manage.py runserver 
pip install mysql-connector-python




https://github.com/techwithtim/Django-React-Full-Stack-App/blob/main/backend/backend/settings.py


(env) cosmah@cosmah:~/Desktop/pro/WasteManager/Backend/backend$ python manage.py createsuperuser
Username: admin
Email address: 123123
Error: Enter a valid email address.
Email address: jacfrost06@gmail.com
Password: 
Password (again): 
This password is too short. It must contain at least 8 characters.
This password is too common.
