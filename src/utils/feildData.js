/*
*这是注册列表，简介的配置都在这里
*key string 显示要显示字符对应的key值
*chn 对应的中文标题
*type 渲染类型
*string 以字符串显示
*array 数组类型默认显示
*array_case_special 案由渲染
*array_case_special_zhu 案由渲染(含注字段)
*link_array 带链接的数组渲染
*link_array 带链接的数组渲染（含注字段）v
*link_array 发布部门有时会带机构沿革
*html_string 渲染html字符串，有时返回字符串会带标签
*link_array_article 文章链接，不走检索，直接链接到文章
*other pfnl 基础字段多出来的一块里面的数据
*string_time 时间展示类型yyyy.mm.dd
*link_array_accusation 指控罪名是案由的最后一个案由合成的
*judge_search_lawfirm 检索作者走下拉
*judge_search_qikan 检索作者走下拉
*judge_search 检索当前字符，不走左侧聚类，走下拉
*link_array_article_upcase 文章链接与link_array_article区别是首字母是大写由link_array_article_upcase渲染
*string_anchor 搜索字符串走下拉检索
*link_array_no_link当检索不在左侧聚类，和下拉范围情况下调用将链接渲染成string类型
*accord_link  apy模块下的处罚依据
*array_link_name 数组对象模式，name字段全部展示，例如行政处罚下的主题分类
type还可以添加更多自定义类型，注意添加自定义类型后要写相应的渲染模板。
渲染顺序是按照自上而下的顺序，如果显示顺序不对就在这里调整数据在数组中的顺序。
*/

export let chl = [//中央法规
    { key: 'IssueDepartment', chn: '发布部门', type: 'link_array', show: true },
    { key: 'DocumentNO', chn: '发文字号', type: 'string', show: true },
    { key: 'IssueDate', chn: '发布日期', type: 'string', show: true },
    { key: 'ImplementDate', chn: '实施日期', type: 'string', show: true },
    { key: 'TimelinessDic', chn: '时效性', type: 'link_array', show: true },
    { key: 'EffectivenessDic', chn: '效力级别', type: 'link_array', show: true },
    { key: 'RatifyDepartment', chn: '批准部门', type: 'link_array' },
    { key: 'RatifyDate', chn: '批准日期', type: 'string' },
    { key: 'Category', chn: '法规类别', type: 'link_array_article' },
    { key: 'RevisedBasis', chn: '修改依据', type: 'html_string' },
    { key: 'FaBaoTips', chn: '法宝提示', type: 'html_string' },
    { key: 'FailureBasis', chn: '失效依据', type: 'html_string' },
    { key: 'PartialFailureBasis', chn: '部分失效依据', type: 'html_string' }
];

export let lar = [//地方法规
    { key: 'IssueDepartment', chn: '发布部门', type: 'link_arra', show: true },
    { key: 'DocumentNO', chn: '发文字号', type: 'string', show: true },
    { key: 'IssueDate', chn: '发布日期', type: 'string', show: true },
    { key: 'ImplementDate', chn: '实施日期', type: 'string', show: true },
    { key: 'TimelinessDic', chn: '时效性', type: 'link_array', show: true },
    { key: 'EffectivenessDic', chn: '效力级别', type: 'link_array', show: true },
    { key: 'RatifyDepartment', chn: '批准部门', type: 'link_array' },
    { key: 'RatifyDate', chn: '批准日期', type: 'string' },
    { key: 'FailureBasis', chn: '失效依据', type: 'html_string' },
    { key: 'PartialFailureBasis', chn: '部分失效依据', type: 'html_string' },
    { key: 'RevisedBasis', chn: '修改依据', type: 'html_string' },
    { key: 'Category', chn: '法规类别', type: 'link_array_article' },
    { key: 'FaBaoTips', chn: '法宝提示', type: 'string' }
];

