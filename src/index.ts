import app from './app';
import {db} from './models/index'
import dotenv from 'dotenv';

const port: number = process.env.NODE_LOCAL_PORT ? parseInt(process.env.NODE_LOCAL_PORT) : 3001;
dotenv.config();

db.sequelize.sync({force: false}).then((): void => {

    app.listen(port, () => {
        console.log(`Server is running on port: ${port}*`);
    });
});

