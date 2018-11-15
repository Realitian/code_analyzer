# -*- coding: utf-8 -*-

import re
from os.path import splitext

XCODE_PROJECT_EXT_NAMES = ('.xib', '.nib', '.storyboard', '.pbxproj',
                           '.xcworkspacedata', '.xcuserstate')


class Generated(object):

    def __init__(self, name, data):
        self.name = name
        self.ext_name = splitext(self.name)[1].lower()
        self._data = data

    def __repr__(self):
        return '<Generated name:%s>' % self.name

    @classmethod
    def is_generated(cls, name, data):
        return cls(name, data)._is_generated

    @property
    def data(self):
        if hasattr(self, 'real_data'):
            return self.real_data
        self.real_data = self._data() if callable(self._data) else self._data
        return self.real_data

    @property
    def lines(self):
        return self.data and self.data.split("\n", -1) or []

    @property
    def _is_generated(self):
        return any((self.name == "Gemfile.lock",
                    self.is_minified_files,
                    self.is_compiled_coffeescript,
                    self.is_xcode_project_file,
                    self.is_generated_parser,
                    self.is_generated_net_docfile,
                    self.is_generated_net_designer_file,
                    self.is_generated_protocol_buffer,
                    self.is_generated_jni_header))

    @property
    def is_xcode_project_file(self):
        """
        Internal: Is the blob an XCode project file?

        Generated if the file extension is an XCode project
        file extension.

        Returns True of False.
        """
        return self.ext_name in XCODE_PROJECT_EXT_NAMES

    @property
    def is_minified_files(self):
        """
        Internal: Is the blob minified files?

        Consider a file minified if it contains more than 5% spaces.
        Currently, only JS and CSS files are detected by this method.

        Returns True or False.
        """
        if self.ext_name not in ('.js', '.css'):
            return False
        if self.data and len(self.data) > 200:
            count_space = sum([1 for _ in self.data if _ <= ' '])
            return (count_space / float(len(self.data))) < 0.05
        return False

    @property
    def is_compiled_coffeescript(self):
        """
        Internal: Is the blob of JS generated by CoffeeScript?

        CoffeeScript is meant to output JS that would be difficult to
        tell if it was generated or not. Look for a number of patterns
        output by the CS compiler.

        Return True or False
        """
        if self.ext_name != ".js":
            return False

        lines = self.lines

        # CoffeeScript generated by > 1.2 include a comment on the first line
        if len(lines) > 0 \
                and re.compile('^\/\/ Generated by ', re.DOTALL).search(lines[0]):
            return True

        if len(lines) < 3:
            return False

        if len(lines) > 2 \
                and lines[0] == '(function() {'  \
                and lines[-2] == '}).call(this);' \
                and lines[-1] == '':
            # First line is module closure opening
            # Second to last line closes module closure
            # Last line is blank
            score = 0
            count_keys = lambda r, s: len(re.compile(r, re.DOTALL).findall(s))
            for line in lines:
                if re.compile('var ', re.DOTALL).search(line):
                    # Underscored temp vars are likely to be Coffee
                    score += 1 * count_keys('(_fn|_i|_len|_ref|_results)', line)
                    # bind and extend functions are very Coffee specific
                    score += 3 * count_keys('(__bind|__extends|__hasProp|__indexOf|__slice)', line)
            return score > 3
        return False

    @property
    def is_generated_net_docfile(self):
        """
        Internal: Is this a generated documentation file for a .NET assembly?

        .NET developers often check in the XML Intellisense file along with an
        assembly - however, these don't have a special extension, so we have to
        dig into the contents to determine if it's a docfile. Luckily, these files
        are extremely structured, so recognizing them is easy.

        Returns True or False
          return false unless extname.downcase == ".xml"
          return false unless lines.count > 3
        """
        if self.ext_name != ".xml":
            return False

        lines = self.lines

        if len(lines) < 3:
            return False

        """
        .NET Docfiles always open with <doc> and their first tag is an
        <assembly> tag
        """
        return '<doc>' in lines[1] \
               and '<assembly>' in lines[2] \
               and '</doc>' in lines[-2]

    @property
    def is_generated_net_designer_file(self):
        """
        Internal: Is this a codegen file for a .NET project?

        Visual Studio often uses code generation to generate partial
        classes, and these files can be quite unwieldy. Let's hide them.

        Returns true or false
        """
        return self.name.lower().endswith('.designer.cs')

    @property
    def is_generated_parser(self):
        """
        Internal: Is the blob of JS a parser generated by PEG.js?

        PEG.js-generated parsers are not meant to be consumed by humans.

        Return True or False
        """
        if self.ext_name != ".js":
            return False

        # PEG.js-generated parsers include a comment near the top  of the file
        # that marks them as such.
        lines = self.lines
        if len(lines) < 5:
            return False

        if re.compile('^(?:[^\/]|\/[^\*])*\/\*(?:[^\*]|\*[^\/])*Generated by PEG.js', re.DOTALL).search(''.join(lines[0:5])):
            return True
        return False

    @property
    def is_generated_protocol_buffer(self):
        """
        Internal: Is the blob a C++, Java or Python source file generated by the
        Protocol Buffer compiler?

        Returns true of false.
        """
        if self.ext_name not in ('.py', '.java', '.h', '.cc', '.cpp'):
            return False

        if len(self.lines) < 1:
            return False

        return 'Generated by the protocol buffer compiler.  DO NOT EDIT!' in self.lines[0]

    @property
    def is_generated_jni_header(self):
        """
        Internal: Is the blob a C/C header generated by the Java JNI tool javah?

        Returns true of false.
        """
        if self.ext_name != '.h':
            return False
        if len(self.lines) < 2:
            return False

        return all(("/* DO NOT EDIT THIS FILE - it is machine generated */" in self.lines[0],
                    "#include <jni.h>" in self.lines[1]))

    @property
    def is_node_modules(self):
        """
        node_modules/ can contain large amounts of files, in general not meant
        for humans in pull requests.

        Returns true or false.
        """
        return bool(re.compile('node_modules/').search(self.name))