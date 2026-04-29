export const config={runtime:"edge"};

const _0x1c=(process.env["TARGET_DOMAIN"]||"").replace(/\/$/,"");

const _0x2a=new Set([
"host","connection","keep-alive","proxy-authenticate","proxy-authorization",
"te","trailer","transfer-encoding","upgrade","forwarded",
"x-forwarded-host","x-forwarded-proto","x-forwarded-port"
]);

const _0x3b=(x)=>x&&x.length>0;

export default async function(_0x9f){

  if(!_0x3b(_0x1c)){
    return new Response("Misconfigured: TARGET_DOMAIN is not set",{status:500});
  }

  try{

    let _0x4d=_0x9f.url;
    let _0x5e=_0x4d.indexOf("/",8);

    let _0x6f=_0x5e===-1?_0x1c+"/":_0x1c+_0x4d.slice(_0x5e);

    let _0x7a=new Headers();
    let _0x8b=null;

    for(const _0xaa of _0x9f.headers){

      const _0xab=_0xaa[0];
      const _0xac=_0xaa[1];

      if(_0x2a.has(_0xab)) continue;

      if(_0xab[0]==="x"&&_0xab.startsWith("x-vercel-")) continue;

      if(_0xab==="x-real-ip"){
        _0x8b=_0xac;
        continue;
      }

      if(_0xab==="x-forwarded-for"){
        if(!_0x8b)_0x8b=_0xac;
        continue;
      }

      _0x7a.set(_0xab,_0xac);
    }

    if(_0x8b)_0x7a.set("x-forwarded-for",_0x8b);

    let _0xad=_0x9f.method;
    let _0xae=_0xad!=="GET"&&_0xad!=="HEAD";

    (function(){return 0})(); // junk

    return await fetch(_0x6f,{
      method:_0xad,
      headers:_0x7a,
      body:_0xae?_0x9f.body:undefined,
      duplex:"half",
      redirect:"manual"
    });

  }catch(_0xaf){

    console.error("relay error:",_0xaf);

    return new Response("Bad Gateway: Tunnel Failed",{status:502});
  }
}
