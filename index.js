/*
 * xtrica-progress v1.0.1513665423 (https://xtrica.com)
 * Copyright 2017 (or 2150?) Xtrica
 * Licensed under MIT
 */
export default function(parent,classes,speed){this.progress=0
this.speed=(parseInt(speed)>0&&parseInt(speed)<1000001)?parseInt(speed):650
this.element=document.createElement('span')
if(this.element){if(classes){this.element.className=classes}
this.element.setAttribute('style','height:100%;opacity:0;transition:all '+this.speed+'ms ease-in-out;-o-transition:all '+this.speed+'ms ease-in-out;-ms-transition:all '+this.speed+'ms ease-in-out;-moz-transition:all '+this.speed+'ms ease-in-out;-webkit-transition:all '+this.speed+'ms ease-in-out;width:0;')
if(!parent.appendChild(this.element)){document.body.appendChild(this.element)}}
this.setProgressActive=!1
this.setProgress=function(progress){let vm=this
return new Promise(function(resolve,reject){vm.setProgressActive=!0
if(!!vm&&!!vm.timeout){clearTimeout(vm.timeout)}
if(!!vm&&!!vm.element){vm.progress=((parseInt(progress)>99)?100:((parseInt(progress)<0)?-1:parseInt(progress)))
if(vm.progress===-1){vm.element.style.opacity=0
vm.timeout=setTimeout(()=>{if(!!vm&&!!vm.element){vm.element.style.display='none'
vm.element.style.width='0'
setTimeout(()=>{if(!!vm&&!!vm.element){vm.element.style.display='block'
vm.setProgressActive=!1}
resolve()},vm.speed)}else{resolve()}},vm.speed)}else{vm.element.style.opacity=1
vm.element.style.display='block'
vm.element.style.width=vm.progress+'%'
vm.timeout=setTimeout(()=>{if(!!vm){vm.setProgressActive=!1}
resolve()},vm.speed)}}else{vm.setProgressActive=!1
resolve()}})}
this.clear=()=>{let vm=this
return new Promise(function(resolve,reject){if(!!vm&&!!vm.timeout){clearTimeout(vm.timeout)}
if(!!vm&&!!vm.element){vm.element.style.opacity=0
setTimeout(()=>{resolve()},vm.speed)}else{resolve()}})}
this.cleanup=()=>{let vm=this
vm.clear().then(()=>{if(!!vm&&!!vm.element){vm.element.parentElement.removeChild(vm.element)
vm.element=null}})}}