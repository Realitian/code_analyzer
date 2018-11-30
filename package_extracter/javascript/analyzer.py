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

import json
import os
from os.path import expanduser
import ntpath

class Analyzer:
    def __init__(self):
        self.dir = ''
        self.error = 0
        home = expanduser("~")
        self.repo_dir_root = home + '/git_repo/'

    def extract_javascript_packages(self, repo_git_id):
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
                file = os.path.relpath(d, self.dir)
                file_name = self._path_leaf(file)
                if file_name == 'package.json':
                    self.packages.extend(self._parse_package_json(d))
            except Exception as ex:
                print (d, ex)
        else:
            for item in os.listdir(d):
                self._listdir((d + '/' + item) if d != '/' else '/' + item)

    def _parse_package_json(self, file):
        json_data = open(file)
        data = json.load(json_data)
        json_data.close()

        packages = []

        if 'dependencies' in data:
            dependencies = data['dependencies']
            packages.extend(list(dependencies))

        if 'devDependencies' in data:
            devDependencies = data['devDependencies']
            packages.extend(list(devDependencies))

        return packages