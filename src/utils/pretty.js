export default function pretty(promise){
    return promise.then(res=>{
        return [undefined,res]
    })
    .catch(err=>{
        return [err,undefined]
    })
}