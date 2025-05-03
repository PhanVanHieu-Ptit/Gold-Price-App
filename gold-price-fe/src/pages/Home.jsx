import { useEffect, useState } from "react";
import GoldPriceCard from "../components/GoldPriceCard";

const Home = () => {
  const [data, setData] = useState([]);

  const fetchGoldPrices = async () => {
    const response = await fetch("http://localhost:3001/api/gold"); 
    const result = await response.json();
    setData(result.prices);
  };

  useEffect(() => {
    fetchGoldPrices();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((item, index) => (
          <GoldPriceCard
            key={index}
            title={item.name}
            buy={item.buy}
            sell={item.sell}
            updatedAt={item.updatedAt}
          />
        ))}
      </div>
  );
};

export default Home;
