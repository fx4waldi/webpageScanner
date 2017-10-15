(function(){
	translate();
	document.getElementById("notificationVolume").addEventListener("change",e=>{document.getElementById("oVolume").value=e.target.value;});
	document.getElementById("notificationTime").addEventListener("change",e=>{document.getElementById("oTime").value=parseInt(e.target.value/1000);});
	document.getElementById("openWindow").addEventListener("change",e=>{
		let checked=e.target.checked,
			more=document.getElementById("openWindowMore"),
			moreLabel=document.getElementById("labelOpenWindowMore");
		more.className=checked+" sub";
		more.disabled=!checked;
		moreLabel.className=checked;
	});
	document.getElementById("showNotification").addEventListener("change",e=>{
		let checked=e.target.checked;
		document.getElementById("trTime").className=checked;
		document.getElementById("notificationTime").disabled=!checked;
	});
	document.getElementById("showNextPrev").addEventListener("change",e=>{
		let checked=e.target.checked,
			autoScroll=document.getElementById("scrollToFirstChange"),
			autoScrollLabel=document.getElementById("labelScrollToFirstChange"),
			skip=document.getElementById("skipMinorChanges"),
			skipLabel=document.getElementById("labelSkipMinorChanges");
		autoScroll.className=checked+" sub";
		autoScroll.disabled=!checked;
		autoScrollLabel.className=checked;
		skip.className=checked+" sub";
		skip.disabled=!checked;
		skipLabel.className=checked;
	});
	document.addEventListener("DOMContentLoaded",restoreOptions);
	document.getElementById("optionsForm").addEventListener("change",saveOptions);
	document.getElementById("backup").addEventListener("click",createBackup);
})();

function saveOptions(){
	let settings={
		notificationVolume:	parseInt(document.getElementById("notificationVolume").value),
		notificationTime:	parseInt(document.getElementById("notificationTime").value),
		showNotification:	document.getElementById("showNotification").checked,
		autoOpen:			document.getElementById("autoOpen").checked,
		hideHeader:			document.getElementById("hideHeader").checked,
		defaultView:		document.getElementById("defaultView").value,
		openWindow:			document.getElementById("openWindow").checked,
		openWindowMore:		document.getElementById("openWindowMore").checked?1:0,
		requestTime:		parseInt(document.getElementById("requestTime").value*1000),
		diffOld:			document.getElementById("diffOld").checked,
		popupList:			document.getElementById("popupList").checked,
		theme:				document.getElementById("theme").value,
		showNextPrev:		document.getElementById("showNextPrev").checked,
		scrollToFirstChange:document.getElementById("scrollToFirstChange").checked,
		skipMinorChanges:	document.getElementById("skipMinorChanges").checked
	};
	browser.storage.local.set({settings:settings});
	if(!settings.popupList)browser.browserAction.setPopup({popup:"/popup.html"});
	else browser.browserAction.setPopup({popup:"/sidebar.html"});
}

function restoreOptions(){
	browser.storage.local.get('settings').then(result=>{
		let s=result.settings,
			openWindowMore=s.openWindowMore?true:false;
		document.getElementById("notificationVolume").value=s.notificationVolume;
		document.getElementById("oVolume").value=s.notificationVolume;
		document.getElementById("notificationTime").value=s.notificationTime;
		document.getElementById("oTime").value=parseInt(s.notificationTime/1000);
		document.getElementById("autoOpen").checked=s.autoOpen;
		document.getElementById("hideHeader").checked=s.hideHeader;
		document.getElementById("showNotification").checked=s.showNotification;
		document.getElementById("defaultView").value=s.defaultView;
		document.getElementById("trTime").className=s.showNotification;
		document.getElementById("notificationTime").disabled=!s.showNotification;
		document.getElementById("openWindow").checked=s.openWindow;
		document.getElementById("openWindowMore").checked=openWindowMore;
		document.getElementById("openWindowMore").disabled=!s.openWindow;
		document.getElementById("openWindowMore").className=s.openWindow+" sub";
		document.getElementById("labelOpenWindowMore").className=s.openWindow;
		document.getElementById("requestTime").value=parseInt(s.requestTime/1000);
		document.getElementById("diffOld").checked=s.diffOld;
		document.getElementById("popupList").checked=s.popupList;
		document.getElementById("theme").value=s.theme?s.theme:"light";
		document.getElementById("showNextPrev").checked=s.showNextPrev;
		document.getElementById("scrollToFirstChange").checked=s.scrollToFirstChange;
		document.getElementById("skipMinorChanges").checked=s.skipMinorChanges;
		document.getElementById("scrollToFirstChange").className=s.showNextPrev+" sub";
		document.getElementById("skipMinorChanges").className=s.showNextPrev+" sub";
		document.getElementById("scrollToFirstChange").disabled=!s.showNextPrev;
		document.getElementById("skipMinorChanges").disabled=!s.showNextPrev;
		document.getElementById("labelScrollToFirstChange").className=s.showNextPrev;
		document.getElementById("labelSkipMinorChanges").className=s.showNextPrev;
	});
}

function createBackup(){
	browser.storage.local.get().then(result=>{
		let a=document.createElement("a");
		document.body.appendChild(a);
		let json=JSON.stringify(result),
			blob=new Blob([json],{type:"octet/stream"}),
			url=window.URL.createObjectURL(blob),
			d=new Date(),
			date=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
		a.href=url;
		a.download=`Web Pages Scanner - ${date}.js`;
		a.style.display="none";
		a.click();
		window.URL.revokeObjectURL(url);
	});
}

function translate(){
	document.getElementById("h2options").textContent=i18n("options");
	document.getElementById("thGeneral").textContent=i18n("general");
	document.getElementById("labelAutoOpen").textContent=i18n("autoOpen");
	document.getElementById("labelHideHeader").textContent=i18n("hideHeader");
	document.getElementById("labelDefaultView").textContent=i18n("defaultView");
	let defaultViewSelect=document.getElementById("defaultView").options;
		defaultViewSelect[0].text=i18n("highlight");
		defaultViewSelect[1].text=i18n("newElements");
		defaultViewSelect[2].text=i18n("deletedElements");
		defaultViewSelect[3].text=i18n("newVersion");
		defaultViewSelect[4].text=i18n("oldVersion");
	document.getElementById("thNotifications").textContent=i18n("notifications");
	document.getElementById("labelShow").textContent=i18n("showNotification");
	document.getElementById("volumeLabel").textContent=i18n("volume");
	document.getElementById("timeLabel").textContent=i18n("notificationTime");
	document.getElementById("labelRequestTime").textContent=i18n("maxRequestTime");
	document.getElementById("thChangedPages").textContent=i18n("changedPages");
	document.getElementById("labelOpenWindow").textContent=i18n("openNewWindow");
	document.getElementById("labelOpenWindowMore").textContent=i18n("openNewWindowMore");
	document.getElementById("labelDiffOld").textContent=i18n("diffOld");
	document.getElementById("labelPopupList").textContent=i18n("popupList");	
	document.getElementById("labelTheme").textContent=i18n("theme");
	let theme=document.getElementById("theme").options;
		theme[0].text=i18n("lightTheme");
		theme[1].text=i18n("darkTheme");
	document.getElementById("backup").value=i18n("backup");
	document.getElementById("labelShowNextPrev").textContent=i18n("showNextPrev");
	document.getElementById("labelScrollToFirstChange").textContent=i18n("scrollToFirstChange");
	document.getElementById("labelSkipMinorChanges").textContent=i18n("skipMinorChanges");
}

function i18n(e,s1){
	return browser.i18n.getMessage(e,s1);
}