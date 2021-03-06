import json

from django.shortcuts import render
from .forms import ContactForm
from django.core.mail import EmailMessage
from django.template.loader import get_template
from django.http import HttpResponse


def index(request):
    form_class = ContactForm

    if request.method == 'POST':
        form = form_class(data={'contact_name': request.POST['contact_name'],
                                'contact_email': request.POST['contact_email'],
                                'content': request.POST['content']})

        if form.is_valid():
            contact_name = request.POST.get(
                'contact_name'
            , '')
            contact_email = request.POST.get(
                'contact_email'
            , '')
            form_content = request.POST.get('content', '')

            # Email the profile with the
            # contact information
            template = get_template('contact_template.txt')
            context = {
                'contact_name': contact_name,
                'contact_email': contact_email,
                'form_content': form_content,
            }
            content = template.render(context)

            email = EmailMessage(
                "New contact form submission",
                content,
                "Gargoyle" +'',
                ['kijko97@gmail.com'],
                headers = {'Reply-To': contact_email }
            )
            email.send()
            return HttpResponse(json.dumps({'message': 'Thank you for your message'}))

    return render(request, 'index.html', {
        'form': form_class,
    })

