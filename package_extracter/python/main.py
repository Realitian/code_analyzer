from db import AnalysisDB
from analyzer import Analyzer
import time

class Daemon:
    def __init__(self):
        pass

    def run(self):
        while True:
            try:
                self.start()
            except Exception as ex:
                print (ex)
                time.sleep(60)

    def start(self):
        db = AnalysisDB()
        analyzer = Analyzer()

        repos = db.get_todo_list_python()
        for (repo_git_it, ) in repos:
            packages = analyzer.extract_python_packages(repo_git_it)
            db.update_python_packages(packages, repo_git_it)
            db.set_python_extracted(repo_git_it)

        db.closeDB()

        if len(repos) == 0:
            time.sleep(10)

if __name__ == '__main__':
    d = Daemon()
    d.run()