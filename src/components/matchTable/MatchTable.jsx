import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './MatchTable.scss';
import CircularProgress from '@mui/material/CircularProgress';

const MatchTable = ({ matchData }) => {
  const navigate = useNavigate();

  const [blockResVis, setBlockResVis] = useState(false);

  const handleRowClick = (matchId) => {
    navigate(`/singleMatch/${matchId}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (matchData.length === 0) {
        setBlockResVis(true)
      }
    },4000)  
  },[])



  return (
    <TableContainer component={Paper} className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className='match-id'><p className='table-header-cell'>ID Матча</p></TableCell>
            <TableCell><p className='table-header-cell'>Время</p></TableCell>
            <TableCell><p className='table-header-cell'>Дата</p></TableCell>
            <TableCell className='match-price'><p className='table-header-cell'>Цена</p></TableCell>
            <TableCell className='match-author'><p className='table-header-cell'>Добавил</p></TableCell>
            <TableCell><p className='table-header-cell'>Адрес</p></TableCell>   
            <TableCell className='match-number'><p className='table-header-cell'>Номер телефона</p></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {matchData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} style={{ textAlign: 'center'}}>
                <CircularProgress style={{display: blockResVis ? 'none':'block', width: '40px' }} />

                <div style={{display: blockResVis ? "block": "none"}} className="restart">
                  <p>Возможно на сегодня нету матчей...</p>
                  <button onClick={() => {window.location.reload()}} className="button-29" role="button">Обновить страницу</button>

                </div>
              </TableCell>
            </TableRow>
          ) : (
            matchData.map((match) => (
              <TableRow
                key={match.id}
                onClick={() => handleRowClick(match.id)}
                className="table-row"
                
              >
                <TableCell className='match-id'> <p className='table-body-cell'>{`ID ${match.matchID || ''}`}</p></TableCell>
                <TableCell> <p className='table-body-cell'>{match.time || ''}</p></TableCell>
                <TableCell className='match-date'> <p className='table-body-cell'>{match.date ? new Date(match.date).toLocaleDateString() : ''}</p></TableCell>
                <TableCell className='match-price'> <p className='table-body-cell'>{match.price + " сом" || ''}</p></TableCell>
                <TableCell className='match-author'> <p className='table-body-cell'>{match.authorName || ''}</p></TableCell>
                <TableCell> <p className='table-body-cell'>{match.address || ''}</p></TableCell>
                <TableCell className='match-number'> 
                  <p className='table-body-cell'>
                    {match.phoneNumber ? `${match.phoneNumber.substring(0, 4)}****` : ''}
                  </p>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MatchTable;
