import React, { useEffect, useState } from 'react';
import './FPtable.scss';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const FPtable = ({ fpData }) => {
    const [blockResVis, setBlockResVis] = useState(false);
    const navigate = useNavigate() ;

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!fpData || fpData.length === 0) {
                setBlockResVis(true);
            }
        }, 4000);
        return () => clearTimeout(timer);
    }, [fpData]);


    const handleRowClick = (fpID) => {
        navigate(`/singleFreePlayer/${fpID}`);
    }

    return (  
        <div>
            <TableContainer component={Paper} className='table-container'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><p className='table-header-cell'>Имя игрока</p></TableCell>
                            <TableCell><p className='table-header-cell'>Количество игроков</p></TableCell>
                            <TableCell><p className='table-header-cell'>Номер телефона</p></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fpData ? (
                            fpData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} style={{ textAlign: 'center' }}>
                                        <div style={{ display: blockResVis ? "block" : "none" }} className="restart">
                                            <p>Свободных игроков нет</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                fpData.map((data, index) => (
                                    <TableRow 
                                        className='table-row'
                                        key={index}
                                        onClick={() => {handleRowClick(data.id)}}
                                    >
                                        <TableCell><p className='table-body-cell'>{data.fpName}</p></TableCell>
                                        <TableCell><p className='table-body-cell'>{data.fpCount_players}</p></TableCell>
                                        <TableCell><p className='table-body-cell'>{data.fpNumberPhone}</p></TableCell>
                                    </TableRow>
                                ))
                            )
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} style={{ textAlign: 'center' }}>
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default FPtable;
