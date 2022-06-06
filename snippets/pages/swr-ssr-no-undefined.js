import useSWR, { SWRConfig } from "swr";

// An SWR fetcher is any function that takes a URL or key and returns a Promise that resolves to the data.
const basicFetcher = (url) => fetch(url).then((r) => r.json());
const keyToFetch = "http://api.open-notify.org/iss-now.json";

// on every new request to the page, we will provide fresh fallback data to SWR.
export const getServerSideProps = async () => {
  const data = await basicFetcher(keyToFetch);
  return {
    props: {
      fallback: {
        [keyToFetch]: data,
      },
    },
  };
};

// The page receives the fallback data and gives it to SWR
const WhereISS = ({ fallback }) => {
  // Using SWRConfig, we can configure the behavior. In this case we'll give it fallback data.
  return (
    <SWRConfig value={{ fallback }}>
      <ISSPosition />
    </SWRConfig>
  );
};

// The inner component will use SWR to fetch the data and display it.
const ISSPosition = () => {
  // since SWR fetches the same key (keyToFetch), it will use the fallback data on first render.
  // it will then proceed to refresh that data every second.
  const { data } = useSWR(keyToFetch, basicFetcher, { refreshInterval: 1000 });
  return (
    <>
      at {new Date(data.timestamp).toLocaleTimeString()}, the ISS is at{" "}
      {data.iss_position.latitude} latitude and {data.iss_position.longitude}{" "}
      longitude.
    </>
  );
};

export default WhereISS;
