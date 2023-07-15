//维护一个map，key为userId，value为user
//若登录，则value为真正的user，登出后，value为undefined
//登录后，每次前端发请求，都携带cookie，cookie和session对比，如果一致，请求成功，如果不一致，redirect到登录界面
const sessionMap = new Map();

export function setSession(user_id,user_info){
    sessionMap.set(user_id, user_info);
}

export function getSession(user_id){
    return sessionMap.get(user_id);
}

export function setSessAndCookie(){
    
}