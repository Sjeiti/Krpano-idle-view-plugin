(function(){
	'use strict';

	var sId = 'krpanoWrapper'
		,mWrapper = zen('div#'+sId+'.pano-wrap')[0];
	document.body.appendChild(mWrapper);
	create(sId,'example.xml',function(){
		var mInterface = zen('div#interface>h2{idleView}')[0]
			,option = function(name,min,max,info){return {name:name,min:min,max:max,info:info};}
			,aOptions = [
				 option('idletimeout',200,10000,'The timeout in milliseconds.')
				,option('forceh',0,20,'The amount of horizontal movement.')
				,option('forcev',0,20,'The amount of vertical movement.')
				,option('forcez',0,20,'The amount of zoom movement.')
				,option('frequencyh',0.1,10,'The frequency of the horizontal movement.')
				,option('frequencyv',0.1,10,'The frequency of the vertical movement.')
				,option('frequencyz',0.1,10,'The frequency of the zoom movement.')
				,option('gammah',0.01,2,'Gamma correction of the horizontal movement.')
				,option('gammav',0.01,2,'Gamma correction of the vertical movement.')
				,option('gammaz',0.01,2,'Gamma correction of the zoom movement.')
				,option('attractv',0,30,'Vertical attraction toward the horizontal plane.')
				,option('attractz',0,30,'Zoom attraction toward the initial zoom state.')
				,option('offseth',-10,10,'Horizontal offset causing a continuous left or right motion.')
			]
		;
		document.body.appendChild(mInterface);
		window.addEventListener('idleViewInitialized',function(e){
			var oIdleView = e.detail;
			aOptions.forEach(function(option){
				var sName = option.name
					,fMin = option.min
					,fMax = option.max
					,sInfo = option.info
					,fCurrentValue = parseFloat(oIdleView[sName])
					,fStep = (fMax-fMin)/200
					,mDiv = zen('div>(label[for='+sName+' data-info=\''+sInfo+'\']{'+sName+'}+input#'+sName+'[type=range min='+fMin+' value='+fCurrentValue+' data-value='+fCurrentValue+' max='+fMax+' step='+fStep+'])')[0]
					,mInput = mDiv.querySelector('input')
				;
				mInput.addEventListener('input',function(){
					var fValue = mInput.value;
					mInput.setAttribute('data-value',fValue);
					oIdleView[mInput.getAttribute('id')] = fValue;
				});
				mInterface.appendChild(mDiv);
			});
		});
		window.addEventListener('idleViewStart',function(){
			mWrapper.classList.add('idling');
		});
		window.addEventListener('idleViewEnd',function(){
			mWrapper.classList.remove('idling');
		});
	});
	function create(id,xml,callback){
		embedpanoJS({
			id:			'_'+id
			,target:	id
			,xml:		xml
			,onready:	function(instance){
				instance.classList.add('panorama');
				if (callback) callback(instance);
			}
			,onerror:	function(err){
				console.warn(err);
			}
			,html5:		'prefer'
		});
	}
})();