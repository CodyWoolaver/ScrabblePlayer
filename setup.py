import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
with open(os.path.join(here, 'README.txt')) as f:
    README = f.read()

def get_requirements(fn):
    requirements = [
        str(i.strip())
        for i in open(os.path.join(here, fn))
        if not i.startswith(('#', '-'))
    ]

    requirements = [
        req.split('#')[0]
        for req in requirements
        if req
    ]

    return requirements

requires = get_requirements('requirements.txt')

setup(
    name='scrabble_player',
    version='0.0',
    author='Cody Woolaver',
    author_email='pyro.699@gmail.com',

    url='https://github.com/CodyWoolaver/scrabble-player',

    description='Scrabble Player',
    long_description=README,

    include_package_data=True,
    zip_safe=True,

    classifiers=[
        'Programming Language :: Python',
        'Framework :: Pyramid',
        'Topic :: Internet :: WWW/HTTP',
        'Topic :: Internet :: WWW/HTTP :: WSGI :: Application',
    ],
    keywords='web pyramid pylons',
    packages=find_packages(),
    extras_require={},
    install_requires=requires,
    entry_points={
        'paste.app_factory': [
            'main = scrabble_player:main',
        ],
    },
)
