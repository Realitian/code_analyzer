import pymysql

class DB_CONFIG:
    IP_ADDRESS = 'localhost'
    USER_NAME = "root"
    USER_PASSWORD = "rootroot"
    DB_NAME = "code_analysis"

    # IP_ADDRESS = 'code.turing.services'
    # USER_NAME = "turingdev"
    # USER_PASSWORD = "turing2018"
    # DB_NAME = "code_analysis"

class SearchDB:
    def __init__(self):
        self.db = pymysql.connect(DB_CONFIG.IP_ADDRESS, DB_CONFIG.USER_NAME, DB_CONFIG.USER_PASSWORD, DB_CONFIG.DB_NAME, charset='utf8')

    def closeDB(self):
        cursor = self.db.cursor()
        cursor.close()
        self.db.close()

    def register(self, term, title, snippet, link):
        try:
            sql = """INSERT INTO search_result(term, title, snippet, link) VALUES (%s, %s, %s, %s)"""
            cursor = self.db.cursor()
            cursor.execute(sql, (term, title, snippet, link))
            self.db.commit()
        except Exception as ex:
            if ex.args[0] != 1062:
                print (ex)

    def list_term(self):
        sql = """SELECT id, term FROM search_terms WHERE had_search is NULL"""
        cursor = self.db.cursor()
        cursor.execute(sql)
        res = cursor.fetchall()
        return res

    def set_term_had_search(self, id):
        sql = """UPDATE search_terms SET had_search=%s WHERE id=%s"""
        cursor = self.db.cursor()
        cursor.execute(sql, (1, id))
        self.db.commit()

    def reg_term(self, term):
        try:
            sql = """INSERT INTO search_terms(term) VALUES (%s)"""
            cursor = self.db.cursor()
            cursor.execute(sql, (term))
            self.db.commit()
        except Exception as ex:
            if ex.args[0] != 1062:
                print (ex)
