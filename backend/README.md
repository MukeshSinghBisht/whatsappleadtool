# whatsappleadtool
Whatsapp lead generation.


# to run consumer on bash terminal
cd consumer && node index.js

# to run producer on bash terminal
cd producer-api && node index.js

# to run consumer on docker
 docker compose exec -it whatsappleadtool-consumer-1 node index.js

# to run producer on docker
 docker compose exec -it whatsappleadtool-producer-1 curl -X POST http://localhost:3001/lead   -H "Content-Type: application/json"   -d '{"name":"Ravi","phone":"+919876543210","message":"I need bridal service","leadId":"123"}'

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

# mongodb connection string
mongodb+srv://whatsappleadtooluser:Whats&app#lead&tool@cluster0.fnxxfxi.mongodb.net/whatsappleadtool?retryWrites=true&w=majority&appName=Cluster0

# Visit:
🧪 Prometheus: http://localhost:9090
📈 Grafana: http://localhost:3000
Default login: admin / admin

# prmetheus server url for grafana
http://prometheus:9090

# intially start 
1.producer
2.consumer
3.dlq consumer
4.do query via curl

