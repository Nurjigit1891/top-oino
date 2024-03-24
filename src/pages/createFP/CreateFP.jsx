import React, { useEffect, useState } from 'react';
import './CreateFP.scss';
import Navbar from '../../components/navbar/Navbar';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import addFreePlayer from '../../server/actions/createFP/CreateFP';
import { useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateFP = () => {
  const [formData, setFormData] = useState({
    fpName: '',
    fpAge: '',
    fpNumberPhone: '',
    fpCount_players: '',
    fpPersonalCode: '',
    fpComment: '',
    fpDate: new Date().toISOString().substr(0, 10), // YYYY-MM-DD формат
  });


  const navigate = useNavigate() ;


  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        await addFreePlayer(formData);
        // Логика для отправки данных
        setNotification({ open: true, message: 'Данные успешно отправлены!', severity: 'success' });
        
        // Очистка формы
        setFormData((prevFormData) => ({
          ...prevFormData,
      }));

      setTimeout(() => {

        navigate('/freePlayers');
      },1500)

    } catch (error) {
      setNotification({ open: true, message: 'Ошибка при отправке данных!', severity: 'error' });
      console.error('Error:', error);

    } finally {
      setLoading(false);
    }
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  return (
    <div>
      <Navbar />
      <div className="createFP">
        <div className="container">
          <div className="create-form">
            <form onSubmit={handleSubmit}>
              <div className="line-group">
                <div className="form-group">
                  <label htmlFor="fpName">Ваша имя: </label>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    id="fpName"
                    name="fpName"
                    value={formData.fpName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="fpAge">Ваш возраст</label>
                  <input
                    type="number"
                    placeholder="18 лет"
                    id="fpAge"
                    name="fpAge"
                    onChange={handleChange}
                    value={formData.fpAge}
                    required
                  />
                </div>
              </div>

              <div className="line-group">
                <div className="form-group">
                  <label htmlFor="fpNumberPhone">Номер телфона: </label>
                  <input
                    type="text"
                    placeholder="Номер телефона"
                    id="fpNumberPhone"
                    name="fpNumberPhone"
                    value={formData.fpNumberPhone}
                    onChange={handleChange}
                    required
                  />
                </div>


                <div className="form-group">
                <label htmlFor="">Сколько игроков?</label>
                  <input
                    type="number"
                    placeholder="включая вас (1-если вы один) "
                    id="fpCount_players"
                    name="fpCount_players"
                    value={formData.fpCount_players}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="line-group">
                <div className="form-group">
                  <label htmlFor="fpPersonalCode">Персональный код: </label>
                  <input
                    type="text"
                    placeholder="Код для удаления (не забывайте)"
                    id="fpPersonalCode"
                    name="fpPersonalCode"
                    value={formData.fpPersonalCode}
                    onChange={handleChange}
                    maxLength={4}
                    minLength={4}
                    pattern="[0-9]{1,4}"  // Паттерн для ограничения только цифрами и максимальной длиной 4
                    title="Пожалуйста, введите только цифры и не более 4 символов."
                    required
                  />
                </div>

                <div className="form-group">
                    <label htmlFor="comment">Комментарий:</label>
                    <textarea
                        id="fpComment"
                        name="fpComment"
                        rows="4"
                        value={formData.fpComment}
                        onChange={handleChange}
                        placeholder='Напишите краткий коментраий для подбора'
                    ></textarea>
                </div>
              </div>


              <div className="submit-button-div">
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <button className="submit-button" type="submit">
                    Создать
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateFP;
