create table users (
    id serial primary key,
    user_name VARCHAR(255) not null,
    email VARCHAR(255) unique not null,
    password VARCHAR (255) not null,
    created_at date default current_date
);


create table pokemon (
    
)