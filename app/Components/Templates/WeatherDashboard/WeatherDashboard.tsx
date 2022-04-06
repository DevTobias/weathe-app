import { FunctionComponent } from 'react';
import AddLocationCard from '@Elements/AddLocationCard';
import WeatherCard from '@Elements/WeatherCard';
import Container from '@Layouts/Container';
import Navbar from '@Modules/Navbar';
/**
 * Simple Navbar component to render a page title.
 */
const WeatherDashboard: FunctionComponent = () => {
  return (
    <>
      <Navbar />
      <Container>
        <h1 className="prose text-3xl text-center ">Weather Dashboard</h1>
        <WeatherCard
          location="Darmstadt"
          icon="cloudy"
          date="Montag, 01.10.18"
          temperature="4°C / 14°C"
          description="Bewölkt"
          probabilityRain={20}
        />
        <AddLocationCard />
      </Container>
    </>
  );
};

export default WeatherDashboard;