export let legislation = [//立法计划
    { key: 'IssueDepartment', chn: '发布部门', type: 'link_array', show: true },
    { key: 'DocumentNO', chn: '发文字号', type: 'string', show: true },
    { key: 'IssueDate', chn: '发布日期', type: 'string', show: true },
    { key: 'ImplementDate', chn: '实施日期', type: 'string', show: true },
    // {key:'EffectivenessDic',chn:'效力级别',type:'array'},
    { key: 'TimelinessDic', chn: '时效性', type: 'link_array', show: true },
    { key: 'Category', chn: '法规类别', type: 'link_array_article', show: true }
];

export let eagn = [//中外条约
    { key: 'IssueDepartment', chn: '国家与国际组织', type: 'link_array', show: true },
    { key: 'Category', chn: '条约分类', type: 'link_array_article', show: true },
    { key: 'IssueDate', chn: '签订日期', type: 'string', show: true },
    { key: 'ImplementDate', chn: '生效日期', type: 'string', show: true },
    { key: 'Kind', chn: '条约种类', type: 'link_array', show: true },
    { key: 'RatifyDepartment', chn: '批准机关', type: 'link_array' },
    { key: 'TimelinessDic', chn: '时效性', type: 'link_array_no_link' },
    { key: 'SaveDepartment', chn: '保存机关', type: 'string' },
    { key: 'InvalidDate', chn: '失效日期', type: 'string' },
    { key: 'ReviseDate', chn: '修订日期', type: 'string' },
    { key: 'ConcludeAddress', chn: '签订地点', type: 'string' },
    { key: 'SubmitDepartment', chn: '呈批部门', type: 'string' }
];


export let iel = [//外国法规
    { key: 'IssueDepartment', chn: '相关组织', type: 'link_array', show: true },
    { key: 'IssueDate', chn: '颁布日期', type: 'string', show: true },
    { key: 'ImplementDate', chn: '生效日期', type: 'string', show: true },
    { key: 'Category', chn: '类别', type: 'link_array_article', show: true }
];

export let hkd = [//香港法规
    { key: 'Category', chn: '法规类别', type: 'link_array_article', show: true },
    { key: 'TimelinessDic', chn: '时效性', type: 'link_array', show: true }
];

export let aom = [//澳门法规
    { key: 'LawCategory', chn: '类别', type: 'link_array', show: true },
    { key: 'IssueDate', chn: '刊登日期', type: 'string', show: true },
    { key: 'Category', chn: '法规类别', type: 'link_array_article' },
    { key: 'Relevance', chn: '相关信息', type: 'html_string' }
];

export let twd = [//台湾法规
    { key: 'Category', chn: '法律类别', type: 'link_array_article', show: true },
    { key: 'ReleaseDate', chn: '发布日期', type: 'string', show: true },
    { key: 'ValidState', chn: '有效状态', type: 'link_array', show: true },
    { key: 'RegulationOrder', chn: '法规位阶', type: 'link_array', show: true },
    { key: 'DocumentNO', chn: '发文字号', type: 'string', show: true },
    { key: 'Department', chn: '发文单位', type: 'array', show: true },
    { key: 'ReviseDate', chn: '修正日期', type: 'string' },
];

export let pfnl = [//案例与裁判文书
    { key: 'Category', chn: '案由', type: 'array_case_special_zhu', show: true },
    { key: 'CaseFlag', chn: '案件字号', type: 'string', show: true },
    { key: 'LastInstanceDate', chn: '审结日期', type: 'string', show: true },
    { key: 'LastInstanceCourt', chn: '审理法院', type: 'link_array', show: true },
    { key: 'TrialStep', chn: '审理程序', type: 'link_array', show: true },
    { key: 'Judge', chn: '审理法官', type: 'array' },
    { key: 'DocumentAttr', chn: '文书类型', type: 'object' },
    { key: 'AgentDic', chn: '代理律师/律所', type: 'array' },
    { key: 'GuidingCaseDoc', chn: '案例发文', type: 'link_array_article' },
    // {key:'RegulationOrder',chn:'法规位阶:',type:'string'},
    { key: 'GuidingCaseNO', chn: '案例编号', type: 'string' },
    // {key:'CourtGrade',chn:'法院级别',type:'link_array'},
    { key: 'IssueDate', chn: '发布日期', type: 'string' },
    { key: 'CriminalPunish', chn: '权责关键词', type: 'link_array' },
    { key: 'SourceNote', chn: '来源', type: 'string' },
    { key: 'Criminal', chn: '刑罚', type: 'string' },
    // {key:'Category',chn:'指控罪名',type:'link_array_accusation'},
    { key: 'Accusation', chn: '判定罪名', type: 'array_link_name' },
    { key: 'Core', chn: '关键字', type: 'other' },
    { key: 'DisputedIssues', chn: '核心问题', type: 'other' },
    { key: 'CaseGist', chn: '裁判要点', type: 'other' }
    // {key:'RightKeywrod',chn:'权责关键词',type:'array'}

];

