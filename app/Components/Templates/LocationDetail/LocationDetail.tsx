import { FunctionComponent } from 'react';
import { LocationDetailProps } from './LocationDetail.types';
import Container from '@Layouts/Container';
import Navbar from '@Modules/Navbar';
/**
 * Simple Navbar component to render a page title.
 */
const LocationDetail: FunctionComponent<LocationDetailProps> = ({ locationName }) => {
  return (
    <>
      <Navbar />
      <Container className="justify-start">
        <div className="space-y-7">
          <h1 className="text-neutral-200 text-3xl">Dashboard / Detailansicht</h1>
          <p>{locationName}</p>
        </div>
      </Container>
    </>
  );
};

export default LocationDetail;
