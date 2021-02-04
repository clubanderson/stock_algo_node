#!/bin/bash
kubectl create -f ig-secrets.yaml
kubectl create -f ig-configmap.yaml
kubectl create -f ig-deployment.yaml
kubectl create -f ig-service.yaml
kubectl get svc ig-ui
kubectl get pods
