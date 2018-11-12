"""
/**************************************************************
 * Project          Data Collection & Analyze
 * (c) Copyright    2018 Turing Inc
 *                  All rights reserved
 **************************************************************/

/**
 * @file            service.py
 * @ingroup         code analyzer
 * @author          Jin Chen Wu
 * @created_date    2018/11/08
 * @modified_date   2018/11/08
 * @brief           Declaration file of rest service.
 */
"""

import os
from binaryornot.check import is_binary
from linguist.file_blob import FileBlob
import langdetect
import json
from util import *
from github import Github

class Analyzer:
    def __init__(self):
        self.dir = ''

    def analyze(self, repo_url):
        self.files = []
        self.lang = None

        result = None

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
                return json.dumps(result)

            if repo_name is None:
                (client_id, client_secret) = ('aa0ceb15a379984e9fa2', '272d79f5b70eee55f6aac52147df5a9e5ae2f8cf')
                g = Github(client_id=client_id, client_secret=client_secret)

                gh_user = g.get_user(user_name)
                for repo in gh_user.get_repos():
                    repo_name = repo.name
                    repo_url = 'https://github.com/' + user_name + '/' + repo_name
                    self.analyze_repo(repo_url)
            else:
                repo_url = 'https://github.com/' + user_name + '/' + repo_name
                self.analyze_repo(repo_url)

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

            # print(sorted(key_value.items(), key=lambda kv: (kv[1], kv[0])))

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

        except Exception as ex:
            result = {'ok': False, 'msg': ex}

        return json.dumps(result)

    def analyze_repo(self, repo_url):
        default_branch = 'master'
        url = repo_url + '/archive/' + default_branch + '.zip'

        command = subprocess.Popen(['wget', url], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        out, err = command.communicate()
        if err.find('200 OK') < 0:
            result = {'ok': False, 'msg': 'could not download repository'}
        else:
            unzip_to('master.zip', 'master')
            unziped_folder_name = 'master'

            self.dir = unziped_folder_name
            self.listdir(self.dir)

            rmdir(unziped_folder_name)
            rmfile('master.zip')

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
    l = Analyzer()
    print (l.analyze('https://github.com/iamhosseindhv/notistack'))