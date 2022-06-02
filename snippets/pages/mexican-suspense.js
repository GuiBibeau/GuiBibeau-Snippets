import { Suspense, useState } from "react";
import useSWR from "swr";

// we'll simulate 2 different loading times to get data from the server, 1s, and 3s.
// this is to demonstrate the use of Suspense
const tacosRecipe = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve("🌮"), 1000);
  });

const tamalesRecipe = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve("🫔"), 3000);
  });

// we'll tell SWR to suspend components that have not yet loaded
const swrConfig = { suspense: true };

// When inside a Suspence component, you don't need to handle undefined data.
// Suspence will render the fallback component if data is undefined.
const Tacos = () => {
  const { data: tacos } = useSWR("/tacos", tacosRecipe, swrConfig);
  return <p>TACOS! {tacos}</p>;
};

// This component will take longer to load than the other one. However, Suspence will suspend both components until the data is ready.
const Tamales = () => {
  const { data: tamales } = useSWR("/tamales", tamalesRecipe, swrConfig);
  return <p>TAMALES! {tamales}</p>;
};

const MexicanSuspense = () => {
  const [showFood, setShowFood] = useState(false);

  const handleShowFood = () => {
    setShowFood(true);
  };

  return (
    <>
      <h1>Suspend with SWR</h1>
      {showFood && (
        <Suspense fallback={<p>Cooking... 🇲🇽🍳</p>}>
          <Tamales />
          <Tacos />
        </Suspense>
      )}

      <button onClick={handleShowFood}>
        The suspense is killing me! Show me mexican food!
      </button>
    </>
  );
};

export default MexicanSuspense;
