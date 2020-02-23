# HW1 by latte team

```sh
# if you are using `node` or `pm2`, you need run this command to prevent missing file
openssl req -nodes -new -x509 -keyout server.key -out server.cert -subj '/'
# alternatively, you can run this command to build and start docker-compose
sudo docker-compose up --build
```

If `docker-compose` fails to connect to the Docker daemon, ensure the Docker daemon is up (`sudo dockerd`).

- HTTP: `http://localhost/`
- HTTPS: `https://localhost/`
