sudo docker run -d --name jaeger -e COLLECTOR_ZIPKIM_HOST_PORT=:9411 -e COLLECTOR_OTLP_ENABLED=true -p 6831:6831/udp -p 6832:6832/udp -p 5778:5778 -p 16686:16686 -p 4317:4317 -p 4318:4318 -p 14250:14250 -p 14268:14268 -p 14269:14269 -p 9412:9411 jaegertracing/all-in-one:1.38


import random
import time
import threading
import logging
from flask import Flask, request, jsonify, Response
from opentelemetry import trace, metrics
from opentelemetry.exporter.prometheus import PrometheusMetricReader
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.instrumentation.flask import FlaskInstrumentor
from prometheus_client import generate_latest, CONTENT_TYPE_LATEST
 
# Configure logging to print to console
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
 
# Initialize the Flask application
app = Flask(__name__)
FlaskInstrumentor().instrument_app(app)
 
# Set up Prometheus metric reader
reader = PrometheusMetricReader()
 
# Set up MeterProvider and create a meter for recording metrics
meter_provider = MeterProvider(metric_readers=[reader])
metrics.set_meter_provider(meter_provider)
meter = metrics.get_meter(__name__)
request_counter = meter.create_counter(
    name="request_count",
    description="Total number of requests",
    unit="requests"
)
 
# Set up the tracer provider with the desired service name
trace.set_tracer_provider(
    TracerProvider(
        resource=Resource.create({"service.name": "my-hello-service"})
    )
)
 
# Initialize the OTLP exporter for traces using gRPC
otlp_exporter = OTLPSpanExporter(endpoint="jaeger.dataops.neuralcompany.team:30453", insecure=True)
 
# Add the OTLP exporter as a span processor to the tracer provider
trace.get_tracer_provider().add_span_processor(
    BatchSpanProcessor(otlp_exporter)
)
 
# In-memory storage for posted data
data_storage = []
 
# API endpoint for POST request
@app.route('/api/post', methods=['POST'])
def post_endpoint():
    with trace.get_tracer(__name__).start_as_current_span("postEndpoint"):
        data = request.json
        logging.info(f"Received data: {data}")
        data_storage.append(data)  # Store the posted data
        request_counter.add(1, {"endpoint": "post"})
        return jsonify({"status": "success", "data": data}), 200
 
# API endpoint for GET request
@app.route('/api/get', methods=['GET'])
def get_endpoint():
    with trace.get_tracer(__name__).start_as_current_span("getEndpoint"):
        with trace.get_tracer(__name__).start_as_current_span("databaseQuery"):
            logging.info(f"Retrieving data: {data_storage}")
        request_counter.add(1, {"endpoint": "get"})
        return jsonify({"status": "success", "data": data_storage}), 200
 
# Endpoint for Prometheus metrics
@app.route('/metrics', methods=['GET'])
def metrics_endpoint():
    return Response(generate_latest(), mimetype=CONTENT_TYPE_LATEST)
 
# Function to simulate metric recording
def record_metrics():
    while True:
        request_counter.add(random.randint(1, 10))
        time.sleep(random.random())
 
if __name__ == "__main__":
    # Start metrics recording in a separate thread
    metrics_thread = threading.Thread(target=record_metrics)
    metrics_thread.daemon = True
    metrics_thread.start()
 
    # Run the Flask application
    app.run(host='0.0.0.0', port=5000)
