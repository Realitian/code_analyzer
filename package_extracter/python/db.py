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

class AnalysisDB:
    def __init__(self):
        self.db = pymysql.connect(DB_CONFIG.IP_ADDRESS, DB_CONFIG.USER_NAME, DB_CONFIG.USER_PASSWORD, DB_CONFIG.DB_NAME, charset='utf8')

    def closeDB(self):
        cursor = self.db.cursor()
        cursor.close()
        self.db.close()

    def get_todo_list_python(self):
        sql = """SELECT repo_git_id FROM repo_packages WHERE python is NULL"""
        cursor = self.db.cursor()
        cursor.execute(sql)
        res = cursor.fetchall()
        return res

    def update_python_packages(self, packages, repo_git_id):
        for package in packages:
            try:
                sql = """INSERT INTO packages_python (name) VALUES (%s)"""
                cursor = self.db.cursor()
                cursor.execute(sql, (package))
                self.db.commit()
            except Exception as ex:
                if ex.args[0] != 1062:
                    print (ex)

        for package in packages:
            try:
                sql = """INSERT INTO packages_python_usage (repo_git_id, package_id) VALUES (%s, (SELECT id FROM packages_python WHERE name=%s))"""
                cursor = self.db.cursor()
                cursor.execute(sql, (repo_git_id, package))
                self.db.commit()
            except Exception as ex:
                if ex.args[0] != 1062:
                    print (ex)

    def set_python_extracted(self, repo_git_it):
        sql = """UPDATE repo_packages SET python=%s WHERE repo_git_id=%s"""
        cursor = self.db.cursor()
        cursor.execute(sql, (1, repo_git_it))
        self.db.commit()