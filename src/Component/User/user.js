import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Sidebar from "../Common-Componet/Sidebar/sidebar";
import Navbar from "../Common-Componet/Navbar/navbar";
import Box from '@mui/material/Box';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { REACT_BASE_PROMETHEUS_URL,REACT_BASE_JAEGER_URL, REACT_BASE_ALLERT_MANAGER_URL, REACT_BASE_TRACES_URL } from '../config.js';

import { Modal } from '@mui/material';
import MenuList from '@mui/material/MenuList';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SemicircularProgressBar from '../Semicircular/semicircular';
import "../Common-Componet/common.css";
import "../User/user.css";
import drop1 from "../Assets/drop1.svg";
import Frame from "../Assets/Frame.svg";
import { Line } from 'react-chartjs-2';
import drop from "../Assets/drop.svg";
import cross1 from "../Assets/cross1.svg";
import Button from '@mui/material/Button';
import chat_profile1 from "../Assets/chat_profile1.svg";
import Response from '../Response';
import { Link } from 'react-router-dom';
import Chat from '../Chat/chat.js';
import { FormControl } from '@mui/material';
import GaugeChart from 'react-gauge-chart';
import ReactSpeedometer from "react-d3-speedometer";
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import EmailIcon from '@mui/icons-material/Email';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

