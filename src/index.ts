import app from './app';
import {db} from './models/index'
import dotenv from 'dotenv';

dotenv.config();

db.sequelize.sync({force: false}).then((): void => {
    app.listen(+process.env.NODE_LOCAL_PORT , () => {
        console.log(`process.env.NODE_LOCAL_PORT: ${process.env.NODE_LOCAL_PORT}*`);
    });
});

