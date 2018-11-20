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

    def status(self):
        sql = """SELECT * FROM analysis"""
        cursor = self.db.cursor()
        cursor.execute(sql)
        res = cursor.fetchall()
        return res