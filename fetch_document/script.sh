#! /bin/bash
DISCIPLINE=$1
POWER=$2

cd fetch_document
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python fetch_doc.py $DISCIPLINE $POWER
deactivate
rm -r venv
cd ..