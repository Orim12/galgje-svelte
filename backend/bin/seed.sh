#!/bin/bash
DOCKER_CONTAINER_NAME="qdp-mongo"
MONGO_HOST="127.0.0.1:27017"
MONGO_DATABASE_NAME="test"
MONGO_USERNAME="root"
MONGO_PASSWORD="VolcanoDevelopment"


function importJson {
    docker cp ./seed/$1 $DOCKER_CONTAINER_NAME:/tmp/$1
    docker exec -it $DOCKER_CONTAINER_NAME mongoimport -h $MONGO_HOST -u $MONGO_USERNAME -p $MONGO_PASSWORD --db $MONGO_DATABASE_NAME --authenticationDatabase admin --collection $2 --file /tmp/$1 --jsonArray
}

# importJson "material-properties.json" "material-properties"
# importJson "materials.json" "materials"