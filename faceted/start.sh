#!/bin/bash
kubectl create -f fs-secrets.yaml
kubectl create -f fs-configmap.yaml
kubectl create -f fs-deployment.yaml
kubectl create -f fs-service.yaml
kubectl get svc fs-ui
kubectl get pods
