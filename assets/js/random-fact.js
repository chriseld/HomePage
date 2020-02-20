historyData = {
    host: "https://history.muffinlabs.com/",
  
    /*
     * Lightweight JSONP fetcher
     * Copyright 2010-2012 Erik Karlsson. All rights reserved.
     * BSD licensed
     */

    jsonP: (function(){
        var counter = 0, head, window = this, config = {};
        function load(url, pfnError) {
            var script = document.createElement('script'),
                  done = false;
            script.src = url;
            script.async = true;
        
            var errorHandler = pfnError || config.error;
            if ( typeof errorHandler === 'function' ) {
                script.onerror = function(ex){
                    errorHandler({url: url, event: ex});
                };
            }
            
            script.onload = script.onreadystatechange = function() {
                if ( !done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
                    done = true;
                    script.onload = script.onreadystatechange = null;
                    if ( script && script.parentNode ) {
                        script.parentNode.removeChild( script );
                    }
                }
            };
            
            if ( !head ) {
                head = document.getElementsByTagName('head')[0];
            }
            head.appendChild( script );
        }
        function encode(str) {
            return encodeURIComponent(str);
        }
        function jsonp(url, params, callback, callbackName) {
            var query = (url||'').indexOf('?') === -1 ? '?' : '&', key;
              
            callbackName = (callbackName||config['callbackName']||'callback');
            var uniqueName = callbackName + "_json" + (++counter);
            
            params = params || {};
            for ( key in params ) {
                if ( params.hasOwnProperty(key) ) {
                    query += encode(key) + "=" + encode(params[key]) + "&";
                }
            }	
            
            window[ uniqueName ] = function(data){
                callback(data);
                try {
                    delete window[ uniqueName ];
                } catch (e) {}
                window[ uniqueName ] = null;
            };
        
            load(url + query + callbackName + '=' + uniqueName);
            return uniqueName;
        }
        function setDefaults(obj){
            config = obj;
        }
        return {
            get:jsonp,
            init:setDefaults
        };
    }()),
      load : function(options) {
          var callback, month, day, host;
      var path = '/date';
  
      host = this.host;
      
          if ( typeof(options) == "function" ) {
              callback = options;
          }
          else if ( typeof(options) == "object" ) {
              callback = options.callback;
              month = options.month;
              day = options.day;
        path = path + '/' + month + '/' + day;
  
        if ( options.host !== undefined ) {
          host = options.host;
        }
        }
      
          this.jsonP.get(host + path, {}, function(tmp) {
              historyData.data = tmp.data;
              historyData.url = tmp.url;
              historyData.date = tmp.date;
              if ( typeof(callback) == "function" ) {
                  callback(historyData.data);
              }
          });
      }
}
  
function randOrd() { return(Math.round(Math.random())-0.5); }
var  todaysFacts = [];
var factCounter = 0;

function getFact() {
    $("#fact-date").text(moment().format("MMMM Do") + " " + todaysFacts[factCounter].year);
    $("#random-fact").text(todaysFacts[factCounter].text);
    factCounter++;
}

$(document).ready(function() {
    
//historyData.host = "http://localhost:8001/";
    historyData.load(function(response) {
        // randomly sort our data just for variety
            response.Events.sort(randOrd);
            $("#fact-date").text(moment().format("MMMM Do") + " " + response.Events[factCounter].year);
            $("#random-fact").text(response.Events[factCounter].text);
            factCounter++;
            for (var i = 0; i < response.Events.length; i++) {
                todaysFacts.push(response.Events[i]);
            }  
    });
});

$("#facts").on("click", getFact);
  
  
  
  
  