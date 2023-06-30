## Projet NestJS

### Groupe 5IW3

Raimbault Fantin 5IW3
Maziarz Oliwier 5IW3
Naderi Farid 5IW3
Lelong Antoine 5IW3

## Description
Api NestJS pour le projet de nestJS ainsi que pour le projet de web analytics de Karl Marques.
4 models :
- User : gérer les utilisateurs de l'app / Prisma
- Application : gérer la partie applicationId et application Secret / Prisma
- AppUser : Relation des deux tables precedents avec un role / Prisma
- TrackerEvent : gérer les events envoyés par le sdk front & back afin d'analyser les données d'un site / Mongo


## Installation + Run app

Assurez vous d'avoir copier coller le fichier .env inscrit sur MyGes (dans la description du livrable)

```bash
make up
make install
make fixtures
make start
```

Vous devriez avoir l'api qui tourne sur le port 3000

## Interface visualisation des données SQL
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/nestjsdb?schema=public" npx prisma studio
```

⚠️ il faut bien exporter la variable juste avant de lancer `npx prisma studio` et changer `host` en `localhost` car la bdd est conteneurisée !!

## Fonctionnalités
Fonctionnalités Nest.js (pour le calcul de la note de 15/20)
● Contrôleurs ✅
● Providers ✅
● Modules ✅
● Pipes ✅
● Guard ✅
● Authentification JWT ✅
● Gestion d’au moins deux rôles (administrateur, utilisateur, ..) ✅
● Sécurisation des variables d’environnement ✅
● Utilisation d’une base de données NoSQL ou SQL ✅ (Prisma + Mongo)
● Validation des données reçues depuis l’extérieur ✅
● Logging des erreurs ✅
● Compression des réponses
● En-têtes de sécurité ✅
● Gestion des cors ✅
● Rate limit
● Base de données conteneurisée ✅
● Serveur Nest.js conteneurisé ✅
● Code commenté ✅
● Pas de type any ✅
● Projet documenté ✅
● Livrable sans variables sensibles ✅
● Historique Git avec participation de l’ensemble des membres du groupe ✅

## Endpoints (http://localhost:3000)


### User
- POST /user : Créer un utilisateur

```json
Payload
{
	"email": "test@malou.io",
	"password": "test",
	"name": "testeur"
}
```

```json
Response
{
	"id": "198a0996-1474-4134-9f27-1c4897bfb809",
	"name": "testeur",
	"email": "test@malou.io",
	"password": "$2b$10$fDpm3Stmt1JugXnYok.2ReMwmbT7NCIzeDYX/B.VM/yprSLRqpIe."
}
```

- POST /auth/login : Se connecter

```json
Payload
{
	"email": "test@malou.io",
	"password": "test"
}
```

```json
Response
{
	"access_token": "xxxxxx"
}
```

- GET /auth/profile : Récupérer son profil (avec le token dans le header)
-H "Authorization: Bearer <token>"

## Application

- POST /applications : Créer une application
-H "Authorization: Bearer <token>"

```json
Payload
{
	"name": "test-app",
	"origin": "http://localhost:5173"
}
```


```json
Response
{
	"id": "73e425d4-df72-46b8-b421-ff31f63e0bc5",
	"secret": "ESGIed059713-1de3-4c94-b46b-0c3f2c16105b",
	"name": "test-app",
	"origin": "http://localhost:5173"
}
```

- GET /applications : Récupérer toutes les applications du user
-H "Authorization: Bearer <token>"

```json
Response
[
	{
		"id": "73e425d4-df72-46b8-b421-ff31f63e0bc5",
		"secret": "ESGIed059713-1de3-4c94-b46b-0c3f2c16105b",
		"name": "test-app",
		"origin": "http://localhost:5173"
	}
]
```

- GET /applications/first : Récuperer la premier app du user
-H "Authorization: Bearer <token>"

```json
Response
{
	"id": "73e425d4-df72-46b8-b421-ff31f63e0bc5"
}
```

- GET /applications/:applicationId : Récuperer une app du user
-H "Authorization: Bearer <token>"

```json
Response
{
	"id": "73e425d4-df72-46b8-b421-ff31f63e0bc5",
	"secret": "ESGIed059713-1de3-4c94-b46b-0c3f2c16105b",
	"name": "test-app",
	"origin": "http://localhost:5173"
}
```


- POST /applications/:applicationId/users : Ajouter un utilisateur à l'application
**ONLY ADMIN ROLE FROM THE APPLICATION**
-H "Authorization: Bearer <token>"

```json
PAYLOAD
{
	"userId": "xxxx"
}
```

```json
Response
{
	"userId": "3bd5cce5-3ec7-40fe-aed7-71a273f290d5",
	"applicationId": "73e425d4-df72-46b8-b421-ff31f63e0bc5",
	"role": "BASIC"
}
```

- DELETE /applications/:applicationId/users/:userId : Ajouter un utilisateur à l'application
**ONLY ADMIN ROLE FROM THE APPLICATION**
-H "Authorization: Bearer <token>"

```json
Response
{
	"userId": "3bd5cce5-3ec7-40fe-aed7-71a273f290d5",
	"applicationId": "73e425d4-df72-46b8-b421-ff31f63e0bc5",
	"role": "BASIC"
}
```

- DELETE /applications/:applicationId : Supprimer une application
**ONLY ADMIN ROLE FROM THE APPLICATION**
-H "Authorization: Bearer <token>"

```json
Response
{
	"userId": "3bd5cce5-3ec7-40fe-aed7-71a273f290d5",
	"applicationId": "73e425d4-df72-46b8-b421-ff31f63e0bc5",
	"role": "BASIC"
}
```

- PUT /applications/:applicationId : Update une application
**ONLY ADMIN ROLE FROM THE APPLICATION**
-H "Authorization: Bearer <token>"

```json
PAYLOAD
{
	"name": "toto app",
	"origin": "http://google.com"
}
```

```json
Response
{
	"id": "73e425d4-df72-46b8-b421-ff31f63e0bc5",
	"secret": "ESGIed059713-1de3-4c94-b46b-0c3f2c16105b",
	"name": "toto app",
	"origin": "http://google.com"
}
```