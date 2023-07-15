import { Context, inject, controller, get, post, provide } from "midway";
import { ILabService } from "../../interface";
import { md5Pwd } from "../common/helper";
import BaseController from "../common/BaseController";
import { setSession } from "../common/session";
// const fs = require("fs");
// const path = require("path");

@provide()
@controller("/api/user")
export class ManageController extends BaseController {
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
      case "info":
        const { user_id } = ctx.request.query;
        let res = await service.getUserInfo(user_id);
        ctx.response.body = {
          code: "1000",
          data: res,
        };
        break;
    }
  }
  @post("/:name")
  async postFunc() {
    const { ctx, service } = this;
    let name = ctx.params.name;
    console.log(name)
    switch (name) {
      case "register":
        // 不能用已有的name去注册
        const { username, password } = ctx.request.body;
        const response = await service.register({ username, password });
        if (response) {
          const { password: password, ...rest } = response.dataValues;
          setSession(rest.user_id, rest.username);
          this.ctx.cookies.set('userInfo', JSON.stringify({ user_id: rest.user_id, username: rest.username }), {
            domain: 'localhost', // 写cookie所在的域名
            path: '/', // 写cookie所在的路径
            maxAge: 10*10 * 60 * 1000, // cookie有效时长
            // expires: new Date('2017-02-15'), // cookie失效时间
            httpOnly: false, // 是否只用于http请求中获取
            overwrite: false, // 是否允许重写
          });
          this.success(rest);
        }
        else {
          this.failed('注册失败');
        }
        break;
      case "login":
        const { userName, pwd, is_manager } = ctx.request.body;
        //如果之后写单独查询用户名的逻辑，则将login修改为先查用户名，再查用户名和密码，并返回不同的错误（用户名不存在，密码输入错误）
        const user = { userName, pwd, is_manager };
        const re = await service.login(user);
        // const response = await service.login({name, password});
        if (re) {
          const { password: password, ...rest } = re.dataValues;
          if (password === md5Pwd(pwd)) {
            setSession(rest.user_id, rest.username);
            this.ctx.cookies.set('userInfo', JSON.stringify({ user_id: rest.user_id, username: rest.username }), {
              domain: 'localhost', // 写cookie所在的域名
              path: '/', // 写cookie所在的路径
              maxAge: 10 * 60 * 1000, // cookie有效时长
              // expires: new Date('2017-02-15'), // cookie失效时间
              httpOnly: false, // 是否只用于http请求中获取
              overwrite: false, // 是否允许重写
            });
            ctx.response.body = {
              code: "1000",
              data: rest,
            };
          } else {
            this.failed('抱歉，用户名或密码不正确！');
          }
        } else {
          this.failed('抱歉，当前用户不存在！');
        }
        // ctx.body = 'cookie is ok';
        break;
      case "info":
        const { data, user_id } = ctx.request.body;
        const res = await service.updateUserAva(data, user_id);
        if (res === 'success') {
          setSession(user_id, res.username);
          this.ctx.cookies.set('userInfo', JSON.stringify({ user_id: user_id, username: res.username }), {
            domain: 'localhost', // 写cookie所在的域名
            path: '/', // 写cookie所在的路径
            maxAge: 10 * 60 * 1000, // cookie有效时长
            // expires: new Date('2017-02-15'), // cookie失效时间
            httpOnly: false, // 是否只用于http请求中获取
            overwrite: false, // 是否允许重写
          });
          this.success('success');
        }
        else this.failed('fail');
        break;
      case "pwd":
        const { new_pwd, old_pwd, my_id } = ctx.request.body;
        const valid=await service.validOldPwd({ password: old_pwd, user_id: my_id })
        if (valid.user_id===my_id) {
          const resp = await service.updateUserAva({ password: md5Pwd(new_pwd) }, my_id);
          if (resp==='success') {
            this.success('success');
          }
          else this.failed('更新失败');
        }
        else this.failed('旧密码输入错误')
        break;
      case "logout":
        const { userId } = ctx.request.body;
        setSession(userId, undefined);
        ctx.response.body = {
          code: "1000",
          data: "success",
        };
        break;
    }
  }
}
