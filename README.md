# Xtrica Progress: A javascript class for adding / updating progress bars in multiple containers, at the same time, on the same page, styled however.

A new instance is constructed with three parameters: `(HTMLElement: parentContainer, string: cssClassNames, int: transitionDurationMilliseconds)`.

An instance has two methods:
- `setProgress(int: progressPercentage)`, which returns a promise once the progress bar has reached the given percentage.
- `cleanup()` which removes elements created by this class in the DOM.

**Notes:**
- A `setProgress` input value of `-1` will fade the progress bar out, and return it to zero.
- The progress bar will fill the height and width of the `parentContainer`.
- *Multiple instances can be very useful.*
- *Before destroying an instance, you must call `.cleanup()` to avoid memory leaks.* Example in VueJS: `beforeDestroy () { this.progressbarA.cleanup() }`

## Example usage within a Node.JS dev environment

**Javascript:**
```javascript
var XtricaProgress = require('xtrica-progress').default
var progressbarA = new XtricaProgress(document.getElementById('progressbarContainerA'), 'progressbar red', 650)
var progressbarB = new XtricaProgress(document.getElementById('progressbarContainerB'), 'progressbar brandcolor', 300)
var progressbarC = new XtricaProgress(document.getElementById('progressbarContainerC'), 'asdfadf', 1000)
var updateSomeProgressBars = function () {
  progressbarA.setProgress(50).then(() => {
    progressbarA.setProgress(100).then(() => {
      progressbarA.setProgress(-1)
    })
  })
  progressbarB.setProgress(33).then(() => {
    progressbarB.setProgress(0)
  })
  progressbarC.setProgress(0).then(() => {
    progressbarC.setProgress(100)
  })
}
```

**HTML:**
```html
<div id="progressbarContainerA"></div>
<div id="progressbarContainerB"></div>
<span id="progressbarContainerC"></span>
<button onclick="updateSomeProgressBars()">click me</button>
```

**Custom CSS:**
```css
<style>
#progressbarContainerA, #progressbarContainerB, #progressbarContainerC {
  display: block;
  height: 10px;
  width: 100%;
}
.progressbar.red {
  background-color: #ff0000;
}
.progressbar.brandcolor {
  background-color: #00ff00;
}
.asdfadf {
  background-color: #00ff00;
}
</style>
```