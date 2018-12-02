drop table top_javascript_packages;
drop table top_javascript_packages_names;
CREATE table top_javascript_packages SELECT package_id, count(repo_git_id) from packages_javascript_usage GROUP BY package_id;
create table top_javascript_packages_names SELECT packages_javascript.name, top_javascript_packages.`count(repo_git_id)` FROM packages_javascript INNER JOIN top_javascript_packages on packages_javascript.id=top_javascript_packages.package_id;

DROP TABLE top_python_packages;
drop table top_python_packages_names;
create table top_python_packages SELECT package_id, count(repo_git_id) from packages_python_usage GROUP BY package_id;
CREATE table top_python_packages_names SELECT packages_python.name, top_python_packages.`count(repo_git_id)` from packages_python INNER JOIN top_python_packages on packages_python.id=top_python_packages.package_id;