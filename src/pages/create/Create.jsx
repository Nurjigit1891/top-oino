// Create.jsx
import React, { useState } from 'react';
import './Create.scss';
import Navbar from '../../components/navbar/Navbar';
import addMatch from '../../server/actions/createData/CreateData';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Create = () => {

  const randomNumber = Math.floor(Math.random() * 9000) + 1000;
  
  const [formData, setFormData] = useState({
    matchID : randomNumber ,
    phoneNumber: '',
    date: '',
    price: '',
    authorName: '',
    address: '',
    comment: '',
    time: '',
    sportType: '',
    personalCode: '',
    count_players: '', 
  });

  const [loading, setLoading] = useState(false);  
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      await addMatch(formData);
      setNotification({ open: true, message: 'Матч успешно создан!', severity: 'success' });
      setFormData({  // Сбрасываем значения полей формы до начальных
        matchID: Math.floor(Math.random() * 9000) + 1000,
        phoneNumber: '',
        date: '',
        price: '',
        authorName: '',
        address: '',
        comment: '',
        time: '',
        sportType: '',
        personalCode: '',
        count_players: '',
      });
    } catch (error) {
      setNotification({ open: true, message: 'Ошибка при создании матча!', severity: 'error' });
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  




  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="create">
        <Navbar />
        <div className="container">
          <div className="create-content">

            <div className="create-title">
              <h2>Создать подбор</h2>
            </div>

            <div className="create-form">
              <form onSubmit={handleSubmit}>

                <div className="line-group">

                    <div className="form-group">
                    <label htmlFor="phoneNumber">Номер телефона:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        placeholder='+996 (701) 12 34 56'
                        onChange={handleChange}
                        required
                    />
                    </div>

                    <div className="form-group">
                      <label htmlFor="date">Дата:</label>
                      <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                      />
                    </div>
                </div>

                <div className="line-group">
                    <div className="form-group">
                      <label htmlFor="price">Цена:</label>
                      <input
                          type="number"
                          id="price"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          placeholder='В сомах'
                          required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="authorName">Имя автора:</label>
                      <input
                          type="text"
                          id="authorName"
                          name="authorName"
                          value={formData.authorName}
                          onChange={handleChange}
                          placeholder='Азамат'
                          required
                      />
                    </div>

                </div>

                <div className="line-group">
                    <div className="form-group">
                    <label htmlFor="address">Адрес:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder='Душанбинка 28'
                        required
                    />
                    </div>


                    <div className="form-group">
                      <label htmlFor="time">Время:</label>
                      <input
                          type="time"
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          required
                      />
                    </div>
                </div>

                <div className="line-group">
                  <div className="form-group">
                    <label htmlFor="personalCode">Персональный код</label>
                    <input 
                      type="text"
                      id="personalCode"
                      name="personalCode"
                      placeholder="Код для удаления (не забывайте)"
                      maxLength={4}
                      minLength={4}
                      pattern="[0-9]{1,4}"  // Паттерн для ограничения только цифрами и максимальной длиной 4
                      title="Пожалуйста, введите только цифры и не более 4 символов."
                      required
                      onChange={handleChange}
                      value={formData.personalCode}
                    />

                  </div>


                    <div className="form-group">
                      <label htmlFor="sportType">Тип мероприятия:</label>
                      <select
                        id="sportType"
                        name="sportType"
                        value={formData.sportType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Выберите тип</option>
                        <option value="football">Футбол ⚽️</option>
                        <option value="basketball">Баскетбол 🏀</option>
                        <option value="volleyball">Волейбол 🏐</option>
                      </select>
                    </div>

                </div>

                <div className="line-group">

                <div className="form-group">
                    <label htmlFor="comment">Комментарий:</label>
                    <textarea
                        id="comment"
                        name="comment"
                        rows="4"
                        value={formData.comment}
                        onChange={handleChange}
                        placeholder='Напишите краткий коментраий для подбора'
                    ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="count_players">Кол-во нужных игроков:</label>
                  <input 
                    type='number'
                    typeof='number'
                    id="count_players"
                    name="count_players"
                    value={formData.count_players}
                    onChange={handleChange}
                    required
                  />
                </div>
               

                </div>

                <div className="submit-button-div">
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <button className='submit-button' type="submit">Создать</button>
                  )}
                </div>

                <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
                <Alert onClose={handleCloseNotification} severity={notification.severity}>
                  {notification.message}
                </Alert>
              </Snackbar>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
