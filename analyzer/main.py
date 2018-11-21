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
import queue
import threading
from analyzer import Analyzer
import json
from db import AnalysisDB

QUEUE_MAXSIZE = 2
WORKERS_MAXCOUNT = 10

class Service(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
        self.l = queue.Queue(maxsize=QUEUE_MAXSIZE)
        self.workers = []
        for i in range(0, WORKERS_MAXCOUNT):
            self.workers.append(Analyzer(i))

    def register(self, url):
        # register url to db and run analyzer for it.
        if self.l.full():
            message = 'Sorry, Bot is very busy. The queue had been full filled.'
            result = {'ok': False, 'msg': message}
            return json.dumps(result)

        print ('put url', url)
        self.l.put(url)

        message = 'request of ' + url + 'had been registered'
        result = {'ok': True, 'msg': message}

        print ('return result', message)

        return json.dumps(result)

    def run(self):
        while True:
            # print ('working')
            self.resolve()

    def resolve(self):
        # find idle worker in self.workers and let it to work with pop of self.l
        if self.l.empty():
            return

        for worker in self.workers:
            if worker.idle:
                url = self.l.get()
                print ('working on ', url)
                worker.set_url(url)
                worker.start()
                print ('started on', url)
                return

    def list(self):
        # get status from db and show them.
        db = AnalysisDB()
        result = db.list()
        db.closeDB()
        return json.dumps(result)

    def lang(self, url):
        # get status from db and show them.
        db = AnalysisDB()
        result = db.lang(url)
        db.closeDB()
        return json.dumps(result)

if __name__ == '__main__':
    l = Service()
    print (l.register('https://github.com/iamhosseindhv/notistack'))