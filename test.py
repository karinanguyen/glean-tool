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

    activities_by_subject = {
        character: [
            activity['object'] for activity in activities if activity["subject"] == character
        ]
        for character in unique_subjects
    }
    pp(activities_by_subject)
