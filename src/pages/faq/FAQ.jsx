import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import './FAQ.scss';

const FAQ = () => {
  return (
    <div>
        <Navbar />

        <div className="faq">
            <div className="container">

                <div className="info">
                    <div className="infoBlocks info-1">
                        <h3>Создание и "Персональный код"</h3>
                        <p>
                            Создать подбор матча очень просто! Сначала перейдите в раздел <span style={{fontWeight: "600"}}>"Создать матч"</span>, 
                            где вам нужно будет заполнить анкету. В этой анкете вы укажете детали вашего матча, такие как время, дата и место проведения.
                        </p>
                        <p>
                            В поле <span style={{fontWeight: "600"}}>"Персональный код"</span> введите четырехзначный код. Этот код понадобится вам, 
                            если вам потребуется удалить подбор матча. Обязательно запомните или записывайте этот код!
                        </p>
                        <p>
                            Если вам нужно будет удалить подбор матча, вы сможете использовать <span style={{fontWeight: "600"}}>персональный код</span>, 
                            который вы ввели при создании подбора. Это обеспечит безопасность вашего матча и предотвратит случайное удаление.
                        </p>
                    </div>
                    <div className="infoBlocks info-2">
                        <h3>Свободные игроки</h3>
                        <p>
                            В разделе <span style={{fontWeight: "600"}}>"Свободные игроки"</span> вы можете 
                            найти тех игроков, которые готовы присоединиться к вашему матчу 
                        </p>
                        <p>
                            Если вы хотите играть, но у вас нет доступных игроков, создайте себе подбор и 
                            команды, которые нуждаются в игроках, возможно, откликнутся на ваш подбор
                        </p>
                        <p>
                            Если вам нужно будет удалить подбор матча, вы сможете использовать <span style={{fontWeight: "600"}}>персональный код</span>, 
                            который вы ввели при создании подбора. Это обеспечит безопасность вашего матча и предотвратит случайное удаление.
                        </p>
                    </div>
                    <div className="infoBlocks info-3">
                        <h3>Доступность матча</h3>
                        <p>
                            В таблицу доступных матчей будет видно те матчы которые будут сегодня или завтра. А вчерашние матчи очищяються автоматически
                            после после 00:00
                        </p>
                        <p>
                        В поле <span style={{fontWeight: "600"}}>"Тип мероприятия:"</span> выберите "Футбол", проект предназначен совмещать и другие виды 
                        спорта. Но в данный момент толлько Футбол
                        </p>
    
                    </div>

                    <div className="infoBlocks info-4">
                        <h3>Вопросы и админстрация</h3>

                        <p>+996 707 78 00 48 - Администратор</p>

                    </div>
                </div>

                {/* <p style={{marginTop: "40px", fontWeight: "600", fontSize: "21px"}}>Часто задаваемые вопросы:</p>
                <div className="accordion-content">
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            className="accordion-header"
                        >
                            {/* Здесь можно добавить заголовок для аккордеона */}
                        {/* </AccordionSummary>

                        <AccordionDetails>
                            Lorem ipsum dolor sit.
                        </AccordionDetails>
                    </Accordion> */}
                {/* </div> */} 
            </div>
        </div>
    </div>
  );
};

export default FAQ;
