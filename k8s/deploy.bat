::kubectl create secret generic pgpassword --from-literal PGPASSWORD=12345
::kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.2/deploy/static/provider/cloud/deploy.yaml
kubectl apply -f next
kubectl apply -f postgres
kubectl apply -f ingress
