import React, { useEffect, useState } from 'react'
import './FreePlayers.scss'
import Navbar from '../../components/navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import getFreePlayersFromFB from '../../server/actions/getFP/GetFp'
import FPtable from '../../components/fpTable/FPtable'

const FreePlayers = () => {
  const [fpData, setFPdata] = useState(); 

  const navigate = useNavigate() ; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFreePlayersFromFB(); // full data from FireBase

        if (data) {          
          //we return those elements whose date coincides with today's and tomorrow's
          const filteredData = data.filter(match => {
            const matchDate = new Date(match.fpDate)
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);


            return matchDate.getDate() === today.getDate() || matchDate.getDate() === tomorrow.getDate();
          })
          console.log("The date was filtered successfully!");

          setFPdata(filteredData);
          console.log(filteredData)
        }
      } catch (error) {
          console.log("error getting data: " + error);
      }
    }

    fetchData ()
  },[])



  return (
    <div>
        <Navbar />
        <div className="container">
          <div className="firstBlockFP">
            <p>Если вы свободный игрок, то создайте себе подбор</p>

            <button  
            onClick={() => {navigate('/createFP')}}
            className="button-29" 
            role="button"
            >Создать подбор</button>
          </div>

          <div className="freePlayerInfoBlock">
            <p>Здесь вы найдете список игроков, готовых присоединиться к вашему матчу</p>
          </div>

          <FPtable fpData={fpData}></FPtable>


        </div>
    </div>
  )
}

export default FreePlayers