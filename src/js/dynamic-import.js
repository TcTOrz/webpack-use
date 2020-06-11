import printMe from './print.js';

// function getComponent() {
//     return import(/* webpackChunkName: "loadsh" */ 'loadsh').then(({default: _})=>{
//         const element = document.createElement('div')
//         element.innerHTML = _.join(['hello', 'webpack'], ' ')
//         return element
//     }).catch(err=>"An error occurred while loading the component")
// }
// const element = document.createElement('div')
async function getComponent() {
    const element = document.createElement('div')
    const { default: _ } = await import(/* webpackChunkName: "loadsh" */ 'loadsh')
    element.innerHTML = _.join(['hello', 'webpack!11'], ' ')
    return element
}

getComponent().then(component=>{
    document.body.appendChild(component)
})

// let element = getComponent(); // 存储 element，以在 print.js 修改时重新渲染
// document.body.appendChild(element);

if(module.hot) {
    module.hot.accept('./print.js', function(){
        console.log('hot')
        // const element = document.createElement('div')
        // element.innerHTML = _.join(['hello', 'hot!'], ' ')
        // document.body.appendChild(element)
        // document.body.removeChild(element);
        getComponent().then(component=>{
            // document.body.removeChild(component);
            document.body.appendChild(component)
        })
        
        printMe()
    })
}