// Generated by CoffeeScript 1.10.0
(function() {
  var BOOTSTRAP_CDN, BOOTSTRAP_THEME, BOOTSTRAP_VERSION, Bootsdown, JQUERY_CDN, JQUERY_VERSION, MARKDOWN, MARKDOWN_CDN;

  BOOTSTRAP_THEME = ['basic', 'bootswatch:cerulean', 'bootswatch:cosmo', 'bootswatch:cyborg', 'bootswatch:darkly', 'bootswatch:flatly', 'bootswatch:journal', 'bootswatch:lumen', 'bootswatch:paper', 'bootswatch:readable', 'bootswatch:standstone', 'bootswatch:simplex', 'bootswatch:slate', 'bootswatch:spacelab', 'bootswatch:superhero', 'bootswatch:united', 'bootswatch:yeti'];

  BOOTSTRAP_VERSION = {
    basic: '3.3.6',
    bootswatch: '3.3.6'
  };

  BOOTSTRAP_CDN = {
    cdnjs: {
      prefix: 'https://cdnjs.cloudflare.com/ajax/libs',
      path: {
        basic: '/twitter-bootstrap/{version}',
        bootswatch: '/bootswatch/{version}/{theme}/bootstrap.min.css'
      }
    },
    staticfile: {
      prefix: 'https://staticfile.qnssl.com',
      path: {
        basic: '/twitter-bootstrap/{version}',
        bootswatch: '/bootswatch/{version}/{theme}/bootstrap.min.css'
      }
    },
    jsdelivr: {
      prefix: 'https://cdn.jsdelivr.net',
      path: {
        basic: '/bootstrap/{version}',
        bootswatch: '/bootswatch/{version}/{theme}/bootstrap.min.css'
      }
    }
  };

  JQUERY_VERSION = '2.1.4';

  JQUERY_CDN = {
    cdnjs: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/{version}/jquery.min.js',
    staticfile: 'https://staticfile.qnssl.com/jquery/{version}/jquery.min.js',
    jsdelivr: 'https://cdn.jsdelivr.net/jquery/{version}/jquery.min.js'
  };

  MARKDOWN_CDN = {
    cdnjs: {
      commonmark: 'https://cdnjs.cloudflare.com/ajax/libs/commonmark/0.24.0/commonmark.min.js',
      showdown: 'https://cdnjs.cloudflare.com/ajax/libs/showdown/1.3.0/showdown.min.js',
      pagedown: 'https://cdnjs.cloudflare.com/ajax/libs/pagedown/1.0/Markdown.Converter.min.js',
      marked: 'https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.min.js'
    },
    staticfile: {
      commonmark: 'https://staticfile.qnssl.com/commonmark/0.22.1/commonmark.min.js',
      showdown: 'http://cdn.staticfile.org/showdown/1.3.0/showdown.min.js',
      pagedown: 'http://cdn.staticfile.org/pagedown/1.0/Markdown.Converter.min.js'
    },
    jsdelivr: {
      showdown: 'https://cdn.jsdelivr.net/showdown/1.3.0/showdown.min.js',
      maked: 'https://cdn.jsdelivr.net/marked/0.3.5/marked.min.js'
    }
  };

  MARKDOWN = {
    commonmark: function(markdown) {
      var reader, writer;
      reader = new commonmark.Parser;
      writer = new commonmark.HtmlRenderer;
      writer.softbreak = '<br />';
      return writer.render(reader.parse(markdown));
    },
    showdown: function(markdown) {
      var converter;
      showdown.setOption('noHeaderId', true);
      showdown.setOption('strikethrough', true);
      showdown.setOption('tables', true);
      converter = new showdown.Converter;
      return converter.makeHtml(markdown);
    },
    pagedown: function(markdown) {
      var converter;
      converter = new Markdown.Converter;
      return converter.makeHtml(markdown);
    },
    marked: function(markdown) {
      marked.setOptions({
        gfm: true,
        tables: true,
        breaks: true,
        sanitize: true,
        smartLists: true,
        smartypants: false
      });
      return marked(markdown);
    }
  };

  Bootsdown = (function() {
    function Bootsdown() {
      var engine, parseEventCount, parseText, parsedText, progress, progressBar, renderElement, renderEventCount, text;
      this.head = (document.getElementsByTagName('head'))[0];
      this.isHttps = location.protocol === 'https:';
      this.metas = document.getElementsByTagName('meta');
      this.cdn = this.getMeta('bootsdown:cdn', 'cdnjs');
      this.theme = this.getMeta('bootsdown:theme', 'basic');
      this.markdown = this.getMeta('bootsdown:markdown', 'commonmark');
      engine = null;
      text = '';
      parsedText = null;
      parseEventCount = 0;
      renderEventCount = 0;
      progressBar = document.createElement('div');
      progressBar.style.position = 'absolute';
      progressBar.style.zIndex = 99999;
      progressBar.style.height = '3px';
      progressBar.style.backgroundColor = '#F00';
      progressBar.style.top = 0;
      progressBar.style.left = 0;
      progress = function() {
        var percent;
        percent = (parseEventCount + renderEventCount) * 20;
        progressBar.style.width = percent + '%';
        if (percent === 100) {
          return document.body.removeChild(progressBar);
        }
      };
      parseText = function() {
        parseEventCount += 1;
        progress();
        if (parseEventCount !== 2) {
          return;
        }
        parsedText = engine(text);
        return renderElement();
      };
      renderElement = (function(_this) {
        return function() {
          renderEventCount += 1;
          console.log(renderEventCount);
          progress();
          if (renderEventCount !== 3) {
            return;
          }
          return _this.render(parsedText);
        };
      })(this);
      document.addEventListener('DOMContentLoaded', function() {
        var j, len, script, scripts;
        document.body.appendChild(progressBar);
        scripts = document.getElementsByTagName('script');
        for (j = 0, len = scripts.length; j < len; j++) {
          script = scripts[j];
          if ('text/markdown' === script.getAttribute('type')) {
            text = script.innerHTML;
            break;
          }
        }
        return parseText();
      });
      this.loadMarkdown(function() {
        engine = this;
        return parseText();
      });
      this.loadBootstrap(function() {
        return renderElement();
      }, function() {
        return renderElement();
      });
    }

    Bootsdown.prototype.render = function(html) {
      var k, navBar, ref, struct, v;
      navBar = $('<div class="navbar navbar-default navbar-fixed-top"> <div class="container"> <div class="navbar-header"> <a href="#" class="navbar-brand" id="brand"></a> <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> </div> <div class="navbar-collapse collapse" id="navbar-main"> <ul class="nav navbar-nav" id="menu"> </ul> </div> </div> </div> <div class="container" id="content"></div>').appendTo(document.body);
      struct = this.analyzeHtml(html);
      $('#brand').html(struct.brand);
      ref = struct.menu;
      for (k in ref) {
        v = ref[k];
        $("<li><a href=\"#" + k + "\">" + v + "</a></li>").appendTo('#menu');
      }
      $(document.body).css('padding-top', navBar.outerHeight() + 20);
      return $('#content').show();
    };

    Bootsdown.prototype.analyzeHtml = function(html) {
      var brand, content, h1, h2, i, id, item, items, j, len, menu;
      content = $('#content').hide().html(html);
      h1 = $('h1').get(0);
      if (h1) {
        brand = ($(h1)).text();
      }
      if (h1) {
        ($(h1)).hide();
      }
      items = $('h2');
      menu = {};
      for (i = j = 0, len = items.length; j < len; i = ++j) {
        item = items[i];
        h2 = $(item);
        id = 'goto-' + i;
        h2.attr('id', id);
        menu[id] = h2.text();
      }
      return {
        brand: brand,
        menu: menu
      };
    };

    Bootsdown.prototype.getMeta = function(name, defaults) {
      var j, len, meta, ref;
      if (defaults == null) {
        defaults = null;
      }
      ref = this.metas;
      for (j = 0, len = ref.length; j < len; j++) {
        meta = ref[j];
        if (name === meta.getAttribute('name')) {
          return meta.getAttribute('content');
        }
      }
      return defaults;
    };

    Bootsdown.prototype.loadCss = function(url, cb) {
      var link;
      if (cb == null) {
        cb = null;
      }
      link = document.createElement('link');
      this.head.appendChild(link);
      link.onload = function() {
        link.media = 'all';
        if (cb != null) {
          return cb();
        }
      };
      link.onerror = function() {
        if (cb != null) {
          return cb();
        }
      };
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = url;
      return link.media = 'none';
    };

    Bootsdown.prototype.loadJs = function(url, cb) {
      var script;
      if (cb == null) {
        cb = null;
      }
      script = document.createElement('script');
      this.head.appendChild(script);
      if (cb != null) {
        script.onload = cb;
      }
      return script.src = url;
    };

    Bootsdown.prototype.loadMarkdown = function(cb) {
      var parser, url;
      url = MARKDOWN_CDN[this.cdn];
      if (url[this.markdown] == null) {
        throw new Error("Markdown engine " + this.markdown + " is missing");
      }
      parser = MARKDOWN[this.markdown];
      return this.loadJs(url[this.markdown], cb.bind(parser));
    };

    Bootsdown.prototype.loadJQuery = function(cb) {
      var url;
      url = JQUERY_CDN[this.cdn];
      return this.loadJs(url.replace('{version}', JQUERY_VERSION), cb);
    };

    Bootsdown.prototype.loadBootstrap = function(cbJs, cbCss) {
      var cssFile, jsFile, name, parts, theme, url;
      url = BOOTSTRAP_CDN[this.cdn];
      parts = this.theme.split(':');
      name = this.theme;
      theme = null;
      jsFile = (url.path.basic.replace('{version}', BOOTSTRAP_VERSION.basic)) + '/js/bootstrap.min.js';
      if (parts.length > 1) {
        name = parts[0], theme = parts[1];
      }
      cssFile = url.path[name].replace('{version}', BOOTSTRAP_VERSION[name]).replace('{theme}', theme);
      if (parts.length === 1) {
        cssFile += '/css/bootstrap.min.css';
      }
      this.loadJQuery((function(_this) {
        return function() {
          return _this.loadJs(url.prefix + jsFile, cbJs);
        };
      })(this));
      return this.loadCss(url.prefix + cssFile, cbCss);
    };

    return Bootsdown;

  })();

  new Bootsdown;

}).call(this);
