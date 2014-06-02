# Krpano idleView plugin

The Krpano idle view plugin (formerly simplexIdle) uses Simplex noise to look around and zoom when the panorama is idle. The movement is random but not as random as Brownian motion. Simplex noise, like Perlin noise, interpolates between random numbers. The result is a motion that could be perceived as life-like.

## Options

The plugin is initialized by adding an XML node like so:

```xml
<plugin
	name="idleView"
	url="../src/idleView.js"
	keep="true"
/>
```

The attributes that can be added to the element can be:

 * **idletimeout**: The timeout in milliseconds.
 * **forceh**: The amount of horizontal movement.
 * **forcev**: The amount of vertical movement.
 * **forcez**: The amount of zoom movement.
 * **frequencyh**: The frequency of the horizontal movement.
 * **frequencyv**: The frequency of the vertical movement.
 * **frequencyz**: The frequency of the zoom movement.
 * **gammah**: Gamma correction of the horizontal movement.
 * **gammav**: Gamma correction of the vertical movement.
 * **gammaz**: Gamma correction of the zoom movement.
 * **attractv**: Vertical attraction toward the horizontal plane.
 * **attractz**: Zoom attraction toward the initial zoom state.
 * **offseth**: Horizontal offset causing a continuous left or right motion.

## Javascript interface

The plugin throws a number of events for you to hook into.
The events are dispatched from window.

**idleViewInitialized**

The `idleViewInitialized` can be used to easily access the plugin. It is dispatched as soon as the plugin is initialised. All XML properties can be changed through the plugins Javascript object.

```javascript
window.addEventListener('idleViewInitialized',function(e){
	var oIdleView = e.detail;
	console.log('frequencyh',oIdleView.frequencyh);
});
```

**idleViewStart**

Dispatched when idling starts.

```javascript
window.addEventListener('idleViewStart',function(){
	document.body.classList.add('idling');
});
```

**idleViewEnd**

Dispatched when idling ends.

```javascript
window.addEventListener('idleViewEnd',function(){
	document.body.classList.remove('idling');
});
```