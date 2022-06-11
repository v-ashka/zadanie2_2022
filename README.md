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
![image](https://user-images.githubusercontent.com/47278535/173200310-dc29d5c9-9672-475f-a73a-aed5d822069a.png)

![image](https://user-images.githubusercontent.com/47278535/173200325-dc32404a-1af9-4ca8-8b84-1eb5d2952e86.png)


# 3. Uruchomienie za pomocą docker swarm
![image](https://user-images.githubusercontent.com/47278535/173200407-fe10f544-d48a-43d3-ba3e-7b718daa55f5.png)
Przetestowanie działania 

![image](https://user-images.githubusercontent.com/47278535/173200438-3bb2be5f-ea3a-4d28-8ee8-620e09c23649.png)

