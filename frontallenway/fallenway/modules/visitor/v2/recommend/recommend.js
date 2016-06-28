var express = require('express');
var router = express.Router();

var request = require('request');
var async = require('async');
var async1 = require('async');

var Logger = require('../../../../config/logconfig.js');
var logger = new Logger().getLogger();

var Config = require('../../../../config/globalconfig.js');
var config = new Config();

router.get('',function(req,res,next){
    res.redirect('/visitor/recommend/to-zhihu');
});




router.get('/to-movies',function(req,res,next){
    async.parallel({
        modules:function(callback){
            request(config.getBackendUrlPrefix() + "module/find-all-modules",function(error,response,body){
                if(!error && response.statusCode == 200){
                    var returnData = JSON.parse(body);

                    if(returnData.statusCode != 0){
                        logger.error("visitor/v2/messageboard/index.js -- module/find-all-modules fail ..." +
                            "response.statusCode = 200, but returnData.statusCode = " + returnData.statusCode);
                        res.render('error/unknowerror');
                    } else {
                        callback(null,returnData.data.modules);
                    }
                } else {
                    logger.error("visitor/v2/messageboard/index.js -- module/find-all-modules fail ..." +
                        "error = " + error);
                    if(response != null){
                        logger.error("visitor/v2/messageboard/index.js -- module/find-all-modules fail ..." +
                            "response.statuCode = " + response.statusCode + "..." +
                            "response.body = " + response.body);
                    }
                    res.render('error/unknowerror');
                }
            });
        },
        recommends:function(callback){
            var url = config.getBackendUrlPrefix() + "recommend/find-recommends-by-classify?classify=movie";

            request(url,function(error,response,body){
                if(!error && response.statusCode == 200){
                    var returnData = JSON.parse(body);

                    if(returnData.statusCode != 0){
                        logger.error("visitor/v2/recommend/recommed.js -- recommend/find-recommends-by-classify?classify=movie fail ..." +
                            "response.statusCode = 200, but returnData.statusCode = " + returnData.statusCode);
                            res.render('error/unknowerror');
                    } else {
                        var data = {};
                        var recommends = returnData.data.recommends;
                        data.recommends_hanguo = new Array();

                        var m = 0;
                        for(var i = 0; i < recommends.length; ++i){
                            var other = recommends[i].other;
                            if(other == '韩国'){
                                data.recommends_hanguo[m] = recommends[i];
                                m = m + 1;
                            }
                        }
                        callback(null,data);
                    }
                } else {
                    logger.error("visitor/v2/recommend/recommend.js -- recommend/find-recommends-by-classify?classify=movie fail ..." +
                        "error = " + error);
                    if(response != null){
                        logger.error("visitor/v2/recommend/recommend.js -- recommend/find-recommends-by-classify?classify=movie fail ..." +
                            "response.statuCode = " + response.statusCode + "..." +
                            "response.body = " + response.body);
                    }
                    res.render('error/unknowerror');
                }
            });
        }
    },function(err,result){
        result.recommends_hanguo = result.recommends.recommends_hanguo;
        res.render('visitor/v3/recommend/movie',{'data':result});
    })
})




router.get('/to-zhihu',function(req,res,next){
    async.parallel({
        modules:function(callback){
            request(config.getBackendUrlPrefix() + "module/find-all-modules",function(error,response,body){
                if(!error && response.statusCode == 200){
                    var returnData = JSON.parse(body);

                    if(returnData.statusCode != 0){
                        logger.error("visitor/v2/messageboard/index.js -- module/find-all-modules fail ..." +
                            "response.statusCode = 200, but returnData.statusCode = " + returnData.statusCode);
                        res.render('error/unknowerror');
                    } else {
                        callback(null,returnData.data.modules);
                    }
                } else {
                    logger.error("visitor/v2/messageboard/index.js -- module/find-all-modules fail ..." +
                        "error = " + error);
                    if(response != null){
                        logger.error("visitor/v2/messageboard/index.js -- module/find-all-modules fail ..." +
                            "response.statuCode = " + response.statusCode + "..." +
                            "response.body = " + response.body);
                    }
                    res.render('error/unknowerror');
                }
            });
        },
        recommends:function(callback){

            var url = config.getBackendUrlPrefix() + "recommend/find-recommends-by-classify?classify=zhihu";

            request(url,function(error,response,body){
                if(!error && response.statusCode == 200){
                    var returnData = JSON.parse(body);

                    if(returnData.statusCode != 0){
                        logger.error("visitor/v2/recommend/recommed.js -- recommend/find-recommends-by-classify?classify=zhihu fail ..." +
                            "response.statusCode = 200, but returnData.statusCode = " + returnData.statusCode);
                            res.render('error/unknowerror');
                    } else {
                        var data = {};
                        var recommends = returnData.data.recommends;
                        data.recommends_zhangzishi = new Array();
                        data.recommends_lizhi = new Array();
                        data.recommends_interest = new Array();
                        var m = 0;
                        var n = 0;
                        var k = 0;
                        for(var i = 0; i < recommends.length; ++i){
                            var other = recommends[i].other;
                            if(other == '励志'){
                                data.recommends_lizhi[m] = recommends[i];
                                m = m + 1;
                            } else if(other == '涨姿势'){
                                data.recommends_zhangzishi[n] = recommends[i];
                                n = n + 1;
                            } else {
                                data.recommends_interest[k] = recommends[i];
                                k = k + 1;
                            }
                        }
                        callback(null,data);
                    }
                } else {
                    logger.error("visitor/v2/recommend/recommend.js -- recommend/find-recommends-by-classify?classify=zhihu fail ..." +
                        "error = " + error);
                    if(response != null){
                        logger.error("visitor/v2/recommend/recommend.js -- recommend/find-recommends-by-classify?classify=zhihu fail ..." +
                            "response.statuCode = " + response.statusCode + "..." +
                            "response.body = " + response.body);
                    }
                    res.render('error/unknowerror');
                }
            });
        }
    },function(err,result){
        result.recommends_zhangzishi = result.recommends.recommends_zhangzishi;
        result.recommends_lizhi = result.recommends.recommends_lizhi;
        result.recommends_interest = result.recommends.recommends_interest;
        res.render('visitor/v3/recommend/zhihu',{'data':result});
    })
})


module.exports = router;