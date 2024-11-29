import req from '@/utils/request'
import pretty from "@/utils/pretty";


//当天的天气情况
export const tianqiApi = ()=>{
    return pretty(req({
        url:"https://api.seniverse.com/v3/weather/now.json?key=SSH6LziLQytH8gpyW&location=beijing&language=zh-Hans&unit=c",
        method:'get'
    }))
}
// 未来三天的天气情况
export const tianqiApi3 = ()=>{
    return pretty(req({
        url:"https://api.seniverse.com/v3/weather/daily.json?key=SSH6LziLQytH8gpyW&location=beijing&language=zh-Hans&unit=c&start=0&days=5",
        method:'get'
    }))
}