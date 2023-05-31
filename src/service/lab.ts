import { provide, inject, Context, plugin } from 'midway';
import { ILabService } from '../interface';
// const path = require('path')
const { Op } = require("sequelize");
@provide('labService')
export class LabService implements ILabService {

  @inject()
  ctx: Context;

  @plugin()
  model;


  // async renderTemplate(path, data) {
  //   await this.ctx.render('index', {
  //     template: path,
  //     templateData: data
  //   });
  // }

  async getSelectWorkOrderData(workOrderId) {
    return this.ctx.model.workOrderModel.findAll({
      where: {
        id: workOrderId,
      }
    });
  }
  async getWorkOrderPhoto(workorder_id){
    return this.ctx.model.WorkorderPicturesModel.findAll({
      where:{
        workorder_id:workorder_id,
      }
    });
  }
  async getWorkOrderMessage(workorder_id){
    return this.ctx.model.WorkOrderMessageModel.findAll({
      where:{
        workorder_id:workorder_id,
      }
    });
  }



  async getPost(position) {
    let boundary=50;  //返回一个以position为中心，boundary*2的正方形范围内的所有帖子
    const location_x=position.lng;
    const location_y=position.lat;
    
    const res = await this.ctx.model.PostModel.findAll({
      where: {
        location_x: { [Op.between]: [location_x-boundary, location_x+boundary] },
        location_y: { [Op.between]: [location_y-boundary, location_y+boundary] },
      },
      attributes: ['post_id','user_id', 'location_x','location_y','text','video_url','created_at','updated_at'],
      order:[['created_at','DESC']],
    });
    // const {updated_at}=res;
    // const reg = /T/g;
    // const newStr = updated_at.toString().replace(reg, " ");
    
    return res;
  }
  async addWorkOrderPicture(workOrderPicture){
    return this.ctx.model.WorkorderPicturesModel.create(workOrderPicture)
  }
  async addPostPhoto(postPhoto){
    return this.ctx.model.PostPhotoModel.create(postPhoto);
  }
  async getUserInfo(user_id) {
    const res = await this.ctx.model.UserInfoModel.findAll({
      attributes: ['username', 'password', 'avatar_url'],
      where:{user_id:user_id}
    });
    return res;
  }
  async delWorkOrder(id){
    await this.ctx.model.WorkOrderModel.destroy({where:{id:id}});
  }
  async delSelectWorkOrderMessage(id){
    await this.ctx.model.WorkOrderMessageModel.destroy({where:{workorder_id:id}});
  }
  async addPost(body){

    const{user_id,text,video_url,location_x,location_y}=body;
    const data = {
    user_id: user_id,
    text: text,       
    location_x: location_x,
    location_y:location_y,
    video_url:video_url
    }
    
    const res =  await this.model.PostModel.create(data); 
    const post_id= res.dataValues.post_id;
    // const res_new =  await this.model.PostModel.findOne({
    //   where: {
    //     post_id:post_id,
    //   }
    // });
    // const {post_id} = res_new;
    return post_id;
  }

  async addSelectWorkOrderMessage(workOrderMessage){
    const {is_admin,workorder_id,content} = workOrderMessage;
    const data = {
    workorder_id: workorder_id,
    is_admin: is_admin,       
    content: content,
    }
    await this.model.WorkOrderMessageModel.create(data);
  }
  async oneImageData(imageId) {
    return this.ctx.model.imageModel.findAll({
      where: {
        photo_id: imageId,
      }
    });
  }
  async updateWorkOrder(workorder) {
    const {id}=workorder;
    await this.ctx.model.WorkOrderModel.destroy({where:{id:id}});
    return  await this.model.WorkOrderModel.create(workorder); 
  }
  async register(body){
    const {username,password}=body;
    const data={username:username,password:password,
      is_manager:0
    }
    return await this.ctx.model.UserInfoModel.create(data);
  }
  async validUserName(username){
    return await this.model.UserInfoModel.findOne({
      where:{
        username:username
      }
    })

  }
  async login(body){
    const {userName,pwd,is_manager}=body;

    return await this.model.UserInfoModel.findOne({
      where: {
        username:userName,
        password:pwd,
        is_manager:is_manager
      }
    });
  }
}
