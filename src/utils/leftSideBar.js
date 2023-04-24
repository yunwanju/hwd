/*
*这是注册列表，简介的配置都在这里
*key string 显示要显示字符对应的key值
*chn 对应的中文标题
*type 渲染类型
*string 以字符串显示
*array 数组类型默认显示
*link_array 带链接的数组渲染
type还可以添加更多自定义类型，注意添加自定义类型后要写相应的渲染模板。
渲染顺序是按照自上而下的顺序，如果显示顺序不对就在这里调整数据在数组中的顺序。
*/

export let regulation=[//规章制度
    {key:'status',chn:'状态：',type:'link_array'},
    {key:'level',chn:'制度级别：',type:'link_array'},
    {key:'publishDate',chn:'发布年份：',type:'string'},
    {key:'category',chn:'制度类别：',type:'link_array'},
    {key:'domain',chn:'专业',type:'link_array'},
]
export let hndwcontract=[//合同范本
    {key:'source',chn:'范本来源：',type:'link_array'},
    {key:'category',chn:'合同范本类型：',type:'link_array'},
    {key:'publishDate',chn:'发布年份：',type:'string'},
]

export let hndwlegalopinionmodel=[//合同范本
    {key:'modelType',chn:'法律意见书模板类型：',type:'link_array'},
    {key:'publishDate',chn:'发布年份：',type:'string'},
]
export default {
    regulation,hndwcontract,hndwlegalopinionmodel
}
