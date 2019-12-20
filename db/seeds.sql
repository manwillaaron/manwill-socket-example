create table admin (
id serial PRIMARY key,
email text,
password text
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
sender_id int REFERENCES admin(id)
);