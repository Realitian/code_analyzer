"""
/**************************************************************
 * Project          Data Collection & Analyze
 * (c) Copyright    2018 Turing Inc
 *                  All rights reserved
 **************************************************************/

/**
 * @file            analyzer.py
 * @ingroup         code analyzer
 * @author          Jin Chen Wu
 * @created_date    2018/11/18
 * @modified_date   2018/11/18
 */
"""

import os
from os.path import expanduser
import ntpath
from linguist.file_blob import FileBlob
import findimports

class Analyzer:
    def __init__(self):
        self.dir = ''
        self.error = 0
        home = expanduser("~")
        self.repo_dir_root = home + '/git_repo/'

    def extract_python_packages(self, repo_git_id):
        self.packages = []
        output_dir = self.repo_dir_root + str(repo_git_id)

        if not os.path.exists(output_dir):
            return self.packages

        self.dir = output_dir
        self._listdir(self.dir)

        return self.packages

    def _path_leaf(self, path):
        head, tail = ntpath.split(path)
        return tail or ntpath.basename(head)

    def _listdir(self, d):
        if not os.path.isdir(d):
            try:
                language = FileBlob(d).language.name
                if language == 'Python':
                    self.packages.extend(self._find_packages(d))
            except Exception as ex:
                pass
                # print (d, ex)
        else:
            for item in os.listdir(d):
                self._listdir((d + '/' + item) if d != '/' else '/' + item)

    def _find_packages(self, file):
        packages = set()
        imports = findimports.find_imports(file)
        for info in imports:
            package = info.name
            if '.' in package:
                dot = package.find('.')
                package = package[:dot]
            packages.add(package)

        # print (list(packages))
        return list(packages)

if __name__ == '__main__':
    a = Analyzer()
    a._find_packages('/sandbox/turing/repos/code_analyzer/package_extracter/python/analyzer.py')