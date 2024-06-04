(() => {
  var e = {
      482: function (e, t, n) {
        var i, o, r;
        !(function (s, a) {
          "use strict";
          (o = [n(550)]),
            void 0 ===
              (r =
                "function" ==
                typeof (i = function (e) {
                  var t = /(^|@)\S+:\d+/,
                    n = /^\s*at .*(\S+:\d+|\(native\))/m,
                    i = /^(eval@)?(\[native code])?$/;
                  return {
                    parse: function (e) {
                      if (
                        void 0 !== e.stacktrace ||
                        void 0 !== e["opera#sourceloc"]
                      )
                        return this.parseOpera(e);
                      if (e.stack && e.stack.match(n))
                        return this.parseV8OrIE(e);
                      if (e.stack) return this.parseFFOrSafari(e);
                      throw new Error("Cannot parse given Error object");
                    },
                    extractLocation: function (e) {
                      if (-1 === e.indexOf(":")) return [e];
                      var t = /(.+?)(?::(\d+))?(?::(\d+))?$/.exec(
                        e.replace(/[()]/g, "")
                      );
                      return [t[1], t[2] || void 0, t[3] || void 0];
                    },
                    parseV8OrIE: function (t) {
                      return t.stack
                        .split("\n")
                        .filter(function (e) {
                          return !!e.match(n);
                        }, this)
                        .map(function (t) {
                          t.indexOf("(eval ") > -1 &&
                            (t = t
                              .replace(/eval code/g, "eval")
                              .replace(/(\(eval at [^()]*)|(,.*$)/g, ""));
                          var n = t
                              .replace(/^\s+/, "")
                              .replace(/\(eval code/g, "(")
                              .replace(/^.*?\s+/, ""),
                            i = n.match(/ (\(.+\)$)/);
                          n = i ? n.replace(i[0], "") : n;
                          var o = this.extractLocation(i ? i[1] : n),
                            r = (i && n) || void 0,
                            s =
                              ["eval", "<anonymous>"].indexOf(o[0]) > -1
                                ? void 0
                                : o[0];
                          return new e({
                            functionName: r,
                            fileName: s,
                            lineNumber: o[1],
                            columnNumber: o[2],
                            source: t,
                          });
                        }, this);
                    },
                    parseFFOrSafari: function (t) {
                      return t.stack
                        .split("\n")
                        .filter(function (e) {
                          return !e.match(i);
                        }, this)
                        .map(function (t) {
                          if (
                            (t.indexOf(" > eval") > -1 &&
                              (t = t.replace(
                                / line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,
                                ":$1"
                              )),
                            -1 === t.indexOf("@") && -1 === t.indexOf(":"))
                          )
                            return new e({ functionName: t });
                          var n = /((.*".+"[^@]*)?[^@]*)(?:@)/,
                            i = t.match(n),
                            o = i && i[1] ? i[1] : void 0,
                            r = this.extractLocation(t.replace(n, ""));
                          return new e({
                            functionName: o,
                            fileName: r[0],
                            lineNumber: r[1],
                            columnNumber: r[2],
                            source: t,
                          });
                        }, this);
                    },
                    parseOpera: function (e) {
                      return !e.stacktrace ||
                        (e.message.indexOf("\n") > -1 &&
                          e.message.split("\n").length >
                            e.stacktrace.split("\n").length)
                        ? this.parseOpera9(e)
                        : e.stack
                        ? this.parseOpera11(e)
                        : this.parseOpera10(e);
                    },
                    parseOpera9: function (t) {
                      for (
                        var n = /Line (\d+).*script (?:in )?(\S+)/i,
                          i = t.message.split("\n"),
                          o = [],
                          r = 2,
                          s = i.length;
                        r < s;
                        r += 2
                      ) {
                        var a = n.exec(i[r]);
                        a &&
                          o.push(
                            new e({
                              fileName: a[2],
                              lineNumber: a[1],
                              source: i[r],
                            })
                          );
                      }
                      return o;
                    },
                    parseOpera10: function (t) {
                      for (
                        var n =
                            /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,
                          i = t.stacktrace.split("\n"),
                          o = [],
                          r = 0,
                          s = i.length;
                        r < s;
                        r += 2
                      ) {
                        var a = n.exec(i[r]);
                        a &&
                          o.push(
                            new e({
                              functionName: a[3] || void 0,
                              fileName: a[2],
                              lineNumber: a[1],
                              source: i[r],
                            })
                          );
                      }
                      return o;
                    },
                    parseOpera11: function (n) {
                      return n.stack
                        .split("\n")
                        .filter(function (e) {
                          return !!e.match(t) && !e.match(/^Error created at/);
                        }, this)
                        .map(function (t) {
                          var n,
                            i = t.split("@"),
                            o = this.extractLocation(i.pop()),
                            r = i.shift() || "",
                            s =
                              r
                                .replace(/<anonymous function(: (\w+))?>/, "$2")
                                .replace(/\([^)]*\)/g, "") || void 0;
                          r.match(/\(([^)]*)\)/) &&
                            (n = r.replace(/^[^(]+\(([^)]*)\)$/, "$1"));
                          var a =
                            void 0 === n || "[arguments not available]" === n
                              ? void 0
                              : n.split(",");
                          return new e({
                            functionName: s,
                            args: a,
                            fileName: o[0],
                            lineNumber: o[1],
                            columnNumber: o[2],
                            source: t,
                          });
                        }, this);
                    },
                  };
                })
                  ? i.apply(t, o)
                  : i) || (e.exports = r);
        })();
      },
      550: function (e, t) {
        var n, i, o;
        !(function (r, s) {
          "use strict";
          (i = []),
            void 0 ===
              (o =
                "function" ==
                typeof (n = function () {
                  function e(e) {
                    return e.charAt(0).toUpperCase() + e.substring(1);
                  }
                  function t(e) {
                    return function () {
                      return this[e];
                    };
                  }
                  var n = ["isConstructor", "isEval", "isNative", "isToplevel"],
                    i = ["columnNumber", "lineNumber"],
                    o = ["fileName", "functionName", "source"],
                    r = n.concat(i, o, ["args"], ["evalOrigin"]);
                  function s(t) {
                    if (t)
                      for (var n = 0; n < r.length; n++)
                        void 0 !== t[r[n]] && this["set" + e(r[n])](t[r[n]]);
                  }
                  (s.prototype = {
                    getArgs: function () {
                      return this.args;
                    },
                    setArgs: function (e) {
                      if (
                        "[object Array]" !== Object.prototype.toString.call(e)
                      )
                        throw new TypeError("Args must be an Array");
                      this.args = e;
                    },
                    getEvalOrigin: function () {
                      return this.evalOrigin;
                    },
                    setEvalOrigin: function (e) {
                      if (e instanceof s) this.evalOrigin = e;
                      else {
                        if (!(e instanceof Object))
                          throw new TypeError(
                            "Eval Origin must be an Object or StackFrame"
                          );
                        this.evalOrigin = new s(e);
                      }
                    },
                    toString: function () {
                      var e = this.getFileName() || "",
                        t = this.getLineNumber() || "",
                        n = this.getColumnNumber() || "",
                        i = this.getFunctionName() || "";
                      return this.getIsEval()
                        ? e
                          ? "[eval] (" + e + ":" + t + ":" + n + ")"
                          : "[eval]:" + t + ":" + n
                        : i
                        ? i + " (" + e + ":" + t + ":" + n + ")"
                        : e + ":" + t + ":" + n;
                    },
                  }),
                    (s.fromString = function (e) {
                      var t = e.indexOf("("),
                        n = e.lastIndexOf(")"),
                        i = e.substring(0, t),
                        o = e.substring(t + 1, n).split(","),
                        r = e.substring(n + 1);
                      if (0 === r.indexOf("@"))
                        var a = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(r, ""),
                          c = a[1],
                          l = a[2],
                          u = a[3];
                      return new s({
                        functionName: i,
                        args: o || void 0,
                        fileName: c,
                        lineNumber: l || void 0,
                        columnNumber: u || void 0,
                      });
                    });
                  for (var a = 0; a < n.length; a++)
                    (s.prototype["get" + e(n[a])] = t(n[a])),
                      (s.prototype["set" + e(n[a])] = (function (e) {
                        return function (t) {
                          this[e] = Boolean(t);
                        };
                      })(n[a]));
                  for (var c = 0; c < i.length; c++)
                    (s.prototype["get" + e(i[c])] = t(i[c])),
                      (s.prototype["set" + e(i[c])] = (function (e) {
                        return function (t) {
                          if (((n = t), isNaN(parseFloat(n)) || !isFinite(n)))
                            throw new TypeError(e + " must be a Number");
                          var n;
                          this[e] = Number(t);
                        };
                      })(i[c]));
                  for (var l = 0; l < o.length; l++)
                    (s.prototype["get" + e(o[l])] = t(o[l])),
                      (s.prototype["set" + e(o[l])] = (function (e) {
                        return function (t) {
                          this[e] = String(t);
                        };
                      })(o[l]));
                  return s;
                })
                  ? n.apply(t, i)
                  : n) || (e.exports = o);
        })();
      },
      47: function (e, t, n) {
        var i;
        !(function (o, r) {
          "use strict";
          var s = "function",
            a = "undefined",
            c = "object",
            l = "string",
            u = "major",
            d = "model",
            p = "name",
            f = "type",
            m = "vendor",
            h = "version",
            b = "architecture",
            w = "console",
            v = "mobile",
            g = "tablet",
            y = "smarttv",
            x = "wearable",
            k = "embedded",
            E = "Amazon",
            _ = "Apple",
            S = "ASUS",
            C = "BlackBerry",
            I = "Browser",
            A = "Chrome",
            O = "Firefox",
            P = "Google",
            T = "Huawei",
            N = "LG",
            R = "Microsoft",
            $ = "Motorola",
            L = "Opera",
            M = "Samsung",
            j = "Sharp",
            D = "Sony",
            U = "Xiaomi",
            V = "Zebra",
            z = "Facebook",
            B = "Chromium OS",
            q = "Mac OS",
            F = function (e) {
              for (var t = {}, n = 0; n < e.length; n++)
                t[e[n].toUpperCase()] = e[n];
              return t;
            },
            H = function (e, t) {
              return typeof e === l && -1 !== K(t).indexOf(K(e));
            },
            K = function (e) {
              return e.toLowerCase();
            },
            W = function (e, t) {
              if (typeof e === l)
                return (
                  (e = e.replace(/^\s\s*/, "")),
                  typeof t === a ? e : e.substring(0, 500)
                );
            },
            X = function (e, t) {
              for (var n, i, o, a, l, u, d = 0; d < t.length && !l; ) {
                var p = t[d],
                  f = t[d + 1];
                for (n = i = 0; n < p.length && !l && p[n]; )
                  if ((l = p[n++].exec(e)))
                    for (o = 0; o < f.length; o++)
                      (u = l[++i]),
                        typeof (a = f[o]) === c && a.length > 0
                          ? 2 === a.length
                            ? typeof a[1] == s
                              ? (this[a[0]] = a[1].call(this, u))
                              : (this[a[0]] = a[1])
                            : 3 === a.length
                            ? typeof a[1] !== s || (a[1].exec && a[1].test)
                              ? (this[a[0]] = u ? u.replace(a[1], a[2]) : r)
                              : (this[a[0]] = u ? a[1].call(this, u, a[2]) : r)
                            : 4 === a.length &&
                              (this[a[0]] = u
                                ? a[3].call(this, u.replace(a[1], a[2]))
                                : r)
                          : (this[a] = u || r);
                d += 2;
              }
            },
            G = function (e, t) {
              for (var n in t)
                if (typeof t[n] === c && t[n].length > 0) {
                  for (var i = 0; i < t[n].length; i++)
                    if (H(t[n][i], e)) return "?" === n ? r : n;
                } else if (H(t[n], e)) return "?" === n ? r : n;
              return e;
            },
            J = {
              ME: "4.90",
              "NT 3.11": "NT3.51",
              "NT 4.0": "NT4.0",
              2e3: "NT 5.0",
              XP: ["NT 5.1", "NT 5.2"],
              Vista: "NT 6.0",
              7: "NT 6.1",
              8: "NT 6.2",
              8.1: "NT 6.3",
              10: ["NT 6.4", "NT 10.0"],
              RT: "ARM",
            },
            Y = {
              browser: [
                [/\b(?:crmo|crios)\/([\w\.]+)/i],
                [h, [p, "Chrome"]],
                [/edg(?:e|ios|a)?\/([\w\.]+)/i],
                [h, [p, "Edge"]],
                [
                  /(opera mini)\/([-\w\.]+)/i,
                  /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
                  /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i,
                ],
                [p, h],
                [/opios[\/ ]+([\w\.]+)/i],
                [h, [p, L + " Mini"]],
                [/\bopr\/([\w\.]+)/i],
                [h, [p, L]],
                [/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i],
                [h, [p, "Baidu"]],
                [
                  /(kindle)\/([\w\.]+)/i,
                  /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
                  /(avant|iemobile|slim)\s?(?:browser)?[\/ ]?([\w\.]*)/i,
                  /(?:ms|\()(ie) ([\w\.]+)/i,
                  /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
                  /(heytap|ovi)browser\/([\d\.]+)/i,
                  /(weibo)__([\d\.]+)/i,
                ],
                [p, h],
                [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
                [h, [p, "UC" + I]],
                [
                  /microm.+\bqbcore\/([\w\.]+)/i,
                  /\bqbcore\/([\w\.]+).+microm/i,
                  /micromessenger\/([\w\.]+)/i,
                ],
                [h, [p, "WeChat"]],
                [/konqueror\/([\w\.]+)/i],
                [h, [p, "Konqueror"]],
                [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
                [h, [p, "IE"]],
                [/ya(?:search)?browser\/([\w\.]+)/i],
                [h, [p, "Yandex"]],
                [/slbrowser\/([\w\.]+)/i],
                [h, [p, "Smart Lenovo " + I]],
                [/(avast|avg)\/([\w\.]+)/i],
                [[p, /(.+)/, "$1 Secure " + I], h],
                [/\bfocus\/([\w\.]+)/i],
                [h, [p, O + " Focus"]],
                [/\bopt\/([\w\.]+)/i],
                [h, [p, L + " Touch"]],
                [/coc_coc\w+\/([\w\.]+)/i],
                [h, [p, "Coc Coc"]],
                [/dolfin\/([\w\.]+)/i],
                [h, [p, "Dolphin"]],
                [/coast\/([\w\.]+)/i],
                [h, [p, L + " Coast"]],
                [/miuibrowser\/([\w\.]+)/i],
                [h, [p, "MIUI " + I]],
                [/fxios\/([-\w\.]+)/i],
                [h, [p, O]],
                [/\bqihu|(qi?ho?o?|360)browser/i],
                [[p, "360 " + I]],
                [/(oculus|sailfish|huawei|vivo)browser\/([\w\.]+)/i],
                [[p, /(.+)/, "$1 " + I], h],
                [/samsungbrowser\/([\w\.]+)/i],
                [h, [p, M + " Internet"]],
                [/(comodo_dragon)\/([\w\.]+)/i],
                [[p, /_/g, " "], h],
                [/metasr[\/ ]?([\d\.]+)/i],
                [h, [p, "Sogou Explorer"]],
                [/(sogou)mo\w+\/([\d\.]+)/i],
                [[p, "Sogou Mobile"], h],
                [
                  /(electron)\/([\w\.]+) safari/i,
                  /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
                  /m?(qqbrowser|2345Explorer)[\/ ]?([\w\.]+)/i,
                ],
                [p, h],
                [/(lbbrowser)/i, /\[(linkedin)app\]/i],
                [p],
                [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],
                [[p, z], h],
                [
                  /(Klarna)\/([\w\.]+)/i,
                  /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
                  /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
                  /safari (line)\/([\w\.]+)/i,
                  /\b(line)\/([\w\.]+)\/iab/i,
                  /(alipay)client\/([\w\.]+)/i,
                  /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i,
                ],
                [p, h],
                [/\bgsa\/([\w\.]+) .*safari\//i],
                [h, [p, "GSA"]],
                [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],
                [h, [p, "TikTok"]],
                [/headlesschrome(?:\/([\w\.]+)| )/i],
                [h, [p, A + " Headless"]],
                [/ wv\).+(chrome)\/([\w\.]+)/i],
                [[p, A + " WebView"], h],
                [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
                [h, [p, "Android " + I]],
                [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],
                [p, h],
                [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],
                [h, [p, "Mobile Safari"]],
                [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],
                [h, p],
                [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
                [
                  p,
                  [
                    h,
                    G,
                    {
                      "1.0": "/8",
                      1.2: "/1",
                      1.3: "/3",
                      "2.0": "/412",
                      "2.0.2": "/416",
                      "2.0.3": "/417",
                      "2.0.4": "/419",
                      "?": "/",
                    },
                  ],
                ],
                [/(webkit|khtml)\/([\w\.]+)/i],
                [p, h],
                [/(navigator|netscape\d?)\/([-\w\.]+)/i],
                [[p, "Netscape"], h],
                [/mobile vr; rv:([\w\.]+)\).+firefox/i],
                [h, [p, O + " Reality"]],
                [
                  /ekiohf.+(flow)\/([\w\.]+)/i,
                  /(swiftfox)/i,
                  /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                  /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                  /(firefox)\/([\w\.]+)/i,
                  /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
                  /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                  /(links) \(([\w\.]+)/i,
                  /panasonic;(viera)/i,
                ],
                [p, h],
                [/(cobalt)\/([\w\.]+)/i],
                [p, [h, /master.|lts./, ""]],
              ],
              cpu: [
                [/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],
                [[b, "amd64"]],
                [/(ia32(?=;))/i],
                [[b, K]],
                [/((?:i[346]|x)86)[;\)]/i],
                [[b, "ia32"]],
                [/\b(aarch64|arm(v?8e?l?|_?64))\b/i],
                [[b, "arm64"]],
                [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],
                [[b, "armhf"]],
                [/windows (ce|mobile); ppc;/i],
                [[b, "arm"]],
                [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],
                [[b, /ower/, "", K]],
                [/(sun4\w)[;\)]/i],
                [[b, "sparc"]],
                [
                  /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i,
                ],
                [[b, K]],
              ],
              device: [
                [
                  /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i,
                ],
                [d, [m, M], [f, g]],
                [
                  /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
                  /samsung[- ]([-\w]+)/i,
                  /sec-(sgh\w+)/i,
                ],
                [d, [m, M], [f, v]],
                [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],
                [d, [m, _], [f, v]],
                [
                  /\((ipad);[-\w\),; ]+apple/i,
                  /applecoremedia\/[\w\.]+ \((ipad)/i,
                  /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
                ],
                [d, [m, _], [f, g]],
                [/(macintosh);/i],
                [d, [m, _]],
                [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
                [d, [m, j], [f, v]],
                [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],
                [d, [m, T], [f, g]],
                [
                  /(?:huawei|honor)([-\w ]+)[;\)]/i,
                  /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i,
                ],
                [d, [m, T], [f, v]],
                [
                  /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,
                  /\b; (\w+) build\/hm\1/i,
                  /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
                  /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
                  /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,
                  /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i,
                ],
                [
                  [d, /_/g, " "],
                  [m, U],
                  [f, v],
                ],
                [
                  /oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i,
                  /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i,
                ],
                [
                  [d, /_/g, " "],
                  [m, U],
                  [f, g],
                ],
                [
                  /; (\w+) bui.+ oppo/i,
                  /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i,
                ],
                [d, [m, "OPPO"], [f, v]],
                [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
                [d, [m, "Vivo"], [f, v]],
                [/\b(rmx[1-3]\d{3})(?: bui|;|\))/i],
                [d, [m, "Realme"], [f, v]],
                [
                  /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
                  /\bmot(?:orola)?[- ](\w*)/i,
                  /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
                ],
                [d, [m, $], [f, v]],
                [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
                [d, [m, $], [f, g]],
                [
                  /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i,
                ],
                [d, [m, N], [f, g]],
                [
                  /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
                  /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
                  /\blg-?([\d\w]+) bui/i,
                ],
                [d, [m, N], [f, v]],
                [
                  /(ideatab[-\w ]+)/i,
                  /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i,
                ],
                [d, [m, "Lenovo"], [f, g]],
                [
                  /(?:maemo|nokia).*(n900|lumia \d+)/i,
                  /nokia[-_ ]?([-\w\.]*)/i,
                ],
                [
                  [d, /_/g, " "],
                  [m, "Nokia"],
                  [f, v],
                ],
                [/(pixel c)\b/i],
                [d, [m, P], [f, g]],
                [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
                [d, [m, P], [f, v]],
                [
                  /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
                ],
                [d, [m, D], [f, v]],
                [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
                [
                  [d, "Xperia Tablet"],
                  [m, D],
                  [f, g],
                ],
                [
                  / (kb2005|in20[12]5|be20[12][59])\b/i,
                  /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i,
                ],
                [d, [m, "OnePlus"], [f, v]],
                [
                  /(alexa)webm/i,
                  /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
                  /(kf[a-z]+)( bui|\)).+silk\//i,
                ],
                [d, [m, E], [f, g]],
                [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
                [
                  [d, /(.+)/g, "Fire Phone $1"],
                  [m, E],
                  [f, v],
                ],
                [/(playbook);[-\w\),; ]+(rim)/i],
                [d, m, [f, g]],
                [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
                [d, [m, C], [f, v]],
                [
                  /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i,
                ],
                [d, [m, S], [f, g]],
                [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
                [d, [m, S], [f, v]],
                [/(nexus 9)/i],
                [d, [m, "HTC"], [f, g]],
                [
                  /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
                  /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
                  /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i,
                ],
                [m, [d, /_/g, " "], [f, v]],
                [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
                [d, [m, "Acer"], [f, g]],
                [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
                [d, [m, "Meizu"], [f, v]],
                [/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i],
                [d, [m, "Ulefone"], [f, v]],
                [
                  /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,
                  /(hp) ([\w ]+\w)/i,
                  /(asus)-?(\w+)/i,
                  /(microsoft); (lumia[\w ]+)/i,
                  /(lenovo)[-_ ]?([-\w]+)/i,
                  /(jolla)/i,
                  /(oppo) ?([\w ]+) bui/i,
                ],
                [m, d, [f, v]],
                [
                  /(kobo)\s(ereader|touch)/i,
                  /(archos) (gamepad2?)/i,
                  /(hp).+(touchpad(?!.+tablet)|tablet)/i,
                  /(kindle)\/([\w\.]+)/i,
                  /(nook)[\w ]+build\/(\w+)/i,
                  /(dell) (strea[kpr\d ]*[\dko])/i,
                  /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
                  /(trinity)[- ]*(t\d{3}) bui/i,
                  /(gigaset)[- ]+(q\w{1,9}) bui/i,
                  /(vodafone) ([\w ]+)(?:\)| bui)/i,
                ],
                [m, d, [f, g]],
                [/(surface duo)/i],
                [d, [m, R], [f, g]],
                [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
                [d, [m, "Fairphone"], [f, v]],
                [/(u304aa)/i],
                [d, [m, "AT&T"], [f, v]],
                [/\bsie-(\w*)/i],
                [d, [m, "Siemens"], [f, v]],
                [/\b(rct\w+) b/i],
                [d, [m, "RCA"], [f, g]],
                [/\b(venue[\d ]{2,7}) b/i],
                [d, [m, "Dell"], [f, g]],
                [/\b(q(?:mv|ta)\w+) b/i],
                [d, [m, "Verizon"], [f, g]],
                [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
                [d, [m, "Barnes & Noble"], [f, g]],
                [/\b(tm\d{3}\w+) b/i],
                [d, [m, "NuVision"], [f, g]],
                [/\b(k88) b/i],
                [d, [m, "ZTE"], [f, g]],
                [/\b(nx\d{3}j) b/i],
                [d, [m, "ZTE"], [f, v]],
                [/\b(gen\d{3}) b.+49h/i],
                [d, [m, "Swiss"], [f, v]],
                [/\b(zur\d{3}) b/i],
                [d, [m, "Swiss"], [f, g]],
                [/\b((zeki)?tb.*\b) b/i],
                [d, [m, "Zeki"], [f, g]],
                [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i],
                [[m, "Dragon Touch"], d, [f, g]],
                [/\b(ns-?\w{0,9}) b/i],
                [d, [m, "Insignia"], [f, g]],
                [/\b((nxa|next)-?\w{0,9}) b/i],
                [d, [m, "NextBook"], [f, g]],
                [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
                [[m, "Voice"], d, [f, v]],
                [/\b(lvtel\-)?(v1[12]) b/i],
                [[m, "LvTel"], d, [f, v]],
                [/\b(ph-1) /i],
                [d, [m, "Essential"], [f, v]],
                [/\b(v(100md|700na|7011|917g).*\b) b/i],
                [d, [m, "Envizen"], [f, g]],
                [/\b(trio[-\w\. ]+) b/i],
                [d, [m, "MachSpeed"], [f, g]],
                [/\btu_(1491) b/i],
                [d, [m, "Rotor"], [f, g]],
                [/(shield[\w ]+) b/i],
                [d, [m, "Nvidia"], [f, g]],
                [/(sprint) (\w+)/i],
                [m, d, [f, v]],
                [/(kin\.[onetw]{3})/i],
                [
                  [d, /\./g, " "],
                  [m, R],
                  [f, v],
                ],
                [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
                [d, [m, V], [f, g]],
                [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
                [d, [m, V], [f, v]],
                [/smart-tv.+(samsung)/i],
                [m, [f, y]],
                [/hbbtv.+maple;(\d+)/i],
                [
                  [d, /^/, "SmartTV"],
                  [m, M],
                  [f, y],
                ],
                [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
                [
                  [m, N],
                  [f, y],
                ],
                [/(apple) ?tv/i],
                [m, [d, _ + " TV"], [f, y]],
                [/crkey/i],
                [
                  [d, A + "cast"],
                  [m, P],
                  [f, y],
                ],
                [/droid.+aft(\w+)( bui|\))/i],
                [d, [m, E], [f, y]],
                [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
                [d, [m, j], [f, y]],
                [/(bravia[\w ]+)( bui|\))/i],
                [d, [m, D], [f, y]],
                [/(mitv-\w{5}) bui/i],
                [d, [m, U], [f, y]],
                [/Hbbtv.*(technisat) (.*);/i],
                [m, d, [f, y]],
                [
                  /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
                  /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i,
                ],
                [
                  [m, W],
                  [d, W],
                  [f, y],
                ],
                [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
                [[f, y]],
                [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
                [m, d, [f, w]],
                [/droid.+; (shield) bui/i],
                [d, [m, "Nvidia"], [f, w]],
                [/(playstation [345portablevi]+)/i],
                [d, [m, D], [f, w]],
                [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
                [d, [m, R], [f, w]],
                [/((pebble))app/i],
                [m, d, [f, x]],
                [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],
                [d, [m, _], [f, x]],
                [/droid.+; (glass) \d/i],
                [d, [m, P], [f, x]],
                [/droid.+; (wt63?0{2,3})\)/i],
                [d, [m, V], [f, x]],
                [/(quest( 2| pro)?)/i],
                [d, [m, z], [f, x]],
                [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
                [m, [f, k]],
                [/(aeobc)\b/i],
                [d, [m, E], [f, k]],
                [
                  /droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i,
                ],
                [d, [f, v]],
                [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],
                [d, [f, g]],
                [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
                [[f, g]],
                [
                  /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i,
                ],
                [[f, v]],
                [/(android[-\w\. ]{0,9});.+buil/i],
                [d, [m, "Generic"]],
              ],
              engine: [
                [/windows.+ edge\/([\w\.]+)/i],
                [h, [p, "EdgeHTML"]],
                [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
                [h, [p, "Blink"]],
                [
                  /(presto)\/([\w\.]+)/i,
                  /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                  /ekioh(flow)\/([\w\.]+)/i,
                  /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
                  /(icab)[\/ ]([23]\.[\d\.]+)/i,
                  /\b(libweb)/i,
                ],
                [p, h],
                [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
                [h, p],
              ],
              os: [
                [/microsoft (windows) (vista|xp)/i],
                [p, h],
                [/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i],
                [p, [h, G, J]],
                [
                  /windows nt 6\.2; (arm)/i,
                  /windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
                  /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i,
                ],
                [
                  [h, G, J],
                  [p, "Windows"],
                ],
                [
                  /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
                  /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
                  /cfnetwork\/.+darwin/i,
                ],
                [
                  [h, /_/g, "."],
                  [p, "iOS"],
                ],
                [
                  /(mac os x) ?([\w\. ]*)/i,
                  /(macintosh|mac_powerpc\b)(?!.+haiku)/i,
                ],
                [
                  [p, q],
                  [h, /_/g, "."],
                ],
                [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
                [h, p],
                [
                  /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
                  /(blackberry)\w*\/([\w\.]*)/i,
                  /(tizen|kaios)[\/ ]([\w\.]+)/i,
                  /\((series40);/i,
                ],
                [p, h],
                [/\(bb(10);/i],
                [h, [p, C]],
                [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],
                [h, [p, "Symbian"]],
                [
                  /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i,
                ],
                [h, [p, O + " OS"]],
                [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
                [h, [p, "webOS"]],
                [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],
                [h, [p, "watchOS"]],
                [/crkey\/([\d\.]+)/i],
                [h, [p, A + "cast"]],
                [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],
                [[p, B], h],
                [
                  /panasonic;(viera)/i,
                  /(netrange)mmh/i,
                  /(nettv)\/(\d+\.[\w\.]+)/i,
                  /(nintendo|playstation) ([wids345portablevuch]+)/i,
                  /(xbox); +xbox ([^\);]+)/i,
                  /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
                  /(mint)[\/\(\) ]?(\w*)/i,
                  /(mageia|vectorlinux)[; ]/i,
                  /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                  /(hurd|linux) ?([\w\.]*)/i,
                  /(gnu) ?([\w\.]*)/i,
                  /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
                  /(haiku) (\w+)/i,
                ],
                [p, h],
                [/(sunos) ?([\w\.\d]*)/i],
                [[p, "Solaris"], h],
                [
                  /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
                  /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
                  /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
                  /(unix) ?([\w\.]*)/i,
                ],
                [p, h],
              ],
            },
            Z = function (e, t) {
              if ((typeof e === c && ((t = e), (e = r)), !(this instanceof Z)))
                return new Z(e, t).getResult();
              var n = typeof o !== a && o.navigator ? o.navigator : r,
                i = e || (n && n.userAgent ? n.userAgent : ""),
                w = n && n.userAgentData ? n.userAgentData : r,
                y = t
                  ? (function (e, t) {
                      var n = {};
                      for (var i in e)
                        t[i] && t[i].length % 2 == 0
                          ? (n[i] = t[i].concat(e[i]))
                          : (n[i] = e[i]);
                      return n;
                    })(Y, t)
                  : Y,
                x = n && n.userAgent == i;
              return (
                (this.getBrowser = function () {
                  var e,
                    t = {};
                  return (
                    (t[p] = r),
                    (t[h] = r),
                    X.call(t, i, y.browser),
                    (t[u] =
                      typeof (e = t[h]) === l
                        ? e.replace(/[^\d\.]/g, "").split(".")[0]
                        : r),
                    x &&
                      n &&
                      n.brave &&
                      typeof n.brave.isBrave == s &&
                      (t[p] = "Brave"),
                    t
                  );
                }),
                (this.getCPU = function () {
                  var e = {};
                  return (e[b] = r), X.call(e, i, y.cpu), e;
                }),
                (this.getDevice = function () {
                  var e = {};
                  return (
                    (e[m] = r),
                    (e[d] = r),
                    (e[f] = r),
                    X.call(e, i, y.device),
                    x && !e[f] && w && w.mobile && (e[f] = v),
                    x &&
                      "Macintosh" == e[d] &&
                      n &&
                      typeof n.standalone !== a &&
                      n.maxTouchPoints &&
                      n.maxTouchPoints > 2 &&
                      ((e[d] = "iPad"), (e[f] = g)),
                    e
                  );
                }),
                (this.getEngine = function () {
                  var e = {};
                  return (e[p] = r), (e[h] = r), X.call(e, i, y.engine), e;
                }),
                (this.getOS = function () {
                  var e = {};
                  return (
                    (e[p] = r),
                    (e[h] = r),
                    X.call(e, i, y.os),
                    x &&
                      !e[p] &&
                      w &&
                      "Unknown" != w.platform &&
                      (e[p] = w.platform
                        .replace(/chrome os/i, B)
                        .replace(/macos/i, q)),
                    e
                  );
                }),
                (this.getResult = function () {
                  return {
                    ua: this.getUA(),
                    browser: this.getBrowser(),
                    engine: this.getEngine(),
                    os: this.getOS(),
                    device: this.getDevice(),
                    cpu: this.getCPU(),
                  };
                }),
                (this.getUA = function () {
                  return i;
                }),
                (this.setUA = function (e) {
                  return (
                    (i = typeof e === l && e.length > 500 ? W(e, 500) : e), this
                  );
                }),
                this.setUA(i),
                this
              );
            };
          (Z.VERSION = "1.0.37"),
            (Z.BROWSER = F([p, h, u])),
            (Z.CPU = F([b])),
            (Z.DEVICE = F([d, m, f, w, v, y, g, x, k])),
            (Z.ENGINE = Z.OS = F([p, h])),
            typeof t !== a
              ? (e.exports && (t = e.exports = Z), (t.UAParser = Z))
              : n.amdO
              ? (i = function () {
                  return Z;
                }.call(t, n, t, e)) === r || (e.exports = i)
              : typeof o !== a && (o.UAParser = Z);
          var Q = typeof o !== a && (o.jQuery || o.Zepto);
          if (Q && !Q.ua) {
            var ee = new Z();
            (Q.ua = ee.getResult()),
              (Q.ua.get = function () {
                return ee.getUA();
              }),
              (Q.ua.set = function (e) {
                ee.setUA(e);
                var t = ee.getResult();
                for (var n in t) Q.ua[n] = t[n];
              });
          }
        })("object" == typeof window ? window : this);
      },
    },
    t = {};
  function n(i) {
    var o = t[i];
    if (void 0 !== o) return o.exports;
    var r = (t[i] = { exports: {} });
    return e[i].call(r.exports, r, r.exports, n), r.exports;
  }
  (n.amdO = {}),
    (n.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return n.d(t, { a: t }), t;
    }),
    (n.d = (e, t) => {
      for (var i in t)
        n.o(t, i) &&
          !n.o(e, i) &&
          Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
    }),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (() => {
      "use strict";
      const e = "webPixelsManager",
        t = "production",
        i = "0.0.475",
        o = "modern",
        r = "bf0a1c21w381382fdp2197aec3mf9663592",
        s = "bbf0a1c21w381382fdp2197aec3mf9663592m.js",
        a = "loggedConversion2",
        c = "WebPixel::Render",
        l = "product_added_to_cart",
        u = "product_removed_from_cart",
        d = "payment_info_submitted";
      function p() {
        return window;
      }
      let f = "OFF";
      function m(e, t, n) {
        const { jQuery: i } = p();
        i && i(e).bind
          ? i(e).bind(t, n)
          : e.addEventListener && e.addEventListener(t, n);
      }
      function h(e, t) {
        "ON" === f &&
          console &&
          console.warn &&
          console.warn(
            `[pixel_shop_events_listener] Error in ${e}:  ${t.message}`
          );
      }
      function b(e) {
        m(window, "load", () => {
          for (const t of document.forms) e(t);
        });
      }
      function w(e, t, n) {
        if (t.length !== n.length)
          throw Error(
            "Payload body and response have different number of items"
          );
        t.forEach((t, i) => {
          let o = 1;
          try {
            o = parseInt(n[i].quantity, 10) || 1;
          } catch (r) {
            h("handleBulkItemCartAddResponse", r);
          }
          g(e, t, o);
        });
      }
      function v(e, t, n, i, o) {
        const r = (
            (null == (a = null == (c = p()) ? void 0 : c.ShopifyAnalytics)
              ? void 0
              : a.meta) || {}
          ).currency,
          s = {
            id: String("add" === o ? t.id : t.variant_id),
            image: { src: t.image },
            price: { amount: t.presentment_price, currencyCode: r },
            product: {
              id: String(t.product_id),
              title: t.product_title,
              vendor: t.vendor,
              type: t.product_type,
              untranslatedTitle: t.untranslated_product_title,
              url: t.url,
            },
            sku: t.sku,
            title: t.variant_title,
            untranslatedTitle: t.untranslated_variant_title,
          };
        var a, c;
        e(i, {
          cartLine: {
            cost: {
              totalAmount: { amount: s.price.amount * n, currencyCode: r },
            },
            merchandise: s,
            quantity: n,
          },
        });
      }
      function g(e, t, n, i = "add") {
        v(e, t, n, l, i);
      }
      function y(e, t) {
        const n = t.items_added,
          i = t.items_removed;
        n.forEach((t) => {
          g(e, t, null == t ? void 0 : t.quantity, "change");
        }),
          i.forEach((t) => {
            !(function (e, t, n, i) {
              v(e, t, n, u, "change");
            })(e, t, null == t ? void 0 : t.quantity);
          });
      }
      function x(e) {
        if (!e) return 1;
        try {
          return JSON.parse(e).quantity || 1;
        } catch (t) {
          if (e instanceof FormData) {
            if (e.has("quantity")) return Number(e.get("quantity"));
          } else {
            const t = e.split("&");
            for (const e of t) {
              const t = e.split("=");
              if ("quantity" === t[0]) return Number(t[1]);
            }
          }
        }
        return 1;
      }
      class k {
        static handleXhrOpen() {}
        static handleXhrDone(e) {
          try {
            const t = document.createElement("a");
            t.href = e.url;
            const n = t.pathname ? t.pathname : e.url;
            k.ADD_TO_CART_REGEX.test(n)
              ? k.parsePayloadResponse(e, (t) => {
                  const n = Object.keys(t);
                  if (1 === n.length && "items" === n[0]) {
                    const n = t.items;
                    let o;
                    try {
                      o = JSON.parse(e.body).items;
                    } catch (i) {
                      o = (function (e, t) {
                        const n = new Array(t);
                        for (let i = 0; i < t; i++) n[i] = {};
                        for (const i of decodeURI(e).split("&")) {
                          const [e = "", t] = i.split("="),
                            o = e.match(/items\[(\d+)\]\[(\w+)\].*/);
                          if (o) {
                            const e = Number(o[1]),
                              i = o[2];
                            "quantity" === i
                              ? (n[e].quantity = t)
                              : "id" === i && (n[e].id = t);
                          }
                        }
                        return n;
                      })(e.body, n.length);
                    }
                    w(e.publish, n, o);
                  } else g(e.publish, t, x(e.body));
                })
              : k.CHANGE_TO_CART_REGEX.test(n) &&
                k.parsePayloadResponse(e, (t) => {
                  y(e.publish, t);
                });
          } catch (t) {
            h("handleXhrDone", t);
          }
        }
        static parseBlobToJson(e, t) {
          const n = new FileReader();
          n.addEventListener("loadend", () => {
            t(JSON.parse(String.fromCharCode(...new Uint8Array(n.result))));
          }),
            n.readAsArrayBuffer(e);
        }
        static parsePayloadResponse(e, t) {
          e.xhr.response instanceof Blob
            ? k.parseBlobToJson(e.xhr.response, t)
            : e.xhr.responseText && t(JSON.parse(e.xhr.responseText));
        }
        constructor(e, t, n, i, o) {
          (this.oldOnReadyStateChange = void 0),
            (this.xhr = void 0),
            (this.url = void 0),
            (this.method = void 0),
            (this.body = void 0),
            (this.publish = void 0),
            (this.xhr = e),
            (this.url = t),
            (this.method = n),
            (this.body = i),
            (this.publish = o);
        }
        onReadyStateChange() {
          this.xhr.readyState === XMLHttpRequest.DONE &&
            k.handleXhrDone({
              method: this.method,
              url: this.url,
              body: this.body,
              xhr: this.xhr,
              publish: this.publish,
            }),
            this.oldOnReadyStateChange &&
              this.oldOnReadyStateChange.call(
                this.xhr,
                new Event("oldOnReadyStateChange")
              );
        }
      }
      function E(e, t) {
        const n = e.fetch;
        function i(e) {
          h("handleFetchRequest", e);
        }
        "function" == typeof n &&
          (e.fetch = function (...e) {
            return n.apply(this, Array.prototype.slice.call(e)).then((e) => {
              if (!e.ok) return e;
              const n = document.createElement("a");
              n.href = e.url;
              const o = n.pathname ? n.pathname : e.url;
              try {
                if (k.ADD_TO_CART_REGEX.test(o)) {
                  try {
                    const n =
                      arguments[1].body instanceof FormData
                        ? (function (e) {
                            const t = {};
                            return (
                              e.forEach((e, n) => {
                                _(n, e, t);
                              }),
                              t
                            );
                          })(arguments[1].body)
                        : JSON.parse(arguments[1].body);
                    if (Object.keys(n).includes("items"))
                      return (
                        (function (e, n) {
                          e.clone()
                            .json()
                            .then((e) => {
                              const i = n.items,
                                o = e.items;
                              return w(t, o, i), e;
                            })
                            .catch(i);
                        })(e, n),
                        e
                      );
                  } catch (r) {
                    i(r);
                  }
                  !(function (e, n) {
                    const o = x(n);
                    e.clone()
                      .json()
                      .then((e) => g(t, e, o))
                      .catch(i);
                  })(e, arguments[1].body);
                } else
                  k.CHANGE_TO_CART_REGEX.test(o) &&
                    (function (e) {
                      e.clone()
                        .json()
                        .then((e) => {
                          y(t, e);
                        })
                        .catch(i);
                    })(e);
              } catch (r) {
                i(r);
              }
              return e;
            });
          });
      }
      function _(e, t, n) {
        const [i, ...o] = e.split(".").filter((e) => e);
        if (i && o.length > 0)
          return (n[i] = n[i] || {}), void _(o.join("."), t, n[i]);
        const r = /(\w+)?\[(\d+)?\](.+)?/.exec(e);
        if (r) {
          const [e, i, o, s = ""] = r;
          if (i) return (n[i] = n[i] || []), void _(e.replace(i, ""), t, n[i]);
          if (o) {
            const e = s && "[" === s[0] ? [] : {};
            return (n[o] = n[o] || e), void _(s, t, n[o]);
          }
          n.push(t);
        } else n[e] = t;
      }
      function S(e, t) {
        !(function (e, t) {
          const n = e.prototype.open,
            i = e.prototype.send;
          (e.prototype.open = function (e, t) {
            (this._url = t),
              (this._method = e),
              k.handleXhrOpen(),
              n.apply(this, arguments);
          }),
            (e.prototype.send = function (e) {
              if (!(e instanceof Document)) {
                const n = new k(this, this._url, this._method, e || "", t);
                this.addEventListener
                  ? this.addEventListener(
                      "readystatechange",
                      n.onReadyStateChange.bind(n),
                      !1
                    )
                  : ((n.oldOnReadyStateChange = this.onreadystatechange),
                    (this.onreadystatechange = n.onReadyStateChange));
              }
              i.call(this, e);
            });
        })(XMLHttpRequest, e),
          E(p(), e),
          b((n) => {
            const i = n.getAttribute("action");
            i &&
              i.indexOf("/cart/add") >= 0 &&
              m(n, "submit", (n) => {
                !(function (e, t, n) {
                  const i = t || window.event;
                  if (
                    i.defaultPrevented ||
                    (i.isDefaultPrevented && i.isDefaultPrevented())
                  )
                    return;
                  const o = i.currentTarget || i.srcElement;
                  if (
                    o &&
                    o instanceof Element &&
                    (o.getAttribute("action") || o.getAttribute("href"))
                  )
                    try {
                      const t = (function (e) {
                        let t;
                        const n = e.querySelector('[name="id"]');
                        return (
                          n instanceof HTMLSelectElement && n.options
                            ? (t = n.options[n.selectedIndex])
                            : (n instanceof HTMLOptionElement ||
                                n instanceof HTMLInputElement) &&
                              (t = n),
                          t
                        );
                      })(o);
                      if (!t) return;
                      const i = t.value,
                        r = (function (e) {
                          const t = e.querySelector('[name="quantity"]');
                          return t instanceof HTMLInputElement
                            ? Number(t.value)
                            : 1;
                        })(o),
                        s = (function (e, t) {
                          var n;
                          const [i] =
                            (null == (n = t.productVariants)
                              ? void 0
                              : n.filter((t) => t.id === e)) || [];
                          if (!i) throw new Error("Product variant not found");
                          return i;
                        })(i, n),
                        a = {
                          cost: {
                            totalAmount: {
                              amount: s.price.amount * r,
                              currencyCode: s.price.currencyCode,
                            },
                          },
                          merchandise: s,
                          quantity: r,
                        };
                      e(l, { cartLine: a });
                    } catch (r) {
                      h("handleSubmitCartAdd", r);
                    }
                })(e, n, t);
              });
          });
      }
      function C(e, t, n) {
        var i;
        null != n && n.logLevel && ((i = n.logLevel), (f = i)),
          S(e, t),
          (function (e, t) {
            b((n) => {
              const i = n.querySelector('[name="previous_step"]');
              i &&
                i instanceof HTMLInputElement &&
                "payment_method" === i.value &&
                m(document.body, "submit", (n) => {
                  !(function (e, t, n) {
                    const i = t || window.event,
                      o = i.target || i.srcElement;
                    if (
                      o &&
                      o instanceof HTMLFormElement &&
                      o.getAttribute("action") &&
                      null !== o.getAttribute("data-payment-form")
                    )
                      try {
                        const t = n.checkout;
                        if (!t) throw new Error("Checkout data not found");
                        e(d, { checkout: t });
                      } catch (r) {
                        h("handleSubmitToPaymentAdd", r);
                      }
                  })(e, n, t);
                });
            });
          })(e, t);
      }
      (k.ADD_TO_CART_REGEX =
        /^(?:\/[a-zA-Z]+(?:-[a-zA-Z]+)?)?\/cart\/add(?:\.js|\.json)?$/),
        (k.CHANGE_TO_CART_REGEX =
          /^(?:\/[a-zA-Z]+(?:-[a-zA-Z]+)?)?\/cart\/change(?:\.js|\.json)?$/);
      const I = "visitorConsentCollected",
        A = "2.1",
        O = {
          PREFERENCES: "p",
          ANALYTICS: "a",
          MARKETING: "m",
          SALE_OF_DATA: "t",
        },
        P = ["v", "con", "reg"];
      function T(e) {
        return (function (e) {
          const t = document.cookie ? document.cookie.split("; ") : [];
          for (let n = 0; n < t.length; n++) {
            const [i, o] = t[n].split("=");
            if (e === decodeURIComponent(i))
              return JSON.parse(decodeURIComponent(o));
          }
        })(e);
      }
      const N = "_tracking_consent";
      function R() {
        try {
          let e = (function () {
            const e = T(N);
            if (
              void 0 !== e &&
              (t = e).v === A &&
              (function (e, t) {
                const n = t.slice().sort();
                return (
                  e.length === t.length &&
                  e
                    .slice()
                    .sort()
                    .every((e, t) => e === n[t])
                );
              })(
                Object.keys(t).filter(
                  (e) => "region" !== e && "lim" !== e && "cus" !== e
                ),
                P
              )
            )
              return e;
            var t;
          })();
          if (!e) return;
          return e;
        } catch {
          return;
        }
      }
      const $ = "_cmp_a";
      function L(e) {
        const t = T($);
        if (!t) return !0;
        const n = t.purposes[e];
        return "boolean" != typeof n || n;
      }
      function M() {
        return L(O.ANALYTICS);
      }
      function j() {
        return L(O.MARKETING);
      }
      function D() {
        return (
          !!(function (e = null) {
            return null === e && (e = R()), void 0 === e;
          })() ||
          (j() && M())
        );
      }
      function U() {
        return j();
      }
      function V() {
        return M();
      }
      function z() {
        return L(O.PREFERENCES);
      }
      function B() {
        return L(O.SALE_OF_DATA);
      }
      const q = "sh",
        F = "shu",
        H = [
          "page_viewed",
          "collection_viewed",
          "product_viewed",
          "product_variant_viewed",
          "search_submitted",
          "product_added_to_cart",
          "checkout_started",
          "checkout_completed",
          "payment_info_submitted",
          "checkout_contact_step_started",
          "checkout_contact_info_submitted",
          "checkout_address_info_submitted",
          "checkout_shipping_step_started",
          "checkout_shipping_info_submitted",
          "checkout_payment_step_started",
          "session_started",
        ],
        K = "wpm",
        W = "trekkie";
      let X, G;
      function J(e) {
        return `${e || q}-${(function () {
          const e = "xxxx-4xxx-xxxx-xxxxxxxxxxxx";
          let t = "";
          try {
            const n = window.crypto,
              i = new Uint16Array(31);
            n.getRandomValues(i);
            let o = 0;
            t = e
              .replace(/[x]/g, (e) => {
                const t = i[o];
                if ("number" != typeof t)
                  throw new Error(
                    `Event ID service: Invalid random number at index "${o}".`
                  );
                const n = t % 16;
                return o++, ("x" === e ? n : (3 & n) | 8).toString(16);
              })
              .toUpperCase();
          } catch (n) {
            t = e
              .replace(/[x]/g, (e) => {
                const t = (16 * Math.random()) | 0;
                return ("x" === e ? t : (3 & t) | 8).toString(16);
              })
              .toUpperCase();
          }
          return `${(function () {
            let e = 0,
              t = 0;
            e = new Date().getTime() >>> 0;
            try {
              t = performance.now() >>> 0;
            } catch (n) {
              t = 0;
            }
            return Math.abs(e + t)
              .toString(16)
              .toLowerCase()
              .padStart(8, "0");
          })()}-${t}`;
        })()}`;
      }
      function Y() {
        (window.Shopify = window.Shopify || {}),
          window.Shopify.evids ||
            ((X = {}),
            (G = { [K]: {}, [W]: {} }),
            (window.Shopify.evids = (...e) =>
              (function (e, t) {
                if (
                  !(function (e) {
                    return H.includes(e);
                  })(e) ||
                  ((null == t ? void 0 : t.analyticsFramework) !== W &&
                    (null == t ? void 0 : t.analyticsFramework) !== K)
                )
                  return J(F);
                const n =
                  "string" == typeof (i = t.cacheKey) && i ? i : "default";
                var i;
                const o = (function (e, t, n) {
                  var i;
                  const o = G[t],
                    r = null != (i = o[e]) ? i : (o[e] = {}),
                    s = r[n];
                  return (r[n] = "number" == typeof s ? s + 1 : 0);
                })(e, t.analyticsFramework, n);
                return (function (e, t, n) {
                  var i, o;
                  const r = null != (i = X[e]) ? i : (X[e] = {}),
                    s = null != (o = r[n]) ? o : [];
                  let a = s[t];
                  return a || ((a = J()), s.push(a)), (r[n] = s), a;
                })(e, o, n);
              })(...e)));
      }
      const Z = new Set();
      function Q(e) {
        return Z.has(e);
      }
      const ee = "3b4293f9";
      class te extends Set {
        constructor(e, t) {
          if (
            (super(),
            (this.maxSize = void 0),
            (this.keep = void 0),
            (Number.isFinite(e) && !Number.isInteger(e)) || e <= 0)
          )
            throw new Error("Invalid maxSize specified");
          (this.maxSize = e), (this.keep = t);
        }
        push(e) {
          if ("oldest" === this.keep) this.size < this.maxSize && this.add(e);
          else if (
            "newest" === this.keep &&
            (this.add(e), this.size > this.maxSize)
          )
            for (const t of this)
              if ((this.delete(t), this.size <= this.maxSize)) break;
          return this;
        }
      }
      const ne = (e, t, n) => !0;
      class ie {
        constructor({
          bufferSize: e = 50,
          replayKeep: t = "oldest",
          subscribeAllKey: n,
          eligibility: i,
        } = {}) {
          (this.channelSubscribers = new Map()),
            (this.replayQueue = void 0),
            (this.bufferSize = void 0),
            (this.replayKeep = void 0),
            (this.subscribeAllKey = void 0),
            (this.eligibility = void 0),
            (this.bufferSize = e),
            (this.replayKeep = t),
            (this.subscribeAllKey = n),
            (this.replayQueue = new te(e, t)),
            (this.eligibility = null != i ? i : ne);
        }
        publish(e, t, n = {}) {
          var i;
          if (this.subscribeAllKey && e === this.subscribeAllKey)
            throw new Error(`Cannot publish to ${String(e)}`);
          this.replayQueue.push({ name: e, payload: t, options: n });
          const o = (i, o) => {
            this.eligibility(n, i, e) && o.call({}, { ...t });
          };
          var r;
          return (
            null == (i = this.channelSubscribers.get(e)) || i.forEach(o),
            this.subscribeAllKey &&
              (null ==
                (r = this.channelSubscribers.get(this.subscribeAllKey)) ||
                r.forEach(o)),
            !0
          );
        }
        subscribe(e, t, n = {}) {
          const i = this.channelSubscribers.get(e) || new Map();
          return (
            this.channelSubscribers.set(e, i.set(t, n)),
            this.replayQueue.forEach(({ name: i, payload: o, options: r }) => {
              (e === i ||
                (this.subscribeAllKey && e === this.subscribeAllKey)) &&
                this.eligibility(r, n, i) &&
                t.call({}, { ...o });
            }),
            () => i.delete(t)
          );
        }
      }
      const oe = {
        randomUUID:
          "undefined" != typeof crypto &&
          crypto.randomUUID &&
          crypto.randomUUID.bind(crypto),
      };
      let re;
      const se = new Uint8Array(16);
      function ae() {
        if (
          !re &&
          ((re =
            "undefined" != typeof crypto &&
            crypto.getRandomValues &&
            crypto.getRandomValues.bind(crypto)),
          !re)
        )
          throw new Error(
            "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
          );
        return re(se);
      }
      const ce = [];
      for (let n = 0; n < 256; ++n) ce.push((n + 256).toString(16).slice(1));
      const le = function (e, t, n) {
        if (oe.randomUUID && !t && !e) return oe.randomUUID();
        const i = (e = e || {}).random || (e.rng || ae)();
        if (((i[6] = (15 & i[6]) | 64), (i[8] = (63 & i[8]) | 128), t)) {
          n = n || 0;
          for (let e = 0; e < 16; ++e) t[n + e] = i[e];
          return t;
        }
        return (function (e, t = 0) {
          return (
            ce[e[t + 0]] +
            ce[e[t + 1]] +
            ce[e[t + 2]] +
            ce[e[t + 3]] +
            "-" +
            ce[e[t + 4]] +
            ce[e[t + 5]] +
            "-" +
            ce[e[t + 6]] +
            ce[e[t + 7]] +
            "-" +
            ce[e[t + 8]] +
            ce[e[t + 9]] +
            "-" +
            ce[e[t + 10]] +
            ce[e[t + 11]] +
            ce[e[t + 12]] +
            ce[e[t + 13]] +
            ce[e[t + 14]] +
            ce[e[t + 15]]
          );
        })(i);
      };
      let ue = (function (e) {
          return (e.App = "APP"), (e.Custom = "CUSTOM"), e;
        })({}),
        de = (function (e) {
          return (e.Strict = "STRICT"), (e.Lax = "LAX"), (e.Open = "OPEN"), e;
        })({});
      function pe(e) {
        return "shopify-custom-pixel" === e.id
          ? "shopify-pixel"
          : e.type === ue.Custom
          ? "-1"
          : e.apiClientId
          ? `${e.apiClientId}`
          : void 0;
      }
      let fe = (function (e) {
          return (
            (e.Shopify = "shopify"),
            (e.StorefrontRenderer = "storefront-renderer"),
            (e.CheckoutOne = "checkout-one"),
            (e.CheckoutOneSdk = "checkout-one-sdk"),
            (e.Unknown = "unknown"),
            e
          );
        })({}),
        me = (function (e) {
          return (
            (e.WebPixelExtension = "web-pixel-extension"),
            (e.CheckoutOneSdk = "checkout-one-sdk"),
            (e.Unknown = "unknown"),
            e
          );
        })({});
      const he = (e, t, n) => {
        const { pixelRuntimeConfig: i } = t || {},
          { apiClientId: o, restrictions: r } = i || {},
          { allowedEvents: s, disallowedEvents: a } = r || {},
          { sendTo: c } = e || {},
          l = c && String(c) === String(o),
          u = c && !l,
          d = !s || s.includes(n),
          p = a && a.includes(n);
        return Boolean((d && !p && !u) || l);
      };
      function be(e) {
        if (e <= 0 || e > 100) throw new Error("Invalid sampling percent");
        return 100 * Math.random() <= e;
      }
      var we = n(482),
        ve = n.n(we);
      class ge extends Error {
        constructor(...e) {
          super(...e),
            (this.message =
              "Excessive Stacktrace: May indicate infinite loop forming");
        }
      }
      var ye = n(47);
      class xe extends Error {
        constructor(...e) {
          super(...e),
            Error.captureStackTrace && Error.captureStackTrace(this, xe);
        }
      }
      const ke = {
          production: "https://notify.bugsnag.com",
          test: "https://localhost",
        },
        Ee = {
          severity: "error",
          context: "",
          unhandled: !0,
          library: "browser",
        },
        _e = {
          notify: (e, n) => {
            try {
              var a;
              if (
                null != n &&
                null != (a = n.options) &&
                a.sampleRate &&
                !be(n.options.sampleRate)
              )
                return;
              const d = { ...Ee, ...n };
              let p = {
                errorClass: null == e ? void 0 : e.name,
                message: null == e ? void 0 : e.message,
                stacktrace: [],
                type: "browserjs",
              };
              try {
                p = (function (e) {
                  if (
                    "string" !=
                      typeof (
                        (null == (t = e) ? void 0 : t.stack) ||
                        (null == t ? void 0 : t.stacktrace) ||
                        (null == t ? void 0 : t["opera#sourceloc"])
                      ) ||
                    t.stack === `${t.name}: ${t.message}`
                  )
                    throw new Error(
                      "Error incompatible with error-stack-parser"
                    );
                  var t;
                  const n = ve()
                    .parse(e)
                    .reduce((e, t) => {
                      const n = (function ({
                        functionName: e,
                        lineNumber: t,
                        columnNumber: n,
                      }) {
                        const i = /^global code$/i.test((o = e) || "")
                          ? "global code"
                          : o;
                        var o;
                        return {
                          file: `https://cdn.shopify.com/cdn/wpm/${s}`,
                          method: i,
                          lineNumber: t,
                          columnNumber: n,
                        };
                      })(t);
                      try {
                        return "{}" === JSON.stringify(n) ? e : e.concat(n);
                      } catch (i) {
                        return e;
                      }
                    }, []);
                  return {
                    errorClass: null == e ? void 0 : e.name,
                    message: null == e ? void 0 : e.message,
                    stacktrace: n,
                    type: "browserjs",
                  };
                })(e);
              } catch (l) {
                try {
                  p = (function (e, t) {
                    let n = "";
                    const i = {
                      lineNumber: "1",
                      columnNumber: "1",
                      method: t.context,
                      file: `https://cdn.shopify.com/cdn/wpm/${s}`,
                    };
                    if (e.stackTrace || e.stack || e.description) {
                      n = e.stack.split("\n")[0];
                      const t = e.stack.match(/([0-9]+):([0-9]+)/);
                      if (
                        t &&
                        t.length > 2 &&
                        ((i.lineNumber = t[1]),
                        (i.columnNumber = t[2]),
                        parseInt(i.lineNumber, 10) > 1e5)
                      )
                        throw new ge();
                    }
                    return {
                      errorClass: (null == e ? void 0 : e.name) || n,
                      message: (null == e ? void 0 : e.message) || n,
                      stacktrace: [i],
                      type: "browserjs",
                    };
                  })(e, d);
                } catch (u) {
                  if (u instanceof ge) return;
                }
              }
              const f = (function (
                  n,
                  {
                    userAgent: s,
                    context: a,
                    severity: c,
                    unhandled: l,
                    library: u,
                    hashVersionSandbox: d,
                    sandboxUrl: p,
                    pixelId: f,
                    pixelType: m,
                    runtimeContext: h,
                    shopId: b,
                    initConfig: w,
                    notes: v,
                  }
                ) {
                  var g, y;
                  const {
                    device: x,
                    os: k,
                    browser: E,
                    engine: _,
                  } = (function (t) {
                    try {
                      return new ye.UAParser(t).getResult();
                    } catch (e) {
                      return {
                        ua: "",
                        browser: { name: "", version: "", major: "" },
                        engine: { name: "", version: "" },
                        os: { name: "", version: "" },
                        device: { model: "", type: "", vendor: "" },
                        cpu: { architecture: "" },
                      };
                    }
                  })(
                    s || (null == (g = self.navigator) ? void 0 : g.userAgent)
                  );
                  return {
                    payloadVersion: 5,
                    notifier: {
                      name: "web-pixel-manager",
                      version: i,
                      url: "-",
                    },
                    events: [
                      {
                        exceptions: [n],
                        context: a,
                        severity: c,
                        unhandled: l,
                        app: { version: i },
                        device: {
                          manufacturer: x.vendor,
                          model: x.model,
                          osName: k.name,
                          osVersion: k.version,
                          browserName: E.name,
                          browserVersion: E.version,
                        },
                        metaData: {
                          app: {
                            library: u,
                            browserTarget: o,
                            env: t,
                            hashVersion: r,
                            hashVersionSandbox: d || "N/A",
                            sandboxUrl: p || "N/A",
                          },
                          device: {
                            userAgent:
                              s ||
                              (null == (y = self.navigator)
                                ? void 0
                                : y.userAgent),
                            renderingEngineName: _.name,
                            renderingEngineVersion: _.version,
                          },
                          request: {
                            shopId: b,
                            shopUrl: self.location.href,
                            pixelId: f,
                            pixelType: m,
                            runtimeContext: h,
                          },
                          "Additional Notes": {
                            initConfig: JSON.stringify(w),
                            notes: v,
                          },
                        },
                      },
                    ],
                  };
                })(p, d),
                m = ke[t];
              var c;
              if (!m)
                return void (
                  null == (c = console) || c.log(`[${t}]`, "Bugsnag notify:", f)
                );
              fetch(m, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Bugsnag-Api-Key": "bcbc9f6762da195561967577c2d74ff8",
                  "Bugsnag-Payload-Version": "5",
                },
                body: JSON.stringify(f),
              }).catch(() => {});
            } catch (d) {}
          },
        };
      function Se(e) {
        const t = {};
        for (const n in e)
          if (Object.prototype.hasOwnProperty.call(e, n)) {
            const i = n.replace(/[A-Z]/g, (e) => `_${e}`).toLowerCase(),
              o = e[n];
            t[i] = null !== o && "object" == typeof o ? Se(o) : o;
          }
        return t;
      }
      function Ce(e) {
        return e.replace(/\/$/, "");
      }
      const Ie = {},
        Ae = {
          "pixel:register": {
            start: {
              name: "pixel:register:started",
              params: { pixelId: "", source: "" },
            },
            end: {
              name: "pixel:register:completed",
              params: { pixelId: "", source: "" },
            },
          },
          "page:session": {
            start: { name: "start", params: Ie },
            end: { name: "page:unload", params: Ie },
          },
          completed: {
            start: { name: "start", params: Ie },
            end: { name: "pixels:resolved", params: Ie },
          },
        };
      function Oe(e, t = Ie) {
        const n = Pe(e, "end", t),
          i = (function (e, t) {
            try {
              const n = Te(e, "start", t),
                i = Te(e, "end", t),
                o = (function (e, t) {
                  return Ne(e, t);
                })(e, t),
                r = self.performance.measure(o, n, i);
              return {
                ...r,
                duration: Math.round(r.duration),
                startTime: Math.round(r.startTime),
              };
            } catch (n) {
              return null;
            }
          })(e, t);
        return { mark: n, measurement: i };
      }
      function Pe(e, t, n) {
        try {
          const i = Te(e, t, n);
          return self.performance.mark(i), { name: i, params: n };
        } catch (i) {
          return { name: null, params: n };
        }
      }
      function Te(e, t, n) {
        return Ne(Ae[e][t].name, n);
      }
      function Ne(e, t = {}) {
        const n = ["wpm", e];
        return (
          Object.keys(t).forEach((e) => {
            const i = t[e];
            i && n.push(i);
          }),
          n.join(":")
        );
      }
      const Re = {
        test: "edge_test_click/1.0",
        load: "web_pixels_manager_load/3.1",
        init: "web_pixels_manager_init/3.2",
        register: "web_pixels_manager_pixel_register/3.6",
        subscriberEventEmit: "web_pixels_manager_subscriber_event_emit/3.4",
        eventPublish: "web_pixels_manager_event_publish/1.6",
        consentAccepted: "web_pixels_manager_consent_accepted/1.2",
        unload: "web_pixels_manager_unload/1.2",
        visitor: "web_pixels_manager_visitor/1.0",
        subscriberEventEmitDom:
          "web_pixels_manager_subscriber_event_emit_dom/1.0",
        subscriberEventEmitPrivacy:
          "web_pixels_manager_subscriber_event_emit_privacy/1.0",
      };
      function $e(e, t) {
        return { schemaId: Re[e], payload: t };
      }
      let Le = "";
      function Me(e = "") {
        Le = Ce(e);
      }
      const je = "/unstable/produce_batch",
        De = 500;
      let Ue = "wellKnown";
      const Ve = new Array();
      let ze;
      function Be(e, t = !1) {
        const n = {
          schema_id: e.schemaId,
          payload: Se(e.payload),
          metadata: { event_created_at_ms: He() },
        };
        Ve.push(n), t ? Fe() : void 0 === ze && (ze = setTimeout(Fe, De));
      }
      function qe(e, t, n = !1) {
        Be($e(e, t), n);
      }
      function Fe({ skipXhr: e } = { skipXhr: !1 }) {
        if (((ze = void 0), 0 === Ve.length)) return;
        const t = [...Ve];
        (Ve.length = 0),
          (function (e, t) {
            if (0 === e.length) return !1;
            const n = { metadata: { event_sent_at_ms: He() }, events: e };
            !(function (e, t) {
              const n = `${
                {
                  global: "https://monorail-edge.shopifysvc.com",
                  wellKnown: `${Le}/.well-known/shopify/monorail`,
                  staging: "https://monorail-edge-staging.shopifycloud.com",
                  test: "https://localhost",
                }[Ue]
              }${je}`;
              try {
                if (self.navigator.sendBeacon.bind(self.navigator)(n, e))
                  return !0;
              } catch (i) {}
              if (!t) {
                const t = new XMLHttpRequest();
                try {
                  t.open("POST", n, !0),
                    t.setRequestHeader("Content-Type", "text/plain"),
                    t.send(e);
                } catch (o) {
                  _e.notify(o, {
                    context: "v0/utilities/monorail/sendRequest",
                    unhandled: !1,
                  });
                }
              }
            })(JSON.stringify(n), t);
          })(t, e);
      }
      function He() {
        return new Date().getTime();
      }
      class Ke {
        constructor(e) {
          (this.maxSize = e), (this.cache = new Map());
        }
        get(e) {
          if (!this.cache.has(e)) return;
          const t = this.cache.get(e);
          return this.cache.delete(e), this.cache.set(e, t), t;
        }
        has(e) {
          return this.cache.has(e);
        }
        set(e, t) {
          if (this.cache.size >= this.maxSize) {
            const e = this.cache.keys().next().value;
            this.cache.delete(e);
          }
          return this.cache.set(e, t), this;
        }
        delete(e) {
          return this.cache.delete(e);
        }
        clear() {
          this.cache.clear();
        }
      }
      const We = (e) => ("number" == typeof e ? new Ke(e) : new Map()),
        Xe = (...e) => JSON.stringify(e);
      function Ge(e, { cache: t, cacheKey: n = Xe } = {}) {
        function i(...t) {
          const o = i.cache,
            r = n.apply(this, t);
          if (o.has(r)) return o.get(r);
          {
            const n = e(...t);
            return o.set(r, n), n;
          }
        }
        return (i.cache = null != t ? t : We()), i;
      }
      const Je = Ge(
          (e = "") => {
            const t = e.indexOf("=");
            return -1 === t
              ? [e.trim(), void 0]
              : [e.slice(0, t).trim(), e.slice(t + 1).trim()];
          },
          { cache: We(100), cacheKey: (e = "") => e }
        ),
        Ye = Ge(
          (e = "") =>
            e.split(";").reduce((e, t) => {
              const [n, i] = Je(t);
              if (n)
                try {
                  e[decodeURIComponent(n)] = decodeURIComponent(
                    null != i ? i : ""
                  );
                } catch {
                  e[n] = null != i ? i : "";
                }
              return e;
            }, Object.create(null)),
          { cache: We(50), cacheKey: (e = "") => e }
        );
      let Ze = !1;
      const Qe = [],
        et = (e) => {
          Qe.push(e);
        };
      function tt(e) {
        const t = e;
        Qe.forEach((e) => {
          e(t);
        });
      }
      let nt = !1;
      const it = ["analytics", "preferences", "marketing", "sale_of_data"];
      function ot(e, t) {
        return e ? !t || Object.keys(e).every((n) => !e[n] || t[n]) : D();
      }
      function rt(e) {
        if (e)
          return it.reduce(
            (t, n) => ((t[n] = e.includes(n.toUpperCase())), t),
            {}
          );
      }
      function st(e) {
        return new Promise((t, n) => {
          const i = {
            analytics: V(),
            marketing: U(),
            preferences: z(),
            sale_of_data: B(),
          };
          ot(e, i)
            ? t(!0)
            : et((n) => {
                (function (e, t) {
                  const n = e.detail;
                  return ot(t, {
                    analytics: !0 === (null == n ? void 0 : n.analyticsAllowed),
                    marketing: !0 === (null == n ? void 0 : n.marketingAllowed),
                    preferences:
                      !0 === (null == n ? void 0 : n.preferencesAllowed),
                    sale_of_data:
                      !0 === (null == n ? void 0 : n.saleOfDataAllowed),
                  });
                })(n, e) && t(!0);
              });
        });
      }
      const at = new Set();
      class ct extends Error {
        constructor(e) {
          super(e), (this.name = "VisitorError");
        }
      }
      let lt;
      function ut() {
        return (
          lt ||
            (lt = (function () {
              let e;
              try {
                var t, n;
                e =
                  null != (t = window.Shopify) && t.evids
                    ? null == (n = window.Shopify)
                      ? void 0
                      : n.evids("session_started", {
                          analyticsFramework: "wpm",
                        })
                    : le();
              } catch (i) {
                e = le();
              }
              return e;
            })()),
          lt
        );
      }
      function dt(e, t, n, i, o = {}) {
        try {
          const r = (function (e, { sampleRate: t, throttleDelay: n } = {}) {
            const i = (n) => {
              try {
                e(n);
              } catch (i) {
                _e.notify(i, {
                  context:
                    "v0/createDomEventsListener/createEventListener/handler",
                  unhandled: !1,
                  options: { sampleRate: null != t ? t : 50 },
                });
              }
            };
            return "number" == typeof n
              ? (function (e, t, { leading: n = !0, trailing: i = !0 } = {}) {
                  if (t <= 0)
                    throw new Error(
                      "The throttle function requires a positive wait time above zero."
                    );
                  if (!n && !i)
                    throw new Error(
                      "The throttle function requires at least one of leading or trailing to be true, otherwise, its callback will never be called."
                    );
                  let o,
                    r,
                    s,
                    a = null,
                    c = 0;
                  function l() {
                    (c = !1 === n ? 0 : new Date().valueOf()),
                      (a = null),
                      o && (r = e.apply(s, o)),
                      (s = null),
                      (o = null);
                  }
                  return function (...u) {
                    const d = new Date().valueOf();
                    c || !1 !== n || (c = d);
                    const p = t - (d - c);
                    return (
                      (s = this),
                      (o = u),
                      p <= 0 || p > t
                        ? (a && (clearTimeout(a), (a = null)),
                          (c = d),
                          o && (r = e.apply(s, o)),
                          (s = null),
                          (o = null))
                        : a || !1 === i || (a = setTimeout(l, p)),
                      r
                    );
                  };
                })(i, n)
              : i;
          })(n, o);
          return (
            e.addEventListener(t, r, i),
            () => {
              e.removeEventListener(t, r, i);
            }
          );
        } catch (r) {
          _e.notify(r, {
            context: "v0/createDomEventsListener/createEventListener",
            unhandled: !1,
          });
        }
        return () => {};
      }
      const pt = new RegExp(
          [
            "password",
            "pass",
            "pw",
            "ssn",
            "sin",
            "social",
            "security",
            "cc",
            "card",
            "creditcard",
            "cvv",
            "cvc",
            "cvn",
            "billing",
            "license",
            "health",
            "secret",
            "unique",
          ]
            .map((e) => `^(.*[^a-z])?${e}([^a-z].*)?$`)
            .join("|"),
          "i"
        ),
        ft = "data-shopify-redact",
        mt = "REDACTED";
      function ht(e, t) {
        const n = t.reduce(
          (t, n) => (
            (t[n] = (function (e, t) {
              var n;
              return t in e && "string" == typeof e[t]
                ? e[t]
                : null != (n = e.getAttribute(t))
                ? n
                : null;
            })(e, n)),
            t
          ),
          {}
        );
        return (
          "value" in n &&
            "string" == typeof n.value &&
            (e.hasAttribute(ft) ||
              ["id", "type", "name"].some((e) => {
                if (!(e in n)) return !1;
                const t = n[e];
                return "string" == typeof t && t.match(pt);
              })) &&
            (n.value = mt),
          n
        );
      }
      const bt = [
          HTMLInputElement,
          HTMLSelectElement,
          HTMLTextAreaElement,
          HTMLButtonElement,
        ],
        wt = ["id", "name", "tagName", "type", "value"];
      function vt(e) {
        return ht(e, wt);
      }
      const gt = ["id", "href", "name", "tagName", "type", "value"],
        yt = { capture: !0, passive: !0 },
        xt = ["action", "id"];
      function kt(e) {
        const t = (function () {
          let e = !1;
          try {
            const t = {
                get passive() {
                  return (e = !0), !1;
                },
              },
              n = () => {};
            self.addEventListener("test", n, t),
              self.removeEventListener("test", n, t);
          } catch (t) {
            e = !1;
          }
          return !e || yt;
        })();
        !(function (e, t) {
          dt(
            window,
            "blur",
            (t) => {
              const n = null == t ? void 0 : t.target;
              if (
                !(
                  n instanceof HTMLInputElement ||
                  n instanceof HTMLSelectElement ||
                  n instanceof HTMLTextAreaElement
                )
              )
                return;
              const i = vt(n);
              e.publishDomEvent("input_blurred", { element: i });
            },
            t
          );
        })(e, t),
          (function (e, t) {
            dt(
              window,
              "change",
              (t) => {
                const n = null == t ? void 0 : t.target;
                if (
                  !(
                    n instanceof HTMLInputElement ||
                    n instanceof HTMLSelectElement ||
                    n instanceof HTMLTextAreaElement
                  )
                )
                  return;
                const i = { element: vt(n) };
                e.publishDomEvent("input_changed", i);
              },
              t
            );
          })(e, t),
          (function (e, t) {
            dt(
              window,
              "click",
              (t) => {
                const n = null == t ? void 0 : t.target;
                if (!(n instanceof Element)) return;
                const i = (function (e) {
                  return ht(e, gt);
                })(n);
                e.publishDomEvent("clicked", { element: i });
              },
              t,
              { throttleDelay: 50 }
            );
          })(e, t),
          (function (e, t) {
            dt(
              window,
              "focus",
              (t) => {
                const n = null == t ? void 0 : t.target;
                if (
                  !(
                    n instanceof HTMLInputElement ||
                    n instanceof HTMLSelectElement ||
                    n instanceof HTMLTextAreaElement
                  )
                )
                  return;
                const i = vt(n);
                e.publishDomEvent("input_focused", { element: i });
              },
              t
            );
          })(e, t),
          (function (e, t) {
            dt(
              window,
              "submit",
              (t) => {
                const n = null == t ? void 0 : t.target;
                n instanceof HTMLFormElement &&
                  e.publishDomEvent("form_submitted", {
                    element: {
                      ...ht(n, xt),
                      elements: Array.from(n.elements)
                        .filter((e) => bt.some((t) => e instanceof t))
                        .map((e) => vt(e)),
                    },
                  });
              },
              t
            );
          })(e, t);
      }
      let Et = (function (e) {
          return (
            (e.Custom = "custom"), (e.Dom = "dom"), (e.Standard = "standard"), e
          );
        })({}),
        _t = (function (e) {
          return (e.Meta = "meta"), e;
        })({});
      function St() {
        return /checkouts\/(.+)\/(thank_you|thank-you|post_purchase)$/.test(
          self.location.pathname
        );
      }
      const Ct = {
          string: "[object String]",
          number: "[object Number]",
          boolean: "[object Boolean]",
          undefined: "[object Undefined]",
          null: "[object Null]",
          object: "[object Object]",
        },
        It = [Ct.string, Ct.number, Ct.boolean, Ct.undefined, Ct.null];
      function At(e) {
        let t = null,
          n = null;
        function i(e) {
          return Object.prototype.toString.call(e) === Ct.object;
        }
        return void 0 === e || i(e)
          ? {
              isValid: (function e(o, r) {
                if (Array.isArray(o)) return o.every((t) => e(t, r));
                if (i(o)) return Object.keys(o).every((t) => e(o[t], t));
                const s = It.includes(Object.prototype.toString.call(o));
                return (
                  s ||
                    ((n = r),
                    (t = `Key: ${n}; ${o} must be one of the following types: ${It.join(
                      ", "
                    )}`)),
                  s
                );
              })(e, "root"),
              error: t,
              errorKey: n,
            }
          : ((n = "root"),
            (t = `Key: ${n}; ${e} must be an object`),
            { isValid: !1, error: t, errorKey: n });
      }
      const Ot = {
        all_events: _t.Meta,
        all_standard_events: _t.Meta,
        all_custom_events: _t.Meta,
        all_dom_events: _t.Meta,
        checkout_address_info_submitted: Et.Standard,
        checkout_completed: Et.Standard,
        checkout_started: Et.Standard,
        payment_info_submitted: Et.Standard,
        collection_viewed: Et.Standard,
        checkout_contact_info_submitted: Et.Standard,
        page_viewed: Et.Standard,
        product_added_to_cart: Et.Standard,
        product_removed_from_cart: Et.Standard,
        product_viewed: Et.Standard,
        product_variant_viewed: Et.Standard,
        search_submitted: Et.Standard,
        cart_viewed: Et.Standard,
        checkout_shipping_info_submitted: Et.Standard,
        input_changed: Et.Dom,
        input_blurred: Et.Dom,
        input_focused: Et.Dom,
        form_submitted: Et.Dom,
        clicked: Et.Dom,
      };
      function Pt(e) {
        var t;
        return (function (e) {
          return e in Ot;
        })(e) && null != (t = Ot[e])
          ? t
          : Et.Custom;
      }
      function Tt(e) {
        return Pt(e) === Et.Standard;
      }
      function Nt(e) {
        return Pt(e) === Et.Dom;
      }
      function Rt() {
        return {
          document: {
            location: {
              href: window.location.href,
              hash: window.location.hash,
              host: window.location.host,
              hostname: window.location.hostname,
              origin: window.location.origin,
              pathname: window.location.pathname,
              port: window.location.port,
              protocol: window.location.protocol,
              search: window.location.search,
            },
            referrer: document.referrer,
            characterSet: document.characterSet,
            title: document.title,
          },
          navigator: {
            language: navigator.language,
            cookieEnabled: navigator.cookieEnabled,
            languages: navigator.languages,
            userAgent: navigator.userAgent,
          },
          window: {
            innerHeight: window.innerHeight,
            innerWidth: window.innerWidth,
            outerHeight: window.outerHeight,
            outerWidth: window.outerWidth,
            pageXOffset: window.pageXOffset,
            pageYOffset: window.pageYOffset,
            location: {
              href: window.location.href,
              hash: window.location.hash,
              host: window.location.host,
              hostname: window.location.hostname,
              origin: window.location.origin,
              pathname: window.location.pathname,
              port: window.location.port,
              protocol: window.location.protocol,
              search: window.location.search,
            },
            origin: window.origin,
            screen: {
              height: window.screen.height,
              width: window.screen.width,
            },
            screenX: window.screenX,
            screenY: window.screenY,
            scrollX: window.scrollX,
            scrollY: window.scrollY,
          },
        };
      }
      const $t = (e) => {
        var t;
        return {
          ...e,
          clientId: null != (t = Ye(document.cookie)._shopify_y) ? t : "",
          timestamp: new Date().toISOString(),
          context: Rt(),
          id: "string" == typeof e.id && e.id.length > 0 ? e.id : le(),
        };
      };
      const Lt = "all_standard_events",
        Mt = "all_custom_events",
        jt = "all_dom_events";
      class Dt extends Error {
        constructor(e) {
          super(e), (this.name = "PublishDomEventError");
        }
      }
      function Ut(e) {
        const t = new ie({
            bufferSize: Number.POSITIVE_INFINITY,
            subscribeAllKey: Lt,
            eligibility: he,
          }),
          n = new ie({ bufferSize: 1e3, subscribeAllKey: Mt, eligibility: he }),
          r = new ie({
            bufferSize: 1e3,
            replayKeep: "newest",
            subscribeAllKey: jt,
            eligibility: he,
          });
        e.initData;
        let s = !1;
        return {
          publish(n, r, c) {
            var l, u, d, p, f;
            if ("string" != typeof n)
              throw new Error(
                "Expected event name to be a string, but got " + typeof n
              );
            if (!Tt(n)) return !1;
            if (
              "checkout_completed" === n &&
              St() &&
              -1 !== document.cookie.indexOf(`${a}=1`)
            )
              return !1;
            const m = At(r);
            if (!m.isValid) return console.error(m.error), !1;
            const h = (function (e, t, n) {
                let i;
                const o = { analyticsFramework: "wpm" };
                try {
                  var r, s;
                  "product_added_to_cart" === e &&
                    "cartLine" in n &&
                    (o.cacheKey = (function (
                      { cartLine: e } = { cartLine: null }
                    ) {
                      const t = null == e ? void 0 : e.merchandise.product.id,
                        n = null == e ? void 0 : e.merchandise.id;
                      if (t && n) return `${t}-${n}`;
                    })(n)),
                    (i =
                      null == (r = window.Shopify) || null == (s = r.evids)
                        ? void 0
                        : s.call(r, e, o));
                } catch {}
                return $t({ id: i, name: e, data: n, type: Et.Standard });
              })(n, 0, r),
              b =
                null == (l = h.data) || null == (u = l.checkout)
                  ? void 0
                  : u.token;
            return (
              qe("eventPublish", {
                version: i,
                bundleTarget: o,
                pageUrl: self.location.href,
                shopId: e.shopId,
                surface: e.surface || fe.Unknown,
                eventName: h.name,
                eventType: "standard",
                extensionId:
                  null == c || null == (d = c.extension)
                    ? void 0
                    : d.extensionId,
                extensionAppId:
                  null == c || null == (p = c.extension) ? void 0 : p.appId,
                extensionType:
                  null == c || null == (f = c.extension) ? void 0 : f.type,
                userCanBeTracked: D().toString(),
                shopPrefs: "unknown",
                eventId: h.id,
                checkoutToken: b,
                serverEventId: null == c ? void 0 : c.eventId,
              }),
              (function (e) {
                "checkout_completed" === e &&
                  (function () {
                    if (St()) {
                      const e = self.location.pathname
                          .split("/")
                          .slice(0, -1)
                          .join("/"),
                        t = new Date();
                      t.setMonth(t.getMonth() + 2),
                        (document.cookie = `${a}=1; expires=${t}; path=${e}`);
                    }
                  })();
              })(n),
              s ||
                ((s = !0),
                (w = e.shopId),
                (v = e.surface || fe.Unknown),
                at.add(() =>
                  (function (e, t) {
                    Ze ||
                      ((Ze = !0),
                      qe("consentAccepted", {
                        version: i,
                        bundleTarget: o,
                        shopId: e,
                        surface: t,
                        shopPrefs: "unknown",
                      }));
                  })(w, v)
                )),
              t.publish(n, h)
            );
            var w, v;
          },
          publishCustomEvent(t, r, s) {
            var a, c, l;
            if ("string" != typeof t)
              throw new Error(
                "Expected event name to be a string, but got " + typeof t
              );
            if (
              !(function (e) {
                return Pt(e) === Et.Custom;
              })(t)
            )
              return !1;
            const u = At(r);
            if (!u.isValid) return console.error(u.error), !1;
            const d = (function (e, t, n = null) {
              return $t({ name: e, customData: n, type: Et.Custom });
            })(t, 0, r);
            return (
              qe("eventPublish", {
                version: i,
                bundleTarget: o,
                pageUrl: self.location.href,
                shopId: e.shopId,
                surface: e.surface || fe.Unknown,
                eventName: d.name,
                eventType: "custom",
                extensionId:
                  null == s || null == (a = s.extension)
                    ? void 0
                    : a.extensionId,
                extensionAppId:
                  null == s || null == (c = s.extension) ? void 0 : c.appId,
                extensionType:
                  null == s || null == (l = s.extension) ? void 0 : l.type,
                eventId: d.id,
              }),
              n.publish(t, d, s)
            );
          },
          publishDomEvent(e, t, n) {
            if ("string" != typeof e) {
              const t = JSON.stringify(e);
              throw new Dt(
                `Expected event name "${t}" to be a string, but got ${typeof e}`
              );
            }
            if (!Nt(e))
              throw new Dt(`Event name "${e}" is not a supported DOM Event`);
            const i = At(t);
            if (!i.isValid) throw new Dt(`Input Validation Error: ${i.error}`);
            const o = (function (e, t) {
              return $t({ name: e, data: t, type: Et.Dom });
            })(e, t);
            return r.publish(e, o);
          },
          subscribe(s, a, c = {}) {
            const l = (t) => {
              var n, r, s, l, u, d, p, f;
              if (
                e.surface === fe.CheckoutOneSdk &&
                c.scope !== me.CheckoutOneSdk
              )
                return;
              const m = {
                configuration:
                  null == (n = c.pixelRuntimeConfig) ? void 0 : n.configuration,
                eventPayloadVersion:
                  c.schemaVersion ||
                  (null == (r = c.pixelRuntimeConfig)
                    ? void 0
                    : r.eventPayloadVersion) ||
                  "unknown",
                id:
                  (null == (s = c.pixelRuntimeConfig) ? void 0 : s.id) ||
                  "unknown",
                type:
                  (null == (l = c.pixelRuntimeConfig) ? void 0 : l.type) ||
                  "unknown",
                runtimeContext:
                  (null == (u = c.pixelRuntimeConfig)
                    ? void 0
                    : u.runtimeContext) || "unknown",
                restrictions:
                  null == (d = c.pixelRuntimeConfig) ? void 0 : d.restrictions,
                scriptVersion:
                  (null == (p = c.pixelRuntimeConfig)
                    ? void 0
                    : p.scriptVersion) || "unknown",
                apiClientId:
                  null == (f = c.pixelRuntimeConfig) ? void 0 : f.apiClientId,
              };
              a.call(t, t);
              const h = Pt(t.name),
                b = {
                  version: i,
                  bundleTarget: o,
                  pageUrl: self.location.href,
                  shopId: c.shopId,
                  surface: c.surface,
                  pixelId: m.id,
                  pixelAppId: pe(m),
                  pixelSource: m.type,
                  pixelRuntimeContext: m.runtimeContext,
                  pixelScriptVersion: m.scriptVersion,
                  pixelConfiguration: m.configuration,
                  pixelEventSchemaVersion: m.eventPayloadVersion,
                  eventName: t.name,
                  eventId: t.id,
                };
              if (h !== Et.Dom) {
                let e;
                var w, v;
                Tt(t.name) &&
                  (e =
                    null == t ||
                    null == (w = t.data) ||
                    null == (v = w.checkout)
                      ? void 0
                      : v.token),
                  qe("subscriberEventEmit", {
                    ...b,
                    eventType: h,
                    checkoutToken: e,
                  });
              } else be(1) && qe("subscriberEventEmitDom", b);
            };
            if ("all_events" === s) {
              const e = t.subscribe(Lt, l, c),
                i = n.subscribe(Mt, l, c),
                o = r.subscribe(jt, l, c);
              return () => {
                const t = e(),
                  n = i(),
                  r = o();
                return t && n && r;
              };
            }
            return s === Mt
              ? n.subscribe(Mt, l, c)
              : s === Lt || Tt(s)
              ? t.subscribe(s, l, c)
              : s === jt || Nt(s)
              ? r.subscribe(s, l, c)
              : n.subscribe(s, l, c);
          },
        };
      }
      const Vt = ["31014027265", "28638674945", "44186959873"];
      const zt = Symbol.for("RemoteUi::Retain"),
        Bt = Symbol.for("RemoteUi::Release"),
        qt = Symbol.for("RemoteUi::RetainedBy");
      class Ft {
        constructor() {
          this.memoryManaged = new Set();
        }
        add(e) {
          this.memoryManaged.add(e), e[qt].add(this), e[zt]();
        }
        release() {
          for (const e of this.memoryManaged) e[qt].delete(this), e[Bt]();
          this.memoryManaged.clear();
        }
      }
      function Ht(e) {
        return Boolean(e && e[zt] && e[Bt]);
      }
      function Kt(e, { deep: t = !0 } = {}) {
        return Wt(e, t, new Map());
      }
      function Wt(e, t, n) {
        const i = n.get(e);
        if (null != i) return i;
        const o = Ht(e);
        if ((o && e[zt](), n.set(e, o), t)) {
          if (Array.isArray(e)) {
            const i = e.reduce((e, i) => Wt(i, t, n) || e, o);
            return n.set(e, i), i;
          }
          if (Xt(e)) {
            const i = Object.keys(e).reduce((i, o) => Wt(e[o], t, n) || i, o);
            return n.set(e, i), i;
          }
        }
        return n.set(e, o), o;
      }
      function Xt(e) {
        if (null == e || "object" != typeof e) return !1;
        const t = Object.getPrototypeOf(e);
        return null == t || t === Object.prototype;
      }
      const Gt = "_@f";
      function Jt(e) {
        const t = new Map(),
          n = new Map(),
          i = new Map();
        return {
          encode: function i(o, r = new Map()) {
            if (null == o) return [o];
            const s = r.get(o);
            if (s) return s;
            if ("object" == typeof o) {
              if (Array.isArray(o)) {
                r.set(o, [void 0]);
                const e = [],
                  t = [
                    o.map((t) => {
                      const [n, o = []] = i(t, r);
                      return e.push(...o), n;
                    }),
                    e,
                  ];
                return r.set(o, t), t;
              }
              if (Xt(o)) {
                r.set(o, [void 0]);
                const e = [],
                  t = [
                    Object.keys(o).reduce((t, n) => {
                      const [s, a = []] = i(o[n], r);
                      return e.push(...a), { ...t, [n]: s };
                    }, {}),
                    e,
                  ];
                return r.set(o, t), t;
              }
            }
            if ("function" == typeof o) {
              if (t.has(o)) {
                const e = t.get(o),
                  n = [{ [Gt]: e }];
                return r.set(o, n), n;
              }
              const i = e.uuid();
              t.set(o, i), n.set(i, o);
              const s = [{ [Gt]: i }];
              return r.set(o, s), s;
            }
            const a = [o];
            return r.set(o, a), a;
          },
          decode: o,
          async call(e, t) {
            const i = new Ft(),
              r = n.get(e);
            if (null == r)
              throw new Error(
                "You attempted to call a function that was already released."
              );
            try {
              const e = Ht(r) ? [i, ...r[qt]] : [i];
              return await r(...o(t, e));
            } finally {
              i.release();
            }
          },
          release(e) {
            const i = n.get(e);
            i && (n.delete(e), t.delete(i));
          },
          terminate() {
            t.clear(), n.clear(), i.clear();
          },
        };
        function o(t, n) {
          if ("object" == typeof t) {
            if (null == t) return t;
            if (Array.isArray(t)) return t.map((e) => o(e, n));
            if (Gt in t) {
              const o = t[Gt];
              if (i.has(o)) return i.get(o);
              let r = 0,
                s = !1;
              const a = () => {
                  (r -= 1), 0 === r && ((s = !0), i.delete(o), e.release(o));
                },
                c = () => {
                  r += 1;
                },
                l = new Set(n),
                u = (...t) => {
                  if (s)
                    throw new Error(
                      "You attempted to call a function that was already released."
                    );
                  if (!i.has(o))
                    throw new Error(
                      "You attempted to call a function that was already revoked."
                    );
                  return e.call(o, t);
                };
              Object.defineProperties(u, {
                [Bt]: { value: a, writable: !1 },
                [zt]: { value: c, writable: !1 },
                [qt]: { value: l, writable: !1 },
              });
              for (const e of l) e.add(u);
              return i.set(o, u), u;
            }
            if (Xt(t))
              return Object.keys(t).reduce(
                (e, i) => ({ ...e, [i]: o(t[i], n) }),
                {}
              );
          }
          return t;
        }
      }
      const Yt = 0,
        Zt = 1,
        Qt = 2,
        en = 3,
        tn = 5,
        nn = 6;
      function on() {
        return `${rn()}-${rn()}-${rn()}-${rn()}`;
      }
      function rn() {
        return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16);
      }
      const sn = new Map();
      function an() {
        var e, t;
        const n =
            (null == (e = self) || null == (t = e.location)
              ? void 0
              : t.hostname) || "",
          i = sn.get(n);
        if (i) return i;
        const o = n.split("."),
          r = [];
        return (
          o.reverse().reduce((e, t) => {
            const n = "" === e ? t : `${t}.${e}`;
            return (
              (function (e) {
                document.cookie = `wpm-domain-test=1; path=/; domain=${e}`;
              })(n),
              document.cookie
                .split(";")
                .find((e) => e.includes("wpm-domain-test")) || r.push(n),
              (function (e) {
                document.cookie = `wpm-domain-test=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${e}`;
              })(n),
              n
            );
          }, ""),
          sn.set(n, r),
          r
        );
      }
      function cn(e) {
        const t = {
          context: Rt(),
          data: {
            customer:
              ((a = null == e ? void 0 : e.customer),
              a
                ? {
                    email: a.email,
                    firstName: a.firstName,
                    id: a.id,
                    lastName: a.lastName,
                    phone: a.phone,
                    ordersCount: a.ordersCount,
                  }
                : null),
            cart:
              ((n = null == e ? void 0 : e.cart),
              n
                ? {
                    id: null == n ? void 0 : n.id,
                    cost: {
                      totalAmount: {
                        amount:
                          null == n ||
                          null == (i = n.cost) ||
                          null == (o = i.totalAmount)
                            ? void 0
                            : o.amount,
                        currencyCode:
                          null == n ||
                          null == (r = n.cost) ||
                          null == (s = r.totalAmount)
                            ? void 0
                            : s.currencyCode,
                      },
                    },
                    lines: null == n ? void 0 : n.lines,
                    totalQuantity: null == n ? void 0 : n.totalQuantity,
                  }
                : null),
          },
        };
        var n, i, o, r, s, a;
        return (
          Q(ee) &&
            (t.customerPrivacy = {
              analyticsProcessingAllowed: V(),
              marketingAllowed: U(),
              preferencesProcessingAllowed: z(),
              saleOfDataAllowed: B(),
            }),
          t
        );
      }
      let ln, un;
      function dn() {
        if (void 0 !== ln) return ln;
        try {
          return (
            window.localStorage.setItem("local-storage-test", "test"),
            window.localStorage.removeItem("local-storage-test"),
            (ln = !0),
            !0
          );
        } catch (e) {
          return (ln = !1), !1;
        }
      }
      function pn() {
        if (void 0 !== un) return un;
        try {
          return (
            window.sessionStorage.setItem("session-storage-test", "test"),
            window.sessionStorage.removeItem("session-storage-test"),
            (un = !0),
            !0
          );
        } catch (e) {
          return (un = !1), !1;
        }
      }
      function fn({
        eventBus: e,
        customerPrivacyEventBus: t,
        webPixelConfig: n,
        shopId: i,
        surface: o,
        initData: r,
        forRPC: s = !1,
      }) {
        let a = {};
        try {
          a = n.configuration ? JSON.parse(n.configuration) : {};
        } catch (l) {}
        const c = {
          analytics: {
            subscribe: (t, r, a) => (
              s && Kt(r),
              e.subscribe(t, r, {
                ...a,
                pixelRuntimeConfig: n,
                shopId: i,
                surface: o,
                scope: me.WebPixelExtension,
              })
            ),
          },
          browser: {
            cookie: {
              get: async (e) => {
                if (!e) return document.cookie;
                let t = "";
                const n = document.cookie.split("; ");
                for (const i of n) {
                  const [n, o = ""] = i.split("=");
                  if (n === e) {
                    t = o;
                    break;
                  }
                }
                return t;
              },
              set: async (e, t) => {
                if (t) {
                  const n = `${e}=${t}`;
                  document.cookie = n;
                } else document.cookie = e;
                return document.cookie;
              },
            },
            sendBeacon: async (e, t = "") => {
              if (
                e.includes(self.location.origin) &&
                !e.match(
                  /\/\.well-known\/shopify\/monorail\/unstable\/produce_batch/
                )
              )
                return !1;
              const n = new window.Blob([t], { type: "text/plain" });
              return window.navigator.sendBeacon(e, n);
            },
            localStorage: {
              setItem: async (e, t) =>
                dn() ? window.localStorage.setItem(e, t) : Promise.resolve(),
              getItem: async (e) =>
                dn() ? window.localStorage.getItem(e) : Promise.resolve(null),
              key: async (e) =>
                dn() ? window.localStorage.key(e) : Promise.resolve(null),
              removeItem: async (e) =>
                dn() ? window.localStorage.removeItem(e) : Promise.resolve(),
              clear: async () =>
                dn() ? window.localStorage.clear() : Promise.resolve(),
              length: async () =>
                dn() ? window.localStorage.length : Promise.resolve(0),
            },
            sessionStorage: {
              setItem: async (e, t) =>
                pn() ? window.sessionStorage.setItem(e, t) : Promise.resolve(),
              getItem: async (e) =>
                pn() ? window.sessionStorage.getItem(e) : Promise.resolve(null),
              key: async (e) =>
                pn() ? window.sessionStorage.key(e) : Promise.resolve(null),
              removeItem: async (e) =>
                pn() ? window.sessionStorage.removeItem(e) : Promise.resolve(),
              clear: async () =>
                pn() ? window.sessionStorage.clear() : Promise.resolve(),
              length: async () =>
                pn() ? window.sessionStorage.length : Promise.resolve(0),
            },
          },
          settings: a,
          init: cn(r),
          _pixelInfo: { ...n, surface: o },
        };
        return (
          Q(ee) &&
            (c.customerPrivacy = {
              subscribe: (e, r, a) => (
                s && Kt(r),
                t.subscribe(e, r, {
                  ...a,
                  pixelRuntimeConfig: n,
                  shopId: i,
                  surface: o,
                  scope: me.WebPixelExtension,
                })
              ),
            }),
          c
        );
      }
      const mn = "remote-ui::ready",
        hn = (e, t, { important: n = !1 } = {}) =>
          Object.keys(t).forEach((i) => {
            const o = t[i],
              [r = "", s = n ? "important" : void 0] = Array.isArray(o)
                ? o
                : [o];
            e.style.setProperty(i, r, s);
          });
      async function bn({
        sandboxId: e,
        webPixelConfig: t,
        storefrontBaseUrl: n,
      }) {
        const { search: i } = self.location,
          s = t.id,
          a = t.type.toLowerCase(),
          c = [
            Ce(n),
            "/wpm",
            `@${r}`,
            `/${a}`,
            `/web-pixel-${s}`,
            `@${t.scriptVersion}`,
            "/sandbox",
            `/${o}`,
            /\.(js|json|xml)$/.test(self.location.pathname)
              ? ""
              : self.location.pathname,
            i,
          ];
        if (n.match(/spin\.dev\/?/)) {
          const e = i.length ? "&" : "?";
          c.push(`${i}${e}fast_storefront_renderer=1`);
        }
        return (function (
          e,
          { terminate: t = !0, targetOrigin: n = "*" } = {}
        ) {
          var i;
          if ("undefined" == typeof window)
            throw new Error(
              "You can only run fromIframe() in a browser context, but no window was found."
            );
          const o = new WeakMap();
          let r;
          function s(t) {
            t.source === e.contentWindow &&
              t.data === mn &&
              (window.removeEventListener("message", s), r());
          }
          null === (i = e.contentWindow) ||
            void 0 === i ||
            i.postMessage(mn, n);
          const a = new Promise((e) => {
            (r = e), window.addEventListener("message", s);
          });
          return {
            async postMessage(t, i) {
              var o;
              await a,
                null === (o = e.contentWindow) ||
                  void 0 === o ||
                  o.postMessage(t, n, i);
            },
            addEventListener(t, n) {
              const i = (t) => {
                t.source === e.contentWindow && n(t);
              };
              o.set(n, i), self.addEventListener(t, i);
            },
            removeEventListener(e, t) {
              const n = o.get(t);
              null != n && (o.delete(t), self.removeEventListener(e, n));
            },
            terminate() {
              window.removeEventListener("message", s), t && e.remove();
            },
          };
        })(
          await (async function ({ id: e, src: t, privileges: n }) {
            const i = document.querySelector(`iframe#${e}`);
            if (i && "IFRAME" === i.tagName) return i;
            const o = document.createElement("iframe");
            if (!t) {
              const e = new xe("src or srcdoc must be provided");
              throw (
                (_e.notify(e, {
                  context: "v0/createIframe",
                  unhandled: !1,
                  severity: "warning",
                }),
                e)
              );
            }
            if (
              (o.setAttribute("src", t),
              o.setAttribute("id", e),
              o.setAttribute("name", e),
              o.setAttribute("sandbox", n.join(" ")),
              o.setAttribute("tabIndex", "-1"),
              o.setAttribute("aria-hidden", "true"),
              !(function (e) {
                return "sandbox" in e;
              })(o))
            ) {
              const e = new xe(
                "browser does not support the sandbox attribute on IFrames"
              );
              throw (
                (_e.notify(e, {
                  context: "v0/createIframe",
                  unhandled: !1,
                  severity: "warning",
                }),
                e)
              );
            }
            return (
              hn(
                o,
                { height: "0", width: "0", visibility: "hidden" },
                { important: !0 }
              ),
              await (function (e) {
                return new Promise((t, n) => {
                  const i = () => {
                    try {
                      let n = document.querySelector(
                        "#WebPixelsManagerSandboxContainer"
                      );
                      n ||
                        ((n = document.createElement("div")),
                        n.setAttribute(
                          "id",
                          "WebPixelsManagerSandboxContainer"
                        ),
                        n.setAttribute("aria-hidden", "true"),
                        n.setAttribute("tabIndex", "-1"),
                        hn(
                          n,
                          {
                            height: "0",
                            width: "0",
                            position: "fixed",
                            visibility: "hidden",
                            overflow: "hidden",
                            "z-index": "-100",
                            margin: "0",
                            padding: "0",
                            border: "0",
                          },
                          { important: !0 }
                        ),
                        document.body.appendChild(n)),
                        document.querySelector(`#${e.id}`) || n.appendChild(e),
                        t(e);
                    } catch (i) {
                      n(i);
                    }
                  };
                  if (document.body) i();
                  else {
                    const e = () => {
                      "loading" !== document.readyState &&
                        (i(),
                        document.removeEventListener("readystatechange", e));
                    };
                    document.addEventListener("readystatechange", e);
                  }
                });
              })(o),
              o
            );
          })({
            id: e,
            src: c.join(""),
            privileges: ["allow-scripts", "allow-forms"],
          })
        );
      }
      let wn;
      const vn = () => (
        wn ||
          (wn = {
            localStorageItems: { ...self.localStorage },
            sessionStorageItems: { ...self.sessionStorage },
          }),
        wn
      );
      class gn extends Error {
        constructor(...e) {
          super(...e),
            (this.name = "SandboxAlreadyCreatedError"),
            (this.message = "Sandbox already created.");
        }
      }
      async function yn({
        webPixelConfig: e,
        eventBus: t,
        customerPrivacyEventBus: n,
        shopId: i,
        storefrontBaseUrl: s,
        surface: a,
        initData: c,
      }) {
        const l = `web-pixel-sandbox-${e.type}-${e.id}-${e.runtimeContext}-${r}`;
        if (e.runtimeContext === de.Lax && document.getElementById(l)) {
          const t = new gn();
          return (
            _e.notify(t, {
              pixelId: e.id,
              pixelType: e.type,
              runtimeContext: e.runtimeContext,
              shopId: i,
              context: "v0/createWebPixelSandbox/alreadyCreatedError",
              userAgent: self.navigator.userAgent,
              hashVersionSandbox: r,
              sandboxUrl: self.location.href || "unknown",
              options: { sampleRate: 15 },
            }),
            !1
          );
        }
        let u, d;
        switch (e.runtimeContext) {
          case de.Strict:
            [u, d] = await (async function ({
              sandboxId: e,
              webPixelConfig: t,
              storefrontBaseUrl: n,
            }) {
              const i = t.id,
                s = [
                  Ce(n),
                  "/wpm",
                  `@${r}`,
                  `/web-pixel-${i}`,
                  `@${t.scriptVersion}`,
                  "/sandbox",
                  `/worker.${o}.js`,
                ];
              n.match(/spin\.dev\/?/) && s.push("?fast_storefront_renderer=1");
              const a = s.join(""),
                c = new Worker(a, {
                  name: e,
                  type: "classic",
                  credentials: "omit",
                }),
                l = new Promise((e, t) => {
                  const n = () => {
                    c.removeEventListener("error", n),
                      t(
                        new Error(
                          `Failed to load web worker for pixel ${i} with url ${a}}`
                        )
                      );
                  };
                  c.addEventListener("error", n);
                });
              return [c, l];
            })({ sandboxId: l, webPixelConfig: e, storefrontBaseUrl: s });
            break;
          case de.Lax:
            u = await bn({
              sandboxId: l,
              webPixelConfig: e,
              storefrontBaseUrl: s,
            });
            break;
          default:
            throw new Error(`Unsupported runtime context: ${e.runtimeContext}`);
        }
        const p = (function (
            e,
            { uuid: t = on, createEncoder: n = Jt, callable: i } = {}
          ) {
            let o = !1,
              r = e;
            const s = new Map(),
              a = new Map(),
              c = (function (e, t) {
                let n;
                if (null == t) {
                  if ("function" != typeof Proxy)
                    throw new Error(
                      "You must pass an array of callable methods in environments without Proxies."
                    );
                  const t = new Map();
                  n = new Proxy(
                    {},
                    {
                      get(n, i) {
                        if (t.has(i)) return t.get(i);
                        const o = e(i);
                        return t.set(i, o), o;
                      },
                    }
                  );
                } else {
                  n = {};
                  for (const i of t)
                    Object.defineProperty(n, i, {
                      value: e(i),
                      writable: !1,
                      configurable: !0,
                      enumerable: !0,
                    });
                }
                return n;
              })(p, i),
              l = n({
                uuid: t,
                release(e) {
                  u(en, [e]);
                },
                call(e, n, i) {
                  const o = t(),
                    r = f(o, i),
                    [s, a] = l.encode(n);
                  return u(tn, [o, e, s], a), r;
                },
              });
            return (
              r.addEventListener("message", d),
              {
                call: c,
                replace(e) {
                  const t = r;
                  (r = e),
                    t.removeEventListener("message", d),
                    e.addEventListener("message", d);
                },
                expose(e) {
                  for (const t of Object.keys(e)) {
                    const n = e[t];
                    "function" == typeof n ? s.set(t, n) : s.delete(t);
                  }
                },
                callable(...e) {
                  if (null != i)
                    for (const t of e)
                      Object.defineProperty(c, t, {
                        value: p(t),
                        writable: !1,
                        configurable: !0,
                        enumerable: !0,
                      });
                },
                terminate() {
                  u(Qt, void 0), m(), r.terminate && r.terminate();
                },
              }
            );
            function u(e, t, n) {
              o || r.postMessage(t ? [e, t] : [e], n);
            }
            async function d(e) {
              const { data: t } = e;
              if (null != t && Array.isArray(t))
                switch (t[0]) {
                  case Qt:
                    m();
                    break;
                  case Yt: {
                    const e = new Ft(),
                      [i, o, r] = t[1],
                      a = s.get(o);
                    try {
                      if (null == a)
                        throw new Error(
                          `No '${o}' method is exposed on this endpoint`
                        );
                      const [t, n] = l.encode(await a(...l.decode(r, [e])));
                      u(Zt, [i, void 0, t], n);
                    } catch (n) {
                      const { name: e, message: t, stack: o } = n;
                      throw (u(Zt, [i, { name: e, message: t, stack: o }]), n);
                    } finally {
                      e.release();
                    }
                    break;
                  }
                  case Zt: {
                    const [e] = t[1];
                    a.get(e)(...t[1]), a.delete(e);
                    break;
                  }
                  case en: {
                    const [e] = t[1];
                    l.release(e);
                    break;
                  }
                  case nn: {
                    const [e] = t[1];
                    a.get(e)(...t[1]), a.delete(e);
                    break;
                  }
                  case tn: {
                    const [e, i, o] = t[1];
                    try {
                      const t = await l.call(i, o),
                        [n, r] = l.encode(t);
                      u(nn, [e, void 0, n], r);
                    } catch (n) {
                      const { name: t, message: i, stack: o } = n;
                      throw (u(nn, [e, { name: t, message: i, stack: o }]), n);
                    }
                    break;
                  }
                }
            }
            function p(e) {
              return (...n) => {
                if (o)
                  return Promise.reject(
                    new Error(
                      "You attempted to call a function on a terminated web worker."
                    )
                  );
                if ("string" != typeof e && "number" != typeof e)
                  return Promise.reject(
                    new Error(
                      `Can’t call a symbol method on a remote endpoint: ${e.toString()}`
                    )
                  );
                const i = t(),
                  r = f(i),
                  [s, a] = l.encode(n);
                return u(Yt, [i, e, s], a), r;
              };
            }
            function f(e, t) {
              return new Promise((n, i) => {
                a.set(e, (e, o, r) => {
                  if (null == o) n(r && l.decode(r, t));
                  else {
                    const e = new Error();
                    Object.assign(e, o), i(e);
                  }
                });
              });
            }
            function m() {
              var e;
              (o = !0),
                s.clear(),
                a.clear(),
                null === (e = l.terminate) || void 0 === e || e.call(l),
                r.removeEventListener("message", d);
            }
          })(u, { callable: ["initialize"] }),
          f = fn({
            eventBus: t,
            customerPrivacyEventBus: n,
            webPixelConfig: e,
            shopId: i,
            surface: a,
            initData: c,
            forRPC: !0,
          }),
          m = {
            self: { origin: { get: async () => self.origin } },
            document: { referrer: { get: async () => document.referrer } },
          },
          h = Rt();
        let b = {
          status: "unknown",
          hashVersion: "unknown",
          sandboxUrl: "unknown",
        };
        const w =
          e.runtimeContext === de.Lax
            ? vn()
            : { localStorageItems: {}, sessionStorageItems: {} };
        try {
          const t = [
            p.call
              .initialize({
                pageTitle: self.document.title,
                webPixelConfig: e,
                shopId: i,
                webPixelApi: f,
                internalApi: m,
                cookie: self.document.cookie,
                cookieRestrictedDomains: an(),
                origin: self.origin,
                referrer: self.document.referrer,
                ...w,
              })
              .then((e) => {
                b = e;
              }),
          ];
          d && t.push(d), await Promise.race(t);
        } catch (v) {
          return !1;
        }
        if (r !== b.hashVersion) {
          const t = new Error(
            `The main bundle hash (${r}) does not match the sandbox hash (${b.hashVersion})`
          );
          _e.notify(t, {
            severity: "warning",
            pixelId: e.id,
            pixelType: e.type,
            runtimeContext: e.runtimeContext,
            context: "v0/createSandbox/hashMismatch",
            shopId: i,
            userAgent: h.navigator.userAgent || self.navigator.userAgent,
            hashVersionSandbox: b.hashVersion,
            sandboxUrl: b.sandboxUrl,
          });
        }
        return !0;
      }
      const xn = () => {
        let e, t;
        return {
          promise: new Promise((...n) => {
            [e, t] = n;
          }),
          resolve: e,
          reject: t,
        };
      };
      class kn extends Error {
        constructor(...e) {
          super(...e),
            (this.name = "InvalidExtensionPointError"),
            (this.message = "Invalid Extension Point");
        }
      }
      class En extends Error {
        constructor(...e) {
          super(...e), (this.name = "PixelError");
        }
      }
      const _n = new Map();
      async function Sn(t) {
        var n;
        let s = !1;
        const { webPixelConfig: a, eventBus: l, shopId: u, surface: d } = t,
          p = a.id,
          f = a.type.toLowerCase();
        if (a.runtimeContext === de.Open && !Q("5de24938")) return !1;
        var m, h;
        switch (
          (a.restrictions ||
            (a.restrictions = (function (e, t) {
              if (!e) return {};
              const n = (function (e) {
                  return Vt.includes(String(e));
                })(e),
                i = t !== fe.StorefrontRenderer;
              return n && i
                ? {
                    allowedEvents: [],
                    preventLoadingBeforeEvent: `shopify:app:pixels:load:${e}`,
                  }
                : n
                ? { allowedEvents: [] }
                : {};
            })(String(a.apiClientId), d)),
          await Promise.all([
            st(rt(a.privacyPurposes)),
            ((m = (e, t) =>
              l.subscribe(e, t, {
                pixelRuntimeConfig: { apiClientId: "PIXEL-LOADER" },
              })),
            (h =
              null == (n = a.restrictions)
                ? void 0
                : n.preventLoadingBeforeEvent),
            new Promise((e, t) => {
              void 0 === h
                ? e(!0)
                : m(h, () => {
                    e(!0);
                  });
            })),
          ]),
          Pe("pixel:register", "start", { pixelId: p, source: f }),
          a.runtimeContext)
        ) {
          case de.Lax:
          case de.Strict:
            s = await yn(t);
            break;
          case de.Open:
            try {
              s = await (async function ({
                webPixelConfig: t,
                eventBus: n,
                customerPrivacyEventBus: i,
                shopId: s,
                storefrontBaseUrl: a,
                surface: l,
                initData: u,
              }) {
                var d;
                const { promise: p, resolve: f, reject: m } = xn(),
                  { id: h, type: b } = t,
                  w = `${h}-${b}`.toLowerCase();
                _n.set(w, () => ({
                  webPixelApi: fn({
                    eventBus: n,
                    customerPrivacyEventBus: i,
                    webPixelConfig: t,
                    shopId: s,
                    surface: l,
                    initData: u,
                    forRPC: !0,
                  }),
                  resolve: f,
                  reject: m,
                }));
                const v = a.match(/spin\.dev\/?/),
                  g = [
                    Ce(a),
                    `/wpm@${r}`,
                    `/${t.type.toLocaleLowerCase()}`,
                    `/web-pixel-${h}@${t.scriptVersion}`,
                    `/pixel.${o}.js`,
                    v ? "?fast_storefront_renderer=1" : "",
                  ].join("");
                if (
                  !("createShopifyExtend" in (null != (d = self[e]) ? d : {}))
                ) {
                  const t = (e, t) => {
                    const n = _n.get(`${e}-${t}`.toLowerCase());
                    if (!n)
                      return (
                        m(new Error(`No openPixelFn found for ${e}-${t}.`)),
                        null
                      );
                    const { resolve: i, reject: o, webPixelApi: r } = n();
                    return (
                      r || o(new Error(`No api found for pixel ${e}-${t}.`)),
                      Object.freeze({
                        extend: (e, t) => {
                          e !== c && o(new kn());
                          try {
                            t.call(r, r), i(!0);
                          } catch (n) {
                            o(new En(n));
                          }
                        },
                      })
                    );
                  };
                  Object.defineProperty(self, e, {
                    value: {},
                    enumerable: !0,
                    writable: !1,
                    configurable: !1,
                  }),
                    Object.defineProperty(self[e], "createShopifyExtend", {
                      value: t,
                      enumerable: !0,
                      writable: !1,
                      configurable: !1,
                    });
                }
                var y;
                return (
                  await ((y = g),
                  new Promise((e, t) => {
                    try {
                      const n = document.createElement("script");
                      (n.src = y),
                        (n.async = !0),
                        (n.onload = () => {
                          e();
                        }),
                        (n.onerror = () => {
                          i(), t(new Error(`Failed to load script: ${y}`));
                        });
                      const i = () => {
                        (n.onload = null), (n.onerror = null), n.remove();
                      };
                      document.head.appendChild(n);
                    } catch (n) {
                      t(n);
                    }
                  })),
                  p
                );
              })(t);
            } catch (v) {
              s = !1;
            }
            break;
          default:
            throw new Error(`Invalid runtimeContext: ${a.runtimeContext}`);
        }
        const b = pe(a),
          { measurement: w } = Oe("pixel:register", { pixelId: p, source: f });
        return (
          qe("register", {
            version: i,
            pageUrl: self.location.href,
            shopId: u,
            surface: d,
            pixelId: p,
            pixelAppId: b,
            pixelSource: a.type,
            pixelRuntimeContext: a.runtimeContext,
            pixelScriptVersion: a.scriptVersion,
            pixelConfiguration: null == a ? void 0 : a.configuration,
            pixelEventSchemaVersion: a.eventPayloadVersion,
            status: "registered",
            userCanBeTracked: D().toString(),
            shopPrefs: "unknown",
            bundleTarget: o,
            errorMsg: "N/A",
            duration: null == w ? void 0 : w.duration,
            startTime: null == w ? void 0 : w.startTime,
            sessionId: ut(),
          }),
          s
        );
      }
      const Cn = (function () {
        const e =
          null != (t = self.Shopify) && t.Checkout
            ? fe.Shopify
            : null != (n = self.Shopify) &&
              null != (r = n.analytics) &&
              r.replayQueue
            ? fe.StorefrontRenderer
            : fe.CheckoutOne;
        var t, n, r;
        const s = self.location.href,
          a = $e("load", {
            version: i,
            bundleTarget: o,
            pageUrl: s,
            status: "loading",
            surface: e,
          }),
          c = {
            publish: () => !1,
            publishCustomEvent: () => !1,
            publishDomEvent: () => !1,
            visitor: () => !1,
            subscribe: () => () => !1,
          };
        try {
          const e = ut();
          return (
            (a.payload.status = "loaded"),
            Be(a),
            {
              init(t) {
                if (null !== self.location.href.match(/\/wpm@(.+)\/sandbox/))
                  return c;
                const {
                  shopId: n,
                  surface: r = fe.Unknown,
                  initData: a,
                  enabledBetaFlags: l,
                } = t;
                let { webPixelsConfigList: u } = t || {};
                Y();
                const d = self.location.origin;
                Me(d),
                  (function (e = []) {
                    (Array.isArray(e) ? e : [e]).forEach((e) => Z.add(e));
                  })(l);
                const p = D().toString(),
                  f = $e("unload", {
                    version: i,
                    bundleTarget: o,
                    pageUrl: s,
                    shopId: n,
                    surface: r,
                    isCompleted: "false",
                    runtimeErrorCaught: "false",
                    userCanBeTracked: p,
                    sessionId: e,
                  });
                var m;
                (m = f),
                  window.addEventListener("pagehide", () => {
                    var e, t;
                    (m.payload.pageDuration =
                      null == (e = Oe("page:session")) ||
                      null == (t = e.measurement)
                        ? void 0
                        : t.duration),
                      Be(m),
                      Fe({ skipXhr: !0 });
                  });
                const h = Ut(t),
                  b = (function (e) {
                    const t = new ie({
                      bufferSize: 1e3,
                      subscribeAllKey: "all_customer_privacy_events",
                      eligibility: he,
                    });
                    return {
                      publish(e, n, i) {
                        if ("string" != typeof e)
                          throw new Error(
                            "Expected event name to be a string, but got " +
                              typeof e
                          );
                        if (e !== I)
                          throw new Error(
                            `Expected event name to be a ${I}, but got "${e}".`
                          );
                        return t.publish(e, n, i);
                      },
                      subscribe(n, r, s = {}) {
                        if (n !== I)
                          throw new Error(
                            `Event name "${n}" is not supported in the CustomerPrivacyEventBus.`
                          );
                        return t.subscribe(
                          n,
                          (t) => {
                            var n, a, c, l, u, d, p, f;
                            if (
                              e === fe.CheckoutOneSdk &&
                              s.scope !== me.CheckoutOneSdk
                            )
                              return;
                            const m = {
                              configuration:
                                null == (n = s.pixelRuntimeConfig)
                                  ? void 0
                                  : n.configuration,
                              eventPayloadVersion:
                                s.schemaVersion ||
                                (null == (a = s.pixelRuntimeConfig)
                                  ? void 0
                                  : a.eventPayloadVersion) ||
                                "unknown",
                              id:
                                (null == (c = s.pixelRuntimeConfig)
                                  ? void 0
                                  : c.id) || "unknown",
                              type:
                                (null == (l = s.pixelRuntimeConfig)
                                  ? void 0
                                  : l.type) || "unknown",
                              runtimeContext:
                                (null == (u = s.pixelRuntimeConfig)
                                  ? void 0
                                  : u.runtimeContext) || "unknown",
                              restrictions:
                                null == (d = s.pixelRuntimeConfig)
                                  ? void 0
                                  : d.restrictions,
                              scriptVersion:
                                (null == (p = s.pixelRuntimeConfig)
                                  ? void 0
                                  : p.scriptVersion) || "unknown",
                              apiClientId:
                                null == (f = s.pixelRuntimeConfig)
                                  ? void 0
                                  : f.apiClientId,
                            };
                            r.call(t, t),
                              qe("subscriberEventEmitPrivacy", {
                                version: i,
                                bundleTarget: o,
                                pageUrl: self.location.href,
                                shopId: s.shopId,
                                surface: s.surface,
                                pixelId: m.id,
                                pixelAppId: pe(m),
                                pixelSource: m.type,
                                pixelRuntimeContext: m.runtimeContext,
                                pixelScriptVersion: m.scriptVersion,
                                pixelConfiguration: m.configuration,
                                pixelEventSchemaVersion: m.eventPayloadVersion,
                                eventName: I,
                                eventId: le(),
                              });
                          },
                          s
                        );
                      },
                    };
                  })(r),
                  w = {
                    severity: "warning",
                    context: "v0/createWebPixelsManager/init",
                    unhandled: !1,
                    shopId: n,
                    initConfig: t,
                  },
                  v = $e("init", {
                    version: i,
                    bundleTarget: o,
                    pageUrl: s,
                    shopId: n,
                    surface: r,
                    status: "initializing",
                    userCanBeTracked: p,
                  });
                try {
                  var g, y;
                  if (self.Shopify && !0 === self.Shopify.designMode)
                    return (
                      self.console &&
                        console.log(
                          "[WebPixelsManager] Prevented from executing in the Theme Editor"
                        ),
                      c
                    );
                  if (/^web-pixel-sandbox/.test(self.name)) {
                    const e = new xe(
                      "WebPixelsManager: browser library is being run in a sandbox"
                    );
                    throw ((w.library = "browser"), _e.notify(e, w), e);
                  }
                  if (!n) {
                    const e = new xe("WebPixelsManager: shopId is required");
                    throw (_e.notify(e, w), e);
                  }
                  if (!d) {
                    const e = new xe(
                      "WebPixelsManager: storefrontBaseUrl is required"
                    );
                    throw (_e.notify(e, w), e);
                  }
                  if (
                    !(function (e) {
                      try {
                        return new URL(e), !0;
                      } catch (t) {
                        return (function (e) {
                          const t = new RegExp(
                            "^(https?:\\/\\/)((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)*[a-z]{1,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
                            "i"
                          );
                          return Boolean(t.test(e));
                        })(e);
                      }
                    })(d)
                  ) {
                    const e = new xe(
                      `WebPixelsManager: storefrontBaseUrl is not a valid absolute URL: ${d}`
                    );
                    throw (_e.notify(e, w), e);
                  }
                  r === fe.CheckoutOneSdk && (u = []);
                  const e = u.reduce(
                    (e, t) => {
                      var i, o;
                      (t.type = t.type.toUpperCase()),
                        (t.runtimeContext =
                          null == (i = t.runtimeContext)
                            ? void 0
                            : i.toUpperCase());
                      const s = Sn({
                        webPixelConfig: t,
                        eventBus: h,
                        customerPrivacyEventBus: b,
                        shopId: n,
                        storefrontBaseUrl: d,
                        surface: r,
                        initData: a,
                      });
                      return (
                        null != (o = t.restrictions) &&
                        o.preventLoadingBeforeEvent
                          ? e.waiting.push(s)
                          : e.ready.push(s),
                        e
                      );
                    },
                    { ready: [], waiting: [] }
                  );
                  Promise.all(e.ready)
                    .then(() =>
                      (function (e) {
                        const { measurement: t } = Oe("completed");
                        (e.payload.isCompleted = "true"),
                          (e.payload.runTimeDuration =
                            null == t ? void 0 : t.duration),
                          (e.payload.startTime =
                            null == t ? void 0 : t.startTime);
                      })(f)
                    )
                    .catch((e) => {
                      self.console && console.error("[Web Pixels]", e);
                    }),
                    Promise.all(e.waiting).catch(() => {}),
                    r !== fe.CheckoutOne &&
                      r !== fe.CheckoutOneSdk &&
                      (C(h.publish, a),
                      Q("d04dc9f4") && kt(h),
                      (function () {
                        if (!nt)
                          try {
                            document.addEventListener(I, tt), (nt = !0);
                          } catch (e) {
                            _e.notify(e, {
                              context:
                                "v0/onConsentCollected/createOnConsentCollectedListener",
                              unhandled: !1,
                            });
                          }
                      })(),
                      Q(ee) &&
                        et((e) => {
                          b.publish(I, {
                            customerPrivacy: {
                              analyticsProcessingAllowed:
                                e.detail.analyticsAllowed,
                              marketingAllowed: e.detail.marketingAllowed,
                              preferencesProcessingAllowed:
                                e.detail.preferencesAllowed,
                              saleOfDataAllowed: e.detail.saleOfDataAllowed,
                            },
                          });
                        })),
                    (v.payload.status = "initialized"),
                    Be(v);
                  const t =
                    ((x = {
                      shopId: n,
                      surface: r,
                      pageUrl: s,
                      clientId:
                        null != (g = Ye(document.cookie)._shopify_y) ? g : "",
                      version: i,
                      customerId:
                        null == a || null == (y = a.customer) ? void 0 : y.id,
                    }),
                    {
                      visitor: (e, t) =>
                        (function (e, t, n) {
                          const i = (function (e, t) {
                            return e && (e.email || e.phone)
                              ? null != e &&
                                e.email &&
                                "string" != typeof e.email
                                ? {
                                    valid: !1,
                                    error: "Email must be of type string",
                                  }
                                : null != e &&
                                  e.phone &&
                                  "string" != typeof e.phone
                                ? {
                                    valid: !1,
                                    error: "Phone must be of type string",
                                  }
                                : null != t &&
                                  t.appId &&
                                  "string" != typeof t.appId
                                ? {
                                    valid: !1,
                                    error: "appId must be of type string",
                                  }
                                : null != t &&
                                  t.apiClientId &&
                                  "string" != typeof t.apiClientId
                                ? {
                                    valid: !1,
                                    error: "apiClientId must be of type string",
                                  }
                                : { valid: !0 }
                              : {
                                  valid: !1,
                                  error:
                                    "Visitor must have one of phone or email",
                                };
                          })(t, n);
                          if (!i.valid)
                            throw new ct(
                              i.error || "Invalid input payload to visitorApi"
                            );
                          const o = {
                            ...e,
                            ...t,
                            apiClientId:
                              (null == n ? void 0 : n.appId) ||
                              (null == n ? void 0 : n.apiClientId),
                          };
                          return (
                            st({
                              analytics: !0,
                              marketing: !0,
                              preferences: !1,
                              sale_of_data: !1,
                            })
                              .then(() => qe("visitor", o))
                              .catch(() =>
                                _e.notify("visitor error", {
                                  severity: "error",
                                  context: `v0/visitor-${e.surface}`,
                                  unhandled: !1,
                                  shopId: e.shopId,
                                })
                              ),
                            !0
                          );
                        })(x, e, t),
                    });
                  return {
                    publish: (e, t, n = {}) => h.publish(e, t, n),
                    publishCustomEvent: (e, t, n = {}) =>
                      h.publishCustomEvent(e, t, n),
                    publishDomEvent: (e, t, n = {}) =>
                      h.publishDomEvent(e, t, n),
                    subscribe: (e, t, i) =>
                      h.subscribe(e, t, {
                        ...i,
                        shopId: n,
                        surface: r,
                        scope:
                          r === fe.CheckoutOneSdk ? me.CheckoutOneSdk : void 0,
                      }),
                    visitor: (e, n) => t.visitor(e, n),
                  };
                } catch (k) {
                  return (
                    k instanceof xe ||
                      _e.notify(k, {
                        context: "v0/init",
                        shopId: n,
                        initConfig: t,
                      }),
                    self.console && console.error(k),
                    (v.payload.status = "failed"),
                    (v.payload.errorMsg = null == k ? void 0 : k.message),
                    Be(v),
                    (f.payload.runtimeErrorCaught = "true"),
                    c
                  );
                }
                var x;
              },
            }
          );
        } catch (l) {
          return (
            l instanceof xe ||
              _e.notify(l, { context: "v0/createWebPixelsManager" }),
            self.console && console.error(l),
            (a.payload.status = "manager-create-error"),
            (a.payload.errorMsg = null == l ? void 0 : l.message),
            Be(a, !0),
            { init: () => c }
          );
        }
      })();
      self[e] = Cn;
    })();
})();
