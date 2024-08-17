import {checkValidationInMiddleWare, idValid, postIdValidMid, textValidMiddleware} from "../midleware/validator";
import {Commit, Customer, Post} from '../models/modelsDb';
import {Op} from "sequelize";
import express, {Express, NextFunction, Request, Response, Router} from 'express';
import * as fs from "fs";
import {ProductService} from './product.service';
import {ApiResponseServ} from "../interceptor/api.response.dto";
const PAGE_PAGINATION: number = process.env.PAGE_PAGINATION ? parseInt(process.env.PAGE_PAGINATION) : 5;

const router: Router = express.Router();
const productService = new ProductService();

/*create new Post  todo isCorrectToken,*/
router.post('/', textValidMiddleware(), checkValidationInMiddleWare, async (req: Request, res: Response) => {
   try {
      const result = await productService.createUser(req.body);
      res.status(201).send({
         success: true,
         errors_message: null,
         data: result,
      } as ApiResponseServ<Post>);
   } catch (e) {
      console.log("post-", e);
      res.status(409).send({
         success: false,
         errors_message: e,
         data: null,
      } as ApiResponseServ<null>);
   }
});


export {router as createproductSrev};
