
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { format, set } from 'date-fns';
import { ru } from 'date-fns/locale';
import './Home.scss';
import MatchTable from '../../components/matchTable/MatchTable';
import getDataFromFireBase from '../../server/actions/getData/getData';

const Home = () => {
  const [matchData, setMatchData] = useState([]);

  useEffect (() => {
    const fetchData = async () => {
      try {
        const data = await getDataFromFireBase(); 
        if (data) {
          // если данные успешнно приходят то вывожу в экран сообщение
          console.log("Данные пришли успешно!" )
          console.log(data);

          // Фильтрация данных для сегодня и завтра
          const filteredData = data.filter(match => {
            const matchDate = new Date(match.date);
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1); 
            return matchDate.getDate() === today.getDate() || matchDate.getDate() === tomorrow.getDate();
          });
          
          setMatchData(filteredData);
          console.log("data get success filtred ");
        }
      } catch (error) {
        console.log("Ошибка при получении данных из FireBase!");
      }
    } 
    fetchData();
  },[])

  const currentDate = format(new Date(), 'dd-MMMM', { locale: ru });

  return (
    <div>
      <div className="home">
        <div className="home-navbar">
          <Navbar />
        </div>
        <div className="container">
          <h3 className='today-match'>Матчи для сегодня <br /> ({currentDate}) </h3>
          <div className="table-content">
            <MatchTable matchData={matchData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
