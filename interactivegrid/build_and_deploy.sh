./stop.sh
#docker login -u "idjgmgwizrzb/andan02@gmail.com" -p "UgQ]T1jTI{57Q(HxRoIt" https://iad.ocir.io
cd ig-ui 
npm run-script build
docker build -f Dockerfile.prod -t ig-ui:latest .
#local
docker tag ig-ui:latest localhost:5000/ig-ui:latest
docker push localhost:5000/ig-ui:latest
#oracle
#docker tag ig-ui:latest iad.ocir.io/idjgmgwizrzb/ig-ui:latest
#docker push iad.ocir.io/idjgmgwizrzb/ig-ui:latest
cd ..
./start.sh

