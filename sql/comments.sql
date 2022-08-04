create table immo_tracker.prop_comments
(
    id         int primary key auto_increment,
    id_prop    int          null,
    user       varchar(255) null,
    message    longtext null,
    tag        varchar(255) null,
    file_name  varchar(255) null,
    file_type  varchar(255) null,
    file_url   varchar(255) null,
    created_at timestamp    null,
    updated_at timestamp    null,
    constraint fk_id_prop_comments
        foreign key (id_prop) references immo_tracker.props (id)
)
