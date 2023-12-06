import { useState, useEffect } from "react";
import axios from "axios";

type AnalyticsEvent = {
  link_id: string;
  event: string;
  ip_address: string;
  user_agent: string;
  metadata: any;
};

type AnalyticsData = {
  events: AnalyticsEvent[];
};

const useAnalytics = () => {
  const [ipAddress, setIPAddress] = useState('');
  const [userAgent, setUserAgent] = useState('');
  const uri = process.env.NEXT_PUBLIC_API_URL;
  const header = {
    "Content-Type": "application/json",
  };
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    events: [],
  });

  // Fetch analytics data from the API
  const fetchAnalyticsData = async (profileId: string) => {
    try {
      const response = await axios.get(`${uri}analytics`);
      setAnalyticsData(response.data);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  useEffect(() => {
    setUserAgent(window.navigator.userAgent);
    
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setIPAddress(data.ip)
      })
      .catch(error => console.log(error))
  }, [])

  const registerEvent = async (
    linkId: string,
    eventName: string,
    metadata?: any
  ) => {
    const newEvent: AnalyticsEvent = {
      link_id: linkId,
      event: eventName,
      ip_address: ipAddress,
      user_agent: userAgent,
      metadata,
    };

    try {
      await axios.post(`${uri}analytics`, newEvent, { headers: header });
      setAnalyticsData((prevData) => ({
        events: [...prevData.events, newEvent],
      }));
    } catch (error) {
      console.error("Error registering analytics event:", error);
    }
  };

  return {
    analyticsData,
    registerEvent,
    fetchAnalyticsData
  };
};

export default useAnalytics;
