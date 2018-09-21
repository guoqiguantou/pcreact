query = {"key": "BK3BZ-IF53P-CRKDX-VBVBN-PGIBK-7YFWW", "referer": "myapp"};
window._DEFAULT_CITY = {
    "module": "geolocation",
    "type": "ip",
    "adcode": 340504,
    "nation": "中国",
    "province": "安徽省",
    "city": "马鞍山市",
    "district": "",
    "addr": "",
    "lat": 31.68216,
    "lng": 118.49853,
    "accuracy": 10000,
    "ip": "60.174.141.18"
};
window.qq = window.qq || {}, qq.maps = qq.maps || {}, window.soso || (window.soso = qq), soso.maps || (soso.maps = qq.maps), !function () {
    function e(e) {
        var t = document.createElement("SCRIPT");
        t.setAttribute("type", "text/javascript"), t.setAttribute("charset", "utf-8"), t.setAttribute("src", e), document.getElementsByTagName("head")[0].appendChild(t)
    }

    !function () {
        var e = 50, t = 25, o = {}, n = [].slice, i = {}, r = function (e, t, n, r) {
            var a = i[e];
            a || (a = i[e] = {}), a[t] = a[t] || [], a[t].push({func: n, context: r || o})
        }, a = function (e, t, n, i) {
            var a = function () {
                return o.off(e, t, a), n.apply(i || o, arguments)
            };
            r(e, t, a, i)
        }, s = function (o, r) {
            if (i[o] && i[o][r] && i[o][r].length) {
                for (var a = i[o][r], s = [], c = a.length; c--;) s.push({handler: a[c], args: n.call(arguments, 1)});
                !function () {
                    var o = +new Date;
                    do {
                        var n = s.shift(), i = n.handler;
                        try {
                            i.func.apply(i.context, n.args)
                        } catch (r) {
                        }
                    } while (s.length && +new Date - o < e);
                    s.length > 0 && setTimeout(arguments.callee, t)
                }()
            }
        }, c = function (e, t, n, r) {
            if (r = r || o, i[e] && i[e][t] && i[e][t].length) for (var a, s = i[e][t], c = s.length; c--;) a = s[c], a.func === n && a.context === r && s.splice(c, 1)
        };
        o.on = r, o.once = a, o.trigger = s, o.off = c, window.listener = window.listener || o
    }(), !function (e) {
        "use strict";

        function t() {
        }

        function n(e, t) {
            for (var o = e.length; o--;) if (e[o].listener === t) return o;
            return -1
        }

        function i(e) {
            return function () {
                return this[e].apply(this, arguments)
            }
        }

        function r(e) {
            return "function" == typeof e || e instanceof RegExp ? !0 : e && "object" == typeof e ? r(e.listener) : !1
        }

        var a = t.prototype, s = e.EventEmitter;
        a.getListeners = function (e) {
            var t, o, n = this._getEvents();
            if (e instanceof RegExp) {
                t = {};
                for (o in n) n.hasOwnProperty(o) && e.test(o) && (t[o] = n[o])
            } else t = n[e] || (n[e] = []);
            return t
        }, a.flattenListeners = function (e) {
            var t, o = [];
            for (t = 0; t < e.length; t += 1) o.push(e[t].listener);
            return o
        }, a.getListenersAsObject = function (e) {
            var t, o = this.getListeners(e);
            return o instanceof Array && (t = {}, t[e] = o), t || o
        }, a.addListener = function (e, t) {
            if (!r(t)) throw new TypeError("listener must be a function");
            var o, i = this.getListenersAsObject(e), a = "object" == typeof t;
            for (o in i) i.hasOwnProperty(o) && -1 === n(i[o], t) && i[o].push(a ? t : {listener: t, once: !1});
            return this
        }, a.on = i("addListener"), a.addOnceListener = function (e, t) {
            return this.addListener(e, {listener: t, once: !0})
        }, a.once = i("addOnceListener"), a.defineEvent = function (e) {
            return this.getListeners(e), this
        }, a.defineEvents = function (e) {
            for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
            return this
        }, a.removeListener = function (e, t) {
            var o, i, r = this.getListenersAsObject(e);
            for (i in r) r.hasOwnProperty(i) && (o = n(r[i], t), -1 !== o && r[i].splice(o, 1));
            return this
        }, a.off = i("removeListener"), a.addListeners = function (e, t) {
            return this.manipulateListeners(!1, e, t)
        }, a.removeListeners = function (e, t) {
            return this.manipulateListeners(!0, e, t)
        }, a.manipulateListeners = function (e, t, o) {
            var n, i, r = e ? this.removeListener : this.addListener, a = e ? this.removeListeners : this.addListeners;
            if ("object" != typeof t || t instanceof RegExp) for (n = o.length; n--;) r.call(this, t, o[n]); else for (n in t) t.hasOwnProperty(n) && (i = t[n]) && ("function" == typeof i ? r.call(this, n, i) : a.call(this, n, i));
            return this
        }, a.removeEvent = function (e) {
            var t, o = typeof e, n = this._getEvents();
            if ("string" === o) delete n[e]; else if (e instanceof RegExp) for (t in n) n.hasOwnProperty(t) && e.test(t) && delete n[t]; else delete this._events;
            return this
        }, a.removeAllListeners = i("removeEvent"), a.emitEvent = function (e, t) {
            var o, n, i, r, a, s = this.getListenersAsObject(e);
            for (r in s) if (s.hasOwnProperty(r)) for (o = s[r].slice(0), i = 0; i < o.length; i++) n = o[i], n.once === !0 && this.removeListener(e, n.listener), a = n.listener.apply(this, t || []), a === this._getOnceReturnValue() && this.removeListener(e, n.listener);
            return this
        }, a.trigger = i("emitEvent"), a.emit = function (e) {
            var t = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(e, t)
        }, a.setOnceReturnValue = function (e) {
            return this._onceReturnValue = e, this
        }, a._getOnceReturnValue = function () {
            return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
        }, a._getEvents = function () {
            return this._events || (this._events = {})
        }, t.noConflict = function () {
            return e.EventEmitter = s, t
        }, "function" == typeof o && o.amd ? o(function () {
            return t
        }) : "object" == typeof module && module.exports ? module.exports = t : e.EventEmitter = t
    }(this || {});
    var t, o;
    !function (e) {
        if (!t) {
            var n = document.getElementsByTagName("head")[0], i = {}, r = {}, a = {}, s = {}, c = {}, l = {},
                u = function (e, o) {
                    for (var i = document.createDocumentFragment(), r = 0, a = e.length; a > r; r++) {
                        var c = e[r].id, l = e[r].url;
                        if (!(l in s)) {
                            s[l] = !0;
                            var u = document.createElement("script");
                            o && !function (e, n) {
                                var i = setTimeout(function () {
                                    o(n)
                                }, t.timeout);
                                e.onerror = function () {
                                    clearTimeout(i), o(n)
                                };
                                var r = function () {
                                    clearTimeout(i)
                                };
                                "onload" in e ? e.onload = r : e.onreadystatechange = function () {
                                    ("loaded" === this.readyState || "complete" === this.readyState) && r()
                                }
                            }(u, c), u.type = "text/javascript", u.src = l, i.appendChild(u)
                        }
                    }
                    n.appendChild(i)
                }, d = function (e, t, o) {
                    for (var n = [], r = 0, a = e.length; a > r; r++) {
                        var s = e[r], d = i[s] || (i[s] = []);
                        d.push(t);
                        var g, f = c[s] || c[s + ".js"] || {}, p = f.pkg;
                        g = p ? l[p].url || l[p].uri : f.url || f.uri || s, n.push({id: s, url: g})
                    }
                    u(n, o)
                };
            o = function (e, t) {
                e = e.replace(/\.js$/i, ""), r[e] = t;
                var o = i[e];
                if (o) {
                    for (var n = 0, a = o.length; a > n; n++) o[n]();
                    delete i[e]
                }
            }, t = function (e) {
                if (e && e.splice) return t.async.apply(this, arguments);
                e = t.alias(e);
                var o = a[e];
                if (o) return o.exports;
                var n = r[e];
                if (!n) throw"[ModJS] Cannot find module `" + e + "`";
                o = a[e] = {exports: {}, eventEmitter: this.__EventEmitter || (this.__EventEmitter = new EventEmitter)};
                var i = "function" == typeof n ? n.apply(o, [t, o.exports, o]) : n;
                return i && (o.exports = i), o.exports
            }, t.async = function (o, n, i) {
                function a(e) {
                    for (var o, n = 0, i = e.length; i > n; n++) {
                        var s = t.alias(e[n]);
                        s in l || (l[s] = !0, s in r ? (o = c[s] || c[s + ".js"], o && "deps" in o && a(o.deps)) : (g.push(s), u++, o = c[s] || c[s + ".js"], o && "deps" in o && a(o.deps)))
                    }
                }

                function s() {
                    if (0 === u--) {
                        for (var i = [], r = 0, a = o.length; a > r; r++) i[r] = t(o[r]);
                        n && n.apply(e, i)
                    }
                }

                "string" == typeof o && (o = [o]);
                var l = {}, u = 0, g = [];
                a(o), d(g, s, i), s()
            }, t.ensure = function (e, o) {
                t.async(e, function () {
                    o && o.call(this, t)
                })
            }, t.resourceMap = function (e) {
                var t, o;
                o = e.res;
                for (t in o) o.hasOwnProperty(t) && (c[t] = o[t]);
                o = e.pkg;
                for (t in o) o.hasOwnProperty(t) && (l[t] = o[t])
            }, t.loadJs = function (e) {
                if (!(e in s)) {
                    s[e] = !0;
                    var t = document.createElement("script");
                    t.type = "text/javascript", t.src = e, n.appendChild(t)
                }
            }, t.loadCss = function (e) {
                if (e.content) {
                    var t = document.createElement("style");
                    t.type = "text/css", t.styleSheet ? t.styleSheet.cssText = e.content : t.innerHTML = e.content, n.appendChild(t)
                } else if (e.url) {
                    var o = document.createElement("link");
                    o.href = e.url, o.rel = "stylesheet", o.type = "text/css", n.appendChild(o)
                }
            }, t.alias = function (e) {
                return e.replace(/\.js$/i, "")
            }, t.timeout = 5e3
        }
    }(this), o("geolocation:static/js/loc_boot.js", function (e, t, n) {
        !function () {
            var e = 50, t = 25, o = {}, n = [].slice, i = {}, r = function (e, t, n, r) {
                var a = i[e];
                a || (a = i[e] = {}), a[t] = a[t] || [], a[t].push({func: n, context: r || o})
            }, a = function (e, t, n, i) {
                var a = function () {
                    return o.off(e, t, a), n.apply(i || o, arguments)
                };
                r(e, t, a, i)
            }, s = function (o, r) {
                if (i[o] && i[o][r] && i[o][r].length) {
                    for (var a = i[o][r], s = [], c = a.length; c--;) s.push({
                        handler: a[c],
                        args: n.call(arguments, 1)
                    });
                    !function () {
                        var o = +new Date;
                        do {
                            var n = s.shift(), i = n.handler;
                            try {
                                i.func.apply(i.context, n.args)
                            } catch (r) {
                            }
                        } while (s.length && +new Date - o < e);
                        s.length > 0 && setTimeout(arguments.callee, t)
                    }()
                }
            }, c = function (e, t, n, r) {
                if (r = r || o, i[e] && i[e][t] && i[e][t].length) for (var a, s = i[e][t], c = s.length; c--;) a = s[c], a.func === n && a.context === r && s.splice(c, 1)
            };
            o.on = r, o.once = a, o.trigger = s, o.off = c, window.listener = window.listener || o
        }(), o("geolocation:static/js/util/detect.js", function (e, t, o) {
            var n = {}, i = n.os = {}, r = n.browser = {}, a = n.client = {}, s = navigator.userAgent;
            if ("string" == typeof s) {
                var c = s.match(/(android)\s+([\d.]+)/i), l = !u && s.match(/(iphone\sos)\s([\d_]+)/i),
                    u = s.match(/(ipad).*os\s([\d_]+)/i), d = !l && !u && s.match(/(ipod\sos)\s([\d_]+)/i),
                    g = s.match(/webkit\/([\d.]+)/i), f = s.match(/chrome\/([\d.]+)/i) || s.match(/crios\/([\d.]+)/i),
                    p = s.match(/firefox\/([\d.]+)/i), h = s.match(/mqqbrowser\/([\d\.]+)/i),
                    w = s.match(/ucbrowser\/([\d.]+)/i), m = s.match(/baidubrowser\/([\d\.]+)/i),
                    v = s.match(/QQ\/([\d\.]+)/), _ = s.match(/micromessenger\/([\d\.]+)/i);
                c && (i.android = !0, i.version = c[2]), l && (i.ios = i.iphone = !0, i.version = l[2].replace(/_/g, ".")), u && (i.ios = i.ipad = !0, i.version = u[2].replace(/_/g, ".")), d && (i.ios = i.ipod = !0, i.version = d[2].replace(/_/g, ".")), g && (r.webkit = !0, r.version = g[1]), f && (r.chrome = !0, r.version = f[1]), p && (r.firefox = !0, r.version = p[1]), h && (r.qqbrowser = !0, r.version = h[1]), w && (r.ucbrowser = !0, r.version = w[1]), m && (r.baidubrowser = !0, r.version = m[1]), v && (a.mqq = !0, a.version = v[1]), _ && (a.wechat = !0, a.version = _[1]), !i.ios || h || w || m || (r.safari = !0, r.version = i.version), !i.android || h || w || m || f || (r.android = !0, r.version = i.version), i.version = parseFloat(i.version), r.version = parseFloat(r.version), a.version = parseFloat(a.version)
            }
            o.exports = n
        }), o("geolocation:static/js/core/geolocation.js", function (e, t, o) {
            var n = e("geolocation:static/js/core/cachegeolocation"), i = e("geolocation:static/js/core/h5geolocation"),
                r = e("geolocation:static/js/core/x5geolocation"), a = e("geolocation:static/js/core/wxgeolocation"),
                s = e("geolocation:static/js/core/qqgeolocation"), c = e("geolocation:static/js/core/ipgeolocation"),
                l = e("geolocation:static/js/util/detect"), u = e("geolocation:static/js/util/georeport"),
                d = e("geolocation:static/js/util/inversegeo"), g = e("geolocation:static/js/util/webstorage").local,
                f = {}, p = !1, h = !1, w = 0, m = 0, v = 0, _ = 0, y = 0, b = !1, L = {
                    status: 0,
                    ipStatus: 0,
                    ipLocation: {
                        module: "geolocation",
                        adcode: window._DEFAULT_CITY.adcode,
                        type: window._DEFAULT_CITY.type,
                        nation: window._DEFAULT_CITY.nation,
                        province: window._DEFAULT_CITY.province,
                        city: window._DEFAULT_CITY.city,
                        district: window._DEFAULT_CITY.district,
                        addr: window._DEFAULT_CITY.addr,
                        lat: window._DEFAULT_CITY.lat,
                        lng: window._DEFAULT_CITY.lng,
                        accuracy: window._DEFAULT_CITY.accuracy || 10010
                    },
                    myLocation: {
                        module: "geolocation",
                        adcode: window._DEFAULT_CITY.adcode,
                        type: window._DEFAULT_CITY.type,
                        nation: window._DEFAULT_CITY.nation,
                        province: window._DEFAULT_CITY.province,
                        city: window._DEFAULT_CITY.city,
                        district: window._DEFAULT_CITY.district,
                        addr: window._DEFAULT_CITY.addr,
                        lat: window._DEFAULT_CITY.lat,
                        lng: window._DEFAULT_CITY.lng,
                        accuracy: window._DEFAULT_CITY.accuracy || 10010
                    },
                    init: function (e) {
                        var t = this, o = window.locType || "";
                        if (0 == t.status && (t._bind(), u.init(), "serial" == window.h5GeoMode ? (t._subGeos = [n], l.client.mqq && t._subGeos.push(s), l.client.wechat && t._subGeos.push(a), l.browser.qqbrowser && t._subGeos.push(r), l.client.mqq || l.client.wechat || l.browser.qqbrowser || t._subGeos.push(i)) : (t._subGeos = [n], "h5" == o ? t._subGeos.push(i) : "qq" == o ? l.client.mqq && t._subGeos.push(s) : "wx" == o ? l.client.wechat && t._subGeos.push(a) : "x5" == o ? l.browser.qqbrowser && t._subGeos.push(r) : (t.isUseH5() && t._subGeos.push(i), l.client.mqq && t._subGeos.push(s), l.client.wechat && t._subGeos.push(a), l.browser.qqbrowser && t._subGeos.push(r)))), e = e === !1 ? !1 : !0, 1 != t.status && e) if (w = (new Date).getTime(), t.status = 1, p = h = !1, "serial" == window.h5GeoMode) setTimeout(function () {
                            for (var e = 0, o = t._subGeos.length; o > e; e++) t._subGeos[e].getLocation()
                        }, 1500); else for (var c = 0, d = t._subGeos.length; d > c; c++) t._subGeos[c].getLocation()
                    },
                    getLocation: function (e) {
                        var t = this;
                        if (e) {
                            if (2 == t.ipStatus) return t.ipLocation;
                            var o = (window._DEFAULT_CITY.type, window._DEFAULT_CITY.ip);
                            o ? ("serial" == window.h5GeoMode && (t._bind(), b = !1), o && c.getLocation(o) ? t.ipLocation = o && c.getLocation(o) : t.ipLocation.city && t.ipLocation.lat && t.ipLocation.lng && t._success("ip", t.ipLocation)) : t._success("ip", t.ipLocation)
                        } else setTimeout(function () {
                            t.status = 0, t.init(!0)
                        }, 0)
                    },
                    watchPosition: function () {
                        this.WATCH_ID || (this._bind(), this.WATCH_ID = i.watchPosition())
                    },
                    clearWatch: function () {
                        this.WATCH_ID && (this.WATCH_ID = null, i.clearWatch(this.WATCH_ID))
                    },
                    _bind: function () {
                        var e = this;
                        listener.on("geolocation", "success", function (t, o, n, i) {
                            "cache" == o || "cache.robust" == o || "ip" == o ? e._success(o, n) : d.inverse(n, i, function (t) {
                                e._success(o, t)
                            })
                        }), listener.on("geolocation", "fail", function (t, o, n) {
                            if ("serial" != window.h5GeoMode) {
                                for (var r = 0, a = e._subGeos.length; a > r; r++) if (-1 != e._subGeos[r].status) return;
                                e._fail(n);
                                for (var r = 0, a = e._subGeos.length; a > r; r++) e._subGeos[r].status = 0
                            } else {
                                if (!b) {
                                    for (var r = 0, a = e._subGeos.length; a > r; r++) if (-1 != e._subGeos[r].status) return;
                                    return void i.getLocation()
                                }
                                b = !0, b && e._fail(n);
                                for (var r = 0, a = e._subGeos.length; a > r; r++) e._subGeos[r].status = 0
                            }
                        }), listener.on("geolocation.watch", "success", function (t, o, n, i) {
                            "h5_watch" == o && d.inverse(n, i, function (t) {
                                e._success(o, t, !0)
                            })
                        })
                    },
                    _success: function (e, t, o) {
                        var i = this;
                        if (i.status = 2, "ip" == e) i.ipLocation = t, i.ipStatus = 2, listener.trigger("common.geolocation", "success", i.ipLocation); else if ("cache" == e) i.myLocation = t; else {
                            var r = parseInt(t.accuracy);
                            y = _, _ = (new Date).getTime();
                            var a = 0;
                            _ >= y && (a = (_ - y) / 1e3);
                            var s = i.myLocation.accuracy;
                            a && a >= 60 || "h5_watch" == e ? i.myLocation = {
                                module: "geolocation",
                                type: e,
                                adcode: t.adcode || "",
                                nation: t.nation || "",
                                province: t.province || "",
                                city: t.city || "",
                                district: t.district || "",
                                addr: t.addr || "",
                                lat: t.lat,
                                lng: t.lng,
                                accuracy: r
                            } : r && s > r && (i.myLocation = {
                                module: "geolocation",
                                type: e,
                                adcode: t.adcode || "",
                                nation: t.nation || "",
                                province: t.province || "",
                                city: t.city || "",
                                district: t.district || "",
                                addr: t.addr || "",
                                lat: t.lat,
                                lng: t.lng,
                                accuracy: r
                            }), (o || r && s > r) && "cache.robust" != e && n.setLocation(i.myLocation), listener.trigger("common.geolocation.watch", "success", i.myLocation)
                        }
                        p || (p = !0, listener.trigger("common.geolocation", "success", i.myLocation), m = (new Date).getTime(), v >= 0 && (v = m - w), "cache.robust" != e && "ip" != e && listener.trigger("geolocation.report", "success", e, v))
                    },
                    _fail: function (e) {
                        var t = this;
                        t.status = -1;
                        var o = e;
                        if ("h5" == o.type && (f = o), !h) {
                            h = !0, listener.trigger("common.geolocation", "fail", f), listener.trigger("geolocation.report", "fail");
                            var i = n.getLocation(!0);
                            if (null == i) {
                                var r = (window._DEFAULT_CITY.type, window._DEFAULT_CITY.ip);
                                r && r && c.getLocation(r)
                            }
                        }
                    },
                    isUseH5: function () {
                        var e = !0, t = g.getItem("realgeocache"), o = g.getItem("realgeocacheTimestamp") || 0, n = 300;
                        if (t && (window.cacheType || "undefined" == typeof window.cacheType)) {
                            var i = JSON.parse(t);
                            preLat = i.lat, preLng = i.lng, t && preLat && preLng && parseInt(Date.now() - o) < 1e3 * n && (e = !1)
                        }
                        return e
                    }
                };
            o.exports = L
        }), o("geolocation:static/js/core/cachegeolocation.js", function (e, t, o) {
            var n = e("geolocation:static/js/util/webstorage").local, i = {
                status: 0, getLocation: function (e) {
                    if (window.geodebug) return null;
                    if (1 == window.closeCache) return null;
                    if (1 == window.clearCache) return n.clear(), null;
                    var t = this;
                    t.status = 1;
                    var o = e ? "cache.robust" : "cache", i = n.getItem("realgeocache"),
                        r = n.getItem("realgeocacheTimestamp") || 0, a = null, s = null;
                    if (i && (window.cacheType || "undefined" == typeof window.cacheType)) {
                        var c = JSON.parse(i);
                        if (a = c.lat, s = c.lng, i && a && s) {
                            var l = e ? 43200 : 360;
                            if (parseInt(Date.now() - r) < 1e3 * l) {
                                var u = JSON.parse(i);
                                return u.type = o, u.accuracy = +u.accuracy * Math.round(Math.sqrt(Math.sqrt(l))), t.status = 2, listener.trigger("geolocation", "success", o, u), u
                            }
                            return t.status = -1, listener.trigger("geolocation", "fail", o, "expired"), null
                        }
                        return t.status = -1, listener.trigger("geolocation", "fail", o, "missed"), null
                    }
                    return t.status = -1, listener.trigger("geolocation", "fail", o, "missed"), null
                }, setLocation: function (e) {
                    return e && (n.setItem("realgeocacheTimestamp", Date.now()), n.setItem("realgeocache", JSON.stringify(e))), !0
                }
            };
            o.exports = i
        }), o("geolocation:static/js/util/webstorage.js", function (e, t, o) {
            function n(e) {
                this.backend = e
            }

            n.prototype.__defineGetter__("length", function () {
                try {
                    return this.backend.length
                } catch (e) {
                    return console.error("Read Storage length error:" + e), 0
                }
            }), n.prototype.key = function (e) {
                try {
                    return this.backend.key(e)
                } catch (t) {
                    return console.error("Get Storage key error:" + t), null
                }
            }, n.prototype.getItem = function (e) {
                try {
                    return this.backend.getItem(e)
                } catch (t) {
                    return console.error("Get Storage item error:" + t), null
                }
            }, n.prototype.setItem = function (e, t) {
                try {
                    return this.backend.setItem(e, t)
                } catch (o) {
                    console.error("Set Storage item error:" + o)
                }
            }, n.prototype.removeItem = function (e) {
                try {
                    return this.backend.removeItem(e)
                } catch (t) {
                    return console.error("Remove Storage item error:" + t), null
                }
            }, n.prototype.clear = function () {
                try {
                    return this.backend.clear()
                } catch (e) {
                    console.error("Clear Storage error:" + e)
                }
            };
            var i, r;
            try {
                i = window.localStorage, r = window.sessionStorage
            } catch (a) {
                console.error("Get localStorage or sessionStorage error:" + a)
            }
            o.exports = {local: new n(i || {}), session: new n(r || {})}
        }), o("geolocation:static/js/core/h5geolocation.js", function (e, t, o) {
            var n = e("geolocation:static/js/util/detect"),
                i = (e("geolocation:static/js/util/webstorage").local, null), r = 0, a = 0, s = 0, c = 0, l = 0, u = 0,
                d = 0, g = {
                    status: 0,
                    _config: {enableHighAccuracy: !0, maximumAge: 1e3, timeout: 15e3, accuracy: 2e3},
                    _stat_geoloc_start: null,
                    getLocation: function () {
                        this.status = 1, this._getCurrentPosition()
                    },
                    _getCurrentPosition: function () {
                        return navigator.geolocation.getCurrentPosition(this._onSuccess, this._onFailure, this._config)
                    },
                    watchPosition: function () {
                        return i = Date.now(), navigator.geolocation.watchPosition(this._onWatchSuccess, this._onWatchFailure, this._config)
                    },
                    clearWatch: function (e) {
                        return navigator.geolocation.clearWatch(e)
                    },
                    _onSuccess: function (e) {
                        u = (new Date).getTime();
                        var t = g, o = e.coords;
                        if (o.accuracy, 0 != o.longitude && 0 != o.latitude) {
                            var i = {lat: o.latitude, lng: o.longitude, accuracy: o.accuracy, geoTime: d}, r = 1;
                            n.android && n.browser.baidubrowser && (r = 5, i.accuracy = i.accuracy || 60), t.status = 2, listener.trigger("geolocation", "success", "h5", i, r)
                        } else t.status = -1, listener.trigger("geolocation", "fail", "h5", "accuracy low")
                    },
                    _onFailure: function (e) {
                        var t = g, o = e;
                        o.type = "h5", t.status = -1, listener.trigger("geolocation", "fail", "h5", o), listener.trigger("geolocation.report_fail", "fail", "h5")
                    },
                    _onWatchSuccess: function (e) {
                        r++;
                        var t = g, o = e.coords, l = o.accuracy;
                        if (l < t._config.accuracy && o && 0 != o.longitude && 0 != o.latitude) {
                            if (!s && 1 == r) {
                                s = 1;
                                var u = Date.now() - i;
                                listener.trigger("geolocation.watch", "success", "watch_loc_first", u)
                            }
                            if (!a && r >= 2 && (a = 1, listener.trigger("geolocation.watch", "success", "watch_loc_second")), !c && o.heading && 0 != o.heading && r >= 2) {
                                var d = Date.now() - i;
                                c = 1, listener.trigger("geolocation.watch", "success", "watch_gps_load", d)
                            }
                            var f = {lat: o.latitude, lng: o.longitude, accuracy: o.accuracy}, p = 1;
                            n.android && n.browser.baidubrowser && (p = 5, f.accuracy = f.accuracy || 60), listener.trigger("geolocation.watch", "success", "h5_watch", f, p)
                        }
                    },
                    _onWatchFailure: function (e) {
                        r++, l || (l = 1, listener.trigger("geolocation.watch", "fail", "watch_loc_fail", e && e.code))
                    }
                };
            o.exports = g
        }), o("geolocation:static/js/core/x5geolocation.js", function (e, t, o) {
            var n = "//jsapi.qq.com/get?api=app.getGeoLocation", i = {
                status: 0, getLocation: function () {
                    var e = this;
                    0 != e.status ? e._getLocation() : window.LazyLoad && window.LazyLoad.js ? window.LazyLoad.js(n, e._getLocation) : e._loadScript(n, e._getLocation)
                }, _loadScript: function (e, t) {
                    var o = document.createElement("SCRIPT");
                    o.onload = o.onreadystatechange = function () {
                        var e = o.readyState;
                        if ("undefined" == typeof e || "loaded" == e || "complete" == e) try {
                            t && t(o)
                        } finally {
                            o.onload = o.onreadystatechange = null
                        }
                    }, o.setAttribute("type", "text/javascript"), o.setAttribute("charset", "utf-8"), o.setAttribute("src", e), document.getElementsByTagName("head")[0].appendChild(o)
                }, _getLocation: function () {
                    var e = i;
                    e.status = 1;
                    var t = window.browser && window.browser.app && window.browser.app.getGeoLocation;
                    t ? (t(function (t) {
                        if (t && "true" == t.ret) {
                            var o = {lat: t.latitude, lng: t.longitude, accuracy: 200};
                            e.status = 2, listener.trigger("geolocation", "success", "x5", o)
                        } else e.status = -1, listener.trigger("geolocation", "fail", "x5", "error result")
                    }, function () {
                        e.status = -1, listener.trigger("geolocation", "fail", "x5", "error callback")
                    }), setTimeout(function () {
                        1 == e.status && (e.status = -1, listener.trigger("geolocation", "fail", "x5", "timeout"))
                    }, 5e3)) : (e.status = -1, listener.trigger("geolocation", "fail", "x5", "NO_API"))
                }
            };
            o.exports = i
        }), o("geolocation:static/js/core/wxgeolocation.js", function (e, t, o) {
            function n() {
                for (var e = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", t = "", o = 0; 8 > o; o++) t += e.split("")[parseInt(61 * Math.random(), 10)];
                return t
            }

            var i = {
                appId: "wx183412414b784345",
                timestamp: (new Date).getTime(),
                nonceStr: n(),
                signature: null,
                jsApiList: ["getLocation"]
            }, r = {
                status: 0, getLocation: function () {
                    var e = this;
                    if (e.status = 1, "serial" != window.h5GeoMode) {
                        if (!window.wx) return e.status = -1, void listener.trigger("geolocation", "fail", "wx", "NO_API");
                        var t = function () {
                            window.wx.config(i);
                            var t = function () {
                                window.wx.getLocation({
                                    timestamp: i.timestamp,
                                    nonceStr: i.noncestr,
                                    addrSign: i.signature,
                                    success: function (t) {
                                        var o = {lat: t.latitude, lng: t.longitude, accuracy: t.accuracy};
                                        e.status = 2, listener.trigger("geolocation", "success", "wx", o)
                                    },
                                    fail: function () {
                                        e.status = -1, listener.trigger("geolocation", "fail", "wx", "call wx jsapi fail")
                                    }
                                })
                            };
                            window.wx.ready(t)
                        };
                        e._getJsapiTicket(t)
                    } else if (window.wx.ready(function () {
                        window.wx.getLocation({
                            success: function (t) {
                                var o = {lat: t.latitude, lng: t.longitude, accuracy: t.accuracy};
                                e.status = 2, listener.trigger("geolocation", "success", "wx", o)
                            }, fail: function () {
                                e.status = -1, listener.trigger("geolocation", "fail", "wx", "call wx jsapi fail")
                            }
                        })
                    }), "{}" == JSON.stringify(window.wx)) return e.status = -1, void listener.trigger("geolocation", "fail", "wx", "NO_API")
                }, _getJsapiTicket: function (e) {
                    var t = this;
                    Salo && Salo.ajax({
                        type: "jsonp",
                        url: "//weixincommon.map.qq.com/weixincommon/jsApiSign",
                        data: {
                            appId: i.appId,
                            noncestr: i.nonceStr,
                            timestamp: i.timestamp,
                            url: encodeURIComponent(window.location.href.replace(window.location.hash, "")),
                            output: "jsonp"
                        },
                        callback: {
                            success: function (o) {
                                if ("string" == typeof o) try {
                                    o = JSON.parse(o)
                                } catch (n) {
                                }
                                return o && 0 == o.returnValue ? (o = o.content, void(o && o.signature && "accessfail" != o.signature && "tokenfail" != o.signature ? (i.signature = o.signature, e(o)) : (t.status = -1, listener.trigger("geolocation", "fail", "wx", "fetch JsapiTicket resp error")))) : (t.status = -1, void listener.trigger("geolocation", "fail", "wx", "jsApiSign service result error"))
                            }, error: function () {
                                t.status = -1
                            }
                        }
                    })
                }, _getQueryStr: function (e) {
                    var t, o = String(window.document.location.href),
                        n = new RegExp("(^|)" + e + "=([^&]*)(&|$)", "gi").exec(o);
                    return (t = n) ? t[2] : ""
                }
            };
            o.exports = r
        }), o("geolocation:static/js/core/qqgeolocation.js", function (e, t, o) {
            var n = {
                status: 0, getLocation: function () {
                    var e = this;
                    e.status = 1, window.mqq && (window.mqq.iOS || window.mqq.android) ? window.mqq.sensor.getLocation(function (t, o, n) {
                        if (0 == t) {
                            var i = {lat: o, lng: n, accuracy: 175};
                            e.status = 2, listener.trigger("geolocation", "success", "qq", i, 5)
                        } else e.status = -1, listener.trigger("geolocation", "fail", "qq", t)
                    }) : (e.status = -1, listener.trigger("geolocation", "fail", "qq", "NO_API"))
                }
            };
            o.exports = n
        }), o("geolocation:static/js/core/ipgeolocation.js", function (e, t, o) {
            var n = "TKUBZ-D24AF-GJ4JY-JDVM2-IBYKK-KEBCU", i = {
                status: 0, getLocation: function (e) {
                    var t = this;
                    Salo && Salo.ajax({
                        type: "jsonp",
                        url: "//apis.map.qq.com/ws/location/v1/ip",
                        data: {ip: e, key: n, output: "jsonp", t: (new Date).getTime()},
                        callback: {
                            success: function (e) {
                                if (e && 0 == e.status) {
                                    var o = e.result, n = {
                                        module: "geolocation",
                                        type: "ip",
                                        adcode: o.ad_info.adcode || "",
                                        nation: o.ad_info.nation,
                                        province: o.ad_info.province,
                                        city: o.ad_info.city,
                                        addr: "",
                                        lat: o.location.lat,
                                        lng: o.location.lng,
                                        accuracy: 1e4
                                    };
                                    t.status = 2, listener.trigger("geolocation", "success", "ip", n)
                                } else t.status = -1, listener.trigger("geolocation", "fail", "ip", e && e.message)
                            }, error: function () {
                                t.status = -1, listener.trigger("geolocation", "fail", "ip", "timeout")
                            }
                        }
                    })
                }
            };
            o.exports = i
        });
        var i = e("geolocation:static/js/util/webstorage").local;
        o("geolocation:static/js/util/auth.js", function (e, t, o) {
            var n = e("geolocation:static/js/util/detect"), r = !1, a = 0, s = document.createElement("a");
            s.href = document.referrer;
            var c = null, l = 0, u = !0, d = 6048e5, g = "";
            document.referrer && s.hostname && (g = s.hostname, c = i.getItem(g + "_authority"), l = i.getItem(g + "_authTimeStamp") || 0, u = parseInt(Date.now() - l) > d);
            var f = function () {
                return n.os.android && n.client.mqq ? r ? !0 : !g || a > 0 ? !1 : /(^|\.)(dianping|meituan|mtwaimai|jingdong|58|elong|fang|gtimg|tenpay|qq|jd|51ping)\.com$/.test(g) ? r = !0 : (a++, r = confirm("“" + g + "”想使用您当前的位置")) : !0
            }, p = function () {
                var e;
                if (document.referrer && s.hostname) {
                    var t = s.port ? ":" + s.port : "";
                    e = s.protocol + "//" + s.hostname + t
                }
                return e
            };
            o.exports = {getAuth: f, getOrigin: p}
        }), o("geolocation:static/js/util/georeport.js", function (e, t, o) {
            var n, i = {
                init: function () {
                    this.geoLogId = "geopositioning", this.userLogId = "geolocation", this._bind(), n = (new Date).getTime()
                }, _bind: function () {
                    var e = this;
                    listener.on("geolocation", "success", function () {
                    }), listener.on("geolocation", "fail", function () {
                    }), listener.on("geolocation.watch", "success", function () {
                    }), listener.on("geolocation.watch", "fail", function () {
                    }), listener.on("geolocation.report", "success", function (t, o, n) {
                        e._report(e.userLogId, o, !0, "success", n)
                    }), listener.on("geolocation.report", "fail", function (t, o, n) {
                        e._report(e.userLogId, "temp", !1, n || "fail")
                    })
                }, _report: function (e, t, o, i, r) {
                    var a = ((new Date).getTime() - n) / 1e3;
                    0 >= r && (r = 0);
                    try {
                        window._prStat && window._prStat.report(e, {
                            type: t,
                            success: o ? 1 : 0,
                            message: i,
                            loc_time: a,
                            geoTime: r
                        })
                    } catch (s) {
                    }
                }
            };
            o.exports = i
        }), o("geolocation:static/js/util/inversegeo.js", function (e, t, o) {
            var n = "TKUBZ-D24AF-GJ4JY-JDVM2-IBYKK-KEBCU", i = {
                inverse: function (e, t, o) {
                    var i = this;
                    Salo && Salo.ajax({
                        type: "jsonp",
                        url: "//apis.map.qq.com/ws/geocoder/v1",
                        data: {
                            location: e.lat + "," + e.lng,
                            coord_type: t || 1,
                            key: n,
                            output: "jsonp",
                            t: (new Date).getTime()
                        },
                        callback: {
                            success: function (n) {
                                var r = n.result;
                                if (r && r.ad_info && r.ad_info.city && r.ad_info.location || r && r.address_component && r.address_component.nation) {
                                    var a = {
                                        module: "geolocation",
                                        adcode: r.ad_info.adcode || "",
                                        nation: r.ad_info.nation || r.address_component.nation,
                                        province: r.ad_info.province || "",
                                        city: r.ad_info.city || r.address_component.ad_level_1,
                                        district: r.ad_info.district || r.address_component.ad_level_2,
                                        addr: r.formatted_addresses && r.formatted_addresses.recommend || r.ad_info.address,
                                        lat: r.ad_info.location.lat,
                                        lng: r.ad_info.location.lng,
                                        accuracy: e.accuracy || ""
                                    };
                                    o(a)
                                } else i._translate(e, t, o)
                            }, error: function () {
                                i._translate(e, t, o)
                            }
                        }
                    })
                }, _translate: function (e, t, o) {
                    var i = this;
                    Salo && Salo.ajax({
                        type: "jsonp",
                        url: "//apis.map.qq.com/ws/coord/v1/translate",
                        data: {
                            locations: e.lat + "," + e.lng,
                            type: t || 1,
                            key: n,
                            output: "jsonp",
                            t: (new Date).getTime()
                        },
                        callback: {
                            success: function (n) {
                                n && n.locations && n.locations[0] && (e = {
                                    lat: n.locations[0].lat,
                                    lng: n.locations[0].lng,
                                    accuracy: e.accuracy
                                }), i._finally(e, t, o)
                            }, error: function () {
                                i._finally(e, t, o)
                            }
                        }
                    })
                }, _finally: function (e, t, o) {
                    var n = {lat: e.lat, lng: e.lng, accuracy: e.accuracy};
                    o(n)
                }
            };
            o.exports = i
        }), !function () {
            var e = function (e) {
                e = e[0] || {}, this.url = e.url || "", this.type = e.type || "xhr", this.method = "jsonp" == this.type ? "GET" : e.method && e.method.toUpperCase() || "GET", this.param = e.data || null, this.callback = e.callback || {
                    success: new Function,
                    error: new Function
                }, this.XHR = null, "undefined" == typeof window._JSONP_callback && (window._JSONP_callback = {}), this._createRequest()
            };
            e.prototype = {
                _createXHR: function () {
                    for (var e = [function () {
                        return new XMLHttpRequest
                    }, function () {
                        return new ActiveXObject("Msxml2.XMLHTTP")
                    }, function () {
                        return new ActiveXObject("Microsoft.XMLHTTP")
                    }], t = 0, o = e.length; o > t; t++) {
                        try {
                            e[t]()
                        } catch (n) {
                            continue
                        }
                        return this._createXHR = e[t], e[t]()
                    }
                }, _createRequest: function () {
                    return "jsonp" == this.type ? this._setJSONPRequest() : this._setXHRRequest()
                }, _setXHRRequest: function () {
                    var e = this, t = "";
                    for (var o in this.param) "" == t ? t = o + "=" + this.param[o] : t += "&" + o + "=" + this.param[o];
                    if (this.XHR = this._createXHR(), this.XHR.onreadystatechange = function () {
                        4 == e.XHR.readyState && 200 == e.XHR.status ? e.callback.success(e.XHR.responseText) : e.callback.error("retry")
                    }, "GET" == this.method) {
                        var n = -1 == this.url.indexOf("?") ? this.url + "?" + t : this.url + "&" + t;
                        this.XHR.open(this.method, n, !0), this.XHR.send()
                    } else this.XHR.open(this.method, this.url, !0), this.XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8"), this.XHR.send(t)
                }, _setJSONPRequest: function () {
                    var e = document.getElementsByTagName("head")[0], t = document.createElement("script"),
                        o = this._setRandomFun(), n = this, i = "";
                    for (var r in this.param) "" == i ? i = r + "=" + this.param[r] : i += "&" + r + "=" + this.param[r];
                    t.type = "text/javascript", t.charset = "utf-8", e ? e.appendChild(t) : document.body.appendChild(t), window._JSONP_callback[o.id] = function (e) {
                        n.callback.success(e), setTimeout(function () {
                            delete window._JSONP_callback[o.id], t.parentNode.removeChild(t)
                        }, 100)
                    }, t.src = this.url + "?callback=" + o.name + "&" + i
                }, _setRandomFun: function () {
                    var e = "";
                    do e = "JSONP" + Math.floor(1e4 * Math.random()); while (window._JSONP_callback[e]);
                    return {id: e, name: "window._JSONP_callback." + e}
                }
            }, window.Salo = window.Salo || {}, Salo.ajax = function () {
                return new e(arguments)
            }
        }(), o("geolocation:static/js/util/stat.js", function (e, t, o) {
            function n() {
                var e = 1, t = navigator.userAgent, o = window.devicePixelRatio || 1;
                (navigator.platform.match(/iPhone|iPad|iPod/) || t.match(/Chrome/) && window.chrome || t.match(/Opera/) || t.match(/Firefox/) || t.match(/IEMobile/)) && (e = o), r.report("pv", {
                    sw: screen.width * e,
                    sh: screen.height * e,
                    dpr: o
                })
            }

            var i = function (e) {
                var t = [];
                for (var o in e) null != e[o] && t.push(encodeURIComponent(o) + "=" + encodeURIComponent(e[o]));
                return t.join("&")
            }, r = {
                init: function (e) {
                    this.appId = e.appId, this.statService = e.statService, this.from = e.from, n()
                }, report: function (e, t) {
                    var o = this, n = new Image(1, 1), r = {
                        appid: o.appId,
                        logid: e,
                        from: o.from,
                        referer: document.referrer,
                        _ignore: parseInt(1e5 * Math.random())
                    };
                    t = t || {};
                    for (var a in t) t.hasOwnProperty(a) && !r.hasOwnProperty(a) && (r[a] = t[a]);
                    n.src = o.statService + "?" + i(r)
                }
            };
            o.exports = r
        });
        var r = e("geolocation:static/js/core/geolocation"), a = e("geolocation:static/js/util/auth"), s = {
            init: function () {
                window.apiKey || (window.apiKey = query.key), window.h5GeoMode || (window.h5GeoMode = "undefined" == typeof query ? "" : query.geoMode), window.apiKey && (this.key = window.apiKey, this.geoMode = window.h5GeoMode, this._geobind(), "serial" != this.geoMode && r.init(!1))
            }, _geobind: function (e) {
                var t = this;
                switch (listener.on("common.geolocation", "success", function (e, o) {
                    o && t._send(o)
                }), e) {
                    case"watchPosition":
                        r.watchPosition();
                        break;
                    case"clearWatch":
                        r.clearWatch();
                        break;
                    case"getLocation":
                        var o = r.getLocation();
                        o && t._send(o);
                        break;
                    case"getLocation.robust":
                        var o = r.getLocation(!0);
                        o && t._send(o);
                        break;
                    case"geoLocation.geodebug":
                        openGeoDebugMode()
                }
                listener.on("common.geolocation", "success", function (e, o) {
                    o && t._send(o)
                }), listener.on("common.geolocation", "fail", function (e, o) {
                    var n = {};
                    n.loc = o, n.type = "fail", n && t._send(n)
                }), listener.on("common.geolocation.watch", "success", function (e, o) {
                    o && t._send(o)
                })
            }, _send: function (e) {
                var t = (a.getAuth(), a.getOrigin(), !1);
                if ("fail" != e.type && (t = !0), !t) var o = e.loc,
                    n = {code: o.code, message: o.message, type: "fail"};
                e && t ? listener.trigger("loc.geolocation", "success", e) : n ? listener.trigger("loc.geolocation", "success", n) : listener.trigger("loc.geolocation", "success", null)
            }
        };
        n.exports = s
    }), o("geolocation:static/js/util/stat.js", function (e, t, o) {
        function n() {
            var e = 1, t = navigator.userAgent, o = window.devicePixelRatio || 1;
            (navigator.platform.match(/iPhone|iPad|iPod/) || t.match(/Chrome/) && window.chrome || t.match(/Opera/) || t.match(/Firefox/) || t.match(/IEMobile/)) && (e = o), r.report("pv", {
                sw: screen.width * e,
                sh: screen.height * e,
                dpr: o
            })
        }

        var i = function (e) {
            var t = [];
            for (var o in e) null != e[o] && t.push(encodeURIComponent(o) + "=" + encodeURIComponent(e[o]));
            return t.join("&")
        }, r = {
            init: function (e) {
                this.appId = e.appId, this.statService = e.statService, this.from = e.from, n()
            }, report: function (e, t) {
                var o = this, n = new Image(1, 1), r = {
                    appid: o.appId,
                    logid: e,
                    from: o.from,
                    referer: document.referrer,
                    _ignore: parseInt(1e5 * Math.random())
                };
                t = t || {};
                for (var a in t) t.hasOwnProperty(a) && !r.hasOwnProperty(a) && (r[a] = t[a]);
                n.src = o.statService + "?" + i(r)
            }
        };
        o.exports = r
    }), o("geolocation:static/js/util/detect.js", function (e, t, o) {
        var n = {}, i = n.os = {}, r = n.browser = {}, a = n.client = {}, s = navigator.userAgent;
        if ("string" == typeof s) {
            var c = s.match(/(android)\s+([\d.]+)/i), l = !u && s.match(/(iphone\sos)\s([\d_]+)/i),
                u = s.match(/(ipad).*os\s([\d_]+)/i), d = !l && !u && s.match(/(ipod\sos)\s([\d_]+)/i),
                g = s.match(/webkit\/([\d.]+)/i), f = s.match(/chrome\/([\d.]+)/i) || s.match(/crios\/([\d.]+)/i),
                p = s.match(/firefox\/([\d.]+)/i), h = s.match(/mqqbrowser\/([\d\.]+)/i),
                w = s.match(/ucbrowser\/([\d.]+)/i), m = s.match(/baidubrowser\/([\d\.]+)/i),
                v = s.match(/QQ\/([\d\.]+)/), _ = s.match(/micromessenger\/([\d\.]+)/i);
            c && (i.android = !0, i.version = c[2]), l && (i.ios = i.iphone = !0, i.version = l[2].replace(/_/g, ".")), u && (i.ios = i.ipad = !0, i.version = u[2].replace(/_/g, ".")), d && (i.ios = i.ipod = !0, i.version = d[2].replace(/_/g, ".")), g && (r.webkit = !0, r.version = g[1]), f && (r.chrome = !0, r.version = f[1]), p && (r.firefox = !0, r.version = p[1]), h && (r.qqbrowser = !0, r.version = h[1]), w && (r.ucbrowser = !0, r.version = w[1]), m && (r.baidubrowser = !0, r.version = m[1]), v && (a.mqq = !0, a.version = v[1]), _ && (a.wechat = !0, a.version = _[1]), !i.ios || h || w || m || (r.safari = !0, r.version = i.version), !i.android || h || w || m || f || (r.android = !0, r.version = i.version), i.version = parseFloat(i.version), r.version = parseFloat(r.version), a.version = parseFloat(a.version)
        }
        o.exports = n
    }), qq.maps.Geolocation = function () {
        var o = t("geolocation:static/js/util/detect");
        o.client.wechat && e("https://res.wx.qq.com/open/js/jweixin-1.2.0.js"), o.client.mqq && e("https://pub.idqqimg.com/qqmobile/qqapi.js?_bid=152");
        var n = window.listener, i = [], r = null, a = 0, s = null, c = null, l = null, u = null;
        window.cacheType = !0;
        var d = function () {
            window.apiKey || (window.apiKey = query.key), window.apiReferer || (window.apiReferer = query.referer);
            var e = window.apiKey, t = window.apiReferer;
            if (!e) return void alert("请输入key！");
            if (!t) return void alert("请输入referer！");
            var o = this;
            n.on("loc.geolocation", "success", function (e, t) {
                if (t && "geolocation" == t.module) {
                    {
                        t.type
                    }
                    if (clearTimeout(u), i.length > 0) {
                        var n = i.shift();
                        n.sucCb && n.sucCb(t)
                    }
                    a = 2, o.executeNextGeo(), r && r(t)
                } else {
                    c = (new Date).getTime();
                    var d = c - s;
                    if (t && "fail" == t.type && i.length > 0 && "geo" === i[0].type) {
                        var n = i.shift();
                        n.errCb && n.errCb(t), a = -1, o.executeNextGeo()
                    } else if (d >= l && i.length > 0 && "geo" === i[0].type) {
                        var n = i.shift(), g = {type: "fail", code: 5, message: "The request to get api timeout"};
                        n.errCb && n.errCb(t), clearTimeout(u), a = -1, o.executeNextGeo()
                    }
                    if (i.length > 0 && "ip" === i[0].type) {
                        var n = i.shift();
                        n.errCb && n.errCb(g)
                    }
                }
            }), g.init()
        };
        d.prototype.executeNextGeo = function () {
            1 !== a && i.length > 0 && (a = 1, i[0].geoprocess())
        }, d.prototype.getLocation = function (e, t, o) {
            if (i.length > 10) throw new Error("geolocation queue must be less than 10");
            if (o && o.timeout) {
                var n = new RegExp("^[0-9]*$");
                if (!n.test(o.timeout)) return void alert("timeout 请输入数字")
            }
            i.push({
                sucCb: e,
                errCb: t,
                option: o,
                geoprocess: this.getOnceLocation,
                type: "geo"
            }), 1 !== a && (a = 1, this.getOnceLocation())
        }, d.prototype.getOnceLocation = function () {
            var e = i[0] && i[0].option;
            s = (new Date).getTime(), l = e && e.timeout ? +e.timeout : 1e4, e && "undefined" != typeof e.cache ? e && 0 == e.cache && (window.cacheType = !1) : window.cacheType = !0, clearTimeout(u), u = setTimeout(function () {
                var e = {type: "fail", code: 5, message: "The request to get api timeout"};
                if (i.length > 0) {
                    var t = i.shift();
                    t.errCb && t.errCb(e)
                }
            }, l), g._geobind("getLocation")
        }, d.prototype.getIpLocation = function (e, t) {
            if (i.length > 10) throw new Error("geolocation queue must be less than 10");
            i.push({
                sucCb: e,
                errCb: t,
                geoprocess: this.getOnceIpLocation,
                type: "ip"
            }), 1 !== a && (a = 1, this.getOnceIpLocation())
        }, d.prototype.getOnceIpLocation = function () {
            g._geobind("getLocation.robust")
        }, d.prototype.watchPosition = function (e) {
            r = e, g._geobind("watchPosition")
        }, d.prototype.clearWatch = function () {
            r = null, g._geobind("clearWatch")
        };
        var g = t("geolocation:static/js/loc_boot");
        return window._prStat = t("geolocation:static/js/util/stat"), window._prStat.init({
            appId: "mc_geolocation",
            statService: "//pr.map.qq.com/pingd",
            from: window.wReferer
        }), d
    }()
}();