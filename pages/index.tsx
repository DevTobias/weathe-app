import type { NextPage } from 'next';
import Title from '@Helpers/Title';
import WeatherDashboard from '@Templates/WeatherDashboard';

const Index: NextPage = () => {
  return (
    <>
      <Title title="Wetter Dashboard" />
      <WeatherDashboard />
    </>
  );
};

export default Index;
