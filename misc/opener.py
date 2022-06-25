

# import OpenNRE.opennre as opennre
# model = opennre.get_model('wiki80_cnn_softmax')

# model.infer({'text': 'He was the son of Máel Dúin mac Máele Fithrich, and grandson of the high king Áed Uaridnach (died 612).', 'h': {'pos': (18, 46)}, 't': {'pos': (78, 91)}})

import OpenNRE.opennre as opennre
model = opennre.get_model('wiki80_cnn_softmax')
# print(model.infer({'text': 'He was the son of Máel Dúin mac Máele Fithrich, and grandson of the high king Áed Uaridnach (died 612).', 'h': {'pos': (18, 46)}, 't': {'pos': (78, 91)}}))

# # download NRE pretrained model
# model = opennre.get_model('wiki80_cnn_softmax')

# text used to look for relations
# text = """
# Kobe Bean Bryant was an American professional basketball player.
# A shooting guard, he spent his entire career with the Los Angeles Lakers in the NBA.
# """

text = """ 
In one of his first acts as president, Joe Biden issued an executive order returning the U.S. to the Paris Climate Agreement, which became official on Feb. 19 after a 30-day notice period. The U.S. had helped shape the accord under President Barack Obama but seven months after the pact took effect in late 2016, President Donald Trump withdrew the country.
"""

# choose two entities whose relation is to be predicted
h_text = "Donald Trump"
t_text = "The U.S."
h_pos = (text.index(h_text), text.index(h_text) + len(h_text))
t_pos = (text.index(t_text), text.index(t_text) + len(t_text))

# predict relation
print(model.infer({'text': text, 'h': {'pos': h_pos}, 't': {'pos': t_pos}}))



