import React, { useEffect , useState } from 'react';
import './index.css';
import { ThemeProvider } from '@mui/material/styles'
import theme from '../src/component/theme'
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import LanguagetMenu from './component/changeLanguage';
import axios from 'axios';
import { useTranslation } from 'react-i18next';




function App() {
  const [weatherData, setWeatherData] = useState({max: 0, min: 0, temp: 0 , des: '', icon: null , date: 0});
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('ar'); // Default language



  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
  }

  
  useEffect(() => {
    const lat = 30.033333; // Latitude for Cairo
    const lon = 31.233334; // Longitude for Cairo
    const apiKey = 'type the key here from openWeather'; // Replace with your OpenWeatherMap API key

  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(function (response) {
      // handle success
      // console.log(response.data);
      setWeatherData((el) => ({
        ...el,
        temp: response.data.main.temp,
        max: response.data.main.temp_max,
        min: response.data.main.temp_min,
        des: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
      }));
    }).catch(function (error) {
      // handle error
      console.error(error);
    });
        setWeatherData((el) => ({
      ...el,
      date: new Intl.DateTimeFormat(`${i18n.language}-EG`, { dateStyle: 'long' }).format(new Date()),
    })); 
  }, [i18n.language]);
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
                    {weatherData.date}
                  </Typography>
                </div>
                <hr style={{margin: '0'}} />
                <div style={{display: 'flex' , flexDirection: `${selectedLanguage == 'ar' ? 'row-reverse' : 'row'}` , justifyContent: 'space-between'}} >
                  {/* TEMP */}
                  <div style={{display: 'flex', flexDirection: 'column' , alignItems: `${selectedLanguage == 'ar' ? 'end' : 'start'}` , justifyContent:'space-around' ,marginTop: '15px'}} >
                    <div style={{display: 'flex', flexDirection: `${selectedLanguage == 'ar' ? 'row-reverse' : 'row'}`, justifyContent:'space-around'}}>
                      <Typography variant="h2">
                        {t(Math.round(weatherData.temp))}°
                      </Typography>
                      <Typography  sx={{marginBottom: '-40px' }}>
                        <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png` } alt="weather icon" />
                      </Typography>
                    </div>
                    <Typography variant="h6">
                      {t(weatherData.des)}
                    </Typography>
                    {/* number of TEMP MIN & MAX */}
                    <div style={{    display: "flex",flexDirection: `${selectedLanguage == 'ar' ? 'row-reverse' : 'row'}`,justifyContent: "space-between",minWidth: "175px"}}>
                      <div>
                        {t('min')} : {t(Math.round(weatherData.min))}
                      </div>
                      |
                      <div>
                        {t('max')} : {t(Math.round(weatherData.max))}
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
