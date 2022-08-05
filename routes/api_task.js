const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const moment = require('moment');
const UtilsApi = require(`../utils/tools_api.js`);
const { mysql } = require('../config/database.js');

// @router POST /api/task/add
// to create new task and objective
router.post('/add', function (req, res, next){
    const utils = new UtilsApi(req, res, next)
    const params = req.body;

    try{
        utils.requireParams(params, ['title', 'action_time', 'objective_list'], function(result){
           const { title, action_time, objective_list } = params;
            if(title.length <= 5 || action_time === 0 || objective_list.length === 0){
                return utils.err422('Value pada inputan tidak sesuai. silahkan disesuaikan')
            }
            mysql.query(`
                select count(1) as count
                    from general_db_id.task as t
                        where true and 
                         replace(lower(t.title), " ", "") = ${mysql.escape(title.replace(/\s/g, "").toLowerCase())}
            `, function(resultOfQuery){
                if(Number(resultOfQuery[0].count) === 0){
                    const time = moment.unix(action_time).format('YYYY-MM-DD HH:mm:ss');
                    console.info('time', time)
                    mysql.query(`
                        insert into general_db_id.task(title, action_time)
                            values (
                                ${mysql.escape(title)},
                                ${mysql.escape(time)}
                            );
                    `, function(resultOfQueryTwo){
                        let stringQuery = ``
                        const lengthArray = objective_list.length - 1;

                        for(let i=0; i <= lengthArray; i++){
                            if(i ==  lengthArray){
                                stringQuery += `(${resultOfQueryTwo.insertId}, ${mysql.escape(objective_list[i])})`;
                            }else{
                                stringQuery += `(${resultOfQueryTwo.insertId}, ${mysql.escape(objective_list[i])}), `;
                            }
                        }
                        mysql.query(`
                            insert into general_db_id.objective (task_id, objective_name)
                                values ${stringQuery}
                        `, function(resultOfQueryThree){
                            return utils.ok200(null, "Successfully Created")
                        }, function(err){
                            console.error('Error: ', err)
                            return utils.nok200(2, `Something goes wrong: ${err}`);
                        })
                    }, function(err){
                        console.error('Error: ', err);
                        return utils.nok200(2, `Something goes wrong: ${err}`);
                    })

                }else{
                    return utils.nok200(1, null)
                }

            }, function(err){
                console.error('Error: ', err);
                return utils.nok200(2, `Something goes wrong: ${err}`);
            });
        });
    }catch(err){
       return utils.nok200(2, `Something goes wrong: ${err}`);
    }
});

// @router GET by ID /api/task/get/:id
// to get detail task
router.get('/get/:id', function(req, res, next){
    const utils = new UtilsApi(req, res, next)
    try{
        mysql.query(`
        select count(1) as count
            from general_db_id.task as t
                where true and 
                    t.task_id = ${mysql.escape(req.params.id)}
        `, function(resultOfQuery){
            if(resultOfQuery[0].count === 0){
                return utils.nok200(3, null)
            }else{
                mysql.query(`
                    select 
                        t.task_id,
                        t.title,
                        UNIX_TIMESTAMP(t.action_time) as action_time,
                        t.is_finished,
                        UNIX_TIMESTAMP(t.time_created) as time_created,
                        UNIX_TIMESTAMP(t.time_updated) as time_updated
                         from general_db_id.task as t
                            where true and 
                            t.task_id = ${mysql.escape(req.params.id)};
                    select 
                      o.is_finished,
                      o.objective_name
                      from general_db_id.task as t
                      inner join general_db_id.objective as o on t.task_id = o.task_id
                        where true and 
                            o.task_id = ${mysql.escape(req.params.id)};
                `, function(resultOfQueryTwo){
                    return utils.ok200({
                        task_id: resultOfQueryTwo[0][0].task_id,
                        title: resultOfQueryTwo[0][0].title,
                        action_time: resultOfQueryTwo[0][0].action_time,
                        is_finished: resultOfQueryTwo[0][0].is_finished,
                        time_created: resultOfQueryTwo[0][0].time_created,
                        time_updated: resultOfQueryTwo[0][0].time_updated,
                        Objective_List: resultOfQueryTwo[1]
                    }, "successfully");
                }, function(err){
                    return utils.nok200(2, `Something goes wrong: ${err}`);
                })
            }
        }, function(err){
            console.error('Error: ', err)
            return utils.nok200(2, `Something goes wrong: ${err}`);
        })
    }catch(err){
        return utils.nok200(2, `Something goes wrong: ${err}`);
    }
});

module.exports = router;
