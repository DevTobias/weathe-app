import { FunctionComponent } from 'react';
import { WeatherProvider } from '@Context/WeatherContext';
import Container from '@Layouts/Container';
import Navbar from '@Modules/Navbar';
import WeatherCards from '@Modules/WeatherCards';
/**
 * Simple Navbar component to render a page title.
 */
const WeatherDashboard: FunctionComponent = () => {
  return (
    <>
      <Navbar />
      <WeatherProvider>
        <Container className="justify-start">
          <div className="space-y-7">
            <h1 className="text-neutral-200 text-3xl">Dashboard</h1>
            <WeatherCards className="" />
          </div>
        </Container>
      </WeatherProvider>
    </>
  );
};

export default WeatherDashboard;
