-- for all of this file saved DDL, DML, for changes on the database.
-- this is for needed track of records (historical)
create table if not exists general_db_id.task(
	task_id int unsigned auto_increment primary key,
	title varchar(256) default null unique,
	action_time timestamp null,
	is_finished boolean default false,
	time_created timestamp default current_timestamp,
	time_updated timestamp null
)ENGINE=InnoDB;

create table if not exists general_db_id.objective(
	id int unsigned auto_increment primary key,
	task_id int unsigned,
	objective_name varchar(256) default null unique,
	is_finished boolean default false,
	time_created timestamp default current_timestamp,
	time_updated timestamp null
)ENGINE=InnoDB;

-- triger has purposed update automation task when all of record on objective has been completly
create definer=`root`@`localhost` trigger `automation_update_task` after update on `objective`
	for each row
begin
	set @status = (
		select count(1) as count from general_db_id.objective o
			where true and ( select count(1) as count from general_db_id.objective o2 where true and o2.task_id = new.task_id) = ( select count(1) as count from general_db_id.objective o3 where true and o3.task_id = new.task_id and o3.is_finished = 1 )
	);
	if @status <> 0 then
		update general_db_id.task set is_finished = 1, time_updated = CURRENT_TIMESTAMP()  where task_id = new.task_id;
	else
		update general_db_id.task set is_finished = 0, time_updated = CURRENT_TIMESTAMP() where task_id = new.task_id;
	end if;
end;
