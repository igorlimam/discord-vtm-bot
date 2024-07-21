#python3 -m venv venv
#python fetch_doc.py <discipline> <power> -- lowercase separated by '-'
import sys
import json
import gdown
import ahocorasick_rs

from titlecase import titlecase

def write_json(discipline, power_description):
    power_description['Discipline'] = titlecase(discipline)
    with open('getPower.json', 'w') as fp:
        json.dump(power_description, fp)

def get_stripped_text(content, start):
    text = content[start::]
    text = text[:text.find('\\n'):].strip().replace("\\n", "")
    return text

def get_current_key(keys, text):
    for i in range(len(keys)):
        if(text.startswith(keys[i])):
            return i
    return 0

def choose_text(content, start, prox_anchor_index):
    #for Atavism description
    original = content[start:start + prox_anchor_index:].strip().replace("\\n", "")
    plus = content[start::].find('"')
    fix = content[start:start + plus:].strip().replace("\\n", "")
    if("{" in original): return fix
    return original

def rec_content(content, start, anchor, object={}, keys=['description', 'source', 'dice pools', 'cost', 'system', 'duration']):
    if(keys == []): return object
    text = get_stripped_text(content, start)
    current_key = keys.pop(get_current_key(keys, text))
    prox_anchor_index = content[start::].find(anchor)
    text = choose_text(content, start, prox_anchor_index)
    if current_key == 'Duration': text = get_stripped_text(content, start)
    if text.startswith(current_key): text = text[text.find(":") + 2::]
    object[titlecase(current_key)] = titlecase(text)
    #import pdb; pdb.set_trace()
    return rec_content(content, start + prox_anchor_index + 1, anchor, object, keys)


def aho_power(starting_index):
    ahop = ahocorasick_rs.AhoCorasick([power])
    for _, pstart, pfinish in ahop.find_matches_as_indexes(content):
        if pfinish > starting_index:
            l = pstart - 2
            r = pfinish + 2
            slcp = slice(l, r)
            if content[slcp].startswith("\\n") and content[slcp].endswith('\\n'):
                anchor_point = "■"
                return rec_content(content, pfinish, anchor_point)

doc_url = "https://docs.google.com/document/d/1GMCWygwa8hh9ygY0YMCsPptlAas3tfUDPLYCIBbSPaE/edit"
output_doc = "./disciplinas.txt"
gdown.download(url=doc_url, output=output_doc, fuzzy=True)

discipline = sys.argv[1]
anchor_string = "back to contents"
ancsize = len(anchor_string)
power = " ".join(sys.argv[2].split('-'))
with open(output_doc) as doc:
    content = doc.read().lower()
    aho = ahocorasick_rs.AhoCorasick([discipline])
    for _, start, finish in aho.find_matches_as_indexes(content):
        l = finish + 2
        r = l + ancsize
        slc = slice(l, r)
        if content[slc] == anchor_string:
            starting_index = finish
            write_json(discipline, aho_power(starting_index))


# Para disciplina: Você estará no nome correto se logo em seguida tiver um "Back do contents". Você pode fazer um ponteiro duplo.
# use this to generate a .json
# Back to Contents