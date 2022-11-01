from django.shortcuts import render
import pyrebase

# Remember the code we copied from Firebase.
#This can be copied by clicking on the settings icon > project settings, then scroll down in your firebase dashboard
config = {
    "apiKey": "AIzaSyBtw3coit5Y_E2gJInz7RavYXuthmhh35Q",
    "authDomain": "authentic-idea-365202.firebaseapp.com",
    "projectId": "authentic-idea-365202",
    "storageBucket": "authentic-idea-365202.appspot.com",
    "messagingSenderId": "497585289385",
    "appId": "1:497585289385:web:a9ee5f59c4a17b793bd1b8",
    "measurementId": "G-2HBL5FQBGG",
    "databaseURL": "https://authentic-idea-365202-default-rtdb.firebaseio.com",
}

#here we are doing firebase authentication
firebase=pyrebase.initialize_app(config)
authe = firebase.auth()
database=firebase.database()


def index(request):
        #accessing our firebase data and storing it in a variable
        name = database.child('Data').child('Name').get().val()
        stack = database.child('Data').child('Stack').get().val()
        framework = database.child('Data').child('Framework').get().val()
    
        context = {
            'name':name,
            'stack':stack,
            'framework':framework
        }
        return render(request, 'index.html', context)
# Create your views here.
