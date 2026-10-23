import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('Damascus');
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch weather data from Open-Meteo API
  const fetchWeather = (cityName) => {
    setLoading(true);
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=33.51&longitude=36.29&current_weather=true`)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data.current_weather);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching weather:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== '') {
      setCity(search);
      fetchWeather(search);
      setSearch('');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>🌤️ تطبيق حالة الطقس (React + Vite)</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="اكتب اسم المدينة..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', borderRadius: '5px' }}
        />
        <button type="submit" style={{ padding: '10px 15px', marginLeft: '10px', fontSize: '16px' }}>
          بحث
        </button>
      </form>

      <div style={{ marginTop: '30px' }}>
        {loading ? (
          <h2>⏳ جاري جلب حالة الطقس من السيرفر...</h2>
        ) : weather ? (
          <div style={{ border: '1px solid #ccc', padding: '20px', display: 'inline-block', borderRadius: '10px' }}>
            <h2>المدينة: {city}</h2>
            <h3>درجة الحرارة: {weather.temperature} °C</h3>
            <p>سرعة الرياح: {weather.windspeed} km/h</p>
          </div>
        ) : (
          <p>لا توجد بيانات للعرض</p>
        )}
      </div>
    </div>
  );
}

export default App;