const MONGODB_URI = 'mongodb+srv://admin:W8Tat4DU4AE07Pt3@cluster0.fxllx.mongodb.net/?retryWrites=true&w=majority' || process.env.MONGODB_URI;
const DATABASE_NAME = 'trello-mern-stack-pro' || process.env.DATABASE_NAME;

import { MongoClient, ServerApiVersion } from 'mongodb';

//Khởi tạo một đối tượng trellodatabaseinstance ban đầu là null(vì chúng ra chưa connect)
let trelloDatabaseInstance = null;

//Khởi tạo một đối tượng client instance để connect tới mongodb
const mongoClientInstance = new MongoClient(MONGODB_URI, {
  //Lưu ý: cái serverApi có từ phiên bản mongodb 5.0.0 trở lên, có thể không cần dùng nó, còn nếu dùng nó là chúng ta sẽ chỉ định một cái stable api version của mongodb
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

//Kết nối tới Database
export const CONNECT_DB = async () => {
  //gọi kết nối tới mongodb atlas với uri đã khai báo trong thân của mongoClientIntance
  await mongoClientInstance.connect();

  //Kết nối thành công thì lấy ra database theo tên và gán ngược lại vào giá trị biến trelloDatabaseInstance ở trên của chúng ta
  trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME);
};

//Đóng kết nối Database khi cần
export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
}

//Function getDB không async này có nhiệm vụ export ra cái Trello Database Instance sau khi đã connect thành công tới MonongoDB để chúng ta sử dụng ở nhiều nới khác nhau trong code.
// Lưu ý: Phải đảm bảo chỉ luôn gọi cái getDb này sau khi đã kết nối thành công tới MongoDB
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first');
  return trelloDatabaseInstance;
}

