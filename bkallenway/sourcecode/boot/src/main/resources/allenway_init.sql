

#加入ADMIN用户
INSERT INTO tb_admin(id,is_delete,birthday,email,github,nick_name,password,qq,salt,username,wechat) VALUES ('aaac4e63-da8b-4def-a86c-6543d80a8a59',FALSE,'1992-07-12 00:00:00','wuhuachuan712@163.com','https://github.com/pzxwhc','Allenway','7ace744ae7ff0e9eb6d32d6f2e663b0f9ee3cef3','748227431','a8a62d98-9432-4a03-b446-6c017d607aa1','admin','pw215712');

#加入默认Categories分类
insert into tb_classify(id,is_delete,name,parent_classify_id,article_num) values('aaac4e63-da8b-4def-a86c-6543d80a8a59',FALSE,'技术 Technique','',0);
insert into tb_classify(id,is_delete,name,parent_classify_id,article_num) values('aaac4e63-da8b-4def-a86c-6543d80a8a58',FALSE,'杂谈 Talk','',0);
insert into tb_classify(id,is_delete,name,parent_classify_id,article_num) values('aaac4e63-da8b-4def-a86c-6543d80a8a57',FALSE,'生活 Life','',0);


#加入默认Tag
insert into tb_tag(id,is_delete,name) values('aaac4e63-da8b-4def-a86c-7543d80a8a59',FALSE,'Spring Boot');
insert into tb_tag(id,is_delete,name) values('aaac4e63-da8b-4def-a86c-8543d80a8a59',FALSE,'RabbitMQ');
insert into tb_tag(id,is_delete,name) values('aaac4e63-da8b-4def-a86c-9543d80a8a59',FALSE,'Redis');

