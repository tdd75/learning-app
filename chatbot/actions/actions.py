# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"
import urllib.request, json, urllib
from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
#
#
class ActionTranslate(Action):

    def name(self) -> Text:
        return "action_translate"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        baseUrl = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=vi&dt=t&q="
        sentences = next(e for e in reversed(tracker.events) if e["event"] == "bot")['text']
        
        sentences = sentences.split('.')
        for sentence in sentences:
            if sentence != '':
                sentence_en = sentence.strip()
                finalurl = baseUrl + urllib.parse.quote(sentence)
                with urllib.request.urlopen(finalurl) as url:
                    data = json.loads(url.read().decode())
                sentence_trans = data[0][0][0]
                dispatcher.utter_message(text=f"{sentence_en} -> {sentence_trans}")

        return []
