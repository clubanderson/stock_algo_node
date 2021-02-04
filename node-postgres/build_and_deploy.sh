./stop.sh
#docker login -u "idjgmgwizrzb/andan02@gmail.com" -p "UgQ]T1jTI{57Q(HxRoIt" https://iad.ocir.io
docker build -f Dockerfile.prod -t np-api:latest .
#local
docker tag np-api:latest localhost:5000/np-api:latest
docker push localhost:5000/np-api:latest
#oracle
#docker tag np-api:latest iad.ocir.io/idjgmgwizrzb/np-api:latest
#docker push iad.ocir.io/idjgmgwizrzb/np-api:latest
./start.sh

