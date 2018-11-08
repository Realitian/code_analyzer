import subprocess

def unzip(file):
    subprocess.call(['unzip', '-oq', file])

def zip_folder(folder):
    subprocess.call(['zip', '-rq9', folder+'.zip', folder])

def rmdir(dir):
    subprocess.call(['rm', '-rf', dir])

def rmfile(file):
    subprocess.call(['rm', file])

def download(url):
    subprocess.call(['wget', url])