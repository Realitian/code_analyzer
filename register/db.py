import pymysql
from datetime import datetime

class DB_CONFIG:
    IP_ADDRESS = 'localhost'
    USER_NAME = "root"
    USER_PASSWORD = "rootroot"
    DB_NAME = "code_analysis"

class RegisterDB:
    def __init__(self):
        self.db = pymysql.connect(DB_CONFIG.IP_ADDRESS, DB_CONFIG.USER_NAME, DB_CONFIG.USER_PASSWORD, DB_CONFIG.DB_NAME, charset='utf8')

    def closeDB(self):
        cursor = self.db.cursor()
        cursor.close()
        self.db.close()

    def register(self, url):
        sql = """INSERT INTO registries (path, at) VALUES (%s, %s)"""
        cursor = self.db.cursor()
        cursor.execute(sql, (url, datetime.now()))
        self.db.commit()

    def list(self):
        sql = """SELECT id, path, percent FROM registries"""
        cursor = self.db.cursor()
        cursor.execute(sql)
        res = cursor.fetchall()
        return res

    def lang(self, url):
        sql = """SELECT id FROM registries WHERE path=%s"""
        cursor = self.db.cursor()
        cursor.execute(sql, url)
        res = cursor.fetchone()
        reg_id = res[0]

        sql = """SELECT lang, size, line_count from repo_langs WHERE repo_id in (SELECT id from repos WHERE reg_id=%s)"""
        cursor = self.db.cursor()
        cursor.execute(sql, reg_id)
        res = cursor.fetchall()

        statics = {}
        for file in res:
            lang = file[0]
            size = file[1]
            line_count = file[2]

            if lang in statics:
                sum_size = statics[lang][0]
                sum_line_count = statics[lang][1]
                sum_size += size
                line_count += line_count
                statics[lang] = (sum_size, sum_line_count)
            else:
                statics[lang] = (size, line_count)

        sorted(statics.iteritems())

        headers = ['Language', 'Size', 'Line Count']

        rows = []
        for key in statics:
            if not key is 'None':
                rows.append([key, statics[key][0], statics[key][1]])

        data = [
            {
                'title': 'Programming Languages Analysis Result',
                'headers': headers,
                'rows': rows
            }]

        return {'ok': True, 'data': data}