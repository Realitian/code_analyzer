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
from binaryornot.check import is_binary
from linguist.file_blob import FileBlob
import langdetect
import json
from util import *
from github import Github
from db import AnalysisDB
import os
from os.path import expanduser
import urlparse

REPO_MAX_SIZE = 100 #MB

ERR_CANNOT_DOWNLOAD = 1
ERR_EXCEED_SIZE_LIMIT = 2

class Analyzer:
    def __init__(self):
        self.dir = ''
        self.error = 0
        home = expanduser("~")
        self.repo_dir_root = home + '/git_repo/'
        try:
            os.mkdir(self.repo_dir_root)
        except Exception as ex:
            pass

    def parse_url(self, url, client_id, client_secret):
        re = urlparse.urlparse(url)
        repo_path = (re.path.split('/'))
        user_name = None
        repo_name = None
        if len(repo_path) > 2:
            user_name = repo_path[1]
            repo_name = repo_path[2]
            if repo_name == '':
                repo_name = None

        g = Github(client_id=client_id, client_secret=client_secret)

        repos = []
        gh_user = g.get_user(user_name)

        if repo_name is None:
            for repo in gh_user.get_repos():
                repos.append((repo.name, repo.id))
        else:
            repo = gh_user.get_repo(repo_name)
            repos.append((repo_name, repo.id))

        return (user_name, repos)

    def analyze(self, user_name, repo_name, client_id, client_secret):
        self.idle = False
        self.files = []
        self.lang = None

        g = Github(client_id=client_id, client_secret=client_secret)

        gh_user = g.get_user(user_name)
        repo = gh_user.get_repo(repo_name)
        repo_size_mb = repo.size / 1000

        url = 'https://github.com/' + user_name + '/' + repo_name
        if repo_size_mb < REPO_MAX_SIZE:
            self._analyze_repo(url, repo.id)
        else:
            self.error = ERR_EXCEED_SIZE_LIMIT

        statics = {}
        for file in self.files:
            if not file[1]:
                if file[4] in statics:
                    size = statics[file[4]][0]
                    line_count = statics[file[4]][1]
                    size += file[2]
                    line_count += file[3]
                    statics[file[4]] = (size, line_count)
                else:
                    statics[file[4]] = (file[2], file[3])

        result = []
        for key in statics:
            if not key is 'None':
                result.append([key, statics[key][0], statics[key][1]])

        return (self.error, result)

    def _analyze_repo(self, repo_url, id):
        default_branch = 'master'
        url = repo_url + '/archive/' + default_branch + '.zip'

        output_file = self.repo_dir_root + str(id)+'.zip'
        output_dir = self.repo_dir_root + str(id)

        command = subprocess.Popen(['wget', '--output-document', output_file, url], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        out, err = command.communicate()
        if err.find('200 OK') < 0:
            self.error = ERR_CANNOT_DOWNLOAD
        else:
            unzip_to(output_file, output_dir)

            self.dir = output_dir
            self._listdir(self.dir)

            # rmdir(output_dir)
            rmfile(output_file)

    def _listdir(self, d):
        if not os.path.isdir(d):
            try:
                file = os.path.relpath(d, self.dir)
                size = os.path.getsize(d)
                file_name = os.path.splitext(file)[0]
                if file_name == 'README':
                    with open(d, 'r') as content_file:
                        content = content_file.read()
                        if content:
                            try:
                                content = content.decode('utf-8')
                                self.lang = langdetect.detect(content)
                            except Exception as ex:
                                pass

                is_bin = is_binary(d)
                count = 0
                if not is_bin:
                    count = len(open(d).readlines())
                language = None
                try:
                    language = FileBlob(d).language.name
                except Exception as ex:
                    language = 'None'
                self.files.append((file, is_bin, size, count, language))
            except Exception as ex:
                print (d, ex)
        else:
            for item in os.listdir(d):
                self._listdir((d + '/' + item) if d != '/' else '/' + item)