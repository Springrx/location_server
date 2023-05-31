import { Context, inject, controller, get,post, provide } from "midway";
import { ILabService } from "../../interface";
import BaseController from "../common/BaseController";
// const fs = require("fs");
// const path = require("path");

@provide()
@controller("/api/user")
export class ManageController extends BaseController  {
  @inject()
  ctx: Context;

  @inject("labService")
  service: ILabService;

  HOME = process.env.HOME;

  @get("/:name")
  async getFunc() {
    const { ctx, service } = this;
    let name = ctx.params.name;
    switch (name) {
      case "valid":
        let list_queryParameter = ctx.request.query;
        const { username } = list_queryParameter;
          let data = await service.validUserName(username);
            ctx.response.body = {
              code: "1000",
              data: data,
            };
        break;
        //info还有bug
        case "info":
          const  user_id  = ctx.request.query;
            let res = await service.getUserInfo(user_id);
              ctx.response.body = {
                code: "1000",
                data: res,
              };
          break;
      }
  }
  @post("/:name")
  async postFunc(){
    const { ctx,service } = this;
    let name = ctx.params.name;
    console.log(name)
    switch (name) {
      case "register":
        // 不能用已有的name去注册
        let list_queryParameter = ctx.request.body;
        const { username,password } = list_queryParameter;
        const response =  await service.register({username,password});
        const id=response.dataValues.user_id;
        console.log(response);
        //如果有错误消息，error_msg应该写什么       
        this.success({username,id})                           
        break;
      case "login":
        const { userName,pwd,is_manager} = ctx.request.body;
        //如果之后写单独查询用户名的逻辑，则将login修改为先查用户名，再查用户名和密码，并返回不同的错误（用户名不存在，密码输入错误）
        const user={userName,pwd,is_manager};
          const re= await service.login(user);
          if(re===null){
            this.failed('用户名不存在');
          }
          else
            ctx.response.body = {
              code: "1000",
              data: re,
            };
        break;        
      case"addSelectWorkOrderMessage":
        console.log(ctx.request.body,"kctest")
        const {workOrderMessage} = ctx.request.body;
        await service.addSelectWorkOrderMessage(workOrderMessage);
        //   let data = await service.delWorkOrder(id);
              ctx.response.body = {
                code: "1000",
                data: "success",
              };
        break;
  
      case "addWorkOrderPicture":
        await service.addWorkOrderPicture(ctx.request.body);
        ctx.response.body = {
          code: "1000",
          data: "success",
        };
        break;
      case "updateWorkOrder":
        await service.updateWorkOrder(ctx.request.body);
        ctx.response.body = {
          code: "1000",
          data: "success",
        };
        break;
    }
  }
}
