import automate from "../Assets/automate.svg";
import right from "../Assets/right.svg";
import React, { useState, useEffect, useRef } from "react";
import send from "../Assets/send.svg";
import star from "../Assets/star.svg";
import "../Common-Componet/common.css";
import "../Prompts/prompts.css";
import cross1 from "../Assets/cross1.svg";
import chat_profile1 from "../Assets/chat_profile1.svg";
import Response from "../Response";
import Frame from "../Assets/Frame.svg";
import san from "../Assets/san.svg";
import click2 from "../Assets/click2.svg";
import Chat from "../Chat/chat";
import Sidebar from "../Common-Componet/Sidebar/sidebar";
import Navbar from "../Common-Componet/Navbar/navbar";
import drop3 from "../Assets/drop3.svg";
import ChatBot from "../Assets/chatbot.png";
import star2 from "../Assets/star2.svg";
import drop4 from "../Assets/drop4.svg";

function Prompts(props) {
  const [activeTab, setActiveTab] = useState('All');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const [messageHistory, setMessageHistory] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const chatWrapperRef = useRef(null);
  const [value, setValue] = useState("")
  const [content, setContent] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    if (chatWrapperRef.current) {
      chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const responseMapping = {
    "What is the average response time, latency, and error rate of my Application?":
      "The average response time of your application is 10.10 ms. The latency is 5.5 ms. Error rate is 2%.",
    "What are the sub-services used by my Application?":
      "Your application uses sub-services GET /api/get and POST /api/post.",
    "Is my application running properly?":
      "Your application appears to be running properly with 0% risk and error.",
    "average response time":
      "The average response time of your application is 5.10 ms.",
    "response time":
      "The average response time of your application is 5.10 ms.",
    response: "The average response time of your application is 5.10 ms.",
    error: "The error of your application is 0%",
    latency: "The latency of your application is 0.8 ms.",
    "what is status of my application":
      "Your Python application is operating normally with regular garbage collection cycles, stable memory usage, and moderate CPU utilization. The HTTP server component is actively handling requests, primarily with one active GET request on host 10.0.0.28:5000. Overall, your application appears to be functioning as expected with typical resource usage patterns.",
    "How can I decrease my Application response time, latency, and error rate?":
      "To improve application response time, latency, and error rate, optimize your code and database queries, use caching, and simplify network payloads. Enhance infrastructure with load balancing, scaling, and CDNs. Improve front-end performance by using asynchronous loading and optimizing assets. Implement comprehensive error monitoring and graceful handling. Adopt microservices and containerization for scalability. Utilize CI/CD for frequent, reliable updates. Optimize third-party API usage and ensure strong SLAs with providers. This ensures a more reliable and performant application.",
    "What are the steps to restart my Application or Services?":
      "To restart your application or services, first, access the server using SSH or RDP, or log in directly. Check the service status with commands like `systemctl status <service-name>` on Linux or `Get-Service <service-name>` on Windows. Stop the service using `systemctl stop <service-name>` (Linux) or `Stop-Service <service-name>` (Windows), and verify it has stopped. Then, start the service again using `systemctl start <service-name>` or `Start-Service <service-name>`. Confirm the service is running by rechecking its status, and finally, review logs to ensure everything is functioning correctly. For containerized applications, use `docker` or `kubectl` commands for similar operations.",
    "Steps to protect a network from unauthorized access, data breaches.":
      "To protect a network from unauthorized access and data breaches, implement strong access controls with multi-factor authentication and role-based permissions. Use firewalls to control network traffic and web application firewalls for added protection. Regularly update and patch systems to fix vulnerabilities. Encrypt sensitive data in transit and at rest, and employ intrusion detection/prevention systems to monitor for suspicious activity. Conduct regular security audits and training to ensure all users follow best practices. Finally, maintain robust backup solutions to recover data in case of an incident.",
  };

  const handleSelectPrompt = (prompt) => {
    const newMessage = { type: "user", text: prompt };
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);

    if (responseMapping[prompt]) {
      const responseMessage = {
        type: "bot",
        response: responseMapping[prompt],
      };
      setChatMessages((prevMessages) => [...prevMessages, responseMessage]);
    } else {
      const errorMessage = {
        type: "bot",
        response: "Sorry, I don't have a response for that question.",
      };
      setChatMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setShowChat(true);
  };

  const handleSendMessage = () => {
    const message = userMessage.trim();

    if (message) {
      const newMessage = { type: "user", text: message };
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      setShowChat(true);

      if (responseMapping[message.toLowerCase()]) {
        const responseMessage = {
          type: "bot",
          response: responseMapping[message.toLowerCase()],
        };
        setChatMessages((prevMessages) => [...prevMessages, responseMessage]);
      } else {
        const errorMessage = {
          type: "bot",
          response: "Sorry, I don't have a response for that question.",
        };
        setChatMessages((prevMessages) => [...prevMessages, errorMessage]);
      }

      setUserMessage("");
    }
  };

  const allContent = {
    "market-analysis": {
      line1:
        "AI streamlines data collection and analysis, allowing researchers to focus on interpreting insights",
      line2:
        "AI streamlines data collection and analysis, allowing researchers to focus on interpreting insights",
      line3: "AI predicts trends based on historical data",
      line4: "AI tailors experiences by analyzing individual behavior",
      line5: "AI identifies distinct customer groups",
      line6: "AI detects emerging patterns in large datasets",
      line7: " Set alerts for portfolio value changes",
      line8: "Explore market trends for your key holdings over the last month",
      line9: "Show me market trends for my top holdings over the last month",
    },
    "portfolio-management": {
      line1:
        "Diversify across different types of cryptocurrencies to spread risk",
      line2: "Monitor the performance of your investments in real-time",
      line3: "Adjust your portfolio based on market conditions",
      line4: "Crypto markets can be volatile",
      line5:
        "Consider using platforms like Uphold, Delta,for portfolio management",
      line6:
        "Involves strategically selecting to optimize returns and minimize risks",
      line7: "AI algorithms detect emerging trends in large datasets",
      line8: "Set an alert for my portfolio value increases by 10%",
      line9:
        " Consider a mix of established coins (like Bitcoin and Ethereum) and promising altcoins",
    },
    "trading-insights": {
      line1: "What is the current value of my cryptocurrency portfolio?",
      line2:
        "AI tools streamline data collection and analysis, freeing up researchers to focus on interpreting insights",
      line3:
        "AI sentiment analysis automates the process of analyzing text data to identify expressed sentiments or emotional tones",
      line4:
        "AI models can predict future trends and behaviors based on historical data",
      line5:
        "AI algorithms analyze individual customer behavior to create personalized experiences",
      line6:
        "AI identifies distinct customer segments based on behavior, demographics, and preferences.",
      line7:
        "AI algorithms detect emerging trends and patterns in large datasets",
      line8: "Set an alert for my portfolio value increases by 10%",
      line9: "Show me market trends for my top holdings over the last month",
    },
    "technical-analysis": {
      line1:
        "If your crypto investments appreciate significantly, consider rebalancing to avoid an overly heavy portfolio",
      line2:
        "To determine your current portfolio value, you need to calculate the total value of your crypto holdings",
      line3:
        "For technical analysis, consider using tools like moving averages, RSI ( MACD  and chart patterns.",
      line4:
        "These indicators can help you identify trends, potential entry/exit points, and overall market sentiment",
      line5:
        "AI algorithms analyze individual customer behavior to create personalized experiences",
      line6:
        "AI identifies distinct customer segments based on behavior, demographics, and preferences.",
      line7:
        "AI algorithms detect emerging trends and patterns in large datasets",
      line8: "Set an alert for my portfolio value increases by 10%",
      line9: "Show me market trends for my top holdings over the last month",
    },
  };
  useEffect(() => {
    // Check if activeCategory is stored in localStorage
    const storedCategory = localStorage.getItem("activeCategory");
    if (storedCategory && allContent[storedCategory]) {
      setActiveCategory(storedCategory);
      setContent({ [storedCategory]: allContent[storedCategory] });
    } else {
      // Default to "all" category on first render
      setActiveCategory("all");
      setContent(allContent);
      localStorage.setItem("activeCategory", "all");
    }
  }, []);

  const handleChangeCategory = (insidecategory) => {
    // Update active category and content based on button click
    setActiveCategory(insidecategory);
    if (insidecategory === "all") {
      setContent(allContent);
    } else {
      setContent({ [insidecategory]: allContent[insidecategory] });
    }
    localStorage.setItem("activeCategory", insidecategory);
  };

  return (
    <div className="user-container">
      <Navbar />
      <div className="user-wrapper">
        <Sidebar />

        <div className="chat-container1">
          <div className="user-header-wrapper1">
            <div className="user-header1">
              <h1>Generative Agents for Application Observability</h1>
            </div>
            <p>Talk freely and our AI will fit the best headphones for you</p>
          </div>
          <div className="prompt-middle-wrapper">
            <div className="search-prompt-wrapper gradient-box">
              <img src={star2} alt="Frame" />
              <input
                type="text"
                placeholder="Search for anything..."
              />
            </div>
            <div className="prompt-search">
              <p>Search</p>
            </div>
          </div>
          <div className="prompt-bottom-wrapper">
            <h1>Suggested Prompts</h1>
            <div className="prompt-tab-wrapper">
              <div className={`prompt-tab ${activeTab === 'All' ? 'active' : ''}`} onClick={() => handleTabClick('All')}>
                <p>All</p>
              </div>
              <div className={`prompt-tab ${activeTab === 'Application Analysis' ? 'active' : ''}`} onClick={() => handleTabClick('Application Analysis')}>
                <p>Application Analysis</p>
              </div>
              <div className={`prompt-tab ${activeTab === 'Application Insights' ? 'active' : ''}`} onClick={() => handleTabClick('Application Insights')}>
                <p>Application Insights</p>
              </div>
              <div className={`prompt-tab ${activeTab === 'Application Performance' ? 'active' : ''}`} onClick={() => handleTabClick('Application Performance')}>
                <p>Application Performance</p>
              </div>
              <div className={`prompt-tab ${activeTab === 'Alerts' ? 'active' : ''}`} onClick={() => handleTabClick('Alerts')}>
                <p>Alerts</p>
              </div>
            </div>

            {activeTab === 'All' && (
              <div className="all-prompt-wrapper">
                <div className="all-prompt">
                  <div className="prompt-card">
                    <p>What are the critical performance metrics for the application (e.g., response time, latency, throughput)?</p>
                  </div>
                  <div className="prompt-card">
                    <p>What are the most common errors encountered by users?</p>
                  </div>
                  <div className="prompt-card">
                    <p>How does the application adhere to security best practices and compliance requirements?</p>
                  </div>
                </div>
                <div className="all-prompt">
                  <div className="prompt-card">
                    <p>Are there processes in place to incorporate user feedback and performance metrics into development cycles?</p>
                  </div>
                  <div className="prompt-card">
                    <p>How does the application scale under increased load or user traffic?</p>
                  </div>
                  <div className="prompt-card">
                    <p>How effective are these alerts in detecting and mitigating issues before they impact users?</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'Application Analysis' && (
              <div className="all-prompt-wrapper">
                <div className="all-prompt">
                  <div className="prompt-card">
                    <p>How do response times vary under different load levels or during peak usage periods?</p>
                  </div>
                  <div className="prompt-card">
                    <p>What are the components contributing to latency (e.g., network,computation)?</p>
                  </div>
                  <div className="prompt-card">
                    <p>What is the maximum throughput the application can handle under optimal conditions?</p>
                  </div>
                </div>
                <div className="all-prompt">
                  <div className="prompt-card">
                    <p>How efficiently does the application utilize resources (CPU, memory, disk I/O)?</p>
                  </div>
                  <div className="prompt-card">
                    <p>What external services or dependencies does the application rely on?</p>
                  </div>
                  <div className="prompt-card">
                    <p>Are there specific user actions or workflows that lead to performance issues or errors?</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'Application Insights' && (
              <div className="all-prompt-wrapper">
                <div className="all-prompt">
                  <div className="prompt-card">
                    <p>Are there specific user segments or demographics that interact with the application differently?</p>
                  </div>
                  <div className="prompt-card">
                    <p>Which features or functionalities of the application are most frequently used?</p>
                  </div>
                  <div className="prompt-card">
                    <p>How effectively do users progress through conversion funnels (e.g., sign-up, purchase)?</p>
                  </div>
                </div>
                <div className="all-prompt">
                  <div className="prompt-card">
                    <p>How long do users typically stay engaged within a session?</p>
                  </div>
                  <div className="prompt-card">
                    <p>How are database queries performing? Are there slow queries that impact overall application responsiveness?</p>
                  </div>
                  <div className="prompt-card">
                    <p>Are there regional differences in how users interact with the application?</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'Application Performance' && (
              <div className="all-prompt-wrapper">
                <div className="all-prompt">
                  <div className="prompt-card">
                    <p>How are database queries performing? Are there slow queries that impact overall application responsiveness?</p>
                  </div>
                  <div className="prompt-card">
                    <p>How do the application dependencies impact overall application performance?</p>
                  </div>
                  <div className="prompt-card">
                    <p>What is the rate of errors or failures encountered by the application?</p>
                  </div>
                </div>
                <div className="all-prompt">
                  <div className="prompt-card">
                    <p>What is the connection pool utilization rate, and are there connection limits causing contention?</p>
                  </div>
                  <div className="prompt-card">
                    <p>How does the application scale horizontally under increasing user loads?</p>
                  </div>
                  <div className="prompt-card">
                    <p>Are there transaction traces or logs that reveal performance bottlenecks in specific workflows?</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'Alerts' && (
              <div className="all-prompt-wrapper">
                <div className="all-prompt">
                  <div className="prompt-card">
                    <p>Have critical thresholds for performance metrics (e.g., response time, error rate) been defined?</p>
                  </div>
                  <div className="prompt-card">
                    <p>Do alerts trigger when unexpected deviations occur in application behavior or performance?</p>
                  </div>
                  <div className="prompt-card">
                    <p>Are alerts configured to monitor dependencies and third-party integrations?</p>
                  </div>
                </div>
                <div className="all-prompt">
                  <div className="prompt-card">
                    <p>Are alerts configured to provide actionable information for incident triage and resolution?</p>
                  </div>
                  <div className="prompt-card">
                    <p>Do alerts trigger when resource usage approaches or exceeds predefined limits?</p>
                  </div>
                  <div className="prompt-card">
                    <p>Have alerts been set up to monitor security-related events (e.g., unauthorized access attempts, anomalies in user behavior)?</p>
                  </div>
                </div>
              </div>
            )}
          <div className="more-prompt-wrapper">
            <p>See More Question</p>
            <img src={drop4} alt="" />
          </div>
        </div>
      </div>
      <Chat />
    </div>
    </div >
  );
}
export default Prompts;