export let payz = [//裁判规则
    { key: 'IssueDate', chn: '规则日期', type: 'string', show: true },
    { key: 'Category', chn: '案由', type: 'array_case_special_zhu' },
    // {key:'CaseFlag',chn:'案件字号',type:'string'},
    // {key:'Judge',chn:'审理法官',type:'array'},
    // {key:'DocumentAttr',chn:'文书类型:',type:'object'},
    // {key:'LastInstanceDate',chn:'审结日期:',type:'string'},
    // {key:'RegulationOrder',chn:'法规位阶:',type:'string'},
    // {key:'CourtGrade',chn:'审理法院',type:'link_array'},
    // {key:'TrialStep',chn:'审理程序:',type:'link_array'},
    // {key:'GuidingCaseDoc',chn:'案例发文',type:'link_array'},
    // {key:'GuidingCaseNO',chn:'案件编号',type:'string'},
];

export let gac = [//指导性案例实证应用
    { key: 'Category', chn: '案由', type: 'array_case_special_zhu', show: true },
    { key: 'CaseFlag', chn: '案件字号', type: 'string', show: true },
    { key: 'LastInstanceDate', chn: '审结日期', type: 'string', show: true },
    { key: 'TrialStep', chn: '审理程序', type: 'link_array', show: true },
    { key: 'LastInstanceCourt', chn: '审理法院', type: 'link_array', show: true },
    { key: 'Judge', chn: '审理法官', type: 'array' },
    { key: 'DocumentAttr', chn: '文书类型', type: 'object' },
    { key: 'AgentDic', chn: '代理律师/律所:', type: 'string' },
    { key: 'GuidingCaseDoc', chn: '案例发文', type: 'link_array_article' },
    { key: 'GuidingCaseNO', chn: '案件编号', type: 'string' },
    { key: 'RegulationOrder', chn: '法规位阶:', type: 'string' },
    { key: 'AppliedAgents', chn: '应用主体', type: 'link_array' },
    { key: 'IssueDate', chn: '发布日期', type: 'string' },
    // {key:'AppliedYear',chn:'应用年份',type:'string'},
    { key: 'ApplicationSituation', chn: '被应用情况', type: 'other' },
    { key: 'AppliedContent', chn: '应用内容', type: 'link_array' },
    { key: 'AppliedMode', chn: '应用方式', type: 'link_array' },
    { key: 'AppliedResult', chn: '应用结果', type: 'link_array' },
    { key: 'SourceNote', chn: '来源', type: 'string' },
    { key: 'CriminalPunish', chn: '权责关键词', type: 'link_array' },
    { key: 'Criminal', chn: '刑罚', type: 'string' },
    { key: 'Accusation', chn: '判定罪名', type: 'array_link_name' }
];

export let bankruptcy = [//破产信息
    { key: 'CaseFlag', chn: '文号', type: 'string', show: true },
    { key: 'JudgeDic', chn: '审理法官', type: 'array', show: true },
    { key: 'DocumentAttr', chn: '文书类型', type: 'link_array', show: true },
    { key: 'LastInstanceDate', chn: '审结日期', type: 'string', show: true },
    { key: 'InstrumentType', chn: '文书样式', type: 'link_array', show: true },
    { key: 'Court', chn: '受理法院', type: 'string', show: true },
    { key: 'IssueDate', chn: '发布日期', type: 'string', show: true },
    { key: 'Category', chn: '案由', type: 'array_case_special_zhu' },
    { key: 'CourtGrade', chn: '法院级别', type: 'link_array' },
    { key: 'IndustryClassify', chn: '行业分类', type: 'link_array' },
    { key: 'CorporateProperty', chn: '企业性质', type: 'link_array' },
    { key: 'GuidingCaseNO', chn: '案件编号', type: 'string' },
    { key: 'CompanyName', chn: '企业名称', type: 'string' }
];

