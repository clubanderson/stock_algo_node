./stop.sh
#docker login -u "idjgmgwizrzb/andan02@gmail.com" -p "UgQ]T1jTI{57Q(HxRoIt" https://iad.ocir.io
cd fs-ui
npm run-script build
docker build -f Dockerfile.prod -t fs-ui:latest .
#local
docker tag fs-ui:latest localhost:5000/fs-ui:latest
docker push localhost:5000/fs-ui:latest
#oracle
#docker tag fs-ui:latest iad.ocir.io/idjgmgwizrzb/fs-ui:latest
#docker push iad.ocir.io/idjgmgwizrzb/fs-ui:latest
cd ..
./start.sh

