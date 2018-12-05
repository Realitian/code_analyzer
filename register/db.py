import pymysql
from datetime import datetime

class DB_CONFIG:
    IP_ADDRESS = 'localhost'
    USER_NAME = "root"
    USER_PASSWORD = "rootroot"
    DB_NAME = "code_analysis"

    # IP_ADDRESS = 'code.turing.services'
    # USER_NAME = "turingdev"
    # USER_PASSWORD = "turing2018"
    # DB_NAME = "code_analysis"

class RegisterDB:
    def __init__(self):
        self.db = pymysql.connect(DB_CONFIG.IP_ADDRESS, DB_CONFIG.USER_NAME, DB_CONFIG.USER_PASSWORD, DB_CONFIG.DB_NAME, charset='utf8')

    def closeDB(self):
        cursor = self.db.cursor()
        cursor.close()
        self.db.close()

    def register(self, url):
        sql = """INSERT INTO registerd_urls (url, at) VALUES (%s, %s)"""
        cursor = self.db.cursor()
        cursor.execute(sql, (url, datetime.now()))
        self.db.commit()

    def list(self):
        sql = """SELECT id, url, percent FROM registerd_urls ORDER BY at DESC"""
        cursor = self.db.cursor()
        cursor.execute(sql)
        res = cursor.fetchall()

        data = []
        for row in res:
            data.append({
                'id': row[0],
                'url': row[1],
                'percent': str(row[2]) + '%',
            })

        return {'data': data}

    def lang(self, url):
        sql = """SELECT lang, size, line_count from repo_langs WHERE repo_git_id in (SELECT git_id from registerd_repos WHERE url_id in (SELECT id FROM registerd_urls WHERE url=%s))"""
        cursor = self.db.cursor()
        cursor.execute(sql, url)
        res = cursor.fetchall()

        headers = ['Language', 'Size', 'Line Count']

        statics = {}
        for file in res:
            lang = file[0]
            size = file[1]
            line_count = file[2]

            if lang in statics:
                size += statics[lang][0]
                line_count += statics[lang][1]
                statics[lang] = (size, line_count)
            else:
                statics[lang] = (size, line_count)

        rows = []
        for lang in statics:
            size = statics[lang][0]
            line_count = statics[lang][1]

            if lang is not 'None':
                rows.append([lang, size, line_count])

        data = [
            {
                'title': 'Programming Languages Analysis Result',
                'headers': headers,
                'rows': rows
            }]

        return {'ok': True, 'data': data}

    def packages_usage(self, lang):
        res = None
        try:
            sql = ''
            if lang == 'javascript':
                sql = """SELECT name, `count(repo_git_id)` FROM top_javascript_packages_names"""
            elif lang == 'python':
                sql = """SELECT name, `count(repo_git_id)` FROM top_python_packages_names"""
            elif lang == 'java':
                sql = """SELECT name, `count(repo_git_id)` FROM top_java_packages_names"""
            else:
                return []

            cursor = self.db.cursor()
            cursor.execute(sql)
            res = cursor.fetchall()
        except Exception as ex:
            print(ex)

        return res

    def repo_packages_usage(self, lang, url):
        res = None
        try:
            sqls = []
            if lang == 'JavaScript':
                sqls.append( """CREATE TEMPORARY table temp (SELECT package_id, count(repo_git_id) FROM packages_javascript_usage WHERE repo_git_id in (SELECT git_id from registerd_repos WHERE url_id in (SELECT id FROM registerd_urls WHERE url=%s)) GROUP BY package_id)""" )
                sqls.append( """SELECT packages_javascript.name, temp.`count(repo_git_id)` from temp join packages_javascript on packages_javascript.id=temp.package_id""" )
                sqls.append( """drop table temp""" )
            elif lang == 'Python':
                sqls.append("""CREATE TEMPORARY table temp (SELECT package_id, count(repo_git_id) FROM packages_python_usage WHERE repo_git_id in (SELECT git_id from registerd_repos WHERE url_id in (SELECT id FROM registerd_urls WHERE url=%s)) GROUP BY package_id)""")
                sqls.append("""SELECT packages_python.name, temp.`count(repo_git_id)` from temp join packages_python on packages_python.id=temp.package_id""")
                sqls.append("""drop table temp""")
            elif lang == 'Java':
                sqls.append("""CREATE TEMPORARY table temp (SELECT package_id, count(repo_git_id) FROM packages_java_usage WHERE repo_git_id in (SELECT git_id from registerd_repos WHERE url_id in (SELECT id FROM registerd_urls WHERE url=%s)) GROUP BY package_id)""")
                sqls.append("""SELECT packages_java.name, temp.`count(repo_git_id)` from temp join packages_java on packages_java.id=temp.package_id""")
                sqls.append("""drop table temp""")
            else:
                return []

            cursor = self.db.cursor()
            cursor.execute(sqls[0], url)

            cursor = self.db.cursor()
            cursor.execute(sqls[1])

            res = cursor.fetchall()

            cursor = self.db.cursor()
            cursor.execute(sqls[2])
        except Exception as ex:
            print(ex)

        return res
