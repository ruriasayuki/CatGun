module.exports = {
    '/world':{
        method:'GET',
        func:async function (req, res) {
            let rtn = {}
            rtn.Code = 1
            rtn.Data = 'hello world！'
            res.status(200).send(rtn)
        }
    }
}