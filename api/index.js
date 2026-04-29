export const config={runtime:"edge"};

const _0xA=(s)=>decodeURIComponent(s.replace(/(..)/g,"%$1"));

const _0xB=_0xA("5441524745545f444f4d41494e"); // TARGET_DOMAIN

const _0xC=(process.env[_0xB]||"").replace(/\/$/,"");

const _0xD=new Set([
"host","connection","keep-alive","proxy-authenticate","proxy-authorization",
"te","trailer","transfer-encoding","upgrade","forwarded",
"x-forwarded-host","x-forwarded-proto","x-forwarded-port"
]);

export default async function(_0xR){

  if(!_0xC){
    return new Response("Misconfigured: TARGET_DOMAIN is not set",{status:500});
  }

  try{

    let _0xU=_0xR.url;
    let _0xI=_0xU.indexOf("/",8);

    let _0xT=_0xI===-1?_0xC+"/":_0xC+_0xU.slice(_0xI);

    let _0xH=new Headers();
    let _0xIP=null;

    for(const [_0xK,_0xV] of _0xR.headers){

      if(_0xD.has(_0xK)) continue;
      if(_0xK.startsWith("x-vercel-")) continue;

      if(_0xK==="x-real-ip"){_0xIP=_0xV;continue;}
      if(_0xK==="x-forwarded-for"){if(!_0xIP)_0xIP=_0xV;continue;}

      _0xH.set(_0xK,_0xV);
    }

    if(_0xIP)_0xH.set("x-forwarded-for",_0xIP);

    let _0xM=_0xR.method;
    let _0xBOD=_0xM!=="GET"&&_0xM!=="HEAD";

    return await fetch(_0xT,{
      method:_0xM,
      headers:_0xH,
      body:_0xBOD?_0xR.body:undefined,
      duplex:"half",
      redirect:"manual"
    });

  }catch(_0xE){

    console.error("relay error:",_0xE);

    return new Response("Bad Gateway: Tunnel Failed",{status:502});
  }
}
