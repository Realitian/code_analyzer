import os
from binaryornot.check import is_binary
from linguist.file_blob import FileBlob
import langdetect
import json
import subprocess
from util import *

class Analyzer:
    def __init__(self):
        self.dir = ''
        self.files = []
        self.lang = None

    def analyze(self, repo_url):
        self.download_repo(repo_url)

        unzip(zip_file_name)
        unziped_folder_name = repo[2] + '-master'

        list_dir = ListDir(unziped_folder_name)
        list_dir.do()
        total_file_count = len(list_dir.files)
        readme_lang = list_dir.lang

        rmdir(unziped_folder_name)

        subprocess.call(['rm', 'master.zip'])

        return json.dumps(['Test', 'Success'])

    def download_repo(self, repo_url):
        try:
            default_branch = 'master'
            url = repo_url + '/archive/' + default_branch + '.zip'

            command = subprocess.Popen(['wget', url], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            out, err = command.communicate()
            if err.find('200 OK') < 0:
                return {err: 'could not download repository'}
            else:

        except Exception as ex:
            pass

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
    path = '/home/jin/Downloads/grpc-master'
    l = Analyzer(path)
    l.do()