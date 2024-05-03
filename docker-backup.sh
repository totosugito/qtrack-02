#!/bin/bash

#stop on erorr

set -e

QTRACK_CONTAINER_DATABASE="qtrack-02_mongo_docker_1"
QTRACK_CONTAINER_SERVER="qtrack-02_sails_app_1"

#Create Temprory folder
BACKUP_DATETIME=$(date --utc +%F-%H-%M-%S)
mkdir -p $BACKUP_DATETIME-backup

#dump mongo database
echo -n 

#docker exec -t $QTRACK_CONTAINER_DATABASE mongodump --db qtrack-db-test -o  mongo_dump_$BACKUP_DATETIME
docker exec -i $QTRACK_CONTAINER_DATABASE sh -c 'mongodump --archive' > $BACKUP_DATETIME-backup/mongodb.dump
#docker exec -t $QTRACK_CONTAINER_DATABASE  /usr/bin/mongodump  --db qtrack-db-test --archive > $BACKUP_DATETIME-backup/mongodb.dump
echo "Success!"

#Export Docker Volumes
# Export Docker Voumes
echo -n "Exporting user-avatars ... "
docker run --rm --volumes-from $QTRACK_CONTAINER_SERVER -v $(pwd)/$BACKUP_DATETIME-backup:/backup ubuntu cp -r /app/public/user-avatars /backup/user-avatars
echo "Success!"
echo -n "Exporting project-background-images ... "
docker run --rm --volumes-from $QTRACK_CONTAINER_SERVER -v $(pwd)/$BACKUP_DATETIME-backup:/backup ubuntu cp -r /app/public/project-background-images /backup/project-background-images
echo "Success!"
echo -n "Exporting attachments ... "
docker run --rm --volumes-from $QTRACK_CONTAINER_SERVER -v $(pwd)/$BACKUP_DATETIME-backup:/backup ubuntu cp -r /app/private/attachments /backup/attachments
echo "Success!"

# Create tgz
echo -n "Creating final tarball $BACKUP_DATETIME-backup.tgz ... "
tar -czf $BACKUP_DATETIME-backup.tgz \
    $BACKUP_DATETIME-backup/mongodb.dump \
    $BACKUP_DATETIME-backup/user-avatars \
    $BACKUP_DATETIME-backup/project-background-images \
    $BACKUP_DATETIME-backup/attachments
echo "Success!"


#Remove source files
echo -n "Cleaning up temporary files and folders ... "
sudo -S  rm -rf $BACKUP_DATETIME-backup
echo "Success!"

echo "Backup Complete!"
