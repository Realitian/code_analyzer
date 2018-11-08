import os
from binaryornot.check import is_binary
from linguist.file_blob import FileBlob
import langdetect
import json
from util import *

class Analyzer:
    def __init__(self):
        self.dir = ''

    def analyze(self, repo_url):
        self.files = []
        self.lang = None

        result = None

        try:
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
    l = Analyzer()
    print (l.analyze('https://github.com/gameplay3d/GamePlay'))