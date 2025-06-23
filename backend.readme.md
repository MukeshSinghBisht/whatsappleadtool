NODE JS VERSION: 22.10.0
NPM VERSION: 10.1.0
MONGO DB VERSION: 6.17.0

# whatsappleadtool
Whatsapp lead generation.

# to run bash on kafka
 docker compose exec -it whatsappleadtool-kafka-1 bash

# to run bash on zookeeper
 docker compose exec -it whatsappleadtool-zookeeper-1 bash

# to create topic
kafka-topics --create --topic lead-capture --partitions 1 --replication-factor 1 --bootstrap-server localhost:9092


# to run producer on bash terminal
 curl -X POST http://localhost:3001/lead   -H "Content-Type: application/json"   -d '{"name":"Ravi","phone":"+919876543210","message":"I need bridal service","leadId":"123"}'


# faulty message example
curl -X POST http://localhost:3001/lead   -H "Content-Type: application/json"   -d '{"name":"Ravi","phone":"9876543210","message":"I need bridal service","leadId":"124"}'


# Visit:
🧪 Prometheus: http://localhost:9090
📈 Grafana: http://localhost:3000
Default login: admin / admin

# prmetheus server url for grafana
http://prometheus:9090


