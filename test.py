from enum import unique
import json
from itertools import groupby
from pprint import pp

with open("sample2.json") as file:
    text = file.read()
    text_data = json.loads(text)
    activities = text_data["activity_done"]
    list_characters = []
    for subject in activities:
        character = subject["subject"]
        list_characters.append(character)
    unique_subjects = set(list_characters) 


    #TODO: Fix the Context String Split
    list_of_actions = [activity['object'] for activity in activities]
    list_of_context = [[activity['context']] for activity in activities] 
    action_by_context = dict(zip(list_of_actions, list_of_context)) 


    activities_by_subject = {
        character: action_by_context
        for character in unique_subjects
    }

    pp(activities_by_subject)