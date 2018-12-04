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
import json
from register.db import RegisterDB
from analyzer.util import normalize_url

class Service:
    def __init__(self):
        pass

    def register(self, url):
        url = normalize_url(url)

        db = RegisterDB()
        if self.is_invalid(url):
            message = url + 'is invalid'
            result = {'ok': False, 'msg': message}
            return json.dumps(result)

        try:
            db.register(url)
        except Exception as ex:
            message = 'request of ' + url + 'had been registered'
            result = {'ok': True, 'msg': message}

        db.closeDB()

        message = 'request of ' + url + 'had been registered'
        result = {'ok': True, 'msg': message}
        return json.dumps(result)

    def list(self):
        db = RegisterDB()
        result = db.list()
        db.closeDB()
        return json.dumps(result)

    def lang(self, url):
        url = normalize_url(url)

        db = RegisterDB()
        result = db.lang(url)
        db.closeDB()
        return json.dumps(result)

    def packages_usage(self, lang):
        db = RegisterDB()
        result = db.packages_usage(lang)
        db.closeDB()
        return json.dumps(result)

    def repo_packages_usage(self, lang, url):
        db = RegisterDB()
        result = db.repo_packages_usage(lang, url)
        db.closeDB()
        return json.dumps(result)

    def is_invalid(self, url):
        repo_path = (url.split('/'))
        user_name = None
        repo_name = None
        for i in range(0, len(repo_path)):
            if repo_path[i] == 'github.com':
                user_name = repo_path[i + 1]
                if len(repo_path) > i + 2 and repo_path[i + 2] is not '':
                    repo_name = repo_path[i + 2]

        return user_name is None

if __name__ == '__main__':
    l = Service()
    print (l.register('https://github.com/iamhosseindhv/notistack'))