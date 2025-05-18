import React, { useEffect , useState } from 'react';
import './index.css';
import { ThemeProvider } from '@mui/material/styles'
import theme from '../src/component/theme'
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import CloudIcon from '@mui/icons-material/Cloud';
import LanguagetMenu from './component/changeLanguage';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

// redux import
import { useDispatch, useSelector } from 'react-redux';
import { ChangeWeatherAPI } from './features/API-Weather/API-Weather-Slice';
import { FetchWeatherAPI } from './features/API-Weather/API-Weather-Slice';

function App() {

  // const [weatherData, setWeatherData] = useState({max: 0, min: 0, temp: 0 , des: '', icon: null , date: 0});
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('ar'); // Default language

  // redux code
  const dispatch = useDispatch();
  
  useEffect(() => { 
    // dispatch(ChangeWeatherAPI());
    dispatch(FetchWeatherAPI());
    console.log("fetchResultAPI");
  },[] );
  
  const isloading = useSelector((state) => {
    return state.ChangeWeatherAPI.isloading
  });

  const weatherData = useSelector((state) => {
    console.log(state.ChangeWeatherAPI.weatherData);
    return state.ChangeWeatherAPI.weatherData;
  });


  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
  }
  

  return (
    <>
      <Container maxWidth="sm">
        <ThemeProvider theme={theme}>
          <Card sx={{ backgroundColor: 'var(--second-c)', color: 'var(--white-c)'  }} className='WeatherCard'>
            {/* <CardActionArea> */}
              <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: `${selectedLanguage == 'ar' ? 'row-reverse' : 'row'}`, height: "70px" }}>
                  <Typography gutterBottom variant="h2">
                    {t('Cairo')}
                  </Typography>
                  <Typography gutterBottom variant="div" sx={{ marginTop: 'auto' }}>
                    {new Intl.DateTimeFormat(`${i18n.language}-EG`, { dateStyle: 'long' }).format(new Date())}
                  </Typography>
                </div>
                <hr style={{margin: '0'}} />
                <div style={{display: 'flex' , flexDirection: `${selectedLanguage == 'ar' ? 'row-reverse' : 'row'}` , justifyContent: 'space-between'}} >
                  {/* TEMP */}
                  <div style={{display: 'flex', flexDirection: 'column' , alignItems: `${selectedLanguage == 'ar' ? 'end' : 'start'}` , justifyContent:'space-around' ,marginTop: '15px'}} >
                      {isloading && (<CircularProgress 
                        style={{ color: 'var(--white-c)' }}
                      />)}
                    <div style={{display: !isloading ? 'flex':'none', flexDirection: `${selectedLanguage == 'ar' ? 'row-reverse' : 'row'}`, justifyContent:'space-around'}}>
                      <Typography variant="h2">
                        {t(Math.round(weatherData.temp))}°
                      </Typography>
                      <Typography  sx={{marginBottom: '-40px' }}>
                        <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png` }/>
                      </Typography>
                    </div>
                    <Typography variant="h6">
                      {t(weatherData.des)}
                    </Typography>
                    {/* number of TEMP MIN & MAX */}
                    <div style={{    display: "flex",flexDirection: `${selectedLanguage == 'ar' ? 'row-reverse' : 'row'}`,justifyContent: "space-between",minWidth: "175px"}}>
                      <div style={{display: "flex",flexDirection: 'row' ,gap: '10px'}}>
                        {t('min')} : {isloading && (<CircularProgress style={{ color: 'var(--white-c)' }} size={15}/>)} <span style={{display: !isloading ? 'flex':'none'}}>{t(Math.round(weatherData.min))}</span>
                      </div>
                      <span style={{padding: "0 8px"}}>|</span>
                      <div style={{display: "flex",flexDirection: 'row' ,gap: '10px'}}>
                        {t('max')} : {isloading && (<CircularProgress style={{ color: 'var(--white-c)' }} size={15}/>)} <span style={{display: !isloading ? 'flex':'none'}}>{t(Math.round(weatherData.max))}</span>
                      </div>
                    </div>
                  </div>
                  <Typography variant="div" className='cloud' sx={{marginRight: `${selectedLanguage == 'ar' ? '70px' : '0'}`,marginLeft: `${selectedLanguage == 'ar' ? '0' : '70px'}` }}>
                    <CloudIcon sx={{ fontSize: '175px'}} className='cloudIcon' />
                  </Typography>
                </div>
              </CardContent>
          </Card>
        </ThemeProvider>
      </Container>
      <LanguagetMenu handleLanguageChange={handleLanguageChange} selectedLanguage={selectedLanguage} />
    </>
  );
}

export default App;
