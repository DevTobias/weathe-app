import { gql } from '@apollo/client';

export const LOCATION_DETAIL_QUERY = gql`
  query Location($locationName: String!) {
    location(locationName: $locationName) {
      icon
      date
      description
      probabilityRain
      windSpeed
      currentTemperature
    }
  }
`;
