from db import AnalysisDB
from analyzer import Analyzer
import time

class Daemon:
    def test(self, repo_git_it):
        db = AnalysisDB()
        analyzer = Analyzer()
        packages = analyzer.extract_javascript_packages(repo_git_it)
        print (packages)
        # db.update_javascript_packages(packages, repo_git_it)
        db.closeDB()

if __name__ == '__main__':
    d = Daemon()
    d.test(69648943)