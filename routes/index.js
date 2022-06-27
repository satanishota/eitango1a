const express = require('express');
const router = express.Router();
let sqlite3 = require('sqlite3');
const db = new sqlite3.Database('todo1a.db')//dbの名前

/* GET home page. */
router.get('/', (req, res, next)=>{
  db.serialize(()=>{//dbのメソッド
    db.all("select * from todo1b",(err,rows)=>{//SQliteのSQL文
      if(!err){
        let data={
          task:"wishlist",
          title: '英単語帳帳',
          content:rows  //行をループさせる
        };
        res.render('index', data ); //wishlist.ejsをレンダーする
      }
    })
  })
}) ;

/* add page. */

router.get('/add', (req, res, next) => {
  // var data = {
  //   title: '新規登録',
  //   content: '新しいレコードを入力'
  // }
  // console.log(req.method);
  // console.log(req.query.name)
  res.render('add');
});
router.post('/add', (req, res, next) => {
  
    let task = req.body.task
    let status = req.body.status
    
    db.serialize(()=>{
      db.exec(`insert into todo1b (task,status) values("${task}","${status}")`,(stat,error)=>{
        res.redirect('/');
      });
  
    });
  });

  //edit
  router.get('/edit', (req, res, next) => {
    var id = req.query.id;
   
    db.all('SELECT * from todo1b where id = ?', id, function (error, results) {
      //データベースアクセス完了時の処理
      
        var data = {
          content: 'id = ' + id + 'のレコードを更新します。',
          mydata: results[0]
        }
        res.render('edit', data);
      }
    );
  });

  router.put('/edit', (req, res, next) => {
    var id = req.body.id;
    let task = req.body.task
    let status = req.body.status
    // let time = req.body.created_at

    console.log(task)
    db.serialize(()=>{
    db.exec(`update todo1b set task = ${task} where id = "${id}"`,(stat,error)=>{
      res.redirect('/');
    })
  })
})

//delete
router.post('/delete', (req, res, next) => {
  var id =  req.body.id;
  db.serialize(()=>{
    db.exec(`delete from todo1b where id = "${id}"`,(stat,error)=>{
      
    });
    res.redirect('/');
  })
});

module.exports = router;
