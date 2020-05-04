Provisioning a new site
===============================

## Required packages/libraries:

* nginx
* python 3.6.x (django, gunicorn, virtualenv)
* memcached
* Git
* certbot (SSL encryption)
* sendmail
* fail2ban
* logrotate
* postgresql

```
$ sudo apt-get install nginx memcached git certbot-nginx certbot sendmail fail2ban logrotate postgresql
```

#### Environment variables for use with the sed command throughout setup

`SITENAME` should be the actual website, `USERNAME` should be the same as the username account on the server/system, and `PROJECTNAME` should be the name of the Django project

```
$ export SITENAME=onybuff.com USERNAME=dudeman PROJECTNAME=onybuff
```
test:
```
$ echo $SITENAME
```
#### installing python 3.6.9:

```
$ sudo apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev \
libreadline-dev wget curl llvm libncurses5-dev libncursesw5-dev \
xz-utils tk-dev libffi-dev liblzma-dev libreadline-gplv2-dev libgdbm-dev libc6-dev
$ cd ~
$ wget https://www.python.org/ftp/python/3.6.9/Python-3.6.9.tgz
$ tar -xvf Python-3.6.9.tgz
$ cd Python-3.6.9
$ ./configure --with-ensurepip=install
$ sudo make && sudo make install
```

#### set python3.6.9 as default for  `python3`
```
$ sudo update-alternatives --install /usr/bin/python3 python3 ~/Python-3.6.9/python 10
```
test:
```
$ python3
Python 3.6.9 (default, Jul 18 2019, 15:22:48)
[GCC 8.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

#### setup database
```
$ sudo -u postgres psql
postgres=# CREATE DATABASE $myproject;
postgres=# CREATE USER $myprojectuser WITH PASSWORD 'password';
postgres=# ALTER ROLE $myprojectuser SET client_encoding TO 'utf8';
postgres=# ALTER ROLE $myprojectuser SET default_transaction_isolation TO 'read committed';
postgres=# ALTER ROLE $myprojectuser SET timezone TO 'UTC';
postgres=# GRANT ALL PRIVILEGES ON DATABASE $myproject TO $myprojectuser;
postgres=# \q
```

#### setup nginx
```
$ cd ~/$SITENAME/tools/deploy
$ sudo cp nginx.template.conf /etc/nginx/sites-available/nginx.template.conf
$ cd /etc/nginx/sites-available
$ sed -i "s/SITENAME/$SITENAME/g" nginx.template.conf
$ sed -i "s/USERNAME/$USERNAME/g" nginx.template.conf
$ sudo mv nginx.template.conf $SITENAME
$ sudo ln -s /etc/nginx/sites-available/$SITENAME /etc/nginx/sites-enabled/$SITENAME
```

#### setup fail2ban

#### Getting an SSL certificate
```
$ sudo certbot --nginx -d $SITENAME
```

#### setup logrotate for gunicorn
```
$ cd ~/$SITENAME/tools/deploy
$ sudo cp logrotate.template.conf /etc/logrotate.d/$SITENAME
$ cd /etc/logrotate.d/$SITENAME
$ sed -i "s/SITENAME/$SITENAME/g" logrotate.template.conf
```
#### setup virtualenv:
```
$ pip install virtualenv
$ cd ~/$SITENAME
$ python3.6 -m venv venv
```
#### import existing data into database (optional)
```
(venv) $ python manage.py loaddata datadump.json --exclude=contenttypes --exclude=auth --exclude=home.ConsumeList --exclude=home.Spec --exclude=home.Rating --exclude=home.TreeAllotted --exclude=home.Consume
```

#### start the services
```
$ sudo systemctl reload nginx
$ sudo systemctl enable gunicorn-$SITENAME
$ sudo systemctl start gunicorn-$SITENAME
```
installing memcached: https://memcached.org/downloads
memcached -d -s /tmp/memcached.sock // running memcache as a daemon and listening via socket
memcached -d -p <port> // running memcache as a daemon and listening to custom port, default to port 11211

brew services start memcached // on macos with brew

environment variables should be stored in the gunicorn service above the ExecStart and below the WorkingDirectory

#### RE-provisioning:
create local database `postgres psql` then follow above steps for setting up local database

step1: [dumpdata](https://docs.djangoproject.com/en/2.2/ref/django-admin/#dumpdata)
```
python manage.py dumpdata home.Talent -o talentdata.json --indent 4
python manage.py dumpdata home.TalentTree -o treedata.json --indent 4
python manage.py dumpdata home.Tag -o tagdata.json --indent 4
python manage.py dumpdata home.User social_django.UserSocialAuth -o userdata.json --indent 4
```

step2: create necessary models (WoWClass)
```
python manage.py shell
from home.models import Profession, WoWClass

wowclasses = ['Druid', 'Hunter', 'Mage', 'Paladin', 'Priest', 'Rogue', 'Shaman', 'Warlock', 'Warrior']
for x in wowclasses:
    cl = WoWClass.objects.create(name=x, img=x.lower())
    cl.save()

ALCH,BS,ENCH,ENGI,HERB,LW,MINING,SKIN,TAILOR = range(1, 10)
COOK,FA,FISH,RIDING = range(10, 14)
PROFESSION_CHOICES = (
    (ALCH, 'Alchemy'),
    (BS, 'Blacksmithing'),
    (ENCH, 'Enchanting'),
    (ENGI, 'Engineering'),
    (HERB, 'Herbalism'),
    (LW, 'Leatherworking'),
    (MINING, 'Mining'),
    (SKIN, 'Skinning'),
    (TAILOR, 'Tailoring'),
    (COOK, 'Cooking'),
    (FA, 'First Aid'),
    (FISH, 'Fishing'),
    (RIDING, 'Riding'),
)

for (x,y) in PROFESSION_CHOICES:
    prof = Profession.objects.create(ix=x, img=sanitize(y))
    prof.save()

```

step3: [loaddata](https://docs.djangoproject.com/en/2.2/ref/django-admin/#django-admin-loaddata) (order is important)
```
python manage.py loaddata dumps/treedata.json --app home.TalentTree
python manage.py loaddata dumps/talentdata.json --app home.Talent
python manage.py loaddata dumps/userdata.json --app home.User
python manage.py loaddata dumps/userdata.json --app social_django.UserSocialAuth
```

step4: running management commands

adding spell data
```
python manage.py spell_parser
```
adding (-b --basic, -a --advanced, -c --crafted, -n --noprof) item info, where `-n` is just non-crafted consumes
```
python manage.py item_parser -b
```

###### BIG dumps:

```
python manage.py dumpdata -o dumps/dookie.json --exclude=contenttypes --exclude=auth --indent 4
```
##### PROFESSION dumps:
note - will need to sanitize file name because of first aid

```
python manage.py shell
from home.models import Crafted, Profession
professions = [x.name for x in Profession.objects.all()]
for prof in professions:
    all_crafted = {}
    all_mats = {}
    qs = Crafted.objects.filter(profession__name='{}'.format(prof))
    for crafted in qs:
        all_crafted[crafted.item.ix] = {}
        all_crafted[crafted.item.ix]
            for mat in crafted.materials.all():

                all_crafted[crafted.item.ix][mat.item.ix] = mat.amount

    with open(os.path.abspath('dumps/{}.js'.format(prof.lower())), 'w+') as f:
        json.dump(data, f, indent=4)

    with open(os.path.abspath('dumps/{}.js'.format(prof.lower())), 'w+') as f:
        json.dump(data, f, indent=4)

```
