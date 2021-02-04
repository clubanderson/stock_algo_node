#!/bin/bash
kubectl delete service fs-ui
kubectl delete deployment fs-ui
kubectl delete configmap fs-ui-config
kubectl delete secrets fs-ui-secrets
