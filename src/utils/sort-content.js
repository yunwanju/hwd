/* 搜索后 查看当前库 切换排序顺序 优先切换到相关度 */
export function sort(val){
    switch(val){
        case 'chl':
        return 5;
        case 'lar':
        return 5;
        default :
        return 0;
    }
}
