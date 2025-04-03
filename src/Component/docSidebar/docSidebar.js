import React, { useState } from 'react';
import './docSidebar.css';

const DocSidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState(0);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);

  const sidebarData = [
    {
      title: 'Prometheus ▼ ',
      content:`
      <img class="styled-image" src="prometheus.png">
      <div class="content-section">
    <h3 style="color: black;">From Metrics to Insight</h3></br>
    <p style="color: black;">
        Power your metrics and alerting with the leading open-source monitoring solution.
    </p>
</div>

<div class="content-section">
    <p style="color: black;">
        For more information on how to set up and use this solution, refer to the official documentation or visit the community forums.
    </p>
</div>

<div class="content-section">
    <p style="color: black;">
        For a detailed guide on integrating metrics with your monitoring solution, check the documentation provided by your tool. Additionally, explore available tutorials and community discussions to enhance your observability setup.
    </p>
</div>

  </br></br> 
<div class="content-section">
    <p style="color: black;   display: flex; text-align: -webkit-center; ">
   <i><b> «Even though Borgmon remains internal to Google, the idea of treating time-series data as a data source for generating alerts is now accessible to everyone through those open source tools like Prometheus»
    </p>
</div>
      `,
      submenus: [
        {
          title: 'Getting started with Prometheus',
          content: `
           <div class="content-section">
             <h3 style="color: black;">What is Prometheus?</h3>
              <p style="color: black;">Prometheus is an open-source systems monitoring and alerting toolkit originally built at SoundCloud. Since its inception in 2012, many companies and organizations have adopted Prometheus, and the project has a very active developer and user community. It is now a standalone open source project and maintained independently of any company. To emphasize this, and to clarify the project's governance structure, Prometheus joined the Cloud Native Computing Foundation in 2016 as the second hosted project, after Kubernetes.</br>
                    Prometheus collects and stores its metrics as time series data, i.e. metrics information is stored with the timestamp at which it was recorded, alongside optional key-value pairs called labels.
                    For more elaborate overviews of Prometheus, see the resources linked from the media section.</p> </br>
           </div>
           <div class="content-section">
             <h3 style="color: black;">Features</h3>
              <p style="color: black;">Prometheus's main features are:</p> </br>
              <ul>
              <li>A multi-dimensional data model with time series data identified by metric name and key/value pairs</li></br>
              <li>PromQL, a flexible query language to leverage this dimensionality</li></br>
              <li>No reliance on distributed storage; single server nodes are autonomous</li></br>
              <li>Time series collection happens via a pull model over HTTP</li></br>
              <li>Pushing time series is supported via an intermediary gateway</li></br>
              <li>Targets are discovered via service discovery or static configuration</li></br>
              <li>Multiple modes of graphing and dashboarding support</li></br>
            </ul>
           </div>
          <div class="content-section">
            <h3 style="color: black;">Downloading and running Prometheus</h3>
            <p style="color: black;">Download the latest release of Prometheus for your platform, then extract and run it:</p> </br>
            <div class="mildly-colored">
              <div class="code-section">
                <code>
tar xvfz prometheus-*.tar.gz<br>
cd prometheus-*
                </code>
              </div>
            </div>
          </div>



          <div class="content-section">
             <h3 style="color: black;">Configuring Prometheus to monitor itself</h3>
              <p style="color: black;">Prometheus collects metrics from targets by scraping metrics HTTP endpoints. Since Prometheus exposes data in the same manner about itself, it can also scrape and monitor its own health.
</br></br>While a Prometheus server that collects only data about itself is not very useful, it is a good starting example. Save the following basic Prometheus configuration as a file named prometheus.yml:</p> </br>
           </div>

           
           <div class="mildly-colored">
              <div class="code-section">
                <code>
                 
global:
  scrape_interval: 15s # By default, scrape targets every 15 seconds.

  # Attach these labels to any time series or alerts when communicating with
  # external systems (federation, remote storage, Alertmanager).
  external_labels:
    monitor: 'codelab-monitor'

scrape_configs:
  - job_name: 'prometheus'
    # Override the global default and scrape targets from this job every 5 seconds.
    scrape_interval: 5s

    static_configs:
      - targets: ['localhost:9090']
                </code>
              </div>
            </div></br>





              <div class="content-section">
             <h3 style="color: black;">Starting Prometheus</h3>
              <p style="color: black;"> To start Prometheus with your newly created configuration file, change to the directory containing the Prometheus binary and run:
           </div>
           <div class="mildly-colored">
              <div class="code-section">
                <code>
                 
# Start Prometheus.
# By default, Prometheus stores its database in ./data (flag --storage.tsdb.path).
./prometheus --config.file=prometheus.yml
                </code>
              </div>
            </div></br>
            <div class="content-section">
              <p style="color: black;">Prometheus should start up. You should also be able to browse to a status page about itself at localhost:9090. Give it a couple of seconds to collect data about itself from its own HTTP metrics endpoint.

You can also verify that Prometheus is serving metrics about itself by navigating to its metrics endpoint: localhost:9090/metrics</p> </br>
           </div>

           <div class="content-section">
             <h3 style="color: black;">Using the expression browser</h3>
              <p style="color: black;"> Let us explore data that Prometheus has collected about itself. To use Prometheus's built-in expression browser, navigate to http://localhost:9090/graph and choose the "Table" view within the "Graph" tab.</br></br>
              As you can gather from localhost:9090/metrics, one metric that Prometheus exports about itself is named prometheus_target_interval_length_seconds (the actual amount of time between target scrapes). Enter the below into the expression console and then click "Execute":
           </div>
            <div class="mildly-colored">
              <div class="code-section">
                <code>
prometheus_target_interval_length_seconds
                </code>
              </div>
            </div></br>
            <div class="content-section">
              <p style="color: black;"> This should return a number of different time series (along with the latest value recorded for each), each with the metric name prometheus_target_interval_length_seconds, but with different labels. These labels designate different latency percentiles and target group intervals.</br></br>
If we are interested only in 99th percentile latencies, we could use this query:
           </div>
            <div class="mildly-colored">
              <div class="code-section">
                <code>
prometheus_target_interval_length_seconds{quantile="0.99"}
                </code>
              </div>
            </div></br>
            <div class="content-section">
              <p style="color: black;"> To count the number of returned time series, you could write:
           </div>
            <div class="mildly-colored">
              <div class="code-section">
                <code>
count(prometheus_target_interval_length_seconds)
                </code>
              </div>
            </div></br>

               <div class="content-section">
             <h3 style="color: black;">Using the graphing interface</h3>
              <p style="color: black;">To graph expressions, navigate to http://localhost:9090/graph and use the "Graph" tab.
For example, enter the following expression to graph the per-second rate of chunks being created in the self-scraped Prometheus:</p> </br>
           </div>
            <div class="mildly-colored">
              <div class="code-section">
                <code>
rate(prometheus_tsdb_head_chunks_created_total[1m])
                </code>
              </div>
            </div></br>
            <div class="content-section">
              <p style="color: black;"> Experiment with the graph range parameters and other settings.</p> </br>
           </div>

           <div class="content-section">
             <h3 style="color: black;">Starting up some sample targets</h3>
              <p style="color: black;">Let's add additional targets for Prometheus to scrape.</br>
                <p style="color: black;"> The Node Exporter is used as an example target</br>
           </div>
           
           <div class="mildly-colored">
              <div class="code-section">
                <code>
tar -xzvf node_exporter-*.*.tar.gz
cd node_exporter-*.*

# Start 3 example targets in separate terminals:
./node_exporter --web.listen-address 127.0.0.1:8080
./node_exporter --web.listen-address 127.0.0.1:8081
./node_exporter --web.listen-address 127.0.0.1:8082
                </code>
              </div>
            </div></br>

             <div class="content-section">
              <p style="color: black;">You should now have example targets listening on http://localhost:8080/metrics, http://localhost:8081/metrics, and http://localhost:8082/metrics.

</br>
           </div>

            <div class="content-section">
             <h3 style="color: black;">Configure Prometheus to monitor the sample targets</h3>
              <p style="color: black;">Now we will configure Prometheus to scrape these new targets. Let's group all three endpoints into one job called node. We will imagine that the first two endpoints are production targets, while the third one represents a canary instance. To model this in Prometheus, we can add several groups of endpoints to a single job, adding extra labels to each group of targets. In this example, we will add the group="production" label to the first group of targets, while adding group="canary" to the second.</br></br>
                <p style="color: black;"> To achieve this, add the following job definition to the scrape_configs section in your prometheus.yml and restart your Prometheus instance:</br>
           </div>

           <div class="mildly-colored">
              <div class="code-section">
                <code>
scrape_configs:
  - job_name:       'node'

    # Override the global default and scrape targets from this job every 5 seconds.
    scrape_interval: 5s

    static_configs:
      - targets: ['localhost:8080', 'localhost:8081']
        labels:
          group: 'production'

      - targets: ['localhost:8082']
        labels:
          group: 'canary'
                </code>
              </div>
            </div></br>

             <div class="content-section">
              <p style="color: black;">Go to the expression browser and verify that Prometheus now has information about time series that these example endpoints expose, such as node_cpu_seconds_total.</br>
         
           </div>
            <div class="content-section">
             <h3 style="color: black;">Configure rules for aggregating scraped data into new time serie</h3>
              <p style="color: black;">Though not a problem in our example, queries that aggregate over thousands of time series can get slow when computed ad-hoc. To make this more efficient, Prometheus can prerecord expressions into new persisted time series via configured recording rules. Let's say we are interested in recording the per-second rate of cpu time (node_cpu_seconds_total) averaged over all cpus per instance (but preserving the job, instance and mode dimensions) as measured over a window of 5 minutes. We could write this as:</br>
           </div>

    <div class="mildly-colored">
              <div class="code-section">
                <code>
avg by (job, instance, mode) (rate(node_cpu_seconds_total[5m]))
                </code>
              </div>
            </div></br>

            <div class="content-section">
              <p style="color: black;">Try graphing this expression.</br>
                <p style="color: black;">To record the time series resulting from this expression into a new metric called job_instance_mode:node_cpu_seconds:avg_rate5m, create a file with the following recording rule and save it as prometheus.rules.yml:</br>
           </div>
            <div class="mildly-colored">
              <div class="code-section">
                <code>
groups:
- name: cpu-node
  rules:
  - record: job_instance_mode:node_cpu_seconds:avg_rate5m
    expr: avg by (job, instance, mode) (rate(node_cpu_seconds_total[5m]))
                </code>
              </div>
            </div></br>

             <div class="content-section">
                <p style="color: black;">To make Prometheus pick up this new rule, add a rule_files statement in your prometheus.yml. The config should now look like this:

</br>
           </div>

            <div class="mildly-colored">
              <div class="code-section">
                <code>
global:
  scrape_interval:     15s # By default, scrape targets every 15 seconds.
  evaluation_interval: 15s # Evaluate rules every 15 seconds.

  # Attach these extra labels to all timeseries collected by this Prometheus instance.
  external_labels:
    monitor: 'codelab-monitor'

rule_files:
  - 'prometheus.rules.yml'

scrape_configs:
  - job_name: 'prometheus'

    # Override the global default and scrape targets from this job every 5 seconds.
    scrape_interval: 5s

    static_configs:
      - targets: ['localhost:9090']

  - job_name:       'node'

    # Override the global default and scrape targets from this job every 5 seconds.
    scrape_interval: 5s

    static_configs:
      - targets: ['localhost:8080', 'localhost:8081']
        labels:
          group: 'production'

      - targets: ['localhost:8082']
        labels:
          group: 'canary'
                </code>
              </div>
            </div></br>
            <div class="content-section">
              <p style="color: black;">Restart Prometheus with the new configuration and verify that a new time series with the metric name job_instance_mode:node_cpu_seconds:avg_rate5m is now available by querying it through the expression browser or graphing it.

</br>
           </div>

            <div class="content-section">
             <h3 style="color: black;">Shutting down your instance gracefully.</h3>
              <p style="color: black;">While Prometheus does have recovery mechanisms in the case that there is an abrupt process failure it is recommend to use the SIGTERM signal to cleanly shutdown a Prometheus instance. If you're running on Linux this can be performed by using kill -s SIGTERM <PID>, replacing <PID> with your Prometheus process ID.</br>
           </div>
           
        `,
        },
      ],
    },
    {
      title: 'Open Telemetry ▼ ', 
      content:`
      <img class="styled-image" src="opentelemetry.png">
      <div class="content-section">
    <h3 style="color: black;">Enable effective observability with high-quality, portable telemetry.</h3></br>
    <p style="color: black;">
      OpenTelemetry is a collection of APIs, SDKs, and tools. Use it to instrument, generate, collect, and export telemetry data (metrics, logs, and traces) to help you analyze your software’s performance and behavior.
    </p>
</div>

<div class="content-section">
    <p style="color: black;">
        Create and collect telemetry data from your services and software, then forward them to a variety of analysis tools.
    </p>
</div>

<div class="content-section">
    <p style="color: black;">
        100% Free and Open Source, OpenTelemetry is adopted and supported by industry leaders in the observability space.
    </p>
</div>

  </br></br> 
<div class="content-section">
    <p style="color: black;   display: flex; text-align: -webkit-center; ">
   <i><b>                        &nbsp &nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspvHigh-quality, ubiquitous, and portable telemetry to enable effective observability
    </p>
</div>
      `,
      submenus: [
        {
          title: 'Getting Started',
          content: `
             <div class="content-section">
             <h3 style="color: black;">What is OpenTelemetry ?</h3></br>
              <p style="color: black;">OpenTelemetry is an Observability framework and toolkit designed to create and manage telemetry data such as traces, metrics, and logs. Crucially, OpenTelemetry is vendor- and tool-agnostic, meaning that it can be used with a broad variety of Observability backends, including open source tools like Jaeger and Prometheus, as well as commercial offerings.
OpenTelemetry is not an observability backend like Jaeger, Prometheus, or other commercial vendors. OpenTelemetry is focused on the generation, collection, management, and export of telemetry. A major goal of OpenTelemetry is that you can easily instrument your applications or systems, no matter their language, infrastructure, or runtime environment. Crucially, the storage and visualization of telemetry is intentionally left to other tools.
</br>
           </div>

           <div class="content-section">
             <h3 style="color: black;">Why OpenTelemetry ?</h3></br>
              <p style="color: black;">With the rise of cloud computing, microservices architectures, and increasingly complex business requirements, the need for software and infrastructure observability is greater than ever.

OpenTelemetry satisfies the need for observability while following two key principles:

</br></br>You own the data that you generate. There’s no vendor lock-in.
</br></br>You only have to learn a single set of APIs and conventions.
Both principles combined grant teams and organizations the flexibility they need in today’s modern computing world.
</br>
           </div>

           <div class="content-section">
             <h3 style="color: black;">Main OpenTelemetry components</h3></br>
              <p style="color: black;">OpenTelemetry consists of the following major components:</br></br>
            <ul>
           <li>  A specification for all components  </li></br>
           <li>  A standard protocol that defines the shape of telemetry data </li></br>
           <li>  Semantic conventions that define a standard naming scheme for common telemetry data types </li></br>
           <li>  APIs that define how to generate telemetry data </li></br>
            <li> Language SDKs that implement the specification, APIs, and export of telemetry data </li></br>
            <li> A library ecosystem that implements instrumentation for common libraries and frameworks </li></br>
           <li>  Automatic instrumentation components that generate telemetry data without requiring code changes </li></br>
           <li>  The OpenTelemetry Collector, a proxy that receives, processes, and exports telemetry data </li></br>
           <li>  Various other tools, such as the OpenTelemetry Operator for Kubernetes, OpenTelemetry Helm Charts, and community assets for FaaS </li></br>
            </ul>
           </div>

           <div class="content-section">
             <h3 style="color: black;">Extensibility ?</h3></br>
              <p style="color: black;">OpenTelemetry is designed to be extensible. Some examples of how it can be extended include:</br></br>
                  <ul>
           <li>  Adding a receiver to the OpenTelemetry Collector to support telemetry data from a custom source </li></br>
           <li>  Loading custom instrumentation libraries into an SDK</li></br>
            <li> Creating a distribution of an SDK or the Collector tailored to a specific use case</li></br>
            <li> Creating a new exporter for a custom backend that doesn’t yet support the OpenTelemetry protocol (OTLP)</li></br>
            <li> Creating a custom propagator for a nonstandard context propagation format</li></br>
                  </ul>

</br>
           </div>





          `,
        },
        {
          title: 'Language APIs and SDKs',
          content: `
           <div class="content-section">
             <h3 style="color: black;">Language APIs & SDKs</h3></br>
              <p style="color: black;">OpenTelemetry code instrumentation is supported for many popular programming languages
OpenTelemetry code instrumentation is supported for the languages listed below. Depending on the language, topics covered will include some or all of the following:
</br></br>
<ul>
<li>Automatic instrumentation</li></br>
<li>Manual instrumentation</li></br>
<li>Exporting data</li></br>
</ul>
</br>
If you are using Kubernetes, you can use the OpenTelemetry Operator for Kubernetes to inject auto-instrumentation libraries for .NET, Java, Node.js, Python, Go into your application.
</br>
          `
        },
        {
          title: 'General SDK Configuration',
          content: `
           <div class="content-section">
             <h3 style="color: black;">OTEL_SERVICE_NAME</h3></br>
              <p style="color: black;">Sets the value of the service.name resource attribute.</br>

Default value: "unknown_service"</br>

If service.name is also provided in OTEL_RESOURCE_ATTRIBUTES, then OTEL_SERVICE_NAME takes precedence.</br></br>

<div class="mildly-colored">
              <div class="code-section">
                <code>
export OTEL_SERVICE_NAME="your-service-name"
                </code>
              </div>
            </div></br>

<div class="content-section">
             <h3 style="color: black;">OTEL_RESOURCE_ATTRIBUTES</h3></br>
              <p style="color: black;">Key-value pairs to be used as resource attributes. See Resource SDK for more details.</br>
Default value: Empty.</br>
See Resource semantic conventions for semantic conventions to follow for common resource types.</br></br>


<div class="mildly-colored">
              <div class="code-section">
                <code>
export OTEL_RESOURCE_ATTRIBUTES="key1=value1,key2=value2"
                </code>
              </div>
            </div></br>


            <div class="content-section">
             <h3 style="color: black;">OTEL_TRACES_SAMPLER</h3></br>
              <p style="color: black;">Specifies the Sampler used to sample traces by the SDK.</br>
Default value: "parentbased_always_on"</br>
</br>


<div class="mildly-colored">
              <div class="code-section">
                <code>
export OTEL_RESOURCE_ATTRIBUTES="key1=value1,key2=value2"
                </code>
              </div>
            </div></br>

            <div class="content-section">
              <p style="color: black;">Accepted values for OTEL_TRACES_SAMPLER are:</br></br>

              <div class="mildly-colored">
              <div class="code-section">
                <code>
"always_on": AlwaysOnSampler
"always_off": AlwaysOffSampler
"traceidratio": TraceIdRatioBased
"parentbased_always_on": ParentBased(root=AlwaysOnSampler)
"parentbased_always_off": ParentBased(root=AlwaysOffSampler)
"parentbased_traceidratio": ParentBased(root=TraceIdRatioBased)
"parentbased_jaeger_remote": ParentBased(root=JaegerRemoteSampler)
"jaeger_remote": JaegerRemoteSampler
                </code>
              </div>
            </div></br>


</br>

</br>

<div class="content-section">
             <h3 style="color: black;">OTEL_TRACES_SAMPLER_ARG</h3></br>
              <p style="color: black;">Specifies arguments, if applicable, to the sampler defined in by OTEL_TRACES_SAMPLER. The specified value will only be used if OTEL_TRACES_SAMPLER is set. Each Sampler type defines its own expected input, if any. Invalid or unrecognized input is logged as an error.</br>
Default value: Empty.</br>
See Resource semantic conventions for semantic conventions to follow for common resource types.</br></br>


<div class="mildly-colored">
              <div class="code-section">
                <code>
export OTEL_TRACES_SAMPLER="traceidratio"
export OTEL_TRACES_SAMPLER_ARG="0.5"
                </code>
              </div>
            </div></br>

            <div class="content-section">
              <p style="color: black;">Depending on the value of OTEL_TRACES_SAMPLER, OTEL_TRACES_SAMPLER_ARG may be set as follows:

For traceidratio and parentbased_traceidratio samplers: Sampling probability, a number in the [0..1] range, e.g. “0.25”. Default is 1.0 if unset.
For jaeger_remote and parentbased_jaeger_remote: The value is a comma separated list:
Example: "endpoint=http://localhost:14250,pollingIntervalMs=5000,initialSamplingRate=0.25"</br></br>
endpoint: the endpoint in form of scheme://host:port of gRPC server that serves the sampling strategy for the service (sampling.proto).
pollingIntervalMs: in milliseconds indicating how often the sampler will poll the backend for updates to sampling strategy.
initialSamplingRate: in the [0..1] range, which is used as the sampling probability when the backend cannot be reached to retrieve a sampling strategy. This value stops having an effect once a sampling strategy is retrieved successfully, as the remote strategy will be used until a new update is retrieved.
</br></br>






          `
        },
        {
          title: 'C++',
          content: `
          <div class="content-section">
             <h3 style="color: black;">Getting Started</h3></br>
              <p style="color: black;">This page will show you how to get started with OpenTelemetry in C++.</p> </br>
           </div>

            <div class="content-section">
             <h3 style="color: black;">Prerequisites</h3></br>
              <p style="color: black;">Ensure that you have the following installed locally:
<ul></br>
<li>Git </li></br>
<li>C++ compiler supporting C++ version >= 14
 </li></br>
<li>Make</li></br>
<li>C Make version >= 3.25
 </li></br>
</ul>
</p> </br>
           </div>

           <div class="content-section">
             <h3 style="color: black;">Example application</h3></br>
              <p style="color: black;">The following example uses a basic Oat++ application. If you are not using Oat++, that’s OK - you can use OpenTelemetry C++ with any other web framework as well.</p> </br>
           </div>

           <div class="content-section">
             <h3 style="color: black;">Setup</h3></br>
              <p style="color: black;">Create a folder named otel-cpp-starter.

move into the newly created folder. This will serve as your working directory.

After setting up dependencies, your directory structure should resemble this:</p> </br>
           </div>

            <div class="mildly-colored">
              <div class="code-section">
                <code>
otel-cpp-starter
├── oatpp
├── opentelemetry-cpp
└── roll-dice
                </code>
              </div>
            </div></br>

    <div class="content-section">
             <h3 style="color: black;">Dependencies</h3></br>
              <p style="color: black;">To begin, install Oat++ locally using the source code and make, following these steps:</p> </br>
           </div>



            <div class="content-section">
              <p style="color: black;">1. Obtain the Oat++ source code by cloning from the oatpp/oatpp GitHub repository.</p> </br>
           </div>
           <div class="mildly-colored">
              <div class="code-section">
                <code>
git clone https://github.com/oatpp/oatpp.git
                </code>
              </div>
            </div></br>


             <div class="content-section">
              <p style="color: black;">2. Navigate to the oatpp directory and switch to 1.3.0 version for now:</p> </br>
           </div>
           <div class="mildly-colored">
              <div class="code-section">
                <code>
cd oatpp
git checkout 1.3.0-latest
                </code>
              </div>
            </div></br>


             <div class="content-section">
              <p style="color: black;">3. Create a build subdirectory and navigate into it.</p> </br>
           </div>
           <div class="mildly-colored">
              <div class="code-section">
                <code>
mkdir build
cd build
                </code>
              </div>
            </div></br>


             <div class="content-section">
              <p style="color: black;">4. Build oatpp using the cmake and make commands. This command will trigger the build process specified in the CMakeLists.txt included in the oatpp source code.

</p> </br>
           </div>
           <div class="mildly-colored">
              <div class="code-section">
                <code>
cmake ..
make
                </code>
              </div>
            </div></br>


             <div class="content-section">
              <p style="color: black;">5. Install oatpp.</br>
              This command will install the built oatpp library and headers on your system, making it accessible for development in your project.
</p> </br>
           </div>
           <div class="mildly-colored">
              <div class="code-section">
                <code>
sudo make install
                </code>
              </div>
            </div></br>
            <div class="content-section">
              <p style="color: black;">To uninstall the built oatpp library and headers from your system.</br>
             
</p> </br>
           </div>
            <div class="mildly-colored">
              <div class="code-section">
                <code>
sudo make uninstall
                </code>
              </div>
            </div></br>

            <div class="content-section">
              <p style="color: black;">Next, install and build OpenTelemetry C++ locally using CMake, following these steps:</br>
             
</p> </br>
           </div>



            <div class="content-section">
              <p style="color: black;">1. In your terminal, navigate back to the otel-cpp-starter directory. Then, clone the OpenTelemetry C++ GitHub repository to your local machine.
</p> </br>
           </div>
           <div class="mildly-colored">
              <div class="code-section">
                <code>
git clone https://github.com/open-telemetry/opentelemetry-cpp.git
                </code>
              </div>
            </div></br>
          

            <div class="content-section">
              <p style="color: black;">2. Change your working directory to the OpenTelemetry C++ SDK directory.
</p> </br>
           </div>
           <div class="mildly-colored">
              <div class="code-section">
                <code>
cd opentelemetry-cpp
                </code>
              </div>
            </div></br>

             <div class="content-section">
              <p style="color: black;">3. Create a build directory and navigate into it.
</p> </br>
           </div>
           <div class="mildly-colored">
              <div class="code-section">
                <code>
mkdir build
cd build
                </code>
              </div>
            </div></br>


             <div class="content-section">
              <p style="color: black;">3. In the build directory run CMake, to configure and generate the build system without enabling tests:
</p> </br>
           </div>
           <div class="mildly-colored">
              <div class="code-section">
                <code>
cmake -DBUILD_TESTING=OFF ..
                </code>
              </div>
            </div></br>


              <div class="content-section">
              <p style="color: black;">5. Execute the build process:
</p> </br>
           </div>
           <div class="mildly-colored">
              <div class="code-section">
                <code>
cmake --build .
                </code>
              </div>
            </div></br>
          

            <div class="content-section">
              <p style="color: black;">6. Install OpenTelemetry C++ in otel-cpp-starter/otel-cpp:
</p> </br>
           </div>
           <div class="mildly-colored">
              <div class="code-section">
                <code>
cmake --install . --prefix ../../otel-cpp
                </code>
              </div>
            </div></br>
 <div class="content-section">
              <p style="color: black;">With Oat++ and OpenTelemetry C++ ready, you can continue with creating the HTTP Server, that we want to instrument eventually.
</p> </br>
           </div>

         <div class="content-section">
             <h3 style="color: black;">Create and launch an HTTP Server</h3></br>
              <p style="color: black;">In your otel-cpp-starter folder, create a subfolder roll-dice, where the Oat++ library will be used by referencing the oatpp headers and linking them when compiling your project.</br></br>

Create a file called CMakeLists.txt inside roll-dice to define the Oat++ library directories, include paths, and link against Oat++ during the compilation process.</p> </br>
           </div>
           
            <div class="mildly-colored">
              <div class="code-section">
                <code>
cmake_minimum_required(VERSION 3.25)
project(RollDiceServer)
# Set C++ standard (e.g., C++17)
set(CMAKE_CXX_STANDARD 17)
set(project_name roll-dice-server)

# Define your project's source files
set(SOURCES
    main.cpp  # Add your source files here
)

# Create an executable target
add_executable(dice-server {SOURCES})

set(OATPP_ROOT ../oatpp)
find_library(OATPP_LIB NAMES liboatpp.a HINTS "{OATPP_ROOT}/build/src/" NO_DEFAULT_PATH)

if (NOT OATPP_LIB)
  message(SEND_ERROR "Did not find oatpp library {OATPP_ROOT}/build/src")
endif()
#set the path to the directory containing "oatpp" package configuration files
include_directories({OATPP_ROOT}/src)
target_link_libraries(dice-server PRIVATE {OATPP_LIB})

                </code>
              </div>
            </div></br>

     <div class="content-section">
              <p style="color: black;">Next, the sample HTTP server source code is needed. It will do the following:</p> </br>
          </br><ul>
          <li>Initialize an HTTP router and set up a request handler to generate a random number as the response when a GET request is made to the /rolldice endpoint.</li></br>
          <li>Next, create a connection handler, a connection provider, and start the server on localhost:8080.</li></br>
          <li>Lastly, initialize and run the application within the main function.</li></br>
          </ul></br>
          <p style="color: black;">In that roll-dice folder, create a file called main.cpp and add the following code to the file. </br>

              </div>

               <div class="mildly-colored">
              <div class="code-section">
                <code>
#include "oatpp/web/server/HttpConnectionHandler.hpp"
#include "oatpp/network/Server.hpp"
#include "oatpp/network/tcp/server/ConnectionProvider.hpp"
#include <cstdlib>
#include <ctime>
#include <string>

using namespace std;

class Handler : public oatpp::web::server::HttpRequestHandler {
public:
  shared_ptr<OutgoingResponse> handle(const shared_ptr<IncomingRequest>& request) override {
    int low = 1;
    int high = 7;
    int random = rand() % (high - low) + low;
    // Convert a std::string to oatpp::String
    const string response = to_string(random);
    return ResponseFactory::createResponse(Status::CODE_200, response.c_str());
  }
};

void run() {
  auto router = oatpp::web::server::HttpRouter::createShared();
  router->route("GET", "/rolldice", std::make_shared<Handler>());
  auto connectionHandler = oatpp::web::server::HttpConnectionHandler::createShared(router);
  auto connectionProvider = oatpp::network::tcp::server::ConnectionProvider::createShared({"localhost", 8080, oatpp::network::Address::IP_4});
  oatpp::network::Server server(connectionProvider, connectionHandler);
  OATPP_LOGI("Dice Server", "Server running on port %s", static_cast<const char*>(connectionProvider->getProperty("port").getData()));
  server.run();
}

int main() {
  oatpp::base::Environment::init();
  srand((int)time(0));
  run();
  oatpp::base::Environment::destroy();
  return 0;
}

                </code>
              </div>
            </div></br>

               <div class="content-section">
            
              <p style="color: black;">Build and run the application with the following CMake commands.</p> </br>
           </div>
           
           <div class="mildly-colored">
              <div class="code-section">
                <code>
mkdir build
cd build
cmake ..
cmake --build .
                </code>
              </div>
            </div></br>

             <div class="content-section">
            
              <p style="color: black;">After successfully building your project, you can run the generated executable.</p> </br>
           </div>

           <div class="mildly-colored">
              <div class="code-section">
                <code>
./dice-server
                </code>
              </div>
            </div></br>

  <div class="content-section">
             <h3 style="color: black;">Instrumentation</h3></br>
              <p style="color: black;">To add OpenTelemetry to your application, update the CMakeLists.txt file with the following additional dependencies.</p> </br>
           </div>

           <div class="mildly-colored">
              <div class="code-section">
                <code>
cmake_minimum_required(VERSION 3.25)
project(RollDiceServer)
# Set C++ standard (e.g., C++17)
set(CMAKE_CXX_STANDARD 17)
set(project_name roll-dice-server)

# Define your project's source files
set(SOURCES
    main.cpp  # Add your source files here
)
# Create an executable target
add_executable(dice-server {SOURCES})

set(OATPP_ROOT ../oatpp)
set(opentelemetry-cpp_DIR ../otel-cpp/lib/cmake/opentelemetry-cpp)
find_library(OATPP_LIB NAMES liboatpp.a HINTS "{OATPP_ROOT}/build/src/" NO_DEFAULT_PATH)
if (NOT OATPP_LIB)
  message(SEND_ERROR "Did not find oatpp library {OATPP_ROOT}/build/src")
endif()
# set the path to the directory containing "oatpp" package configuration files
include_directories({OATPP_ROOT}/src)

# Use find_package to include OpenTelemetry C++
find_package(opentelemetry-cpp CONFIG REQUIRED NO_DEFAULT_PATH)

# Link against each OpenTelemetry C++ library
target_link_libraries(dice-server PRIVATE
                      {OATPP_LIB}
                      {OPENTELEMETRY_CPP_LIBRARIES})

                </code>
              </div>
            </div></br>

          <div class="content-section">
             <h3 style="color: black;"></h3></br>
              <p style="color: black;">Update the main.cpp file with the following code to initialize a tracer and to emit spans when the /rolldice request handler is called.</p> </br>
           </div>

           <div class="mildly-colored">
              <div class="code-section">
                <code>
#include "oatpp/web/server/HttpConnectionHandler.hpp"
#include "oatpp/network/Server.hpp"
#include "oatpp/network/tcp/server/ConnectionProvider.hpp"

#include "opentelemetry/exporters/ostream/span_exporter_factory.h"
#include "opentelemetry/sdk/trace/exporter.h"
#include "opentelemetry/sdk/trace/processor.h"
#include "opentelemetry/sdk/trace/simple_processor_factory.h"
#include "opentelemetry/sdk/trace/tracer_provider_factory.h"
#include "opentelemetry/trace/provider.h"

#include <cstdlib>
#include <ctime>
#include <string>

using namespace std;
namespace trace_api = opentelemetry::trace;
namespace trace_sdk = opentelemetry::sdk::trace;
namespace trace_exporter = opentelemetry::exporter::trace;

namespace {
  void InitTracer() {
    auto exporter  = trace_exporter::OStreamSpanExporterFactory::Create();
    auto processor = trace_sdk::SimpleSpanProcessorFactory::Create(std::move(exporter));
    std::shared_ptr<opentelemetry::trace::TracerProvider> provider =
      trace_sdk::TracerProviderFactory::Create(std::move(processor));
    //set the global trace provider
    trace_api::Provider::SetTracerProvider(provider);
  }
  void CleanupTracer() {
    std::shared_ptr<opentelemetry::trace::TracerProvider> none;
    trace_api::Provider::SetTracerProvider(none);
  }

}

class Handler : public oatpp::web::server::HttpRequestHandler {
public:
  shared_ptr<OutgoingResponse> handle(const shared_ptr<IncomingRequest>& request) override {
    auto tracer = opentelemetry::trace::Provider::GetTracerProvider()->GetTracer("my-app-tracer");
    auto span = tracer->StartSpan("RollDiceServer");
    int low = 1;
    int high = 7;
    int random = rand() % (high - low) + low;
    // Convert a std::string to oatpp::String
    const string response = to_string(random);
    span->End();
    return ResponseFactory::createResponse(Status::CODE_200, response.c_str());
  }
};

void run() {
  auto router = oatpp::web::server::HttpRouter::createShared();
  router->route("GET", "/rolldice", std::make_shared<Handler>());
  auto connectionHandler = oatpp::web::server::HttpConnectionHandler::createShared(router);
  auto connectionProvider = oatpp::network::tcp::server::ConnectionProvider::createShared({"localhost", 8080, oatpp::network::Address::IP_4});
  oatpp::network::Server server(connectionProvider, connectionHandler);
  OATPP_LOGI("Dice Server", "Server running on port %s", static_cast<const char*>(connectionProvider->getProperty("port").getData()));
  server.run();
}

int main() {
  oatpp::base::Environment::init();
  InitTracer();
  srand((int)time(0));
  run();
  oatpp::base::Environment::destroy();
  CleanupTracer();
  return 0;
}

                </code>
              </div>
            </div></br>
           
                 <div class="content-section">
              <p style="color: black;">Build your project again.</p> </br>
           </div>

           <div class="mildly-colored">
              <div class="code-section">
                <code>
cd build
cmake ..
cmake --build .

                </code>
              </div>
            </div></br>

              <div class="content-section">
              <p style="color: black;">After successfully building your project, you can run the generated executable.
</p> </br>
           </div>

           <div class="mildly-colored">
              <div class="code-section">
                <code>
./dice-server
                </code>
              </div>
            </div></br>

              <div class="content-section">
              <p style="color: black;">When you send a request to the server at http://localhost:8080/rolldice, you will see a span being emitted to the terminal.
</p> </br>
           </div>


           <div class="mildly-colored">
              <div class="code-section">
                <code>
{
  "name" : "RollDiceServer",
  "trace_id": "f47bea385dc55e4d17470d51f9d3130b",
  "span_id": "deed994b51f970fa",
  "tracestate" : ,
  "parent_span_id": "0000000000000000",
  "start": 1698991818716461000,
  "duration": 64697,
  "span kind": "Internal",
  "status": "Unset",
  "service.name": "unknown_service",
  "telemetry.sdk.language": "cpp",
  "telemetry.sdk.name": "opentelemetry",
  "telemetry.sdk.version": "1.11.0",
  "instr-lib": "my-app-tracer"
}
                </code>
              </div>
            </div></br>
<div class="content-section">
             <h3 style="color: black;">Next steps
</h3></br>
              <p style="color: black;">For more information about instrumenting your code, refer the instrumentation documentation.

You’ll also want to configure an appropriate exporter to export your telemetry data to one or more telemetry backends.</p> </br>
           </div>
          `
        },
        {
          title: '.NET',
          content: `
          <div class="content-section">
    <h3 style="color: black;">Getting Started</h3></br>
    <p style="color: black;">Get telemetry for your app in less than 5 minutes!
    This page will show you how to get started with OpenTelemetry in .NET.

    If you are looking for a way to automatically instrument your application, check out this guide.

    You will learn how you can instrument a simple .NET application, in such a way that traces, metrics and logs are emitted to the console.</p> </br>
</div>
<div class="content-section">
    <h3 style="color: black;">Prerequisites</h3></br>
    <p style="color: black;">Ensure that you have the following installed locally:

    .NET SDK 6+</p> </br>
</div>
<div class="content-section">
    <h3 style="color: black;">Example Application</h3></br>
    <p style="color: black;">The following example uses a basic Minimal API with ASP.NET Core application. If you are not using a minimal API with ASP.NET Core, that’s OK — you can use OpenTelemetry .NET with other frameworks as well. For a complete list of libraries for supported frameworks, see the registry.

    For more elaborate examples, see examples.</p> </br>
</div>
<div class="content-section">
    <h3 style="color: black;">Create and launch an HTTP Server</h3></br>
    <p style="color: black;">To begin, set up an environment in a new directory called dotnet-simple. Within that directory, execute the following command:</p> </br>
</div>
 <div class="mildly-colored">
              <div class="code-section">
                <code>
dotnet new web
                </code>
              </div>
            </div></br>

            <div class="content-section">
    <h3 style="color: black;">Create and launch an HTTP Server</h3></br>
    <p style="color: black;">In the same directory, replace the content of Program.cs with the following code:</p> </br>
</div>


 <div class="mildly-colored">
              <div class="code-section">
                <code>
using System.Globalization;

using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

string HandleRollDice([FromServices]ILogger<Program> logger, string? player)
{
    var result = RollDice();

    if (string.IsNullOrEmpty(player))
    {
        logger.LogInformation("Anonymous player is rolling the dice: {result}", result);
    }
    else
    {
        logger.LogInformation("{player} is rolling the dice: {result}", player, result);
    }

    return result.ToString(CultureInfo.InvariantCulture);
}

int RollDice()
{
    return Random.Shared.Next(1, 7);
}

app.MapGet("/rolldice/{player?}", HandleRollDice);

app.Run();

                </code>
              </div>
            </div></br>
          
           <div class="content-section">
   
    <p style="color: black;">In the Properties subdirectory, replace the content of launchSettings.json with the following:
</p> </br>
</div>

 <div class="mildly-colored">
              <div class="code-section">
                <code>
{
  "$schema": "http://json.schemastore.org/launchsettings.json",
  "profiles": {
    "http": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "applicationUrl": "http://localhost:8080",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}

                </code>
              </div>
            </div></br>

 <div class="content-section">
  
    <p style="color: black;">Build and run the application with the following command, then open http://localhost:8080/rolldice in your web browser to ensure it is working.</p> </br>
</div>

 <div class="mildly-colored">
              <div class="code-section">
                <code>
dotnet build
dotnet run

                </code>
              </div>
            </div></br>

            <div class="content-section">
    <h3 style="color: black;">Instrumentation</h3></br>
    <p style="color: black;">Next, we’ll install the instrumentation NuGet packages from OpenTelemetry that will generate the telemetry, and set them up.</p> </br>
</div>


<div class="content-section">
    <p style="color: black;">Next we’ll install the instrumentation NuGet packages from OpenTelemetry that will generate the telemetry, and set them up.</p> </br>
    
   
    <p style="color: black;">Add the packages<br>
     <div class="mildly-colored">
              <div class="code-section">
                <code>
dotnet add package OpenTelemetry.Extensions.Hosting
dotnet add package OpenTelemetry.Instrumentation.AspNetCore
dotnet add package OpenTelemetry.Exporter.Console

                </code>
              </div>
            </div></br>
    Setup the OpenTelemetry code</p> </br>
    
    <p style="color: black;">In Program.cs, replace the following lines:<br></br>
     <div class="mildly-colored">
              <div class="code-section">
                <code>
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

                </code>
              </div>
            </div></br>
    <strong>With:</strong><br></br>
     <div class="mildly-colored">
              <div class="code-section">
                <code>
using OpenTelemetry.Logs;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

var builder = WebApplication.CreateBuilder(args);

const string serviceName = "roll-dice";

builder.Logging.AddOpenTelemetry(options =>
{
    options
        .SetResourceBuilder(
            ResourceBuilder.CreateDefault()
                .AddService(serviceName))
        .AddConsoleExporter();
});
builder.Services.AddOpenTelemetry()
      .ConfigureResource(resource => resource.AddService(serviceName))
      .WithTracing(tracing => tracing
          .AddAspNetCoreInstrumentation()
          .AddConsoleExporter())
      .WithMetrics(metrics => metrics
          .AddAspNetCoreInstrumentation()
          .AddConsoleExporter());

var app = builder.Build();

                </code>
              </div>
            </div></br>
    Run your application once again:<br></br>
     <div class="mildly-colored">
              <div class="code-section">
                <code>
dotnet run
                </code>
              </div>
            </div></br>
    Note the output from the dotnet run.</p> </br>
    <p style="color: black;">From another terminal, send a request using curl:<br></br>
     <div class="mildly-colored">
              <div class="code-section">
                <code>
curl localhost:8080/rolldice
                </code>
              </div>
            </div></br>
    After about 30 sec, stop the server process.</p> </br>
    <p style="color: black;">At this point, you should see trace and log output from the server and client that looks something like this (output is line-wrapped for readability)</p> </br>
</div>

<div class="content-section">
    <h3 style="color: black;">What next?</h3></br>
    <p style="color: black;">For more:</p> </br>
    <ul>
        <li><p style="color: black;">Run this example with another exporter for telemetry data.</p></li>
        <li><p style="color: black;">Try automatic instrumentation on one of your own apps.</p></li>
        <li><p style="color: black;">Learn about manual instrumentation and try out more examples.</p></li>
        <li><p style="color: black;">Take a look at the OpenTelemetry Demo, which includes .NET based Cart Service.</p></li>
    </ul>
</div>

          
          `
        },
        {
          title: 'Elixir',
          content: `
          
          <div class="content-section">
    <h3 style="color: black;">Getting Started</h3></br>
    <p style="color: black;">Welcome to the OpenTelemetry for Erlang/Elixir getting started guide! This guide will walk you through the basic steps in installing, configuring, and exporting data from OpenTelemetry.</p> </br>
    <h3 style="color: black;">Phoenix</h3></br>
    <p style="color: black;">This part of the guide will show you how to get started with OpenTelemetry in the Phoenix Web Framework.</p> </br>
    <h3 style="color: black;">Prerequisites</h3></br>
    <p style="color: black;">Ensure that you have Erlang, Elixir, PostgreSQL (or the database of your choice), and Phoenix installed locally. The Phoenix installation guide will help you get set up with everything you need.</p> </br>
    <h3 style="color: black;">Example Application</h3></br>
    <p style="color: black;">The following example will take you through creating a basic Phoenix web application and instrumenting it with OpenTelemetry. For reference, a complete example of the code you will build can be found here: opentelemetry-erlang-contrib/examples/roll_dice.</p> </br>

    <div class="mildly-colored">
        <div class="code-section">
            <code>
# Initial Setup
Run mix phx.new roll_dice. Type “y” to install dependencies.
            </code>
        </div>
    </div></br>
    <p style="color: black;"><strong>Dependencies</strong></p> </br>
    <ul>
        <li><p style="color: black;">opentelemetry_api: contains the interfaces you’ll use to instrument your code. Things like Tracer.with_span and Tracer.set_attribute are defined here.</p></li>
        <li><p style="color: black;">opentelemetry: contains the SDK that implements the interfaces defined in the API. Without it, all the functions in the API are no-ops.</p></li>
        <li><p style="color: black;">opentelemetry_exporter: allows you to send your telemetry data to an OpenTelemetry Collector and/or to self-hosted or commercial services.</p></li>
        <li><p style="color: black;">opentelemetry_phoenix: creates OpenTelemetry spans from the Elixir :telemetry events created by Phoenix.</p></li>
        <li><p style="color: black;">web server dependencies: There are currently two options for web servers and each has their telemetry counterpart. Phoenix applications post 1.7.11 default to Bandit while pre 1.7.11 default to Cowboy. Both choices are valid. Use one of the below options based on the web server your Phoenix application uses:</p>
            <ul>
                <li><p style="color: black;">opentelemetry_cowboy: creates OpenTelemetry spans from the Elixir :telemetry events created by the Cowboy web server</p></li>
                <li><p style="color: black;">opentelemetry_bandit: creates OpenTelemetry spans from the Elixir :telemetry events created by the Bandit web server</p></li>
            </ul>
        </li>
    </ul></br>
    <div class="mildly-colored">
        <div class="code-section">
            <code>
         
# mix.exs
def deps do
  [
    # other default deps...
    {:opentelemetry, "~> 1.3"},
    {:opentelemetry_api, "~> 1.2"},
    {:opentelemetry_exporter, "~> 1.6"},
    {:opentelemetry_phoenix, "~> 1.1"},
    # for Cowboy
    {:opentelemetry_cowboy, "~> 0.2"},
    # for Bandit
    {:opentelemetry_bandit, "~> 0.1.4"},
    {:opentelemetry_ecto, "~> 1.2"} # if using ecto
  ]
end
            </code>
        </div>
    </div></br>
     <div class="content-section">
              <p style="color: black;">The last three also need to be setup when your application starts:</p> </br>
          </div>
    <div class="mildly-colored">
        <div class="code-section">
            <code>
# application.ex
@impl true
def start(_type, _args) do
  # Depending on what webserver you are using, you will either use:
  :opentelemetry_cowboy.setup()
  OpentelemetryPhoenix.setup(adapter: :cowboy2)
  # or
  OpentelemetryBandit.setup()
  OpentelemetryPhoenix.setup(adapter: :bandit)
  OpentelemetryEcto.setup([:dice_game, :repo]) # if using ecto
end
            </code>
        </div>
    </div></br>
    Also, make sure your endpoint.ex file contains the following line:
   </br> </br><div class="mildly-colored">
        <div class="code-section">
            <code>
# endpoint.ex
plug Plug.Telemetry, event_prefix: [:phoenix, :endpoint]
            </code>
        </div>
    </div></br>
    <p style="color: black;">We also need to configure the opentelemetry application as temporary by adding a releases section to your project configuration. This will ensure that if it terminates, even abnormally, the roll_dice application will be terminated.</p> </br>
</div>

<div class="content-section">
    <div class="mildly-colored">
        <div class="code-section">
            <code>
# mix.exs
def project do
  [
    app: :roll_dice,
    version: "0.1.0",
    elixir: "~> 1.14",
    elixirc_paths: elixirc_paths(Mix.env()),
    start_permanent: Mix.env() == :prod,
    releases: [
      roll_dice: [
        applications: [opentelemetry: :temporary]
      ]
    ],
    aliases: aliases(),
    deps: deps()
  ]
end
            </code>
        </div>
    </div></br>
    <p style="color: black;">The last thing you’ll need is to configure the exporter. For development, we can use the stdout exporter to ensure everything is working properly. Configure OpenTelemetry’s traces_exporter like so:</p> </br>
    <div class="mildly-colored">
        <div class="code-section">
            <code>
# config/dev.exs
config :opentelemetry, traces_exporter: {:otel_exporter_stdout, []}
            </code>
        </div>
    </div></br>
    <p style="color: black;">Now we can use the new mix setup command to install the dependencies, build the assets, and create and migrate the database.</p> </br>
    <p style="color: black;"><strong>Try It Out</strong></p> </br>
    <div class="mildly-colored">
        <div class="code-section">
            <code>
Run mix phx.server.
            </code>
        </div>
    </div></br>
    <p style="color: black;">If everything went well, you should be able to visit localhost:4000 in your browser and see quite a few lines that look like this in your terminal.</p> </br>
    <p style="color: black;">(Don’t worry if the format looks a little unfamiliar. Spans are recorded in the Erlang record data structure. You can find more information about records <a href="link_to_records_info_here">here</a>, and this file describes the span record structure, and explains what the different fields are.)</p> </br>
    <div class="mildly-colored">
        <div class="code-section">
            <code>
*SPANS FOR DEBUG*
{span,64480120921600870463539706779905870846,11592009751350035697,[],
      undefined,<<"/">>,server,-576460731933544855,-576460731890088522,
      {attributes,128,infinity,0,
                  #{'http.status_code' => 200,
                    'http.client_ip' => <<"127.0.0.1">>,
                    'http.flavor' => '1.1','http.method' => <<"GET">>,
                    'http.scheme' => <<"http">>,'http.target' => <<"/">>,
                    'http.user_agent' =>
                        <<"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36">>,
                    'net.transport' => 'IP.TCP',
                    'net.host.name' => <<"localhost">>,
                    'net.host.port' => 4000,'net.peer.port' => 62839,
                    'net.sock.host.addr' => <<"127.0.0.1">>,
                    'net.sock.peer.addr' => <<"127.0.0.1">>,
                    'http.route' => <<"/">>,'phoenix.action' => home,
                    'phoenix.plug' =>
                        'Elixir.RollDiceWeb.PageController'}},
      {events,128,128,infinity,0,[]},
      {links,128,128,infinity,0,[]},
      undefined,1,false,
      {instrumentation_scope,<<"opentelemetry_phoenix">>,<<"1.1.0">>,
                             undefined}}
            </code>
        </div>
    </div></br>
    <p style="color: black;"><strong>Rolling The Dice</strong></p> </br>
    <p style="color: black;">Now we’ll create the API endpoint that will let us roll the dice and return a random number between 1 and 6.</p> </br>
    <div class="mildly-colored">
        <div class="code-section">
            <code>
# router.ex
scope "/api", RollDiceWeb do
  pipe_through :api

  get "/rolldice", DiceController, :roll
end
            </code>
        </div>
    </div></br>
    <p style="color: black;">And create a bare DiceController without any instrumentation:</p> </br>
    <div class="mildly-colored">
        <div class="code-section">
            <code>
# lib/roll_dice_web/controllers/dice_controller.ex
defmodule RollDiceWeb.DiceController do
  use RollDiceWeb, :controller

  def roll(conn, _params) do
    send_resp(conn, 200, roll_dice())
  end

  defp roll_dice do
    to_string(Enum.random(1..6))
  end
end
            </code>
        </div>
    </div></br>
    <p style="color: black;">If you like, call the route to see the result. You’ll still see some telemetry pop up in your terminal. Now it’s time to enrich that telemetry by instrumenting our roll function by hand.</p> </br>
    <p style="color: black;">In our DiceController we call a private dice_roll method that generates our random number. This seems like a pretty important operation, so in order to capture it in our trace we’ll need to wrap it in a span.</p> </br>
    <div class="mildly-colored">
        <div class="code-section">
            <code>
defmodule RollDiceWeb.DiceController do
  use RollDiceWeb, :controller
  require OpenTelemetry.Tracer, as: Tracer

  # ...snip

  defp roll_dice do
    Tracer.with_span("dice_roll") do
      to_string(Enum.random(1..6))
    end
  end
end
            </code>
        </div>
    </div></br>
    <p style="color: black;">It would also be nice to know what number it generated, so we can extract it as a local variable and add it as an attribute on the span.</p> </br>
    <div class="mildly-colored">
        <div class="code-section">
            <code>
defp roll_dice do
  Tracer.with_span("dice_roll") do
    roll = Enum.random(1..6)

    Tracer.set_attribute(:roll, roll)

    to_string(roll)
  end
end
            </code>
        </div>
    </div></br>
    <p style="color: black;">Now if you point your browser/curl/etc. to localhost:4000/api/rolldice you should get a random number in response, and 3 spans in your console.</p> </br>
    <p style="color: black;"><strong>Next Steps</strong></p> </br>
    <p style="color: black;">Enrich your automatically generated instrumentation with manual instrumentation of your own codebase. This allows you to customize the observability data your application emits.</p> </br>
    <p style="color: black;">You’ll also want to configure an appropriate exporter to export your telemetry data to one or more telemetry backends.</p> </br>
    <p style="color: black;"><strong>Creating a New Mix/Rebar Project</strong></p> </br>
    <p style="color: black;">To get started with this guide, create a new project with rebar3 or mix:</p> </br>
    <div class="mildly-colored">
        <div class="code-section">
            <code>
# Erlang
rebar3 new release otel_getting_started

# Elixir
mix new otel_getting_started
            </code>
        </div>
    </div></br>
    <p style="color: black;">Then, in the project you just created, add both opentelemetry_api and opentelemetry as dependencies. We add both because this is a project we will run as a Release and export spans from.</p> </br>
    <div class="mildly-colored">
        <div class="code-section">
            <code>
# Erlang
{deps, [{opentelemetry_api, "~> 1.2"},
        {opentelemetry, "~> 1.3"}]}.

# Elixir (add releases section to mix.exs)
defp releases do
  [
    otel_getting_started: [
      applications: [:opentelemetry]
    ]
  ]
end
            </code>
        </div>
    </div></br>
</div>
<div class="content-section">
    <p style="color: black;"><strong>Initialization and Configuration</strong></p> </br>
    <p style="color: black;">Configuration is done through the OTP application environment or OS Environment Variables. The SDK (opentelemetry Application) uses the configuration to initialize a Tracer Provider, its Span Processors and the Exporter.</p> </br>
    <p style="color: black;"><strong>Using the Console Exporter</strong></p> </br>
    <p style="color: black;">Exporters are packages that allow telemetry data to be emitted somewhere - either to the console (which is what we’re doing here), or to a remote system or collector for further analysis and/or enrichment. OpenTelemetry supports a variety of exporters through its ecosystem, including popular open source tools like Jaeger and Zipkin.</p> </br>
    <p style="color: black;">To configure OpenTelemetry to use a particular exporter, in this case otel_exporter_stdout, the OTP application environment for opentelemetry must set the exporter for the span processor otel_batch_processor, a type of span processor that batches up multiple spans over a period of time:</p> </br>
    <div class="mildly-colored">
        <div class="code-section">
            <code>
%% config/sys.config.src
[
 {opentelemetry,
  [{span_processor, batch},
   {traces_exporter, {otel_exporter_stdout, []}}]}
].
            </code>
        </div>
    </div></br>
    <p style="color: black;"><strong>Working with Spans</strong></p> </br>
    <p style="color: black;">Now that the dependencies and configuration are set up, we can create a module with a function hello/0 that starts some spans:</p> </br>
    <div class="mildly-colored">
        <div class="code-section">
            <code>
%% apps/otel_getting_started/src/otel_getting_started.erl
-module(otel_getting_started).

-export([hello/0]).

-include_lib("opentelemetry_api/include/otel_tracer.hrl").

hello() ->
    %% start an active span and run a local function
    ?with_span(operation, #{}, fun nice_operation/1).

nice_operation(_SpanCtx) ->
    ?add_event(<<"Nice operation!">>, [{<<"bogons">>, 100}]),
    ?set_attributes([{another_key, <<"yes">>}]),

    %% start an active span and run an anonymous function
    ?with_span(<<"Sub operation...">>, #{},
               fun(_ChildSpanCtx) ->
                       ?set_attributes([{lemons_key, <<"five">>}]),
                       ?add_event(<<"Sub span event!">>, [])
               end).
            </code>
        </div>
    </div></br>
    <p style="color: black;">In this example, we’re using macros that use the process dictionary for context propagation and for getting the tracer.</p> </br>
    <p style="color: black;">Inside our function, we’re creating a new span named operation with the with_span macro. The macro sets the new span as active in the current context – stored in the process dictionary, since we aren’t passing a context as a variable.</p> </br>
    <p style="color: black;">Spans can have attributes and events, which are metadata and log statements that help you interpret traces after-the-fact. The first span has an event Nice operation!, with attributes on the event, as well as an attribute set on the span itself.</p> </br>
    <p style="color: black;">Finally, in this code snippet, we can see an example of creating a child span of the currently-active span. When the with_span macro starts a new span, it uses the active span of the current context as the parent. So when you run this program, you’ll see that the Sub operation... span has been created as a child of the operation span.</p> </br>
    <p style="color: black;"><strong>To test out this project and see the spans created, you can run with rebar3 shell or iex -S mix, each will pick up the corresponding configuration for the release, resulting in the tracer and exporter to started.</strong></p> </br>
    <div class="mildly-colored">
        <div class="code-section">
            <code>
$ rebar3 shell
===> Compiling otel_getting_started
Erlang/OTP 23 [erts-11.1] [source] [64-bit] [smp:8:8] [ds:8:8:10] [async-threads:1] [hipe]

Eshell V11.1  (abort with ^G)
1>
1> otel_getting_started:hello().
true
*SPANS FOR DEBUG*
{span,177312096541376795265675405126880478701,5706454085098543673,undefined,
      13736713257910636645,<<"Sub operation...">>,internal,
      -576460750077844044,-576460750077773674,
      [{lemons_key,<<"five">>}],
      [{event,-576460750077786044,<<"Sub span event!">>,[]}],
      [],undefined,1,false,undefined}
{span,177312096541376795265675405126880478701,13736713257910636645,undefined,
      undefined,operation,internal,-576460750086570890,
      -576460750077752627,
      [{another_key,<<"yes">>}],
      [{event,-576460750077877345,<<"Nice operation!">>,[{<<"bogons">>,100}]}],
      [],undefined,1,false,undefined}
            </code>
        </div>
    </div></br>
    <p style="color: black;"><strong>Next Steps</strong></p> </br>
    <p style="color: black;">Enrich your instrumentation with more manual instrumentation.</p> </br>
    <p style="color: black;">You’ll also want to configure an appropriate exporter to export your telemetry data to one or more telemetry backends.</p> </br>
</div>



          `
        },
        {
          title: 'Go',
          content: `
        <div class="content-section">
    <h3 style="color: black;">Getting Started</h3></br>
    <p style="color: black;">This page will show you how to get started with OpenTelemetry in Go.

    You will learn how you can instrument a simple application manually, in such a way that traces, metrics, and logs are emitted to the console.</p> </br>
</div>

<div class="content-section">
    <h3 style="color: black;">Prerequisites</h3></br>
    <p style="color: black;">Ensure that you have the following installed locally:</p> </br>
    <ul>
        <li><p style="color: black;">Go 1.22 or greater</p></li>
    </ul>
</div>

<div class="content-section">
    <h3 style="color: black;">Example Application</h3></br>
    <p style="color: black;">The following example uses a basic net/http application. If you are not using net/http, that’s OK — you can use OpenTelemetry Go with other web frameworks as well, such as Gin and Echo. For a complete list of libraries for supported frameworks, see the registry.</p> </br>
    <p style="color: black;">For more elaborate examples, see examples.</p> </br>
</div>

<div class="content-section">
    <h3 style="color: black;">Setup</h3></br>
    <p style="color: black;">To begin, set up a go.mod in a new directory:</p> </br>
    <div class="mildly-colored">
        <div class="code-section">
            <code>
go mod init dice
            </code>
        </div>
    </div></br>

    <div class="content-section">
        <h3 style="color: black;">Create and launch an HTTP server</h3></br>
        <p style="color: black;">In that same folder, create a file called main.go and add the following code to the file:</p> </br>
    </div>

    <div class="mildly-colored">
        <div class="code-section">
            <code>
                package main

                import (
                    "log"
                    "net/http"
                )

                func main() {
                    http.HandleFunc("/rolldice", rolldice)

                    log.Fatal(http.ListenAndServe(":8080", nil))
                }
            </code>
        </div>
    </div></br>
</div>
<div class="content-section">
    <h3 style="color: black;">Create and launch an HTTP server</h3></br>
    <p style="color: black;">In that same folder, create a file called main.go and add the following code to the file:</p> </br>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
package main

  import (
    "log"
    "net/http"
          )

  func main() {
    http.HandleFunc("/rolldice", rolldice)
    log.Fatal(http.ListenAndServe(":8080", nil))
  }
</code>
    </div>
</div></br>

<div class="content-section">
    <h3 style="color: black;">Create another file called rolldice.go and add the following code to the file:</h3></br>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
            package main

            import (
                "io"
                "log"
                "math/rand"
                "net/http"
                "strconv"
            )

            func rolldice(w http.ResponseWriter, r *http.Request) {
                roll := 1 + rand.Intn(6)

                resp := strconv.Itoa(roll) + "\n"
                if _, err := io.WriteString(w, resp); err != nil {
                    log.Printf("Write failed: %v\n", err)
                }
            }
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">Build and run the application with the following command:</h3></br>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
go run .
        </code>
    </div>
</div></br>

<div class="content-section">
    <h3 style="color: black;">Add OpenTelemetry Instrumentation</h3></br>
    <p style="color: black;">Now we’ll show how to add OpenTelemetry instrumentation to the sample app. If you are using your own application, you can follow along, just note that your code may be slightly different.</p> </br>
</div>

<div class="content-section">
    <h3 style="color: black;">Add Dependencies</h3></br>
    <p style="color: black;">Install the following packages:</p> </br>
    <ul>
        <li><p style="color: black;">go.opentelemetry.io/otel</p></li>
        <li><p style="color: black;">go.opentelemetry.io/otel/exporters/stdout/stdoutmetric</p></li>
        <li><p style="color: black;">go.opentelemetry.io/otel/exporters/stdout/stdouttrace</p></li>
        <li><p style="color: black;">go.opentelemetry.io/otel/exporters/stdout/stdoutlog</p></li>
        <li><p style="color: black;">go.opentelemetry.io/otel/sdk/log</p></li>
        <li><p style="color: black;">go.opentelemetry.io/otel/log/global</p></li>
        <li><p style="color: black;">go.opentelemetry.io/otel/propagation</p></li>
        <li><p style="color: black;">go.opentelemetry.io/otel/sdk/metric</p></li>
        <li><p style="color: black;">go.opentelemetry.io/otel/sdk/resource</p></li>
        <li><p style="color: black;">go.opentelemetry.io/otel/sdk/trace</p></li>
        <li><p style="color: black;">go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp</p></li>
        <li><p style="color: black;">go.opentelemetry.io/contrib/bridges/otelslog</p></li>
    </ul>
</div>
<div class="content-section">
    <h3 style="color: black;">Initialize the OpenTelemetry SDK</h3></br>
    <p style="color: black;">This installs OpenTelemetry SDK components and net/http instrumentation.</p> </br>
    <p style="color: black;">If you’re instrumenting a different library for network requests, you’ll need to install the appropriate instrumentation library. See libraries for more info.</p> </br>
</div>

<div class="content-section">
    <h3 style="color: black;">Create otel.go with OpenTelemetry SDK bootstrapping code:</h3></br>
    <p style="color: black;">First, we’ll initialize the OpenTelemetry SDK. This is required for any application that exports telemetry.</p> </br>
</div>
  <div class="mildly-colored">
              <div class="code-section">
                <code>
                 package main

import (
	"context"
	"errors"
	"time"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/exporters/stdout/stdoutlog"
	"go.opentelemetry.io/otel/exporters/stdout/stdoutmetric"
	"go.opentelemetry.io/otel/exporters/stdout/stdouttrace"
	"go.opentelemetry.io/otel/log/global"
	"go.opentelemetry.io/otel/propagation"
	"go.opentelemetry.io/otel/sdk/log"
	"go.opentelemetry.io/otel/sdk/metric"
	"go.opentelemetry.io/otel/sdk/trace"
)

// setupOTelSDK bootstraps the OpenTelemetry pipeline.
// If it does not return an error, make sure to call shutdown for proper cleanup.
func setupOTelSDK(ctx context.Context) (shutdown func(context.Context) error, err error) {
	var shutdownFuncs []func(context.Context) error

	// shutdown calls cleanup functions registered via shutdownFuncs.
	// The errors from the calls are joined.
	// Each registered cleanup will be invoked once.
	shutdown = func(ctx context.Context) error {
		var err error
		for _, fn := range shutdownFuncs {
			err = errors.Join(err, fn(ctx))
		}
		shutdownFuncs = nil
		return err
	}

	// handleErr calls shutdown for cleanup and makes sure that all errors are returned.
	handleErr := func(inErr error) {
		err = errors.Join(inErr, shutdown(ctx))
	}

	// Set up propagator.
	prop := newPropagator()
	otel.SetTextMapPropagator(prop)

	// Set up trace provider.
	tracerProvider, err := newTraceProvider()
	if err != nil {
		handleErr(err)
		return
	}
	shutdownFuncs = append(shutdownFuncs, tracerProvider.Shutdown)
	otel.SetTracerProvider(tracerProvider)

	// Set up meter provider.
	meterProvider, err := newMeterProvider()
	if err != nil {
		handleErr(err)
		return
	}
	shutdownFuncs = append(shutdownFuncs, meterProvider.Shutdown)
	otel.SetMeterProvider(meterProvider)

	// Set up logger provider.
	loggerProvider, err := newLoggerProvider()
	if err != nil {
		handleErr(err)
		return
	}
	shutdownFuncs = append(shutdownFuncs, loggerProvider.Shutdown)
	global.SetLoggerProvider(loggerProvider)

	return
}

func newPropagator() propagation.TextMapPropagator {
	return propagation.NewCompositeTextMapPropagator(
		propagation.TraceContext{},
		propagation.Baggage{},
	)
}

func newTraceProvider() (*trace.TracerProvider, error) {
	traceExporter, err := stdouttrace.New(
		stdouttrace.WithPrettyPrint())
	if err != nil {
		return nil, err
	}

	traceProvider := trace.NewTracerProvider(
		trace.WithBatcher(traceExporter,
			// Default is 5s. Set to 1s for demonstrative purposes.
			trace.WithBatchTimeout(time.Second)),
	)
	return traceProvider, nil
}

func newMeterProvider() (*metric.MeterProvider, error) {
	metricExporter, err := stdoutmetric.New()
	if err != nil {
		return nil, err
	}

	meterProvider := metric.NewMeterProvider(
		metric.WithReader(metric.NewPeriodicReader(metricExporter,
			// Default is 1m. Set to 3s for demonstrative purposes.
			metric.WithInterval(3*time.Second))),
	)
	return meterProvider, nil
}

func newLoggerProvider() (*log.LoggerProvider, error) {
	logExporter, err := stdoutlog.New()
	if err != nil {
		return nil, err
	}

	loggerProvider := log.NewLoggerProvider(
		log.WithProcessor(log.NewBatchProcessor(logExporter)),
	)
	return loggerProvider, nil
}

                </code>
              </div>
            </div></br>
          <div class="content-section">
    <h3 style="color: black;">Instrument the HTTP server</h3></br>
    <p style="color: black;">If you’re only using tracing or metrics, you can omit the corresponding TracerProvider or MeterProvider initialization code.</p> </br>
    <p style="color: black;">Now that we have the OpenTelemetry SDK initialized, we can instrument the HTTP server.</p> </br>
</div> 

<div class="mildly-colored">
              <div class="code-section">
                <code>
                 package main

import (
	"context"
	"errors"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"time"

	"go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
)

func main() {
	if err := run(); err != nil {
		log.Fatalln(err)
	}
}

func run() (err error) {
	// Handle SIGINT (CTRL+C) gracefully.
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)
	defer stop()

	// Set up OpenTelemetry.
	otelShutdown, err := setupOTelSDK(ctx)
	if err != nil {
		return
	}
	// Handle shutdown properly so nothing leaks.
	defer func() {
		err = errors.Join(err, otelShutdown(context.Background()))
	}()

	// Start HTTP server.
	srv := &http.Server{
		Addr:         ":8080",
		BaseContext:  func(_ net.Listener) context.Context { return ctx },
		ReadTimeout:  time.Second,
		WriteTimeout: 10 * time.Second,
		Handler:      newHTTPHandler(),
	}
	srvErr := make(chan error, 1)
	go func() {
		srvErr <- srv.ListenAndServe()
	}()

	// Wait for interruption.
	select {
	case err = <-srvErr:
		// Error when starting HTTP server.
		return
	case <-ctx.Done():
		// Wait for first CTRL+C.
		// Stop receiving signal notifications as soon as possible.
		stop()
	}

	// When Shutdown is called, ListenAndServe immediately returns ErrServerClosed.
	err = srv.Shutdown(context.Background())
	return
}

func newHTTPHandler() http.Handler {
	mux := http.NewServeMux()

	// handleFunc is a replacement for mux.HandleFunc
	// which enriches the handler's HTTP instrumentation with the pattern as the http.route.
	handleFunc := func(pattern string, handlerFunc func(http.ResponseWriter, *http.Request)) {
		// Configure the "http.route" for the HTTP instrumentation.
		handler := otelhttp.WithRouteTag(pattern, http.HandlerFunc(handlerFunc))
		mux.Handle(pattern, handler)
	}

	// Register handlers.
	handleFunc("/rolldice/", rolldice)
	handleFunc("/rolldice/{player}", rolldice)

	// Add HTTP instrumentation for the whole server.
	handler := otelhttp.NewHandler(mux, "/")
	return handler
}

                </code>
              </div>
            </div></br>
<div class="content-section">
    <h3 style="color: black;">Add Custom Instrumentation</h3></br>
    <p style="color: black;">Instrumentation libraries capture telemetry at the edges of your systems, such as inbound and outbound HTTP requests, but they don’t capture what’s going on in your application. For that you’ll need to write some custom manual instrumentation.</p> </br>
    <p style="color: black;">Modify rolldice.go to include custom instrumentation using OpenTelemetry API:</p> </br>
</div>
 <div class="mildly-colored">
              <div class="code-section">
                <code>
                 package main

import (
	"fmt"
	"io"
	"log"
	"math/rand"
	"net/http"
	"strconv"

	"go.opentelemetry.io/contrib/bridges/otelslog"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
	"go.opentelemetry.io/otel/metric"
)

const name = "go.opentelemetry.io/otel/example/dice"

var (
	tracer = otel.Tracer(name)
	meter  = otel.Meter(name)
	logger = otelslog.NewLogger(name)
	rollCnt metric.Int64Counter
)

func init() {
	var err error
	rollCnt, err = meter.Int64Counter("dice.rolls",
		metric.WithDescription("The number of rolls by roll value"),
		metric.WithUnit("{roll}"))
	if err != nil {
		panic(err)
	}
}

func rolldice(w http.ResponseWriter, r *http.Request) {
	ctx, span := tracer.Start(r.Context(), "roll")
	defer span.End()

	roll := 1 + rand.Intn(6)

	var msg string
	if player := r.PathValue("player"); player != "" {
		msg = fmt.Sprintf("%s is rolling the dice", player)
	} else {
		msg = "Anonymous player is rolling the dice"
	}
	logger.InfoContext(ctx, msg, "result", roll)

	rollValueAttr := attribute.Int("roll.value", roll)
	span.SetAttributes(rollValueAttr)
	rollCnt.Add(ctx, 1, metric.WithAttributes(rollValueAttr))

	resp := strconv.Itoa(roll) + "\n"
	if _, err := io.WriteString(w, resp); err != nil {
		log.Printf("Write failed: %v\n", err)
	}
}

                </code>
              </div>
            </div></br>

<div class="content-section">
    <h3 style="color: black;">Run the Application</h3></br>
    <p style="color: black;">
        Build and run the application with the following command:
    </p> </br>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
            go mod tidy<br/>
            export OTEL_RESOURCE_ATTRIBUTES="service.name=dice,service.version=0.1.0"<br/>
            go run .
        </code>
    </div>
</div></br>
<div class="content-section">
    <h3 style="color: black;">Next steps</h3></br>
    <p style="color: black;">
        For more information about instrumenting your code, refer the manual instrumentation documentation.
    </p> </br>
    <p style="color: black;">
        You’ll also want to configure an appropriate exporter to export your telemetry data to one or more telemetry backends.
    </p> </br>
    <p style="color: black;">
        If you’d like to explore a more complex example, take a look at the OpenTelemetry Demo, which includes the Go based Checkout Service, Product Catalog Service, and Accounting Service.
    </p>
</div>



          `
        },
        {
          title: 'Java',
          content: `
          <div class="content-section">
    <h3 style="color: black;">Getting Started</h3></br>
    <p style="color: black;">This page will show you how to get started with OpenTelemetry in Java.

You will learn how you can instrument a simple Java application automatically, in such a way that traces, metrics, and logs are emitted to the console.

</p></br>
 <h4 style="color: black;">Prerequisites</h4></br>
<p style="color: black;">Ensure that you have the following installed locally:

Java JDK 17+, due to the use of Spring Boot 3; Java 8+ otherwise
Gradle

</p>
 </div>

 <div class="content-section">
    <h3 style="color: black;">Example Application</h3></br>
    <p style="color: black;">The following example uses a basic Spring Boot application. You can use another web framework, such as Apache Wicket or Play. For a complete list of libraries and supported frameworks, consult the registry.</p>
</div>

<div class="content-section">
    <h3 style="color: black;">Dependencies</h3></br>
    <p style="color: black;">To begin, set up an environment in a new directory called java-simple. Within that directory, create a file called build.gradle.kts with the following content:</p>
</div>
          
<div class="mildly-colored">
    <div class="code-section">
        <code>
plugins {
  id("java")
  id("org.springframework.boot") version "3.0.6"
  id("io.spring.dependency-management") version "1.1.0"
}

sourceSets {
  main {
    java.setSrcDirs(setOf("."))
  }
}

repositories {
  mavenCentral()
}

dependencies {
  implementation("org.springframework.boot:spring-boot-starter-web")
}

        </code>
    </div>
</div></br>

<div class="content-section">
    <h3 style="color: black;">Create and launch an HTTP Server</h3></br>
    <p style="color: black;">In that same folder, create a file called DiceApplication.java and add the following code to the file:</p>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
package otel;

import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DiceApplication {
  public static void main(String[] args) {
    SpringApplication app = new SpringApplication(DiceApplication.class);
    app.setBannerMode(Banner.Mode.OFF);
    app.run(args);
  }
}

        </code>
    </div>
</div></br>

<div class="content-section">
    <h3 style="color: black;"></h3></br>
    <p style="color: black;">Create another file called RollController.java and add the following code to the file:</p>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
package otel;

import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RollController {
  private static final Logger logger = LoggerFactory.getLogger(RollController.class);

  @GetMapping("/rolldice")
  public String index(@RequestParam("player") Optional<String> player) {
    int result = this.getRandomNumber(1, 6);
    if (player.isPresent()) {
      logger.info("{} is rolling the dice: {}", player.get(), result);
    } else {
      logger.info("Anonymous player is rolling the dice: {}", result);
    }
    return Integer.toString(result);
  }

  public int getRandomNumber(int min, int max) {
    return ThreadLocalRandom.current().nextInt(min, max + 1);
  }
}

        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">Build and run the application with the following command, then open http://localhost:8080/rolldice in your web browser to ensure it is working.</p>
</div>
<div class="mildly-colored">
    <div class="code-section">
        <code>
gradle assemble
java -jar ./build/libs/java-simple.jar

        </code>
    </div>
</div></br>

<div class="content-section">
    <h3 style="color: black;">Instrumentation</h3></br>
    <p style="color: black;">Next, you’ll use a Java agent to automatically instrument the application at launch time. While you can configure the Java agent in a number of ways, the steps below use environment variables.</p>
</div>


<div class="content-section">
    <h3 style="color: black;"></h3></br>
    <ul>
<li>
    <p style="color: black;">1. Download opentelemetry-javaagent.jar from Releases of the opentelemetry-java-instrumentation repository. The JAR file contains the agent and all automatic instrumentation packages:
</p>
</div>
<div class="mildly-colored">
    <div class="code-section">
        <code>
curl -L -O https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar
        </code>
    </div>
</div></br>
</li>
</ul>


<div class="content-section">
    <h3 style="color: black;"></h3></br>
    <ul>
<li>
    <p style="color: black;">2.Set and export variables that specify the Java agent JAR and a console exporter, using a notation suitable for your shell/terminal environment — we illustrate a notation for bash-like shells:
</p>
</div>
<div class="mildly-colored">
    <div class="code-section">
        <code>
export JAVA_TOOL_OPTIONS="-javaagent:PATH/TO/opentelemetry-javaagent.jar" \n
  OTEL_TRACES_EXPORTER=logging \n
  OTEL_METRICS_EXPORTER=logging \n
  OTEL_LOGS_EXPORTER=logging \n
  OTEL_METRIC_EXPORT_INTERVAL=15000
        </code>
    </div>
</div></br>
</li>
</ul>


<div class="content-section">
    <h3 style="color: black;"></h3></br>
    <ul>
<li>
    <p style="color: black;">3. Run your application once again:
</p>
</div>
<div class="mildly-colored">
    <div class="code-section">
        <code>
$ java -jar ./build/libs/java-simple.jar
...
        </code>
    </div>
</div></br>
</li>
</ul>

<div class="content-section">
    <h3 style="color: black;"></h3></br>
    <ul>
<li>
    <p style="color: black;">4. From another terminal, send a request using curl:
</p>
</div>
<div class="mildly-colored">
    <div class="code-section">
        <code>
curl localhost:8080/rolldice
        </code>
    </div>
</div></br>
</li>
</ul>


<div class="content-section">
    <h3 style="color: black;"></h3></br>
    <ul>
<li>
    <p style="color: black;">5. Stop the server process. </br>At step 4, you should have seen trace & log output from the server and client that looks something like this (trace output is line-wrapped for convenience):
</p>
</div>
<div class="mildly-colored">
    <div class="code-section">
        <code>
[otel.javaagent 2023-04-24 17:33:54:567 +0200] [http-nio-8080-exec-1] INFO
io.opentelemetry.exporter.logging.LoggingSpanExporter - 'RollController.index' :
 70c2f04ec863a956e9af975ba0d983ee 7fd145f5cda13625 INTERNAL [tracer:
 io.opentelemetry.spring-webmvc-6.0:1.25.0-alpha] AttributesMap{data=
 {thread.id=39, thread.name=http-nio-8080-exec-1}, capacity=128,
 totalAddedValues=2}
[otel.javaagent 2023-04-24 17:33:54:568 +0200] [http-nio-8080-exec-1] INFO
io.opentelemetry.exporter.logging.LoggingSpanExporter - 'GET /rolldice' :
70c2f04ec863a956e9af975ba0d983ee 647ad186ad53eccf SERVER [tracer:
io.opentelemetry.tomcat-10.0:1.25.0-alpha] AttributesMap{
  data={user_agent.original=curl/7.87.0, net.host.name=localhost,
  net.transport=ip_tcp, http.target=/rolldice, net.sock.peer.addr=127.0.0.1,
  thread.name=http-nio-8080-exec-1, net.sock.peer.port=53422,
  http.route=/rolldice, net.sock.host.addr=127.0.0.1, thread.id=39,
  net.protocol.name=http, http.status_code=200, http.scheme=http,
  net.protocol.version=1.1, http.response_content_length=1,
  net.host.port=8080, http.method=GET}, capacity=128, totalAddedValues=17}

        </code>
    </div>
</div></br>
</li>
</ul>


<div class="content-section">
    <h3 style="color: black;"></h3></br>
    <ul>
<li>
    <p style="color: black;">At step 5, when stopping the server, you should see an output of all the metrics collected (metrics output is line-wrapped and shortened for convenience):
</p>
</div>


<div class="mildly-colored">
    <div class="code-section">
        <code>
[otel.javaagent 2023-04-24 17:34:25:347 +0200] [PeriodicMetricReader-1] INFO
io.opentelemetry.exporter.logging.LoggingMetricExporter - Received a collection
 of 19 metrics for export.
[otel.javaagent 2023-04-24 17:34:25:347 +0200] [PeriodicMetricReader-1] INFO
io.opentelemetry.exporter.logging.LoggingMetricExporter - metric:
ImmutableMetricData{resource=Resource{schemaUrl=
https://opentelemetry.io/schemas/1.19.0, attributes={host.arch="aarch64",
host.name="OPENTELEMETRY", os.description="Mac OS X 13.3.1", os.type="darwin",
process.command_args=[/bin/java, -jar, java-simple.jar],
process.executable.path="/bin/java", process.pid=64497,
process.runtime.description="Homebrew OpenJDK 64-Bit Server VM 20",
process.runtime.name="OpenJDK Runtime Environment",
process.runtime.version="20", service.name="java-simple",
telemetry.auto.version="1.25.0", telemetry.sdk.language="java",
telemetry.sdk.name="opentelemetry", telemetry.sdk.version="1.25.0"}},
instrumentationScopeInfo=InstrumentationScopeInfo{name=io.opentelemetry.runtime-metrics,
version=1.25.0, schemaUrl=null, attributes={}},
name=process.runtime.jvm.buffer.limit, description=Total capacity of the buffers
in this pool, unit=By, type=LONG_SUM, data=ImmutableSumData{points=
[ImmutableLongPointData{startEpochNanos=1682350405319221000,
epochNanos=1682350465326752000, attributes=
{pool="mapped - 'non-volatile memory'"}, value=0, exemplars=[]},
ImmutableLongPointData{startEpochNanos=1682350405319221000,
epochNanos=1682350465326752000, attributes={pool="mapped"},
value=0, exemplars=[]},
ImmutableLongPointData{startEpochNanos=1682350405319221000,
epochNanos=1682350465326752000, attributes={pool="direct"},
value=8192, exemplars=[]}], monotonic=false, aggregationTemporality=CUMULATIVE}}
...

        </code>
    </div>
</div></br>
          `
        }, 
        {
          title: 'Node JS',
          content: `
          <div class="content-section">
    <h3 style="color: black;">Node.js</h3></br>
    <p style="color: black;">Get telemetry for your app in less than 5 minutes! This page will show you how to get started with OpenTelemetry in Node.js.</p>
    <p style="color: black;">You will learn how to instrument both traces and metrics and log them to the console.</p>
</div>








<div class="content-section">
    <h3 style="color: black;">Prerequisites</h3></br>
    <p style="color: black;">Ensure that you have the following installed locally:</p>
    <p style="color: black;">Node.js</p>
    <p style="color: black;">TypeScript, if you will be using TypeScript.</p>
</div>








<div class="content-section">
    <h3 style="color: black;">Example Application</h3></br>
    <p style="color: black;">The following example uses a basic Express application. If you are not using Express, that’s OK — you can use OpenTelemetry JavaScript with other web frameworks as well, such as Koa and Nest.JS. For a complete list of libraries for supported frameworks, see the registry.</p>
    <p style="color: black;">For more elaborate examples, see examples.</p>
</div>








<div class="content-section">
    <h3 style="color: black;">Dependencies</h3></br>
    <p style="color: black;">To begin, set up an empty <code>package.json</code> in a new directory:</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
npm init -y
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">Next, install Express dependencies.</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
npm install express
        </code>
    </div>
</div></br>

<div class="content-section">
    <h3 style="color: black;">Create and launch an HTTP Server</h3></br>
    <p style="color: black;">Create a file named <code>app.ts</code> (or <code>app.js</code> if not using TypeScript) and add the following code to it:</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
const express = require('express');

const PORT = parseInt(process.env.PORT || '8080');
const app = express();

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

app.get('/rolldice', (req, res) => {
  res.send(getRandomNumber(1, 6).toString());
});

app.listen(PORT, () => {
  console.log(Listening for requests on http://localhost:{PORT});
});
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">Run the application with the following command and open <code>http://localhost:8080/rolldice</code> in your web browser to ensure it is working.</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
$ node app.js
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">Listening for requests on <code>http://localhost:8080</code></p>
</div>








<div class="content-section">
    <h3 style="color: black;">Instrumentation</h3></br>
    <p style="color: black;">The following shows how to install, initialize, and run an application instrumented with OpenTelemetry.</p>
</div>








<div class="content-section">
    <h3 style="color: black;">More Dependencies</h3></br>
    <p style="color: black;">First, install the Node SDK and autoinstrumentations package.</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
npm install @opentelemetry/sdk-node \n
@opentelemetry/api \n
@opentelemetry/auto-instrumentations-node \n
@opentelemetry/sdk-metrics \n
@opentelemetry/sdk-trace-node
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">To find all autoinstrumentation modules, you can look at the registry.</p>
</div>








<div class="content-section">
    <h3 style="color: black;">Setup</h3></br>
    <p style="color: black;">The instrumentation setup and configuration must be run before your application code. One tool commonly used for this task is the <code>--require</code> flag.</p>
    <p style="color: black;">Create a file named <code>instrumentation.ts</code> (or <code>instrumentation.js</code> if not using TypeScript), which will contain your instrumentation setup code:</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} = require('@opentelemetry/sdk-metrics');

const sdk = new NodeSDK({
  traceExporter: new ConsoleSpanExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
        </code>
    </div>
</div></br>

<div class="content-section">
    <h3 style="color: black;">Run the instrumented app</h3></br>
    <p style="color: black;">Now you can run your application as you normally would, but you can use the <code>--require</code> flag to load the instrumentation before the application code. Make sure you don’t have other conflicting <code>--require</code> flags such as <code>--require @opentelemetry/auto-instrumentations-node/register</code> on your <code>NODE_OPTIONS</code> environment variable.</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
$ node --require ./instrumentation.js app.js
Listening for requests on <code>http://localhost:8080</code>
        </code>
    </div>
</div></br>

<div class="content-section">
    
    <p style="color: black;">Open <code>http://localhost:8080/rolldice</code> in your web browser and reload the page a few times. After a while you should see the spans printed in the console by the ConsoleSpanExporter.</p>
</div>








<div class="content-section">
    <h3 style="color: black;">Next Steps</h3></br>
    <p style="color: black;">Enrich your instrumentation generated automatically with manual instrumentation of your own codebase. This gets you customized observability data.</p>
    <p style="color: black;">You’ll also want to configure an appropriate exporter to export your telemetry data to one or more telemetry backends.</p>
    <p style="color: black;">If you’d like to explore a more complex example, take a look at the OpenTelemetry Demo, which includes the JavaScript-based Payment Service and the TypeScript-based Frontend Service.</p>
</div>

          
          
          `
        }, 
        {
            title: 'PHP',
          content: `
          <div class="content-section">
    <h3 style="color: black;">Getting Started</h3></br>
    <p style="color: black;">Get up and running with OpenTelemetry for PHP.</p>
    <p style="color: black;">OpenTelemetry for PHP can be used to generate and export traces, metrics and logs.</p>
    <p style="color: black;">This page will show you how to get started with OpenTelemetry in PHP. We will create a simple “roll the dice” application, then apply both zero-code and code-based instrumentation to generate traces and export them to the console. We will then emit some logs which will also be sent to the console.</p>
</div>








<div class="content-section">
    <h3 style="color: black;">Prerequisites</h3></br>
    <p style="color: black;">OpenTelemetry requires PHP 8.0+ for zero-code instrumentation, however manual instrumentation will work with PHP 7.4</p>
    <p style="color: black;">Ensure that you have the following installed:</p>
    <ul>
        <li>PHP 8.0+</li>
        <li>PECL</li>
        <li>composer</li>
    </ul>
    <p style="color: black;">Before you get started make sure that you have both available in your shell:</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
php -v
composer -v
        </code>
    </div>
</div></br>

<div class="content-section">
    <h3 style="color: black;">Example Application</h3></br>
    <p style="color: black;">The following example uses a basic Slim Framework application. If you are not using Slim, that’s OK — you can use OpenTelemetry PHP with other web frameworks as well, such as WordPress, Symfony and Laravel. For a complete list of libraries for supported frameworks, see the registry.</p>
</div>








<div class="content-section">
    <h3 style="color: black;">Dependencies</h3></br>
    <p style="color: black;">In an empty directory initialize a minimal <code>composer.json</code> file:</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
composer init \
  --no-interaction \
  --require slim/slim:"^4" \
  --require slim/psr7:"^1"
composer update
        </code>
    </div>
</div></br>

<div class="content-section">
    <h3 style="color: black;">Create and launch an HTTP Server</h3></br>
    <p style="color: black;">In that same directory, create a file called <code>index.php</code> with the following content:</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
&lt;?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

$app->get('/rolldice', function (Request $request, Response $response) {
    $result = random_int(1,6);
    $response->getBody()->write(strval($result));
    return $response;
});

$app->run();
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">Run the application using the PHP built-in web server:</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
php -S localhost:8080
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">Open <code>http://localhost:8080/rolldice</code> in your web browser to ensure it is working.</p>
</div>

<div class="content-section">
    <h3 style="color: black;">Add zero-code instrumentation</h3></br>
    <p style="color: black;">Next, you’ll use the OpenTelemetry PHP extension to automatically instrument the application.</p>
</div>








<div class="content-section">
    <h3 style="color: black;">1. Install build tools</h3></br>
    <p style="color: black;">Since the extension is built from source, you need to install some build tools:</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
sudo apt-get install gcc make autoconf
        </code>
    </div>
</div></br>

<div class="content-section">
    <h3 style="color: black;">2. Build the extension with PECL:</h3></br>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
pecl install opentelemetry
        </code>
    </div>
</div></br>

<div class="content-section">
    <h3 style="color: black;">3. Add the extension to your php.ini file:</h3></br>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
[opentelemetry]
extension=opentelemetry.so
        </code>
    </div>
</div></br>

<div class="content-section">
    <h3 style="color: black;">4. Verify that the extension is installed and enabled:</h3></br>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
php --ri opentelemetry
        </code>
    </div>
</div></br>

<div class="content-section">
    <h3 style="color: black;">5. Add additional dependencies to your application, which are required for the automatic instrumentation of your code:</h3></br>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
composer config allow-plugins.php-http/discovery false
composer require \
  open-telemetry/sdk \
  open-telemetry/opentelemetry-auto-slim
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">With the OpenTelemetry PHP extension set up and an instrumentation library installed, you can now run your application and generate some traces:</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
env OTEL_PHP_AUTOLOAD_ENABLED=true \n
    OTEL_TRACES_EXPORTER=console \n
    OTEL_METRICS_EXPORTER=none \n
    OTEL_LOGS_EXPORTER=none \n
    php -S localhost:8080\n
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">Open <code>http://localhost:8080/rolldice</code> in your web browser and reload the page a few times. After a while you should see the spans printed to your console.</p>
</div>








<div class="content-section">
    <h3 style="color: black;">Add manual instrumentation</h3></br>
    <p style="color: black;">Traces</p>
    <p style="color: black;">Manual tracing requires a TracerProvider. There are a number of ways to set one up. In this example we will use the autoloaded TracerProvider, which is globally available.</p>
    <p style="color: black;">Replace <code>index.php</code> with the following code:</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
&lt;?php

use OpenTelemetry\API\Globals;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';

$tracer = Globals::tracerProvider()->getTracer('demo');

$app = AppFactory::create();

$app->get('/rolldice', function (Request $request, Response $response) use ($tracer) {
    $span = $tracer
        ->spanBuilder('manual-span')
        ->startSpan();
    $result = random_int(1,6);
    $response->getBody()->write(strval($result));
    $span
        ->addEvent('rolled dice', ['result' => $result])
        ->end();
    return $response;
});

$app->run();
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">Start the built-in web server again, and browse to <code>http://localhost:8080/rolldice</code>. You should see similar output, but with the addition of a new span named manual-span.</p>
    <p style="color: black;">Note that the manual span’s <code>parent_span_id</code> contains the same value as the “{closure}” span’s <code>context.span_id</code>. Manual and automatic instrumentation work well together, since under the hood they use the same APIs.</p>
</div>








<div class="content-section">
    <h3 style="color: black;">Logging</h3></br>
    <p style="color: black;">Now let’s add some logging. We will use the popular monolog logging library to do this, via a handler which will emit the logs in the OpenTelemetry format.</p>
</div>








<div class="content-section">
    <h3 style="color: black;">Install additional dependencies:</h3></br>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
composer require \
  monolog/monolog \
  open-telemetry/opentelemetry-logger-monolog
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">Replace the <code>index.php</code> file with the following code:</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
&lt;?php

use Monolog\Logger;
use OpenTelemetry\API\Globals;
use OpenTelemetry\Contrib\Logs\Monolog\Handler;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Log\LogLevel;
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';

$loggerProvider = Globals::loggerProvider();
$handler = new Handler(
    $loggerProvider,
    LogLevel::INFO
);
$monolog = new Logger('otel-php-monolog', [$handler]);

$app = AppFactory::create();

$app->get('/rolldice', function (Request $request, Response $response) use ($monolog) {
    $result = random_int(1,6);
    $response->getBody()->write(strval($result));
    $monolog->info('dice rolled', ['result' => $result]);
    return $response;
});

$app->run();
        </code>
    </div>
</div></br>

<div class="content-section">
    <h3 style="color: black;">Start the built-in web server with the following command (note the change to <code>OTEL_LOGS_EXPORTER</code>):</h3></br>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
env OTEL_PHP_AUTOLOAD_ENABLED=true\n</br>
OTEL_TRACES_EXPORTER=console \n</br>
OTEL_METRICS_EXPORTER=none \n</br>
OTEL_LOGS_EXPORTER=console \n</br>
php -S localhost:8080</br>
</code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">This time when browsing to <code>http://localhost:8080/rolldice</code> you should see the automatic instrumentation traces as before, and also a log record which was generated from the monolog handler.</p>
    <p style="color: black;">Note that <code>trace_id</code> and <code>span_id</code> were added to the log output, and that the values correspond to the active span at the time the log message was generated.</p>
</div>

          
          
          
          
          `
        },
        {
           title: 'Python',
          content: `
          <div class="content-section">
    <h3 style="color: black;">Getting Started</h3></br>
    <p style="color: black;">Get telemetry for your app in less than 5 minutes!</p>
    <p style="color: black;">This page will show you how to get started with OpenTelemetry in Python.</p>
    <p style="color: black;">You will learn how you can instrument a simple application automatically, in such a way that traces, metrics, and logs are emitted to the console.</p>
</div>








<div class="content-section">
    <h3 style="color: black;">Prerequisites</h3></br>
    <p style="color: black;">Ensure that you have the following installed locally:</p>
    <ul>
        <li>Python 3</li>
    </ul>
</div>








<div class="content-section">
    <h3 style="color: black;">Example Application</h3></br>
    <p style="color: black;">The following example uses a basic Flask application. If you are not using Flask, that’s OK — you can use OpenTelemetry Python with other web frameworks as well, such as Django and FastAPI. For a complete list of libraries for supported frameworks, see the registry.</p>
    <p style="color: black;">For more elaborate examples, see examples.</p>
</div>








<div class="content-section">
    <h3 style="color: black;">Installation</h3></br>
    <p style="color: black;">To begin, set up an environment in a new directory:</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
mkdir otel-getting-started
cd otel-getting-started
python3 -m venv venv
source ./venv/bin/activate
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">Now install Flask:</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
pip install flask
        </code>
    </div>
</div></br>

<div class="content-section">
    <h3 style="color: black;">Create and launch an HTTP Server</h3></br>
    <p style="color: black;">Create a file <code>app.py</code> and add the following code to it:</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
from random import randint
from flask import Flask, request
import logging

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@app.route("/rolldice")
def roll_dice():
    player = request.args.get('player', default=None, type=str)
    result = str(roll())
    if player:
        logger.warning("%s is rolling the dice: %s", player, result)
    else:
        logger.warning("Anonymous player is rolling the dice: %s", result)
    return result


def roll():
    return randint(1, 6)
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">Run the application with the following command and open <code>http://localhost:8080/rolldice</code> in your web browser to ensure it is working.</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
flask run -p 8080
        </code>
    </div>
</div></br>

<div class="content-section">
    <h3 style="color: black;">Instrumentation</h3></br>
    <p style="color: black;">Zero-code instrumentation will generate telemetry data on your behalf. There are several options you can take, covered in more detail in Zero-code Instrumentation. Here we’ll use the opentelemetry-instrument agent.</p>
</div>








<div class="content-section">
    <h3 style="color: black;">Install the opentelemetry-distro package</h3></br>
    <p style="color: black;">The package contains the OpenTelemetry API, SDK and also the tools opentelemetry-bootstrap and opentelemetry-instrument you will use below.</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
pip install opentelemetry-distro
        </code>
    </div>
</div></br>

<div class="content-section">
    <h3 style="color: black;">Run the opentelemetry-bootstrap command:</h3></br>
    <p style="color: black;">This will install Flask instrumentation.</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
opentelemetry-bootstrap -a install
        </code>
    </div>
</div></br>

<div class="content-section">
    <h3 style="color: black;">Run the instrumented app</h3></br>
    <p style="color: black;">You can now run your instrumented app with opentelemetry-instrument and have it print to the console for now:</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
export OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED=true
opentelemetry-instrument \n
    --traces_exporter console \n
    --metrics_exporter console \n
    --logs_exporter console \n
    --service_name dice-server \n
    flask run -p 8080
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">Open <code>http://localhost:8080/rolldice</code> in your web browser and reload the page a few times. After a while you should see the spans printed in the console, such as the following:</p>
    <p style="color: black;">The generated span tracks the lifetime of a request to the /rolldice route.</p>
    <p style="color: black;">The log line emitted during the request contains the same trace ID and span ID and is exported to the console via the log exporter.</p>
    <p style="color: black;">Send a few more requests to the endpoint, and then either wait for a little bit or terminate the app and you’ll see metrics in the console output, such as the following:</p>
</div>








<div class="content-section">
    <h3 style="color: black;">Add manual instrumentation to automatic instrumentation</h3></br>
    <p style="color: black;">Automatic instrumentation captures telemetry at the edges of your systems, such as inbound and outbound HTTP requests, but it doesn’t capture what’s going on in your application. For that you’ll need to write some manual instrumentation. Here’s how you can easily link up manual instrumentation with automatic instrumentation.</p>
</div>








<div class="content-section">
    <h3 style="color: black;">Traces</h3></br>
    <p style="color: black;">First, modify <code>app.py</code> to include code that initializes a tracer and uses it to create a trace that’s a child of the one that’s automatically generated:</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
from random import randint
from flask import Flask

from opentelemetry import trace

# Acquire a tracer
tracer = trace.get_tracer("diceroller.tracer")

app = Flask(__name__)

@app.route("/rolldice")
def roll_dice():
    return str(roll())

def roll():
    # This creates a new span that's the child of the current one
    with tracer.start_as_current_span("roll") as rollspan:
        res = randint(1, 6)
        rollspan.set_attribute("roll.value", res)
        return res
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">Now run the app again:</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
export OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED=true
opentelemetry-instrument \n
    --traces_exporter console \n
    --metrics_exporter console \n
    --logs_exporter console \n
    --service_name dice-server \n
    flask run -p 8080
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">When you send a request to the server, you’ll see two spans in the trace emitted to the console, and the one called roll registers its parent as the automatically created one:</p>
    <p style="color: black;">The parent_id of roll is the same as the span_id for /rolldice, indicating a parent-child relationship!</p>
</div>

<div class="content-section">
    <h3 style="color: black;">Metrics</h3></br>
    <p style="color: black;">Now modify <code>app.py</code> to include code that initializes a meter and uses it to create a counter instrument which counts the number of rolls for each possible roll value:</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
# These are the necessary import declarations
from opentelemetry import trace
from opentelemetry import metrics

from random import randint
from flask import Flask, request
import logging

# Acquire a tracer
tracer = trace.get_tracer("diceroller.tracer")
# Acquire a meter.
meter = metrics.get_meter("diceroller.meter")

# Now create a counter instrument to make measurements with
roll_counter = meter.create_counter(
    "dice.rolls",
    description="The number of rolls by roll value",
)

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route("/rolldice")
def roll_dice():
    # This creates a new span that's the child of the current one
    with tracer.start_as_current_span("roll") as roll_span:
        player = request.args.get('player', default = None, type = str)
        result = str(roll())
        roll_span.set_attribute("roll.value", result)
        # This adds 1 to the counter for the given roll value
        roll_counter.add(1, {"roll.value": result})
        if player:
            logger.warn("{} is rolling the dice: {}", player, result)
        else:
            logger.warn("Anonymous player is rolling the dice: %s", result)
        return result

def roll():
    return randint(1, 6)
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">Now run the app again:</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
export OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED=true
opentelemetry-instrument \n
    --traces_exporter console \n
    --metrics_exporter console \n
    --logs_exporter console \n
    --service_name dice-server \n
    flask run -p 8080
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">When you send a request to the server, you’ll see the roll counter metric emitted to the console, with separate counts for each roll value:</p>
    <p style="color: black;">Send telemetry to an OpenTelemetry Collector</p>
    <p style="color: black;">The OpenTelemetry Collector is a critical component of most production deployments. Some examples of when it’s beneficial to use a collector:</p>
    <ul>
        <li>A single telemetry sink shared by multiple services, to reduce overhead of switching exporters</li>
        <li>Aggregating traces across multiple services, running on multiple hosts</li>
        <li>A central place to process traces prior to exporting them to a backend</li>
    </ul>
    <p style="color: black;">Unless you have just a single service or are experimenting, you’ll want to use a collector in production deployments.</p>
</div>








<div class="content-section">
    <h3 style="color: black;">Configure and run a local collector</h3></br>
    <p style="color: black;">First, save the following collector configuration code to a file in the /tmp/ directory:</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
# /tmp/otel-collector-config.yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
exporters:
  # NOTE: Prior to v0.86.0 use logging instead of debug.
  debug:
    verbosity: detailed
processors:
  batch:
service:
  pipelines:
    traces:
      receivers: [otlp]
      exporters: [debug]
      processors: [batch]
    metrics:
      receivers: [otlp]
      exporters: [debug]
      processors: [batch]
    logs:
      receivers: [otlp]
      exporters: [debug]
      processors: [batch]
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">Then run the docker command to acquire and run the collector based on this configuration:</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
docker run -p 4317:4317 \n
    -v /tmp/otel-collector-config.yaml:/etc/otel-collector-config.yaml \n
    otel/opentelemetry-collector:latest \n
    --config=/etc/otel-collector-config.yaml
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">You will now have an collector instance running locally, listening on port 4317.</p>
    <p style="color: black;">Modify the command to export spans and metrics via OTLP</p>
    <p style="color: black;">The next step is to modify the command to send spans and metrics to the collector via OTLP instead of the console.</p>
</div>








<div class="content-section">
    <h3 style="color: black;">Install the OTLP exporter package</h3></br>
    <p style="color: black;">To do this, install the OTLP exporter package:</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
pip install opentelemetry-exporter-otlp
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">The opentelemetry-instrument agent will detect the package you just installed and default to OTLP export when it’s run next.</p>
    <p style="color: black;">Run the application like before, but don’t export to the console:</p>
</div>








<div class="mildly-colored">
    <div class="code-section">
        <code>
export OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED=true
opentelemetry-instrument --logs_exporter otlp flask run -p 8080
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">By default, opentelemetry-instrument exports traces and metrics over OTLP/gRPC and will send them to localhost:4317, which is what the collector is listening on.</p>
    <p style="color: black;">When you access the /rolldice route now, you’ll see output in the collector process instead of the flask process, which should look something like this:</p>
</div>








<div class="content-section">
    <h3 style="color: black;">Next steps</h3></br>
    <p style="color: black;">There are several options available for automatic instrumentation and Python. See Zero-code Instrumentation to learn about them and how to configure them.</p>
    <p style="color: black;">There’s a lot more to manual instrumentation than just creating a child span. To learn details about initializing manual instrumentation and many more parts of the OpenTelemetry API you can use, see Manual Instrumentation.</p>
    <p style="color: black;">There are several options for exporting your telemetry data with OpenTelemetry. To learn how to export your data to a preferred backend, see Exporters.</p>
    <p style="color: black;">If you’d like to explore a more complex example, take a look at the OpenTelemetry Demo, which includes the Python based Recommendation Service and Load Generator.</p>
</div>



          
          `
        },
        {
           title: 'Ruby',
          content: `
          <div class="content-section">
    <h3 style="color: black;">Getting Started</h3></br>
    <p style="color: black;">Get telemetry from your app in less than 5 minutes! This page will show you how to get started with OpenTelemetry in Ruby.</p>
    <p style="color: black;">You will learn how you can instrument a simple application, in such a way that traces are emitted to the console.</p>
   </br> <h3 style="color: black;">Prerequisites</h3></br>
    <p style="color: black;">Ensure that you have the following installed locally:</p>
    <ul style="color: black;">
        <li>MRI Ruby >= 3.0, jruby >= 9.3.2.0, or truffleruby >= 22.1</li>
        <li>Bundler</li>
    </ul>
    <p style="color: black;"><strong>Warning:</strong> While tested, support for jruby and truffleruby are on a best-effort basis at this time.</p>
   </br> <h3 style="color: black;">Example Application</h3></br>
    <p style="color: black;">The following example uses a basic Rails application. If you are not using Rails, that’s OK — you can use OpenTelemetry Ruby with other web frameworks as well, such as Sinatra and Rack. For a complete list of libraries for supported frameworks, see the registry.</p>
    <p style="color: black;">For more elaborate examples, see examples.</p>
   </br> <h3 style="color: black;">Dependencies</h3></br>
    <p style="color: black;">To begin, install Rails:</p>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
            gem install rails
        </code>
    </div>
</div></br>

</br><div class="content-section">
    <h3 style="color: black;">Create the application</h3></br>
    <p style="color: black;">Create a new api-only application called dice-ruby and change into the newly created folder dice-ruby</p>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
            rails new --api dice-ruby<br>
            cd dice-ruby
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">Create a controller for rolling a dice:</p>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
            rails generate controller dice
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">This will create a file called app/controllers/dice_controller.rb. Open that file in your preferred editor and update it with the following code:</p>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
            class DiceController < ApplicationController<br>
              def roll<br>
                render json: (rand(6) + 1).to_s<br>
              end<br>
            end
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">Next, open the config/routes.rb file and add the following code:</p>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
            Rails.application.routes.draw do<br>
              get 'rolldice', to: 'dice#roll'<br>
            end
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">Run the application with the following command and open <a href="http://localhost:8080/rolldice" style="color: black;">http://localhost:8080/rolldice</a> in your web browser to ensure it is working.</p>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
            rails server -p 8080
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">If everything works fine you should see a number between 1 and 6 returned to you. You can now stop the application and instrument it using OpenTelemetry.</p>
  </br>  <h3 style="color: black;">Instrumentation</h3></br>
    <p style="color: black;">Install the opentelemetry-sdk and opentelemetry-instrumentation-all packages:</p>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
            bundle add opentelemetry-sdk opentelemetry-instrumentation-all
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">The inclusion of opentelemetry-instrumentation-all provides instrumentations for Rails, Sinatra, several HTTP libraries, and more.</p>
    <p style="color: black;">For Rails applications, the usual way to initialize OpenTelemetry is in a Rails initializer. For other Ruby services, perform this initialization as early as possible in the start-up process.</p>
    <p style="color: black;">Create a file named config/initializers/opentelemetry.rb with the following code:</p>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
            # config/initializers/opentelemetry.rb<br>
            require 'opentelemetry/sdk'<br>
            require 'opentelemetry/instrumentation/all'<br>
            OpenTelemetry::SDK.configure do |c|<br>
              c.service_name = 'dice-ruby'<br>
              c.use_all() # enables all instrumentation!<br>
            end
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">The call c.use_all() enables all instrumentations in the instrumentation/all package. If you have more advanced configuration needs, see configuring specific instrumentation libraries.</p>
<div class="content-section">
   </br> <h3 style="color: black;">Run the instrumented app</h3></br>
    <p style="color: black;">You can now run your instrumented app and have it print to the console for now:</p>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
            env OTEL_TRACES_EXPORTER=console rails server -p 8080
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">Open <a href="http://localhost:8080/rolldice">http://localhost:8080/rolldice</a> in your web browser and reload the page a few times. You should see the spans printed in the console, such as the following:</p>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
            #<struct OpenTelemetry::SDK::Trace::SpanData
            name="DiceController#roll",
            kind=:server,
            status=#<OpenTelemetry::Trace::Status:0x000000010587fc48 @code=1, @description="">,
            parent_span_id="\x00\x00\x00\x00\x00\x00\x00\x00",
            total_recorded_attributes=8,
            total_recorded_events=0,
            total_recorded_links=0,
            start_timestamp=1683555544407294000,
            end_timestamp=1683555544464308000,
            attributes=
            {"http.method"=>"GET",
            "http.host"=>"localhost:8080",
            "http.scheme"=>"http",
            "http.target"=>"/rolldice",
            "http.user_agent"=>"curl/7.87.0",
            "code.namespace"=>"DiceController",
            "code.function"=>"roll",
            "http.status_code"=>200},
            links=nil,
            events=nil,
            resource=
            #<OpenTelemetry::SDK::Resources::Resource:0x000000010511d1f8
            @attributes=
            {"service.name"=>"<YOUR_SERVICE_NAME>",
            "process.pid"=>83900,
            "process.command"=>"bin/rails",
            "process.runtime.name"=>"ruby",
            "process.runtime.version"=>"3.2.2",
            "process.runtime.description"=>"ruby 3.2.2 (2023-03-30 revision e51014f9c0) [arm64-darwin22]",
            "telemetry.sdk.name"=>"opentelemetry",
            "telemetry.sdk.language"=>"ruby",
            "telemetry.sdk.version"=>"1.2.0"}>,
            instrumentation_scope=#<struct OpenTelemetry::SDK::InstrumentationScope name="OpenTelemetry::Instrumentation::Rack", version="0.23.0">,
            span_id="\xA7\xF0\x9B#\b[\xE4I",
            trace_id="\xF3\xDC\b8\x91h\xB0\xDF\xDEn*CH\x9Blf",
            trace_flags=#<OpenTelemetry::Trace::TraceFlags:0x00000001057b7b08 @flags=1>,
            tracestate=#<OpenTelemetry::Trace::Tracestate:0x00000001057b67f8 @hash={}>>
        </code>
    </div>
</div></br>

<div class="content-section">
  </br>  <h3 style="color: black;">What next?</h3></br>
    <p style="color: black;">Adding tracing to a single service is a great first step. OpenTelemetry provides a few more features that will allow you gain even deeper insights!</p>
</div>

<div class="content-section">
    <h5 style="color: black;">Exporters</h3></br>
    <p style="color: black;">Exporters allow you to export your data to a preferred backend.</p>
</div>

<div class="content-section">
    <h5 style="color: black;">Context propagation</h3></br>
    <p style="color: black;">Context propagation is perhaps one of the most powerful concepts in OpenTelemetry because it will upgrade your single service trace into a distributed trace, which makes it possible for OpenTelemetry vendors to visualize a request from end-to-end across process and network boundaries.</p>
</div>

<div class="content-section">
    <h5 style="color: black;">Span events</h3></br>
    <p style="color: black;">Span events allow you to add a human-readable message on a span that represents “something happening” during its lifetime.</p>
</div>

<div class="content-section">
    <h5 style="color: black;">Instrumentation</h3></br>
    <p style="color: black;">Instrumentation will give provide you the ability to enrich your traces with domain specific data.</p>
</div>

<div class="content-section">
    <h5 style="color: black;">OpenTelemetry Demo</h3></br>
    <p style="color: black;">The OpenTelemetry Demo includes the Ruby based Email Service.</p>
</div>

          `
        },
        {
           title: 'Rust',
          content: `
          <div class="content-section">
    <h3 style="color: black;">Getting Started</h3></br>
    <p style="color: black;">
        This page will show you how to get started with OpenTelemetry in Rust.<br><br>
        You will learn how you can instrument a simple Rust application, in such a way that traces are emitted to the console.<br><br>
        <strong>Prerequisites</strong><br>
        Ensure that you have the following installed locally:<br>
        - Rust<br>
        - Cargo<br><br>
        <strong>Example Application</strong><br>
        The following example uses a basic hyper application. If you are not using hyper, that’s OK — you can use OpenTelemetry Rust with other HTTP implementations as well, such as Actix Web and Tide. For a complete list of libraries for supported frameworks, see the registry.<br><br>
        For more elaborate examples, see examples.<br><br>
        <strong>Dependencies</strong><br>
        To begin, create a file <code>Cargo.toml</code> in a new directory and add the following content:
    </p>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
        [package]<br>
        name = "dice_server"<br>
        version = "0.1.0"<br>
        edition = "2021"<br>
        publish = false<br><br>

        [[bin]]<br>
        name = "dice_server"<br>
        path = "dice_server.rs"<br>
        doc = false<br><br>

        [dependencies]<br>
        hyper = { version = "0.14", features = ["full"] }<br>
        tokio = { version = "1.29", features = ["full"] }<br>
        rand = { version = "0.8" }
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">
        <strong>Create and launch an HTTP Server</strong><br>
        In that same folder, create a file called <code>dice_server.rs</code> and add the following code to the file:<br><br>
    </p>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
        use hyper::service::{make_service_fn, service_fn};<br>
        use hyper::{Body, Request, Response, Server, Method, StatusCode};<br>
        use rand::Rng;<br>
        use std::{convert::Infallible, net::SocketAddr};<br><br>

        async fn handle(req: Request<Body>) -> Result<Response<Body>, Infallible> {<br>
            let mut response = Response::new(Body::empty());<br><br>

            match (req.method(), req.uri().path()) {<br>
                (&Method::GET, "/rolldice") => {<br>
                    let random_number = rand::thread_rng().gen_range(1..7);<br>
                    *response.body_mut() = Body::from(random_number.to_string());<br>
                }<br>
                _ => {<br>
                    *response.status_mut() = StatusCode::NOT_FOUND;<br>
                }<br>
            };<br><br>

            Ok(response)<br>
        }<br><br>

        #[tokio::main]<br>
        async fn main() {<br>
            let addr = SocketAddr::from(([127, 0, 0, 1], 8080));<br><br>

            let make_svc = make_service_fn(|_conn| async { Ok::<_, Infallible>(service_fn(handle)) });<br><br>

            let server = Server::bind(&addr).serve(make_svc);<br><br>

            println!("Listening on {addr}");<br>
            if let Err(e) = server.await {<br>
                eprintln!("server error: {e}");<br>
            }<br>
        }
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">
        Build and run the application with the following command, then open <a href="http://localhost:8080/rolldice" target="_blank">http://localhost:8080/rolldice</a> in your web browser to ensure it is working.<br><br>
        <code>$ cargo run --bin dice_server</code><br><br>
        <strong>Instrumentation</strong><br>
        To add OpenTelemetry to your application, update the <code>Cargo.toml</code> with the dependencies for the OpenTelemetry Rust SDK <code>opentelemetry</code> and the OpenTelemetry Stdout Exporter <code>opentelemetry-stdout</code>:<br><br>
    </p>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
        opentelemetry = "0.22.0"<br>
        opentelemetry_sdk = "0.22.1"<br>
        opentelemetry-stdout = { version = "0.3.0", features = ["trace"] }
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">
        Update the <code>dice_server.rs</code> file with code to initialize a tracer and to emit spans when the handle function is called:<br><br>
    </p>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
        use hyper::service::{make_service_fn, service_fn};<br>
        use hyper::{Body, Method, Request, Response, Server, StatusCode};<br>
        use rand::Rng;<br>
        use std::{convert::Infallible, net::SocketAddr};<br>
        use opentelemetry::global::ObjectSafeSpan;<br>
        use opentelemetry::trace::{SpanKind, Status};<br>
        use opentelemetry::{global, trace::Tracer};<br>
        use opentelemetry_sdk::propagation::TraceContextPropagator;<br>
        use opentelemetry_sdk::trace::TracerProvider;<br>
        use opentelemetry_stdout::SpanExporter;<br><br>

        async fn handle(req: Request<Body>) -> Result<Response<Body>, Infallible> {<br>
            let mut response = Response::new(Body::empty());<br><br>

            let tracer = global::tracer("dice_server");<br><br>

            let mut span = tracer<br>
                .span_builder(format!("{} {}", req.method(), req.uri().path()))<br>
                .with_kind(SpanKind::Server)<br>
                .start(&tracer);<br><br>

            match (req.method(), req.uri().path()) {<br>
                (&Method::GET, "/rolldice") => {<br>
                    let random_number = rand::thread_rng().gen_range(1..7);<br>
                    *response.body_mut() = Body::from(random_number.to_string());<br>
                    span.set_status(Status::Ok);<br>
                }<br>
                _ => {<br>
                    *response.status_mut() = StatusCode::NOT_FOUND;<br>
                    span.set_status(Status::error("Not Found"));<br>
                }<br>
            };<br><br>

            Ok(response)<br>
        }<br><br>

        fn init_tracer() {<br>
            global::set_text_map_propagator(TraceContextPropagator::new());<br>
            let provider = TracerProvider::builder()<br>
                .with_simple_exporter(SpanExporter::default())<br>
                .build();<br>
            global::set_tracer_provider(provider);<br>
        }<br><br>

        #[tokio::main]<br>
        async fn main() {<br>
            init_tracer();<br>
            let addr = SocketAddr::from(([127, 0, 0, 1], 8080));<br><br>

            let make_svc = make_service_fn(|_conn| async { Ok::<_, Infallible>(service_fn(handle)) });<br><br>

            let server = Server::bind(&addr).serve(make_svc);<br><br>

            println!("Listening on {addr}");<br>
            if let Err(e) = server.await {<br>
                eprintln!("server error: {e}");<br>
            }<br>
        }
        </code>
    </div>
</div></br>

<div class="content-section">
    <h3 style="color: black;">Start your server again:</h3></br>
    <p style="color: black;">
        <code>$ cargo run --bin dice_server</code><br><br>
        When you send a request to the server at <a href="http://localhost:8080/rolldice" target="_blank">http://localhost:8080/rolldice</a>, you’ll see a span being emitted to the console (output is pretty printed for convenience):
    </p>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
        {<br>
          "resourceSpans": [<br>
            {<br>
              "resource": {<br>
                "attributes": [<br>
                  {<br>
                    "key": "service.name",<br>
                    "value": {<br>
                      "stringValue": "unknown_service"<br>
                    }<br>
                  }<br>
                ]<br>
              },<br>
              "scopeSpans": [<br>
                {<br>
                  "scope": {<br>
                    "name": "dice_server"<br>
                  },<br>
                  "spans": [<br>
                    {<br>
                      "attributes": [],<br>
                      "droppedAttributesCount": 0,<br>
                      "droppedEventsCount": 0,<br>
                      "droppedLinksCount": 0,<br>
                      "endTimeUnixNano": 1691076354768034000,<br>
                      "kind": 2,<br>
                      "name": "GET /rolldice",<br>
                      "parentSpanId": "",<br>
                      "spanId": "27e1d7d8e44a63c5",<br>
                      "startTimeUnixNano": 1691076354768025000,<br>
                      "status": {<br>
                        "code": 2<br>
                      },<br>
                      "traceId": "adfe9d364ee19610adde517d722167ca"<br>
                    }<br>
                  ]<br>
                }<br>
              ]<br>
            }<br>
          ]<br>
        }
        </code>
    </div>
</div>


          
          
          `
        },
        {
          title: 'Swift',
          content: `
          <div class="content-section">
    <h3 style="color: black;">Getting Started</h3></br>
    <p style="color: black;">
        Get telemetry for your app in less than 5 minutes!<br><br>
        This page will show you how to get started with OpenTelemetry in Swift.<br><br>
        You will learn how you can instrument a simple application, in such a way that traces are emitted to the console.<br><br>
        <strong>Prerequisites</strong><br>
        Ensure that you have the following installed locally:<br>
        - Swift<br><br>
        <strong>Example Application</strong><br>
        The following example uses a basic Vapor application. If you are not using Vapor, that’s OK — you can use OpenTelemetry Swift with any Swift application, no matter if they run on a server or on an iOS device.<br><br>
        For more examples, see examples.<br><br>
        <strong>Dependencies</strong><br>
        To begin, create a file called <code>Package.swift</code> in a new directory with the following content:
    </p>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
// swift-tools-version:5.9<br>
import PackageDescription<br><br>

let package = Package(<br>
    name: "dice-server",<br>
    platforms: [<br>
       .macOS(.v13)<br>
    ],<br>
    dependencies: [<br>
        .package(url: "https://github.com/vapor/vapor.git", from: "4.83.1")<br>
    ],<br>
    targets: [<br>
        .executableTarget(<br>
            name: "DiceApp",<br>
            dependencies: [<br>
                .product(name: "Vapor", package: "vapor")<br>
            ],<br>
            path: "."<br>
        )<br>
    ]<br>
)
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">
        <strong>Create and launch an HTTP Server</strong><br>
        In the same folder, create a file called <code>main.swift</code> and add the following code to the file:
    </p>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
import Vapor<br><br>

@main<br>
enum Entrypoint {<br>
    static func main() async throws {<br>
        let app = try Application(.detect())<br>
        defer { app.shutdown() }<br>
        app.get("rolldice") { req in<br>
            let result = Int.random(in: 1..<7)<br>
            return result<br>
        }<br>
        try app.run()<br>
    }<br>
}
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">
        Build and run the application with the following command, then open <a href="http://localhost:8080/rolldice" target="_blank">http://localhost:8080/rolldice</a> in your web browser to ensure it is working.<br><br>
        <code>$ swift run</code><br><br>
        Building for debugging...<br>
        Build complete! (0.31s)<br>
        2023-10-04T17:16:13+0200 notice codes.vapor.application : [Vapor] Server starting on <a href="http://127.0.0.1:8080" target="_blank">http://127.0.0.1:8080</a>
    </p>
</div>

<div class="content-section">
    <p style="color: black;">
        <strong>Instrumentation</strong><br>
        To add OpenTelemetry to your application, update the <code>Package.swift</code> with the following additional dependencies:
    </p>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
// swift-tools-version:5.9<br>
import PackageDescription<br><br>

let package = Package(<br>
    name: "dice-server",<br>
    platforms: [<br>
       .macOS(.v13)<br>
    ],<br>
    dependencies: [<br>
        .package(url: "https://github.com/vapor/vapor.git", from: "4.83.1"),<br>
        .package(url: "https://github.com/open-telemetry/opentelemetry-swift", from: "1.0.0"),<br>
    ],<br>
    targets: [<br>
        .executableTarget(<br>
            name: "DiceApp",<br>
            dependencies: [<br>
                .product(name: "Vapor", package: "vapor"),<br>
                .product(name: "OpenTelemetryApi", package: "opentelemetry-swift"),<br>
                .product(name: "OpenTelemetrySdk", package: "opentelemetry-swift"),<br>
                .product(name: "StdoutExporter", package: "opentelemetry-swift"),<br>
                .product(name: "ResourceExtension", package: "opentelemetry-swift"),<br>
            ],<br>
            path: "."<br>
        )<br>
    ]<br>
)
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">
        Update the <code>main.swift</code> file with code to initialize a tracer and to emit spans when the <code>rolldice</code> request handler is called:
    </p>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
import Vapor<br>
import OpenTelemetryApi<br>
import OpenTelemetrySdk<br>
import StdoutExporter<br>
import ResourceExtension<br><br>

@main<br>
enum Entrypoint {<br>
    static func main() async throws {<br>

        let spanExporter = StdoutExporter();<br>
        let spanProcessor = SimpleSpanProcessor(spanExporter: spanExporter)<br>
        let resources = DefaultResources().get()<br><br>

        let instrumentationScopeName = "DiceServer"<br>
        let instrumentationScopeVersion = "semver:0.1.0"<br><br>

        OpenTelemetry.registerTracerProvider(tracerProvider:<br>
            TracerProviderBuilder()<br>
                .add(spanProcessor: spanProcessor)<br>
                .with(resource: resources)<br>
                .build()<br>
        )<br>
        let tracer = OpenTelemetry.instance.tracerProvider.
        get(instrumentationName: instrumentationScopeName,
        instrumentationVersion: 
        instrumentationScopeVersion) 
        as! TracerSdk<br><br>

        let app = try Application(.detect())<br>
        defer { app.shutdown() }<br><br>

        app.get("rolldice") { req in<br>
            let span = tracer.spanBuilder(spanName: "GET /rolldice").setSpanKind(spanKind: .client).startSpan()<br>
            let result = Int.random(in: 1..<7)<br>
            span.end();<br>
            return result<br>
        }<br><br>

        try app.run()<br>
    }<br>
}
        </code>
    </div>
</div></br>

<div class="content-section">
    <p style="color: black;">
        Start your server again:<br><br>
        <code>swift run</code><br><br>
        When you send a request to the server at <a href="http://localhost:8080/rolldice" target="_blank">http://localhost:8080/rolldice</a>, you’ll see a span being emitted to the console (output is pretty printed for convenience):
    </p>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
{
  "attributes": {},<br>
  "duration": 2.70605087280273e-5,<br>
  "parentSpanId": "0000000000000000",<br>
  "span": "GET /rolldice",<br>
  "spanId": "635455eb236a1592",<br>
  "spanKind": "client",<br>
  "start": 718126321.210727,<br>
  "traceFlags": {<br>
    "sampled": true<br>
  },<br>
  "traceId": "c751f7af0586dac8ef3607c6fc128884",<br>
  "traceState": {<br>
    "entries": []<br>
  }<br>
}
        </code>
    </div>
</div></br>

<div class="content-section">
    <h3 style="color: black;">Next Steps</h3></br>
    <p style="color: black;">
        Enrich your instrumentation generated automatically with manual instrumentation of your own codebase. This gets you customized observability data.<br><br>
        Take a look at available instrumentation libraries that generate telemetry data for popular frameworks and libraries.
   

          
          `
        }
      ],
    },
    {
      title: 'Jaeger Setup ▼',
      content:`
      <img class="styled-image" src="jaegar.svg">
      <div class="content-section">
    <h3 style="color: black;">open source, distributed tracing platform
</h3></br>
    <p style="color: black;">
      Distributed tracing observability platforms, such as Jaeger, are essential for modern software applications that are architected as microservices. Jaeger maps the flow of requests and data as they traverse a distributed system. These requests may make calls to multiple services, which may introduce their own delays or errors.
    </p>
</div>

<div class="content-section">
    <p style="color: black;">
       Jaeger connects the dots between these disparate components, helping to identify performance bottlenecks, troubleshoot errors, and improve overall application reliability. Jaeger is 100% open source, cloud native, and infinitely scalable.
    </p>
</div>



  </br></br> 
<div class="content-section">
    <p style="color: black;   display: flex; text-align: -webkit-center; ">
   <i><b>                        &nbsp &nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspMonitor and troubleshoot workflows in complex distributed systems
    </p>
</div>
      `,
      submenus: [
        {
          title: 'What is Jaeger',
          content: `
          <div class="content-section">
    <h3 style="color: black;">The Jaeger Operator</h3></br>
    <p style="color: black;">The Jaeger Operator is an implementation of a Kubernetes Operator. Operators are pieces of software designed to simplify the operational complexity of running another piece of software. Technically, Operators package, deploy, and manage Kubernetes applications.</p> </br>
    <p style="color: black;">A Kubernetes application is one deployed on Kubernetes and managed using Kubernetes APIs and tools like kubectl (for Kubernetes) or oc (for OKD). To fully leverage Kubernetes, cohesive APIs are required for extending and managing applications running on Kubernetes. Operators serve as the runtime for managing such applications on Kubernetes.</p>
</div>
<div class="content-section">
    <h3 style="color: black;">High Scalability</h3></br>
    <p style="color: black;">Jaeger backend is designed to have no single points of failure and to scale with the business needs. For example, any given Jaeger installation at Uber is typically processing several billion spans per day.</p> </br>
</div>

<div class="content-section">
    <h3 style="color: black;">Native support for OpenTracing</h3></br>
    <p style="color: black;">Jaeger backend, Web UI, and instrumentation libraries have been designed from ground up to support the OpenTracing standard.</p> </br>
</div>

<div class="content-section">
    <h3 style="color: black;">Represent traces as directed acyclic graphs (not just trees) via span references</h3></br>
    <p style="color: black;">Support strongly typed span tags and structured logs</p> </br>
</div>

<div class="content-section">
    <h3 style="color: black;">Support general distributed context propagation mechanism via baggage</h3></br>
    <p style="color: black;">Multiple storage backends</p> </br>
</div>

<div class="content-section">
    <h3 style="color: black;">Jaeger supports two popular open source NoSQL databases as trace storage backends</h3></br>
    <p style="color: black;">Cassandra 3.4+ and Elasticsearch 5.x/6.x/7.x. There are ongoing community experiments using other databases, such as ScyllaDB, InfluxDB, Amazon DynamoDB, Logz.io. Jaeger also ships with a simple in-memory storage for testing setups.</p> </br>
</div>

<div class="content-section">
    <h3 style="color: black;">Modern Web UI</h3></br>
    <p style="color: black;">Jaeger Web UI is implemented in Javascript using popular open source frameworks like React. Several performance improvements have been released in v1.0 to allow the UI to efficiently deal with large volumes of data, and to display traces with tens of thousands of spans (e.g. we tried a trace with 80,000 spans).</p> </br>
</div>

<div class="content-section">
    <h3 style="color: black;">Cloud Native Deployment</h3></br>
    <p style="color: black;">Jaeger backend is distributed as a collection of Docker images. The binaries support various configuration methods, including command line options, environment variables, and configuration files in multiple formats (yaml, toml, etc.). Deployment to Kubernetes clusters is assisted by a Kubernetes operator, Kubernetes templates, and a Helm chart.</p> </br>
</div>

<div class="content-section">
    <h3 style="color: black;">Observability</h3></br>
    <p style="color: black;">All Jaeger backend components expose Prometheus metrics by default (other metrics backends are also supported). Logs are written to standard out using the structured logging library zap.</p> </br>
</div>

<div class="content-section">
    <h3 style="color: black;">Backwards compatibility with Zipkin</h3></br>
    <p style="color: black;">Although we recommend instrumenting applications with OpenTracing API and binding to Jaeger client libraries to benefit from advanced features not available elsewhere, if your organization has already invested in the instrumentation using Zipkin libraries, you do not have to rewrite all that code. Jaeger provides backwards compatibility with Zipkin by accepting spans in Zipkin formats (Thrift, JSON v1/v2 and Protobuf) over HTTP. Switching from Zipkin backend is just a matter of routing the traffic from Zipkin libraries to the Jaeger backend.</p> </br>
</div>

<div class="content-section">
    <h3 style="color: black;">Topology Graphs</h3></br>
    <p style="color: black;">Jaeger UI supports two types of service graphs: System Architecture and Deep Dependency Graph.</p> </br>
</div>

<div class="content-section">
    <h3 style="color: black;">System Architecture</h3></br>
    <p style="color: black;">The “classic” service dependency graph for all services observed in the architecture. The graph represents only one-hop dependencies between services, similar to what one could get from telemetry produced by service meshes. For example, a graph A - B - C means that there are some traces that contain network calls between A and B, and some traces with calls between B and C. However, it does not mean there are any traces that contain the full chain A - B - C, i.e. we cannot say that A depends on C. The node granularity of this graph is services only, not service endpoints. The System Architecture graph can be built on the fly from in-memory storage, or by using Spark or Flink jobs when using distributed storage.</p> </br>
</div>

<div class="content-section">
    <h3 style="color: black;">Deep Dependency Graph</h3></br>
    <p style="color: black;">Also known as “Transitive Dependency Graph”, where a chain A -> B -> C means that A has a transitive dependency on C. A single graph requires a “focal” service (shown in pink) and only displays the paths passing through that service. Typically, this type of graph does not represent the full architecture of the system, unless there is a service that is connected to everything, e.g. an API gateway, and it is selected as a focal service. The node granularity of this graph can be changed between services and service endpoints. In the latter mode, different endpoints in the same service will be displayed as separate nodes, e.g. A::op1 and A::op2. At this time the transitive graph can only be constructed from traces in the search results. In the future there will be a Flink job that will compute the graphs by aggregating all traces.</p> </br>
</div>


          `,
        },
        {
          title: 'Jaeger Setup',
          content: `
           <div class="content-section">
    <h3 style="color: black;">Getting Started</h3></br>
    <p style="color: black;">Get up and running with Jaeger in your local environment</p> </br>
</div>



<div class="content-section">
    <h3 style="color: black;">Instrumentation</h3></br>
    <p style="color: black;">Your applications must be instrumented before they can send tracing data to Jaeger backend. Check the Client Libraries section for information about how to use the OpenTracing API and how to initialize and configure Jaeger tracers.</p> </br>
</div>

<div class="content-section">
    <h3 style="color: black;">All in One</h3></br>
    <p style="color: black;">All-in-one is an executable designed for quick local testing, launches the Jaeger UI, collector, query, and agent, with an in memory storage component.</p> </br>
</div>

<div class="mildly-colored">
    <div class="code-section">
        <code>
            $ docker run -d --name jaeger \<br>
            -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 \<br>
            -p 5775:5775/udp \<br>
            -p 6831:6831/udp \<br>
            -p 6832:6832/udp \<br>
            -p 5778:5778 \<br>
            -p 16686:16686 \<br>
            -p 14268:14268 \<br>
            -p 14250:14250 \<br>
            -p 9411:9411 \<br>
            jaegertracing/all-in-one:1.22
        </code>
    </div>
</div></br>

<div class="mildly-colored">
    <div class="code-section">
        <code>
            $ jaeger-all-in-one --collector.zipkin.host-port=:9411
        </code>
    </div>
</div></br>


<div class="content-section">
    <h3 style="color: black;">Sample App: HotROD</h3></br>
    <p style="color: black;">HotROD (Rides on Demand) is a demo application that consists of several microservices and illustrates the use of the OpenTracing API. A tutorial / walkthrough is available in the blog post: </br><a href="#">Take OpenTracing for a HotROD ride</a>. It can be run standalone, but requires Jaeger backend to view the traces.</p> </br>
</div>

<div class="content-section">
    <h3 style="color: black;">Features</h3></br>
    <p style="color: black;">Discover architecture of the whole system via data-driven dependency diagram.<br>
    View request timeline and errors; understand how the app works.<br>
    Find sources of latency and lack of concurrency.<br>
    Highly contextualized logging.<br>
    Use baggage propagation to:<br>
    - Diagnose inter-request contention (queueing).<br>
    - Attribute time spent in a service.<br>
    Use open source libraries with OpenTracing integration to get vendor-neutral instrumentation for free.</p> </br>
</div>

<div class="content-section">
    <h3 style="color: black;">Prerequisites</h3></br>
    <p style="color: black;">You need Go toolchain installed on your machine to run from source (see go.mod file for required Go version).<br>
    Requires a running Jaeger backend to view the traces.</p> </br>
</div>

<div class="content-section">
    <h3 style="color: black;">Running</h3></br>
    <p style="color: black;">From Source<br><br>
     <div class="mildly-colored">
              <div class="code-section">
                <code>
    mkdir -p $GOPATH/src/github.com/jaegertracing<br>
    cd $GOPATH/src/github.com/jaegertracing<br>
    git clone git@github.com:jaegertracing/jaeger.git jaeger<br>
    cd jaeger<br>
    go run ./examples/hotrod/main.go all<br>
                </code>
              </div>
            </div></br>
    
    From docker<br><br>
     <div class="mildly-colored">
              <div class="code-section">
                <code>
    $ docker run --rm -it \<br>
    --link jaeger \<br>
    -p8080-8083:8080-8083 \<br>
    -e JAEGER_AGENT_HOST="jaeger" \<br>
    jaegertracing/example-hotrod:1.22 \<br>
    all<br>
                </code>
              </div>
            </div></br>
   
    From binary distribution<br><br>
    Run example-hotrod(.exe) executable from the binary distribution archives :<br><br>
    <div class="mildly-colored">
              <div class="code-section">
                <code>
$ example-hotrod all<br>
                </code>
              </div>
            </div></br>
   
</div>

<div class="content-section">
    <h3 style="color: black;">Migrating from Zipkin</h3></br>
    <p style="color: black;">Collector service exposes Zipkin compatible REST API /api/v1/spans which accepts both Thrift and JSON. Also there is /api/v2/spans for JSON and Proto. By default it’s disabled. It can be enabled with --collector.zipkin.host-port=:9411.</p> </br>
</div>

          `,
        },
      ],
    },
  ];

  const handleDropdownClick = (index) => {
    if (activeDropdown === index) {
      //change this to null if you want to have no default drop down
      setActiveDropdown(index);
      setActiveSubDropdown(null);
    } else {
      setActiveDropdown(index);
      setActiveSubDropdown(null); 
    }
  };

  const handleSubDropdownClick = (submenuIndex) => {
    setActiveSubDropdown(submenuIndex);
  };

  const renderHTMLContent = (htmlContent) => ({ __html: htmlContent });