export let pal = [//案例报道
    { key: 'Category', chn: '案由', type: 'array_case_special_zhu', show: true },
    { key: 'Court', chn: '审理法院', type: 'link_array', show: true },
    { key: 'IssueDate', chn: '发布日期', type: 'string', show: true },
    { key: 'ColumnName', chn: '案例特征', type: 'link_array', show: true }
];

export let atr = [//仲裁案例
    // {key:'RatifyDepartment',chn:'裁决机构',type:'string'},
    { key: 'Category', chn: '仲裁分类', type: 'link_name', show: true },
    { key: 'IssueDepartment', chn: '裁决机构', type: 'link_array', show: true },
    { key: 'IssueDate', chn: '裁决日期', type: 'string', show: true }
];

export let qikan = [//法学期刊
    { key: 'JournalId', chn: '期刊名称', type: 'link_array', show: true },
    { key: 'JournalYear', chn: '期刊年份', type: 'string', show: true },
    // {key:'InfoSubTitle',chn:'副标题',type:'string'},
    { key: 'AuthorUnit', chn: '作者单位', type: 'string', show: true },
    { key: 'InfoAuthor', chn: '作者', type: 'string', show: true },
    { key: 'InfoKind', chn: '分类', type: 'link_array', show: true },
    { key: 'InfoKeyword', chn: '中文关键词', type: 'string', show: true },
    { key: 'InfoSummary', chn: '摘要', type: 'html_string' },
    { key: 'InfoIdCode', chn: '文献标识码', type: 'string' },
    { key: 'InfoCoding', chn: '文章编码', type: 'string' },
    { key: 'JournalIssue', chn: '期号', type: 'string' },
    { key: 'InfoPage', chn: '页码', type: 'string' }
];

export let lawfirmarticles = [//专题参考
    // {key:'ArticleCtitle',chn:'中文标题',type:'string'},
    { key: 'ArticleField', chn: '主题分类', type: 'link_array', show: true },
    { key: 'FirmId', chn: '合作机构', type: 'link_array', show: true },
    { key: 'ArticleAuthor', chn: '作者', type: 'string', show: true },
    { key: 'ArticleSubmitTime', chn: '发布年份', type: 'string', show: true },
    { key: 'JournalName', chn: '合作刊物', type: 'link_array' },
    { key: 'JournalYear', chn: '刊物年份', type: 'string' },
    { key: 'ArticleCsummary', chn: '中文摘要', type: 'string' },
    { key: 'JournalIssue', chn: '期号', type: 'string' }
];

export let specialtopic = [
    { key: 'Author', chn: '作者', type: 'string', show: true },
    { key: 'Subject', chn: '专题分类', type: 'link_array', show: true },
    { key: 'Category', chn: '学科分类', type: 'link_array_article', show: true },
    { key: 'Source', chn: '来源', type: 'string', show: true },
    { key: 'Cause', chn: '案由', type: 'array_case_special_zhu' },
    { key: 'PublishDate', chn: '写作年份', type: 'string' },
];

export let protocol = [//立法资料
    { key: 'Category', chn: '类别', type: 'link_array_article', show: true },
    { key: 'IssueDepartment', chn: '发布部门', type: 'link_array', show: true },
    { key: 'EffectivenessDic', chn: '效力级别', type: 'link_array', show: true },
    { key: 'IssueDate', chn: '发布日期', type: 'string', },
    { key: 'ExpirationDate', chn: '截止日期', type: 'string', }
];

export let lawexplanation = [
    { key: 'IssueDepartment', chn: '发布部门', type: 'link_array' },
    { key: 'EffectivenessDic', chn: '效力级别', type: 'link_array' },
    { key: 'Category', chn: '类别', type: 'link_array' },
    { key: 'IssueDate', chn: '发布日期', type: 'string' }
    // {key:'ExpirationDate',chn:'截止日期',type:'string'}
];

