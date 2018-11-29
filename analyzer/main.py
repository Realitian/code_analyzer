from db import AnalysisDB
from analyzer import Analyzer

class Daemon:
    def __init__(self):
        pass

    def run(self):
        while True:
            self.start()

    def start(self):
        db = AnalysisDB()
        analyzer = Analyzer()

        jobs = db.get_todo_list()
        for job in jobs:
            url_id = job[0]
            url = job[1]

            (client_id, client_secret) = db.app_id()
            (user_name, repos) = analyzer.parse_url(url, client_id, client_secret)

            percent = 0
            total_repo_count = len(repos)
            current_repo_index = 0

            for (repo_name, repo_git_id) in repos:
                exist = db.add_repo(url_id, repo_git_id)
                if not exist:
                    (status_code, result) = analyzer.analyze(user_name, repo_name, client_id, client_secret)
                    db.set_repo_status(repo_git_id, status_code)

                    for (lang, size, line_count) in result:
                        db.add_repo_lang(repo_git_id, lang, size, line_count)

                current_repo_index+=1
                percent = 100*current_repo_index/total_repo_count
                db.update_percent(url_id, percent)

        db.closeDB()

if __name__ == '__main__':
    d = Daemon()
    d.run()