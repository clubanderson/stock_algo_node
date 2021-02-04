#!/bin/bash
kubectl create -f np-secrets.yaml
kubectl create -f np-configmap.yaml
kubectl create -f np-deployment.yaml
kubectl create -f np-service.yaml
kubectl get svc np-api
kubectl get pods
