# HW1 by latte team

```sh
# required
$ openssl req -nodes -new -x509 -keyout server.key -out server.cert -subj '/'
$ npm install
# you can use docker-compose instead of node / pm2 after executing above commands
$ sudo docker-compose up
```

If `docker-compose` fails to connect to the Docker daemon, ensure the Docker daemon is up (`sudo dockerd`).

- HTTP: `http://localhost/`
- HTTPS: `https://localhost/`
