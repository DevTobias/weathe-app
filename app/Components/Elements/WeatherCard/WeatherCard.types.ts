export type WeatherCardProps = {
  location: string;
  icon: string;
  date: string;
  temperature: string;
  description: string;
  probabilityRain: number;
  className?: string;
};
