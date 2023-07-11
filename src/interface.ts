export interface ILabService {
  getPost(position:any): Promise<any>;
  getComment(post_id:any): Promise<any>;
  getPostOfUser(user_id:any): Promise<any>;
  getWorkOrderPhoto(workorder_id:any):Promise<any>;
  getWorkOrderMessage(workorder_id:any):Promise<any>;
  getUserInfo(user_id:any): Promise<any>;
  getPostImage(post_id:any): Promise<any>;
  oneImageData(picture_id:any):Promise<any>;
  updateUserAva(avatar_url:any, user_id:any):Promise<any>;
  addWorkOrderPicture(workOrderPicture:any):Promise<any>;
  addPostPhoto(postImage:any):Promise<any>;
  addPost(post:any):Promise<any>;
  addComment(comment:any):Promise<any>;
  addSelectWorkOrderMessage(workOrderMessage:any):Promise<any>;
  delWorkOrder(id:any):Promise<any>;
  delSelectWorkOrderMessage(id:any):Promise<any>;
  updateWorkOrder(workorder:any):Promise<any>;
  register(user:any):Promise<any>;
  validUserName(username:any):Promise<any>;
  login(user:any):Promise<any>;
}
