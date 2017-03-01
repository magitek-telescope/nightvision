const DEFAULT_LOG = "es_feature_symbol_default_log";

class NightVision{
  init(){
    {
      const isBrowser = !(typeof process !== "undefined" && typeof require !== "undefined");
      if(!isBrowser){
        console.log("NightVision only support browser.");
        return false;
      }
    }

    const $ = e=>document.querySelector(e);

    const wrap = document.createElement("div");
    wrap.setAttribute("id", "nightvision_logs");
    $("body").append(wrap);

    const logs = document.createElement("ul");
    logs.setAttribute("id", "nightvision_logs_body");
    $("#nightvision_logs").append(logs);

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    this.setStyle();

    if(isIOS){
      window.addEventListener("scroll", ()=>{
        $("#nightvision_logs").style.transform = `translateY(${window.scrollY}px)`;
      });
      $("#nightvision_logs").style.position = "absolute";
      $("#nightvision_logs").style.bottom = "-70px";
    }

    console[DEFAULT_LOG] = console.log;
    console.log = (...args) => {
      console[DEFAULT_LOG](...args);
      const log = document.createElement("li");
      log.innerText = "> ";
      for(let arg of args){
        log.innerText += JSON.stringify(arg, false, "\t") + " ";
      }
      $("#nightvision_logs #nightvision_logs_body").append(log);
      $("#nightvision_logs").scrollTop = `${$("#nightvision_logs_body").clientHeight}`;
    }
  }

  setStyle(){
    const $ = e=>document.querySelector(e);
    const font = document.createElement("link");
    font.setAttribute("href", "https://fonts.googleapis.com/css?family=Source+Code+Pro");
    font.setAttribute("rel", "stylesheet");

    const style = document.createElement("style");
    style.innerText = (`
    #nightvision_logs{
      position: fixed;
      left: 0;
      bottom: 0;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100px;
      overflow: auto;
      background: #111;
      color: #fff;
      font-weight: normal;
      z-index: 100000000000000000000000000000000;
      font-family: 'Source Code Pro', sans-serif;
      -webkit-overflow-scrolling: touch;
    }

    #nightvision_logs #nightvision_logs_body{
      list-style: none;
      margin: 0;
      padding: 0;
    }

    #nightvision_logs li{
      padding: 10px;
      border-bottom: solid 1px #999;
    }
    `).replace(/\n/g, "").replace(/  /g, "");

    $("head").append(font);
    $("head").append(style);
  }
}
