var util = util || {};
util.toArray = function(list) {
  return Array.prototype.slice.call(list || [], 0);
};

var Terminal = Terminal || function(cmdLineContainer, outputContainer) {
  window.URL = window.URL || window.webkitURL;
  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

  var cmdLine_ = document.querySelector(cmdLineContainer);
  var output_ = document.querySelector(outputContainer);

  const CMDS_ = [
    'cat', 'clear', 'date', 'echo', 'help', 'ls',
  ];

  const FILE_ = [
    'n.txt', 'e.txt', 'ciphertext.txt', 'help.me',
  ]


  var fs_ = null;
  var cwd_ = null;
  var history_ = [];
  var histpos_ = 0;
  var histtemp_ = 0;

  window.addEventListener('click', function(e) {
    // cmdLine_.focus();
  }, false);

  cmdLine_.addEventListener('click', inputTextClick_, false);
  cmdLine_.addEventListener('keydown', historyHandler_, false);
  cmdLine_.addEventListener('keydown', processNewCommand_, false);

  var name = "SUM(p,q)";
  var value = "p+q = 17914012633690460554055012955268971085304705684680616194957652861980944803542815256158706096213147920682083379468184411184051553703586618323015195546600112";

  //Function for cookie

  function createCookie(name,value,days) {
    if (days) {
       var date = new Date();
       date.setTime(date.getTime()+(days*24*60*60*1000));
       var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+";";
  }
  createCookie(name,value,200);

  //
  function inputTextClick_(e) {
    this.value = this.value;
  }

  //
  function historyHandler_(e) {
    if (history_.length) {
      if (e.keyCode == 38 || e.keyCode == 40) {
        if (history_[histpos_]) {
          history_[histpos_] = this.value;
        } else {
          histtemp_ = this.value;
        }
      }

      if (e.keyCode == 38) { // up
        histpos_--;
        if (histpos_ < 0) {
          histpos_ = 0;
        }
      } else if (e.keyCode == 40) { // down
        histpos_++;
        if (histpos_ > history_.length) {
          histpos_ = history_.length;
        }
      }

      if (e.keyCode == 38 || e.keyCode == 40) {
        this.value = history_[histpos_] ? history_[histpos_] : histtemp_;
        this.value = this.value; // Sets cursor to end of input.
      }
    }
  }

  //
  function processNewCommand_(e) {

    if (e.keyCode == 9) { // tab
      e.preventDefault();
      // Implement tab suggest.
    } else if (e.keyCode == 13) { // enter
      // Save shell history.
      if (this.value) {
        history_[history_.length] = this.value;
        histpos_ = history_.length;
      }

      // Duplicate current input and append to output section.
      var line = this.parentNode.parentNode.cloneNode(true);
      // line.removeAttribute('id')
      line.classList.add('line');
      var input = line.querySelector('input.cmdline');
      input.autofocus = true;
      input.readOnly = true;
      output_.appendChild(line);

      if (this.value && this.value.trim()) {
        var args = this.value.split(' ').filter(function(val, i) {
          return val;
        });
        var cmd = args[0].toLowerCase();
        args = args.splice(1); // Remove cmd from arg list.
      }

      switch (cmd) {
        case 'cat':
          var req_file = args.join(' ');
          if (!req_file) {
            output('Usage: ' + cmd + ' FILE_NAME');
            output('Example: ' + cmd + ' n.txt');
            break;
          }

          switch (req_file) {
            case 'n.txt':
              output("N: 78448823099576055514414361317662315054325962383563105820765456804663944126101480094518811906000472963835962831013758061692111051241607550849092731437379369044347640203022241971010262069670465388627263720813285059155866651504979066160700686173441572263502395651150476843944960357736597981882527397598286672207");
              break;
            case 'e.txt':
              output('e: 65537');
              break;
            case 'ciphertext.txt':
              output('<span>Ciphertext: 26035374206090425554573123399474110792671472717012159440366752438351791444960048600655243932014365154528338109208693865268746558963882861059734381697720058259967549627281447398521323304902148915982098852180268875987491284916818815691314592130034471238869451370576052353776740150774543150175320794899570456002</span>');
              break;
            case 'help.me':
              output('Hmm... I KNOW!! But what should I do? My brother finished all the Cookies in the jar, and I don\'t think there\'s any left.');
              break;
            case 'flag' || 'flag.txt':
              output('I agree the admins are lazy, but they are not stupid enough to throw out the F L A G. Nice try though!')
              break;
            default:
              if(req_file) {
                output(req_file + ": No such file");
              }
          }

          break;
        case 'clear':
          output_.innerHTML = '';
          this.value = '';
          return;
        case 'date':
          output( new Date() );
          break;
        case 'echo':
          output( args.join(' ') );
          break;
        case 'help':
          output('<div class="ls-files">' + CMDS_.join('<br>') + '</div>');
          break;
        case 'uname':
          output(navigator.appVersion);
          break;
        case 'whoami':
          var result = "<img src=\"" + codehelper_ip["Flag"]+ "\"><br><br>";
          for (var prop in codehelper_ip)
            result += prop + ": " + codehelper_ip[prop] + "<br>";
          output(result);
          break;
        case 'ls':
          output('<div class="ls-files">' + FILE_.join('<br>') + '</div>');
          break;
        default:
          if (cmd) {
            output(cmd + ': command not found');
          }
      };

      window.scrollTo(0,getDocHeight_());
      this.value = ''; // Clear/setup line for next input.
    }
  }

  //
  function formatColumns_(entries) {
    var maxName = entries[0].name;
    util.toArray(entries).forEach(function(entry, i) {
      if (entry.name.length > maxName.length) {
        maxName = entry.name;
      }
    });

    var height = entries.length <= 3 ?
        'height: ' + (entries.length * 15) + 'px;' : '';

    // 12px monospace font yields ~7px screen width.
    var colWidth = maxName.length * 7;

    return ['<div class="ls-files" style="-webkit-column-width:',
            colWidth, 'px;', height, '">'];
  }

  //
  function output(html) {
    output_.insertAdjacentHTML('beforeEnd', '<p>' + html + '</p>');
  }

  // Cross-browser impl to get document's height.
  function getDocHeight_() {
    var d = document;
    return Math.max(
        Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
        Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
        Math.max(d.body.clientHeight, d.documentElement.clientHeight)
    );
  }

  //
  return {
    // init: function() {
    //   output('<img align="left" src="http://www.w3.org/html/logo/downloads/HTML5_Badge_128.png" width="100" height="100" style="padding: 0px 10px 20px 0px"><h2 style="letter-spacing: 4px">HTML5 Web Terminal</h2><p>' + new Date() + '</p><p>Enter "help" for more information.</p>');
    // },
     output: output
  }
};