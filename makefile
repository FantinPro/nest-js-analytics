.PHONY: up stop restart install start migrate studio fixtures
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
	npx prisma generate && docker-compose exec node npx prisma migrate dev

seed:
	docker-compose exec node npm run seed:run

