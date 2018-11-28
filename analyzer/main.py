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
            id = job[0]
            path = job[1]

            (client_id, client_secret) = db.app_id()
            (user_name, repos) = analyzer.parse_url(path, client_id, client_secret)

            percent = 0
            total_repo_count = len(repos)
            current_repo_index = 0

            for (repo_name, repo_git_id) in repos:
                repo_id = db.add_repo(id, user_name, repo_name, repo_git_id)
                (error, result) = analyzer.analyze(user_name, repo_name, client_id, client_secret)

                current_repo_index+=1
                percent = 100*current_repo_index/total_repo_count
                db.update_percent(id, percent)
                db.set_repo_err(repo_id, error)

                for (lang, size, line_count) in result:
                    db.add_repo_lang(repo_id, lang, size, line_count)

        db.closeDB()

if __name__ == '__main__':
    d = Daemon()
    d.run()