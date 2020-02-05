drop table admin;
drop table chatrooms;
drop table chat_junc;
drop table messages;

create table admin (
id serial PRIMARY key,
email text,
password text,
name text
);

create table chatrooms (
id serial PRIMARY KEY
);

create table chat_junc (
id serial PRIMARY key,
chatroom_id INT REFERENCES chatrooms(id),
admin_id int REFERENCES admin(id)
);

create table messages (
id serial PRIMARY key,
chatroom_id int REFERENCES chatrooms(id),
content text,
sender_id int REFERENCES admin(id),
name text
);

insert into admin (email, password, name)
values  ('1','1','aaron'),
('1','1','Jules'),
('2','2','Carly'),
('3','3','Behr'),
('4','4','Ellsion');