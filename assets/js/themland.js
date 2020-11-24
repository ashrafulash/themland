/*
    -------------------------------------
    Developer : ASHRAF
    Version : 1.0.0 (development)
    -------------------------------------
*/ 
let 
    prefix = name => `themland-${name[0]}`,
    errStyle = 'color:red; background: #fff; padding:3px 10px'

/*
    -----------------------------
    themland-template
    24 Nov 2020
    -----------------------------
*/ 

class Template extends HTMLElement{
    constructor(){
        super();
        this.src =  this.getAttribute('src') ? this.getAttribute('src') : console.log('%c You must use src attribute to load template', errStyle);
        this.scriptFor = this.getAttribute('scriptfor');
    }
    connectedCallback(){

        let promise =  new Promise( (resolve, reject) =>{
            var xhr = new XMLHttpRequest();
            xhr.open( 'GET', this.src , true);
            xhr.onload  = () => resolve(xhr.response);
            xhr.send();
        } ) 
        fn(promise, this) 
        async function fn(pro , _this){
            let data =  await pro;
            if( data.indexOf('<title>404 Not Found</title>') !== -1 ){
                console.log(`%c The "${_this.src}" not found`, errStyle)
            }
            else{
                if( _this.scriptFor === 'footer' ){
                    JSON.parse(data).map( item =>{
                        let srcEl = document.createElement('script');
                            Object.keys(item).map(attr=>{
                                srcEl.setAttribute(attr , item[attr])
                            })   
                        document.querySelector('body').appendChild(srcEl)
                    } )
                    
                }
                else if(_this.scriptFor === 'head'){
                    JSON.parse(data).map( item =>{
                        let srcEl = document.createElement('link');
                            Object.keys(item).map(attr=>{
                                srcEl.setAttribute(attr , item[attr])
                            })   
                            document.querySelector('head').appendChild(srcEl)
                    } )
                    
                }
                else{
                    _this.innerHTML  = data;
                }
            }
        }
    }
    error(url){
        console.log(url)
    }   
}
customElements.define(prefix`template`, Template)