const state = {
  list_data: {
    law: { //法律法规
      '本库说明': '23.html',
      chl: { //中央法规
        '标题': 'Title',
        '是否有效': 'TimelinessDic',
        '唯一标识': 'Gid',
        '切换图标': true,
        'leftChart': {
          'EffectivenessDic': 'bar',
          'IssueDepartment': 'bar',
          'TimelinessDic': 'pie',
          'IssueDate': 'line'
        },
        'listItem': [ //中间行
          {
            'key': 'TimelinessDic',
          }, //时效性标签
          {
            'key': 'DocumentNO'
          }, //发文字号,
          {
            'key': 'IssueDate',
            'behindValue': '发布'
          }, //发布日期
          {
            'key': 'ImplementDate',
            'behindValue': '实施'
          }, //实施日期
        ],
        '类型': 'chl',
        /* '法宝词云': {
          '法宝词云': 'Keywords'
        }, */
        '搜索': {
          '默 认': 'Default',
          '标 题': 'Title',
          '全 文': 'FullText',
          '发文字号': 'DocumentNO'
        },
        '默认': '标题+发文字号',
        '默认提示': '默认在标题和发文字号中检索',
        '分组': 'EffectivenessDic',
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        'excelData': [{
            label: '序号',
            disabled: true,
            value: true
          },
          {
            label: '标题',
            disabled: true,
            value: true
          },
          {
            label: '时效性',
            disabled: false,
            value: true
          },
          {
            label: '效力级别',
            disabled: false,
            value: true
          },
          {
            label: '发布部门',
            disabled: false,
            value: true
          },
          {
            label: '发文字号',
            disabled: false,
            value: true
          },
          {
            label: '发布日期',
            disabled: false,
            value: true
          },
          {
            label: '实施日期',
            disabled: false,
            value: true
          },
          {
            label: '原文链接',
            disabled: false,
            value: true
          }
        ],
        '排序': {
          0: {
            name: '↓ 发布日期',
            show: true
          },
          1: {
            name: '↑ 发布日期',
            show: true
          },
          2: {
            name: '↑ 实施日期',
            show: true
          },
          3: {
            name: '↓ 实施日期',
            show: true
          },
          4: {
            name: '↓ 引用量',
            show: true
          },
          5: {
            name: '↓ 相关度',
            show: false
          }
        },

        'searchRules': {
          '默 认': {
            focus: 10,
            inputConf: [1, 5, 8, 8] //同义（1条）、热搜（5条）、直达法规（8条）、直达法条（8条）
          },
          '标 题': {
            focus: 10,
            inputConf: [1, 5, 8, 8]
          },
          '全 文': {
            focus: 10,
            inputConf: [1, 8, 0, 0]
          },
          '发文字号': {
            focus: 10,
            inputConf: [1, 8, 0, 0]
          }
        }
      },
      lar: { //地方法规
        '标题': 'Title',
        '是否有效': 'TimelinessDic',
        '唯一标识': 'Gid',
        '切换图标': true,
        'listItem': [{
            'key': 'TimelinessDic'
          }, //时效性标签
          {
            'key': 'DocumentNO'
          }, //发文字号
          {
            'key': 'IssueDate',
            'behindValue': '发布'
          }, //发布日期
          {
            'key': 'ImplementDate',
            'behindValue': '实施'
          }, //实施日期
        ],
        'leftChart': {
          'EffectivenessDic': 'bar',
          'IssueDepartment': 'bar',
          'TimelinessDic': 'pie',
          'IssueDate': 'line'
        },
        '类型': 'lar',
        // '法宝词云': {
        //   '法宝词云': 'Keywords'
        // },
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        '分组': 'EffectivenessDic',
        'excelData': [{
            label: '序号',
            disabled: true,
            value: true
          },
          {
            label: '标题',
            disabled: true,
            value: true
          },
          {
            label: '时效性',
            disabled: false,
            value: true
          },
          {
            label: '效力级别',
            disabled: false,
            value: true
          },
          {
            label: '发布部门',
            disabled: false,
            value: true
          },
          {
            label: '发文字号',
            disabled: false,
            value: true
          },
          {
            label: '发布日期',
            disabled: false,
            value: true
          },
          {
            label: '实施日期',
            disabled: false,
            value: true
          },
          {
            label: '原文链接',
            disabled: false,
            value: true
          }
        ],
        '搜索': {
          '默 认': 'Default',
          '标 题': 'Title',
          '全 文': 'FullText',
          '发文字号': 'DocumentNO'
        },
        '默认': '标题+发文字号',
        '默认提示': '默认在标题和发文字号中检索',
        '排序': {
          0: {
            name: '↓ 发布日期',
            show: true
          },
          1: {
            name: '↑ 发布日期',
            show: true
          },
          2: {
            name: '↑ 实施日期',
            show: true
          },
          3: {
            name: '↓ 实施日期',
            show: true
          },
          4: {
            name: '↓ 引用量',
            show: true
          },
          5: {
            name: '↓ 相关度',
            show: false
          }
        },
        'searchRules': {
          '默 认': {
            focus: 10,
            inputConf: [1, 5, 8, 8] //同义（1条）、热搜（5条）、直达法规（8条）、直达法条（8条）
          },
          '标 题': {
            focus: 10,
            inputConf: [1, 5, 8, 8]
          },
          '全 文': {
            focus: 10,
            inputConf: [1, 8, 0, 0]
          },
          '发文字号': {
            focus: 10,
            inputConf: [1, 8, 0, 0]
          }
        }
      },
      protocol: { //草案
        '标题': 'Title',
        '唯一标识': 'Gid',
        '类型': 'protocol',
        '切换图标': true,
        'leftChart': {
          'RangeOf': 'pie',
          'EffectivenessDic': 'bar',
          'IssueDepartment': 'bar',
          'Category': 'pie',
          'SolicitationState': 'pie'
        },
        'listItem': [{
            'key': 'IssueDate',
            'behindValue': '发布'
          }, //发布日期
          {
            'key': 'ExpirationDate',
            'behindValue': '截止'
          }, //截止日期
        ],
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        '搜索': {
          '标 题': 'Title',
          '全 文': 'FullText',
        },
        '过滤器': {
          '草案': 'protocol',
          '法规解读': 'lawexplanation',
          '白皮书': 'whitebook',
          '工作报告': 'workreport',
        },
        'excelData': [{
            label: '序号',
            disabled: true,
            value: true
          },
          {
            label: '标题',
            disabled: true,
            value: true
          },
          {
            label: '发布日期',
            disabled: false,
            value: true
          },
          {
            label: '截止日期',
            disabled: false,
            value: true
          },
          {
            label: '原文链接',
            disabled: false,
            value: true
          }
        ],
        '排序': {
          0: {
            name: '↓ 发布日期',
            show: true
          },
          1: {
            name: '↑ 发布日期',
            show: true
          },
          5: {
            name: '↓ 相关度',
            show: false
          }
        },
        'searchRules': {
          '标 题': {
            focus: 10,
            inputConf: [1, 5, 0, 0]
          },
          '全 文': {
            focus: 10,
            inputConf: [1, 8, 0, 0]
          }
        }
      },
      lawexplanation: { //法则解读
        '标题': 'Title',
        '唯一标识': 'Gid',
        '类型': 'protocol',
        '切换图标': true,
        'leftChart': {
          'RangeOf': 'pie',
          'EffectivenessDic': 'bar',
          'IssueDepartment': 'bar',
          'Category': 'pie',
          'IssueDate': 'line'
        },
        'listItem': [{
            'key': 'IssueDate',
            'behindValue': '发布'
          } //发布日期
        ],
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        '搜索': {
          '标 题': 'Title',
          '全 文': 'FullText',
        },
        '过滤器': {
          '草案': 'protocol',
          '法规解读': 'lawexplanation',
          '白皮书': 'whitebook',
          '工作报告': 'workreport',
        },
        'excelData': [{
            label: '序号',
            disabled: true,
            value: true
          },
          {
            label: '标题',
            disabled: true,
            value: true
          },
          {
            label: '发布日期',
            disabled: false,
            value: true
          },
          {
            label: '原文链接',
            disabled: false,
            value: true
          }
        ],
        '排序': {
          0: {
            name: '↓ 发布日期',
            show: true
          },
          1: {
            name: '↑ 发布日期',
            show: true
          },
          5: {
            name: '↓ 相关度',
            show: false
          }
        },
        'searchRules': {
          '标 题': {
            focus: 10,
            inputConf: [1, 5, 0, 0]
          },
          '全 文': {
            focus: 10,
            inputConf: [1, 8, 0, 0]
          }
        }
      },
      whitebook: { //白皮书
        '标题': 'Title',
        '唯一标识': 'Gid',
        '类型': 'protocol',
        '切换图标': true,
        'leftChart': {
          'IssueDepartment': 'bar',
          'Category': 'pie',
          'IssueDate': 'line'
        },
        'listItem': [{
            'key': 'IssueDepartment'
          }, //发布部门
          {
            'key': 'IssueDate',
            'behindValue': '发布'
          }, //发布日期
        ],
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        '搜索': {
          '标 题': 'Title',
          '全 文': 'FullText',
        },
        '过滤器': {
          '草案': 'protocol',
          '法规解读': 'lawexplanation',
          '白皮书': 'whitebook',
          '工作报告': 'workreport',
        },
        'excelData': [{
            label: '序号',
            disabled: true,
            value: true
          },
          {
            label: '标题',
            disabled: true,
            value: true
          },
          {
            label: '发布日期',
            disabled: false,
            value: true
          },
          {
            label: '原文链接',
            disabled: false,
            value: true
          }
        ],
        '排序': {
          0: {
            name: '↓ 发布日期',
            show: true
          },
          1: {
            name: '↑ 发布日期',
            show: true
          },
          5: {
            name: '↓ 相关度',
            show: false
          }
        },
        'searchRules': {
          '标 题': {
            focus: 10,
            inputConf: [1, 5, 0, 0]
          },
          '全 文': {
            focus: 10,
            inputConf: [1, 8, 0, 0]
          }
        }
      },
      workreport: { //工作报告
        '标题': 'Title',
        '唯一标识': 'Gid',
        '类型': 'protocol',
        'listItem': [{
            'key': 'IssueDate',
            'behindValue': '发布'
          }, //发布日期
        ],
        '切换图标': true,
        'leftChart': {
          'IssueDepartment': 'bar',
          'Category': 'pie',
          'IssueDate': 'line'
        },
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        '搜索': {
          '标 题': 'Title',
          '全 文': 'FullText',
        },
        '过滤器': {
          '草案': 'protocol',
          '法规解读': 'lawexplanation',
          '白皮书': 'whitebook',
          '工作报告': 'workreport',
        },
        'excelData': [{
            label: '序号',
            disabled: true,
            value: true
          },
          {
            label: '标题',
            disabled: true,
            value: true
          },
          {
            label: '发布日期',
            disabled: false,
            value: true
          },
          {
            label: '原文链接',
            disabled: false,
            value: true
          }
        ],
        '排序': {
          0: {
            name: '↓ 发布日期',
            show: true
          },
          1: {
            name: '↑ 发布日期',
            show: true
          },
          5: {
            name: '↓ 相关度',
            show: false
          }
        },
        'searchRules': {
          '标 题': {
            focus: 10,
            inputConf: [1, 5, 0, 0]
          },
          '全 文': {
            focus: 10,
            inputConf: [1, 8, 0, 0]
          }
        }
      },
      legislation: { //立法计划
        '标题': 'Title',
        '是否有效': 'TimelinessDic',
        '类型': 'legislation',
        '唯一标识': 'Gid',
        'listItem': [{
            'key': 'TimelinessDic'
          }, //时效性
          {
            'key': 'DocumentNO'
          }, //发文字号
          {
            'key': 'IssueDepartment',
            'type': 'Array',
          }, //发布部门
          {
            'key': 'IssueDate',
            'behindValue': '发布'
          }, //发布日期
          {
            'key': 'ImplementDate',
            'behindValue': '实施'
          }, //实施日期
        ],
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        '搜索': {
          '标 题': 'Title',
          '全 文': 'FullText',
        },
        'excelData': [{
            label: '序号',
            disabled: true,
            value: true
          },
          {
            label: '标题',
            disabled: true,
            value: true
          },
          {
            label: '时效性',
            disabled: false,
            value: true
          },
          {
            label: '发文字号',
            disabled: false,
            value: true
          },
          {
            label: '发布日期',
            disabled: false,
            value: true
          },
          {
            label: '实施日期',
            disabled: false,
            value: true
          },
          {
            label: '原文链接',
            disabled: false,
            value: true
          }
        ],
        '排序': {
          0: {
            name: '↓ 发布日期',
            show: true
          },
          1: {
            name: '↑ 发布日期',
            show: true
          },
          5: {
            name: '↓ 相关度',
            show: false
          }
        },
        'searchRules': {
          '标 题': {
            focus: 10,
            inputConf: [1, 5, 0, 0]
          },
          '全 文': {
            focus: 10,
            inputConf: [1, 8, 0, 0]
          }
        }
      },
      eagn: { //中外条约
        '标题': 'Title',
        '是否有效': 'eagn',
        '类型': 'eagn',
        '唯一标识': 'Gid',
        'listItem': [{
            'key': 'TimelinessDic'
          }, //时效性
          {
            'key': 'IssueDepartment',
            'type': 'Array'
          }, //发布部门
          {
            'key': 'IssueDate',
            'behindValue': '发布'
          }, //发布日期
          {
            'key': 'ConcludeAddress'
          }, //签订地点
        ],
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        '搜索': {
          '标 题': 'Title',
          '全 文': 'FullText',
        },
        'excelData': [{
            label: '序号',
            disabled: true,
            value: true
          },
          {
            label: '标题',
            disabled: true,
            value: true
          },
          {
            label: '时效性',
            disabled: false,
            value: true
          },
          {
            label: '签订组织',
            disabled: false,
            value: true
          },
          {
            label: '签订日期',
            disabled: false,
            value: true
          },
          {
            label: '签订城市',
            disabled: false,
            value: true
          },
          {
            label: '原文链接',
            disabled: false,
            value: true
          }
        ],
        '排序': {
          0: {
            name: '↓ 签订日期',
            show: true
          },
          1: {
            name: '↑ 签订日期',
            show: true
          },
          5: {
            name: '↓ 相关度',
            show: false
          }
        },
        'searchRules': {
          '标 题': {
            focus: 10,
            inputConf: [1, 5, 0, 0]
          },
          '全 文': {
            focus: 10,
            inputConf: [1, 8, 0, 0]
          }
        }
      },
      iel: { //外国法规
        '标题': 'Title',
        '类型': 'iel',
        '是否有效': 'TimelinessDic',
        '唯一标识': 'Gid',
        'listItem': [{
            'key': 'IssueDate',
            'behindValue': '颁布'
          }, //颁布日期
          {
            'key': 'ImplementDate',
            'behindValue': '实施'
          }, //实施日期
        ],
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        '搜索': {
          '标 题': 'Title',
          '全 文': 'FullText',
        },
        'excelData': [{
            label: '序号',
            disabled: true,
            value: true
          },
          {
            label: '标题',
            disabled: true,
            value: true
          },
          {
            label: '颁布日期',
            disabled: false,
            value: true
          },
          {
            label: '实施日期',
            disabled: false,
            value: true
          },
          {
            label: '原文链接',
            disabled: false,
            value: true
          }
        ],
        '排序': {
          0: {
            name: '↓ 颁布日期',
            show: true
          },
          1: {
            name: '↑ 颁布日期',
            show: true
          },
          5: {
            name: '↓ 相关度',
            show: false
          }
        },
        'searchRules': {
          '标 题': {
            focus: 10,
            inputConf: [1, 5, 0, 0]
          },
          '全 文': {
            focus: 10,
            inputConf: [1, 8, 0, 0]
          }
        }
      },
      hkd: { //香港法规
        '标题': 'Title',
        '类型': 'hkd',
        '唯一标识': 'Gid',
        '搜索': {
          '标 题': 'Title',
          '全 文': 'FullText',
        },
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        'excelData': [{
            label: '序号',
            disabled: true,
            value: true
          },
          {
            label: '标题',
            disabled: true,
            value: true
          },
          {
            label: '原文链接',
            disabled: false,
            value: true
          }
        ],
        'searchRules': {
          '标 题': {
            focus: 10,
            inputConf: [1, 5, 0, 0]
          },
          '全 文': {
            focus: 10,
            inputConf: [1, 8, 0, 0]
          }
        }
      },
      aom: { //澳门法规
        '标题': 'Title',
        '类型': 'aom',
        '唯一标识': 'Gid',
        'listItem': [{
            'key': 'IssueDate',
            'behindValue': '刊登'
          }, //刊登日期
        ],
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        '搜索': {
          '标 题': 'Title',
          '全 文': 'FullText',
        },
        'excelData': [{
            label: '序号',
            disabled: true,
            value: true
          },
          {
            label: '标题',
            disabled: true,
            value: true
          },
          {
            label: '刊登日期',
            disabled: false,
            value: true
          },
          {
            label: '原文链接',
            disabled: false,
            value: true
          }
        ],
        '排序': {
          0: {
            name: '↓ 刊登日期',
            show: true
          },
          1: {
            name: '↑ 刊登日期',
            show: true
          },
          5: {
            name: '↓ 相关度',
            show: false
          }
        },
        'searchRules': {
          '标 题': {
            focus: 10,
            inputConf: [1, 5, 0, 0]
          },
          '全 文': {
            focus: 10,
            inputConf: [1, 8, 0, 0]
          }
        }
      },
      twd: { //台湾法规
        '标题': 'Title',
        '类型': 'twd',
        '唯一标识': 'Gid',
        'listItem': [{
            'key': 'DocumentNO'
          }, //发文字号
          {
            'key': 'ValidState',
            'type': 'Array'
          }, //有效状态
          {
            'key': 'ReleaseDate',
            'behindValue': '公布'
          }, //公布日期
          {
            'key': 'Department',
            'type': 'Array'
          }, //发文单位
        ],
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        'excelData': [{
            label: '序号',
            disabled: true,
            value: true
          },
          {
            label: '标题',
            disabled: true,
            value: true
          },
          {
            label: '发文字号',
            disabled: false,
            value: true
          },
          {
            label: '时效性',
            disabled: false,
            value: true
          },
          {
            label: '发布日期',
            disabled: false,
            value: true
          },
          {
            label: '发布部门',
            disabled: false,
            value: true
          },
          {
            label: '原文链接',
            disabled: false,
            value: true
          }
        ],
        '搜索': {
          '标 题': 'Title',
          '全 文': 'FullText',
        },
        '排序': {
          0: {
            name: '↓ 发布日期',
            show: true
          },
          1: {
            name: '↑ 发布日期',
            show: true
          },
          5: {
            name: '↓ 相关度',
            show: false
          }
        },
        'searchRules': {
          '标 题': {
            focus: 10,
            inputConf: [1, 5, 0, 0]
          },
          '全 文': {
            focus: 10,
            inputConf: [1, 8, 0, 0]
          }
        }
      },
      news: { //法律动态
        '标题': 'Title',
        '类型': 'news',
        '唯一标识': 'Gid',
        'listItem': [{
            'key': 'SubmitDate',
            'behindValue': '公布'
          }, //发布单位
        ],
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        '搜索': {
          '标 题': 'Title',
          '全 文': 'FullText',
        },
        'excelData': [{
            label: '序号',
            disabled: true,
            value: true
          },
          {
            label: '标题',
            disabled: true,
            value: true
          },
          {
            label: '发布日期',
            disabled: false,
            value: true
          },
          {
            label: '原文链接',
            disabled: false,
            value: true
          }
        ],
        '排序': {
          0: {
            name: '↓ 发布日期',
            show: true
          },
          1: {
            name: '↑ 发布日期',
            show: true
          },
          5: {
            name: '↓ 相关度',
            show: false
          }
        },
        'searchRules': {
          '标 题': {
            focus: 10,
            inputConf: [1, 5, 0, 0]
          },
          '全 文': {
            focus: 10,
            inputConf: [1, 8, 0, 0]
          }
        }
      },
      contract: { //合同范本
        '标题': 'Title',
        '类型': 'contract',
        '唯一标识': 'Gid',
        'listItem': [{
            'key': 'TimelinessDic',
            'type': 'Array'
          }, //时效性
          {
            'key': 'IssueDepartment',
            'type': 'Array'
          }, //官方合同
          {
            'key': 'Category',
            'type': 'Array'
          }, //合同分类
          {
            'key': 'TradeCategory',
            'type': 'Array'
          }, //行业类别
          {
            'key': 'IssueDate',
            'behindValue': '公布'
          }, //发布日期
        ],
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        '搜索': {
          '标 题': 'Title',
          '全 文': 'FullText',
        },
        'excelData': [{
            label: '序号',
            disabled: true,
            value: true
          },
          {
            label: '标题',
            disabled: true,
            value: true
          },
          {
            label: '时效性',
            disabled: false,
            value: true
          },
          {
            label: '发布部门',
            disabled: false,
            value: true
          },
          {
            label: '合同分类',
            disabled: false,
            value: true
          },
          {
            label: '行业类别',
            disabled: false,
            value: true
          },
          {
            label: '发布日期',
            disabled: false,
            value: true
          },
          {
            label: '原文链接',
            disabled: false,
            value: true
          }
        ],
        '排序': {
          0: {
            name: '↓ 发布日期',
            show: true
          },
          1: {
            name: '↑ 发布日期',
            show: true
          },
          5: {
            name: '↓ 相关度',
            show: false
          }
        },
        'searchRules': {
          '标 题': {
            focus: 10,
            inputConf: [1, 5, 0, 0]
          },
          '全 文': {
            focus: 10,
            inputConf: [1, 8, 0, 0]
          }
        }
      },
      fmt: { //法律文书
        '标题': 'Title',
        '类型': 'fmt',
        '唯一标识': 'Gid',
        'listItem': [{
            'key': 'TimelinessDic',
            'type': 'Array'
          }, //时效性
          {
            'key': 'IssueDepartment',
            'type': 'Array'
          }, //发布部门
          {
            'key': 'Category',
            'type': 'Array'
          }, //文书类型
          {
            'key': 'IssueDate',
            'behindValue': '公布'
          }, //发布日期
        ],
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        '搜索': {
          '标 题': 'Title',
          '全 文': 'FullText',
        },
        'excelData': [{
            label: '序号',
            disabled: true,
            value: true
          },
          {
            label: '标题',
            disabled: true,
            value: true
          },
          {
            label: '时效性',
            disabled: false,
            value: true
          },
          {
            label: '发布部门',
            disabled: false,
            value: true
          },
          {
            label: '文书分类',
            disabled: false,
            value: true
          },
          {
            label: '发布日期',
            disabled: false,
            value: true
          },
          {
            label: '原文链接',
            disabled: false,
            value: true
          }
        ],
        '排序': {
          0: {
            name: '↓ 发布日期',
            show: true
          },
          1: {
            name: '↑ 发布日期',
            show: true
          },
          5: {
            name: '↓ 相关度',
            show: false
          }
        },
        'searchRules': {
          '标 题': {
            focus: 10,
            inputConf: [1, 5, 0, 0]
          },
          '全 文': {
            focus: 10,
            inputConf: [1, 8, 0, 0]
          }
        }
      }
    },
    case: { //司法案例
      '本库说明': '24.html',
      pfnl: { //案例与裁判文书
        '标题': 'Title',
        '类型': 'pfnl',
        'specialList': [{
            'key': 'TrialStep'
          },
          {
            'key': 'Category',
            'firstValue': true
          },
          {
            'key': 'DocumentAttr'
          },
        ], //特殊字段两个合并成一个
        /* 两个字段需要读取之后合并在一起 */
        '唯一标识': 'Gid',
        '切换图标': true,
        'labelListItem': {
          '指导性案例': [{
              'key': 'LastInstanceCourtName',
              'type': 'Array',
              'lastValue': true
            }, //审理法院
            {
              'key': 'CaseFlag'
            }, //案件字号
          ],
          '参阅案例': [{
              'key': 'LastInstanceCourtName',
              'type': 'Array',
              'lastValue': true
            }, //审理法院
            {
              'key': 'CaseFlag'
            }, //案件字号
          ],
          '经典案例': [{
              'key': 'LastInstanceCourtName',
              'type': 'Array',
              'lastValue': true
            }, //审理法院
            {
              'key': 'CaseFlag'
            }, //案件字号
          ],
          '公报案例': [{
              'key': 'LastInstanceCourtName',
              'type': 'Array',
              'lastValue': true
            }, //审理法院
            {
              'key': 'CaseFlag'
            }, //案件字号
            {
              'key': 'LastInstanceDate'
            }, //审结日期
          ],
          '应用案例': [{
              'key': 'LastInstanceCourtName',
              'type': 'Array',
              'lastValue': true
            }, //审理法院
            {
              'key': 'CaseFlag'
            }, //案件字号
            {
              'key': 'LastInstanceDate'
            }, //审结日期
          ],
          '法宝推荐': [{
              'key': 'LastInstanceCourtName',
              'type': 'Array',
              'lastValue': true
            }, //审理法院
            {
              'key': 'CaseFlag'
            }, //案件字号
            {
              'key': 'LastInstanceDate'
            }, //审结日期
          ],
          '普通案例': [{
              'key': 'LastInstanceCourtName',
              'type': 'Array',
              'lastValue': true
            }, //审理法院
            {
              'key': 'CaseFlag'
            }, //案件字号
            {
              'key': 'LastInstanceDate'
            }, //审结日期
          ],
          '典型案例': [{
              'key': 'LastInstanceCourtName',
              'type': 'Array',
              'lastValue': true
            }, //审理法院
          ]
        },
        'leftChart': {
          'Category': 'bar',
          'CaseGrade': 'pie',
          'CourtGrade': 'pie',
          'LastInstanceCourt': 'bar',
          'TrialStep': 'bar',
          'DocumentAttr': 'pie',
          'TrialStepCount': 'pie',
          'LastInstanceDate': 'line',
          'WordNum': 'bar'
        },
        'listItem': [{
            'key': 'LastInstanceCourtName',
            'type': 'Array',
            'lastValue': true
          }, //审理法院
          {
            'key': 'CaseFlag'
          }, //案件字号
          {
            'key': 'LastInstanceDate'
          }, //审结日期
        ],
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        '分组': 'CaseGrade',
        '关键字': {
          '关键词': 'Core',
          '核心问题': 'DisputedIssues',
        },
        '搜索': {
          '默 认': 'Default',
          '标 题': 'Title',
          '全 文': 'FullText',
          '案件字号': 'CaseFlag',
          '案 由': 'CategoryName',
          '法 院': 'LastInstanceCourtName',
          '法 官': 'Judge',
          '律 所': 'AgentLawOffice',
          '律 师': 'AgentLawyer',
          '当事人': 'Party',
          '核心问题': 'DisputedIssues',
          '审理经过': 'TrialAfter',
          '诉讼请求': 'PlaintiffClaims',
          '辩方观点': 'DefenseViewpoint',
          '争议焦点': 'ControversialFocus',
          '本院查明': 'Ascertain',
          '本院认为': 'Identified',
          '裁判依据': 'RefereeBasis',
          '裁判结果': 'RefereeResult'
        },
        /*   '搜索2':{
             '审理经过': 'TrialAfter',
             '诉讼请求': 'PlaintiffClaims',
             '辩方观点': 'DefenseViewpoint',
             '争议焦点': 'ControversialFocus',
             '本院查明': 'Ascertain',
             '本院认为': 'Identified',
             '裁判依据': 'RefereeBasis',
             '裁判结果': 'RefereeResult'
           }, */
        'excelData': [{
            label: '序号',
            disabled: true,
            value: true
          },
          {
            label: '标题',
            disabled: true,
            value: true
          },
          {
            label: '审理程序',
            disabled: false,
            value: true
          },
          {
            label: '案由',
            disabled: false,
            value: true
          },
          {
            label: '文书类型',
            disabled: false,
            value: true
          },
          {
            label: '审理法院',
            disabled: false,
            value: true
          },
          {
            label: '案件字号',
            disabled: false,
            value: true
          },
          {
            label: '审结日期',
            disabled: false,
            value: true
          },
          {
            label: '省份',
            disabled: false,
            value: true
          },
          {
            label: '案件类型',
            disabled: false,
            value: true
          },
          {
            label: '原文链接',
            disabled: false,
            value: true
          }
        ],
        '搜索关键字': {
          '法官': 'Judge',
          '案由': 'CategoryName',
          '律所': 'AgentLawOffice',
          '律师': 'AgentLawyer',
          '当事人': 'Party',
          '审理经过': 'TrialAfter',
          '诉讼请求': 'PlaintiffClaims',
          '辩方观点': 'DefenseViewpoint',
          '争议焦点': 'ControversialFocus',
          '本院查明': 'Ascertain',
          '本院认为': 'Identified',
          '裁判依据': 'RefereeBasis',
          '裁判结果': 'RefereeResult'
        },
        // '默认': '标题+全文+案件字号',第一期
        '默认': '标题+案件字号',
        // '默认提示': '默认在标题，全文和案件字号中检索',第一期
        '默认提示': '默认在标题，案件字号中检索',
        '排序': {
          0: {
            name: '↓ 审结日期',
            show: true
          },
          1: {
            name: '↑ 审结日期',
            show: true
          },
          5: {
            name: '↓ 相关度',
            show: false
          }
        },
        'searchRules': {
          '默 认': {
            focus: 10,
            inputConf: [5, 5, 5, 5, 5] //热搜（5条）、案由（5条）、法官（5条）、律所（5条）、律师（5条）special
          },
          '标 题': {
            focus: 10,
            inputConf: [5, 5, 5, 5, 5] //热搜（5条）、案由（5条）、法官（5条）、律所（5条）、律师（5条）special
          },
          '全 文': {
            focus: 10,
            inputConf: [0, 8, 0, 0, 0, 0] //同义（10条）、热搜（5条）、直达法规（8条）、直达法条（8条）、无意义、关键字
          },
          '案件字号': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 0]
          },
          '案 由': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 8]
          },
          '法 院': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 8]
          },
          '法 官': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 8]
          },
          '律 所': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 8]
          },
          '律 师': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 8]
          },
          '当事人': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 8]
          },
          '核心问题': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 0]
          },
          '审理经过': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 0]
          },
          '诉讼请求': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 0]
          },
          '辩方观点': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 0]
          },
          '争议焦点': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 0]
          },
          '本院查明': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 0]
          },
          '本院认为': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 0]
          },
          '裁判依据': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 0]
          },
          '裁判结果': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 0]
          }
        }
      },
      payz: { //裁判规则
        '标题': 'DisputedIssues',
        '标题1': 'Title',
        '类型': 'payz',
        '切换图标': true,
        'leftChart': {
          'Category': 'bar',
          'SubjectClassification': 'pie',
          'CoreDic': 'bar',
          'CaseGrade': 'pie',
          'CourtGrade': 'pie',
          'LastInstanceCourt': 'bar'
        },
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        '关键字': {
          '案由': 'Category',
          '专题': 'SubjectClassification',
          '规则日期': 'LastInstanceDate',
          '关键词': 'Core',
          '裁判要点': 'CaseGist',
          '渊源案例': 'Title'
        },
        '分组': 'CaseGrade',
        '唯一标识': 'Gid',
        '搜索': {
          '标 题': 'Title',
          '全 文': 'FullText',
        },
        '排序': {
          0: {
            name: '↓ 规则日期',
            show: true
          },
          1: {
            name: '↑ 规则日期',
            show: true
          },
          5: {
            name: '↓ 相关度',
            show: false
          }
        },
        'searchRules': {
          '标 题': {
            focus: 10,
            inputConf: [0, 8, 0, 0, 0, 0]
          },
          '全 文': {
            focus: 10,
            inputConf: [0, 8, 0, 0, 0, 0]
          }
        }
      },
      gac: { //指导性案例实证应用>指导性案例与应用
        '标题': 'Title',
        '类型': 'gac',
        '唯一标识': 'Gid',
        '分组': 'CaseGrade',
        'specialList': [{
            'key': 'TrialStep'
          },
          {
            'key': 'Category',
            'firstValue': true
          },
          {
            'key': 'DocumentAttr'
          },
        ], //特殊字段合并成一个
        'listItem': [{
            'key': 'LastInstanceCourt',
            'type': 'Array',
            'lastValue': true
          }, //审理法院
          {
            'key': 'CaseFlag'
          }, //案件字号
          {
            'key': 'LastInstanceDate'
          }, //审结日期
        ],
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        '关键字': {
          '案由': 'Category',
          '发布日期': 'IssueDate',
          '批次': 'GuidingCaseDoc',
          '关键词': 'Core',
          '核心问题': 'DisputedIssues',
          '本院认为': 'CourtView',
          '裁判要点': 'CaseGist',
          '指导意义': 'GuidingSense',
          '相关法条': 'RelevantLaw',
          '基本案情': 'BasicFacts',
          '裁判结果': 'RefereeResult',
          '裁判理由': 'JudgeReason',
          '当事人': 'Party',
        },
        '搜索': {
          '标 题': 'Title',
          '全 文': 'FullText',
          '案件字号': 'CaseFlag',
          // '案 由': 'CategoryName',
          '关键词': 'Core',
          // '法 院': 'LastInstanceCourtName',
          '法 官': 'Judge',
          '律 所': 'AgentLawOffice',
          '律 师': 'AgentLawyer',
          '当事人': 'Party',
          '核心问题': 'DisputedIssues',
          '裁判要点': 'CaseGist',
          '相关法条': 'RelevantLaw',
          '基本案情': 'BasicFacts',
          '裁判结果': 'RefereeResult',
          '裁判理由': 'JudgeReason',
          '指导意义': 'GuidingSense'
        },
        'excelData': [{
            label: '序号',
            disabled: true,
            value: true
          },
          {
            label: '标题',
            disabled: true,
            value: true
          },
          {
            label: '审理程序',
            disabled: false,
            value: true
          },
          {
            label: '文书类型',
            disabled: false,
            value: true
          },
          {
            label: '审理法院',
            disabled: false,
            value: true
          },
          {
            label: '案件字号',
            disabled: false,
            value: true
          },
          {
            label: '审结日期',
            disabled: false,
            value: true
          },
          {
            label: '案由',
            disabled: false,
            value: true
          },
          {
            label: '发布日期',
            disabled: false,
            value: true
          },
          {
            label: '批次',
            disabled: false,
            value: true
          },
          {
            label: '原文链接',
            disabled: false,
            value: true
          },
        ],
        // '搜索关键字': {
        // 	'裁判要点': 'CaseGist',
        // 	'相关法条': 'RelevantLaw',
        // 	'基本案情': 'BasicFacts',
        // 	'裁判结果': 'RefereeResult',
        // 	'裁判理由': 'JudgeReason',
        // 	'指导意义': 'GuidingSense'
        // },
        '过滤器': {
          '指导性案例与应用': 'gac',
          '法宝实证报告': 'ear',
          '指导性案例动态': 'gdd',
        },
        '排序': {
          0: {
            name: '↓ 审结日期',
            show: true
          },
          1: {
            name: '↑ 审结日期',
            show: true
          }
        },
        'searchRules': {
          '标 题': {
            focus: 10,
            inputConf: [0, 8, 0, 0, 0, 0]
          },
          '全 文': {
            focus: 10,
            inputConf: [0, 8, 0, 0, 0, 0]
          },
          '案件字号': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 0]
          },
          '案 由': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 8]
          },
          '关键词': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 0]
          },
          '法 院': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 8]
          },
          '法 官': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 8]
          },
          '律 所': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 8]
          },
          '律 师': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 8]
          },
          '当事人': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 8]
          },
          '核心问题': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 0]
          },
          '裁判要点': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 0]
          },
          '相关法条': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 0]
          },
          '基本案情': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 0]
          },
          '裁判结果': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 0]
          },
          '裁判理由': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 0]
          },
          '指导意义': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 0]
          }
        }
      },
      ear: { //法宝实证报告（22）
        '标题': 'Title',
        '类型': 'gac',
        '唯一标识': 'Gid',
        '关键字': {
          '主题分类': 'Category',
          '发布日期': 'IssueDate',
          '批次': 'GuidingCaseDoc',
          '关键词': 'Core',
          '摘要': 'Summary',
        },
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        '搜索': {
          '标 题': 'Title',
          '全 文': 'FullText',
        },
        'excelData': [{
            label: '序号',
            disabled: true,
            value: true
          },
          {
            label: '标题',
            disabled: true,
            value: true
          },
          {
            label: '主题分类',
            disabled: false,
            value: true
          },
          {
            label: '发布日期',
            disabled: false,
            value: true
          },
          {
            label: '关键词',
            disabled: false,
            value: true
          },
          {
            label: '摘要',
            disabled: false,
            value: true
          },
          {
            label: '原文链接',
            disabled: false,
            value: true
          }
        ],
        '过滤器': {
          '指导性案例与应用': 'gac',
          '法宝实证报告': 'ear',
          '指导性案例动态': 'gdd',
        },
        '排序': {
          0: {
            name: '↓ 总期号',
            show: true
          },
          1: {
            name: '↑ 总期号',
            show: true
          }
        },
        'searchRules': {
          '标 题': {
            focus: 10,
            inputConf: [0, 8, 0, 0, 0, 0]
          },
          '全 文': {
            focus: 10,
            inputConf: [0, 8, 0, 0, 0, 0]
          }
        }
      },
      gdd: { //指导性案例动态（348）
        '标题': 'Title',
        '类型': 'gac',
        '唯一标识': 'Gid',
        '中间行': {
          '发布': 'IssueDate',
          '实施': 'ImplementDate'
        },
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        '搜索': {
          '标 题': 'Title',
          '全 文': 'FullText',
        },
        '过滤器': {
          '指导性案例与应用': 'gac',
          '法宝实证报告': 'ear',
          '指导性案例动态': 'gdd',
        },
        'excelData': [{
            label: '序号',
            disabled: true,
            value: true
          },
          {
            label: '标题',
            disabled: true,
            value: true
          },
          {
            label: '原文链接',
            disabled: false,
            value: true
          }
        ],
        '排序': {
          0: {
            name: '↓ 发布日期',
            show: true
          },
          1: {
            name: '↑ 发布日期',
            show: true
          }
        },
        'searchRules': {
          '标 题': {
            focus: 10,
            inputConf: [0, 8, 0, 0, 0, 0]
          },
          '全 文': {
            focus: 10,
            inputConf: [0, 8, 0, 0, 0, 0]
          }
        }
      },
      bankruptcy: { //破产信息
        '标题': 'Title',
        '唯一标识': 'Gid',
        '类型': 'bankruptcy',
        'listItem': [{
            'key': 'AppellateCourt',
            'type': 'Array',
            'lastValue': true
          }, //法院
          {
            'key': 'InstrumentType'
          }, //文书性质
          {
            'key': 'LastInstanceDate'
          }, //终审日期
        ],
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        '关键字': {
          '本院认为': 'Identified',
          '审理法官': 'Judge',
        },
        '搜索': {
          '标 题': 'Title',
          '全 文': 'FullText',
          '文 号': 'CaseFlag',
          '企业名称': 'CompanyName',
        },
        'excelData': [{
            label: '序号',
            disabled: true,
            value: true
          },
          {
            label: '标题',
            disabled: true,
            value: true
          },
          {
            label: '审理法院',
            disabled: false,
            value: true
          },
          {
            label: '文书样式',
            disabled: false,
            value: true
          },
          {
            label: '审结日期',
            disabled: false,
            value: true
          },
          {
            label: '原文链接',
            disabled: false,
            value: true
          },
        ],
        '排序': {
          0: {
            name: '↓ 审结日期',
            show: true
          },
          1: {
            name: '↑ 审结日期',
            show: true
          },
          5: {
            name: '↓ 相关度',
            show: false
          }
        },
        '搜索关键字': {
          '文 号': 'Code',
          '企业名称': 'CompanyName',
        },
        'searchRules': {
          '标 题': {
            focus: 10,
            inputConf: [0, 8, 0, 0, 0, 0]
          },
          '全 文': {
            focus: 10,
            inputConf: [0, 8, 0, 0, 0, 0]
          },
          '文 号': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 0]
          },
          '企业名称': {
            focus: 10,
            inputConf: [0, 0, 0, 0, 0, 0]
          }
        }
      },
      pal: { //案例报道
        '类型': 'pal',
        '标题': 'Title',
        '唯一标识': 'Gid',
        '切换图标': true,
        'leftChart': {
          'Category': 'bar',
          'ColumnName': 'pie',
          'SpecialCase': 'bar',
          'Court': 'bar',
          'IssueDate': 'line'
        },
        'listItem': [{
            'key': 'IssueDate'
          }, //发布日期
        ],
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        '搜索': {
          '标 题': 'Title',
          '全 文': 'FullText',
        },
        'excelData': [{
            label: '序号',
            disabled: true,
            value: true
          },
          {
            label: '标题',
            disabled: true,
            value: true
          },
          {
            label: '发布日期',
            disabled: false,
            value: true
          },
          {
            label: '原文链接',
            disabled: false,
            value: true
          },
        ],
        '排序': {
          0: {
            name: '↓ 发布日期',
            show: true
          },
          1: {
            name: '↑ 发布日期',
            show: true
          },
          5: {
            name: '↓ 相关度',
            show: false
          }
        },
        'searchRules': {
          '标 题': {
            focus: 10,
            inputConf: [0, 8, 0, 0, 0, 0]
          },
          '全 文': {
            focus: 10,
            inputConf: [0, 8, 0, 0, 0, 0]
          }
        }
      },
      atr: { //仲裁案例
        '类型': 'atr',
        '标题': 'Title',
        '唯一标识': 'Gid',
        'listItem': [{
            'key': 'IssueDate'
          }, //发布日期
        ],
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        '搜索': {
          '标 题': 'Title',
          '全 文': 'FullText',
        },
        'excelData': [{
            label: '序号',
            disabled: true,
            value: true
          },
          {
            label: '标题',
            disabled: true,
            value: true
          },
          {
            label: '裁决日期',
            disabled: false,
            value: true
          },
          {
            label: '原文链接',
            disabled: false,
            value: true
          },
        ],
        '排序': {
          0: {
            name: '↓ 发布日期',
            show: true
          },
          1: {
            name: '↑ 发布日期',
            show: true
          },
          5: {
            name: '↓ 相关度',
            show: false
          }
        },
        'searchRules': {
          '标 题': {
            focus: 10,
            inputConf: [0, 8, 0, 0, 0, 0]
          },
          '全 文': {
            focus: 10,
            inputConf: [0, 8, 0, 0, 0, 0]
          }
        }
      },
    },
    'qikan': { //法学期刊
      '本库说明': '25.html',
      '标题': 'InfoTitle',
      '标题1': 'InfoTitleEn',
      '唯一标识': 'CGid',
      '切换图标': true,
      'leftChart': {
        'JournalId': 'bar',
        'InfoKind': 'pie',
        'JournalYear': 'line',
      },
      'listItem': [{
          'key': 'JournalName'
        }, //期刊
        {
          'key': 'JournalYear',
          'behindValue': '年'
        }, //年
        {
          'key': 'JournalIssue',
          'behindValue': '期',
          'frontValue': '第'
        }, //期
        {
          'key': 'InfoPage',
          'behindValue': '页',
          'frontValue': '第'
        }, //页
        {
          'key': 'InfoAuthor'
        }, //作者
        {
          'key': 'AuthorUnit'
        }, //作者单位
      ],
      'fullText': { //全文字段配置
        'value': 'highLighter',
        'frequency': 'hitTimes'
      },
      '搜索': {
        '标 题': 'Title',
        '全 文': 'FullText',
        '期 刊': 'JournalName',
        '作 者': 'InfoAuthor',
        '作者单位': 'AuthorUnit',
      },
      'excelData': [{
          label: '序号',
          disabled: true,
          value: true
        },
        {
          label: '标题',
          disabled: true,
          value: true
        },
        {
          label: '期刊名称',
          disabled: false,
          value: true
        },
        {
          label: '期刊年份',
          disabled: false,
          value: true
        },
        {
          label: '期号',
          disabled: false,
          value: true
        },
        {
          label: '页码',
          disabled: false,
          value: true
        },
        {
          label: '作者',
          disabled: false,
          value: true
        },
        {
          label: '作者单位',
          disabled: false,
          value: true
        },
        {
          label: '原文链接',
          disabled: false,
          value: true
        },
      ],
      /* '搜索关键字':{
      	'期 刊': 'JournalName',
      	'作 者': 'InfoAuthor',
      	'作者单位': 'AuthorUnit',
      }, */
      'searchRules': {
        '标 题': {
          focus: 10,
          inputConf: [0, 8, 0, 0, 0, 0]
        },
        '全 文': {
          focus: 10,
          inputConf: [0, 8, 0, 0, 0, 0]
        },
        '期 刊': {
          focus: 10,
          inputConf: [0, 0, 0, 0, 0, 8]
        },
        '作 者': {
          focus: 10,
          inputConf: [0, 0, 0, 0, 0, 8]
        },
        '作者单位': {
          focus: 10,
          inputConf: [0, 0, 0, 0, 0, 8]
        }
      }
    },
    'lawfirmarticles': { //律所实务
      '本库说明': '26.html',
      '标题': 'ArticleCtitle',
      '唯一标识': 'Gid',
      '切换图标': true,
      'leftChart': {
        'ArticleField': 'pie',
        'FirmId': 'bar',
        'JournalId': 'bar',
        'ArticleSubmitTime': 'line',
      },
      'listItem': [{
          'key': 'ArticleAuthor'
        }, //作者
        {
          'key': 'FirmCname'
        }, //合作机构
        {
          'key': 'ArticleSubmitTime'
        }, //发布年份
      ],
      'fullText': { //全文字段配置
        'value': 'highLighter',
        'frequency': 'hitTimes'
      },
      '搜索': {
        '标 题': 'Title',
        '全 文': 'FullText',
        '合作刊物': 'JournalCName',
        '作 者': 'ArticleAuthor',
        '合作机构': 'FirmCname',
      },
      /* '搜索关键字':{
      	'合作刊物': ' JournalCName',
      	'作 者': 'ArticleAuthor',
      	'合作机构': 'FirmId',
      }, */
      'excelData': [{
          label: '序号',
          disabled: true,
          value: true
        },
        {
          label: '标题',
          disabled: true,
          value: true
        },
        {
          label: '作者',
          disabled: false,
          value: true
        },
        {
          label: '合作机构',
          disabled: false,
          value: true
        },
        {
          label: '发布时间',
          disabled: false,
          value: true
        },
        {
          label: '原文链接',
          disabled: false,
          value: true
        },
      ],
      'searchRules': {
        '标 题': {
          focus: 10,
          inputConf: [0, 8, 0, 0, 0, 0]
        },
        '全 文': {
          focus: 10,
          inputConf: [0, 8, 0, 0, 0, 0]
        },
        '合作刊物': {
          focus: 10,
          inputConf: [0, 0, 0, 0, 0, 8]
        },
        '作 者': {
          focus: 10,
          inputConf: [0, 0, 0, 0, 0, 8]
        },
        '合作机构': {
          focus: 10,
          inputConf: [0, 0, 0, 0, 0, 8]
        },
      }
    },
    'specialtopic': { //专题参考
      '本库说明': '27.html',
      '标题': 'Title',
      '唯一标识': 'Gid',
      /* 	'关键字': {
      		'案由': 'Category'
      	}, */
      '搜索': {
        '标 题': 'Title',
        '全 文': 'FullText',
      },
      'fullText': { //全文字段配置
        'value': 'highLighter',
        'frequency': 'hitTimes'
      },
      'searchRules': {
        '标 题': {
          focus: 10,
          inputConf: [0, 8, 0, 0, 0, 0]
        },
        '全 文': {
          focus: 10,
          inputConf: [0, 8, 0, 0, 0, 0]
        }
      }
    },
    'procuratorate': { //检察文书
      '本库说明': '30.html',
      'procuratoratedoc': {
        '类型': 'procuratoratedoc',
        '本库说明': '30.html',
        '标题': 'Title',
        '唯一标识': 'Gid',
        '切换图标': true,
        'leftChart': {
          'Category': 'bar',
          'DocumentAttr': 'pie',
          'SutraCase': 'pie',
          'CourtGrade': 'pie',
          'LastInstanceCourt': 'bar',
          'LastInstanceDate': 'line',
        },
        'listItem': [{
            'key': 'LastInstanceCourt',
            'type': 'Array',
            'lastValue': true
          }, //法院
          {
            'key': 'CaseFlag'
          }, //文书性质
          {
            'key': 'LastInstanceDate'
          }, //终审日期
        ],
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        '关键字': {
          '本院认为': 'Identified'
        },
        '搜索': {
          '标 题': 'Title',
          '全 文': 'FullText',
        },
        'searchRules': {
          '标 题': {
            focus: 10,
            inputConf: [0, 8, 0, 0, 0, 0]
          },
          '全 文': {
            focus: 10,
            inputConf: [0, 8, 0, 0, 0, 10]
          }
        },
        '排序': {
          0: {
            name: '↓ 日期',
            show: true
          },
          1: {
            name: '↑ 日期',
            show: true
          },
          5: {
            name: '↓ 相关度',
            show: false
          }
        },
        'excelData': [{
            label: '序号',
            disabled: true,
            value: true
          },
          {
            label: '标题',
            disabled: true,
            value: true
          },
          {
            label: '裁决日期',
            disabled: false,
            value: true
          },
          {
            label: '检察院',
            disabled: false,
            value: true
          },
          {
            label: '文书编号',
            disabled: false,
            value: true
          },
          {
            label: '原文链接',
            disabled: false,
            value: true
          }
        ],
      },
      'crucialcaseinfo': {
        '类型': 'crucialcaseinfo',
        '本库说明': '30.html',
        '标题': 'Title',
        '唯一标识': 'Gid',
        '切换图标': true,
        'leftChart': {
          'Category': 'bar',
          'SutraCase': 'pie',
          'CourtGrade': 'pie',
          'LastInstanceCourt': 'line',
        },
        'listItem': [{
            'key': 'LastInstanceCourt',
            'type': 'Array',
            'lastValue': true
          }, //法院
          {
            'key': 'InstrumentType'
          }, //文书性质
          {
            'key': 'IssueDate'
          }, //终审日期
        ],
        'fullText': { //全文字段配置
          'value': 'highLighter',
          'frequency': 'hitTimes'
        },
        '关键字': {
          '案由': 'Category'
        },
        '搜索': {
          '标 题': 'Title',
          '全 文': 'FullText',
        },
        'searchRules': {
          '标 题': {
            focus: 10,
            inputConf: [0, 8, 0, 0, 0, 0]
          },
          '全 文': {
            focus: 10,
            inputConf: [0, 8, 0, 0, 0, 10]
          }
        },
        '排序': {
          0: {
            name: '↓ 发布时间',
            show: true
          },
          1: {
            name: '↑ 发布时间',
            show: true
          },
          5: {
            name: '↓ 相关度',
            show: false
          }
        },
        'excelData': [{
            label: '序号',
            disabled: true,
            value: true
          },
          {
            label: '标题',
            disabled: true,
            value: true
          },
          {
            label: '检察院',
            disabled: false,
            value: true
          },
          {
            label: '发布日期',
            disabled: false,
            value: true
          },
          {
            label: '原文链接',
            disabled: false,
            value: true
          }
        ],
      }
    },
    'apy': { //行政处罚
      '类型': 'apy',
      '本库说明': '81.html',
      '标题': 'Title',
      '唯一标识': 'Gid',
      'listItem': [{
          'key': 'LawRegional',
          'type': 'Array',
          'lastValue': true
        }, //法院
        {
          'key': 'DocumentNO'
        }, //文书性质
        {
          'key': 'PunishmentDate',
          'behindValue': '发布'
        }, //发布日期
      ],
      'fullText': { //全文字段配置
        'value': 'highLighter',
        'frequency': 'hitTimes'
      },
      '关键字': {
        '摘要': 'ShowSummary'
      },
      '搜索': {
        '案件名称': 'Title',
        '全 文': 'FullText',
        '发文案号': 'DocumentNO',
      },
      'searchRules': {
        '案件名称': {
          focus: 10,
          inputConf: [0, 5, 0, 0, 0, 0]
        },
        '全 文': {
          focus: 10,
          inputConf: [0, 5, 0, 0, 0, 0]
        },
        '发文案号':{
          focus: 10,
          inputConf: [0, 5, 0, 0, 0, 0]
        }
      },
      '排序': {
        0: {
          name: '↓ 处罚日期',
          show: true
        },
        1: {
          name: '↑ 处罚日期',
          show: true
        },
        5: {
          name: '↓ 相关度',
          show: false
        }
      },
      'excelData': [{
          label: '序号',
          disabled: true,
          value: true
        },
        {
          label: '标题',
          disabled: true,
          value: true
        },
        {
          label: '裁决日期',
          disabled: false,
          value: true
        },
        {
          label: '检察院',
          disabled: false,
          value: true
        },
        {
          label: '文书编号',
          disabled: false,
          value: true
        },
        {
          label: '原文链接',
          disabled: false,
          value: true
        }
      ],
    }
  }
}
//searchRules law inputConf 4-个字段 同义（1条）、热搜（5条）、直达法规（8条）、直达法条（8条）
//case pfnl 前两个inputConf 5-字段 热搜（5条）、案由（5条）、法官（5条）、律所（5条）、律师（5条）
//后面模块 inputConf 6-个字段 代表同义（10条）、热搜（5条）、直达法规（8条）、直达法条（8条）、占位符、关键字
export default {
  namespaced: true,
  state
}