console.log("activeDropdown:", activeDropdown)
  return (
    <div className="container">
      <div className="sidebar">
        <div>
          <p style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '10px', marginBottom: '10px' }}>Docs</p>
          <hr style={{ borderColor: 'white', borderWidth: '1px', marginTop: '5px', marginBottom: '10px', background: 'white' }} />
        </div>
        {sidebarData.map((item, index) => (
          <div key={index} className="sidebar-dropdown">
            <div
              className={`dropdown-header ${activeDropdown === index ? 'active' : ''}`}
              onClick={() => handleDropdownClick(index)}
            >
              {item.title}
            </div>
            {activeDropdown === index && (
              <div className="sub-dropdowns">
                {item.submenus.map((submenu, submenuIndex) => (
                  <div key={submenuIndex} className="sub-dropdown">
                    <div
                      className={`sub-dropdown-header ${activeSubDropdown === submenuIndex ? 'active' : ''}`}
                      onClick={() => handleSubDropdownClick(submenuIndex)}
                    >
                      {submenu.title}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="content">
        {
          activeDropdown !==null && activeSubDropdown == null && (
            <div className="main-dropdown-content" dangerouslySetInnerHTML={renderHTMLContent(sidebarData[activeDropdown].content)}></div>
          ) 
        }
        {activeDropdown !== null && activeSubDropdown !== null && (
          <div className="main-dropdown-content" dangerouslySetInnerHTML={renderHTMLContent(sidebarData[activeDropdown].submenus[activeSubDropdown].content)}></div>
        )}
      </div>
    </div>
  );
};

export default DocSidebar;