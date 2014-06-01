
var sId = 'krpanoWrapper'
	,mWrapper = zen('div#'+sId+'.pano-wrap')[0];
document.body.appendChild(mWrapper);
create(sId,'example.xml',function(){
	var mInterface = zen('div#interface>h2{idleView}')[0]
		,option = function(name,min,max){return {name:name,min:min,max:max};}
		,aOptions = [
			 option('idletimeout',200,10000)
			,option('forceh',0,20)
			,option('forcev',0,20)
			,option('forcez',0,20)
			,option('frequencyh',.1,5)
			,option('frequencyv',.1,5)
			,option('frequencyz',.1,5)
			,option('attractv',0,30)
			,option('attractz',0,30)
			,option('offseth',0,10)
		]
	;
	document.body.appendChild(mInterface);
	window.addEventListener('idleViewInitialized',function(e){
		var oIdleView = e.detail;
		aOptions.forEach(function(option){
			var sName = option.name
				,fMin = option.min
				,fMax = option.max
				,fCurrentValue = parseFloat(oIdleView[sName])
				,fStep = (fMax-fMin)/200
				,mDiv = zen('div>(label[for='+sName+']{'+sName+'}+input#'+sName+'[type=range min='+fMin+' value='+fCurrentValue+' data-value='+fCurrentValue+' max='+fMax+' step='+fStep+'])')[0]
				,mInput = mDiv.querySelector('input')
			;
			mInput.addEventListener('input',function(e){
				var fValue = mInput.value;
				mInput.setAttribute('data-value',fValue);
				oIdleView[mInput.getAttribute('id')] = fValue;
			});
			mInterface.appendChild(mDiv);
		});
	});
	window.addEventListener('idleViewStart',function(e){
		mWrapper.classList.add('idling');
	});
	window.addEventListener('idleViewEnd',function(e){
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
			console.warn(err)
		}
		,html5:		'prefer'
	})
}