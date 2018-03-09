from django.shortcuts import render
from .forms import ContactForm
from django.core.mail import EmailMessage
from django.shortcuts import redirect, HttpResponseRedirect
from django.template.loader import get_template
from django.contrib import messages


def index(request):
    form_class = ContactForm

    # new logic!
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
            messages.success(request, 'Thank you for your message', extra_tags='alert')
            return render(request, 'index.html')

    return render(request, 'index.html', {
        'form': form_class,
    })


# # add to your views
# def contact(request):

