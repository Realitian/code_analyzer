from lib.google_search_results import GoogleSearchResults
from db import SearchDB
import time

def reg_search_terms():
    db = SearchDB()
    with open('entry.txt') as f:
        lines = f.readlines()

        for line in lines:
            term = line.replace('\n', '')

            db.reg_term(term)

    db.closeDB()

def search():
    db = SearchDB()

    for (id, term) in db.list_term():
        q = 'what is "' + term + '" in software developer skills?'
        print (q)

        params = {
            "q" : q,
            "location" : "Austin, Texas, United States",
            "hl" : "en",
            "gl" : "us",
            "google_domain" : "google.com",
            "api_key" : "0743dfb6d57d4f9a64668e9b1facb0a02362d4494884c09e4b573624eb574866",
        }

        try:
            query = GoogleSearchResults(params)
            dictionary_results = query.get_dictionary()

            organic_results = dictionary_results['organic_results']

            for result in organic_results:
                title = result['title']
                snippet = result['snippet']
                link = result['link']

                try:
                    db.register(term, title, snippet, link)
                except Exception as ex:
                    print (ex)

            db.set_term_had_search(id)
        except Exception as ex:
            print (ex)

            time.sleep(1200)

    db.closeDB()

if __name__ == '__main__':
    # reg_search_terms()
    search()