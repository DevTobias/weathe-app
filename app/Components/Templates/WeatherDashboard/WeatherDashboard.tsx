import { FunctionComponent } from 'react';
import Container from '@Layouts/Container';
import Navbar from '@Modules/Navbar';

const WeatherDashboard: FunctionComponent = () => {
  return (
    <>
      <Navbar />
      <Container>
        <h1 className="prose text-3xl text-center ">Weather Dashboard</h1>
      </Container>
    </>
  );
};

export default WeatherDashboard;
