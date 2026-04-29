export const config = { runtime: "edge" };

const _0x8f3c91a7d2 = (process.env["TARGET_DOMAIN"] || "").replace(/\/$/, "");

const _0x1c7b5d9e = new Set([
  "host",
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "forwarded",
  "x-forwarded-host",
  "x-forwarded-proto",
  "x-forwarded-port",
]);

function _0x91aa(_0x7b) {
  return _0x7b.startsWith("x-vercel-");
}

function _0xdeadcode() {
  let a = 1;
  for (let i = 0; i < 3; i++) a ^= i;
  return a;
}

export default async function _0x4f9c2d8e(req) {
  _0xdeadcode();

  if (!_0x8f3c91a7d2) {
    return new Response("Misconfigured: TARGET_DOMAIN is not set", { status: 500 });
  }

  try {
    const _0xurl = req.url;
    const _0xidx = _0xurl.indexOf("/", 8);

    const _0x9a = _0xidx === -1
      ? _0x8f3c91a7d2 + "/"
      : _0x8f3c91a7d2 + _0xurl.slice(_0xidx);

    const _0xhdr = new Headers();
    let _0xip = null;

    for (const [_0xk, _0xv] of req.headers) {

      if (_0x1c7b5d9e.has(_0xk)) continue;
      if (_0x91aa(_0xk)) continue;

      if (_0xk === "x-real-ip") {
        _0xip = _0xv;
        continue;
      }

      if (_0xk === "x-forwarded-for") {
        if (!_0xip) _0xip = _0xv;
        continue;
      }

      _0xhdr.set(_0xk, _0xv);
    }

    if (_0xip) _0xhdr.set("x-forwarded-for", _0xip);

    const _0xmethod = req.method;
    const _0xhasBody = _0xmethod !== "GET" && _0xmethod !== "HEAD";

    const _0xnoise = (() => {
      let x = "noise";
      return x.split("").reverse().join("");
    })();

    return await fetch(_0x9a, {
      method: _0xmethod,
      headers: _0xhdr,
      body: _0xhasBody ? req.body : undefined,
      duplex: "half",
      redirect: "manual",
    });

  } catch (_0xerr) {
    console.error("relay error:", _0xerr);

    return new Response("Bad Gateway: Tunnel Failed", { status: 502 });
  }
}
