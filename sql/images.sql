create table immo_tracker.images
(
    id         int primary key auto_increment,
    id_prop    int          null,
    nr         int          null,
    src        varchar(255) null,
    created_at timestamp    null,
    updated_at timestamp    null,
    constraint fk_id_prop
        foreign key (id_prop) references immo_tracker.props (id)
)
