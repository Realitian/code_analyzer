import os
import mimetypes
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

if __name__ == '__main__':
    db = AnalysisDB()
    (client_id, client_secret) = db.app_id()
    g = Github(client_id=client_id, client_secret=client_secret)
    user = g.get_user('aymericdamien')
    repo = g.get_repo('aymericdamien/TensorFlow-Examples')
    print(user.bio, repo.get_languages())
    print (repo.get_topics())