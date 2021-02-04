#!/bin/bash
kubectl delete service np-api
kubectl delete deployment np-api
kubectl delete configmap np-api-config
kubectl delete secrets np-api-secrets