export let whitebook = [
    { key: 'Category', chn: '类别', type: 'link_array' },
    { key: 'IssueDepartment', chn: '发布部门', type: 'link_array' },
    { key: 'IssueDate', chn: '发布日期', type: 'string' }
];

export let workreport = [
    { key: 'Category', chn: '类别', type: 'link_array' },
    { key: 'IssueDepartment', chn: '发布部门', type: 'link_array' },
    { key: 'IssueDate', chn: '发布日期', type: 'string' }
];

export let ear = [
    { key: 'TopicType', chn: '主题分类', type: 'string' },
    { key: 'PublishYear', chn: '发布年份', type: 'string' },
    { key: 'Category', chn: '类别', type: 'link_array' },
    { key: 'IssueDate', chn: '发布日期', type: 'string' }

];

export let gdd = [
    { key: 'IssueDate', chn: '发布日期', type: 'string' }
];

export let news = [//法律动态
    { key: 'NCID', chn: '新闻分类', type: 'link_array', show: true },
    { key: 'SubmitDate', chn: '发布日期', type: 'string', show: true },
    { key: 'Source', chn: '新闻来源', type: 'array', show: true },
    { key: 'Keyword', chn: '关键词', type: 'array', show: true },
    { key: 'SubjectWord', chn: '主题分类', type: 'link_array', show: true }
    // {key:'NCID',chn:'主题分类',type:'link_array'}
];

export let contract = [//合同范本
    { key: 'Category', chn: '合同分类', type: 'link_array_article', show: true },
    { key: 'IssueDate', chn: '发布日期', type: 'string', show: true },
    { key: 'IssueDepartment', chn: '官方合同', type: 'link_array', show: true },
    { key: 'TimelinessDic', chn: '时效性', type: 'link_array', show: true },
    { key: 'TradeCategory', chn: '行业类别', type: 'link_array', show: true },
    { key: 'Name', chn: '发文名称', type: 'link_array_article', show: true },
    { key: 'NO', chn: '合同编号', type: 'string' },
    { key: 'ItemNum', chn: '合同条数', type: 'string' },
    { key: 'FullTextNum', chn: '字数', type: 'string' },
];

export let fmt = [//法律文书
    { key: 'Category', chn: '文书分类', type: 'link_array_article', show: true },
    { key: 'IssueDepartment', chn: '发布部门', type: 'link_array', show: true },
    { key: 'TimelinessDic', chn: '时效性', type: 'link_array', show: true },
    { key: 'IssueDate', chn: '发布日期', type: 'string', show: true },
    { key: 'Name', chn: '发文名称', type: 'link_array_article', show: true },
    { key: 'NO', chn: '文书编号', type: 'string' },
];


export let procuratoratedoc = [//法律文书
    { key: 'Category', chn: '案由', type: 'array_case_special_zhu', show: true },
    { key: 'CaseFlag', chn: '文书编号', type: 'string', show: true },
    { key: 'DocumentAttr', chn: '文书类型', type: 'link_array', show: true },
    { key: 'LastInstanceDate', chn: '日期', type: 'string', show: true },
    { key: 'LastInstanceCourt', chn: '检察院', type: 'link_array', show: true },
    { key: 'SutraCase', chn: '检察业务', type: 'link_array', show: true }
];

const crucialcaseinfo = [//案件信息
    { key: 'Category', chn: '案由', type: 'array_case_special_zhu', show: true },
    { key: 'CourtGrade', chn: '检察院级别', type: 'link_array', show: true },
    { key: 'IssueDate', chn: '发布时间', type: 'string', show: true },
    { key: 'LastInstanceCourt', chn: '检察院', type: 'link_array', show: true }
]


