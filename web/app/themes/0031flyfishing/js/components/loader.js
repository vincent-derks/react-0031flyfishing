import React, { Component } from 'react'
import InlineSVG from 'react-inline-svg'
import ReactDOM from 'react-dom'
import $ from 'jquery'

export default class Loader extends Component {
    componentDidMount(){
        setTimeout(()=>{
            let tl = new TimelineMax({
    			repeat: 99
    		})
            let trout = document.getElementById('trout')
    		let permit = document.getElementById('permit')
    		let tarpon = document.getElementById('tarpon')
    		let pike = document.getElementById('pike')
    		let seabass = document.getElementById('seabass')
    		let troutPath = trout.getAttribute('d')

        	tl.to(trout, 0.5, {morphSVG: permit}, "+=0.2")
        	tl.to(trout, 0.5, {morphSVG: pike}, "+=0.2")
        	tl.to(trout, 0.5, {morphSVG: seabass}, "+=0.2")
        	tl.to(trout, 0.5, {morphSVG: tarpon}, "+=0.2")
        	tl.to(trout, 0.5, {morphSVG: troutPath}, "+=0.2")

            $('#loaderWrapper').addClass('loaderWrapper')

        	tl.play();
        }, 50)
    }
    render(){
        return(
            <div id="loaderWrapper">
                <InlineSVG ref="loader" src="/app/themes/0031flyfishing/images/loader.svg" />
                <span className="loadingText">Loading...</span>
            </div>
        )
    }
}
