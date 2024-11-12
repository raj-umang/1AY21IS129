import os
import datetime
from django.shortcuts import render

def htop_view(request):
    server_time = str(datetime.datetime.now())
    top_output = os.popen("top -bn 1").read()

  
    context = {
        'name': 'Umang Raj', 
        'username': 'raj-umang',
        'server_time': server_time,
        'top_output': top_output,
    }

    return render(request, 'htop.html', context)