export let apy = [//行政处罚
    { key: 'Category', chn: '主题分类', type: 'array_link_name', show: true },
    { key: 'PunishmentType', chn: '处罚种类', type: 'link_array', show: true },
    { key: 'PunishmentObject', chn: '处罚对象', type: 'link_array', show: true },
    { key: 'ImplementOffice', chn: '处罚机关', type: 'link_array', show: true },
    { key: 'PunishmentDate', chn: '处罚日期', type: 'string', show: true },
    { key: 'DocumentNO', chn: '发文案号', type: 'string', show: true },
    { key: 'EnforcementLevel', chn: '执法级别', type: 'link_array' },
    { key: 'LawRegional', chn: '执法地域', type: 'link_array' },
    { key: 'AccordingLaw', chn: '处罚依据', type: 'accord_link' }
];

export let en_news = [//Legal News
    { key: 'SubjectEn', chn: 'Subject', type: 'link_array', show: true },
    { key: 'KeywordsEn', chn: 'Keywords', type: 'string', show: true },
    { key: 'CategoryEn', chn: 'Category', type: 'link_array', show: true },
    { key: 'IssueDate', chn: 'Release Date', type: 'string', show: true },
    { key: 'SourceEn', chn: 'Source', type: 'string', show: true }
];

export let en_law = [//Laws & Regulations
    { key: 'DepartmentEn', chn: 'Issuing <br/>Authority', type: 'link_array', show: true },
    { key: 'EffectiveDate', chn: 'Effective Date', type: 'string', show: true },
    { key: 'TimelinessDicEn', chn: 'Status', type: 'link_array', show: true },
    { key: 'DocumentNOEn', chn: 'Document Number', type: 'string', show: true },
    { key: 'EffectivenessDicEn', chn: 'Level of<br/>Authority', type: 'link_array', show: true },
    { key: 'SubjectEn', chn: 'Area of Law', type: 'link_array', show: true },
    { key: 'IssueDate', chn: 'Date Issued', type: 'string', show: true },
];

export let en_case = [//Judicial Cases
    { key: 'AnYouEn', chn: 'Type of <br/>Dispute', type: 'link_array', show: true },
    { key: 'CourtEn', chn: 'Court', type: 'link_array', show: true },
    { key: 'ProcedureEn', chn: 'Procedural <br/>Status', type: 'link_array', show: true },
    { key: 'SourceNoteEn', chn: 'Source Note', type: 'string', show: true },
    { key: 'IssueDate', chn: 'Date Issued', type: 'string', show: true },
    { key: 'Sjrq', chn: 'Judgment Date', type: 'string', show: true },
    { key: 'DocPropertyEn', chn: 'Instrument <br/>Type', type: 'link_array', show: true },
];

export let en_journal = [//Law Journals
    { key: 'AuthorUnitCh', chn: 'Journal Name', type: 'link_array', show: true },
    { key: 'AuthorUnitEn', chn: 'Institution', type: 'string', show: true },
    { key: 'Issue', chn: 'Issue', type: 'string', show: true },
    { key: 'AuthorEn', chn: 'Author', type: 'string', show: true },
    { key: 'PageNum', chn: 'Page', type: 'string', show: true },
];

export let en_treaties = [//International Treaties
    { key: 'ClassificationEn', chn: 'Area', type: 'link_array', show: true },
    { key: 'CategoryEn', chn: 'Category', type: 'link_array', show: true },
    { key: 'SignCountryEn', chn: 'Signatory', type: 'link_array', show: true },
    { key: 'TimelinessDicEn', chn: 'Status', type: 'link_array', show: true },
    { key: 'Submitdate', chn: 'Signing Date', type: 'string', show: true },
];

export let en_whitepapers = [//White Papers
    { key: 'DepartmentEn', chn: 'Issuing<br/>Authority', type: 'link_array', show: true },
    { key: 'SubjectEn', chn: 'Category', type: 'link_array', show: true },
    { key: 'IssueDate', chn: 'Date Issued', type: 'string', show: true },
];


export default {
    chl, lar, legislation, eagn, iel, hkd, aom, twd, pfnl, payz, gac, bankruptcy, pal, atr, qikan, lawfirmarticles,
    specialtopic, protocol, lawexplanation, whitebook, workreport, ear, gdd, news, contract, fmt, procuratoratedoc, apy,
    en_news, en_law, en_case, en_journal, en_treaties, en_whitepapers, crucialcaseinfo
};
