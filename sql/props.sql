create database immo_tracker;

create table immo_tracker.props
(
    id           int auto_increment
        primary key,
    name         varchar(255) not null,
    created_at   timestamp    null,
    updated_at   timestamp    null,
    url          varchar(255) null,
    area         int          null,
    distance_sea float        null,
    rooms        int          null,
    bathrooms    int          null,
    price        int          null,
    constraint props_url_uindex
        unique (url)
);
