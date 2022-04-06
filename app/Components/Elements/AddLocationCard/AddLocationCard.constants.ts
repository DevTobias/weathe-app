import { gql } from '@apollo/client';

export const ADD_LOCATION_MUTATION = gql`
  mutation Mutation($locationName: String!) {
    locationAdd(locationName: $locationName) {
      errors {
        message
      }
      location {
        locationName
        details {
          icon
          date
          temperature
          description
          probabilityRain
        }
      }
    }
  }
`;
