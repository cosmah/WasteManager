THIS IS THE ROOT README.md

env/Scripts/activate
pip install -r requirements.txt
django-admin startproject backend
python manage.py startapp api
#provisioning the new database migrations
python manage.py makemigrations 
python manage.py migrate 