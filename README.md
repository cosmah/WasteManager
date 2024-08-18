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

https://github.com/techwithtim/Django-React-Full-Stack-App/blob/main/backend/backend/settings.py