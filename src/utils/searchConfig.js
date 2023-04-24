export const condition = {
    "title": { //标题
        "title_0": { //标题+精确
            "listJson": {
                "scope": "title",
                "inquiryMode": "0"
            },
            "Tips":"标题+精确匹配",
            "condition":"标题",
            "searchName":"标 题"
        },
        "title_1": { //标题+模糊
            "listJson": {
                "scope": "title",
                "inquiryMode": "1"
            },
            "Tips":"标题+模糊匹配",
            "condition":"标题",
            "searchName":"标 题"
        },
        "structuredContent_0_1": { //全文+精确+同句
            "listJson": {
                "scope": "structuredContent",
                "inquiryMode": "0",
                "rangeType": "1",
            },
            "Tips":"全文+精确同句匹配",
            "loop":true,
            "condition":"全文",
            "searchName":"全 文"
        },
        "structuredContent_0_0": { //全文+精确+同段
            "listJson": {
                "scope": "structuredContent",
                "inquiryMode": "0",
                "rangeType":"0",
            },
            "Tips":"全文+精确同段匹配",
            "loop":true,
            "condition":"全文",
            "searchName":"全 文"
        },
        "structuredContent_0": { //全文+精确+同篇
            "listJson": {
                "scope": "structuredContent",
                "inquiryMode": "0",
                "rangeType": "",
            },
            "Tips":"全文+精确同篇匹配",
            "condition":"全文",
            "searchName":"全 文"
        },
        "structuredContent_1": { //全文+模糊+同篇
            "listJson": {
                "scope": "structuredContent",
                "inquiryMode": "1",
                "rangeType": "",
            },
            "Tips":"全文+模糊同篇匹配",
            "condition":"全文",
            "searchName":"全 文"
        }
    },
    "structuredContent":{
        "structuredContent_0_1": { //全文+精确+同句
            "listJson": {
                "scope": "structuredContent",
                "inquiryMode": "0",
                "rangeType": "1",
            },
            "Tips":"全文+精确同句匹配",
            "loop":true,
            "condition":"全文",
            "searchName":"全 文"
        },
        "structuredContent_0_0": { //全文+精确+同段
            "listJson": {
                "scope": "structuredContent",
                "inquiryMode": "0",
                "rangeType": "0",
            },
            "Tips":"全文+精确同段匹配",
            "loop":true,
            "condition":"全文",
            "searchName":"全 文"
        },
        "structuredContent_0": { //全文+精确+同篇
            "listJson": {
                "scope": "structuredContent",
                "inquiryMode": "0",
                "rangeType": "",
            },
            "Tips":"全文+精确同篇匹配",
            "condition":"全文",
            "searchName":"全 文"
        },
        "structuredContent_1": { //全文+模糊+同篇
            "listJson": {
                "scope": "structuredContent",
                "inquiryMode": "1",
                "rangeType": "",
            },
            "Tips":"全文+模糊同篇匹配",
            "condition":"全文",
            "searchName":"全 文"
        }
    },
    "serNumber": { //编号
        "serNumber_0": { //编号+精确
            "listJson": {
                "scope": "serNumber",
                "inquiryMode": "0",
            },
            "Tips":"编号+精确匹配",
            "noTips":true,
            "condition":"编号",
            "searchName":"编号"
        },
        "serNumber_1": { //编号+模糊
            "listJson": {
                "scope": "serNumber",
                "inquiryMode": "1",
            },
            "Tips":"编号+模糊匹配",
            "noTips":true,
            "condition":"编号",
            "searchName":"编号"
        }
    }
}
  