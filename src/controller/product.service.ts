import {Cost} from "../models/modelsDb";
import {HttpException} from "../interceptor/api.response.dto";

export class ProductService {

   async createUser(reqBody): Promise<Cost> {
      try {
         const postItem: Cost = await Cost.create([{
            checked: reqBody.done === 'true',
            text: reqBody.text,
            CustomerId: req.session.customer[0].id,
            attachedFile: '',
            login: req.session.customer[0].login,
            userName: req.session.customer[0].userName,
            face: req.session.customer[0].face,
         }]);

         return postItem;
      } catch (e) {
         throw new HttpException(409, 'User with this e-mail already exist in db');
      }
   }

}
