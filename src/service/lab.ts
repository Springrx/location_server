import { provide, inject, Context, plugin } from 'midway';
import { ILabService } from '../interface';
import { md5Pwd } from '../app/common/helper';

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

  async getPost(getPostInfo) {
    var { lat, lng, nowPageNum } = getPostInfo;
    let boundary = 50;  //返回一个以position为中心，boundary*2的正方形范围内的所有帖子
    const location_x = lng;
    const location_y = lat;
    const pageSize = 10;
    const res = await this.ctx.model.PostModel.findAll({
      where:
      // {
      // ST_Distance_Sphere(
      //   point(longitude, latitude),      
      //   point(location_x, location_y)     
      // ) <= boundary; }
      {
        location_x: { [Op.between]: [location_x - boundary, location_x + boundary] },
        location_y: { [Op.between]: [location_y - boundary, location_y + boundary] },
      },
      attributes: ['post_id', 'user_id', 'location_x', 'location_y', 'text', 'video_url', 'created_at', 'updated_at'],
      order: [['created_at', 'DESC']],
      offset: pageSize * nowPageNum,
      limit: pageSize
    });
    const totalCount = await this.ctx.model.PostModel.count();
    const totalPages = Math.ceil(totalCount / pageSize);
    return { data: res, totalPages: totalPages, pageSize: pageSize, nowPageNum: nowPageNum };
  }
  async getPostOfUser(user_id: any): Promise<any> {
    return await this.ctx.model.PostModel.findAll({
      where: {
        user_id: user_id
      },
      order: [['created_at', 'DESC']]
    })
  }
  async updateUserAva(data, user_id) { // 更新我的信息
    const info = await this.ctx.model.UserInfoModel.findOne({
      where: {
        user_id: user_id,
      }
    });
    if (!info) {
      return 'not exist';
    }
    await this.ctx.model.UserInfoModel.update(data, {
      where: {
        user_id: user_id,
      }
    });
    return 'success';
  }
  async getPostImage(post_id) {
    return this.ctx.model.PostPhotoModel.findAll({
      where: {
        post_id: post_id
      }
    })
  }

  async getComment(post_id) {
    return this.ctx.model.CommentModel.findAll({
      where: {
        post_id: post_id
      }
    })
  }

  async addPostPhoto(postPhoto) {
    return this.ctx.model.PostPhotoModel.create(postPhoto);
  }
  async addComment(comment) {
    return this.ctx.model.CommentModel.create(comment);
  }

  async getUserInfo(user_id) {
    return this.ctx.model.UserInfoModel.findOne({
      attributes: ['username', 'avatar_url'],
      where: { user_id: user_id }
    });
  }
  async delPost(post_id) {
    await this.ctx.model.PostModel.destroy({ where: { post_id: post_id } });
  }

  async addPost(body) {
    const { user_id, text, video_url, location_x, location_y } = body;
    const data = {
      user_id: user_id,
      text: text,
      location_x: location_x,
      location_y: location_y,
      video_url: video_url
    }
    const res = await this.model.PostModel.create(data);
    const post_id = res.dataValues.post_id;
    // const res_new =  await this.model.PostModel.findOne({
    //   where: {
    //     post_id:post_id,
    //   }
    // });
    // const {post_id} = res_new;
    return post_id;
  }

  async oneImageData(imageId) {
    return this.ctx.model.imageModel.findAll({
      where: {
        photo_id: imageId,
      }
    });
  }

  async register(body) {
    const { username, password } = body;
    const data = {
      username: username, password: md5Pwd(password),
      is_manager: 0
    }
    return await this.ctx.model.UserInfoModel.create(data);
  }
  async validUserName(username) {
    return await this.model.UserInfoModel.findOne({
      where: {
        username: username
      }
    })

  }
  async validOldPwd(data) {
    const { password, user_id } = data;
    return await this.model.UserInfoModel.findOne({
      where: {
        user_id: user_id,
        password: md5Pwd(password)
      }
    })
  }
  async login(body) {
    const { userName, pwd, is_manager } = body;
    return await this.model.UserInfoModel.findOne({
      where: {
        username: userName,
        password: md5Pwd(pwd),
        is_manager: is_manager
      }
    });
  }
}
