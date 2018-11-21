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

REPO_MAX_SIZE = 100 #MB

class Analyzer:
    def __init__(self, id):
        self.id = id
        self.dir = ''
        self.idle = True

    def analyze(self, repo_url):
        db = AnalysisDB()
        try:
            db.insert_url(repo_url)
            db.closeDB()
        except Exception as ex:
            db.closeDB()
            print (ex)
            result = {'ok': False, 'msg': ex}
            self.finished(json.dumps(result))
            return

        self.idle = False
        self.files = []
        self.lang = None

        result = None

        print ('analyzing', repo_url)

        try:
            repo_path = (repo_url.split('/'))
            user_name = None
            repo_name = None
            for i in range(0, len(repo_path)):
                if repo_path[i] == 'github.com':
                    user_name = repo_path[i+1]
                    if len(repo_path) > i+2 and repo_path[i+2] is not '':
                        repo_name = repo_path[i+2]

            print (user_name, repo_name)

            if user_name is None and repo_name is None:
                result = {'ok': False, 'msg': 'invalid url'}
                self.finished( json.dumps(result) )

            db = AnalysisDB()
            (client_id, client_secret) = db.app_id()
            db.closeDB()
            print (client_id, client_secret)

            g = Github(client_id=client_id, client_secret=client_secret)

            if repo_name is None:
                gh_user = g.get_user(user_name)

                total = 0
                for repo in gh_user.get_repos():
                    total += 1

                current = 0
                for repo in gh_user.get_repos():
                    repo_name = repo.name
                    repo_size_mb = repo.size/1000
                    print ('size(MB)', repo_name, repo_size_mb)
                    url = 'https://github.com/' + user_name + '/' + repo_name
                    if repo_size_mb < REPO_MAX_SIZE:
                        self.analyze_repo(url)

                    db = AnalysisDB()
                    db.update_url(repo_url, 100*current/total, '')
                    print ('update', repo_url, 100*current/total)
                    db.closeDB()

                    current += 1
            else:
                url = 'https://github.com/' + user_name + '/' + repo_name
                gh_user = g.get_user(user_name)
                repo = gh_user.get_repo(repo_name)
                repo_size_mb = repo.size/1000
                print ('size(MB)', repo_name, repo_size_mb)
                if repo_size_mb < REPO_MAX_SIZE:
                    self.analyze_repo(url)

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

            print (statics)
            sorted(statics.iteritems())
            print (statics)

            headers = ['Language', 'Size', 'Line Count']

            rows = []
            for key in statics:
                if not key is 'None':
                    rows.append([key, statics[key][0], statics[key][1]])

            data = [
                {
                    'title': 'Programming Languages Analysis Result',
                    'headers': headers,
                    'rows': rows
                }]

            result = {'ok': True, 'data': data}
            db = AnalysisDB()
            db.update_url(repo_url, 100, json.dumps(result))
            db.closeDB()

        except Exception as ex:
            result = {'ok': False, 'msg': ex}

        self.finished( json.dumps(result) )

    def finished(self, result):
        self.result = result
        self.idle = True

    def analyze_repo(self, repo_url):
        default_branch = 'master'
        url = repo_url + '/archive/' + default_branch + '.zip'

        output_file = str(self.id)+'.zip'

        command = subprocess.Popen(['wget', '--output-document', output_file, url], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        out, err = command.communicate()
        if err.find('200 OK') < 0:
            result = {'ok': False, 'msg': 'could not download repository'}
        else:
            unzip_to(output_file, 'master')
            unziped_folder_name = 'master'

            self.dir = unziped_folder_name
            self.listdir(self.dir)

            rmdir(unziped_folder_name)
            rmfile(output_file)

    def listdir(self, d):
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
                self.listdir((d + '/' + item) if d != '/' else '/' + item)

    def do(self):
        self.listdir(self.dir)
        print (self.files)
        return len(self.files)

if __name__ == '__main__':
    l = Analyzer(0)
    print (l.analyze('https://github.com/google'))