import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import {createproductSrev} from './controller/prod_controller';
import path from "path";
const cors = require('cors');


class App {
    public app: express.Application;
    private allowedOrigins: string[] = [
        'http://localhost:3000',
    ];
    constructor() {
        this.app = express();
        this.config();
        this.allRoutes();
    }
    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(cors({origin: this.allowedOrigins, credentials: true}));


        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(express.static(path.join(__dirname, '../public')));
        this.app.use('/static', express.static(path.join(__dirname, '../public/upload')));
    }

    private allRoutes(): void {
        this.app.use('/api/v1/items', createproductSrev);
        //all other URI will redirect to front end file
        this.app.use('*',(req: Request, res: Response) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });
    }
}

export default new App().app;
