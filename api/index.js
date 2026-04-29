export const config={runtime:"edge"};

const _0x91a=(process.env["TARGET_DOMAIN"]||"").replace(/\/$/,"");

const _0x72c=new Set([
"host","connection","keep-alive","proxy-authenticate","proxy-authorization",
"te","trailer","transfer-encoding","upgrade","forwarded",
"x-forwarded-host","x-forwarded-proto","x-forwarded-port"
]);

function _0x3e5(_0xk){return _0xk.startsWith("x-vercel-")}

export default async function(_0xreq){

  if(!_0x91a){
    return new Response("Misconfigured: TARGET_DOMAIN is not set",{status:500});
  }

  try{

    let _0xu=_0xreq.url;
    let _0xi=_0xu.indexOf("/",8);

    let _0xt=_0xi===-1?_0x91a+"/":_0x91a+_0xu.slice(_0xi);

    let _0xh=new Headers();
    let _0xip=null;

    for(const _0xp of _0xreq.headers){

      let _0xk=_0xp[0];
      let _0xv=_0xp[1];

      if(_0x72c.has(_0xk)) continue;
      if(_0x3e5(_0xk)) continue;

      if(_0xk==="x-real-ip"){_0xip=_0xv;continue;}
      if(_0xk==="x-forwarded-for"){if(!_0xip)_0xip=_0xv;continue;}

      _0xh.set(_0xk,_0xv);
    }

    if(_0xip)_0xh.set("x-forwarded-for",_0xip);

    let _0xm=_0xreq.method;
    let _0xb=_0xm!=="GET"&&_0xm!=="HEAD";

    return await fetch(_0xt,{
      method:_0xm,
      headers:_0xh,
      body:_0xb?_0xreq.body:void 0,
      duplex:"half",
      redirect:"manual"
    });

  }catch(_0xe){

    console.error("relay error:",_0xe);

    return new Response("Bad Gateway: Tunnel Failed",{status:502});
  }
}
