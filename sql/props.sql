create database immo_tracker;

create table immo_tracker.props
(
    id           int auto_increment
        primary key,
    user         varchar(255) null,
    name         varchar(255) null,
    created_at   timestamp    null,
    updated_at   timestamp    null,
    url          varchar(255) null,
    area         int          null,
    distance_sea float        null,
    rooms        int          null,
    bathrooms    int          null,
    price        int          null,
    deleted     tinyint not null default 0,
    constraint props_url_uindex
        unique (url)
);
