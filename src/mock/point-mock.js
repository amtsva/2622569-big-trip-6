// src/mock/point-mock.js
import { TYPES, CITIES, OFFERS } from '../const.js';

// Генерация случайного числа в диапазоне
const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Генерация случайного элемента из массива
const getRandomItem = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

// Генерация случайной даты
const getRandomDate = () => {
  const startDate = new Date(2024, 0, 1); // 1 января 2024
  const endDate = new Date(2024, 11, 31); // 31 декабря 2024
  return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
};

// Форматирование даты
const formatDate = (date) => {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  return `${month} ${day}`;
};

const formatTime = (date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Генерация случайных опций для точки маршрута
const getRandomOffers = () => {
  const offersCount = getRandomInteger(0, 3);
  const shuffledOffers = [...OFFERS].sort(() => 0.5 - Math.random());
  return shuffledOffers.slice(0, offersCount);
};

// Генерация случайного описания
const getRandomDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam.',
    'Eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.'
  ];

  const count = getRandomInteger(1, 3);
  const shuffled = [...descriptions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).join(' ');
};

// Генерация случайных фотографий
const getRandomPhotos = () => {
  const photosCount = getRandomInteger(0, 4);
  const photos = [];
  for (let i = 0; i < photosCount; i++) {
    photos.push(`https://loremflickr.com/248/152?random=${getRandomInteger(1, 1000)}`);
  }
  return photos;
};

// Создание структуры пункта назначения
const createDestination = (city) => {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
    name: city,
    description: getRandomDescription(),
    photos: getRandomPhotos()
  };
};

// Создание структуры точки маршрута
export const createPoint = () => {
  const startDate = getRandomDate();
  const endDate = new Date(startDate.getTime() + getRandomInteger(3600000, 86400000)); // +1-24 часа
  const type = getRandomItem(TYPES);
  const city = getRandomItem(CITIES);
  const offers = getRandomOffers();

  return {
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
    type: type,
    destination: createDestination(city),
    startDate: startDate,
    endDate: endDate,
    price: getRandomInteger(50, 500),
    offers: offers,
    isFavorite: Math.random() > 0.8
  };
};

// Генерация массива точек
export const generatePoints = (count = 3) => {
  const points = [];
  for (let i = 0; i < count; i++) {
    points.push(createPoint());
  }
  return points;
};
