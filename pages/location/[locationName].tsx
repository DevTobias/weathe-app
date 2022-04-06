import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Title from '@Helpers/Title';
import LocationDetail from '@Templates/LocationDetail';

const Location: NextPage = () => {
  const router = useRouter();
  const { locationName } = router.query;

  return (
    <>
      <Title title="Wetter Dashboard" />
      <LocationDetail locationName={locationName as string} />
    </>
  );
};

export default Location;
