installing memcached: https://memcached.org/downloads
memcached -d -s /tmp/memcached.sock // running memcache as a daemon and listening via socket
memcached -d -p <port> // running memcache as a daemon and listening to custom port, default to port 11211

brew services start memcached // on macos with brew

environment variables should be stored in the gunicorn service above the ExecStart and below the WorkingDirectory

Environment=MY_SECRET_KEY='slkdfja;fj;f'
Environment=MY_SECRET_KEY2='etc'
Environment=SERVER_NAME='mydomain.com'
