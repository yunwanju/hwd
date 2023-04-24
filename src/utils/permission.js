export function permissionPath(lib) {
  if (new RegExp('(regulation)', 'g').test(lib)) { //规章制度
    return 'regulation'
  } else if (new RegExp('(hndwcontract)', 'g').test(lib)) {
    return 'hndwcontract'
  }
}
/* 404跳转 */
export function path_404(lib) {
  if (new RegExp('(regulation|hndwcontract|404)').test(lib)) {
    return true;
  } else {
    return false;
  }
}
