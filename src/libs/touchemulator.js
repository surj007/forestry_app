(function(t, n) {
  var e;
  document.createTouch || (document.createTouch = function(t, n, e, o, r, a, s) {
      return new i(n,e,{
          pageX: o,
          pageY: r,
          screenX: a,
          screenY: s,
          clientX: o - window.pageXOffset,
          clientY: r - window.pageYOffset
      },0,0)
  }
  ),
  document.createTouchList || (document.createTouchList = function() {
      for (var t = o(), n = 0; n < arguments.length; n++)
          t[n] = arguments[n];
      return t.length = arguments.length,
      t
  }
  );
  var i = function(t, n, e, i, o) {
      i = i || 0,
      o = o || 0,
      this.identifier = n,
      this.target = t,
      this.clientX = e.clientX + i,
      this.clientY = e.clientY + o,
      this.screenX = e.screenX + i,
      this.screenY = e.screenY + o,
      this.pageX = e.pageX + i,
      this.pageY = e.pageY + o
  };
  function o() {
      var t = [];
      return t.item = function(t) {
          return this[t] || null
      }
      ,
      t.identifiedTouch = function(t) {
          return this[t + 1] || null
      }
      ,
      t
  }
  function r(t) {
      return function(n) {
          var i, o, r;
          1 === n.which && (("mousedown" === n.type || !e || e && !e.dispatchEvent) && (e = n.target),
          i = t,
          o = n,
          (r = document.createEvent("Event")).initEvent(i, !0, !0),
          r.altKey = o.altKey,
          r.ctrlKey = o.ctrlKey,
          r.metaKey = o.metaKey,
          r.shiftKey = o.shiftKey,
          r.touches = s(o),
          r.targetTouches = s(o),
          r.changedTouches = a(o),
          e.dispatchEvent(r),
          "mouseup" === n.type && (e = null))
      }
  }
  function a(t) {
      var n = o();
      return n.push(new i(e,1,t,0,0)),
      n
  }
  function s(t) {
      return "mouseup" === t.type ? o() : a(t)
  }
  function l() {
      !function() {
          for (var t = [window, document.documentElement], n = ["ontouchstart", "ontouchmove", "ontouchcancel", "ontouchend"], e = 0; e < t.length; e++)
              for (var i = 0; i < n.length; i++)
                  t[e] && void 0 === t[e][n[i]] && (t[e][n[i]] = null)
      }(),
      window.addEventListener("mousedown", r("touchstart"), !0),
      window.addEventListener("mousemove", r("touchmove"), !0),
      window.addEventListener("mouseup", r("touchend"), !0)
  }
  l.multiTouchOffset = 75,
  new l
})()