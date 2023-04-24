/* 列表给字段拼接添加一些字 */
export function filters_list(value, key, adrss) {
  var keys = "";
  /* 法律法规 */
  if (adrss == 'law') {
    keys = key == 'IssueDate' ? ' 发布' : key == 'ReleaseDate' ? ' 公布' : key == 'ImplementDate' ? ' 实施' : key ==
      'ExpirationDate' ? ' 截止' : keys;
  }
  /* 法学期刊 */
  if (adrss == 'qikan') {
    keys = key == "JournalYear" ? value + '年' : key == 'JournalIssue' ? '第' + value + '期' : key == 'InfoPage' ? '第' + value + '页' : key == 'JournalId' ? '《' + value + '》' : value + keys;
    return keys
  }
  return value + keys;
}