function User(props) {
    const [traces, setTraces] = useState([]);
    const [expandedTraceID, setExpandedTraceID] = useState(null);
    const [targets, setTargets] = useState([]);
    const [totalRequests, setTotalRequests] = useState(0);
    const [methodRequests, setMethodRequests] = useState({});
    const [statusRequests, setStatusRequests] = useState({});
    const [activeAlerts, setActiveAlerts] = useState(0);
    const [realtimeVisitors, setRealtimeVisitors] = useState(0);
    const [error, setError] = useState(null);
    const [ticketEtas, setTicketEtas] = useState([]);
    const [requestCountData, setRequestCountData] = useState([]);
    const [activeRequestsData, setActiveRequestsData] = useState([]);
    const [responseDurationMedianData, setResponseDurationMedianData] = useState([]);
    const [responseDuration95thData, setResponseDuration95thData] = useState([]);
    const [requestRatesData, setRequestRatesData] = useState([]);
    const [errorRatesData, setErrorRatesData] = useState([]);
    const [userSessionsData, setUserSessionsData] = useState([]);
    const [transactionCountsData, setTransactionCountsData] = useState([]);
    const [averageresponse, setAverageResponse] = useState([]);
    const [averageLatency, setAverageLatency] = useState(null);
    const [errorRate, setErrorRate] = useState(null);
    const [loading, setLoading] = useState(true);

    const [messageHistory, setMessageHistory] = useState([]);
    const [showChat, setShowChat] = useState(false);
    const [userMessage, setUserMessage] = useState("");
    const [submittedMessage, setSubmittedMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);

    const maxValue = 100;
    const value = 70;

    const responseMapping = {
        "What is the average response time, latency, and error rate of my Application?": "The average response time of your application is 10.10 ms. The latency is 5.5 ms. Error rate is 2%.",
        "What are the sub-services used by my Application?": "Your application uses sub-services GET /api/get and POST /api/post.",
        "Is my application running properly?": "Your application appears to be running properly with 0% risk and error.",
        "average response time": "The average response time of your application is 5.10 ms.",
        "response time": "The average response time of your application is 5.10 ms.",
        "response": "The average response time of your application is 5.10 ms.",
        "error": "The error of your application is 0%",
        "latency": "The latency of your application is 0.8 ms.",
        "what is status of my application": "Your Python application is operating normally with regular garbage collection cycles, stable memory usage, and moderate CPU utilization. The HTTP server component is actively handling requests, primarily with one active GET request on host 10.0.0.28:5000. Overall, your application appears to be functioning as expected with typical resource usage patterns.",
        "How can I decrease my Application response time, latency, and error rate?": "To improve application response time, latency, and error rate, optimize your code and database queries, use caching, and simplify network payloads. Enhance infrastructure with load balancing, scaling, and CDNs. Improve front-end performance by using asynchronous loading and optimizing assets. Implement comprehensive error monitoring and graceful handling. Adopt microservices and containerization for scalability. Utilize CI/CD for frequent, reliable updates. Optimize third-party API usage and ensure strong SLAs with providers. This ensures a more reliable and performant application.",
        "What are the steps to restart my Application or Services?": "To restart your application or services, first, access the server using SSH or RDP, or log in directly. Check the service status with commands like `systemctl status <service-name>` on Linux or `Get-Service <service-name>` on Windows. Stop the service using `systemctl stop <service-name>` (Linux) or `Stop-Service <service-name>` (Windows), and verify it has stopped. Then, start the service again using `systemctl start <service-name>` or `Start-Service <service-name>`. Confirm the service is running by rechecking its status, and finally, review logs to ensure everything is functioning correctly. For containerized applications, use `docker` or `kubectl` commands for similar operations.",
        "Steps to protect a network from unauthorized access, data breaches.": "To protect a network from unauthorized access and data breaches, implement strong access controls with multi-factor authentication and role-based permissions. Use firewalls to control network traffic and web application firewalls for added protection. Regularly update and patch systems to fix vulnerabilities. Encrypt sensitive data in transit and at rest, and employ intrusion detection/prevention systems to monitor for suspicious activity. Conduct regular security audits and training to ensure all users follow best practices. Finally, maintain robust backup solutions to recover data in case of an incident.",


    };

    const handleSelectPrompt = (prompt) => {
        const newMessage = { type: "user", text: prompt };
        setChatMessages(prevMessages => [...prevMessages, newMessage]);

        if (responseMapping[prompt]) {
            const responseMessage = { type: "bot", response: responseMapping[prompt] };
            setChatMessages(prevMessages => [...prevMessages, responseMessage]);
        } else {
            const errorMessage = { type: "bot", response: "Sorry, I don't have a response for that question." };
            setChatMessages(prevMessages => [...prevMessages, errorMessage]);
        }

        setShowChat(true);
    };

    const handleSendMessage = () => {
        const message = userMessage.trim();

        if (message) {
            const newMessage = { type: "user", text: message };
            setChatMessages(prevMessages => [...prevMessages, newMessage]);
            setShowChat(true);

            if (responseMapping[message.toLowerCase()]) {
                const responseMessage = { type: "bot", response: responseMapping[message.toLowerCase()] };
                setChatMessages(prevMessages => [...prevMessages, responseMessage]);
            } else {
                const errorMessage = { type: "bot", response: "Sorry, I don't have a response for that question." };
                setChatMessages(prevMessages => [...prevMessages, errorMessage]);
            }

            setUserMessage("");
        }
    };

    const priorities = ['High', 'Medium', 'Low'];
    const severities = ['High', 'Medium', 'Low'];

    const [open, setOpen] = useState(false);
    const [openSLA, setOpenSLA] = useState(false);
    const [openSLO, setOpenSLO] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElSLA, setAnchorElSLA] = useState(null);
    const [anchorElSLO, setAnchorElSLO] = useState(null);
    const [showDetailsSla, setShowDetailsSla] = useState(false);
    const [showDetailsSlo, setShowDetailsSlo] = useState(false);
    const [showDetailsSli, setShowDetailsSli] = useState(false);
    const [percentSla, setPercentSla] = useState(0);
    const [percentSlo, setPercentSlo] = useState(0);
    const [createClicked, setCreateClicked] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const [openModalSLA, setOpenModalSLA] = useState(false);
    const [openModalSLO, setOpenModalSLO] = useState(false);
    const [priority, setPriority] = React.useState('');
    const [severity, setSeverity] = React.useState('');
    const [eta, setEta] = React.useState('');
    const [ticket, setTicket] = React.useState('');
    const [expandedTicketIndex, setExpandedTicketIndex] = useState(-1);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClickSLA = (event) => {
        setAnchorElSLA(event.currentTarget);
        setOpenSLA(true);
    };

    const handleOpenSlamodal = () => {
        setOpenModalSLA(true)
    }
    const handleOpenSlomodal = () => {
        setOpenModalSLO(true)
    }
    const handleCloseSlamodal = () => {
        setOpenModalSLA(false)
    }
    const handleCloseSlomodal = () => {
        setOpenModalSLO(false)
    }


    const handleClickSLO = (event) => {
        setAnchorElSLO(event.currentTarget);
        setOpenSLO(true);
    };

    const handleClose = () => {
        setOpen(false);
        setAnchorEl(null);
    };

    const handleCloseSLA = () => {
        setOpenSLA(false);
        setAnchorElSLA(null);
    };

    const handleCloseSLO = () => {
        setOpenSLO(false);
        setAnchorElSLO(null);
    };


    const handleToggleDetailsSla = () => {
        setShowDetailsSla(!showDetailsSla);
        // setIsRotated(!isRotated);
    };
    const handleToggleDetailsSlo = () => {
        setShowDetailsSlo(!showDetailsSlo);
        // setIsRotated(!isRotated);
    };
    const handleToggleDetailsSli = () => {
        setShowDetailsSli(!showDetailsSli);
        // setIsRotated(!isRotated);
    };

    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    };

    const handleSeverityChange = (event) => {
        setSeverity(event.target.value);
    };

    const handleEtaChange = (event) => {
        setEta(event.target.value);
    };

    const handleTicketChange = (event) => {
        setTicket(event.target.value);
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'maxContent',
        backgroundColor: '#fff',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        padding: '40px',
        borderRadius: '8px',
    };


    const modalHeadingStyle = {
        marginBottom: '16px',
        textAlign: 'center',
        color: '#211f1f',
        fontSize: 'xx-large',
        fontWeight: 600,
        textAlign: '-webkit-match-parent'
    };

    const inputContainerStyle = {
        marginBottom: '16px',
        width: '30vw',
    };


    useEffect(() => {
        const fetchTargets = async () => {
            try {
                const response = await axios.get(REACT_BASE_PROMETHEUS_URL+'/api/v1/targets');
                if (response.data.status === "success") {
                    setTargets(response.data.data.activeTargets);
                } else {
                    setError('Failed to fetch targets');
                }
            } catch (error) {
                setError('Error fetching targets: ' + error.message);
            }
        };

        const fetchTotalRequests = async () => {
            try {
                const response = await axios.get(REACT_BASE_PROMETHEUS_URL+'/api/v1/query', {
                    params: {
                        query: 'sum(request_count_requests_total{instance="application"})'
                    }
                });

                if (response.data.status === "success") {
                    const result = response.data.data.result[0];
                    const totalRequests = result ? result.value[1] : 0;
                    setTotalRequests(totalRequests);
                } else {
                    setError('Failed to fetch total requests');
                }
            } catch (error) {
                setError('Error fetching total requests: ' + error.message);
            }
        };

        const fetchMethodRequests = async (method) => {
            try {
                const response = await axios.get(REACT_BASE_PROMETHEUS_URL+'/api/v1/query', {
                    params: {
                        query: `sum(http_server_duration_milliseconds_sum{http_method="${method}"})`
                    }
                });

                if (response.data.status === "success") {
                    const result = response.data.data.result[0];
                    const count = result ? result.value[1] : 0;
                    setMethodRequests(prevState => ({
                        ...prevState,
                        [method]: count
                    }));
                } else {
                    setError(`Failed to fetch ${method} requests`);
                }
            } catch (error) {
                setError(`Error fetching ${method} requests: ` + error.message);
            }
        };

        const fetchStatusRequests = async () => {
            try {
                const response = await axios.get(REACT_BASE_PROMETHEUS_URL+'/api/v1/query', {
                    params: {
                        query: `
                        label_replace(count(http_server_duration_milliseconds_count{http_status_code="200"}) or vector(0), "http_status_code", "200", "", "") or 
                        label_replace(count(http_server_duration_milliseconds_count{http_status_code="500"}) or vector(0), "http_status_code", "500", "", "")
                        `
                    }
                });

                if (response.data.status === "success") {
                    const results = response.data.data.result;
                    const statusCounts = results.reduce((acc, result) => {
                        const status = result.metric.http_status_code;
                        acc[status] = result.value[1];
                        return acc;
                    }, {});


                    setStatusRequests({
                        '200': statusCounts['200'] || 0,
                        '500': statusCounts['500'] || 0
                    });
                } else {
                    setError('Failed to fetch status requests');
                }
            } catch (error) {
                setError('Error fetching status requests: ' + error.message);
            }
        };

        const fetchActiveAlerts = async () => {
            try {
                const response = await axios.get(REACT_BASE_ALLERT_MANAGER_URL+'/api/v2/alerts', {
                    params: {
                        limit: 100,
                        state: 'active'
                    }
                });

                if (response.data && Array.isArray(response.data)) {
                    setActiveAlerts(response.data.length);
                } else {
                    setActiveAlerts(0);
                    setError('Failed to fetch active alerts');
                }
            } catch (error) {
                setActiveAlerts(0);
                setError('Error fetching active alerts: ' + error.message);
            }
        };

        const fetchMetrics = async () => {
            try {
                const responseRequestCount = await axios.get(REACT_BASE_PROMETHEUS_URL+'/api/v1/query?query=sum(request_count_requests_total) by (endpoint)');
                const responseActiveRequests = await axios.get(REACT_BASE_PROMETHEUS_URL+'/api/v1/query?query=sum(http_server_active_requests) by (http_method, endpoint)');
                const responseDurationMedian = await axios.get(REACT_BASE_PROMETHEUS_URL+'/api/v1/query?query=histogram_quantile(0.5, sum(rate(http_server_duration_milliseconds_bucket[5m])) by (le, endpoint))');
                const responseDuration95th = await axios.get(REACT_BASE_PROMETHEUS_URL+'/api/v1/query?query=histogram_quantile(0.95, sum(rate(http_server_duration_milliseconds_bucket[5m])) by (le, endpoint))');
                const responseRealtimeVisitors = await axios.get(REACT_BASE_PROMETHEUS_URL+'/api/v1/query?query=sum(realtime_visitors)');

                const responseRequestRates = await axios.get(REACT_BASE_PROMETHEUS_URL+'/api/v1/query?query=request_rates');
                const responseErrorRates = await axios.get(REACT_BASE_PROMETHEUS_URL+'/api/v1/query?query=error_rates');
                const responseUserSessions = await axios.get(REACT_BASE_PROMETHEUS_URL+'/api/v1/query?query=user_sessions');
                const responseTransactionCounts = await axios.get(REACT_BASE_PROMETHEUS_URL+'/api/v1/query?query=transaction_counts');

                const responseAverageResponse = await axios.get(REACT_BASE_PROMETHEUS_URL+'/api/v1/query', {
                    params: {
                        query: 'avg(rate(http_server_duration_milliseconds_sum[15m])) / avg(rate(http_server_duration_milliseconds_count[15m]))'
                    }
                });
                const responseAverageLatency = await axios.get(REACT_BASE_PROMETHEUS_URL+'/api/v1/query', {
                    params: {
                        query: 'avg(rate(http_server_duration_milliseconds_sum[15m]))'
                    }
                });




                setRequestCountData(responseRequestCount.data?.data?.result || []);
                setActiveRequestsData(responseActiveRequests.data?.data?.result || []);
                setResponseDurationMedianData(responseDurationMedian.data?.data?.result || []);
                setResponseDuration95thData(responseDuration95th.data?.data?.result || []);
                setRealtimeVisitors(responseRealtimeVisitors.data?.data?.result[0]?.value[1] || 0);

                setRequestRatesData(responseRequestRates.data?.data?.result || []);
                setErrorRatesData(responseErrorRates.data?.data?.result || []);
                setUserSessionsData(responseUserSessions.data?.data?.result || []);
                setTransactionCountsData(responseTransactionCounts.data?.data?.result || []);
                setAverageResponse(responseAverageResponse.data?.data?.result || []);
                setAverageLatency(responseAverageLatency.data?.data?.result || []);

            } catch (error) {
                setError('Error fetching metrics: ' + error.message);
            }
        };


        const fetchTraces = async () => {
            try {
                const response = await axios.get(REACT_BASE_TRACES_URL+'/traces');
                setTraces(response.data);
            } catch (error) {
                setError('Error fetching traces: ' + error.message);
            }
        };

        const fetchErrorRate = async () => {
            try {
                const response = await fetch(REACT_BASE_PROMETHEUS_URL+'/api/v1/query?query=(sum(rate(http_server_duration_milliseconds_count%7Bhttp_status_code%3D~%224..%22%7D%5B1m%5D))%20%2B%20sum(rate(http_server_duration_milliseconds_count%7Bhttp_status_code%3D~%225..%22%7D%5B1m%5D)))%20/%20sum(rate(http_server_duration_milliseconds_count%5B1m%5D))%20*%20100');
                const data = await response.json();

                if (data.status === 'success' && data.data.result.length > 0) {
                    const errorRateValue = parseFloat(data.data.result[0].value[1]).toFixed(2);
                    setErrorRate(`${errorRateValue}%`);
                } else {
                    setErrorRate('0%');
                }
            } catch (error) {
                console.error('Error fetching error rate:', error);
                setErrorRate('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchErrorRate();

        fetchTraces();

        fetchMetrics();

        fetchTargets();
        fetchTotalRequests();
        ['POST', 'GET', 'UPDATE', 'DELETE'].forEach(fetchMethodRequests);
        fetchStatusRequests();
        fetchActiveAlerts();
    }, []);

    const processData = (data, label) => {
        if (!data || !Array.isArray(data)) return { labels: [], datasets: [] };

        return {
            labels: data.map((point) => point.metric.endpoint || point.metric.http_method || new Date(parseFloat(point.value[0]) * 1000).toLocaleString()),
            datasets: [{
                label: label,
                data: data.map((point) => parseFloat(point.value[1])),
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1
            }]
        };
    };

    const calculateTimeTaken = (spans) => {
        const totalDuration = spans.reduce((acc, span) => acc + span.duration, 0);
        return `${(totalDuration / 1000).toFixed(2)}ms`;
    };

    const toggleExpand = (traceID) => {
        setExpandedTraceID(expandedTraceID === traceID ? null : traceID);
    };
    const [ticketssla, setTicketssla] = useState([]);

    const handleSlaSubmit = () => {
        if (priority && severity) {
            const newTicketsla = {
                priority,
                severity,
                eta,
            };
            setTicketssla([...ticketssla, newTicketsla]);
            setPriority('');
            setSeverity('');
            setEta('');
            setTicket('');
            setTicketEtas([...ticketEtas, eta]);
            setPercentSla(0.87);
            setCreateClicked(true);
        }
    };

    const handleSloSubmit = () => {
        setPercentSlo(0.85);
        if (expandedTicketIndex !== -1 && eta) {
            const newTicketEtas = [...ticketEtas];
            newTicketEtas[expandedTicketIndex] = eta;
            setTicketEtas(newTicketEtas);
        }
    };

    const gaugeChartSla = useMemo(() => (
        <GaugeChart
            id="gauge-chart5"
            style={{ width: '300px', height: '170px' }}
            nrOfLevels={420}
            arcsLength={[0.3, 0.3, 0.4]}
            colors={['#EA4228', '#F5CD19', '#5BE12C']}
            percent={percentSla}
            arcPadding={0.02}
            textColor={['rgb(91, 225, 44)']}
            arcsWidth={0.3}
            marginInPercent={0.01}
        />
    ), [percentSla]);

    const gaugeChartSlo = useMemo(() => (
        <GaugeChart
            id="gauge-chart5"
            style={{ width: '300px', height: '170px' }}
            nrOfLevels={420}
            arcsLength={[0.3, 0.3, 0.4]}
            colors={['#EA4228', '#F5CD19', '#5BE12C']}
            percent={percentSlo}
            arcPadding={0.02}
            textColor={['rgb(91, 225, 44)']}
            arcsWidth={0.3}
            marginInPercent={0.01}
        />
    ), [percentSlo]);

    return (
        <div className="user-container">
            <Navbar />
            <div className="user-wrapper">
                <Sidebar />
                <div className='user-midle-wraper'>
                    <div className='left-inner-wrapper'>
                        <div className="user-inner-wrapper">
                            {!showChat ? (
                                <>
                                    <div className="user-header-wrapper">
                                        <div className="user-header">
                                            <h1>Generative Agents for</h1> <span>Application Observability</span>
                                        </div>
                                        <p>Drawing insights from your application to monitor your application and suggest effective solutions.</p>
                                    </div>
                                    <div className="services-section">
                                        <div className='services-header'>
                                            <h2>Application</h2>
                                            <div className='services-left'>
                                                <div className='green'></div>
                                                <h4>Up</h4>
                                                <div className='grey'></div>
                                                <h4>Down</h4>
                                                <div className='more-details'>
                                                    <img src={drop1} alt="Frame" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="targets-wrapper">
                                            {error && <div className="error">{error}</div>}
                                            <div className="circular-meters">
                                                {targets.map((target, index) => (
                                                    <Link to="/services" key={index} className="circular-meter">
                                                        <SemicircularProgressBar
                                                            value={target.health === "up" ? 100 : 0}
                                                            color={target.health === "up" ? "#6271CD" : "red"}
                                                        />
                                                        <div className="meter-label">
                                                            <h3>Instance: </h3><p>{target.labels.instance}</p>
                                                        </div>
                                                    </Link>
                                                ))}
                                                <Link to="/allerts" className='circular-meter'>
                                                    <div className='allerts-number'>
                                                        <h1>{activeAlerts}</h1>
                                                    </div>
                                                    <h3>Active Alerts</h3>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='service-level-wrapper'>

                                        <div class={`service-level zoom-on-hover ${isRotated ? 'rotated' : ''}`} onClick={handleToggleDetailsSla}>
                                            <div className='service-level-header-wrapper'>
                                                <div className='service-level-header'>
                                                    <h3>SLA</h3>
                                                    <div style={{ display: 'flex', alignItems: 'start', marginRight: '-20px' }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                                            <Tooltip title="SLA Settings">
                                                                <IconButton
                                                                    onClick={handleClickSLA}
                                                                    size="small"
                                                                    sx={{ ml: 2 }}
                                                                    aria-controls={openSLA ? 'account-menu' : undefined}
                                                                    aria-haspopup="true"
                                                                    aria-expanded={openSLA ? 'true' : undefined}
                                                                >
                                                                  <MoreVertIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Box>
                                                        <Menu
                                                            anchorEl={anchorElSLA}
                                                            id="account-menu"
                                                            open={openSLA}
                                                            onClose={handleCloseSLA}
                                                            onClick={handleCloseSLA}
                                                            PaperProps={{
                                                                elevation: 0,
                                                                sx: {
                                                                    overflow: 'visible',
                                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                                    mt: 1.5,
                                                                    '& .MuiAvatar-root': {
                                                                        width: 32,
                                                                        height: 32,
                                                                        ml: -0.5,
                                                                        mr: 1,
                                                                    },
                                                                    '&::before': {
                                                                        content: '""',
                                                                        display: 'block',
                                                                        position: 'absolute',
                                                                        top: 0,
                                                                        right: 14,
                                                                        width: 10,
                                                                        height: 10,
                                                                        bgcolor: 'background.paper',
                                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                                        zIndex: 0,
                                                                    },
                                                                },
                                                            }}
                                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                                        >
                                                             <MenuItem onClick={handleOpenSlamodal}>
                                                                <AddCircleIcon sx={{marginRight:'7px', color: '#878787'}}/> Add SLA
                                                            </MenuItem>
                                                            <MenuItem onClick={handleCloseSLO}>
                                                                <ReadMoreIcon sx={{marginRight:'7px', color: '#878787'}}/> More Details
                                                            </MenuItem>
                                                            <MenuItem onClick={handleCloseSLO}>
                                                                
                                                               <EmailIcon  sx={{marginRight:'7px', color: '#878787'}}/> Send Email
                                                            </MenuItem>
                                                            <MenuItem onClick={handleCloseSLO}>
                                                               <DownloadIcon  sx={{marginRight:'7px', color: '#878787'}}/> Download
                                                            </MenuItem>
                                                            <MenuItem onClick={handleCloseSLO}>
                                                                <PictureAsPdfIcon  sx={{marginRight:'7px', color: '#878787'}} /> Save as PDF 
                                                            </MenuItem>
                                                        </Menu>
                                                    </div>
                                                </div>

                                                <Modal
                                                    open={openModalSLA}
                                                    onClose={handleCloseSlamodal}
                                                    aria-labelledby="add-sla-modal"
                                                    aria-describedby="add-sla-modal-description"
                                                >
                                                    <Box style={modalStyle}>
                                                        <div style={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                        }}>
                                                            <Typography id="add-sla-modal" variant="h5" component="h2" style={modalHeadingStyle}>Add SLA</Typography>
                                                            <CloseIcon onClick={handleCloseSlamodal} sx={{ cursor: 'pointer' }} />
                                                        </div>

                                                        {ticketssla.map((ticket, index) => (
                                                            <Box
                                                                key={index}
                                                                sx={{
                                                                    backgroundColor: '#56b756',
                                                                    padding: '8px',
                                                                    margin: '0 0 14px 0',
                                                                    borderRadius: '10px',
                                                                    display: 'flex',
                                                                    justifyContent: 'left',
                                                                    alignItems: 'center',
                                                                }}
                                                            >
                                                                <Typography sx={{
                                                                    margin: '0',
                                                                    fontFamily: "sans-serif",
                                                                    fontWeight: 600,
                                                                    fontSize: '15px',
                                                                    lineHeight: 1.5,
                                                                    letterSpacing: '0.00938em'
                                                                }}>
                                                                    Ticket {index + 1} (Priority: {ticket.priority}, Severity: {ticket.severity}, ETA: {ticketEtas[index] || 'Not set'})
                                                                </Typography>
                                                            </Box>
                                                        ))}
                                                        <div style={inputContainerStyle}>
                                                            <TextField
                                                                select
                                                                fullWidth
                                                                label="Priority"
                                                                value={priority}
                                                                onChange={handlePriorityChange}
                                                            >
                                                                {priorities.map((option) => (
                                                                    <MenuItem key={option} value={option}>
                                                                        {option}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                        </div>
                                                        <div style={inputContainerStyle}>
                                                            <TextField
                                                                select
                                                                fullWidth
                                                                label="Severity"
                                                                value={severity}
                                                                onChange={handleSeverityChange}
                                                            >
                                                                {severities.map((option) => (
                                                                    <MenuItem key={option} value={option}>
                                                                        {option}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                        </div>
                                                        <div style={inputContainerStyle}>
                                                            <TextField
                                                                fullWidth
                                                                label="ETA"
                                                                value={eta}
                                                                onChange={handleEtaChange}
                                                            />

                                                        </div>
                                                        <div style={inputContainerStyle}>
                                                            <TextField
                                                                fullWidth
                                                                label="Ticket"
                                                                value={ticket}
                                                                onChange={handleTicketChange}
                                                            />
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                            <Button
                                                                onClick={handleSlaSubmit}
                                                                sx={{ fontSize: "14px", fontWeight: 800 }}
                                                                variant="contained"
                                                                disabled={!priority || !severity || !eta || !ticket}
                                                            >
                                                                Create
                                                            </Button>
                                                        </div>
                                                    </Box>
                                                </Modal>

                                                {gaugeChartSla}

                                            </div>

                                            <ul className={`more-details1 ${showDetailsSla ? 'show' : 'hide'}`}>
                                                <li>Tickets are categorized on Priority/Severity</li>
                                                <li>Automated GenAi defined tickets Priority/Severity</li>
                                                <li>Each Ticket contains its % value, which can be customised and sla are defined.</li>
                                            </ul>
                                        </div>

                                        <div
                                            className={`service-level1 zoom-on-hover ${isRotated ? 'rotated' : ''}`}
                                            onClick={handleToggleDetailsSlo}
                                        >
                                            <div className='service-level-header-wrapper'>
                                                <div className='service-level-header'>
                                                    <h3>SLO</h3>
                                                    {/* <div style={{ display: 'flex', alignItems: 'start', marginRight: '-20px' }}> */}
                                                        {/* <div title='Add SLO'>
                                                            <AddCircleIcon
                                                                onClick={handleOpenSlomodal}
                                                                sx={{ color: '#379ad3', cursor: 'pointer' }}
                                                            />
                                                        </div> */}
                                                       <div style={{ display: 'flex', alignItems: 'start', marginRight: '-20px' }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                                            <Tooltip title="SLO Settings">
                                                                <IconButton
                                                                    onClick={handleClickSLO}
                                                                    size="small"
                                                                    sx={{ ml: 2 }}
                                                                    aria-controls={openSLO ? 'account-menu' : undefined}
                                                                    aria-haspopup="true"
                                                                    aria-expanded={openSLO ? 'true' : undefined}
                                                                >
                                                                  <MoreVertIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Box>
                                                        <Menu
                                                            anchorEl={anchorElSLO}
                                                            id="account-menu"
                                                            open={openSLO}
                                                            onClose={handleCloseSLO}
                                                            onClick={handleCloseSLO}
                                                            PaperProps={{
                                                                elevation: 0,
                                                                sx: {
                                                                    overflow: 'visible',
                                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                                    mt: 1.5,
                                                                    '& .MuiAvatar-root': {
                                                                        width: 32,
                                                                        height: 32,
                                                                        ml: -0.5,
                                                                        mr: 1,
                                                                    },
                                                                    '&::before': {
                                                                        content: '""',
                                                                        display: 'block',
                                                                        position: 'absolute',
                                                                        top: 0,
                                                                        right: 14,
                                                                        width: 10,
                                                                        height: 10,
                                                                        bgcolor: 'background.paper',
                                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                                        zIndex: 0,
                                                                    },
                                                                },
                                                            }}
                                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                                        >
                                                            <MenuItem onClick={handleOpenSlomodal}>
                                                                <AddCircleIcon sx={{marginRight:'7px', color: '#878787'}}/> Add SLO
                                                            </MenuItem>
                                                            <MenuItem onClick={handleCloseSLO}>
                                                                <ReadMoreIcon sx={{marginRight:'7px', color: '#878787'}}/> More Details
                                                            </MenuItem>
                                                            <MenuItem onClick={handleCloseSLO}>
                                                                
                                                               <EmailIcon  sx={{marginRight:'7px', color: '#878787'}}/> Send Email
                                                            </MenuItem>
                                                            <MenuItem onClick={handleCloseSLO}>
                                                               <DownloadIcon  sx={{marginRight:'7px', color: '#878787'}}/> Download
                                                            </MenuItem>
                                                            <MenuItem onClick={handleCloseSLO}>
                                                                <PictureAsPdfIcon  sx={{marginRight:'7px', color: '#878787'}} /> Save as PDF 
                                                            </MenuItem>
                                                        </Menu>
                                                    </div>
                                                    </div>
                                                <Modal
                                                    open={openModalSLO}
                                                    onClose={handleCloseSlomodal}
                                                    aria-labelledby="add-sla-modal"
                                                    aria-describedby="add-sla-modal-description"
                                                >
                                                    <Box style={modalStyle}>
                                                        <div style={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                        }}>
                                                            <Typography id="add-sla-modal" variant="h5" component="h2" style={modalHeadingStyle}>Add SLO</Typography>
                                                            <CloseIcon onClick={handleCloseSlomodal} sx={{ cursor: 'pointer' }} />
                                                        </div>

                                                        {ticketssla.map((ticket, index) => (
                                                            <div
                                                                key={index}
                                                                className="zoom-on-hover"
                                                                style={{
                                                                    marginBottom: '14px',
                                                                    background: '#f1f1f1 ',
                                                                    borderRadius: '10px',
                                                                    height: 'maxContent',
                                                                    padding: '10px'
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        backgroundColor: '#56b756',
                                                                        padding: '8px',
                                                                        borderRadius: '10px',
                                                                        display: 'flex',
                                                                        justifyContent: 'left',
                                                                        alignItems: 'center',
                                                                        cursor: 'pointer',
                                                                    }}
                                                                    onClick={() => {
                                                                        setExpandedTicketIndex(index === expandedTicketIndex ? -1 : index);
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        sx={{
                                                                            margin: '0',
                                                                            fontFamily: 'sans-serif',
                                                                            fontWeight: 600,
                                                                            fontSize: '15px',
                                                                            lineHeight: 1.5,
                                                                            letterSpacing: '0.00938em'
                                                                        }}
                                                                    >
                                                                        Ticket {index + 1} (Priority: {ticket.priority}, Severity: {ticket.severity}, ETA: {ticketEtas[index] || 'Not set'})
                                                                    </Typography>
                                                                </Box>

                                                                {expandedTicketIndex === index && (
                                                                    <div style={{ marginTop: '15px', borderRadius: '10px' }}>
                                                                        <FormControl fullWidth>
                                                                            <div style={inputContainerStyle}>
                                                                                <TextField
                                                                                    fullWidth
                                                                                    label="Add ETA"
                                                                                    value={eta}
                                                                                    onChange={(event) => {
                                                                                        setEta(event.target.value); // Update 'eta' state here
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </FormControl>
                                                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                            <Button
                                                                                onClick={handleSloSubmit}
                                                                                sx={{ fontSize: "14px", fontWeight: 800, marginTop: '10px' }}
                                                                                variant="contained"
                                                                                disabled={!ticketEtas[index]}
                                                                            >
                                                                                Update ETA
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </Box>
                                                </Modal>
                                                {gaugeChartSlo}

                                            </div>
                                            <ul className={`more-details1 ${showDetailsSlo ? 'show' : 'hide'}`}>
                                                <li>Tickets are categorized on Priority/Severity</li>
                                                <li>Automated GenAi defined tickets Priority/Severity</li>
                                                <li>Each Ticket contains its % value, which can be customised and slo are defined.</li>
                                            </ul>
                                        </div>
                                        <div
                                            className={`service-level2 zoom-on-hover ${isRotated ? 'rotated' : ''}`}
                                            onClick={handleToggleDetailsSli}
                                        >
                                            <div className='service-level-header'>
                                                <h3>SLI</h3>
                                                

                                            </div>




                                            <ReactSpeedometer
                                                maxValue={maxValue}
                                                value={value}
                                                needleColor="red"
                                                startColor="green"
                                                segments={10}
                                                endColor="blue"
                                                height={147}
                                                customSegmentLabels={[
                                                    {
                                                        text: "10%",
                                                        position: "OUTSIDE",
                                                        color: "#555",
                                                    },
                                                    {
                                                        text: "20%",
                                                        position: "OUTSIDE",
                                                        color: "#555",
                                                    },
                                                    {
                                                        text: "30%",
                                                        position: "OUTSIDE",
                                                        color: "#555",
                                                    },
                                                    {
                                                        text: "40%",
                                                        position: "OUTSIDE",
                                                        color: "#555",
                                                    },
                                                    {
                                                        text: "50%",
                                                        position: "OUTSIDE",
                                                        color: "#555",
                                                    },
                                                    {
                                                        text: "60%",
                                                        position: "OUTSIDE",
                                                        color: "#555",
                                                    },
                                                    {
                                                        text: "70%",
                                                        position: "OUTSIDE",
                                                        color: "#555",
                                                    },
                                                    {
                                                        text: "80%",
                                                        position: "OUTSIDE",
                                                        color: "#555",
                                                    },
                                                    {
                                                        text: "90%",
                                                        position: "OUTSIDE",
                                                        color: "#555",
                                                    },
                                                    {
                                                        text: "100%",
                                                        position: "OUTSIDE",
                                                        color: "#555",
                                                    }
                                                ]}
                                                currentValueText={`${value}%`}
                                            />

                                            <ul className={`more-details1 ${showDetailsSli ? 'show' : 'hide'}`}>
                                                <li>Tickets are categorized on Priority/Severity</li>
                                                <li>Automated GenAi defined tickets Priority/Severity</li>
                                                <li>Each Ticket contains its % value, through which sli is calculated.</li>
                                            </ul>
                                        </div>

                                    </div>
                                    <div className='sla-matrix'>
                                        <div className='sla-wrapper '>
                                            <div className='inner-sla-wrapper'>
                                                <div className='top-sla'>
                                                    <h4>Outrage: </h4><p></p>
                                                    <h4>Violation: </h4><p></p>
                                                </div>
                                                <div className='sla color'>
                                                    <h1>Minor</h1>
                                                </div>
                                            </div>
                                            <h3>Health</h3>
                                        </div>
                                        <div className='sla-wrapper'>
                                            <div className='inner-sla-wrapper'>
                                                <div className='top-sla'>
                                                    <h4>Outrage: </h4><p></p>
                                                    <h4>Violation: </h4><p></p>
                                                </div>
                                                <div className='sla color'>
                                                    <h1>Minor</h1>
                                                </div>
                                            </div>
                                            <h3>Quality</h3>
                                        </div>
                                        <div className='sla-wrapper'>
                                            <div className='inner-sla-wrapper'>
                                                <div className='top-sla'>
                                                    <h4>Outrage: </h4><p></p>
                                                    <h4>Violation: </h4><p></p>
                                                </div>
                                                <div className='sla color'>
                                                    <h1>0 %</h1>
                                                </div>
                                            </div>
                                            <h3>Risk</h3>
                                        </div>
                                        <div className='sla-wrapper'>
                                            <div className='inner-sla-wrapper'>
                                                <div className='top-sla'>
                                                    <h4>Outrage: </h4><p></p>
                                                    <h4>Violation: </h4><p></p>
                                                </div>
                                                <div className='sla color'>
                                                    <h1>100 %</h1>
                                                </div>
                                            </div>
                                            <h3>Availabability</h3>
                                        </div>
                                    </div>
                                    <div className='matrix-wrapper-outside'>
                                        <div className='matrix-wrapper'>
                                            <h4>Request Type</h4>
                                            <div className='matrix-inner'>
                                                <div className='total-request-header'>
                                                    <h4>TOTAL REQUESTS</h4>
                                                    <div className='request-list'>
                                                        <h1>{totalRequests}</h1>
                                                    </div>
                                                </div>
                                                <div className='total-request-header2'>
                                                    {Object.entries(methodRequests).map(([method, count]) => (
                                                        count > 0 && (
                                                            <div className='total-request-wrapper1' key={method}>
                                                                <h4>{method}</h4>
                                                                <div className='request-list'>
                                                                    <h1>{count}</h1>
                                                                </div>
                                                            </div>
                                                        )
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='matrix-wrapper1'>
                                            <div className='matrix-wrapper'>
                                                <h4>Request Status</h4>
                                                <div className='matrix-inner'>
                                                    <div className='total-request-header3'>
                                                        {Object.entries(statusRequests).map(([status, count]) => (
                                                            <div className='total-request-wrapper' key={status}>
                                                                <h4>{status}</h4>
                                                                <div className='request-list'>
                                                                    <h1>{count}</h1>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='matrix-wrapper'>
                                                <h4>Realtime Visitors</h4>
                                                <div className='matrix-inner'>
                                                    <div className='total-request-header4'>
                                                        <div className='request-list'>
                                                            <h1>{realtimeVisitors}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='matrix-wrapper1'>
                                            <div className='matrix-wrapper'>
                                                <h4>Error(%)</h4>
                                                <div className='matrix-inner'>
                                                    <div className='total-request-header4'>
                                                        <div className='request-list'>
                                                            <h1>{errorRate}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='matrix-wrapper'>
                                                <h4>Average Response & Latency (ms)</h4>
                                                <div className='matrix-inner'>
                                                    <div className='total-request-header3'>
                                                        <div className='total-request-wrapper'>
                                                            <h4>Response</h4>
                                                            <div className='request-list'>
                                                                <h1>
                                                                    {averageresponse && averageresponse.length > 0 && typeof averageresponse[0].value[1] === 'string'
                                                                        ? `${parseFloat(averageresponse[0].value[1]).toFixed(2)}`
                                                                        : 'Loading...'}
                                                                </h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='total-request-header3'>
                                                        <div className='total-request-wrapper'>
                                                            <h4>Latency</h4>
                                                            <div className='request-list'>
                                                                <h1>
                                                                    {averageLatency ? parseFloat(averageLatency[0]?.value[1]).toFixed(2) : 'Loading...'}
                                                                </h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='user-dashboard'>
                                        <div className='services-header'>
                                            <h2>Dashboard</h2>
                                            <div className='services-left'>
                                                <div className='more-details'>
                                                    <img src={drop1} alt="Frame" />
                                                </div>
                                            </div>
                                        </div>
                                        <Link to="/dashboard" className='user-dashboard-wrapper'>
                                            <div className="dashboard-wrapper">
                                                {error && <div className="error">{error}</div>}
                                                <div className="chart-container">
                                                    <h3 >Request Count per Endpoint</h3>
                                                    <Line data={processData(requestCountData, 'Request Count')} />
                                                </div>
                                                <div className="chart-container">
                                                    <h3>Active Requests per Method per Endpoint</h3>
                                                    <Line data={processData(activeRequestsData, 'Active Requests')} />
                                                </div>
                                            </div>
                                            <div className="dashboard-wrapper">
                                                {error && <div className="error">{error}</div>}

                                                <div className="chart-container">
                                                    <h3>Median Response Duration per Endpoint</h3>
                                                    <Line data={processData(responseDurationMedianData, 'Median Response Duration')} />
                                                </div>
                                                <div className="chart-container">
                                                    <h3>95th Percentile Response Duration per Endpoint</h3>
                                                    <Line data={processData(responseDuration95thData, '95th Percentile Response Duration')} />
                                                </div>
                                            </div>
                                            <div className="dashboard-wrapper">
                                                {error && <div className="error">{error}</div>}

                                                <div className="chart-container">
                                                    <h3>Request Rates</h3>
                                                    <Line data={processData(requestRatesData, 'Request Rates')} />
                                                </div>
                                                <div className="chart-container">
                                                    <h3>Error Rates</h3>
                                                    <Line data={processData(errorRatesData, 'Error Rates')} />
                                                </div>
                                            </div>
                                            <div className="dashboard-wrapper">
                                                {error && <div className="error">{error}</div>}
                                                <div className="chart-container">
                                                    <h3>User Sessions</h3>
                                                    <Line data={processData(userSessionsData, 'User Sessions')} />
                                                </div>
                                                <div className="chart-container">
                                                    <h3>Transaction Counts</h3>
                                                    <Line data={processData(transactionCountsData, 'Transaction Counts')} />
                                                </div>
                                            </div>

                                        </Link>
                                    </div>
                                    <div className='user-traces-wrapper'>
                                        <div className='services-header'>
                                            <h2>Traces</h2>
                                            <div className='services-left'>
                                                <div className='more-details'>
                                                    <img src={drop1} alt="Frame" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='bottom-traces'>
                                            <div className="top-traces">
                                                <h3>Compare traces by selecting result items</h3>
                                            </div>
                                            <div className="traces-wrapper">
                                                {traces.filter(trace => {
                                                    const parentSpan = trace.spans.find(span => span.type === 'parent');
                                                    return parentSpan.operationName !== 'GET /metrics';
                                                }).map(trace => {
                                                    const parentSpan = trace.spans.find(span => span.type === 'parent');
                                                    const timeTaken = calculateTimeTaken(trace.spans);
                                                    const isExpanded = expandedTraceID === trace.traceID;
                                                    return (
                                                        <div key={trace.traceID} className='trace'>
                                                            <Link to="/traces" className='header-traces'>
                                                                <div className='box'></div>
                                                                <div className='inner-header'>
                                                                    <div className='inner-header-wrapper'>
                                                                        <h3>Service:</h3>
                                                                        <p>{parentSpan.operationName}</p>
                                                                    </div>
                                                                    <div className='inner-header-wrapper'>
                                                                        <h3>Time Taken:</h3>
                                                                        <p>{timeTaken}</p>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                            <div className='body-traces'>
                                                                <div className='span-wrapper'>
                                                                    <div className='span'>
                                                                        <h4>Span:</h4>
                                                                        <p>{trace.spans.length}</p>
                                                                    </div>
                                                                    <div className='services'>
                                                                        <h4>Sub-Services:</h4>
                                                                        <p>{trace.spans.length}</p>
                                                                    </div>
                                                                    <div className='services'>
                                                                        <h4>Status: </h4>
                                                                        <p>200</p>
                                                                    </div>
                                                                    <div className='services'>
                                                                        <h4>Availabability %: </h4>
                                                                        <p>100%</p>
                                                                    </div>
                                                                    <div className='services'>
                                                                        <h4>Error %: </h4>
                                                                        <p>0%</p>
                                                                    </div>
                                                                    <div className='services'>
                                                                        <h4>Latency (ms): </h4>
                                                                        <p>0.8 </p>
                                                                    </div>

                                                                </div>
                                                                <div className='more-details' onClick={() => toggleExpand(trace.traceID)}>
                                                                    <img src={drop} alt="Frame" className={isExpanded ? 'rotate' : ''} />
                                                                </div>
                                                            </div>
                                                            {isExpanded && (
                                                                <div className='expanded-details'>
                                                                    {trace.spans.map((span, index) => (
                                                                        <div key={span.spanID} className='span-detail'>
                                                                            <div className='span2'>
                                                                                <h4>Service {index + 1}:</h4> <p>{span.operationName}</p>
                                                                            </div>
                                                                            <div className='span2'>
                                                                                <h4>Time Taken: </h4> <p>{(span.duration / 1000).toFixed(2)}ms</p>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                                {error && <div className="error">{error}</div>}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className='chat-wrapper'>
                                    <div className='cross-option'>
                                        <a href="/user">
                                            <img src={cross1} alt="Frame" />
                                        </a>
                                    </div>
                                    {chatMessages.map((message, index) => (
                                        <div key={index} className={`chat-component ${message.type}`}>
                                            <div className="chat-header">
                                                <img src={message.type === "bot" ? Frame : chat_profile1} alt="" />
                                            </div>
                                            <div className="chat-body">
                                                <p>{message.text}</p>
                                                <Response message={message.response} />

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}



                        </div>
                    </div>
                </div>
                <Chat />
            </div>
        </div>
    );
}

export default User;
