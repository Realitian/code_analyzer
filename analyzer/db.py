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


    """
    related to repo entries
    """
    def add_repo(self, url_id, repo_git_id):
        try:
            sql = """INSERT INTO registerd_repos (url_id, git_id) VALUES (%s, %s)"""
            cursor = self.db.cursor()
            cursor.execute(sql, (url_id, repo_git_id))
            self.db.commit()
        except:
            pass

        exist = False

        try:
            sql = """INSERT INTO repo_status (repo_git_id) VALUES (%s)"""
            cursor = self.db.cursor()
            cursor.execute(sql, (repo_git_id))
            self.db.commit()
        except:
            exist = True

        try:
            sql = """INSERT INTO repo_packages (repo_git_id) VALUES (%s)"""
            cursor = self.db.cursor()
            cursor.execute(sql, (repo_git_id))
            self.db.commit()
        except:
            pass

        return exist

    def set_repo_status(self, repo_git_id, status_code):
        sql = """UPDATE repo_status SET status_code=%s WHERE repo_git_id=%s"""
        cursor = self.db.cursor()
        cursor.execute(sql, (status_code, repo_git_id))
        self.db.commit()

    def add_repo_lang(self, repo_git_id, lang, size, line_count):
        try:
            sql = """INSERT INTO repo_langs (repo_git_id, lang, size, line_count) VALUES (%s, %s, %s, %s)"""
            cursor = self.db.cursor()
            cursor.execute(sql, (repo_git_id, lang, size, line_count))
            self.db.commit()
        except:
            pass


    """
    related to package entries
    """
    def update_repo_package_javascript(self, repo_git_id, javascript):
        pass


    """
    related to url entries
    """
    def update_percent(self, id, percent):
        sql = """UPDATE registerd_urls SET percent=%s WHERE id=%s"""
        cursor = self.db.cursor()
        cursor.execute(sql, (percent, id))
        self.db.commit()

    def get_todo_list(self):
        sql = """SELECT id, url FROM registerd_urls WHERE percent is NULL"""
        cursor = self.db.cursor()
        cursor.execute(sql)
        res = cursor.fetchall()
        return res

    def get_git_id_list(self):
        sql = """SELECT id FROM github.github_repos WHERE in_repo_zip_bucket ORDER BY RAND() LIMIT 10000"""
        # sql = """SELECT repo_git_id FROM repo_langs GROUP BY repo_git_id"""
        cursor = self.db.cursor()
        cursor.execute(sql)
        res = cursor.fetchall()
        return res

    def put_content(self, repo_git_id, is_binary, file_size, mime_type, mime_subtype, extension, lang):
        sql = """INSERT INTO repo_contents (repo_git_id, is_binary, file_size, mime_type, mime_subtype, extension, lang) VALUES (%s, %s, %s, %s, %s, %s, %s)"""
        cursor = self.db.cursor()
        cursor.execute(sql, (repo_git_id, is_binary, file_size, mime_type, mime_subtype, extension, lang))
        self.db.commit()

    """
    related to github app id
    """
    def current_app_index(self):
        sql = """SELECT id FROM current_app_id"""
        cursor = self.db.cursor()
        cursor.execute(sql)
        res = cursor.fetchone()
        return res[0]

    def next_app_index(self, app_id_index):
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
        self.next_app_index(app_id_index)
        return res