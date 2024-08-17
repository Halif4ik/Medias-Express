export class ApiResponseServ<T> {
   success: boolean;

   errors_message: null | string;

   data: T | null;
}

export class HttpException extends Error {
   public status: number
   public message: string
   constructor(status: number, message: string) {
      super(message)
      this.status = status
      this.message = message
   }
}
