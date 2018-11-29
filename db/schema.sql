create table app_ids
(
	`index` int null,
	client_id tinytext null,
	client_secret tinytext null
)
;

create table current_app_id
(
	id int null
)
;

create table packages_dotnet
(
	id int auto_increment
		primary key,
	name varchar(250) null
)
;

create table packages_dotnet_usage
(
	id int auto_increment
		primary key,
	repo_id int null,
	package_id int null
)
;

create table packages_java
(
	id int auto_increment
		primary key,
	name varchar(250) null
)
;

create table packages_java_usage
(
	id int auto_increment
		primary key,
	repo_id int null,
	package_id int null
)
;

create table packages_javascript
(
	id int auto_increment
		primary key,
	name varchar(250) null
)
;

create table packages_javascript_usage
(
	id int auto_increment
		primary key,
	repo_id int null,
	package_id int null
)
;

create table packages_python
(
	id int auto_increment
		primary key,
	name varchar(250) null
)
;

create table packages_python_usage
(
	id int auto_increment
		primary key,
	repo_id int null,
	package_id int null
)
;

create table packages_ruby
(
	id int auto_increment
		primary key,
	name varchar(250) null
)
;

create table packages_ruby_usage
(
	id int auto_increment
		primary key,
	repo_id int null,
	package_id int null
)
;

create table registerd_repos
(
	id int auto_increment
		primary key,
	git_id int null,
	url_id int null,
	constraint registerd_repos_git_id_url_id_pk
		unique (git_id, url_id)
)
;

create table registerd_urls
(
	id int auto_increment
		primary key,
	url varchar(255) null,
	at datetime null,
	percent int null,
	constraint registries_path_uindex
		unique (url)
)
;

create table repo_langs
(
	repo_git_id int not null,
	lang varchar(250) not null,
	size int null,
	line_count int null,
	primary key (repo_git_id, lang)
)
;

create table repo_packages
(
	repo_git_id int not null
		primary key,
	javascript int null,
	python int null,
	java int null,
	ruby int null,
	dotnet int null
)
;

create table repo_status
(
	repo_git_id int not null
		primary key,
	status_code int null
)
;

