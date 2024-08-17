import {Post} from "../models/modelsDb";
import {HttpException} from "../interceptor/api.response.dto";

export class ProductService {
   private readonly arrHexsFaces = ['👩‍🦰'.codePointAt(0), '👨‍🦲'.codePointAt(0), '👲'.codePointAt(0), `👧`.codePointAt(0)];

   async createUser(reqBody): Promise<Post> {
      try {
         const postItem: Post[] = await Post.bulkCreate([{
            checked: reqBody.done === 'true',
            text: reqBody.text,
            CustomerId: req.session.customer[0].id,
            attachedFile: '',
            login: req.session.customer[0].login,
            userName: req.session.customer[0].userName,
            face: req.session.customer[0].face,
         }]);

         return postItem[0];
      } catch (e) {
         throw new HttpException(409, 'User with this e-mail already exist in db');
      }
   }

}
