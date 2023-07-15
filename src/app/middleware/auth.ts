import { WebMiddleware, provide } from 'midway';
import Response, { ResultStatus, StatusCode } from '../common/response';
import { getSession } from '../common/session';
// import { getSession } from '../common/session';
@provide()
export class LoginAuthMiddleware implements WebMiddleware {
  resolve() {
    const response = new Response();
    return async (ctx, next) => {
      const cookie=ctx.cookies.get('userInfo', {
        signed: false,
      })
      // const cookie=JSON.parse(ctx.cookies.get('userInfo', {
      //   signed: false,
      // }));
      if(!cookie){
        console.log('cookie异常')
        response.status = ResultStatus.fail;
        response.code = StatusCode.dataError;
        response.msg = 'cookie异常';
        ctx.body=new Response();
      }
      else{
        console.log(JSON.parse(cookie).user_id,'cookie.user_id');
        const session =getSession(JSON.parse(cookie).user_id);
        console.log(session,'session');
        if (JSON.parse(cookie).username!==session) {
        response.status = ResultStatus.fail;
        response.code = StatusCode.unlogin;
        response.msg = '当前用户未登录';
        ctx.body = response;
        } else {
        await next();
        }
      }
    };
  }
}
