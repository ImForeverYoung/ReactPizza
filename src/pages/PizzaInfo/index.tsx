import React, { useEffect } from 'react';
import styles from './PizzaInfo.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ContentLoader from 'react-content-loader';
const PizzaInfo: React.FC = () => {
  const { id } = useParams();

  const [pizzaData, setPizzaData] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://642d8197bf8cbecdb4082db3.mockapi.io/pizzas/' + id,
        );
        setPizzaData(data);

        //console.log(pizzaData);
      } catch (e) {
        alert('Ошибка при получении информации о пицце!');
        navigate('/');
        console.log(e);
      }
    }
    fetchPizza();
  }, []);
  if (!pizzaData) {
    return (
      <div className={styles.pizzaInfo_content}>
        <ContentLoader
          speed={2}
          width={580}
          height={700}
          viewBox="0 0 700 700"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <circle cx="340" cy="380" r="320"  />
          <rect x="85" y="0" rx="25" ry="25" width="500" height="40" />
        </ContentLoader>
      </div>
    );
  }
  return (
    <div className={styles.pizzaInfo_content}>
      <h1>{pizzaData.title}</h1>
      <img src={pizzaData.imageUrl} />
    </div>
    
  );
};

export default PizzaInfo;
