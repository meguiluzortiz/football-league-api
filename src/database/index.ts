import monk from 'monk';

const DB_URI = process.env.MONGODB_URI ?? '';
const connection = monk(DB_URI);
connection.then(() => {
  console.log('Connected correctly to db');
});

export default connection;
