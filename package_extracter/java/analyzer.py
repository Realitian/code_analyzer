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
import xml.etree.ElementTree as ET

class Analyzer:
    def __init__(self):
        self.dir = ''
        self.error = 0
        home = expanduser("~")
        self.repo_dir_root = home + '/git_repo/'

    def extract_java_packages(self, repo_git_id):
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
                if file_name == 'pom.xml':
                    self.packages.extend(self._parse_pom_xml(d))
            except Exception as ex:
                print (d, ex)
        else:
            for item in os.listdir(d):
                self._listdir((d + '/' + item) if d != '/' else '/' + item)

    def _parse_pom_xml(self, file):
        packages = []

        tree = ET.parse(file)
        root = tree.getroot()
        for child in root:
            if 'dependencies' in child.tag:
                for dependency in child:
                    groupId = None
                    artifactId = None

                    for item in dependency:
                        if 'groupId' in item.tag:
                            groupId = item.text

                        if 'artifactId' in item.tag:
                            artifactId = item.text

                    packages.append( groupId + '/' + artifactId )

        return packages

if __name__ == '__main__':
    a = Analyzer()
    xml = '/home/jin/Downloads/pom.xml'
    print (a._parse_pom_xml(xml))