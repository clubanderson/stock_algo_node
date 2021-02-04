#!/bin/bash
kubectl delete service ig-ui
kubectl delete deployment ig-ui
kubectl delete configmap ig-ui-config
kubectl delete secrets ig-ui-secrets
