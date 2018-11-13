import json

def node_parse(file):
    json_data = open(file)
    data = json.load(json_data)
    # pprint(data)
    json_data.close()

    dependencies = data['dependencies']

    for dependency in dependencies:
        print dependency

if __name__ == '__main__':
    print (node_parse('/sandbox/turing/repos/code_analyzer/frontend/package.json'))