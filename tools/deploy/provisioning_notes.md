Provisioning a new site
===============================

## Required packages:

* nginx
* python 3.6.x (django, gunicorn, virtualenv)
* memcached
* Git
* certbot (SSL encryption)
* sendmail
* fail2ban


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

### setup database
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

### import existing data into database (optional)
```
    (venv) $ python manage.py loaddata datadump.json --exclude=contenttypes --exclude=auth --exclude=home.ConsumeList --exclude=home.Spec --exclude=home.Rating --exclude=home.TreeAllotted --exclude=home.Consume
```
#### install and setup virtualenv:



installing memcached: https://memcached.org/downloads
memcached -d -s /tmp/memcached.sock // running memcache as a daemon and listening via socket
memcached -d -p <port> // running memcache as a daemon and listening to custom port, default to port 11211

brew services start memcached // on macos with brew

environment variables should be stored in the gunicorn service above the ExecStart and below the WorkingDirectory
