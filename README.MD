* criando o container
docker run --name gostack_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

ormconfig.json

{
	"type": "postgres",
	"host": "localhost",
	"port": 5432,
	"username": "docker",
	"password": "docker",
	"database": "gostack_gobarber",
}

instalar o driver postgres e o typeorm:
yarn add typeorm pg

comandos typeorm

* cria uma migration
yarn typeorm migration:create -n "NomeMigration"

* roda todas as migrations
yarn typeorm migration:run

* desfaz a ultima migration executada
yarn typeorm migration:revert

* mostra as migrations executadas
yarn typeorm migration:show

* deletar a database
yarn typeorm migration:drop

* executar uma query
yarn typeorm query "SELECT * FROM USERS"

* limpar o cache
yarn typeorm cache:clear

* mostrar a versão
yarn typeorm version


