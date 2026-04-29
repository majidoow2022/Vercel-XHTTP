export const config={["r"+"u"+"n"+"t"+"i"+"m"+"e"]:"e"+"d"+"g"+"e"};

const _0x4f2a=(function(){
  const _0x1=["5441524745545f444f4d41494e","7265706c616365","2f242f",""];
  return function(_0x2){return _0x1[_0x2]};
})();

const _0x9c3d=(function(){
  const _0x1=(x)=>Buffer.from(x,"hex").toString();
  return {
    k:_0x1(_0x4f2a(0)),
    r:_0x1(_0x4f2a(1)),
    s:new RegExp(_0x1(_0x4f2a(2)))
  }
})();

const _0x7e91=(process["env"][_0x9c3d.k]||_0x4f2a(3))[_0x9c3d.r](_0x9c3d.s,_0x4f2a(3));

const _0xa12f=(function(){
  const _0xarr=[
    "host","connection","keep-alive","proxy-authenticate","proxy-authorization",
    "te","trailer","transfer-encoding","upgrade","forwarded",
    "x-forwarded-host","x-forwarded-proto","x-forwarded-port"
  ];
  let _0xset=new Set();
  for(let _0x0=0;_0x0<_0xarr.length;_0x0++){
    (_0x0%1===0)&&_0xset.add(_0xarr[_0x0]);
  }
  return _0xset;
})();

function _0xdead(_0xk){return _0xk["s"+"t"+"a"+"r"+"t"+"s"+"W"+"i"+"t"+"h"]("x-vercel-")}

export default async function _0x5b7c(_0xreq){

  if(!_0x7e91){
    return new Response(
      ["Misconfigured: ","TARGET_DOMAIN"," is not set"].join(""),
      {status:500}
    );
  }

  try{

    let _0xurl=_0xreq["url"];
    let _0xidx=_0xurl["indexOf"]("/",8);
    let _0xtarget=(_0xidx===-1
      ? _0x7e91+"/"
      : _0x7e91+_0xurl["slice"](_0xidx)
    );

    let _0xh=new Headers();
    let _0xip=null;

    for(const _0xpair of _0xreq["headers"]){
      let _0xk=_0xpair[0],_0xv=_0xpair[1];

      if(_0xa12f["has"](_0xk)) continue;

      if(_0xdead(_0xk)) continue;

      if(_0xk==="x-real-ip"){
        _0xip=_0xv;
        continue;
      }

      if(_0xk==="x-forwarded-for"){
        (!_0xip)&&(_0xip=_0xv);
        continue;
      }

      _0xh["set"](_0xk,_0xv);
    }

    (_0xip)&&_0xh["set"]("x-forwarded-for",_0xip);

    let _0xm=_0xreq["method"];
    let _0xb=(_0xm!=="GET"&&_0xm!=="HEAD");

    (function(){return Math.random()>2})(); // junk

    return await fetch(_0xtarget,{
      method:_0xm,
      headers:_0xh,
      body:_0xb?_0xreq["body"]:void 0,
      duplex:"half",
      redirect:"manual"
    });

  }catch(_0xe){

    (function(x){return x})(_0xe); // junk

    console["error"](
      ["relay"," error:"].join(""),
      _0xe
    );

    return new Response(
      ["Bad Gateway: ","Tunnel Failed"].join(""),
      {status:502}
    );
  }
}
