import { useQuery } from "@apollo/client";

import { useEffect } from "react";

import { LocationData } from "@/types/locationData.types";
import { gql } from "@apollo/client";
import { useState } from "react";

const TRACK_VISITOR = gql`
  query TrackVisitor($locationData: LocationDataInput!) {
    trackVisitor(locationData: $locationData)
  }
`;

const LOCATION_CACHE_KEY = "visitorLocation";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const useTrackVisitor = () => {
  const [locationData, setLocationData] = useState<LocationData>();

  useEffect(() => {
    const getClientLocation = async () => {
      try {
        // Check for cached location data
        const cachedData = localStorage.getItem(LOCATION_CACHE_KEY);
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);

          // Check if cache is still valid
          if (Date.now() - timestamp < CACHE_DURATION) {
            setLocationData(data);
            return;
          }
        }

        // Fetch new location data if no cache or cache expired
        const res = await fetch("https://ipinfo.io/json");
        const data = await res.json();
        const locationData = {
          ip: data.ip,
          city: data.city,
          region: data.region,
          country: data.country,
        };

        // Cache the new data
        localStorage.setItem(
          LOCATION_CACHE_KEY,
          JSON.stringify({
            data: locationData,
            timestamp: Date.now(),
          })
        );

        setLocationData(locationData);
      } catch (error) {
        console.error("Failed to get client location", error);
      }
    };

    getClientLocation();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useQuery(TRACK_VISITOR, {
    variables: { locationData },
    skip: !locationData,
  });
};
