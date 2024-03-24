import React, { useEffect, useState } from 'react'
import './SingleFP.scss'
import { useNavigate, useParams } from 'react-router-dom'
import getFreePlayersFromFB from '../../server/actions/getFP/GetFp';
import Navbar from '../../components/navbar/Navbar';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop'; // Иконка "верх"
import CircularProgress from '@mui/material/CircularProgress';
import Person2Icon from '@mui/icons-material/Person2';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CallIcon from '@mui/icons-material/Call';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDocument } from '../../server/actions/deleteFPorMatch/deleteFPorMatch';



const SingleFP = () => {
    const {id} = useParams() ;
    const navigate = useNavigate() ;

    const [loading, setLoading] = useState(true);

    const [singleFPData, setSingleFPData] = useState(null) ;
    const [urlImage, setUrlImage] = useState({url1: '' , url2: ''})
    const [inputValue, setInputValue] = useState('');
    const [actionForDelBlock, setActionForDelBlock] = useState(false);
    const [loadForDelButton, setLoadForDelButton] = useState(false)


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
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFreePlayersFromFB(); // getting full data from  FreePlayers
                if (data) {
                    const filteredData = data.filter(fp => {
                        const matchDate = new Date(fp.fpDate)
                        const today =  new Date() ;
                        const tomorrow = new Date(today);
                        tomorrow.setDate(tomorrow.getDate() + 1) ;

                        return matchDate.getDate() === today.getDate() || matchDate.getDate() === tomorrow.getDate() ;
                    })
                    console.log("The date was filtered successfully SingleFPplayer");

                    const idFP = filteredData.find((el) => el.id == id); // find element with ID 
                    setSingleFPData(idFP);
                    setLoading(false) ;
                    console.log(filteredData);
                }
            } catch (error) {
                console.log("error getting data: " + error);
            }
        }
        fetchData();
    }, []);

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



    function fpList() {
        navigate('/freePlayers');
      }

        //getting personalCode from input
    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    async function handleDeleteMatch() {
        if (inputValue === singleFPData.fpPersonalCode) {
          try {
            setLoadForDelButton(true)
            await deleteDocument(singleFPData.id, "free_players");
            setLoadForDelButton(false)  
            console.log("Документ успешно удален!");
            fpList(); // Переносим переход на другую страницу внутрь блока try
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
                <VerticalAlignTopIcon className='verticalIcon' onClick={fpList} />
              </div>
              {loading ? (
                <div className="loading-spinner" style={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress />
                </div>
              ) : (
                <div className="singleData">
                  <div className="singleMainDiv">
                    <div className="single-group">
                      <Person2Icon style={{fontSize: '18px'}} />
                      <p>{`Имя игрока: `}</p><span>{singleFPData.fpName}</span>
                    </div>
                    <div className="single-group">
                      <SportsSoccerIcon style={{fontSize: '18px'}} />
                      <p>{`Возраст: `}</p><span>{singleFPData.fpAge}</span> <span>{singleFPData.fpAge > 4 ? "лет" : "года"}</span>
                    </div>
    
                    <div className="single-group">
                      <DoneAllIcon style={{fontSize: '18px'}} />
                      <p>{`Добавлен в: `}</p><span>{new Date(singleFPData.fpDate).toLocaleDateString()}</span>
                    </div>
    
                    <div className="single-group">
                      <SupervisorAccountIcon style={{fontSize: '18px'}} />
                      <p>{`Количество игрков: `}</p><span>{singleFPData.fpCount_players} </span>
                    </div>
    
    
                    <div className="single-group">
                      <CallIcon style={{fontSize: '18px'}} />
                      <p>{`Контактные данные: `}</p><span>{singleFPData.fpNumberPhone}</span>
                    </div>
  
                    <div className="single-group" style={{maxWidth: "500px"}}>
                      <CommentIcon style={{fontSize: '18px'}} />
                      <p>{`Комментарий:  `}</p><span>{singleFPData.fpComment}</span>
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
                    <button className='del-btn' onClick={handleDeleteMatch}>Удалить</button>
                    <button style={{display: loadForDelButton ? "none" : "block"}} className='close-btn' onClick={() => controlDeleteInfoBlock(false)}>Закрыть</button>
                    <CircularProgress style={{display: loadForDelButton ? "block" : "none"}} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
}

export default SingleFP