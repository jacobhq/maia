(function () {
  var h,
    k = this;
  function m(a) {
    return "string" == typeof a;
  }
  function n(a, c, b) {
    return a.call.apply(a.bind, arguments);
  }
  function p(a, c, b) {
    if (!a) throw Error();
    if (2 < arguments.length) {
      var d = Array.prototype.slice.call(arguments, 2);
      return function () {
        var b = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(b, d);
        return a.apply(c, b);
      };
    }
    return function () {
      return a.apply(c, arguments);
    };
  }
  function q(a, c, b) {
    q =
      Function.prototype.bind &&
      -1 != Function.prototype.bind.toString().indexOf("native code")
        ? n
        : p;
    return q.apply(null, arguments);
  }
  Function.prototype.bind =
    Function.prototype.bind ||
    function (a, c) {
      if (1 < arguments.length) {
        var b = Array.prototype.slice.call(arguments, 1);
        b.unshift(this, a);
        return q.apply(null, b);
      }
      return q(this, a);
    };
  var r = Array.prototype,
    s = r.indexOf
      ? function (a, c, b) {
          return r.indexOf.call(a, c, b);
        }
      : function (a, c, b) {
          b = null == b ? 0 : 0 > b ? Math.max(0, a.length + b) : b;
          if (m(a)) return m(c) && 1 == c.length ? a.indexOf(c, b) : -1;
          for (; b < a.length; b++) if (b in a && a[b] === c) return b;
          return -1;
        },
    t = r.filter
      ? function (a, c, b) {
          return r.filter.call(a, c, b);
        }
      : function (a, c, b) {
          for (
            var d = a.length, e = [], f = 0, g = m(a) ? a.split("") : a, l = 0;
            l < d;
            l++
          )
            if (l in g) {
              var E = g[l];
              c.call(b, E, l, a) && (e[f++] = E);
            }
          return e;
        };
  function u(a, c, b) {
    return 2 >= arguments.length ? r.slice.call(a, c) : r.slice.call(a, c, b);
  }
  var v, w, x, y;
  function z() {
    return k.navigator ? k.navigator.userAgent : null;
  }
  y = x = w = v = !1;
  var A;
  if ((A = z())) {
    var B = k.navigator;
    v = 0 == A.lastIndexOf("Opera", 0);
    w = !v && (-1 != A.indexOf("MSIE") || -1 != A.indexOf("Trident"));
    x = !v && -1 != A.indexOf("WebKit");
    y = !v && !x && !w && "Gecko" == B.product;
  }
  var C = w,
    D = y,
    F = x;
  var G;
  if (v && k.opera) {
    var H = k.opera.version;
    "function" == typeof H && H();
  } else
    D
      ? (G = /rv\:([^\);]+)(\)|;)/)
      : C
      ? (G = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/)
      : F && (G = /WebKit\/(\S+)/),
      G && G.exec(z());
  function I(a) {
    a = a.className;
    return (m(a) && a.match(/\S+/g)) || [];
  }
  function J(a, c) {
    for (var b = I(a), d = u(arguments, 1), e = b, f = 0; f < d.length; f++)
      0 <= s(e, d[f]) || e.push(d[f]);
    a.className = b.join(" ");
  }
  function K(a, c) {
    var b = I(a),
      d = u(arguments, 1),
      b = L(b, d);
    a.className = b.join(" ");
  }
  function L(a, c) {
    return t(a, function (a) {
      return !(0 <= s(c, a));
    });
  }
  var M = /Mac OS X.+Silk\//;
  function N(a) {
    this.e = a.query || "body";
    this.j = a.context || this.e;
    this.p = a.category || "";
    this.action = a.action || "";
    this.label = "" === a.label ? "" : a.label || "$text()";
  }
  var O = /\$text\(([^\)]*)\)/,
    P = /\$attr\(([^\)]+)\)(\(([^\)]*)\))*/;
  function Q(a, c, b, d) {
    a = a.querySelectorAll(c);
    c = 0;
    for (var e; (e = a[c]); c++) b.call(d, e, c, a);
  }
  function R(a, c, b, d, e) {
    if (c) {
      var f = S(a.p, c, b, d, e),
        g = S(a.action, c, b, d, e);
      a = S(a.label, c, b, d, e);
      c.setAttribute("data-g-event", "Maia: " + f);
      c.setAttribute("data-g-action", "Maia: " + g);
      c.getAttribute("data-g-label") ||
        ("(empty)" === a && (a = "Maia: " + a),
        c.setAttribute("data-g-label", a));
    }
  }
  function S(a, c, b, d, e) {
    b = b || c;
    var f = a.match(O),
      g = c;
    f && f[1] && (g = b.querySelector(f[1]));
    a = a.replace(
      O,
      m(g.innerText) ? g.innerText : m(g.textContent) ? g.textContent : ""
    );
    var f = a.match(P),
      l = "";
    f &&
      f[1] &&
      ((g = c),
      f[3] && (g = b.querySelector(f[3])),
      g && g.hasAttribute(f[1]) && (l = g.getAttribute(f[1])));
    a = a.replace(P, l);
    a = a.replace("$nth-context()", e + 1).replace("$nth()", d + 1);
    a = a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
    return /^[\s\xa0]*$/.test(a) ? "(empty)" : a;
  }
  function aa(a) {
    a.j !== a.e
      ? Q(
          document,
          a.j,
          function (a, b) {
            Q(
              a,
              this.e,
              function (d, e) {
                R(this, d, a, e, b);
              },
              this
            );
          },
          a
        )
      : Q(
          document,
          a.e,
          function (a, b) {
            R(this, a, null, b, b);
          },
          a
        );
  }
  var ba = [
    {
      context: "#maia-nav-root .maia-aux > ul > li",
      query: "li li a",
      category: "Global Nav",
      action: "$text(.maia-aux > ul > li > a)",
    },
    {
      query: "#maia-header h1 a",
      category: "Header",
      action: "Header",
      label: "$attr(alt)(img) $text()",
    },
    { query: "#maia-header h2 a", category: "Header", action: "Sub Header" },
    {
      context: "#maia-nav-x, #maia-nav-x ul ul, #maia-nav-y, .maia-nav-aux",
      query: "li > a",
      category: "Site Nav",
      action: "Level $nth-context()",
    },
    {
      context: "#maia-nav-x.maia-compact, #maia-nav-x.maia-compact ul + ul",
      query: "li > a",
      category: "Site Nav (compact)",
      action: "Level $nth-context()",
    },
    {
      query: "#maia-nav-x.maia-compact h1",
      category: "Site Nav (compact)",
      action: "Site Nav Header",
    },
    {
      context: ".maia-breadcrumb",
      query: "li a",
      category: "Breadcrumb",
      action: "Item $nth()",
    },
    {
      query: ".maia-button",
      category: "Button",
      action: "Primary \u2013 (not set)",
    },
    {
      query: "#maia-header .maia-button",
      category: "Button",
      action: "Primary \u2013 Header",
    },
    {
      query: "#maia-nav-x .maia-button",
      category: "Button",
      action: "Primary \u2013 Nav",
    },
    {
      query: "#maia-main .maia-button",
      category: "Button",
      action: "Primary \u2013 Content",
    },
    {
      query: "#maia-footer .maia-button",
      category: "Button",
      action: "Primary \u2013 Footer",
    },
    {
      query: ".maia-button-secondary",
      category: "Button",
      action: "Secondary \u2013 (not set)",
    },
    {
      query: "#maia-header .maia-button-secondary",
      category: "Button",
      action: "Secondary \u2013 Header",
    },
    {
      query: "#maia-nav-x .maia-button-secondary",
      category: "Button",
      action: "Secondary \u2013 Nav",
    },
    {
      query: "#maia-main .maia-button-secondary",
      category: "Button",
      action: "Secondary \u2013 Content",
    },
    {
      query: "#maia-footer .maia-button-secondary",
      category: "Button",
      action: "Secondary \u2013 Footer",
    },
    {
      query: "a.maia-media",
      category: "Video",
      action: "Open",
      label: "$attr(alt)(img)",
    },
  ];
  function T(a, c, b, d, e) {
    d = !!d;
    e = e || a;
    a.addEventListener
      ? a.addEventListener(c, q(b, e), d)
      : a.attachEvent && a.attachEvent("on" + c, q(b, e, window.event));
  }
  var ca =
    /iPhone|iPod|iPad/.test(navigator.userAgent) ||
    -1 != navigator.userAgent.indexOf("Android") ||
    M.test(navigator.userAgent)
      ? "touchstart"
      : "mousedown";
  function U() {
    this.n = !1;
    if ((this.a = document.getElementById("maia-nav-x")))
      if ((this.d = this.a.querySelector("ul"))) {
        var a;
        a: if (((a = this.d.querySelector(".maia-aux > ul > li.active")), !a))
          for (
            var c = this.d.querySelectorAll(".maia-aux > ul > li"), b = 0, d;
            (d = c[b]);
            b++
          )
            if (!d.querySelector(".maia-aux > ul > li > a")) {
              a = d;
              break a;
            }
        if ((this.f = a)) this.g = this.f.getElementsByTagName("ul")[0];
        this.n = !0;
      }
  }
  U.q = function () {
    return U.m ? U.m : (U.m = new U());
  };
  h = U.prototype;
  h.o = !1;
  h.c = !1;
  h.h = !1;
  h.b = null;
  h.i = null;
  h.l = function (a) {
    ((a.matches && !this.c) || (!a.matches && this.c)) && V(this);
  };
  h.k = function () {
    var a = document.documentElement.clientWidth || document.body.clientWidth;
    ((767 >= a && !this.c) || (767 < a && this.c)) && V(this);
  };
  function V(a) {
    if (a.c)
      a.g && a.f.appendChild(a.g),
        a.b.parentNode.removeChild(a.b),
        (a.b = null),
        K(a.a, "active"),
        K(a.a, "maia-compact"),
        (a.c = !1);
    else {
      a.g && a.d.parentNode.insertBefore(a.g, a.d.nextSibling);
      a.b = document.createElement("h1");
      var c = a.f;
      a.b.appendChild(
        document.createTextNode(c ? c.innerText || c.textContent : "")
      );
      T(a.b, ca, a.r, !1, a);
      a.d.parentNode.insertBefore(a.b, a.d);
      J(a.a, "maia-compact");
      a.c = !0;
    }
    a.i || (a.i = a.a.querySelectorAll("li a"));
    for (var c = a.i, b = 0, d; (d = c[b]); b++) {
      var e = d.getAttribute("data-g-event");
      "Maia: Site Nav" == e
        ? d.setAttribute("data-g-event", "Maia: Site Nav (compact)")
        : "Maia: Site Nav (compact)" == e &&
          d.setAttribute("data-g-event", "Maia: Site Nav");
    }
    if ((a = a.b))
      a.setAttribute("data-g-event", "Maia: Site Nav (compact)"),
        a.setAttribute("data-g-action", "Maia: Site Nav Header"),
        a.setAttribute(
          "data-g-label",
          a.innerText || a.textContent || "Maia: (empty)"
        );
  }
  h.r = function () {
    this.h ? K(this.a, "active") : J(this.a, "active");
    this.h = !this.h;
  };
  var da = [/cloud\.google\.com/, /(\/int[lx]\/[^\/]+)?\/enterprise\//],
    W;
  a: {
    for (var X = 0, Y; (Y = da[X]); X++)
      if (window.location.href.match(Y)) {
        W = !0;
        break a;
      }
    W = !1;
  }
  var ea = !(
    W ||
    !(
      document.querySelector &&
      document.querySelectorAll &&
      window.gweb &&
      window.gweb.analytics &&
      window.gweb.analytics.AutoTrack &&
      window.gweb.analytics.AutoTrack.hasInstance()
    )
  );
  if (document.querySelector) {
    var Z = U.q();
    if (Z.n && !Z.o) {
      if (window.matchMedia && window.matchMedia("screen").addListener) {
        var $ = window.matchMedia("(max-width: 767px)");
        Z.l($);
        $.addListener(q(Z.l, Z));
      } else Z.k(), T(window, "resize", Z.k, !1, Z);
      Z.o = !0;
    }
  }
  T(window, "load", function () {
    if (ea) for (var a = 0, c; (c = ba[a]); a++) aa(new N(c));
  });
})();
