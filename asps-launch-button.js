//=======================================
// settings: edit for your site
//=======================================
//	var m_szTargetURL = "http://web-reader.artistscope.com";
	 var m_szTargetURL = '"' + window.location + '"';
	
//=======================================
// images: edit to change images only
//=======================================
	var aspsPluginUrl = document.getElementById('asps-plugin-url').value;
	var imgLaunchBlue = aspsPluginUrl + "/asps-launch-button/images/launch_launch_off.png";
	var imgLaunchGreen = aspsPluginUrl + "/asps-launch-button/images/launch_launch_on.png";
	var imgInstallBlue = aspsPluginUrl + "/asps-launch-button/images/launch_install_off.png";
	var imgInstallGreen = aspsPluginUrl + "/asps-launch-button/images/launch_install_on.png";
	var imgUpgradeBlue = aspsPluginUrl + "/asps-launch-button/images/launch_upgrade_off.png";
	var imgUpgradeGreen = aspsPluginUrl + "/asps-launch-button/images/launch_upgrade_on.png";
	var imgStarted = aspsPluginUrl + "/asps-launch-button/images/launch_started.png";
	var imgNoSupport = aspsPluginUrl + "/asps-launch-button/images/launch_nosupport.png";
	var imgWinRequired = aspsPluginUrl + "/asps-launch-button/images/launch_required.png";
	var imgMouseOff = aspsPluginUrl + "/asps-launch-button/images/launch_asps_required.png";
	var imgMouseOver = aspsPluginUrl + "/asps-launch-button/images/launch_asps_required.png";
	var appLaunch = 0;
	var launchResult = "";
	var retLink = "javascript:void(0)";
	var chrome42 = "";


//=======================================
// functions: do not edit
//=======================================

function ArtisLaunchStatus(nStatus){
	//	if (nStatus == 1)
//		alert("ASPS Web Browser launched"); 
		if (nStatus == 2)
		alert("Unable to start the ASPS Web Browser"); 
		else if (nStatus == 3)
		alert("The ASPS Web Browser is not installed"); 
		else if (nStatus == 4)
			alert("Unable to locate program files"); 
	}

function MM_swapImgRestore() { 
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { 
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document); return x;
}

function MM_swapImage() { 
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function LaunchClick(n){
	if (n == 1){
		launchResult = asps.launchv1(m_szTargetURL);
		if (launchResult > 1){
			ArtisLaunchStatus(launchResult);
		}
	} else if (n == 2){
		launchResult = asps.launchv2(m_szTargetURL);
		if (launchResult > 1){
			ArtisLaunchStatus(launchResult);
		}
	} else {
		return false;
	}
}


//=======================================
// routine: do not edit
//=======================================

	var m_szPlatform = navigator.platform.toLowerCase();
	var m_szWin = (m_szPlatform.indexOf("win")!=-1);
	var m_szAgent = navigator.userAgent.toLowerCase();

	var m_bArtis = (m_szAgent.indexOf("artis")!=-1);
	var m_bTrident6 = (m_szAgent.indexOf('trident/6')!=-1);
	var m_bTrident5 = (m_szAgent.indexOf('trident/5')!=-1);
	var m_bTrident = ((m_szAgent.indexOf('trident')!=-1) && (!(m_bTrident6)) && (!(m_bTrident5)));
	var m_bMSIE = ((m_szAgent.indexOf('msie')!=-1) || (m_bTrident));
	var m_bOpera = (((m_szAgent.indexOf("opera/")!=-1) || (m_szAgent.indexOf("opr")!=-1)) && (!(m_bArtis)));
	var m_bSafari = ((m_szAgent.indexOf("safari/")!=-1) && (!(m_bArtis)));
	var m_bFxOld = ((m_szAgent.indexOf("firefox/2.")!=-1) || (m_szAgent.indexOf("firefox/3.")!=-1) || (m_szAgent.indexOf("firefox/4.")!=-1))
	var m_bFirefox = ((m_szAgent.indexOf("firefox")!=-1) && (!(m_bFxOld)) && (!(m_bArtis)));
	var m_bChrome = ((m_szAgent.indexOf("chrome")!=-1) && (!(m_bArtis)));	
	var m_bMozilla = ((m_bChrome) || (m_bFirefox) || (m_bOpera) || (m_bSafari));
			
			if (m_bChrome){	
	    		if (/chrome[\/\s](\d+\.\d+)/.test(m_szAgent)){    
					var chromeversion = new Number(RegExp.$1);   	
					if (chromeversion >= 42){
						m_bMozilla = false;
						chrome42 = true;
						imgMouseOff = imgLaunchBlue;
						imgMouseOver = imgLaunchGreen;
    	 		 		//alert("Chrome version is " + chromeversion);
    	 		 		//location.href = aspsPluginUrl + "/asps-launch-button/download-asps.html?ms=chrome";
        				retLink = aspsPluginUrl + "/asps-launch-button/download-asps.html?ms=chrome";
					}
				}
			}
	
if (m_szWin){ 
	
	if ((m_bMSIE) || (m_bMozilla)){
	
		document.writeln('<object id="asps" type="application/x-artislauncher" name="asps" width="0" height="0"></object>');
	
		var asps = document.getElementById('asps');
		var version = asps.version;
		if (version){
			imgMouseOff = imgLaunchBlue;
			imgMouseOver = imgLaunchGreen;
		} console.log(version);
		var a = version.split('.');
        	for (var i = 0; i < a.length; ++i) {
            	a[i] = Number(a[i]);
			}
		if (a[0] > 1){
			appLaunch = 2;
		} else if (a[0]){
			appLaunch = 1;
		}	
	} else if (m_bTrident){
		imgMouseOff = imgNoSupport;
		imgMouseOver = imgNoSupport;
		location.href = aspsPluginUrl + "/asps-launch-button/download-asps.html";
		retLink = aspsPluginUrl + "/asps-launch-button/download-asps.html?ms=trident";
	} else if (m_bArtis){
		imgMouseOff = imgStarted;
		imgMouseOver = imgStarted;
		retLink = "javascript:void(0)";
	} else {
		imgMouseOff = imgInstallBlue;
		imgMouseOver = imgInstallGreen;
		if (chrome42){
			retLink = aspsPluginUrl + "/asps-launch-button/download-asps.html?ms=chrome";
		} else {
			retLink = aspsPluginUrl + "/asps-launch-button/download-asps.html";
		}
	}
} else {
	imgMouseOff = imgWinRequired;
	imgMouseOver = imgWinRequired;
	retLink = "javascript:void(0)";
}

