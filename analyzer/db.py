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

    def add_repo(self, reg_id, user_name, repo_name, repo_git_id):
        try:
            sql = """INSERT INTO repos (reg_id, user_name, repo_name, git_id) VALUES (%s, %s, %s, %s)"""
            cursor = self.db.cursor()
            cursor.execute(sql, (reg_id, user_name, repo_name, repo_git_id))
            self.db.commit()
        except:
            pass

        sql = """SELECT id FROM repos WHERE user_name=%s and repo_name=%s"""
        cursor = self.db.cursor()
        cursor.execute(sql, (user_name, repo_name))
        res = cursor.fetchone()
        repo_id = res[0]

        try:
            sql = """INSERT INTO repo_packages (repo_id) VALUES (%s)"""
            cursor = self.db.cursor()
            cursor.execute(sql, (repo_id))
            self.db.commit()
        except:
            pass

        return repo_id

    def set_repo_err(self, repo_id, err_code):
        sql = """UPDATE repos SET err_code=%s WHERE id=%s"""
        cursor = self.db.cursor()
        cursor.execute(sql, (err_code, repo_id))
        self.db.commit()

    def add_repo_lang(self, repo_id, lang, size, line_count):
        try:
            sql = """INSERT INTO repo_langs (repo_id, lang, size, line_count) VALUES (%s, %s, %s, %s)"""
            cursor = self.db.cursor()
            cursor.execute(sql, (repo_id, lang, size, line_count))
            self.db.commit()
        except:
            pass

    def update_repo_package_javascript(self, repo_id, javascript):
        pass

    def update_percent(self, id, percent):
        sql = """UPDATE registries SET percent=%s WHERE id=%s"""
        cursor = self.db.cursor()
        cursor.execute(sql, (percent, id))
        self.db.commit()

    def get_todo_list(self):
        sql = """SELECT id, path FROM registries WHERE percent is NULL"""
        cursor = self.db.cursor()
        cursor.execute(sql)
        res = cursor.fetchall()
        return res

    def current_app_index(self):
        sql = """SELECT id FROM current_app_id"""
        cursor = self.db.cursor()
        cursor.execute(sql)
        res = cursor.fetchone()
        return res[0]

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