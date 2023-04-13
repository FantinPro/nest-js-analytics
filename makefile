.PHONY: up stop restart init-jwt-keys backend-install frontend-install schema-update fixtures start resetdb setup

up:
	docker-compose up --detach

stop:
	docker-compose down --remove-orphans --volumes --timeout 0

restart: stop start

install:
	docker-compose exec node npm install

start:
	docker-compose exec node npm run start:dev

migrate:
	npx prisma migrate dev

studio:
	npx prisma studio

fixtures:
	echo 'Loading fixtures...'

