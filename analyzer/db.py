import pymysql

class DB_CONFIG:
    IP_ADDRESS = 'localhost'
    USER_NAME = "root"
    USER_PASSWORD = "rootroot"
    DB_NAME = "code_analysis"

class AnalysisDB:
    def __init__(self):
        self.db = pymysql.connect(DB_CONFIG.IP_ADDRESS, DB_CONFIG.USER_NAME, DB_CONFIG.USER_PASSWORD, DB_CONFIG.DB_NAME, charset='utf8')

    def closeDB(self):
        cursor = self.db.cursor()
        cursor.close()
        self.db.close()

    def insert_url(self, url):
        sql = """INSERT INTO analysis (path) VALUES (%s)"""
        cursor = self.db.cursor()
        cursor.execute(sql, (url))
        self.db.commit()

    def update_url(self, url, percent, langs):
        sql = """UPDATE analysis SET percent=%s, langs=%s WHERE path=%s"""
        cursor = self.db.cursor()
        cursor.execute(sql, (percent, langs, url))
        self.db.commit()

    def list(self):
        sql = """SELECT id, path, percent FROM analysis"""
        cursor = self.db.cursor()
        cursor.execute(sql)
        res = cursor.fetchall()
        return res

    def lang(self, url):
        sql = """SELECT langs FROM analysis WHERE path=%s"""
        cursor = self.db.cursor()
        cursor.execute(sql, url)
        res = cursor.fetchone()
        return res

    def current_app_index(self):
        sql = """SELECT id FROM current_app_id"""
        cursor = self.db.cursor()
        cursor.execute(sql)
        res = cursor.fetchone()
        print ('current_app_index', res)
        return res

    def increase_app_index(self, app_id_index):
        if app_id_index > 12386:
            app_id_index = 0
        else:
            app_id_index += 1

        sql = """UPDATE current_app_id SET id=%s"""
        cursor = self.db.cursor()
        cursor.execute(sql, (app_id_index))
        self.db.commit()

    def app_id(self):
        sql = """SELECT client_id, client_secret FROM app_ids LIMIT 1 OFFSET %s"""
        cursor = self.db.cursor()
        app_id_index = self.current_app_index()
        cursor.execute(sql, app_id_index)
        res = cursor.fetchone()
        self.increase_app_index(app_id_index)
        return res