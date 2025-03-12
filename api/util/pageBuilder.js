module.exports = {
  getPageSQL: function (body, defaultOrder) {
    let page = " "
    if (body.orderCol) {
      page = page + " order by " + body.orderCol
    } else {
      page = page + " order by " + defaultOrder
    }
    if (body.orderType) {
      page = page + " " + body.orderType + " "
    }
    page = page + " offset " + body.PageSize * (body.PageIndex - 1) +
      " ROWS FETCH next " + body.PageSize + " rows only"
    return page

  },
  getPageSQL2: function (body, defaultOrder, tableName, where) {
    let sqlString = "SELECT * FROM " + tableName
    let sqlString2 = "SELECT count(*) FROM " + tableName
    let where2 = " where 1=1 "
    let page = " "
    if (body.orderCol) {
      page = page + " order by " + body.orderCol
    } else {
      page = page + " order by " + defaultOrder
    }
    if (body.orderType) {
      page = page + " " + body.orderType + " "
    }
    page = page + " offset " + body.PageSize * (body.PageIndex - 1) +
      " ROWS FETCH next " + body.PageSize + " rows only"
    return [sqlString + where + page, sqlString2 + where]

  },
  getInsert: function (data) {
    let sqlCls = []
    let sqlvalue = []

    Object.keys(data).forEach((key, _) => {
      if (data[key] != null) {
        sqlCls.push(key)
        sqlvalue.push(data[key])
      }
    })
    let sqlClsString = sqlCls.join(',')


    let sqlvalueStr = sqlvalue.join("','")
    //console.log(sql + "('"+sqlvalueStr+"')")
    return "(" + sqlClsString + ") values('" + sqlvalueStr + "')"

  },
  getRtn: function () {
    return {
      Code: 0,
      Data: null,
      Msg: "初始化"
    }
  },
  checkLegal: function (dataList) {
    re = /select|update|delete|exec|count|'|"|=|;|>|<|%/i;
    for (let str in dataList) {
      if (re.test(dataList[str])) {
        return false;

      }
    }
    return true;
  },
   dateFormat: function(dtStr) {
    function padZero(n) {
      n > 9 ? n=n :n= '0' + n
      return n
    }
    //定义时间格式
    const dt = new Date(dtStr)
    const y = padZero(dt.getFullYear())
    const m = padZero(dt.getMonth() + 1)
    const d = padZero(dt.getDate())
    const hh = padZero(dt.getHours())
    const mm = padZero(dt.getMinutes())
    const ss = padZero(dt.getSeconds())
 
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  } 
}
