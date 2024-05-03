#!/bin/bash

#stop on erorr

set -e

QTRACK_CONTAINER_DATABASE="qtrack-02_mongo_docker_1"
QTRACK_CONTAINER_SERVER="qtrack-02_sails_app_1"


#Extract tgz file 
QTRACK_BACKUP_ARCHIVE_TGZ=$1
QTRACK_BACKUP_ARCHIVE=$(basename $QTRACK_BACKUP_ARCHIVE_TGZ .tgz)
echo  "Extracting tarball $QTRACK_BACKUP_ARCHIVE ... "
tar -xzf $QTRACK_BACKUP_ARCHIVE_TGZ
echo "$QTRACK_BACKUP_ARCHIVE"

#dump mongo database
echo -n "Restoring database mongo ... "
docker exec -i $QTRACK_CONTAINER_DATABASE sh -c 'mongorestore --archive' <  $QTRACK_BACKUP_ARCHIVE/mongodb.dump
#docker exec -t $QTRACK_CONTAINER_DATABASE  /usr/bin/mongorestore  --archive < $QTRACK_BACKUP_ARCHIVE/mongodb.dump
echo "Success!"

#Export Docker Volumes
echo -n "Exporting user-avatars ... "
docker run --rm --volumes-from $QTRACK_CONTAINER_SERVER -v $(pwd)/$QTRACK_BACKUP_ARCHIVE:/backup ubuntu cp -r /app/public/user-avatars /backup/user-avatars
echo "Success!"
echo -n "Exporting project-background-images ... "
docker run --rm --volumes-from $QTRACK_CONTAINER_SERVER -v $(pwd)/$QTRACK_BACKUP_ARCHIVE:/backup ubuntu cp -r /app/public/project-background-images /backup/project-background-images
echo "Success!"
echo -n "Exporting attachments ... "
docker run --rm --volumes-from $QTRACK_CONTAINER_SERVER -v $(pwd)/$QTRACK_BACKUP_ARCHIVE:/backup ubuntu cp -r /app/private/attachments /backup/attachments
echo "Success!"

# Create tgz
#echo -n "Creating final tarball $BACKUP_DATETIME-backup.tgz ... "



#Remove source files
#echo -n "Cleaning up temporary files and folders ... "
#sudo -S rm -rf $BACKUP_DATETIME-backup
#echo "Success!"

#echo "Backup Complete!"
