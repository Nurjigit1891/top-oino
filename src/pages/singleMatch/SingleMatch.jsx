import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import './SingleMatch.scss';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop'; // Иконка "верх"
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import DateRangeIcon from '@mui/icons-material/DateRange';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Person2Icon from '@mui/icons-material/Person2';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import getDataFromFireBase from '../../server/actions/getData/getData';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import CommentIcon from '@mui/icons-material/Comment';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDocument } from '../../server/actions/deleteFPorMatch/deleteFPorMatch';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const SingleMatch = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [singleMatchData, setSingleMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionForDelBlock, setActionForDelBlock] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [loadForDelButton, setLoadForDelButton] = useState(false)
  const [urlImage, setUrlImage] = useState({url1: '' , url2: ''})

  //getting data from server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataFromFireBase();
        if (data) {
          const singleDataMatch = data.find((el) => el.id === id);
          setSingleMatchData(singleDataMatch);
          setLoading(false);
        } else {
          console.log("Ошибка при получении данных");
        }
      } catch (error) {
        console.log("Ошибка: " + error);
      }
    }
    fetchData();
  }, []);

  //getting random url from players images
  useEffect(() => {
    function gettingRandomUrl() {
      let firstIndex, secondIndex;

      do {
        firstIndex = Math.floor(Math.random() * players.length);
        secondIndex = Math.floor(Math.random() * players.length);
      } while (firstIndex === secondIndex);

      setUrlImage({ url1: players[firstIndex].url, url2: players[secondIndex].url });
    }

    gettingRandomUrl();
  }, []);

  function goHome() {
    navigate('/');
  }

  //closing div delete
  function controlDeleteInfoBlock(action) {
    setActionForDelBlock(action);
  }

  const players = [
    { url: "https://i.pinimg.com/564x/a6/4e/58/a64e58ba762b68125d5c7bb392f956b7.jpg" },
    { url: "https://i.pinimg.com/564x/45/1f/54/451f546d37b435056d3c76f51697e4ea.jpg" },
    { url: "https://i.pinimg.com/564x/58/53/c8/5853c8a731df081806faff422198c56c.jpg" },
    { url: "https://i.pinimg.com/564x/18/20/d6/1820d67cd5b2572c8e80190a92ae9de8.jpg" },
    { url: "https://i.pinimg.com/236x/eb/72/a8/eb72a81cfd01f0d900c47f4a78e547c7.jpg" },
    { url: "https://i.pinimg.com/236x/c5/49/60/c54960c5c145c66e60c93817018b57d0.jpg" },
    { url: "https://i.pinimg.com/564x/a3/63/58/a3635889832a9ee1c54d7322787b7d83.jpg" },
    { url: "https://i.pinimg.com/564x/81/e8/10/81e810592452b1d581c9980864234c26.jpg" },
    { url: "https://i.pinimg.com/564x/82/e4/14/82e414d55ce90472a0c5ee7a3995b54e.jpg" },
    { url: "https://i.pinimg.com/564x/c1/93/79/c193794b8a319936d49ecccea7a4d7db.jpg" },
  ];



  //getting personalCode from input
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  //deleting document by id and type 
  async function handleDeleteMatch() {
    if (inputValue === singleMatchData.personalCode) {
      try {
        setLoadForDelButton(true)
        await deleteDocument(singleMatchData.id, "matches");
        setLoadForDelButton(false)
        console.log("Документ успешно удален!");
        goHome(); // Переносим переход на другую страницу внутрь блока try
      } catch (error) {
        console.log("Ошибка при удалении документа: ", error);
        setLoadForDelButton(false)
      } 
    } else {
      console.log("Неверный персональный код");
    }
  }
  

  return (
    <div>
      <div className="singleNavbar">
        <Navbar />
      </div>
      <div className="container">
        <div className="singleContent">
          <div className="verticalIconDiv">
            <VerticalAlignTopIcon className='verticalIcon' onClick={goHome} />
          </div>
          {loading ? (
            <div className="loading-spinner" style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress style={{textAlign: "center"}} />
            </div>
          ) : (
            <div className="singleData">
              <div className="singleMainDiv">
                <div className="single-group">
                  <p>{`ID Матча: `}</p><span>{singleMatchData.matchID}</span>
                </div>

                <div className="single-group">
                  <AccessTimeFilledIcon style={{fontSize: '18px'}} />
                  <p>{`Время: `}</p><span>{singleMatchData.time}</span>
                </div>

                <div className="single-group">
                  <DateRangeIcon style={{fontSize: '18px'}} />
                  <p>{`Дата: `}</p><span>{new Date(singleMatchData.date).toLocaleDateString()}</span>
                </div>

                <div className="single-group">
                  <MonetizationOnIcon style={{fontSize: '18px'}} />
                  <p>{`Цена: `}</p><span>{singleMatchData.price} сом</span>
                </div>

                <div className="single-group">
                  <Person2Icon style={{fontSize: '18px'}} />
                  <p>{`Добавил: `}</p><span>{singleMatchData.authorName}</span>
                </div>

                <div className="single-group">
                  <LocationOnIcon style={{fontSize: '18px'}} />
                  <p>{`Адрес: `}</p><span>{singleMatchData.address}</span>
                </div>

                <div className="single-group">
                  <CallIcon style={{ fontSize: '18px' }} />
                  <p>
                    Номер телефона:{" "} 
                    <a
                      style={{ textDecoration: 'none', color: 'black' }}
                      href={`tel:${singleMatchData.phoneNumber}`}
                    >
                      <span style={{textDecoration: 'underline'}}>{singleMatchData.phoneNumber}</span> 
                    </a>
                  </p>
                </div>

                <div className="single-group">
                  <SportsSoccerIcon style={{fontSize: '18px'}} />
                  <p>{`В матч нужен:   `}</p><span>{singleMatchData.count_players}{singleMatchData.count_players == 1 ? ' игрок' : ' игрока'}</span>
                </div>

                <div className="single-group" style={{maxWidth: "500px"}}>
                  <CommentIcon style={{fontSize: '18px'}} />
                  <p>{`Комментарий:  `}</p><span>{singleMatchData.comment}</span>
                </div>

                <div className="single-group delete-block" onClick={() => controlDeleteInfoBlock(true)}>
                  <DeleteIcon style={{ fontSize: '18px' }} />
                  <p>Удалить</p>
                </div>
              </div>
              <div className="advertisement">
              <img src={urlImage.url1} alt="Картинка футболиста" />
              <img src={urlImage.url2} alt="Картинка футболиста" />
            </div>
              <div className={actionForDelBlock ? "delete-info-block" : "delete-info-block-none"}>
                <p>Чтобы удалить введите персональный код</p>
                <input
                  type="text"
                  placeholder='Персональный код'
                  maxLength={4}
                  pattern="[0-9]{1,4}"
                  title="Пожалуйста, введите только цифры и не более 4 символов."
                  required
                  value={inputValue}
                  onChange={handleChange}
                />
                <button style={{display: loadForDelButton ? "none" : "block"}} className='del-btn' onClick={handleDeleteMatch}>Удалить</button>
                <button  className='close-btn' onClick={() => controlDeleteInfoBlock(false)}>Закрыть</button>
                <CircularProgress style={{display: loadForDelButton ? "block" : "none"}} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleMatch;



