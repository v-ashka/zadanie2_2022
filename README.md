# Zadanie2 - Marcin Wijaszka

Zadanie2 zostało w niewielki sposób zmodyfikowane jeżeli chodzi o wersję z zajęć z laboratorium 11.

Zmiany dokonano w katalogu worker, aby obliczyć ciąg geometryczny.

```js
const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const sub = redisClient.duplicate();

const a1 = 3;
const q = 3;

function gProgression(n) {
  return a1 * Math.pow(q, n-1);
}

sub.on('message', (channel, message) => {
  redisClient.hset('values', message, gProgression(parseInt(message)));
});

sub.subscribe('insert');

```

Reszta plików została nienaruszona, oprócz nowoutworzonego pliku docker-swarm.yml

# 1. Buildowanie obrazów i wrzucenie na docker hub [link tutaj](https://hub.docker.com/repository/docker/vashka99)

![image](https://user-images.githubusercontent.com/47278535/173200160-e40a22ca-3454-4934-a2fd-79d4fc507cc3.png)


# 2. Uruchomienie docker compose
Projekt testowy uruchomiono za pomocą polecenia `docker compose -f docker-compose.dev.yml up -d`
![image](https://user-images.githubusercontent.com/47278535/173200286-17e89fa1-a789-42ca-9809-096f4e361bc2.png)

Działanie aplikacji:
![image](https://user-images.githubusercontent.com/47278535/173200511-0fcdc64d-ca85-4206-ba28-12e5cee5d032.png)

![image](https://user-images.githubusercontent.com/47278535/173200534-7da7a9f9-bd9d-4af6-a3e7-4dfdc8aef360.png)

# 3. Uruchomienie za pomocą docker swarm
![image](https://user-images.githubusercontent.com/47278535/173200407-fe10f544-d48a-43d3-ba3e-7b718daa55f5.png)

Przetestowanie działania stworzonego klastra

![image](https://user-images.githubusercontent.com/47278535/173200736-ca55a9d9-75c3-462f-897b-e886d97cb108.png)

